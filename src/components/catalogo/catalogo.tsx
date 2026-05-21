import styles from "./catalogo.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getJogos, getImagemUrl, ListarJogo } from "@/src/pages/api/jogoService";
import { getGeneros, Genero } from "@/src/pages/api/generoService";

const Catalogo = () => {
    const [jogos, setJogos] = useState<ListarJogo[]>([]);
    const [jogosFiltrados, setJogosFiltrados] = useState<ListarJogo[]>([]);
    const [pesquisa, setPesquisa] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const router = useRouter();

    const [paginaAtual, setPaginaAtual] = useState(1);
    const JOGOS_POR_PAGINA = 6;
    const [generos, setGeneros] = useState<Genero[]>([]);
    const [generoSelecionado, setGeneroSelecionado] = useState<number | "">("");
    const [ordemPreco, setOrdemPreco] = useState<"asc" | "desc" | null>(null);

    useEffect(() => {
        const carregarJogosEGeneros = async () => {
            try {
                setCarregando(true);
                const [dados, gs] = await Promise.all([getJogos(), getGeneros()]);
                const ativos = dados.filter(j => j.statusProduto !== false);
                setJogos(ativos);
                setJogosFiltrados(ativos);
                setGeneros(gs);
            } catch (e: any) {
                setErro("Não foi possível carregar os jogos.");
            } finally {
                setCarregando(false);
            }
        };

        carregarJogosEGeneros();
    }, []);

    useEffect(() => {
        let filtrado = jogos.filter(jogo =>
            jogo.nome.toLowerCase().includes(pesquisa.toLowerCase())
        );
        
        if (generoSelecionado !== "") {
            filtrado = filtrado.filter(jogo => 
                jogo.generos && jogo.generos.some(g => g.id === generoSelecionado)
            );
        }

        if (ordemPreco === "asc") {
            filtrado = [...filtrado].sort((a, b) => a.preco - b.preco);
        } else if (ordemPreco === "desc") {
            filtrado = [...filtrado].sort((a, b) => b.preco - a.preco);
        }

        setJogosFiltrados(filtrado);
        setPaginaAtual(1);
    }, [pesquisa, jogos, generoSelecionado, ordemPreco]);

    const handleDetalhes = (id: number) => {
        router.push(`/detalhes-jogo?id=${id}`);
    };

    const toggleOrdemPreco = () => {
        if (ordemPreco === null || ordemPreco === "desc") {
            setOrdemPreco("asc");
        } else {
            setOrdemPreco("desc");
        }
    };

    const totalPaginas = Math.ceil(jogosFiltrados.length / JOGOS_POR_PAGINA);
    const indiceInicio = (paginaAtual - 1) * JOGOS_POR_PAGINA;
    const jogosDaPagina = jogosFiltrados.slice(indiceInicio, indiceInicio + JOGOS_POR_PAGINA);

    const mudarPagina = (numero: number) => {
        setPaginaAtual(numero);
        document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section id="catalogo" className={styles.secao_catalogo}>
            <div className={styles.container_catalogo}>
                
                <div className={styles.cabecalho_catalogo}>
                    <h2 className={styles.titulo_secao}>Catálogo de jogos</h2>
                    <div className={styles.linha_decorativa}></div>
                </div>

                <div className={styles.barra_filtros}>
                    <input 
                        type="text" 
                        placeholder="Pesquise..." 
                        className={styles.input_pesquisa}
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                    />
                    <div className={styles.filtros_botoes}>
                        <button 
                            className={`${styles.btn_filtro} ${ordemPreco ? styles.ativo : ""}`}
                            onClick={toggleOrdemPreco}
                        >
                            {ordemPreco === "desc" ? "Maior Preço" : "Menor Preço"}
                        </button>
                        <select 
                            className={styles.select_categoria}
                            value={generoSelecionado}
                            onChange={(e) => setGeneroSelecionado(e.target.value ? Number(e.target.value) : "")}
                        >
                            <option value="">Todas as Categorias</option>
                            {generos.map(g => (
                                <option key={g.id} value={g.id}>{g.nome}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {carregando && (
                    <p style={{ color: "var(--cor-texto-secundario)", textAlign: "center", padding: "2rem" }}>
                        Carregando jogos...
                    </p>
                )}

                {erro && (
                    <p style={{ color: "red", textAlign: "center", padding: "2rem" }}>
                        {erro}
                    </p>
                )}

                {!carregando && !erro && jogosFiltrados.length === 0 && (
                    <p style={{ color: "var(--cor-texto-secundario)", textAlign: "center", padding: "2rem" }}>
                        Nenhum jogo encontrado.
                    </p>
                )}

                <div className={styles.grid_jogos}>
                    {jogosDaPagina.map((jogo) => (
                        <div key={jogo.id} className={styles.card_jogo}>
                            <img 
                                src={getImagemUrl(jogo.id)} 
                                alt={`Capa do jogo ${jogo.nome}`} 
                                className={styles.imagem_jogo}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "../imgs/minecraft.png";
                                }}
                            />
                            <h3 className={styles.nome_jogo}>{jogo.nome}</h3>
                            <span className={styles.preco}>
                                R$ {jogo.preco.toFixed(2).replace(".", ",")}
                            </span>
                            <button 
                                className={styles.btn_detalhes}
                                onClick={() => handleDetalhes(jogo.id)}
                            >
                                Detalhes
                            </button>
                        </div>
                    ))}
                </div>

                {totalPaginas > 1 && (
                    <div className={styles.paginacao}>
                        <button 
                            className={styles.btn_pag}
                            disabled={paginaAtual === 1}
                            onClick={() => mudarPagina(paginaAtual - 1)}
                        >
                            &lt;
                        </button>

                        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(num => (
                            <button 
                                key={num}
                                className={`${styles.btn_pag} ${paginaAtual === num ? styles.pag_ativo : ""}`}
                                onClick={() => mudarPagina(num)}
                            >
                                {num}
                            </button>
                        ))}

                        <button 
                            className={styles.btn_pag}
                            disabled={paginaAtual === totalPaginas}
                            onClick={() => mudarPagina(paginaAtual + 1)}
                        >
                            &gt;
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
};

export default Catalogo;