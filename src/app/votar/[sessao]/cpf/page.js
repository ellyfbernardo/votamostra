'use client';

import { useEffect, useRef, useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import style from './cpf.module.css';
import { Tela } from '../../../components/Tela/Tela';
import { Cabecalho } from '../../../components/Cabecalho/Cabecalho';
import { buscarSessao } from '../../../dados/mostra';
import { cpfValido, formatarCPF } from '../../../lib/validacao';
import { lerVotos, limparVotos, salvarCpf } from '../../../lib/votosLocais';
import pessoas from '../../../assets/mostra2026/pessoas-bolhas.svg';

function pedirLocalizacao() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('sem suporte'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      reject,
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10 * 60 * 1000 }
    );
  });
}

const MENSAGENS = {
  409: 'Este CPF já votou nesta sessão.',
  403: 'A votação desta sessão está encerrada.',
  422: 'Ative a localização do celular para votar.',
};

// Tela 4: CPF, opção de notificação e envio do voto.
export default function Cpf() {
  const { sessao: sessaoId } = useParams();
  const sessao = buscarSessao(sessaoId);
  const router = useRouter();

  const [cpf, setCpf] = useState('');
  const [notificar, setNotificar] = useState(false);
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);
  const local = useRef(null);

  // Já pede a localização ao abrir a tela, para não atrasar o envio
  useEffect(() => {
    pedirLocalizacao()
      .then((coords) => (local.current = coords))
      .catch(() => {});
  }, []);

  if (!sessao) notFound();

  const enviar = async (e) => {
    e.preventDefault();
    setErro('');

    const cpfNumeros = cpf.replace(/\D/g, '');
    if (!cpfValido(cpfNumeros)) {
      setErro('CPF inválido. Verifique e tente novamente.');
      return;
    }

    const notas = lerVotos(sessaoId);
    if (Object.keys(notas).length === 0) {
      setErro('Nenhum voto encontrado. Volte e dê suas notas.');
      return;
    }

    setEnviando(true);
    try {
      // Tenta mais uma vez; se não conseguir, envia sem localização
      // e o servidor decide se aceita (só aceita no modo de teste).
      if (!local.current) {
        local.current = await pedirLocalizacao().catch(() => null);
      }

      const res = await fetch('/api/saveVote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessao: sessaoId, cpf: cpfNumeros, notas, notificar, ...local.current }),
      });

      if (res.ok) {
        salvarCpf(sessaoId, cpfNumeros);
        limparVotos(sessaoId);
        router.replace(`/votar/${sessaoId}/confirmado`);
        return;
      }

      setErro(MENSAGENS[res.status] ?? 'Não foi possível registrar seu voto. Tente novamente em instantes.');
    } catch {
      setErro('Sem conexão. Verifique sua internet e tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Tela posicaoGeodesica={null}>
      <Cabecalho sessao={sessao} mostrarData={false} />

      <main className={style.conteudo}>
        <form className={style.form} onSubmit={enviar} noValidate>
          <label htmlFor="cpf" className={style.instrucao}>
            Informe seu CPF abaixo
            <br />
            para validar a votação
          </label>

          <input
            id="cpf"
            className={style.campo}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(e) => setCpf(formatarCPF(e.target.value))}
            maxLength={14}
            aria-invalid={Boolean(erro)}
            aria-describedby={erro ? 'erro-cpf' : undefined}
          />

          <label className={style.opcao}>
            <input type="checkbox" checked={notificar} onChange={(e) => setNotificar(e.target.checked)} />
            <span>
              Desejo ser notificado(a)
              <br />
              sobre as próximas votações
            </span>
          </label>

          {erro && (
            <p id="erro-cpf" className={style.erro} role="alert">
              {erro}
            </p>
          )}

          <button type="submit" className="btn-verde" disabled={enviando}>
            {enviando ? <span className={style.carregando} aria-label="Enviando" /> : 'CONFIRMAR'}
          </button>

          <Link href={`/votar/${sessaoId}/confirmar`} className="btn-preto">
            VOLTAR
          </Link>
        </form>
      </main>

      <Image src={pessoas} alt="" aria-hidden="true" className={style.pessoas} />
    </Tela>
  );
}
