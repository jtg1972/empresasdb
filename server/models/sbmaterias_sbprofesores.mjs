import Sequelize from 'sequelize'

          
          class sbmaterias_sbprofesores extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 mtmsbmateriassbprofesoresId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmsbmateriassbprofesoresIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmsbmateriassbprofesoresIdFinalCatQuery:DataTypes.INTEGER,
		 mtmsbmateriassbprofesoresIdProductQuery:DataTypes.INTEGER,
		 mtmsbprofesoressbmateriasId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmsbprofesoressbmateriasIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmsbprofesoressbmateriasIdFinalCatQuery:DataTypes.INTEGER,
		 mtmsbprofesoressbmateriasIdProductQuery:DataTypes.INTEGER},{sequelize})
}}
export default sbmaterias_sbprofesores