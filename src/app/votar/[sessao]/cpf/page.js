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

// Localização opcional. Nunca falha nem trava: devolve as coordenadas ou null.
// O limite próprio cobre aparelhos que ignoram o timeout do navegador
// ou que nunca respondem ao pedido de permissão.
function pedirLocalizacao(limiteMs) {
  return new Promise((resolve) => {
    try {
      if (!navigator.geolocation) return resolve(null);
      const desistir = setTimeout(() => resolve(null), limiteMs);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          clearTimeout(desistir);
          resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        },
        () => {
          clearTimeout(desistir);
          resolve(null);
        },
        { enableHighAccuracy: false, timeout: limiteMs, maximumAge: 10 * 60 * 1000 }
      );
    } catch {
      resolve(null);
    }
  });
}

const MENSAGENS = {
  409: 'Este CPF já votou nesta sessão.',
  403: 'A votação desta sessão está encerrada.',
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
    pedirLocalizacao(15000).then((coords) => {
      if (coords) local.current = coords;
    });
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
      // Sem localização ainda: espera no máximo 2 s e envia com ou sem ela
      if (!local.current) {
        local.current = await pedirLocalizacao(2000);
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

          <button type="submit" className="btn-verde" disabled={enviando} aria-busy={enviando}>
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
