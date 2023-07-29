import { GET_VIDEOGAMES, FILTER_CREATED, ORDER_AZ, ORDER_RATING, FILTER_BY_GENRE, GET_GENRES, GET_BY_NAME, RESET_HOME} from './action-types';
import axios from 'axios';

export const getVideogames = () => { //this function brings all the videogames and then put in payload
    return async (dispatch) => {
        try {
            const {data} = await axios.get('http://localhost:3001/videogames');
            return dispatch({
                type: GET_VIDEOGAMES,
                payload : data //here will be all the videogames
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const filterCreated = (payload)=>{  //this function receive an filter value and then put in payload
    return{
        type: FILTER_CREATED,
        payload: payload  //here will be the filter value
    }
}
export const orderAZ = (payload)=>{ //this function receive an order value and then put in payload
    return{
        type: ORDER_AZ,
        payload: payload //here will be the order value
    }
}
export const orderRating = (payload)=>{ //this function receive an order value and then put in payload
    return{
        type: ORDER_RATING,
        payload: payload    //here will be the order value
    }
}

export const filterGenres = (payload)=>{   //this function receive an filter value and then put in payload
    return{
        type: FILTER_BY_GENRE,
        payload: payload //here will be the filter value
    }
}
export const getGenres = () => {    //this function brings all genres 
    return async (dispatch)=> {
        try {
            const {data} = await axios.get('http://localhost:3001/genres');
            return dispatch({
                type: GET_GENRES,
                payload: data  //here will be all the genres
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const addVideogameInDb = (dataVideogame)=>{ //this function sends the properties to the backend to create a new videogame 
    const endpoint = 'http://localhost:3001/videogames';
    return async (dispatch) => {
        try {
            const {data} = await axios.post(endpoint, dataVideogame); 
            dispatch(getVideogames());
            dispatch(getGenres());
            alert(data)  // then returns if it was successful or not
            
        } catch (error) {
            alert("Faltan Datos");
        }
    }
}

export const getVideogameByName = (name)=>{  //this function make petition to the backend for search by name
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            return dispatch({
                type: GET_BY_NAME,
                payload: data //the results will be saved here
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const resetHome = () => { //this action is for reset anything change in home component to his default value
    return{
        type: RESET_HOME
    }
}