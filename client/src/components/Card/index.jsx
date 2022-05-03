import React from 'react';
import './Card.css';
import {Link} from 'react-router-dom'

export default function Card ({name, image, genres,rating, id}) {
    return (
      <div className="card">
        <div className="card-body">
          <h1 className="card-title" ><Link to={`/videogame/${id}`}>{name}</Link></h1>
         <img className="imagen" src={image} width="100%" alt={name} />
          <h3 className='genres'>Genres : {genres} </h3>
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