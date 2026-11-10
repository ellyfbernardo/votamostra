import style from './prevote.module.css';


export function Prevote(props){
     return(
     
          
               <main className={style.container}>
               
                    <div>
                         <h2 className={style.title}>{props.title}</h2>

                         <p className={style.description}>{props.description}</p>
                         <p className={style.direction}>{props.direction}</p>

                    </div>
                         <div className={style.square}>
                              <p>{props.vote}</p>
                         </div>
                    </main>
          
          
     )
}