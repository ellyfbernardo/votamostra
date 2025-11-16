"use client";

import { useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from 'next/image';
import logo from './assets/mostra2025/logo-2025-branco.png';
import arte from './assets/mostra2025/sereia-tela-inicial.png';
import wave from './assets/mostra2025/linhas.png';
import star from './assets/mostra2025/estrela 1.png';
import rodape from './assets/mostra2025/regua.png';


export default function Home() {

  useEffect(() => {
    // Limpa o localStorage apenas na primeira vez que o usuário visita a página inicial
    const votosArmazenados = localStorage.getItem('votos');
    if (votosArmazenados) {
      localStorage.removeItem('votos');
    }
  }, []); // Esse efeito rodará apenas uma vez quando a página for carregada

  return (
    

    <div className={styles.container}>

        <header className={styles.container_header}>
          
        </header>

            <Image src={logo} className={styles.logo} alt=""/>
        <main className={styles.body}>
            
            {/* /mostra-panorama-25-11 */}
          <Link href="/mostra-competitiva-20-11" className={styles.link}>
            <button className={styles.li}>INICIAR VOTAÇÃO</button> 
            {/* <div className={styles.waiting}>
              <h2 className={styles.aguarde}>AGUARDE!</h2>
              <h3 className={styles.votacao}>A VOTAÇÃO COMEÇARÁ</h3>
              <h3 className={styles.termino}>AO TÉRMINO DA SESSÃO</h3>
            </div> */}
          </Link>



        </main>

          <Image src={arte} className={styles.arte} alt=""/>
          <Image src={wave} className={styles.wave} alt=""/>
          <Image src={star} className={styles.star} alt=""/>

          <footer className={styles.footer}>
            <Image src={rodape} className={styles.rodape} alt=""/>
          </footer>

        </div>
  );
}

