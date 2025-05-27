import Sequelize from 'sequelize'

          
          class sbprofesoresraw extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 nombre:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 registro:{
                type:DataTypes.STRING,
                defaultValue:""
              }},{sequelize})
}}
export default sbprofesoresraw