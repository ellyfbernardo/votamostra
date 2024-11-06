"use client";

import { useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from 'next/image';
import logo from './assets/Mostra SMG - Logo 2024_Preto-01 1.png';
import petro from './assets/Petrobras.svg';
import arte from './assets/Ilustração.svg';
import rodape from './assets/Rodapé.svg';


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
          <p className={styles.p1}>MINISTÉRIO DA CULTURA,</p>
          <Image src={petro} className={styles.petro} alt=""/>
          <p className={styles.p2}>SALINOR E GOVERNO DO ESTADO DO RIO GRANDE DO NORTE APRESENTAM</p>
        </header>

          
     


        <main className={styles.body}>


          <Link href="/mostra-panorama-22-11" className={styles.link}>
            <li className={styles.li}>INICIAR VOTAÇÃO</li>
          </Link>


          <Image src={logo} className={styles.logo} alt=""/>

        </main>

          <Image src={arte} className={styles.arte} alt=""/>


          <footer className={styles.footer}>
            <Image src={rodape} className={styles.rodape} alt=""/>
          </footer>

        </div>
  );
}

