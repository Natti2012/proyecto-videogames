import React from 'react';
import './CardDetail.css';


export default function CardDetail ({name, image, genres, released, description,rating, platforms}) {
    return (
     
      <div className='card'>
      <h2>{name}</h2>
      <img src={image} width="80%"  alt={name} />
      <h4>Realeased date: {released}</h4>
      
       <h3>Description:</h3>
       {description}
       
        
     
      <h4>Rating: {rating}</h4>
      <h4>Platfoms:.{platforms}</h4>
      <h4>Genres: {genres}</h4>
    </div>
    )

}