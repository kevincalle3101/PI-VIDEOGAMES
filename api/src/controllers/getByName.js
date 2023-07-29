const { getAllVideogames } = require('./getVideogames'); // i bring the function that brings me all the videogames;
const getByName = async (name) => {
    const allGames = await getAllVideogames();
    let videogamesFinded = [];
    for (videogame of allGames) { //i iterate over the array for compares the parameter with the properties "name" from the objects;
        if (videogamesFinded.length < 15 && videogame.name.toLowerCase().includes(name.toLowerCase())) { //i dont want to have more than 15 elements;
            videogamesFinded.push(videogame);//if we arrive to here, we add the object to the array
        }
    }
    return videogamesFinded;
}
module.exports = {
    getByName,
}
