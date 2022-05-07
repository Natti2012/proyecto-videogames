const { Router } = require('express');
const videogames  = require('./videogames')
const videogame  = require('./videogame')
const genres = require('./genres')


const router = Router();

router.use('/videogames',videogames)
router.use('/videogame',videogame)
router.use('/genres', genres)

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
