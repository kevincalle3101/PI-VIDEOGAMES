const {Router} = require('express');
const genres = Router();
const handlerGenres = require('../handlers/handlerGenres')
//traigo mi handlerGenres y se lo paso a mi ruta
genres.get('/', handlerGenres);

module.exports = genres;


