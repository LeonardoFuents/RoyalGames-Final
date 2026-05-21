import Header from "@/src/components/header/header";
import styles from "./cadastrar-jogo.module.css";
import Footer from "@/src/components/footer/footer";
import { useEffect, useState } from "react";
import { getJogos, cadastrarJogo, atualizarJogo, deletarJogo, ativarJogo, getImagemUrl, ListarJogo } from "@/src/pages/api/jogoService";
import { getGeneros, Genero } from "@/src/pages/api/generoService";
import { getPlataformas, Plataforma } from "@/src/pages/api/plataformaService";
import { getClassificacoes, ClassificacaoIndicativa } from "@/src/pages/api/classificacaoService";
import { erro, notificacao } from "@/src/utils/toast";
const CadastrarJogo = () => {
    // Dados do formulário
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagem, setImagem] = useState<File | null>(null);
    const [generoSelecionado, setGeneroSelecionado] = useState<number | "">("");
    const [plataformaSelecionada, setPlataformaSelecionada] = useState<number | "">("");
    const [classificacaoSelecionada, setClassificacaoSelecionada] = useState<number | "">("");
    const [enviando, setEnviando] = useState(false);
    const [jogoEditandoId, setJogoEditandoId] = useState<number | null>(null);
    // Dados dos selects
    const [generos, setGeneros] = useState<Genero[]>([]);
    const [plataformas, setPlataformas] = useState<Plataforma[]>([]);
    const [classificacoes, setClassificacoes] = useState<ClassificacaoIndicativa[]>([]);
    const [jogos, setJogos] = useState<ListarJogo[]>([]);
    const [pesquisa, setPesquisa] = useState("");
    const [carregandoJogos, setCarregandoJogos] = useState(true);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const JOGOS_POR_PAGINA = 6;
    useEffect(() => {
        const carregarDados = async () => {
            try {
                const [gs, ps, cs] = await Promise.all([
                    getGeneros(),
                    getPlataformas(),
                    getClassificacoes(),
                ]);
                setGeneros(gs);
                setPlataformas(ps);
                setClassificacoes(cs);
            } catch {
                erro("Erro ao carregar dados do formulário.");
            }
        };
        carregarDados();
        carregarJogos();
    }, []);
    const carregarJogos = async () => {
        try {
            setCarregandoJogos(true);
            const dados = await getJogos();
            setJogos(dados);
        } catch {
            erro("Erro ao carregar lista de jogos.");
        } finally {
            setCarregandoJogos(false);
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nome || !preco || !descricao || !generoSelecionado || !plataformaSelecionada || !classificacaoSelecionada) {
            erro("Preencha todos os campos obrigatórios.");
            return;
        }
        setEnviando(true);
        try {
            const dadosJogo = {
                nome,
                preco: parseFloat(preco.replace(",", ".")),
                descricao,
                imagem,
                generoIds: [Number(generoSelecionado)],
                plataformaIds: [Number(plataformaSelecionada)],
                classificacaoIndicativaIds: [Number(classificacaoSelecionada)],
            };
            if (jogoEditandoId) {
                await atualizarJogo(jogoEditandoId, dadosJogo);
                notificacao("Jogo atualizado com sucesso!");
                setJogoEditandoId(null);
            } else {
                await cadastrarJogo(dadosJogo);
                notificacao("Jogo cadastrado com sucesso!");
            }
            setNome("");
            setPreco("");
            setDescricao("");
            setImagem(null);
            setGeneroSelecionado("");
            setPlataformaSelecionada("");
            setClassificacaoSelecionada("");
            // Recarregar lista
            await carregarJogos();
        } catch (e: any) {
            erro(e.message || (jogoEditandoId ? "Erro ao atualizar jogo." : "Erro ao cadastrar jogo."));
        } finally {
            setEnviando(false);
        }
    };
    const handleDeletar = async (id: number, nomeJogo: string) => {
        if (!confirm(`Tem certeza que deseja excluir "${nomeJogo}"?`)) return;
        try {
            await deletarJogo(id);
            notificacao("Jogo excluído com sucesso!");
            await carregarJogos();
        } catch (e: any) {
            erro(e.message || "Erro ao excluir jogo.");
        }
    };

    const handleAtivar = async (id: number, nomeJogo: string) => {
        try {
            await ativarJogo(id);
            notificacao(`Jogo "${nomeJogo}" ativado com sucesso!`);
            await carregarJogos();
        } catch (e: any) {
            erro(e.message || "Erro ao ativar jogo.");
        }
    };
    useEffect(() => {
        setPaginaAtual(1);
    }, [pesquisa, jogos]);

    const jogosFiltrados = jogos.filter(j =>
        j.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );

    const totalPaginas = Math.ceil(jogosFiltrados.length / JOGOS_POR_PAGINA);
    const indiceInicio = (paginaAtual - 1) * JOGOS_POR_PAGINA;
    const jogosDaPagina = jogosFiltrados.slice(indiceInicio, indiceInicio + JOGOS_POR_PAGINA);

    const mudarPagina = (numero: number) => {
        setPaginaAtual(numero);
        document.getElementById("lista-jogos")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className={styles.pagina_toda_gradient}>
            <Header transparente={true} />
            
            <main className={styles.main_admin}>
                
                <section className={styles.secao_formulario}>
                    <div className={styles.caixa_premium}>
                        
                        <div className={styles.cabecalho_secao}>
                            <h2 className={styles.titulo_secao}>Cadastrar novo jogo</h2>
                            <div className={styles.linha_decorativa}></div>
                        </div>
                        <form className={styles.formulario} onSubmit={handleSubmit}>
                            <div className={styles.grid_formulario}>
                                
                                <div className={styles.coluna_esquerda}>
                                    <div className={styles.grupo_input}>
                                        <label>Nome</label>
                                        <input 
                                            type="text" 
                                            value={nome}
                                            onChange={(e) => setNome(e.target.value)}
                                            disabled={enviando}
                                        />
                                    </div>
                                    
                                    <div className={styles.linha_inputs_3}>
                                        <div className={styles.grupo_input}>
                                            <label>Valor</label>
                                            <input 
                                                type="text" 
                                                value={preco}
                                                onChange={(e) => setPreco(e.target.value)}
                                                placeholder="Ex: 59,90"
                                                disabled={enviando}
                                            />
                                        </div>
                                        <div className={styles.grupo_input}>
                                            <label>Gênero</label>
                                            <select 
                                                value={generoSelecionado}
                                                onChange={(e) => setGeneroSelecionado(Number(e.target.value))}
                                                disabled={enviando}
                                            >
                                                <option value="">Selecione...</option>
                                                {generos.map(g => (
                                                    <option key={g.id} value={g.id}>{g.nome}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className={styles.grupo_input}>
                                            <label>Classificação Indicativa</label>
                                            <select 
                                                value={classificacaoSelecionada}
                                                onChange={(e) => setClassificacaoSelecionada(Number(e.target.value))}
                                                disabled={enviando}
                                            >
                                                <option value="">Selecione...</option>
                                                {classificacoes.map(c => (
                                                    <option key={c.id} value={c.id}>{c.nome}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className={styles.linha_inputs_2}>
                                        <div className={styles.grupo_input}>
                                            <label>Plataforma</label>
                                            <select 
                                                value={plataformaSelecionada}
                                                onChange={(e) => setPlataformaSelecionada(Number(e.target.value))}
                                                disabled={enviando}
                                            >
                                                <option value="">Selecione...</option>
                                                {plataformas.map(p => (
                                                    <option key={p.plataformaId} value={p.plataformaId}>{p.nome}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className={styles.grupo_input}>
                                            <label>Imagem</label>
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                className={styles.input_file}
                                                onChange={(e) => setImagem(e.target.files?.[0] ?? null)}
                                                disabled={enviando}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.coluna_direita}>
                                    <div className={`${styles.grupo_input} ${styles.input_descricao_wrapper}`}>
                                        <label>Descrição</label>
                                        <textarea 
                                            className={styles.textarea_descricao}
                                            value={descricao}
                                            onChange={(e) => setDescricao(e.target.value)}
                                            disabled={enviando}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            
                            <button 
                                type="submit" 
                                className={styles.btn_cadastrar_form}
                                disabled={enviando}
                            >
                                {enviando ? "Salvando..." : jogoEditandoId ? "Atualizar" : "Cadastrar"}
                            </button>
                        </form>
                    </div>
                </section>
                <section id="lista-jogos" className={styles.secao_lista}>
                    <div className={styles.cabecalho_secao}>
                        <h2 className={styles.titulo_secao}>Lista de jogos</h2>
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
                    </div>
                    {carregandoJogos && (
                        <p style={{ color: "var(--cor-texto-secundario)", textAlign: "center", padding: "2rem" }}>
                            Carregando jogos...
                        </p>
                    )}
                    <div className={styles.grid_jogos}>
                        {jogosDaPagina.map((jogo, index) => (
                            <div key={jogo.id ?? index} className={styles.card_jogo} style={{ opacity: jogo.statusProduto !== false ? 1 : 0.4 }}>
                                <img 
                                    src={getImagemUrl(jogo.id)} 
                                    alt={jogo.nome} 
                                    className={styles.imagem_jogo}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "../imgs/minecraft.png";
                                    }}
                                />
                                <h3 className={styles.nome_jogo}>{jogo.nome}</h3>
                                {jogo.statusProduto === false && <span style={{ color: "red", fontSize: "0.8rem", fontWeight: "bold" }}>(Desativado)</span>}
                                <span className={styles.preco_riscado}>
                                    R$ {jogo.preco.toFixed(2).replace(".", ",")}
                                </span>
                                
                                <div className={styles.botoes_card}>
                                    {jogo.statusProduto !== false ? (
                                        <button 
                                            className={styles.btn_excluir}
                                            onClick={() => handleDeletar(jogo.id, jogo.nome)}
                                        >
                                            Excluir
                                        </button>
                                    ) : (
                                        <button 
                                            className={styles.btn_editar}
                                            style={{ backgroundColor: "green" }}
                                            onClick={() => handleAtivar(jogo.id, jogo.nome)}
                                        >
                                            Ativar
                                        </button>
                                    )}
                                    <button 
                                        className={styles.btn_editar}
                                        onClick={() => {
                                            setJogoEditandoId(jogo.id);
                                            setNome(jogo.nome);
                                            setPreco(jogo.preco.toString().replace(".", ","));
                                            setDescricao(jogo.descricao);
                                            if (jogo.generos && jogo.generos.length > 0) setGeneroSelecionado(jogo.generos[0].id);
                                            if (jogo.plataformas && jogo.plataformas.length > 0) setPlataformaSelecionada(jogo.plataformas[0].id);
                                            if (jogo.classificacaoIndicativa) setClassificacaoSelecionada(jogo.classificacaoIndicativa.id);
                                            // Atualiza a tela para o topo
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                    >
                                        Editar
                                    </button>
                                </div>
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
                </section>
            </main>
            <Footer transparente={true} />
        </div>
    )
}
export default CadastrarJogo;