require('dotenv').config();
const {API_KEY} = process.env;
const axios = require ('axios');
const {Genres} = require('../db');
const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const getGenres = async ()=>{
    const genresNoRepeated = [];
    const getAllApiGenres = []
    for(let i = 1; i<5; i++){ 
        const {data} = await axios.get(`${URL}&page=${i}&page_size=25`); //i make a foor loop for to bring 100 objects from my API
        let genresMapped = data.results.map(videogame => { //[[],[],[],...] this is the struture of my genresMapped
            return videogame.genres.map(genre => genre.name);
        }).flat(); //i remove a subnivel of the array
        getAllApiGenres.push(...genresMapped);
    }
     for(genre of getAllApiGenres){ // i iterate over the array and made a new genre in my database
        await Genres.findOrCreate({
            where:{
                name:genre
            }
        })
        !genresNoRepeated.includes(genre)&&genresNoRepeated.push(genre);
    }
    return genresNoRepeated;
    
}

module.exports = {getGenres};