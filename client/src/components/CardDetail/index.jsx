import React from 'react';
import './CardDetail.css';


export default function CardDetail ({name, image, genres, released, description,rating, platforms}) {
    return (
     <div>
      <div className='name-detail'>
        <h2>{name}</h2>
      </div>
        <div className='cardDetail'>
      <div className='image-detail'>
        <img src={image}   alt={name} className='imagen2'/>
      
      </div>
      
      <div className='details'>
        
       <div className='description-detail'>
         
       <div className='titulo-description'>
        <h4 className='datos'>Description:</h4>
       </div>
       <div className='texto-description'>
         {description}
       </div>
      </div>
      
      
       
       
       <div className='datos-desc'>
        
         <h4 className='datos'>Platfoms:{platforms}</h4>
      <h4 className='datos'>Genres: {genres}</h4>
       </div>
          <div className='rating'>
         <h4 className='datos'>Rating: {rating}</h4>
       </div>
       <div className='released'>
          <h4 className='datos'>Realeased date: {released}</h4>
       </div>
      </div>
      
      
    </div>
     </div>
     
    )

}