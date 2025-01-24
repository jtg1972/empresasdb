import Sequelize from 'sequelize'

          
          class scareas_scprofesores extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 mtmscprofesoresscareasId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmscprofesoresscareasIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmscprofesoresscareasIdFinalCatQuery:DataTypes.INTEGER,
		 mtmscprofesoresscareasIdProductQuery:DataTypes.INTEGER,
		 mtmscareasscprofesoresId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmscareasscprofesoresIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmscareasscprofesoresIdFinalCatQuery:DataTypes.INTEGER,
		 mtmscareasscprofesoresIdProductQuery:DataTypes.INTEGER},{sequelize})
}}
export default scareas_scprofesores