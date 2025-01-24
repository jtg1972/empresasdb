import Sequelize from 'sequelize'

          
          class sccarreras_scestudiantes extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 mtmscestudiantessccarrerasId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmscestudiantessccarrerasIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmscestudiantessccarrerasIdFinalCatQuery:DataTypes.INTEGER,
		 mtmscestudiantessccarrerasIdProductQuery:DataTypes.INTEGER,
		 mtmsccarrerasscestudiantesId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmsccarrerasscestudiantesIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmsccarrerasscestudiantesIdFinalCatQuery:DataTypes.INTEGER,
		 mtmsccarrerasscestudiantesIdProductQuery:DataTypes.INTEGER},{sequelize})
}}
export default sccarreras_scestudiantes