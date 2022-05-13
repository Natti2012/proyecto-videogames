import{CLEAR_PAGE, GET_DETAILS_VIDEOGAMES, GET_VIDEOGAMES, FILTER_GENRES, ALL_GENRES, FILTER_CREATED, ORDER_NAME, ORDER_RATING, CREATE_VIDEOGAME} from '../actions/actionsTypes'
const inicialState={
    videogames : [],
    details: {},
    genres: [],
    filterGenre:[]
}
function  rootReducer (state= inicialState, {type, payload}){
switch(type){
    case GET_VIDEOGAMES : 
   if(payload)
   console.log(payload)
       return{
        ...state,
        videogames: payload,
        filterGenre: payload
    }; 
    
    
    case GET_DETAILS_VIDEOGAMES: return{
         ...state,
       details: payload

    }
    case CLEAR_PAGE: return{
        ...state,
        details: {}
    }
   
    case ALL_GENRES:return{
        ...state,
        genres: payload
    }
    case FILTER_GENRES: 
    const allVideogames = state.filterGenre
   
    const genresFilter = payload === 'genres' ? allVideogames : allVideogames.filter((e)=>{return e.genres.includes(payload)})
    if(genresFilter.length === 0){
        alert('No videogames with that genre were found')
    }else{
     return{
        ...state,
      videogames: genresFilter
    }   
    }
    
    case FILTER_CREATED:
    const filterOrd = state.filterGenre
    const createdApi= filterOrd.filter((e)=> e.created === 'created_Api' )
    const createdDB=filterOrd.filter((e)=>e.created === 'created_DB')

    
   if(payload === 'created_DB'){
     if(createdDB.length !== 0){
         return{
        ...state,
        videogames: createdDB
    }
     } alert('There are no video games created')
    
       
    }else if(payload === 'created_Api'){
     if(createdApi.length !== 0){
    return{
        ...state,
        videogames: createdApi

       }} 
       alert('There are no video games created')
       }
       else{
            return{
        ...state,
        videogames: filterOrd

       }
       }
      
    case ORDER_NAME:
        if(payload === 'all'){
            return{
                ...state,
               videogames:  [...state.filterGenre]
            }
        }
        if(payload === 'ascABC'){
            return{
                ...state,
                videogames: [...state.filterGenre].sort((a, b)=>{
                   if(a.name.toUpperCase() > b.name.toUpperCase()){ return 1} 
                   if(b.name.toUpperCase() > a.name.toUpperCase()){return -1}
                   return 0
                })
            }
        }
       if(payload === 'descABC'){
            return{
                ...state,
                videogames: [...state.filterGenre].sort((a, b)=>{
                   if(a.name.toUpperCase() > b.name.toUpperCase()){ return -1} 
                   if(b.name.toUpperCase() > a.name.toUpperCase()){return 1}
                   return 0
                })
            }
        }
    
        
        case ORDER_RATING:
            if(payload === 'all'){
                return{
                    ...state,
                   videogames:  [...state.filterGenre]
                }
            }
            if(payload === 'ascRating'){
                return{
                    ...state,
                    videogames: [...state.filterGenre].sort((a, b)=>{
                       if(a.rating > b.rating){ return 1} 
                       if(b.rating > a.rating){return -1}
                       return 0
                    })
                }
            }
           if(payload === 'descRating'){
                return{
                    ...state,
                    videogames: [...state.filterGenre].sort((a, b)=>{
                       if(a.rating > b.rating){ return -1} 
                       if(b.rating > a.rating){return 1}
                       return 0
                    })
                    
                }
            }
            case CREATE_VIDEOGAME: return{
                ...state
            }

    default:return state
}





} 
export default rootReducer;