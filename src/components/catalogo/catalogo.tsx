import styles from "./catalogo.module.css";

const jogosMock = [
    { id: 1, nome: "Minecraft", precoAntigo: "R$70,00", imagem: "../imgs/minecraft.png" },
    { id: 2, nome: "Call of Duty", precoAntigo: "R$70,00", imagem: "../imgs/codmobile.png" },
    { id: 3, nome: "League of Legends", precoAntigo: "R$70,00", imagem: "../imgs/lol1.png" },
    { id: 4, nome: "Valorant", precoAntigo: "R$70,00", imagem: "../imgs/valorant.png" },
    { id: 5, nome: "Overcooked", precoAntigo: "R$70,00", imagem: "../imgs/overcooked.png" },
    { id: 6, nome: "Stardew Valley", precoAntigo: "R$70,00", imagem: "../imgs/stardewvalley.png" },
];

const Catalogo = () => {
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
                    />
                    <div className={styles.filtros_botoes}>
                        <button className={`${styles.btn_filtro} ${styles.ativo}`}>Menor Preço</button>
                        <button className={styles.btn_filtro}>Categoria</button>
                    </div>
                </div>

                <div className={styles.grid_jogos}>
                    {jogosMock.map((jogo) => (
                        <div key={jogo.id} className={styles.card_jogo}>
                            <img src={jogo.imagem} alt={`Capa do jogo ${jogo.nome}`} className={styles.imagem_jogo} />
                            <h3 className={styles.nome_jogo}>{jogo.nome}</h3>
                            <span className={styles.preco}>{jogo.precoAntigo}</span>
                            <button className={styles.btn_detalhes}>Detalhes</button>
                        </div>
                    ))}
                </div>

                <div className={styles.paginacao}>
                    <button className={styles.btn_pag}>&lt;</button>
                    <button className={`${styles.btn_pag} ${styles.pag_ativo}`}>1</button>
                    <button className={styles.btn_pag}>2</button>
                    <button className={styles.btn_pag}>3</button>
                    <button className={styles.btn_pag}>4</button>
                    <button className={styles.btn_pag}>5</button>
                    <button className={styles.btn_pag}>&gt;</button>
                </div>

            </div>
        </section>
    );
};

export default Catalogo;