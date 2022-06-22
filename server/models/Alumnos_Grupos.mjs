import Sequelize from 'sequelize'

          
          class Alumnos_Grupos extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 mtmAlumnosGruposId:DataTypes.INTEGER,
		 mtmAlumnosGruposIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmAlumnosGruposIdFinalCatQuery:DataTypes.INTEGER,
		 mtmAlumnosGruposIdProductQuery:DataTypes.INTEGER,
		 mtmGruposAlumnosId:DataTypes.INTEGER,
		 mtmGruposAlumnosIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmGruposAlumnosIdFinalCatQuery:DataTypes.INTEGER,
		 mtmGruposAlumnosIdProductQuery:DataTypes.INTEGER},{sequelize})
}}
export default Alumnos_Grupos