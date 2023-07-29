const {getGenres} = require('../controllers/getGenres')

const handlerGenres = async (req, res)=>{
    try {
      const allGenres = await getGenres();
      res.json(allGenres);
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

module.exports = handlerGenres;