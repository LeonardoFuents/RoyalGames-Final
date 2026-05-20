import { api } from "./api";

export type Genero = {
    id: number;
    nome: string;
}

export async function getGeneros(): Promise<Genero[]> {
    try {
        const response = await api.get("/Genero");
        return response.data;
    } catch (e: any) {
        throw new Error(e.message);
    }
}
