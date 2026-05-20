import { api } from "./api";

export type ClassificacaoIndicativa = {
    id: number;
    nome: string;
}

export async function getClassificacoes(): Promise<ClassificacaoIndicativa[]> {
    try {
        const response = await api.get("/ClassificacaoIndicativa");
        return response.data;
    } catch (e: any) {
        throw new Error(e.message);
    }
}
