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
  const [cpfError, setCpfError] = useState(false);
  const [loading, setLoading] = useState(false); // Novo estado para controle do carregamento

  useEffect(() => {
    const storedVotes = JSON.parse(localStorage.getItem('votos')) || {
      filme1: '',
      filme2: '',
      filme3: ''
    };
    setVotos(storedVotes);

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setLocationError(false);
          },
          () => {
            setLocationError(true);
            setTimeout(getLocation, 5000);
          }
        );
      } else {
        alert('Geolocalização não é suportada pelo seu navegador.');
      }
    };

    getLocation();
  }, []);

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
  };

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o hífen
  };

  const handleCpfChange = (e) => {
    const formattedCpf = formatCPF(e.target.value);
    setCpf(formattedCpf);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Ativa o loading

    const rawCpf = cpf.replace(/[^\d]/g, "");
    if (!validarCPF(rawCpf)) {
      setCpfError(true);
      setLoading(false); // Desativa o loading se o CPF for inválido
      return;
    }
    setCpfError(false);

    if (!latitude || !longitude) {
      alert('Ative sua localização para votar.');
      setLoading(false); // Desativa o loading em caso de erro de localização
      return;
    }

    try {
      const res = await fetch('/api/saveVote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cpf: rawCpf,
          filme1: votos.filme1,
          filme2: votos.filme2,
          filme3: votos.filme3,
          latitude,
          longitude
        }),
      });

      if (res.ok) {
        setCpf('');
        setVotos({ filme1: '', filme2: '', filme3: '' });
        window.location.href = '/mostra-panorama-23-11/confirmeseuvoto/finalizar/agradecimento';
      } else if (res.status === 409) {
        alert('Parece que você já votou hoje. Volte amanhã para mais : )');
      } else {
        alert('Erro ao votar. Tente novamente em alguns instantes.');
      }
    } catch (error) {
      alert('Erro ao votar. Tente novamente em alguns instantes.', error);
    } finally {
      setLoading(false);  // Desativa o loading após a resposta
    }
  };

  return (
    <div className={style.container}>
      <Image src={luneta2} alt='' className={style.luneta2} />
      <Image src={luneta3} alt='' className={style.luneta3} />
      <Image src={coral1} alt='' className={style.coral1} />
      <Image src={coral2} alt='' className={style.coral2} />
      <Image src={luneta1} alt='' className={style.luneta1} />
      <Image src={coral3} alt='' className={style.coral3} />
      <Image src={flor} alt='' className={style.flor} />
      <Image src={logo} alt='' className={style.logo} />
      <h1 className={style.h1}>Informe seu CPF abaixo para validar a votação</h1>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          className={style.input}
          type="text"
          value={cpf}
          onChange={handleCpfChange}
          placeholder="Digite seu CPF"
          maxLength="14"
          required
        />
        {locationError && (
          <p className={style.error}>
            ATIVE SUA LOCALIZAÇÃO PARA VOTAR.
          </p>
        )}

        {cpfError && <p className={style.error}>CPF INVÁLIDO. VERIFIQUE PARA CONTINUAR.</p>}
        <button className={style.button} type="submit" disabled={loading}>
          {loading ? <div className={style.spinner}></div> : 'CONFIRMAR'}
        </button>

        {/* {locationError && (
          <p className={style.error}>
            ATIVE SUA LOCALIZAÇÃO PARA VOTAR.
          </p>
        )} */}
      </form>
    </div>
  );
}
