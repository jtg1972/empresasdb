import Sequelize from 'sequelize'

          
          class sbgrupos extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 clavedelgrupo:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 grupoIdGlobalCatQuery:DataTypes.INTEGER,
		 grupoIdFinalCatQuery:DataTypes.INTEGER,
		 grupoIdProductQuery:DataTypes.INTEGER,
		 otmsbmateriassbgruposId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              }},{sequelize})
}}
export default sbgrupos