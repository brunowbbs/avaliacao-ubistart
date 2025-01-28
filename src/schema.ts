import * as Yup from "yup";

export const REGEX_CEP = /^\d{2}\.\d{3}-\d{3}$/;

export const schema = Yup.object({
  nome: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().required("Email é obrigatório").email("Email inválido"),
  cep: Yup.string()
    .required("CEP é obrigatório")
    .matches(REGEX_CEP, "CEP incorreto"),
});
