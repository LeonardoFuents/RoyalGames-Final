import { api } from "./api";

export type Jogo = {
    id?: number;
    nome: string;
    preco: number;
    descricao: string;
    imagem?: File | null;
    generoIds: number[];
    plataformaIds: number[];
    classificacaoIndicativaIds: number[];
}

export type ListarJogo = {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    imagemUrl: string | null;
    statusProduto: boolean;
    generos: { id: number; nome: string }[];
    plataformas: { id: number; nome: string }[];
    classificacaoIndicativa: { id: number; nome: string } | null;
}

export async function getJogos(): Promise<ListarJogo[]> {
    try {
        const response = await api.get("/Jogo");
        return response.data;
    } catch (e: any) {
        throw new Error(e.message);
    }
}

export async function getJogoById(id: number): Promise<ListarJogo> {
    try {
        const response = await api.get(`/Jogo/${id}`);
        return response.data;
    } catch (e: any) {
        throw new Error(e.message);
    }
}

export function getImagemUrl(jogoId: number): string {
    return `${api.defaults.baseURL}Jogo/imagem/${jogoId}`;
}

export async function cadastrarJogo(dados: Jogo) {
    const formData = new FormData();

    try {
        formData.append("Nome", dados.nome);
        formData.append("Preco", dados.preco.toString());
        formData.append("Descricao", dados.descricao);

        if (dados.imagem) {
            formData.append("Imagem", dados.imagem);
        }

        dados.generoIds.forEach(value => {
            formData.append("GeneroIds", value.toString());
        });

        dados.plataformaIds.forEach(value => {
            formData.append("PlataformaIds", value.toString());
        });

        dados.classificacaoIndicativaIds.forEach(value => {
            formData.append("ClassificacaoIndicativaIds", value.toString());
        });

        const response = await api.post("/Jogo", formData);

        return response.data;
    } catch (e: any) {
        throw new Error(e.message);
    }
}

export async function atualizarJogo(id: number, dados: Partial<Jogo>) {
    const formData = new FormData();

    try {
        if (dados.nome) formData.append("Nome", dados.nome);
        if (dados.preco !== undefined) formData.append("Preco", dados.preco.toString());
        if (dados.descricao) formData.append("Descricao", dados.descricao);
        if (dados.imagem) formData.append("Imagem", dados.imagem);

        dados.generoIds?.forEach(value => formData.append("GeneroIds", value.toString()));
        dados.plataformaIds?.forEach(value => formData.append("PlataformaIds", value.toString()));
        dados.classificacaoIndicativaIds?.forEach(value => formData.append("ClassificacaoIndicativaIds", value.toString()));

        await api.put(`/Jogo/${id}`, formData);
    } catch (e: any) {
        throw new Error(e.message);
    }
}

export async function deletarJogo(id: number) {
    try {
        await api.delete(`/Jogo/${id}`);
    } catch (e: any) {
        throw new Error(e.message);
    }
}

export async function ativarJogo(id: number) {
    try {
        await api.patch(`/Jogo/ativar/${id}`);
    } catch (e: any) {
        throw new Error(e.message);
    }
}
