import Sequelize from 'sequelize'

          
          class sbarea_sbprofesores extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 mtmsbprofesoressbareaId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmsbprofesoressbareaIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmsbprofesoressbareaIdFinalCatQuery:DataTypes.INTEGER,
		 mtmsbprofesoressbareaIdProductQuery:DataTypes.INTEGER,
		 mtmsbareasbprofesoresId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmsbareasbprofesoresIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmsbareasbprofesoresIdFinalCatQuery:DataTypes.INTEGER,
		 mtmsbareasbprofesoresIdProductQuery:DataTypes.INTEGER},{sequelize})
}}
export default sbarea_sbprofesores