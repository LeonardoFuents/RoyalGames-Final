import React from 'react';
import styles from './footer.module.css';

const Footer = ({ transparente = false }: { transparente?: boolean }) => {
  return (
    <footer 
        className={styles.rodape}
        style={transparente ? { background: 'transparent', borderTop: 'none', boxShadow: 'none' } : {}}
    >
      <div className={styles.rodape__conteudo}>
        
        <div className={styles.rodape__logo}>
          <img 
            src="/imgs/logo.png"
            alt="Logo Royal Games" 
            className={styles.rodape__logoImagem}
          />
        </div>

        <ul className={styles.rodape__contatos}>
          <li className={styles.rodape__contatoItem}>royalgames@email.com</li>
          <li className={styles.rodape__contatoItem}>(11)99999-9999</li>
          <li className={styles.rodape__contatoItem}>@RoyalGames</li>
        </ul>

      </div>
    </footer>
  )
}

export default Footer;