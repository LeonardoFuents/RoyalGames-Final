import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const apiLocal = "https://localhost:7097/api/"

export const api = axios.create({
    baseURL: apiLocal,
})

api.interceptors.request.use((config) => {
    const token: any = secureLocalStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const mensagem =
            error?.response?.data?.message ||
            error?.response?.data ||
            error?.message ||
            "Erro desconhecido";
        return Promise.reject(new Error(typeof mensagem === "string" ? mensagem : JSON.stringify(mensagem)));
    }
)
