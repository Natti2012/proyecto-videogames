const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('genre', {
    name: {
      type: DataTypes.STRING,
      
    },
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

  },
  {
    timestamps: false
  }
  );
  
};


/*

ID: * No puede ser un ID de un videojuego ya existente en la API rawg
Nombre *
Descripción *
Fecha de lanzamiento
Rating
Plataformas *
*/