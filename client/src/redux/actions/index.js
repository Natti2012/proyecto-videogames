import axios from 'axios'
import { CLEAR_PAGE, GET_DETAILS_VIDEOGAMES, GET_VIDEOGAMES,CLEAR_SEARCH } from "./actionsTypes";

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



