import style from './header.module.css'

export function Header(){
     return(


     <header className={`${style.title}`}>
          <h1 className={style.dia}>22 - 26</h1>
          <h2 className={style.mes}>nov</h2>
          <h1 className={style.mostra}>MOSTRA COMPETITIVA</h1>
          <p className={style.diasemana}>Sexta-feira</p>
     </header>

)
}