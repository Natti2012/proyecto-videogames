const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released:{
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      
    },
    rating:{
      type: DataTypes.FLOAT,
      validate:{
        min: 0,
        max: 5
      }

    },
    platforms:{
      type:DataTypes.STRING,
      allowNull: false

    },
    image:{
     type: DataTypes.STRING,
    },
   
  },
  {
    timestamps: false
  }
  );
  
};
