import { GET_VIDEOGAMES, FILTER_CREATED, ORDER_AZ, ORDER_RATING, FILTER_BY_GENRE, GET_GENRES, GET_BY_NAME, RESET_HOME} from "./action-types";

const initialState = {
    allVideogames: [], //i'll work with videogamesCopy but i'll return allVideogames
    videogamesCopy: [],
    allGenres: []
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_VIDEOGAMES:
            return {
                ...initialState,
                allVideogames: payload,
                videogamesCopy: payload
            }
        case FILTER_BY_GENRE:
            const genreDefault = [...state.videogamesCopy];
            const allVideogamesGenreCopy = [...state.videogamesCopy];
            const videogamesFilteredByName = allVideogamesGenreCopy.filter(videogame => videogame.createdInDb ? videogame.Genres.some(game => game.name === payload) :
                videogame.genres.includes(payload))
            return {
                ...state,
                allVideogames: payload === 'allGenres' ? genreDefault : videogamesFilteredByName
            }
        case FILTER_CREATED:
            const videogamesApiAndDb = [...state.videogamesCopy];
            const allVideogamesCreated = [...state.videogamesCopy];
            const filterVideogamesCreated = payload === 'created' ? allVideogamesCreated.filter(videogame => videogame.createdInDb) :
                allVideogamesCreated.filter(videogame => !videogame.createdInDb)
            return {
                ...state,
                allVideogames: payload === 'allVideogames' ? videogamesApiAndDb : filterVideogamesCreated
            }
        case ORDER_AZ:
            const orderDefault = [...state.videogamesCopy];
            const allVideogamesOrder = [...state.videogamesCopy];
            const videogamesOrderToAZ = payload === 'A' ? allVideogamesOrder.sort((a, b) => {
                if (a.name > b.name) {
                    return 1
                }
                if (a.name < b.name) {
                    return -1
                }
                return 0
            }) :
                allVideogamesOrder.sort((a, b) => {
                    if (a.name > b.name) {
                        return -1
                    }
                    if (a.name < b.name) {
                        return 1
                    }
                    return 0
                }) //this is to order from A to Z 
            return {
                ...state,
                allVideogames: payload === 'default' ? orderDefault : videogamesOrderToAZ
            }
        case ORDER_RATING:
            const ratingDefault = [...state.videogamesCopy];
            const allVideogamesRating = [...state.videogamesCopy];
            const orderByRating = payload === 'minor' ? allVideogamesRating.sort((a, b) => a.rating - b.rating) : allVideogamesRating.sort((a, b) => b.rating - a.rating)
            return {
                ...state,
                allVideogames: payload === "allRatings" ? ratingDefault : orderByRating
            }
        case GET_GENRES: 
            return {
                ...state,
                allGenres: payload
            }
        case GET_BY_NAME:
            return {
                ...state,
                allVideogames: payload
            }
        case RESET_HOME:
            const originalHome = [...state.videogamesCopy];
            return {
                ...state,
                allVideogames: originalHome
            }
        default:
            return state

    }
}

export default reducer;