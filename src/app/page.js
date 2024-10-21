"use client";

import { useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {

  useEffect(() => {
    // Limpa o localStorage apenas na primeira vez que o usuário visita a página inicial
    const votosArmazenados = localStorage.getItem('votos');
    if (votosArmazenados) {
      localStorage.removeItem('votos');
    }
  }, []); // Esse efeito rodará apenas uma vez quando a página for carregada

  return (
    <>
      <header className={styles.header_container}>
        <h1>Escolha sua Sessão</h1>
        <Link href="/mostra-panorama-22-11" className={styles.link}>
          <li className={styles.li}>22/11</li>
        </Link>
      </header>
      <main>
        {/* Conteúdo principal */}
      </main>
    </>
  );
}

