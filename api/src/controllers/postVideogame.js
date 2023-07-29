const { Videogame, Genres } = require('../db')
const { Op } = require('sequelize') //here i import the Op

const postVideogame = async (name, description, platform, image, landingDate, rating, genres, createdInDb) => {
    const PromiseCreateGame = Videogame.create({ name, description, platform, image, landingDate, rating, createdInDb }); //i execute the async functions from synchronously way;
    const PromiseFindGenres = Genres.findAll({ where: { name: { [Op.in]: genres } } }); //Op.in is not really necessary, but i used it to understand how "where" works when i give it an array;
    const [videogameCreated, getGenresDb] = await Promise.all([PromiseCreateGame, PromiseFindGenres]); //i wait the functions to resolved and then assign them to a variables;
    await videogameCreated.setGenres(getGenresDb); //this way i make the relation between the videogame that i created and his genres that came from the database;
}


module.exports = {
    postVideogame
}