"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import style from './moviecard.module.css';

const MovieCard = (props) => {
  const [votos, setVotos] = useState({
    filme1: null,
    filme2: null,
    filme3: null,
  });

  const router = useRouter();

  // Criar referências para os cards
  const cardRefs = {
    filme1: useRef(null),
    filme2: useRef(null),
    filme3: useRef(null),
  };

  useEffect(() => {
    const votosArmazenados = localStorage.getItem('votos');
    if (votosArmazenados) {
      setVotos(JSON.parse(votosArmazenados));
    }
  }, [router.asPath]);

  const handleVote = (topico, voto) => {
    const novosVotos = {
      ...votos,
      [topico]: votos[topico] === voto ? null : voto,
    };
    setVotos(novosVotos);
    localStorage.setItem('votos', JSON.stringify(novosVotos));

    // Move para o próximo card após o voto
    const topicos = Object.keys(cardRefs);
    const currentIndex = topicos.indexOf(topico);
    const nextIndex = currentIndex + 1;

    if (nextIndex < topicos.length) {
      const nextCard = cardRefs[topicos[nextIndex]].current;
      
      if (nextCard) {
        const isMobile = window.innerWidth <= 768;
        console.log("Rodando em Mobile?", isMobile);

        // Tenta rolar o card para o próximo
        nextCard.scrollIntoView({
          behavior: 'smooth',
          block: 'start', // Inicia no topo do próximo card
        });
        
        // Adiciona uma margem extra para compensar a barra de navegação (caso necessário)
        if (isMobile) {
          setTimeout(() => {
            window.scrollBy(0, -100); // Ajuste para compensar a barra de navegação
          }, 300);
        }
      }
    }
  };

  const handleSubmit = () => {
    router.push('/mostra-panorama-23-11/confirmeseuvoto');
  };

  const hasVotes = Object.values(votos).some(voto => voto !== null);

  return (
    <>
      <div className={style.container_flex} ref={cardRefs.filme1}>
        <div className={style.container}>
          <h3 className={style.title}>{props.title1}</h3>
          <p className={style.subdescription}>{props.subdescription1}</p>
          <Image src={props.filme1} alt="" className={style.movie_image} />
          <p className={style.description}>{props.description1}</p>
          <p className={style.sinopse}>{props.sinopse1}</p>

          <div className={style.notecontainer}>
            <h2 className={style.note}>SUA NOTA</h2>
          </div>

          <div className={style.opcoes}>
            {[1, 2, 3, 4, 5].map((voto) => (
              <div
                key={voto}
                className={`${style.opcao} ${votos.filme1 === voto ? style.selecionado : ''} ${votos.filme1 && votos.filme1 !== voto ? style.esmaecido : ''}`}
                onClick={() => handleVote('filme1', voto)}
              >
                <div className={style.square}>
                  {voto}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={style.container_flex} ref={cardRefs.filme2}>
        <div className={style.container}>
          <h3 className={style.title}>{props.title2}</h3>
          <p className={style.subdescription}>{props.subdescription2}</p>
          <Image src={props.filme2} alt="" className={style.movie_image} />
          <p className={style.description}>{props.description2}</p>
          <p className={style.sinopse}>{props.sinopse2}</p>

          <div className={style.notecontainer}>
            <h2 className={style.note}>SUA NOTA</h2>
          </div>

          <div className={style.opcoes}>
            {[1, 2, 3, 4, 5].map((voto) => (
              <div
                key={voto}
                className={`${style.opcao} ${votos.filme2 === voto ? style.selecionado : ''} ${votos.filme2 && votos.filme2 !== voto ? style.esmaecido : ''}`}
                onClick={() => handleVote('filme2', voto)}
              >
                <div className={style.square}>
                  {voto}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <footer className={style.footer}>
        {hasVotes && (
          <button onClick={handleSubmit} className={style.submitButton}>
            FINALIZAR
          </button>
        )}
      </footer>
    </>
  );
};

export default MovieCard;
