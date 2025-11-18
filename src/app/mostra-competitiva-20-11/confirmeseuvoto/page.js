"use client";

import style from './confirmeseuvoto.module.css';
import { useEffect, useState } from 'react';
import { Prevote } from '@/app/components/prevote/prevote';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/mostra2025/logo-2025-branco.png';
import stars from '../../assets/mostra2025/ESTRELAS 1.png';
import snake from '../../assets/mostra2025/SEREIA.png';
import waves from '../../assets/mostra2025/ONDAS 2.png';



export default function Confirmeseuvoto() {
  const [votos, setVotos] = useState(null);

  useEffect(() => {
    const votosArmazenados = localStorage.getItem('votos');
    if (votosArmazenados) {
      setVotos(JSON.parse(votosArmazenados));
    }
  }, []);

  return (

    
      <div className={style.body}>
      
        <header className={style.header}>
          

          <h1 className={style.title}>CONFIRME SEUS VOTOS</h1>
          
          <h2 className={style.h2}>MOSTRA COMPETITIVA</h2>

          <div className={style.date}>
                      <h1 className={style.dia}>20</h1>
                      <h2 className={style.mes}>NOV</h2>
                      <h1 className={style.dia}>2025</h1>
          </div>
          <p className={style.diasemana}>QUINTA-FEIRA</p>

        </header>

          <Image src={snake} className={style.snake} alt=''/>
          <Image src={stars} className={style.stars} alt=''/>
          <Image src={waves} className={style.waves} alt=''/>
          <Image src={logo} className={style.logo} alt=''/>
        
      
        
        <main className={style.container}>



          {!votos ? (
            <p className={style.paragraph}>Carregando votos...</p>
          ) : (
            <div className={style.body2}>
              {votos?.filme1 && (
                <Prevote
                  title="DIA DOS PAIS"
                  description="FICÇÃO, 19 MIN, AM, 2025, 14 ANOS"
                  vote={votos?.filme1}
                  direction={"DIREÇÃO: Bernardo Ale Abinader"}
                  
                />
              )}

              {votos?.filme2 && (
                <Prevote
                  title="A NATUREZA DAS COISAS INVISÍVEIS"
                  description="FICÇÃO, 90 MIN, DF, 2025, 12 ANOS"
                  vote={votos?.filme2}
                  direction={"DIREÇÃO: Rafaela Camelo"}
                  
                />
              )}

              


            </div>
          )}
        </main>

          <footer className={style.footer}>

          {(votos?.filme1 || votos?.filme2) && (
              <Link className={style.button} href="/mostra-competitiva-20-11/confirmeseuvoto/finalizar">
                CONFIRMAR
              </Link>
            )}
          
            <Link className={style.button2} href="/mostra-competitiva-20-11">
              REVISAR VOTOS
            </Link>

            
          </footer>

        

        
        </div>
     
  );
}
