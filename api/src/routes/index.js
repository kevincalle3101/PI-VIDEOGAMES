const { Router } = require('express'); //Importo el router
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require('./videogamesRoutes');
const genres = require('./genresRoutes')
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames',videogames);//los separo por rutas para diferenciarlos mejor

router.use('/genres',genres)


module.exports = router;
