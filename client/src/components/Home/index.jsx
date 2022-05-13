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
  const indexLastVG = currentPage * VGperPage   //  1 * 15
  const indexFirstVG = indexLastVG - VGperPage  //   15 - 15 
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
    <div className='backgroundHome'>
      <div className='navTotal'>
        <div className='navHome'>
            <NavBar />
           <SearchBar />
       
          <div className='create'>
            <Link to='/create/videogame' >Create a Videogame</Link>
         </div>
         
        
       </div>
         <div className='All_select'>
 <div className="caja">
          <select onChange={e => { handleOrderRating(e) }} className= 'select'>
            <option value='all'>Rating</option>
            <option value='ascRating'>Ascendent</option>
            <option value='descRating'>Descendent</option>
          </select>
          </div>
          <div className="caja">
          <select onChange={e => { handleFilterGenres(e) }} className= 'select'>
            <option value='genres'>Genres</option>
            {allGenres.map(e => {
              return (
                <option key={e} value={e}>{e}</option>
              )
            }
            )}
            <option value='genres'>Genres</option>
          </select>
          </div>
          <div className="caja">
          <select onChange={e => { handleFilterByCreation(e) }} className= 'select'>
            <option value='all' >Creation Origin</option>
            <option value='created_DB'>Created</option>
            <option value='created_Api'>Existing</option>
          </select>
          </div> 
          <div className="caja">
          <select onChange={e => { handleOrderName(e) }} className= 'select' >
            <option value='all'>Alphabetic</option>
            <option value='ascABC'>Ascendent</option>
            <option value='descABC'>Descendent</option>
          </select>
          <div/>
          </div>
          <div className="caja">
             <button onClick={e => { handleClick(e) }}className=' boton_refresh'><Link to='/home' >Refresh filters</Link></button>
          </div>
       </div>
        
         
         
         
         
      </div>
      <div>
        <Paginado
        VGperPage={VGperPage}
        allVideoGame={allVideoGame.length}
        paginado={paginado}
        className='pagination'
      />
      <div className='cards'>


        {currentsVG.length !== 0 ?

          currentsVG.map((v) => {
            return (
              <div key={v.id} >
                <Card
                  id={v.id}
                  rating={v.rating}
                  name={v.name}
                  image={v.image}
                  genres={v.genres.join(' ')}
                />
              </div>
            )
          })  

                         :
          (
            <div className='cargando'>
            
              <h1 >Cargando...</h1>
            </div>
  
          )
          }
      </div>
      
       </div>
      </div>
  )}
  

export default Home
 //   https://i.gifer.com/origin/a9/a90e81a8457d02b6a7f6fa188bf9ca4c_w200.webp
