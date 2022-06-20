
import React, { useEffect} from 'react'
import CardDetail from '../CardDetail';
import { useDispatch, useSelector } from 'react-redux'
import { getDetails, clearPage } from '../../redux/actions';
import { useParams } from 'react-router-dom'; 
import './detailVideo.css'
import NavBar from '../NavBar';

function DetailVideogame() {
  const{id}= useParams()
  const dispatch = useDispatch();
  const details = useSelector(state=>state.details)
  
  useEffect(()=>{
    dispatch(getDetails(id))
    return () => {
      dispatch(clearPage())
    }
  },[dispatch,id])
  return (
    <>
    <NavBar className='nav-detail'/>
    <div>
      {details.name ?
     <CardDetail
     id={details.id}
   name = {details.name}
   image= {details.image}
   genres= {details.genres.join(' | ')}
   description= {details.description}
  released= {details.released}
   rating= {details.rating}
  platforms= {details.platforms.join(' | ')}
   created={details.created}
   />
   :
  
   ( 
   <div>
     
      <h1 className='cargando'>Cargando...</h1>
     </div>
    
   )
  }
    
    
    </div>
    </>
   



  
  )
}

export default DetailVideogame

// name: DataId.name,
// image: DataId.background_image,
// genres: DataId.genres.map(e => e.name),
// descrption: DataId.description,
// rating: DataId.rating,
// platforms