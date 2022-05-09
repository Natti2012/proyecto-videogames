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
  } else if (!/^[A-Za-z0-9_-\s]*$/.test(input.name)) {
    errors.name = 'Name is invalid: Only letters numbers and hyphens are allowed';

  } if (!/^([0-4]((\.[0-9])|(\.?))|(5)(\.?|\.0))$/.test(input.rating)) {
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
      console.log(input)
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
  }


  function deletePlatforms(e) {
    const deletePlat = input.platforms.filter((el) => el.name !== e.target.value)

    console.log(deletePlat)
    setInput({
      ...input,
      platforms: deletePlat
    }

    )


  }
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
      <NavBar className='nav-detail' margin-top="20px"/>

      <div >


        <div><h3>Add your vigeogame..</h3></div>
        <div>
          <form onSubmit={e => handleOnSubmit(e)} className='form'>
            <div>
              <br />
              <label >Name
                <input
                  type="text"
                  name="name"
                  placeholder="Enter a name"
                  onChange={e => { handleInputChange(e) }}
                  className='create_input'
                />
                {errors.name && <p className="danger">{errors.name}</p>}
              </label>
              <br />
              <label>Description
                <input type="textarea"
                  name="description"
                  placeholder='Enter a Description..'
                  onChange={e => { handleInputChange(e) }}
                  className='create_input'
                />
                {errors.description && <p className="danger">{errors.description}</p>}
                <br /></label>

              <label>Rating

                <input
                  list="rating" type='number' name='rating' min="0" max="5" step="any"
                  placeholder='Number between 0 and 5'
                  onChange={e => { handleInputChange(e) }}
                  className='create_input'
               />
                
               
                {errors.rating && <p className="danger">{errors.rating}</p>}
              </label>
              <br />
              <div>
                <label>Image
                  <input type='text'
                    name='image'
                    placeholder='Enter image URL..'


                    onChange={e => { handleInputChange(e) }}
                    className='create_input'
                  />
                  {errors.image && <p className="danger">{errors.image}</p>}
                </label>
                <br />

              </div>
              <label>Released
                <input type='date'
                  name="released"
                  placeholder='Releaded date...'
                  onChange={e => { handleInputChange(e) }}
                  className='create_input'
                />
                {errors.released && <p className="danger">{errors.released}</p>}

              </label>
            </div>
            <div>
              <br />
              <label>Platforms

                <select onChange={e => { handleSelect(e) }}>
                  <option >Platforms</option>
                  <option name='platforms' value="Play Station">Play Station</option>
                  <option name='platforms' value="PC">PC</option>
                  <option name='platforms' value="Nintendo">Nintendo</option>
                  <option name='platforms' value="X-box">X-box</option>
                </select>
                <ul>
                  {input.platforms.map((e) =>
                    <div key={e + 1}>
                      <li key={e}> {e}</li>
                      <button type="button" value={input.platforms.name} onChange={(e) => deletePlatforms(e)}> X</button>
                    </div>
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
                <ul><li>{input.genres.map((e) => e + "-")}</li></ul>
                {errors.genres && <p className="danger">{errors.genres}</p>}

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