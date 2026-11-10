import Image from 'next/image';
import style from './Tela.module.css';
import geodesica from '../../assets/mostra2026/geodesica.svg';

// Moldura das telas internas: coluna centralizada, fundo roxo e os traços da Geodésica.
// posicaoGeodesica: 'meio' (votação, confirmação) | 'topo' (finalização) | null (sem traços)
export function Tela({ children, posicaoGeodesica = 'meio', className = '' }) {
  return (
    <div className={`${style.tela} ${className}`}>
      {posicaoGeodesica && (
        <Image
          src={geodesica}
          alt=""
          aria-hidden="true"
          className={`${style.geodesica} ${style[posicaoGeodesica]}`}
        />
      )}
      {children}
    </div>
  );
}
