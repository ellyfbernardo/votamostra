"use client";

import style from './confirmeseuvoto.module.css';
import { useEffect, useState } from 'react';
import { Prevote } from '@/app/components/prevote/prevote';
import Link from 'next/link';
import filmepng1 from '../../assets/filme1.webp';
import filmepng2 from '../../assets/filme2.webp';
import filmepng3 from '../../assets/filme3.webp';

import { Header } from '@/app/components/header/header';

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
      
      <Header/> 
      
      <h2 className={style.title}>SUA VOTAÇÃO</h2>
      
      
      <main className={style.container}>



        {!votos ? (
          <p className={style.paragraph}>Carregando votos...</p>
        ) : (
          <div className={style.body2}>
            {votos?.filme1 && (
              <Prevote
                title="O DIA QUE TE CONHECI"
                description="FICÇÃO, 70MIN, MG, 2023, 14 ANOS DIREÇÃO ANDRÉ NOVAIS OLIVEIRA"
                vote={votos?.filme1}
                foto={filmepng1}
              />
            )}

            {votos?.filme2 && (
              <Prevote
                title="ESTRANHO CAMINHO"
                description="FICÇÃO, 70MIN, MG, 2023, 14 ANOS DIREÇÃO ANDRÉ NOVAIS OLIVEIRA"
                vote={votos?.filme2}
                foto={filmepng2}
              />
            )}

            {votos?.filme3 && (
              <Prevote
                title="QUANDO EU ME ENCONTRAR"
                description="FICÇÃO, 70MIN, MG, 2023, 14 ANOS DIREÇÃO ANDRÉ NOVAIS OLIVEIRA"
                vote={votos?.filme3}
                foto={filmepng3}
              />
            )}
          </div>
        )}
      </main>

        <footer className={style.footer}>

        {(votos?.filme1 || votos?.filme2 || votos?.filme3) && (
            <Link className={style.button} href="/mostra-panorama-22-11/confirmeseuvoto/finalizar">
              CONFIRMAR
            </Link>
          )}
        <p className={style.warning}>Preencha seus dados na tela a seguir para confirmar sua votação</p>
          <Link className={style.button2} href="/mostra-panorama-22-11">
            REVISAR VOTOS
          </Link>

          
        </footer>
      </div>
  );
}
