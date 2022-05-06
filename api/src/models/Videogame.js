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
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false

    },
    image:{
     type: DataTypes.STRING,
     defaultValue:('https://i.pinimg.com/474x/1a/b7/51/1ab75139f3b1e6ecc1f59ffc2a4b0f2e--mario-bros-mario-kart.jpg')
    },
   
  },
  {
    timestamps: false
  }
  );
  
};
