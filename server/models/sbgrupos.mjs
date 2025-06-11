import Sequelize from 'sequelize'

          
          class sbgrupos extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 clavedelgrupo:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 grupoIdGlobalCatQuery:DataTypes.INTEGER,
		 grupoIdFinalCatQuery:DataTypes.INTEGER,
		 grupoIdProductQuery:DataTypes.INTEGER,
		 otmsbmateriassbgruposId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              }},{sequelize})
}static associate(models){models.sbgrupos.belongsToMany(models.sbestudiantes,{foreignKey:"mtmsbgrupossbestudiantesId",through:"sbestudiantes_sbgrupos"})

                  models.sbestudiantes.belongsToMany(models.sbgrupos,{foreignKey:"mtmsbestudiantessbgruposId",through:"sbestudiantes_sbgrupos"})
                }}
export default sbgrupos