import Sequelize from 'sequelize'

          
          class scmaterias_scprofesores extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 mtmscprofesoresscmateriasId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmscprofesoresscmateriasIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmscprofesoresscmateriasIdFinalCatQuery:DataTypes.INTEGER,
		 mtmscprofesoresscmateriasIdProductQuery:DataTypes.INTEGER,
		 mtmscmateriasscprofesoresId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmscmateriasscprofesoresIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmscmateriasscprofesoresIdFinalCatQuery:DataTypes.INTEGER,
		 mtmscmateriasscprofesoresIdProductQuery:DataTypes.INTEGER},{sequelize})
}}
export default scmaterias_scprofesores