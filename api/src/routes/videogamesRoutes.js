const {Router} = require('express');
const videogames = Router();
const {handlerVideogames, handlerById, postNewVideogame} = require('../handlers/handlerVideogame')
//traje los handlers con los que trabajaré las req y res(indirectamente ya les estoy pasando el req y el res)
videogames.get('/', handlerVideogames);

videogames.get('/:id', handlerById);

videogames.post('/', postNewVideogame);

module.exports = videogames;