import React from 'react'
import { Link } from 'react-router-dom'
import './pagInicio.css'

function PagInicio() {
  return (

  
      <div >
        <h1>Welcome..!!</h1>
        <Link to='/home'><button className='button'>Ingresar</button></Link>
     

    </div>


  )
}

export default PagInicio