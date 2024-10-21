"use client";

import { useState, useEffect } from 'react';
import './moviecard.module.css'; // Importando o arquivo de CSS
import Image from 'next/image';
import style from './moviecard.module.css';

import emote1 from '../../assets/emote1.png';
import emote2 from '../../assets/emote2.png';
import emote3 from '../../assets/emote3.png';
import emote4 from '../../assets/emote4.webp';
import emote5 from '../../assets/emote5.png';

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
      [topico]: voto,
    };
    
    setVotos(novosVotos);
    localStorage.setItem('votos', JSON.stringify(novosVotos)); // Armazena os votos atualizados
  };

  const handleSubmit = () => {
    // Aqui você pode armazenar os votos em localStorage ou enviar para uma API
    console.log('Votos submetidos:', votos);
    // Redirecionar para a próxima página, se necessário
    window.location.href = '/mostra-panorama-22-11/confirmeseuvoto';
  };

  return (
    <>
      <div className={style.container_flex}>
        {['filme1'].map((topico, index) => (
          <div key={index} className={style.container}>
            <h3 className={style.title}>{props.title1}</h3>
            <Image src={props.filme1} alt="" className={style.movie_image} />
            <p className={style.description}>{props.description1}</p>

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
                  {voto === 1 ? (<Image src={emote1} className={style.emote} alt="" />) : null}
                  {voto === 2 ? (<Image src={emote2} className={style.emote} alt="" />) : null}
                  {voto === 3 ? (<Image src={emote3} className={style.emote} alt="" />) : null}
                  {voto === 4 ? (<Image src={emote4} className={style.emote} alt="" />) : null}
                  {voto === 5 ? (<Image src={emote5} className={style.emote} alt="" />) : null}
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
            <Image src={props.filme2} alt="" className={style.movie_image} />
            <p className={style.description}>{props.description2}</p>

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
                  {voto === 1 ? (<Image src={emote1} className={style.emote} alt="" />) : null}
                  {voto === 2 ? (<Image src={emote2} className={style.emote} alt="" />) : null}
                  {voto === 3 ? (<Image src={emote3} className={style.emote} alt="" />) : null}
                  {voto === 4 ? (<Image src={emote4} className={style.emote} alt="" />) : null}
                  {voto === 5 ? (<Image src={emote5} className={style.emote} alt="" />) : null}
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
            <Image src={props.filme3} alt="" className={style.movie_image} />
            <p className={style.description}>{props.description3}</p>

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
                  {voto === 1 ? (<Image src={emote1} className={style.emote} alt="" />) : null}
                  {voto === 2 ? (<Image src={emote2} className={style.emote} alt="" />) : null}
                  {voto === 3 ? (<Image src={emote3} className={style.emote} alt="" />) : null}
                  {voto === 4 ? (<Image src={emote4} className={style.emote} alt="" />) : null}
                  {voto === 5 ? (<Image src={emote5} className={style.emote} alt="" />) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className={style.footer}>
        <button onClick={handleSubmit} className={style.submitButton}>
          Submeter Votos
        </button>
      </footer>
    </>
  );
};

export default MovieCard;
