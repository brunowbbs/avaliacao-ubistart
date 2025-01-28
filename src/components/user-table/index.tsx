import { UserTableProps } from "../types";

const UserTable = ({ users, onEdit, onDelete }: UserTableProps) => {
  return (
    <div className="overflow-x-auto mt-4">
      <div className="flex justify-between">
        <h2 className="text-white font-bold mb-2">Usuários Cadastrados</h2>
        <h2 className="text-white mb-2">Total de registros: {users?.length}</h2>
      </div>
      <table className="min-w-full text-gray-400">
        <thead>
          <tr className="bg-slate-600/40">
            <th className="py-2 text-left font-semibold pl-4">Ordem</th>
            <th className="py-2 text-left font-semibold">Nome</th>
            <th className="py-2 text-left font-semibold">E-mail</th>
            <th className="py-2 text-left font-semibold">CEP</th>
            <th className="py-2 text-center font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr
              key={user._id}
              className="border-b border-b-gray-500 font-light"
            >
              <td className="pl-4">{index + 1}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.cep.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2-$3")}</td>
              <td className="flex justify-center gap-2">
                <button
                  onClick={() =>
                    onEdit(user._id, user.nome, user.email, user.cep)
                  }
                  className="m-1 rounded-md bg-green-700 p-1 text-xs font-normal text-white transition delay-100 ease-out hover:bg-green-950"
                >
                  Editar
                </button>

                <button
                  onClick={() => onDelete(user._id)}
                  className="m-1 rounded-md bg-red-700 p-1 text-xs font-normal text-white transition delay-100 ease-out hover:bg-red-950"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-1 w-full mt-5">
        {users && users?.length < 1 && (
          <p className="text-center w-full text-gray-300 font-light">
            {" "}
            Nenhum usuário cadastrado
          </p>
        )}
      </div>
    </div>
  );
};

export default UserTable;
