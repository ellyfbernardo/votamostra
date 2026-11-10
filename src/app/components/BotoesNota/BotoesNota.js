import style from './BotoesNota.module.css';

// Notas de 1 a 5, do branco ao preto, como na identidade visual.
// Usado na votação (tamanho normal) e na pesquisa de satisfação (pequeno).
export function BotoesNota({ nome, valor, aoEscolher, pequeno = false }) {
  return (
    <div className={`${style.notas} ${pequeno ? style.pequeno : ''}`} role="radiogroup" aria-label={`Nota para ${nome}`}>
      {[1, 2, 3, 4, 5].map((nota) => {
        const selecionada = valor === nota;
        const esmaecida = valor !== undefined && valor !== null && !selecionada;
        return (
          <button
            key={nota}
            type="button"
            role="radio"
            aria-checked={selecionada}
            className={`${style.nota} ${style[`n${nota}`]} ${selecionada ? style.selecionada : ''} ${esmaecida ? style.esmaecida : ''}`}
            onClick={() => aoEscolher(nota)}
          >
            {nota}
          </button>
        );
      })}
    </div>
  );
}
