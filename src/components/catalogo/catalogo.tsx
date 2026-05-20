import styles from "./catalogo.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getJogos, getImagemUrl, ListarJogo } from "@/src/pages/api/jogoService";

const Catalogo = () => {
    const [jogos, setJogos] = useState<ListarJogo[]>([]);
    const [jogosFiltrados, setJogosFiltrados] = useState<ListarJogo[]>([]);
    const [pesquisa, setPesquisa] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const router = useRouter();

    useEffect(() => {
        const carregarJogos = async () => {
            try {
                setCarregando(true);
                const dados = await getJogos();
                setJogos(dados);
                setJogosFiltrados(dados);
            } catch (e: any) {
                setErro("Não foi possível carregar os jogos.");
            } finally {
                setCarregando(false);
            }
        };

        carregarJogos();
    }, []);

    useEffect(() => {
        const filtrado = jogos.filter(jogo =>
            jogo.nome.toLowerCase().includes(pesquisa.toLowerCase())
        );
        setJogosFiltrados(filtrado);
    }, [pesquisa, jogos]);

    const handleDetalhes = (id: number) => {
        router.push(`/detalhes-jogo?id=${id}`);
    };

    const ordenarMenorPreco = () => {
        const ordenado = [...jogosFiltrados].sort((a, b) => a.preco - b.preco);
        setJogosFiltrados(ordenado);
    };

    return (
        <section className={styles.secao_catalogo}>
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
                            className={`${styles.btn_filtro} ${styles.ativo}`}
                            onClick={ordenarMenorPreco}
                        >
                            Menor Preço
                        </button>
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
                    {jogosFiltrados.map((jogo) => (
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

            </div>
        </section>
    );
};

export default Catalogo;