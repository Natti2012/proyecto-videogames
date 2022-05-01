
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { clearSearch, getVideogames } from "../../redux/actions";

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
    <form>
      <input
        type="text"
        placeholder="Videogame..."
        value={name}
        onChange={e =>
           handleInputchange(e)
          }
      />
      <button type="submit"
      onClick={(e)=>handleSubmit(e)}
        >Search</button>
    </form>
  );
}
