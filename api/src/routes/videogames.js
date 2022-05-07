const { Router } = require('express');
const { Videogame, Genre} = require('../db');
const axios = require('axios');
const router = Router();
const { API_KEY } = process.env

const bdInfo = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            atribute: ['name']
        }
    })
}

router.get('/', async (req, res, next) => {
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
            id: e.id,
            name: e.name,
            image: e.background_image,
            genres: e.genres.map(e => e.name)
        }
    })
    const bdVg = await bdInfo()
    const bdFilter = bdVg.map(e => {
        return {
            id:e.id,
            name: e.name,
            image: e.image,
            genres: e.genres.map(e => e.name)
        }
    })
    const allVideoGame = await bdFilter.concat(ApiInfo)
    const CienGames = allVideoGame.slice(0, 100)

    
    if (name) {
        try{
            let filterVideo = await allVideoGame.filter(e => e.name.toUpperCase().includes(name.toUpperCase()))
       
        if (filterVideo.length > 15) {
            let VideoGame15 = filterVideo.slice(0, 15)
            return res.json(VideoGame15) }
       if (filterVideo.length === 0) return res.status(400).json({ error: 'The requested video game was not found' })
        return res.json(filterVideo)
        }catch(error){
            next(error)

       
        
        }
        
       
    } else {
        return res.json(CienGames)
    }
})


module.exports = router