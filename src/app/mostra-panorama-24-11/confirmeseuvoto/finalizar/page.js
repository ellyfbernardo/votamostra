"use client";

import { useState, useEffect } from 'react';
import style from './finalizar.module.css';
import Image from 'next/image';
import logo from '../../../assets/Mostra SMG - Logo 2024_Preto-01 1.svg';
import coral1 from '../../../assets/Coral 2.svg';
import coral2 from '../../../assets/Coral 1.svg';
import luneta1 from '../../../assets/Luneta 1.png';
import luneta2 from '../../../assets/Luneta 2.png';
import luneta3 from '../../../assets/Luneta 3.png';
import coral3 from '../../../assets/Coral 3.svg';
import flor from '../../../assets/Flor Lateral.svg';


export default function VoteList() {
  const [cpf, setCpf] = useState('');
  const [votos, setVotos] = useState({ filme1: '', filme2: '', filme3: '' });
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    // Carrega os votos do Local Storage
    const storedVotes = JSON.parse(localStorage.getItem('votos')) || {
      filme1: '',
      filme2: '',
      filme3: ''
    };
    
    setVotos(storedVotes); // Atualiza o estado com os votos resgatados

    // Função para tentar obter a localização continuamente
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setLocationError(false); // Reseta o erro se a localização for bem-sucedida
          },
          () => {
            setLocationError(true); // Define o erro se a localização falhar
            // Tenta novamente após um tempo
            setTimeout(getLocation, 5000); // Tenta novamente após 5 segundos
          }
        );
      } else {
        alert('Geolocalização não é suportada pelo seu navegador.');
      }
    };

    getLocation(); // Chama a função para começar a tentar obter a localização
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se a localização está disponível
    if (!latitude || !longitude) {
      alert('Ative sua localização para votar.');
      return; // Impede o envio se a localização não estiver disponível
    }

    try {
      const res = await fetch('/api/saveVote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cpf,
          filme1: votos.filme1,
          filme2: votos.filme2,
          filme3: votos.filme3,
          latitude, // Inclui a latitude
          longitude // Inclui a longitude
        }),
      });

      if (res.ok) {
        // alert('Voto submetido com sucesso!');
        setCpf(''); // Limpa o campo de CPF
        setVotos({ filme1: '', filme2: '', filme3: '' }); // Limpa os votos
        // Redireciona o usuário para a página de agradecimento
        window.location.href = '/mostra-panorama-24-11/confirmeseuvoto/finalizar/agradecimento';
      } else if (res.status === 409) {
        alert('Parece que você já votou hoje. Volte amanhã para mais : )');
      } else {
        alert('Erro ao Votar. Tente novamente em alguns instantes.');
      }
    } catch (error) {
      console.error('Erro ao submeter o voto:', error);
    }
  };

  return (
    <div className={style.container}>

      <Image src={luneta2} alt='' className={style.luneta2}/>
      <Image src={luneta3} alt='' className={style.luneta3}/>
      <Image src={coral1} alt='' className={style.coral1}/>
      <Image src={coral2} alt='' className={style.coral2}/>
      <Image src={luneta1} alt='' className={style.luneta1}/>
      <Image src={coral3} alt='' className={style.coral3}/>
      <Image src={flor} alt='' className={style.flor}/>

      <Image src={logo} alt='' className={style.logo}/> 
      <h1 className={style.h1}>Informe seu CPF abaixo para validar a votação</h1>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          className={style.input}
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="Digite seu CPF"
          maxLength="11"
          required
          
        />
        <button className={style.button} type="submit">CONFIRMAR</button>
        {locationError && (
          <p className={style.error}>
            Erro: Ative sua localização para continuar.
          </p>
        )}
      </form>
    </div>
  );
}
