import React from 'react'
import { Link } from 'react-router-dom'
import './pagInicio.css'

function PagInicio() {
  return (

  <section className='background'>
    <div >
        <h1 className='texto'>Welcome..!!</h1>
        <Link to='/home'><button className='inicio_button'>Start</button></Link>
    </div>

  </section>
      

  )
}

export default PagInicio