import React from 'react';
import './Card.css';
import {Link} from 'react-router-dom'

export default function Card ({name, image, genres,rating, id}) {
    return (
      
        <div className="card">
          <div className="card-title" >
            <h1 ><Link to={`/videogame/${id}`}>{name}</Link></h1>
          </div>
          <div className="imagen">
            <img  src={image} width="100%" alt={name} />
          </div>
         <div className='card-date'>
           <h3>Genres : {genres} </h3>
            <h3>Rating: {rating}</h3>
         </div>
         

        </div>
     
    );
};
// name: DataId.name,
//            image : DataId.background_image,
//             genres: DataId.genres.map(e => e.name),
//             descrption: DataId.description,
//             released: DataId.released,
//             rating: DataId.rating,
//             platforms