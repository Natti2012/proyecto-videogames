
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
    return () => { //TODO LO QUE SUCEDA DENTRO DEL RETURN ES CUANDO SE DESMONTA EL COMPONENTE
      dispatch(clearPage())
    }
  },[dispatch,id])
  return (
    <>
    <NavBar/>
    {details.name ?
     <CardDetail
   name = {details.name}
   image= {details.image}
   genres= {details.genres}
   description= {details.description}
  released= {details.released}
   rating= {details.rating}
  platforms= {details.platforms}
   
   />
   :
  
   ( 
   <div>
     
      <h1 className='cargando'>Cargando...</h1>
     </div>
    
   )
  }
    
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