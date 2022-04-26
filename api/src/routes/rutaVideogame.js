const { Router } = require('express');
const { Videogame, Genre} = require('../db');
const { Op, videogame} = require('../db');
const router = Router();
