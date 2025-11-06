import Sequelize from 'sequelize'

          
          class sbcarreras extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 carrera:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 otmsbareasbcarrerasId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 carreraIdGlobalCatQuery:DataTypes.INTEGER,
		 carreraIdFinalCatQuery:DataTypes.INTEGER,
		 carreraIdProductQuery:DataTypes.INTEGER},{sequelize})
}static associate(models){models.sbcarreras.belongsToMany(models.sbmaterias,{foreignKey:"mtmsbcarrerassbmateriasId",through:"sbcarreras_sbmaterias"})

                  models.sbmaterias.belongsToMany(models.sbcarreras,{foreignKey:"mtmsbmateriassbcarrerasId",through:"sbcarreras_sbmaterias"})
                }}
export default sbcarreras