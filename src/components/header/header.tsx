import Link from "next/link";
import styles from "./header.module.css";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/router";

const Header = ({ transparente = false }: { transparente?: boolean }) => {
    const [logado, setLogado] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = secureLocalStorage.getItem("token");
        if (token) {
            setLogado(true);
        }
    }, []);

    const handleDeslogar = (e: React.MouseEvent) => {
        e.preventDefault();
        secureLocalStorage.removeItem("token");
        setLogado(false);
        router.push("/");
    };

    return (
        <header 
            id={styles.header} 
            style={transparente ? { background: 'transparent', border: 'none', boxShadow: 'none' } : {}}
        >
            <div className={`${styles.container} layout_guide`}>
                <Link href="/">
                    <img 
                        src="/imgs/logo.png"
                        alt="Logo Royal Games" 
                        id={styles.logo}
                    />
                </Link>
                
                <nav id={styles.nav_menu} className={styles.nav_menu}>
                    <Link href="/home#catalogo">Catálogo</Link>
                    
                    {logado ? (
                        <>
                            <Link href="/cadastrar-jogo">Cadastrar Jogo</Link>
                            <a href="#" onClick={handleDeslogar} id={styles.btn_login}>Deslogar</a>
                        </>
                    ) : (
                        <Link href="/login" id={styles.btn_login}>Login</Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;