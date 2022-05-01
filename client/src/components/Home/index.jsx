import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './home.css'
import { getVideogames } from '../../redux/actions'
import Card from '../Card'
import Paginado from '../Paginado';

function Home() {

  const dispatch = useDispatch();
  const allVideoGame = useSelector(state => state.videogames)
  const [currentPage, setCurrentPage] = useState(1)
  const [VGperPage] = useState(15)
  const indexLastVG = currentPage * VGperPage
  const indexFirstVG = indexLastVG - VGperPage
  const currentsVG = allVideoGame.slice(indexFirstVG, indexLastVG)

  const paginado = (numberPage) => (
    setCurrentPage(numberPage)
  )
  useEffect(() => {
    dispatch(getVideogames())
  }, [dispatch])

  return (
    <div className='body'>
      <Paginado
        VGperPage={VGperPage}
        allVideoGame={allVideoGame.length}
        paginado={paginado}
      />
 
      {currentsVG ?
       
          currentsVG.map((v) => {
            return(
              <div key={v.id} >
            <Card
              id={v.id}
             
              name={v.name}
              image={v.image}
              genres={v.genres.join(' ')}
            />
          </div>
            )
          
        

      }):
      (<h1>Cargando</h1>)}
    </div>
  )
}
export default Home