import Link from "next/link";
import styles from "./header.module.css";
import { useState } from "react";

const Header = () => {

    return (
        <header id={styles.header}>
            <div className={`${styles.container} layout_guide`}>
                <Link href="/">
                    <img 
                        src="../imgs/logo.png" 
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