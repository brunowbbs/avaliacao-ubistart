interface User {
  _id: string;
  nome: string;
  email: string;
  cep: string;
}

export interface UserTableProps {
  users: User[] | undefined;
  onEdit: (id: string, nome: string, email: string, cep: string) => void;
  onDelete: (id: string) => void;
}
