import Link from "next/link";
import styles from "./header.module.css";

const Header = ({ transparente = false }: { transparente?: boolean }) => {
    return (
        <header 
            id={styles.header} 
            /* O estilo inline garante que o fundo suma independente do CSS */
            style={transparente ? { background: 'transparent', border: 'none', boxShadow: 'none' } : {}}
        >
            <div className={`${styles.container} layout_guide`}>
                <Link href="/">
                    <img 
                        src="/imgs/logo.png" /* Corrigido para /imgs se estiver na pasta public */
                        alt="Logo Royal Games" 
                        id={styles.logo}
                    />
                </Link>
                
                <nav id={styles.nav_menu} className={styles.nav_menu}>
                    <Link href="/catalogo">Catálogo</Link>
                    <Link href="/login" id={styles.btn_login}>Login</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;