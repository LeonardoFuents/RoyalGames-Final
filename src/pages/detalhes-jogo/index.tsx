import Header from "@/src/components/header/header";
import styles from "./detalhes-jogo.module.css"
import Footer from "@/src/components/footer/footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getJogoById, getImagemUrl, ListarJogo } from "@/src/pages/api/jogoService";

const DetalhesJogo = () => {
    const router = useRouter();
    const { id } = router.query;

    const [jogo, setJogo] = useState<ListarJogo | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        if (!id) return;

        const carregarJogo = async () => {
            try {
                setCarregando(true);
                const dados = await getJogoById(Number(id));
                setJogo(dados);
            } catch (e: any) {
                setErro("Não foi possível carregar os detalhes do jogo.");
            } finally {
                setCarregando(false);
            }
        };

        carregarJogo();
    }, [id]);

    return (
        <div className={styles.pagina_toda_gradient}>
            
            <Header transparente={true} />

            <main className={styles.main_conteudo}>
                <section className={styles.secao_detalhes}>
                    <div className={styles.caixa_detalhes}>
                        
                        <div className={styles.cabecalho_detalhes}>
                            <h1 className={styles.titulo_secao}>Detalhes do jogo</h1>
                            <div className={styles.linha_decorativa}></div>
                        </div>

                        {carregando && (
                            <p style={{ color: "var(--cor-texto-secundario)", textAlign: "center", padding: "3rem" }}>
                                Carregando detalhes...
                            </p>
                        )}

                        {erro && (
                            <p style={{ color: "red", textAlign: "center", padding: "3rem" }}>
                                {erro}
                            </p>
                        )}

                        {!carregando && jogo && (
                            <>
                                <div className={styles.conteudo_superior}>
                                    <div className={styles.container_imagem}>
                                        <img 
                                            src={getImagemUrl(jogo.id)} 
                                            alt={`Capa do jogo ${jogo.nome}`}
                                            className={styles.capa_jogo}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "../imgs/lol1.png";
                                            }}
                                        />
                                    </div>
                                    
                                    <div className={styles.textos_jogo}>
                                        <h2 className={styles.titulo_jogo}>{jogo.nome}</h2>
                                        <p className={styles.descricao}>{jogo.descricao}</p>
                                    </div>
                                </div>

                                <div className={styles.metadados}>
                                    <div className={styles.item_meta}>
                                        <span className={styles.meta_label}>Classificação indicativa:</span>
                                        <span className={styles.meta_valor}>
                                            {jogo.classificacaoIndicativa?.nome ?? "Não informado"}
                                        </span>
                                    </div>
                                    <div className={styles.item_meta}>
                                        <span className={styles.meta_label}>Gêneros:</span>
                                        <span className={styles.meta_valor}>
                                            {jogo.generos?.map(g => g.nome).join(", ") || "Não informado"}
                                        </span>
                                    </div>
                                    <div className={styles.item_meta}>
                                        <span className={styles.meta_label}>Preço:</span>
                                        <span className={styles.meta_valor}>
                                            R$ {jogo.preco.toFixed(2).replace(".", ",")}
                                        </span>
                                    </div>
                                    <div className={styles.item_meta}>
                                        <span className={styles.meta_label}>Plataformas:</span>
                                        <span className={styles.meta_valor}>
                                            {jogo.plataformas?.map(p => p.nome).join(", ") || "Não informado"}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                </section>
            </main>
            
            <Footer transparente={true} />
            
        </div>
    )
}

export default DetalhesJogo;