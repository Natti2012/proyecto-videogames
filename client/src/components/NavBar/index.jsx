import React from 'react'

import { Link } from 'react-router-dom'



import './NavBar.css'

function NavBar() {
 

  return (
    <div className='nav'>
       <Link to='/home' className='letra'>Home</Link>
    </div>
   

    
  )
}

export default NavBar