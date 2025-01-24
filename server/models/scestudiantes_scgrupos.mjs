import Sequelize from 'sequelize'

          
          class scestudiantes_scgrupos extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 mtmscgruposscestudiantesId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmscgruposscestudiantesIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmscgruposscestudiantesIdFinalCatQuery:DataTypes.INTEGER,
		 mtmscgruposscestudiantesIdProductQuery:DataTypes.INTEGER,
		 mtmscestudiantesscgruposId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmscestudiantesscgruposIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmscestudiantesscgruposIdFinalCatQuery:DataTypes.INTEGER,
		 mtmscestudiantesscgruposIdProductQuery:DataTypes.INTEGER,
		 calificacion:{
                type:DataTypes.INTEGER,
                defaultValue:0
              }},{sequelize})
}}
export default scestudiantes_scgrupos