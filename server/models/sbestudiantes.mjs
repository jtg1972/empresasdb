import Sequelize from 'sequelize'

          
          class sbestudiantes extends Sequelize.Model{

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
		 semesterType:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 estudianteIdGlobalCatQuery:DataTypes.INTEGER,
		 estudianteIdFinalCatQuery:DataTypes.INTEGER,
		 estudianteIdProductQuery:DataTypes.INTEGER},{sequelize})
}}
export default sbestudiantes