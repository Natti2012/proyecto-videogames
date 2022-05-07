import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CreateVideogame, getAllGenres, getVideogames } from '../../redux/actions'
import NavBar from '../NavBar'
import './CreateVideo.css'

export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'Name is required';
  } else if (!/^[A-Za-z0-9_-]*$/.test(input.name)) {
    errors.name = 'Name is invalid: Only letters numbers and hyphens are allowed';

  } if (!/^[+]?([0-5]*\.[0-9]+|[0-5])*$/.test(input.rating)) {
    errors.rating = 'Rating must be a value between 0 and 5';
  } if (!input.description) {
    errors.description = 'Description is required';
  } if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(input.image)) {
    errors.image = 'Invalid image: URL format required '
  }
  if (input.platforms.length === 0) {
    errors.platforms = 'Platforms is required';

  } if (!/(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$/.test(input.released)) {
    errors.released = 'Released date is invalid'
  }

  return errors;
}


function Createvideogame() {
  const allGenres = useSelector(state => state.genres)
  const [input, setInput] = useState({
    name: null,
    description: null,
    platforms: [],
    released: null,
    rating: 0,
    image: null,
    genres: []
  })

  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const history = useHistory()


  useEffect(() => {
    dispatch(getAllGenres())
  }, [dispatch])
  useEffect(() => {
    dispatch(getVideogames())
  }, [dispatch])

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  }
  function handleSelect(e) {
    const platRepeat = input.platforms.includes(e.target.value)
    if (!platRepeat) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value]
      }) 
    
    }
    
 else{
      setInput({
        ...input,
        platforms : input.platforms.filter((e) => e.name !== e.target.value) 
      })
       
    }
  }
  function handleSelectGenres(e) {
    const genresRepeat = input.genres.includes(e.target.value)

    if (!genresRepeat) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value]
      })
    
    }
    else{
      setInput({
        ...input,
        genres : input.genres.filter((e) => e.name !== e.target.value) 
      })
    
    }
    }
  


  // function deletePlatforms(e) {
  //   const deletePlat = input.platforms.includes(e.target.value) ?
      
  //     input.platforms.push(e.target.value)
  //   setInput({
  //     ...input,
  //     platforms: deletePlat
  //   }

  //   )


  // }
  function handleOnSubmit(e) {
    e.preventDefault()


    if (Object.keys(errors).length === 0 && input.name && input.description && input.platforms) {
      dispatch(CreateVideogame(input))
      console.log(input)
      alert('Videogame creado')
      setInput({
        name: '',
        description: '',
        platforms: [],
        released: '',
        rating: '',
        image: '',
        genres: []
      })
      history.push('/home')
    } else {
      alert('The videogame cannot be created. Check the data entered')
    }

  }
  return (
    <section className='create_backG' >
       <NavBar />

      <div >

       
        <div><h3>Add your vigeogame..</h3></div>
        <div>
          <form onSubmit={e => handleOnSubmit(e)}className='form'>
            <div>
               <br/>
              <label >Name
              <input
                type="text"
                name="name"
                placeholder="Ingrese un nombre"
                onChange={e => { handleInputChange(e) }}
                className='create_input'
              />
              {errors.name && <p className="danger">{errors.name}</p>}
              </label>
              <br/>
              <label>Description
              <input type="textarea"
                name="description"
                placeholder='Description..'
                onChange={e => { handleInputChange(e) }}
                className='create_input'
              />
              <br/></label>
              
              <label>Rating</label>

              <input type='range'
                name='rating'
                min="0" max="10"
                onChange={e => { handleInputChange(e) }}
                className='create_input'
              />
              
              <br />
              <div>
                <label>Image
                  <input type='text'
                    name='image'

                    onChange={e => { handleInputChange(e) }}
                    className='create_input'
                  />
                </label> 
                <br />
               
              </div>
              <label>Released
              <input type='date'
                name="released"
                placeholder='Releaded date...'
                onChange={e => { handleInputChange(e) }}
                className='create_input'
              /></label>
            </div>
            <div>
            <br />
              <label>Platforms

              <select onChange={e => { handleSelect(e) }}>
                <option name='platforms' value="">Platforms</option>
                <option name='platforms' value="Play Station">Play Station</option>
                <option name='platforms' value="PC">PC</option>
                <option name='platforms' value="Nintendo">Nintendo</option>
                <option name='platforms' value="X-box">X-box</option>
              </select>
              <ul>
                {input.platforms.map((e) =>
                <li key= {e} name= {e} value={e}>{e + ' '}
                  <button  value={input.platforms.name} onClick={(e) => handleSelect(e)}> X</button>
                </li>
                  
                  
                )}
              </ul>
              {errors.platforms && <p className="danger">{errors.platforms}</p>}
              </label>

              
              <div>
                <label>Genres
                 
                <select onChange={e => { handleSelectGenres(e) }}>
                  {allGenres.map(e => {
                    return (
                    
                        <option name='genres' key={e} value={e}>{e}</option>
                    
                      
                    )

                  })}

                </select ></label>
                <ul>{input.genres.map((e) =>

                  <button key={e} value={input.platforms.name} onClick={(e) => handleSelectGenres(e)}>{e} X</button>
               )}
               </ul>
                {errors.description && <p className="danger">{errors.description}</p>}
                <br />
              </div>

              <button type="submit" className='createButton'>Create Videogame</button>
            </div>
          </form>
        </div>
      </div>
    </section>

  )
}

export default Createvideogame
//{ name, description, platforms, released, rating, image, genres 