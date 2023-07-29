require('dotenv').config(); // i made imports that i'll need
const {API_KEY} = process.env; 
const axios = require ('axios');
const {Videogame, Genres} = require('../db');
const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const getVideogamesApi = async ()=>{ 
    const getAllVideogamesApi = []
    for(let i = 1; i<5; i++){ // i do a for loop because i can´t get 100 videogames with an only single peticion
        const {data} = await axios.get(`${URL}&page=${i}&page_size=25`);
        let videogamesMapped = data.results.map(videogame => { 
            return {
                id: videogame.id,
                name: videogame.name,
                image: videogame.background_image,
                platforms : videogame.platforms.map(platf => platf.platform.name), //
                description: videogame.description_raw,
                released: videogame.released,  //                                      //
                rating: videogame.rating,
                genres: videogame.genres.map(genre => genre.name), //i establish the properties that my object will have  //
            }
        })
        getAllVideogamesApi.push(...videogamesMapped)
    }
    return getAllVideogamesApi;//i return an array of videogames filtered from the api
}

const getAllVideogames = async ()=>{
    const promiseVideogamesApi =  getVideogamesApi();
    const promiseVideogamesDb =  Videogame.findAll({
        include: Genres
    });
    let allVideogames = [];
    let[allVideogamesApi, allVideogamesDb] = await Promise.all([promiseVideogamesApi, promiseVideogamesDb]); //i bring and execute 2 async functions and assign them to 2 variables 
    allVideogames = [...allVideogamesApi, ...allVideogamesDb];//i concatenate the 2 arrays and returns them in a single array
    return allVideogames ;
}



module.exports = {getAllVideogames};


























