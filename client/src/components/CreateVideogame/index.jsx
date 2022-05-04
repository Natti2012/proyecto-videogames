import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateVideogame, getAllGenres, getVideogames } from '../../redux/actions'
import NavBar from '../NavBar'
import './CreateVideo.module.css'

export function validate(input) {
  let errors = {};
  // if (!input.name) {
  //   errors.name = 'Username is required';
  // // } else if (!/\S+@\S+\.\S+/.test(input.username)) {
  // //   errors.username = 'Username is invalid';
  // } else if(!input.description){
  //   errors.password = 'Password is required';
  // // } else if(!/(?=.*[0-9])/.test(input.password)){
  // //   errors.password = 'Password is invalid';
  // // }
  return errors;
}


function Createvideogame() {
  const allGenres = useSelector(state => state.genres)
  const [input, setInput] =useState({
  name: '',
  description:'', 
  platforms: [], 
  released:'', 
  rating:'', 
  image:'', 
  genres:[]
 })
 
 const [errors, setErrors]= useState({})
 const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getAllGenres())
  }, [dispatch])
useEffect(() => {
    dispatch(getVideogames())
  }, [dispatch])

  const handleInputChange = function(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
   }));
  }
  function handleSelect(e){
    setInput({
        ...input,
        platforms:[...input.platforms, e.target.value]
    })
    console.log(input)
}
  function handleSelectGenres(e){
    setInput({
        ...input,
        genres:[...input.genres, e.target.value]
    })
    console.log(input)
}

  function handleOnSubmit(e){
    e.preventDefault()
    dispatch(CreateVideogame())
  }
  return (
    <div ><div>
      <NavBar/>
      <div><h3>Create videogame</h3></div>
      <div>
        <form onSubmit={e=> handleOnSubmit(e)} >
          <div>
          <label >Name</label>
          <input
           type="text" 
           name="name" 
           placeholder="Ingrese un nombre"
           onChange={e => { handleInputChange(e) }}
           />
           {errors.username && <p className="danger">{errors.username}</p>}
          <br/>
          <label>Description</label>
          <input type="textarea" 
          name="description" 
          placeholder='Description..'
           onChange={e => { handleInputChange(e) }}
          />
          <br/>
          <div>
            <label>Platforms </label> 

           <select onChange={e => { handleSelect(e) }}>
             <option name='platforms' value="Play Station">Play Station</option>
             <option name='platforms' value="PC">PC</option>
             <option name='platforms' value="Nintendo">Nintendo</option>
             <option name='platforms' value="X-box">X-box</option>
           </select>
           <ul><li>{input.platforms.map((e)=> e + "-")}</li></ul> 
          </div>
          
          <br/>
          <label>Released</label>
          <input type='date'
          name="released"
          placeholder='Releaded date...'
           onChange={e => { handleInputChange(e) }}
          
          />
          <br/>
          <label>Rating</label> 
        
          <input type='number' 
          name='rating' 
          onChange={e => { handleInputChange(e) }}
          />
          <br/>
          <div>
             <label>Image
          <input type=''
          name= 'image' 
          accept='image/jpg, image/png,'
          onChange={e => { handleInputChange(e) }}
          />
          </label> 
          </div>
        
          <br/>
          <div>
             <label>Genres</label>
          <select onChange={e => { handleSelectGenres(e) }}>
            {allGenres.map(e=>{
              return(
                <option name= 'genres' key={e} value={e}>{e}</option>
              )
              
              })}
              
            </select >
             <ul><li>{input.genres.map((e)=> e + "-")}</li></ul>
          <br/>
          </div>
         
          <button type="submit">Create Videogame</button>
          </div>
        </form>
      </div>
    </div>
      
    </div>
    
  )
}

export default Createvideogame
//{ name, description, platforms, released, rating, image, genres 