import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getVideogames } from '../../redux/actions'
import Card from '../Card'

function Home() {
  
  const dispatch = useDispatch();
  const game  = useSelector(state=>state.videogames)
  useEffect(()=>{
    dispatch(getVideogames())
  },[dispatch])

  
  return (
  
    <div>
      {game.map(v => <Card
        id={v.id}
        key={v.id}
        name={v.name}
        image={v.image}
        genres={v.genres.join(' ')}

      />)}
    </div>
  )
}

export default Home