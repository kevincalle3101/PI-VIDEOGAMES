const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type:DataTypes.UUID,  //identificador 
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type:DataTypes.TEXT,
      allowNull:false,
      defaultValue:true
    },
    platform:{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false, /*verificar los casos que no tienen imagen*/
    },
    image:{
      type:DataTypes.STRING,
      allowNull:false
    },
    landingDate:{
      type:DataTypes.DATEONLY,
      allowNull:true,
    },
    rating:{
      type:DataTypes.FLOAT, //para que reconozca que lo que puedo recibir puede no ser un entero
      allowNull:false
    },
    createdInDb:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }


  },{
    timestamps:false
  });
};
