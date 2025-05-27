import Sequelize from 'sequelize'

          
          class sbestudiantesraw extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 nombre:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 boleta:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 incomingyear:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 semestertype:{
                type:DataTypes.STRING,
                defaultValue:""
              }},{sequelize})
}}
export default sbestudiantesraw