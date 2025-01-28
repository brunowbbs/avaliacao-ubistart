import axios, { AxiosResponse } from "axios";
import { FormData, User } from "./types";
import { toast } from "react-toastify";

export const getCEPStatus = async (
  cep: string
): Promise<AxiosResponse | null> => {
  try {
    const sanitizedCEP = cep.replace(/\D/g, "");
    return await axios.get(
      `https://brasilapi.com.br/api/cep/v2/${sanitizedCEP}`
    );
    // eslint-disable-next-line
  } catch (error: any) {
    const errorMessage =
      Number(error?.status) > 500
        ? "Serviço de CEP indisponível"
        : error?.response?.data?.message || null;

    if (errorMessage) {
      toast(errorMessage, {
        style: { background: "red", color: "#fff" },
      });
    }

    return null;
  }
};

export const getUsers = async (): Promise<AxiosResponse<User[]> | null> => {
  try {
    return await axios.get(`https://api-ubistart.vercel.app/users`, {
      timeout: 30000,
    });
  } catch {
    return null;
  }
};

export const postUser = async (formData: FormData) => {
  try {
    const { nome, cep, email } = formData;

    await axios.post("https://api-ubistart.vercel.app/users", {
      nome,
      email,
      cep,
    });
    // eslint-disable-next-line
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "Erro desconhecido";
    toast(errorMessage, {
      style: { background: "red", color: "#fff" },
    });
    return null;
  }
};

export const putUser = async (id: string, formData: FormData) => {
  try {
    const { nome, cep, email } = formData;

    await axios.put(`https://api-ubistart.vercel.app/users/${id}`, {
      nome,
      email,
      cep,
    });
    // eslint-disable-next-line
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "Erro desconhecido";
    toast(errorMessage, {
      style: { background: "red", color: "#fff" },
    });
  }
};

export const deleteUser = async (id: string) => {
  try {
    await axios.delete(`https://api-ubistart.vercel.app/users/${id}`);
    // eslint-disable-next-line
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "Erro desconhecido";
    toast(errorMessage, {
      style: { background: "red", color: "#fff" },
    });
  }
};
