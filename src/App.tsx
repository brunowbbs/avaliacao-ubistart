import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { schema } from "./schema";
import { FormData } from "./types";

const App = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
  };

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^A-Za-z\s]/g, "");
    event.target.value = value;
  };

  return (
    <div className="p-4">
      <h2 className="text-white mb-4 font-bold">Cadastro de usuários</h2>

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
                onInput={handleNomeChange}
                placeholder="Digite seu nome"
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
              <input {...field} placeholder="Digite seu email" />
            )}
          />

          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="flex flex-col">
          <Controller
            name="cep"
            control={control}
            render={({ field }) => (
              <InputMask
                {...field}
                mask="99999-999"
                placeholder="Digite o CEP"
              />
            )}
          />

          {errors.cep && <span>{errors.cep.message}</span>}
        </div>

        <button className="bg-blue-950 h-auto" type="submit">
          Salvar
        </button>
      </form>
    </div>
  );
};

export default App;
