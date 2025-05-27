import Sequelize from 'sequelize'

          
          class sbmaterias extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 materia:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 materiaIdGlobalCatQuery:DataTypes.INTEGER,
		 materiaIdFinalCatQuery:DataTypes.INTEGER,
		 materiaIdProductQuery:DataTypes.INTEGER,
		 otmsbareasbmateriasId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              }},{sequelize})
}static associate(models){models.sbmaterias.belongsToMany(models.sbcarreras,{foreignKey:"mtmsbmateriassbcarrerasId",through:"sbcarreras_sbmaterias"})

                  models.sbcarreras.belongsToMany(models.sbmaterias,{foreignKey:"mtmsbcarrerassbmateriasId",through:"sbcarreras_sbmaterias"})
                this.hasMany(models.sbgrupos)

                  models.sbgrupos.belongsTo(models.sbmaterias,
                    {foreignKey:"sbmateriasId"})
                    
                  }}
export default sbmaterias