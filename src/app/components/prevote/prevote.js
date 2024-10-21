import style from './prevote.module.css'
import Image from 'next/image'
import foto from '../../assets/filme1.webp'
export function Prevote(props){
     return(
          <>
          
               <main className={style.container}>
                    <Image
                         className={style.img}
                         src={props.foto}
                         alt=""
                    />
               
                    <div>
                         <h2 className={style.title}>{props.title}</h2>
                         <p className={style.description}>{props.description}</p>

                    </div>
                         <div className={style.square}>
                              <p>{props.vote}</p>
                         </div>
                    </main>
          
          </>
     )
}