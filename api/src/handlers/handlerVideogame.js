const { getAllVideogames } = require('../controllers/getVideogames');//traigo las funciones con las que trabajaré
const { getByName } = require('../controllers/getByName');
const {getById} = require('../controllers/getById');
const {postVideogame} = require('../controllers/postVideogame');

const handlerVideogames = async (req, res) => {
    const { name } = req.query; //traigo el query con el que trabajaré
    if (name) {
        const resultByName = await getByName(name); //ejecuto la función para traer el array de las coincidencias;
        if (resultByName.length) return res.json(resultByName);//si no está vacio, respondo con el array;
        return res.status(400).send("No matches found");
    }
    let resultAllVideogames = await getAllVideogames(); //en el caso de que no haya una query ejecuto la función de traer todos los objetos;
    return res.status(200).json(resultAllVideogames);

}

const handlerById = async (req, res) => { 
    const { id } = req.params;
    try {
        let arrByName = await getById(id); // i execute the function to get the object
        if(arrByName) //i ask if the response is different to undefined
        return res.status(200).json(arrByName);
        return res.status(400).send("No matches found"); // this not really necessary but i put it because i may have a problem in frontend
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const postNewVideogame = async (req, res) => {
    const { name, description, platform, image, landingDate, rating, genres, createdInDb } = req.body;
    try {
        if(name && description && platform && image && landingDate && rating && genres&& createdInDb){
        await postVideogame(name, description, platform, image, landingDate, rating, genres, createdInDb);
        return res.status(200).send("The game was created successfully")};
        return res.status(400).send("Missing data");

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


module.exports = {
    handlerVideogames, handlerById,
    postNewVideogame
}