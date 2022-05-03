import React from 'react'

import { Link } from 'react-router-dom'



import './NavBar.css'

function NavBar() {
 

  return (
    <Link to='/home' className='items'>Home</Link>
  )
}

export default NavBar