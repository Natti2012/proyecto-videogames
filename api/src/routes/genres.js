const { Router } = require('express');
const {  Genre} = require('../db');
const axios = require('axios');
const router = Router();
const { API_KEY } = process.env

router.get('/', async (req, res, next) => {
    try {
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
    } catch (error) {
       next(error)
    } 
  });
  module.exports = router