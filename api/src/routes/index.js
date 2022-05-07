const { Router } = require('express');
const videogames  = require('./videogames')
const videogame  = require('./videogame')
const genres = require('./genres')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//
router.use('/videogames',videogames)
router.use('/videogame',videogame)
router.use('/genres', genres)
// const bdInfo = async () => {
//     return await Videogame.findAll({
//         include: {
//             model: Genre,
//             atribute: ['name']
//         }
//     })
// }
// const apiData=async()=>{
//       const api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
//     const api2 = await axios.get(api.data.next)
//     const api3 = await axios.get(api2.data.next)
//     const api4 = await axios.get(api3.data.next)
//     const api5 = await axios.get(api4.data.next)

//     const promises = api.data.results
//         .concat(api2.data.results)
//         .concat(api3.data.results)
//         .concat(api4.data.results)
//         .concat(api5.data.results)
//     const ApiInfo = await promises.map(e => {
//         return {
//             id: e.id,
//             name: e.name,
//             image: e.background_image,
//             rating: e.rating,
//             genres: e.genres.map(e => e.name),
//             created: 'created_Api',
//         }
//     })
//     return ApiInfo
// }
// const ApiName= async (name)=>{
//      const api = await axios.get(`https://api.rawg.io/api/games?search=${name}&&key=${API_KEY}`)
//      const dataName = api.data.results.map(e=>{
//           return {
//             id: e.id,
//             name: e.name,
//             image: e.background_image,
//             rating: e.rating,
//             genres: e.genres.map(e => e.name),
            
//         }
//      })
//  return dataName
// }


// router.get('/videogames', async (req, res ,next) => {
//     const { name } = req.query
   
//     const ApiNameVg= await ApiName(name)
//      const ApiVg= await apiData()
//     const bdVg = await bdInfo()
//     const bdData = bdVg.map(e => {
//         return {
//             id:e.id,
//             name: e.name,
//             image: e.image,
//             rating :e.rating,
//             created: 'created_DB',
//             genres: e.genres.map(e => e.name)
//         }
//     })
//     const allVideoGame = await bdData.concat(ApiVg)
//     const CienGames = allVideoGame.slice(0, 100)

    
//     if (name) {
//         const bdFilter= await bdData.filter(e=> e.name.toUpperCase().includes(name.toUpperCase()))  
//         const allgame= bdFilter.concat(ApiNameVg)
//         try{
        
       
//         if (allgame.length > 15) {
//             let VideoGame15 = allgame.slice(0, 15)
//             return res.json(VideoGame15) }
//        if (allgame.length === 0) return res.status(400).json({ error: 'The requested video game was not found' })
//         return res.json(allgame)
//         }catch(error){
//            next(error)

       
        
//         }
        
       
//     } else {
//         return res.json(CienGames)
//     }
// })



// router.get('/videogame/:idVideogame', async (req, res, next) => {
//     const { idVideogame } = req.params;
//     if (!idVideogame.includes('-')) {
//         const busquedaIdApi = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
//   try {
//        const DataId = busquedaIdApi.data
//         const infoIdGame =
//         {
//             name: DataId.name,
//             image: DataId.background_image,
//             genres: DataId.genres.map(e => e.name),
//             description: DataId.description_raw,
//             released: DataId.released,
//             rating: DataId.rating,
//             platforms: DataId.platforms.map(e => e.platform.name)
//         }

//         return res.json(infoIdGame)

//   } catch (error) {
//      next(error)
//   }
       

//     } else {
//         try {
//             const bdInfo = await Videogame.findOne({
//             where:{
//                  id: idVideogame
//             },
//             include: {
//                 model: Genre,
//                 atribute: ['name']
//             }
//         })
//         const filterBd= {
           
//              name: bdInfo.name,
//             image: bdInfo.image,
//             genres: bdInfo.genres.map(e=>e.name),
//             description: bdInfo.description,
//             released: bdInfo.released,
//             rating: bdInfo.rating,
//             platforms: bdInfo.platforms
            
//         }
//          return res.json(filterBd)
//         } catch (error) {
//             console.log(error)
//         }

        
//     }
// })




// router.get('/genres', async (req, res, next) => {
//   try {
//        const genresInfo = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
//     const GenresName = await genresInfo.data.results.map(e => { return e.name })
//     const createGenre = await GenresName.map(e => {
//         Genre.findOrCreate({
//             where: {
//                 name: e
//             }
//         })
//     }
//     )
 
//     res.json(GenresName)
//   } catch (error) {
//      next(error)
//   } 
// });


// router.post('/videogame', async (req, res, next) => {
//     const { name, description, platforms, released, rating, image, genres } = req.body;

//     if (!name || !description || !platforms) return res.status(404).json({ error: 'send Required mandatory data' })
//     try {
//         let createvideo = await Videogame.create({
//             name, description, platforms, released, rating, image
//         })
//         let genreMin= genres.map(e=>e.toLowerCase())
//        let genreMayuscula= genreMin.map(e=> e.charAt(0).toUpperCase() + e.slice(1))
//        console.log(genreMayuscula)
//         let createGenre = await Genre.findAll({
//             where: {
//                 name: genreMayuscula
//             },
//         })
//        createvideo.addGenre(createGenre)


//         res.status(200).json('Juego creado con exito!!')
//     } catch (error) {
//         next(error)
//     }
// })
router.delete('/delete', async (req, res , next)=>{
    const {name}= req.query
try {
    await Videogame.destroy({
        where:{
            name: name
        }
    })

  res.status(200).json({msg: 'juego borrado  con exito'})
} catch (error) {
    next(error)
}
  
})


module.exports = router;
