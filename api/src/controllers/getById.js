require('dotenv').config(); // i made imports that i'll need
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games/`;
const { Videogame, Genres } = require('../db');
const axios = require('axios');


const getById = async (id) => {
    if(isNaN(id)) { // ask if it's not a number
        const videogameData = await Videogame.findOne({
            where: {
              id: id //this is the conditional to bring the object
            },
            attributes: ['name', 'description', 'image', 'landingDate', 'rating', 'platform'],  //i select the attributes that i want to bring
            include: Genres});
        return videogameData;
    } else{  //if it's a number
        const { data } = await axios.get(`${URL}${id}?key=${API_KEY}`);
        let videogameFiltered =
        {
            id: data.id,
            name: data.name,
            image: data.background_image,
            platforms: data.platforms.map(platf => platf.platform.name), //
            description: data.description_raw,
            released: data.released,  //                                      //
            rating: data.rating,
            genres: data.genres.map(genre => genre.name) //i establish the properties that my object will have  //
        }
        return videogameFiltered;
    }

}

module.exports = {
    getById
}