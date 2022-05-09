const { Router } = require('express');
const { Videogame, Genre} = require('../db');
const axios = require('axios');
const router = Router();
const { API_KEY } = process.env


router.get('/:idVideogame', async (req, res, next) => {
    const { idVideogame } = req.params;
    if (!idVideogame.includes('-')) {
        const busquedaIdApi = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
  try {
       const DataId = busquedaIdApi.data
        const infoIdGame =
        {
            name: DataId.name,
            image: DataId.background_image,
            genres: DataId.genres.map(e => e.name),
            description: DataId.description_raw,
            released: DataId.released,
            rating: DataId.rating,
            platforms: DataId.parent_platforms.map(e => e.platform.name)
        }

        return res.json(infoIdGame)

  } catch (error) {
     next(error)
  }
       

    } else {
        try {
            const bdInfo = await Videogame.findOne({
            where:{
                 id: idVideogame
            },
            include: {
                model: Genre,
                atribute: ['name']
            }
        })
        const filterBd= {
           
             name: bdInfo.name,
            image: bdInfo.image,
            genres: bdInfo.genres.map(e=>e.name),
            description: bdInfo.description,
            released: bdInfo.released,
            rating: bdInfo.rating,
            platforms: bdInfo.platforms
            
        }
         return res.json(filterBd)
        } catch (error) {
            console.log(error)
        }

        
    }
})
router.post('/', async (req, res, next) => {
    const { name, description, platforms, released, rating, image, genres } = req.body;

    if (!name || !description || !platforms) return res.status(404).json({ error: 'send Required mandatory data' })
    try {
        let createvideo = await Videogame.create({
            name, description, platforms, released, rating, image
        })
        let genreMin= genres.map(e=>e.toLowerCase())
       let genreMayuscula= genreMin.map(e=> e.charAt(0).toUpperCase() + e.slice(1))
       console.log(genreMayuscula)
        let createGenre = await Genre.findAll({
            where: {
                name: genreMayuscula
            },
        })
       createvideo.addGenre(createGenre)


        res.status(200).json('Juego creado con exito!!')
    } catch (error) {
        next(error)
    }
})
module.exports = router