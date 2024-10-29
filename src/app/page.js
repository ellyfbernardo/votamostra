"use client";

import { useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from 'next/image';
import logo from './assets/Logo-11-mostra-de-cinema.png';
import arte from './assets/ícone mostra 743px.png'



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
        <main className={styles.body}>
          <Image src={logo} className={styles.logo} alt=""/>
          <Image src={arte} className={styles.arte}alt=""/>
        </main>
        <header className={styles.header_container}>
          <Link href="/mostra-panorama-22-11" className={styles.link}>
            <li className={styles.li}>INICIAR VOTAÇÃO</li>
          </Link>
        </header>
        </div>
  );
}

