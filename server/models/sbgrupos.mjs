import Sequelize from 'sequelize'

          
          class sbgrupos extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 clavedelgrupo:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 otmsbmateriassbgruposId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 grupoIdGlobalCatQuery:DataTypes.INTEGER,
		 grupoIdFinalCatQuery:DataTypes.INTEGER,
		 grupoIdProductQuery:DataTypes.INTEGER},{sequelize})
}static associate(models){models.sbgrupos.belongsToMany(models.sbestudiantes,{foreignKey:"mtmsbgrupossbestudiantesId",through:"sbestudiantes_sbgrupos"})

                  models.sbestudiantes.belongsToMany(models.sbgrupos,{foreignKey:"mtmsbestudiantessbgruposId",through:"sbestudiantes_sbgrupos"})
                this.hasMany(models.sbprofesores)

                  models.sbprofesores.belongsTo(models.sbgrupos,
                    {foreignKey:"sbgruposId"})
                    
                  }}
export default sbgrupos