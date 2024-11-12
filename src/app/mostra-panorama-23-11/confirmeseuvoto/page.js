"use client";

import style from './confirmeseuvoto.module.css';
import { useEffect, useState } from 'react';
import { Prevote } from '@/app/components/prevote/prevote';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/Mostra SMG - Logo 2024_Preto-01 1.svg'
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
          <Image src={logo} className={style.logo} alt=''/>

          <h1 className={style.title}>CONFIRME SEUS VOTOS</h1>
          
          <h2 className={style.h2}>MOSTRA COMPETITIVA</h2>

          <div className={style.date}>
                      <h1 className={style.dia}>23</h1>
                      <h2 className={style.mes}>NOV</h2>
                      <h1 className={style.dia}>2024</h1>
          </div>
          <p className={style.diasemana}>SÁBADO</p>

        </header>
        
        <main className={style.container}>



          {!votos ? (
            <p className={style.paragraph}>Carregando votos...</p>
          ) : (
            <div className={style.body2}>
              {votos?.filme1 && (
                <Prevote
                  title="TIJOLO POR TIJOLO"
                  description="DOCUMENTÁRIO, 103 MIN, PE, 2024, LIVRE"
                  vote={votos?.filme1}
                  direction={"DIREÇÃO: Victória Álvares e Quentin Delaroche"}
                  
                />
              )}

              {votos?.filme2 && (
                <Prevote
                  title="O DESERTO DE AKIN"
                  description="FICÇÃO, 78 MIN, ES, 2024, 12 ANOS "
                  vote={votos?.filme2}
                  direction={"DIREÇÃO: Bernard Lessa"}
                  
                />
              )}

              {votos?.filme3 && (
                <Prevote
                  title="QUANDO EU ME ENCONTRAR"
                  description="FICÇÃO, 70MIN, MG, 2023, 14 ANOS DIREÇÃO ANDRÉ NOVAIS OLIVEIRA"
                  vote={votos?.filme3}
                  
                />
              )}
            </div>
          )}
        </main>

          <footer className={style.footer}>

          {(votos?.filme1 || votos?.filme2 || votos?.filme3) && (
              <Link className={style.button} href="/mostra-panorama-23-11/confirmeseuvoto/finalizar">
                CONFIRMAR
              </Link>
            )}
          
            <Link className={style.button2} href="/mostra-panorama-23-11">
              REVISAR VOTOS
            </Link>

            
          </footer>
        </div>
     
  );
}
