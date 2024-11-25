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
  const [votos, setVotos] = useState({ filme1: '', filme2: '', filme3: '', filme4: '', filme5: '' });
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const [cpfError, setCpfError] = useState(false);
  const [loading, setLoading] = useState(false); // estado para controle do carregamento

  useEffect(() => {
    // Carrega os votos do Local Storage
    const storedVotes = JSON.parse(localStorage.getItem('votos')) || {
      filme1: '',
      filme2: '',
      filme3: '',
      filme4: '',
      filme5: ''
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

  // Função para formatar o CPF
  const formatarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove tudo que não for número
    if (cpf.length <= 3) return cpf;
    if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    if (cpf.length <= 9) return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
  };

  const handleCpfChange = (e) => {
    let value = e.target.value;
    value = formatarCPF(value); // Formata o CPF enquanto o usuário digita
    setCpf(value);
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

    // Verifica se a localização está disponível
    if (!latitude || !longitude) {
      alert('Permita que nosso site use sua localização para para concluir seu voto.');
      setLoading(false)
      return; // Impede o envio se a localização não estiver disponível
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
          filme4: votos.filme4,
          filme5: votos.filme5,
          latitude, // Inclui a latitude
          longitude // Inclui a longitude
        }),
      });

      if (res.ok) {
        // Limpa o CPF e os votos no LocalStorage
        setCpf('');
        setVotos({ filme1: '', filme2: '', filme3: '', filme4: '', filme5: '' });
        localStorage.setItem('votos', JSON.stringify({ filme1: '', filme2: '', filme3: '', filme4: '', filme5: '' }));

        // Redireciona o usuário para a página de agradecimento
        window.location.href = '/mostra-panorama-25-11/confirmeseuvoto/finalizar/agradecimento';
      } else if (res.status === 409) {
        alert('Opa! Parece que você já votou hoje. Espero te ver aqui no próximo ano : )');
      } else {
        alert('Erro ao Votar. Tente novamente em alguns instantes.');
      }
    } catch (error) {
      console.error('Erro ao submeter o voto:', error);
    } finally {
      setLoading(false);// Desativa o loading após a resposta
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
      </form>
    </div>
  );
}
