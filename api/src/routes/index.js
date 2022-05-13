const { Router } = require('express');
const videogames  = require('./videogames')
const videogame  = require('./videogame')
const genres = require('./genres')
const { Videogame, } = require('../db');


const router = Router();

router.use('/videogames',videogames)
router.use('/videogame',videogame)
router.use('/genres', genres)




module.exports = router;
