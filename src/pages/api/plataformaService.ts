import { api } from "./api";

export type Plataforma = {
    plataformaId: number;
    nome: string;
}

export async function getPlataformas(): Promise<Plataforma[]> {
    try {
        const response = await api.get("/Plataforma");
        return response.data;
    } catch (e: any) {
        throw new Error(e.message);
    }
}
