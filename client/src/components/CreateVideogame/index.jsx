import React, { useState } from 'react'
import NavBar from '../NavBar'

function Createvideogame() {
  const [name, setName]= useState('')
  const [description, setDescription]= useState('')
  const [platforms, setPlatforms]= useState('')
  const [released, setReleased]= useState('')
  const [rating, setRating]= useState('')
  const [ image, setImage]= useState('')
  const [genres, setGenres]= useState('')
  const [error, setError]= useState('')

  function handleChange(e) {
    e.preventDefault();
   setName(e.target.value))
  }
  return (
    <div>
      <NavBar/>
      <div>Createvideogame<input type="text" name="name" onChange={handleChange}></input>/</div>
      <div>
        <form>
          <label>Name</label>
          <br/>
          <label>Description</label>
          <br/>
          <label>Platforms </label>
          <br/>
          <label>Released</label>
          <br/>
          <label>Rating</label>
          <br/>
          <label>Image</label>
          <br/>
          <label>Genres</label>
          <br/>

        </form>
      </div>
    </div>
    
  )
}

export default Createvideogame
//{ name, description, platforms, released, rating, image, genres 