import axios from 'axios'
import { CLEAR_PAGE, GET_DETAILS_VIDEOGAMES, GET_VIDEOGAMES,CLEAR_SEARCH, FILTER_GENRES, ALL_GENRES, FILTER_CREATED, ORDER_NAME, ORDER_RATING } from "./actionsTypes";

export function getVideogames(name){
    return async dispatch=>{
        try {
            if(name){
             const resName = await axios.get(`http://localhost:3001/videogames?name=${name}`);  
               return dispatch({ type: GET_VIDEOGAMES, payload: resName.data })
            }else{
                 const res = await axios.get(`http://localhost:3001/videogames`)
            return dispatch({ type: GET_VIDEOGAMES, payload: res.data });
            }
           
        } catch (e) {
            return console.log(e);
        }
    }
}
export function getDetails(id){
    return async dispatch=>{
    try { console.log('holaaaaa')
            const res = await axios.get(`http://localhost:3001/videogame/${id}`);
            console.log('aaaaaaaa', res)
            return dispatch({ type: GET_DETAILS_VIDEOGAMES, payload: res.data });
        } catch (e) {
            return console.log(e);
        }

    }

}
export function clearPage(){
    return{
        type: CLEAR_PAGE
    }
}

export function clearSearch(){
    return{
        type: CLEAR_SEARCH
    }
}
export function getAllGenres(){
    return async dispatch=>{
        try { 
        const res = await axios.get(`http://localhost:3001/genres`);
        
        return dispatch({ type: ALL_GENRES , payload: res.data });
    } catch (e) {
        return console.log(e);
    }
}
}

export function filterByGenres(payload){
    return{
        type: FILTER_GENRES,
        payload
    }
}
export function filterByCreated(payload){
    return{
        type: FILTER_CREATED,
        payload
    }
}

export function orderByName(payload){
    return{
        type: ORDER_NAME,
        payload
    }
}

export function orderByRating(payload){
    return{
        type: ORDER_RATING,
        payload
    }
}


