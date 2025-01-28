import * as Yup from "yup";

export const schema = Yup.object({
  nome: Yup.string().required("Nome é obrigatório"), // Usando .required() para validar que o campo é obrigatório
  email: Yup.string().required("Email é obrigatório").email("Email inválido"), // Validando email
  cep: Yup.string()
    .required("CEP é obrigatório") // Validando que o campo CEP é obrigatório
    .matches(/^\d{5}-\d{3}$/, "CEP inválido"), // Expressão regular para o formato do CEP
});
