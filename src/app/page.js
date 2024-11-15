"use client";

import { useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from 'next/image';
import logo from './assets/Mostra SMG - Logo 2024_Preto-01 1.png';
import petro from './assets/Apresenta 2 linhas branco.svg';
import arte from './assets/Ilustração.svg';
import rodape from './assets/Rodapé (1).svg';


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
          <Image src={petro} className={styles.petro} alt=""/>
        </header>

          
     


        <main className={styles.body}>


          <Link href="/mostra-panorama-23-11" className={styles.link}>
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

