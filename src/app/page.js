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

            {/*
              /mostra-panorama-24-11
              /mostra-panorama-25-11 
            */}
            

            {/* /mostra-panorama-23-11 */}
          <Link href="/mostra-panorama-23-11" className={styles.link}>
            <button className={styles.li}>INICIAR VOTAÇÃO</button> 
            {/* <div className={styles.waiting}>
              <h2 className={styles.aguarde}>AGUARDE!</h2>
              <h3 className={styles.votacao}>A VOTAÇÃO COMEÇARÁ</h3>
              <h3 className={styles.termino}>AO TÉRMINO DA SESSÃO</h3>
            </div> */}
          </Link>

            {/* <div className={styles.waiting}>
              <h2>AGUARDE!</h2>
              <h3>A VOTAÇÃO COMEÇARÁ</h3>
              <h3>AO TÉRMINO DA SESSÃO</h3>
            </div> */}

          <Image src={logo} className={styles.logo} alt=""/>

        </main>

          <Image src={arte} className={styles.arte} alt=""/>


          <footer className={styles.footer}>
            <Image src={rodape} className={styles.rodape} alt=""/>
          </footer>

        </div>
  );
}

