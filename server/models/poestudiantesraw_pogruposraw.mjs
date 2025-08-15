import Sequelize from 'sequelize'

          
          class poestudiantesraw_pogruposraw extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 mtmpoestudiantesrawpogruposrawId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmpoestudiantesrawpogruposrawIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmpoestudiantesrawpogruposrawIdFinalCatQuery:DataTypes.INTEGER,
		 mtmpoestudiantesrawpogruposrawIdProductQuery:DataTypes.INTEGER,
		 mtmpogruposrawpoestudiantesrawId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmpogruposrawpoestudiantesrawIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmpogruposrawpoestudiantesrawIdFinalCatQuery:DataTypes.INTEGER,
		 mtmpogruposrawpoestudiantesrawIdProductQuery:DataTypes.INTEGER,
		 calificacion:{
                type:DataTypes.INTEGER,
                defaultValue:0
              }},{sequelize})
}}
export default poestudiantesraw_pogruposraw