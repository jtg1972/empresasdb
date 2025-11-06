import Sequelize from 'sequelize'

          
          class sbmaterias extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 materia:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 otmsbareasbmateriasId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 materiaIdGlobalCatQuery:DataTypes.INTEGER,
		 materiaIdFinalCatQuery:DataTypes.INTEGER,
		 materiaIdProductQuery:DataTypes.INTEGER},{sequelize})
}static associate(models){models.sbmaterias.belongsToMany(models.sbcarreras,{foreignKey:"mtmsbmateriassbcarrerasId",through:"sbcarreras_sbmaterias"})

                  models.sbcarreras.belongsToMany(models.sbmaterias,{foreignKey:"mtmsbcarrerassbmateriasId",through:"sbcarreras_sbmaterias"})
                this.hasMany(models.sbgrupos)

                  models.sbgrupos.belongsTo(models.sbmaterias,
                    {foreignKey:"sbmateriasId"})
                    
                  models.sbmaterias.belongsToMany(models.sbprofesores,{foreignKey:"mtmsbmateriassbprofesoresId",through:"sbmaterias_sbprofesores"})

                  models.sbprofesores.belongsToMany(models.sbmaterias,{foreignKey:"mtmsbprofesoressbmateriasId",through:"sbmaterias_sbprofesores"})
                }}
export default sbmaterias