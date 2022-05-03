import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './home.css'
import { filterByCreated, filterByGenres, getAllGenres, getVideogames, orderByName } from '../../redux/actions'
import Card from '../Card'
import Paginado from '../Paginado';
import NavBar from '../NavBar'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar'


function Home() {

  const dispatch = useDispatch();
  const allVideoGame = useSelector(state => state.videogames)
  const allGenres = useSelector(state => state.genres)
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
  useEffect(() => {
    dispatch(getAllGenres())
  }, [dispatch])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames())
  }
  function handleFilterGenres(e) {
    e.preventDefault();
    dispatch(filterByGenres(e.target.value))

  }
  function handleFilterByCreation(e) {
    e.preventDefault();
    dispatch(filterByCreated(e.target.value))

  }
   function handleOrderName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
  }
   function handleOrderRating(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
  }
  return (
    <div className='body'>
      <div>
        <NavBar />
        <div className='nav'>
          <ul className='menu'>

            <li><SearchBar /></li>
            <li><Link to='/home/create/videogame' className='items'>Create a Videogame</Link></li>
            <div>
              <select onChange={e => { handleOrderName(e) }}>
                 <option value='all'>Alphabetic</option>
                <option value='ascABC'>Ascendent</option>
                <option value='descABC'>Descendent</option>
              </select>
              <select onChange={e => { handleOrderRating(e) }}>
                <option value='all'>Rating</option>
                <option value='ascRating'>Ascendent</option>
                <option value='descRating'>Descendent</option>
              </select>

              <select onChange={e => { handleFilterGenres(e) }}>
                <option value='genres'>Genres</option>
                {allGenres.map(e => {
                  return (
                    <option key={e} value={e}>{e}</option>
                  )
                }
                )}
                <option value='genres'>Genres</option>
              </select>
              <select onChange={e => { handleFilterByCreation(e) }}>
                <option value='all' >All</option>
                <option value='created'>Created</option>
                <option value='api'>Existing</option>
              </select>
            </div>

          </ul>
        </div>

        )
        <button onClick={e => { handleClick(e) }}><Link to='/home' className='items'>Refresh🔄</Link></button>
      </div>

      <Paginado
        VGperPage={VGperPage}
        allVideoGame={allVideoGame.length}
        paginado={paginado}
      />

      {currentsVG ?

        currentsVG.map((v) => {
          return (
            <div key={v.id}  >
              <Card
                id={v.id}
                rating= {v.rating}
                name={v.name}
                image={v.image}
                genres={v.genres.join(' ')}
              />
            </div>
          )



        }) :
        (<h1>Cargando</h1>)}
    </div>
  )
}
export default Home