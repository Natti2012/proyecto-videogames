import{CLEAR_PAGE, GET_DETAILS_VIDEOGAMES, GET_VIDEOGAMES, CLEAR_SEARCH, FILTER_GENRES, ALL_GENRES, FILTER_CREATED, ORDER_NAME, ORDER_RATING, CREATE_VIDEOGAME} from '../actions/actionsTypes'
const inicialState={
    videogames : [],
    details: {},
    genres: [],
    filterGenre:[]
}
function  rootReducer (state= inicialState, {type, payload}){
switch(type){
    case GET_VIDEOGAMES : 
    if(payload.length === 0  ) alert(payload)
    else{
       return{
        ...state,
        videogames: payload,
        filterGenre: payload
    }; 
    }
    
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
    const createdFilter = payload === 'created_DB'? filterOrd.filter((e)=>e.created === 'created_DB' ) : filterOrd.filter((e)=> e.created === 'created_Api'  )
   if(createdFilter.length === 0 & payload === 'created_DB'){
        alert('There are no video games created')
    }else{
    
    return{
        ...state,
        videogames: payload === 'all' ?  filterOrd : createdFilter

    }}
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
                   if(a.name > b.name){ return 1} 
                   if(b.name > a.name){return -1}
                   return 0
                })
            }
        }
       if(payload === 'descABC'){
            return{
                ...state,
                videogames: [...state.filterGenre].sort((a, b)=>{
                   if(a.name > b.name){ return -1} 
                   if(b.name > a.name){return 1}
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