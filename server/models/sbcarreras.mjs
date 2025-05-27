import Sequelize from 'sequelize'

          
          class sbcarreras extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 carrera:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 carreraIdGlobalCatQuery:DataTypes.INTEGER,
		 carreraIdFinalCatQuery:DataTypes.INTEGER,
		 carreraIdProductQuery:DataTypes.INTEGER,
		 otmsbareasbcarrerasId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              }},{sequelize})
}static associate(models){models.sbcarreras.belongsToMany(models.sbmaterias,{foreignKey:"mtmsbcarrerassbmateriasId",through:"sbcarreras_sbmaterias"})

                  models.sbmaterias.belongsToMany(models.sbcarreras,{foreignKey:"mtmsbmateriassbcarrerasId",through:"sbcarreras_sbmaterias"})
                }}
export default sbcarreras