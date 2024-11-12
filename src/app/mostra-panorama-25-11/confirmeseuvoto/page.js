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
                  title="YBY KATU"
                  description="FICÇÃO, 18 MIN, RN, 2024, LIVRE | DIREÇÃO: KAYLANY CORDEIRO, JESSÉ CARLOS, LADIVAN SOARES, GEYSON FERNANDES E RODRIGO SENA"
                  vote={votos?.filme1}
                  
                />
              )}

              {votos?.filme2 && (
                <Prevote
                  title="CHIBO"
                  description="DOCUMENTÁRIO, 18 MIN, RS, 2024, 10 ANOS | DIREÇÃO: GABRIELA POESTER E HENRIQUE LAHUDE"
                  vote={votos?.filme2}
                  
                />
              )}

              {votos?.filme3 && (
                <Prevote
                  title="RAPOSA"
                  description="FICÇÃO, 15 MIN, CE, 2024, 14 ANOS | DIREÇÃO: MARGOT LEITÃO E JOÃO FONTENELE"
                  vote={votos?.filme3}
                  
                />
              )}

              {votos?.filme4 && (
                <Prevote
                  title="PEQUENAS INSURREIÇÕES"
                  description="FICÇÃO, 13 MIN, PR, 2023, LIVRE | DIREÇÃO: WILLIAM DE OLIVEIRA"
                  vote={votos?.filme4}
                  
                />
              )}

              {votos?.filme5 && (
                <Prevote
                  title="RAPOSA"
                  description="FICÇÃO, 101 MIN, PE, 2024, 14 ANOS | DIREÇÃO: MARIANNA BRENNAND"
                  vote={votos?.filme5}
                  
                />
              )}
            </div>
          )}
        </main>

          <footer className={style.footer}>

          {(votos?.filme1 || votos?.filme2 || votos?.filme3) && (
              <Link className={style.button} href="/mostra-panorama-25-11/confirmeseuvoto/finalizar">
                CONFIRMAR
              </Link>
            )}
          
            <Link className={style.button2} href="/mostra-panorama-25-11">
              REVISAR VOTOS
            </Link>

            
          </footer>
        </div>
     
  );
}