import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Controller, useForm, useWatch } from "react-hook-form";
import InputMask from "react-input-mask";
import { toast, ToastContainer } from "react-toastify";
import LoadingTable from "./components/loading-table";
import { REGEX_CEP, schema } from "./schema";
import {
  deleteUser,
  getCEPStatus,
  getUsers,
  postUser,
  putUser,
} from "./services";
import { FormData } from "./types";
import UserTable from "./components/user-table";

const App = () => {
  const [editingId, setEditingId] = useState("");

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const watchCep = useWatch({ control, name: "cep" });

  const { refetch, isLoading, data, isFetched } = useQuery({
    queryKey: ["cep", watchCep],
    queryFn: () => getCEPStatus(watchCep),
    enabled: false,
  });

  const {
    data: users,
    refetch: refetchUsers,
    isLoading: isLoadingUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const { mutate: postUserMutation, isPending: isPendingPostUser } =
    useMutation({
      mutationFn: postUser,
      onSuccess: () => {
        refetchUsers();
        reset({ nome: "", email: "", cep: "" });
      },
    });

  const { mutate: putUserMutation, isPending: isPendingPutUser } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      putUser(id, data),
    onSuccess: () => {
      setEditingId("");
      refetchUsers();
      reset({ nome: "", email: "", cep: "" });
    },
  });

  const { mutate: deleteUserMutation, isPending: isPendingDeleteUser } =
    useMutation({
      mutationFn: (id: string) => deleteUser(id),
      onSuccess: () => {
        refetchUsers();
      },
    });

  const onSubmit = async (formData: FormData) => {
    if (isFetched && !editingId && data?.status !== 200) {
      toast("Informe um CEP válido", {
        style: { background: "red", color: "#fff" },
      });
      return;
    }

    try {
      if (editingId) {
        putUserMutation({ id: editingId, data: formData });
      } else {
        postUserMutation(formData);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert("Erro: " + error.message);
      } else {
        alert("Erro desconhecido");
      }
    }
  };

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^A-Za-z\s]/g, "");
    event.target.value = value;
  };

  useEffect(() => {
    if (REGEX_CEP.test(watchCep)) {
      refetch();
    }
  }, [watchCep, refetch, clearErrors, setError]);

  const handleEditUser = (
    id: string,
    nome: string,
    email: string,
    cep: string
  ) => {
    setEditingId(id);
    setValue("nome", nome);
    setValue("email", email);
    setValue("cep", cep);
  };

  return (
    <div className="p-4">
      <h2 className="text-white mb-2 font-bold">Cadastro de usuários</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-baseline flex-wrap gap-4"
      >
        <div className="flex-1 w-full">
          <Controller
            name="nome"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="input"
                onInput={handleNomeChange}
                placeholder="Digite o nome"
              />
            )}
          />

          {errors.nome && <span>{errors.nome.message}</span>}
        </div>

        <div className="flex-1 w-full">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="input"
                placeholder="Digite o email"
              />
            )}
          />

          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="flex flex-col">
          <Controller
            name="cep"
            control={control}
            render={({ field }) => (
              <div className="container-input">
                <InputMask
                  {...field}
                  mask="99.999-999"
                  placeholder="Digite o CEP"
                />
                {isLoading ? (
                  <div className="loader" />
                ) : (
                  <div style={{ width: 20 }} />
                )}
              </div>
            )}
          />

          {errors.cep && <span>{errors.cep.message}</span>}

          {isLoading && <span className="span-search">Buscando CEP...</span>}

          {isFetched && data?.status === 200 && (
            <span className="span-success">CEP válido</span>
          )}
          {isFetched && data?.status !== 200 && <span>CEP inválido</span>}
        </div>

        <button
          className="bg-[#1A2EDF] w-32 flex items-center justify-center"
          type="submit"
          disabled={isPendingPostUser || isPendingPutUser}
        >
          {isPendingPostUser || isPendingPutUser ? (
            <div className="loader" />
          ) : (
            "Salvar"
          )}
        </button>
      </form>

      {isLoadingUsers || isPendingDeleteUser ? (
        <LoadingTable />
      ) : (
        <UserTable
          users={users?.data}
          onEdit={handleEditUser}
          onDelete={deleteUserMutation}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default App;
