import React from 'react'
import {Link} from 'react-router-dom'
import SearchBar from '../SearchBar'
import './NavBar.css'

function NavBar() {
  return (
    <div className='nav'>
       <ul className='menu'>
     <li ><Link to= '/home'className='items'>Home</Link></li>
     <li className='items'> Filter</li>
     <li><Link to= '/home/create/videogame'className='items'>Create a Videogame</Link></li>
     <li><SearchBar/></li>
      {/* <div className='filter-content'>
        <Link to= '/'>Genres</Link>
        <Link to= '/'>Name</Link>
        <Link to= '/'>Rating</Link>
      </div> */}
     
    
    {/* <li><Link to= '/'></Link></li>
    <li><Link to= '/'></Link></li> */}
  </ul>
    </div>
 
  )
}

export default NavBar