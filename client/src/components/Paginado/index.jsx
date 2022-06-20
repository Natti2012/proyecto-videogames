import React from 'react'
import './paginado.css'
export default function  Paginado({VGperPage,allVideoGame,paginado}){
    const  numberPage =[]
    for (let i = 0; i < Math.ceil(allVideoGame/VGperPage); i++){
        numberPage.push(i +1)
    }
    return(
        <nav>
            <ul className='pagination'>
                {
                    numberPage &&
                    numberPage.map(number=>(
                        <li key={number}>
                            <button onClick={()=>paginado(number)} className='button-pag'>  {number}</button>
                        </li>
                    ))
                }

            </ul>
        </nav>
    )
    
}