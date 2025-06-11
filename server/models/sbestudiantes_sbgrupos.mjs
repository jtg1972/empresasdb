import Sequelize from 'sequelize'

          
          class sbestudiantes_sbgrupos extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 mtmsbgrupossbestudiantesId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmsbgrupossbestudiantesIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmsbgrupossbestudiantesIdFinalCatQuery:DataTypes.INTEGER,
		 mtmsbgrupossbestudiantesIdProductQuery:DataTypes.INTEGER,
		 calificacion:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmsbestudiantessbgruposId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmsbestudiantessbgruposIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmsbestudiantessbgruposIdFinalCatQuery:DataTypes.INTEGER,
		 mtmsbestudiantessbgruposIdProductQuery:DataTypes.INTEGER},{sequelize})
}}
export default sbestudiantes_sbgrupos