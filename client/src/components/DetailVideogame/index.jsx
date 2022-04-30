
import React, { useEffect} from 'react'
import CardDetail from '../CardDetail';
import { useDispatch, useSelector } from 'react-redux'
import { getDetails } from '../../redux/actions';
import { useParams } from 'react-router-dom';

function DetailVideogame() {
  const{id}= useParams()
  const dispatch = useDispatch();
  const details = useSelector(state=>state.details)
  useEffect(()=>{
    dispatch(getDetails(id))
  },[dispatch,id])
  return (
   



   <CardDetail
   name = {details.name}
   image= {details.image}
   genres= {details.genres}
   description= {details.description}
  released= {details.released}
   rating= {details.rating}
  platforms= {details.platforms}
   
   />
  )
}

export default DetailVideogame

// name: DataId.name,
// image: DataId.background_image,
// genres: DataId.genres.map(e => e.name),
// descrption: DataId.description,
// rating: DataId.rating,
// platforms