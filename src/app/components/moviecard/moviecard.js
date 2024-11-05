"use client";

import { useState, useEffect } from 'react';
import './moviecard.module.css'; // Importando o arquivo de CSS
import Image from 'next/image';
import style from './moviecard.module.css';

const MovieCard = (props) => {
  const [votos, setVotos] = useState({
    filme1: null,
    filme2: null,
    filme3: null,
  });

  useEffect(() => {
    const votosArmazenados = localStorage.getItem('votos');
    if (votosArmazenados) {
      setVotos(JSON.parse(votosArmazenados));
    }
  }, []);

  const handleVote = (topico, voto) => {
    const novosVotos = {
      ...votos,
      
      [topico]: votos[topico] === voto ? null : voto, // Desmarcar se já selecionado
    };
    
    setVotos(novosVotos);
    localStorage.setItem('votos', JSON.stringify(novosVotos)); // Armazena os votos atualizados
  };

  const handleSubmit = () => {
    console.log('Votos submetidos:', votos);
    window.location.href = '/mostra-panorama-22-11/confirmeseuvoto';
  };

  const hasVotes = Object.values(votos).some(voto => voto !== null);

  return (
    <>
      <div className={style.container_flex}>
        {['filme1'].map((topico, index) => (
          <div key={index} className={style.container}>
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
                  className={`${style.opcao} ${votos[topico] === voto ? style.selecionado : ''} ${votos[topico] && votos[topico] !== voto ? style.esmaecido : ''}`}
                  onClick={() => handleVote(topico, voto)}
                >
                  <div className={style.square}>
                    {voto}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={style.container_flex}>
        {['filme2'].map((topico, index) => (
          <div key={index} className={style.container}>
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
                  className={`${style.opcao} ${votos[topico] === voto ? style.selecionado : ''} ${votos[topico] && votos[topico] !== voto ? style.esmaecido : ''}`}
                  onClick={() => handleVote(topico, voto)}
                >
                  <div className={style.square}>
                    {voto}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={style.container_flex}>
        {['filme3'].map((topico, index) => (
          <div key={index} className={style.container}>
            <h3 className={style.title}>{props.title3}</h3>
            <p className={style.subdescription}>{props.subdescription3}</p>
            <Image src={props.filme2} alt="" className={style.movie_image} />
            <p className={style.description}>{props.description3}</p>
            <p className={style.sinopse}>{props.sinopse2}</p>

            <div className={style.notecontainer}>
             
              <h2 className={style.note}>SUA NOTA</h2>
             
            </div>

            <div className={style.opcoes}>
              {[1, 2, 3, 4, 5].map((voto) => (
                <div
                  key={voto}
                  className={`${style.opcao} ${votos[topico] === voto ? style.selecionado : ''} ${votos[topico] && votos[topico] !== voto ? style.esmaecido : ''}`}
                  onClick={() => handleVote(topico, voto)}
                >
                  <div className={style.square}>
                    {voto}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className={style.footer}>
        {hasVotes && (
          <button onTouchStart={handleSubmit} className={style.submitButton}>
            FINALIZAR
          </button>
        )}
      </footer>
    </>
  );
};

export default MovieCard;
