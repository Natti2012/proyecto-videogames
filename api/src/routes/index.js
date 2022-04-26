const { Router } = require('express');
const { rutagame } = require('./rutaVideogame')
const { Videogame, Genre } = require('../db')
const axios = require('axios');

const { API_KEY } = process.env
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//


const bdInfo = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            atribute: ['name']
        }
    })
}



router.get('/videogames', async (req, res) => {
    const { name } = req.query
   const api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    const api2 = await axios.get(api.data.next)
    const api3 = await axios.get(api2.data.next)
    const api4 = await axios.get(api3.data.next)
    const api5 = await axios.get(api4.data.next)

    const promises = api.data.results
        .concat(api2.data.results)
        .concat(api3.data.results)
        .concat(api4.data.results)
        .concat(api5.data.results)
    const ApiInfo = promises.map(e => {
        return {
            name: e.name,
            image: e.background_image,
            genres: e.genres.map(e => e.name)
        }
    })
    const bdVg = await bdInfo()
    const bdFilter = bdVg.map(e => {
        return {
            name: e.name,
            image: e.image,
            genres: e.genres.map(e => e.name)
        }
    })
    const allVideoGame = await bdFilter.concat(ApiInfo)
    const CienGames = allVideoGame.slice(0, 100)
    if (name) {
        let filterVideo = await allVideoGame.filter(e => e.name.toUpperCase().includes(name.toUpperCase()))
       
        if (filterVideo.length > 15) {
            let VideoGame15 = filterVideo.slice(0, 15)
            return res.json(VideoGame15)
        }
        if (filterVideo.length === 0) return res.status(400).json({ error: 'The requested video game was not found' })
        return res.json(filterVideo)
    } else {
        return res.json(CienGames)
    }


})



router.get('/videogame/:idVideogame', async (req, res) => {
    const { idVideogame } = req.params;
    if (!idVideogame.includes('-')) {
        const busquedaIdApi = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)

        const DataId = busquedaIdApi.data
        const infoIdGame =
        {
            name: DataId.name,
            image: DataId.background_image,
            genres: DataId.genres.map(e => e.name),
            descrption: DataId.description,
            released: DataId.released,
            rating: DataId.rating,
            platforms: DataId.platforms.map(e => e.platform.name)
        }

        return res.json(infoIdGame)


    } else {

        const bdInfo = await Videogame.findAll({
            where:{
             id: idVideogame
            },
            include: {
                model: Genre,
                atribute: ['name']
            }
        })
        const filterBd= bdInfo.map(e=>{
            return{
             name: e.name,
            image: e.image,
            genres: e.genres.map(e=>e.name),
            descrption: e.description,
            released: e.released,
            rating: e.rating,
            platforms: e.platforms
            }
        })
         return res.json(filterBd)
    }
})




router.get('/genres', async (req, res, next) => {
    const genresInfo = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const GenresName = await genresInfo.data.results.map(e => { return e.name })
    const createGenre = await GenresName.map(e => {
        Genre.findOrCreate({
            where: {
                name: e
            }
        })
    }
    )
 
    res.json(GenresName)
});


router.post('/videogame', async (req, res, next) => {
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

module.exports = router;
