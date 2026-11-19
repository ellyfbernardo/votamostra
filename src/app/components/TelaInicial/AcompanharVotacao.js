'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const INTERVALO = 10000; // 10 s

// Quando a equipe abre ou encerra uma votação no /admin, a tela inicial
// se atualiza sozinha (aparece ou some o botão VOTAR).
export function AcompanharVotacao({ sessaoId }) {
  const router = useRouter();

  useEffect(() => {
    let ativo = true;

    const conferir = async () => {
      if (document.hidden) return;
      try {
        const res = await fetch('/api/votacao', { cache: 'no-store' });
        if (!res.ok) return;
        const { aberta } = await res.json();
        if (ativo && aberta !== sessaoId) router.refresh();
      } catch {}
    };

    const id = setInterval(conferir, INTERVALO);
    document.addEventListener('visibilitychange', conferir);
    return () => {
      ativo = false;
      clearInterval(id);
      document.removeEventListener('visibilitychange', conferir);
    };
  }, [sessaoId, router]);

  return null;
}
