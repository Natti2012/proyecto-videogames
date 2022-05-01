import{CLEAR_PAGE, GET_DETAILS_VIDEOGAMES, GET_VIDEOGAMES, CLEAR_SEARCH} from '../actions/actionsTypes'
const inicialState={
    videogames : [],
    details: {}
}
function  rootReducer (state= inicialState, {type, payload}){
switch(type){
    case GET_VIDEOGAMES : return{
        ...state,
        videogames: payload
    };
    case GET_DETAILS_VIDEOGAMES: return{
         ...state,
       details: payload

    }
    case CLEAR_PAGE: return{
        ...state,
        details: {}
    }
    case CLEAR_SEARCH: return{
        ...state,
        videogames:[]
    }
    default:return state
}





} 
export default rootReducer;