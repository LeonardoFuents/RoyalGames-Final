import Header from "@/src/components/header/header";
import styles from "./home.module.css"
import Footer from "@/src/components/footer/footer";
import Catalogo from "@/src/components/catalogo/catalogo";
import InfoBanner from "@/src/components/info-banner/info-banner";

const Home = () => {
    return (
        <>
            <Header />
            <main>
                <section className={styles.banner}>
                    <div className={`${styles.container_banner} layout_guide`}>
                        <div className={styles.textos_banner}>
                            <h1 className={styles.titulo_banner}>Conheça nossos jogos!</h1>
                            <h2 className={styles.subtitulo_banner}>Navegue por títulos de todas as gerações, descubra plataformas, gêneros e detalhes completos antes de escolher sua próxima aventura. Seu próximo jogo favorito começa aqui.</h2>
                        </div>
                        <img src="../imgs/mulherbanner.png" alt="Foto futurista de uma mulher no estilo cyberpunk" />
                    </div>
                </section>
                <Catalogo/>
                <InfoBanner/>
                
                
            </main>
            <Footer />
        </>
    )
}

export default Home;