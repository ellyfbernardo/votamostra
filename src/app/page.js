"use client";

import { useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from 'next/image';
import logo from './assets/mostra2025/12MCG_Logo.svg';
import arte from './assets/mostra2025/sereia-tela-inicial.png';
import wave from './assets/mostra2025/linhas.png';
import rodape from './assets/mostra2025/regua.png';


export default function Home() {

  useEffect(() => {
    // Limpa o localStorage apenas na primeira vez que o usuário visita a página inicial
    const votosArmazenados = localStorage.getItem('votos');
    if (votosArmazenados) {
      localStorage.removeItem('votos','cpf');
    }
  }, []); // Esse efeito rodará apenas uma vez quando a página for carregada

  return (
    

    <div className={styles.container}>

        <header className={styles.container_header}>
          <h2 className={styles.headersubtitle}><span className={styles.apresenta}>MINISTÉRIO DA CULTURA, PETROBRAS E GOVERNO DO ESTADO DO RIO GRANDE DO NORTE APRESENTA</span></h2>
        </header>

            <Image src={logo} className={styles.logo} alt=""/>
        <main className={styles.body}>
            
            {/* /mostra-panorama-25-11 */}
          <Link href="#" className={styles.link}>
            {/* <button className={styles.li}>INICIAR VOTAÇÃO</button>  */}
            <div className={styles.waiting}>
              <h2 className={styles.aguarde}>AGUARDE!</h2>
              <h3 className={styles.votacao}>A VOTAÇÃO COMEÇARÁ</h3>
              <h3 className={styles.termino}>AO TÉRMINO DA SESSÃO</h3>
            </div>
          </Link>



        </main>

          <Image src={arte} className={styles.arte} alt=""/>
          <Image src={wave} className={styles.wave} alt=""/>
         

          <footer className={styles.footer}>
            <Image src={rodape} className={styles.rodape} alt=""/>
          </footer>

        </div>
  );
}

