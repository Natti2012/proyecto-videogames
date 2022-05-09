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
const apiData=async()=>{
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
    const ApiInfo = await promises.map(e => {
        return {
            id: e.id,
            name: e.name,
            image: e.background_image,
            rating: e.rating,
            genres: e.genres.map(e => e.name),
            created: 'created_Api',
        }
    })
    return ApiInfo
}
const ApiName= async (name)=>{
     const api = await axios.get(`https://api.rawg.io/api/games?search=${name}&&key=${API_KEY}`)
     const dataName = api.data.results.map(e=>{
          return {
            id: e.id,
            name: e.name,
            image: e.background_image,
            rating: e.rating,
            genres: e.genres.map(e => e.name),
            
        }
     })
 return dataName
}


router.get('/', async (req, res ,next) => {
    const { name } = req.query
   
    const ApiNameVg= await ApiName(name)
     const ApiVg= await apiData()
    const bdVg = await bdInfo()
    const bdData = bdVg.map(e => {
        return {
            id:e.id,
            name: e.name,
            image: e.image,
            rating :e.rating,
            created: 'created_DB',
            genres: e.genres.map(e => e.name)
        }
    })
    const allVideoGame = await bdData.concat(ApiVg)
    const CienGames = allVideoGame.slice(0, 100)

    
    if (name) {
        const bdFilter= await bdData.filter(e=> e.name.toUpperCase().includes(name.toUpperCase()))  
        const allgame= bdFilter.concat(ApiNameVg)
        try{
        
       
        if (allgame.length > 15) {
            let VideoGame15 = allgame.slice(0, 15)
            return res.json(VideoGame15) }
       if (allgame.length === 0) return res.status(400).json({ error: 'The requested video game was not found' })
        return res.json(allgame)
        }catch(error){
           next(error)

       
        
        }
        
       
    } else {
        return res.json(CienGames)
    }
})



module.exports = router