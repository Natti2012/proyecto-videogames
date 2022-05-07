
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearSearch, getVideogames } from "../../redux/actions";
import './searchBar.css'
export default function SearchBar() {
  const dispatch= useDispatch()
  const [name,setName] = useState("");

  
  function handleInputchange(e){
    e.preventDefault()
    setName(e.target.value)
  }
  function handleSubmit(e){
    e.preventDefault()
    dispatch(getVideogames(name))
    setName('')
    return(
      dispatch(clearSearch())
    )
  }


 
  return (
    <div className="container">
       <form className="search">
      <input
        type="text"
        placeholder="Search Videogame..."
        value={name}
        onChange={e =>
           handleInputchange(e)
          }
          className='search_input'
      />
      <button type="submit"
      onClick={(e)=>handleSubmit(e)}
      className='search_button'
        >Search</button>
    </form>
    </div>
   
  );
}
