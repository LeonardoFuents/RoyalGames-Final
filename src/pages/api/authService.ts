import { api } from "./api";
import secureLocalStorage from "react-secure-storage";

export async function Autenticar(email: string, senha: string) {
    try {
        const response = await api.post("Auth/login", {
            email,
            senha
        });

        const token = response.data.token;
        secureLocalStorage.setItem("token", token);
    } catch (error: any) {
        throw new Error(error?.message || "Email ou senha incorretos");
    }
}

export function Logout() {
    secureLocalStorage.removeItem("token");
}

export function isAutenticado(): boolean {
    const token = secureLocalStorage.getItem("token");
    return !!token;
}
