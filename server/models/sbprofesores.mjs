import Sequelize from 'sequelize'

          
          class sbprofesores extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 nombre:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 registro:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 profesorIdGlobalCatQuery:DataTypes.INTEGER,
		 profesorIdFinalCatQuery:DataTypes.INTEGER,
		 profesorIdProductQuery:DataTypes.INTEGER},{sequelize})
}static associate(models){models.sbprofesores.belongsToMany(models.sbarea,{foreignKey:"mtmsbprofesoressbareaId",through:"sbarea_sbprofesores"})

                  models.sbarea.belongsToMany(models.sbprofesores,{foreignKey:"mtmsbareasbprofesoresId",through:"sbarea_sbprofesores"})
                models.sbprofesores.belongsToMany(models.sbmaterias,{foreignKey:"mtmsbprofesoressbmateriasId",through:"sbmaterias_sbprofesores"})

                  models.sbmaterias.belongsToMany(models.sbprofesores,{foreignKey:"mtmsbmateriassbprofesoresId",through:"sbmaterias_sbprofesores"})
                }}
export default sbprofesores