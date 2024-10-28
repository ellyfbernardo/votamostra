"use client";

import { useState, useEffect } from 'react';
import style from './finalizar.module.css';
import Image from 'next/image';
import lanterna from '../../../assets/Lanterna direita cpf.png';
import iconeinferior from '../../../assets/icone inferior direito cpf.png';
import logo from '../../../assets/Logo-11-mostra-de-cinema.png';


export default function VoteList() {
  const [cpf, setCpf] = useState('');
  const [votos, setVotos] = useState({ filme1: '', filme2: '', filme3: '' });
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    // Carrega os votos do Local Storage
    const storedVotes = JSON.parse(localStorage.getItem('votos')) || {
      filme1: '',
      filme2: '',
      filme3: ''
    };
    
    setVotos(storedVotes); // Atualiza o estado com os votos resgatados

    // Pega a localização do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      alert('Geolocalização não é suportada pelo seu navegador.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          latitude,  // Inclui a latitude
          longitude  // Inclui a longitude
        }),
      });

      if (res.ok) {
        alert('Voto submetido com sucesso!');
        setCpf(''); // Limpa o campo de CPF
        setVotos({ filme1: '', filme2: '', filme3: '' }); // Limpa os votos
      } else if (res.status === 409) {
        alert('Esse CPF já votou.');
      } else {
        alert('Erro ao submeter o voto.');
      }
    } catch (error) {
      console.error('Erro ao submeter o voto:', error);
    }
  };

  return (
    <div className={style.container}>
    <Image src={lanterna} className={style.lanterna}/>
    <Image src={iconeinferior} className={style.iconeinferior}/>
    <Image src={logo} className={style.logo}/>

      <h1 className={style.h1}>Preencha os dados abaixo para validar sua votação</h1>
      <form className={style.form} onSubmit={handleSubmit}>
        <h2 className={style.cpf}>CPF</h2>
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
      </form>
    </div>
  );
}
