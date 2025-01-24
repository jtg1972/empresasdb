import Sequelize from 'sequelize'

          
          class scprofesores extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 nombre:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 noderegistro:{
                type:DataTypes.STRING,
                defaultValue:""
              }},{sequelize})
}static associate(models){models.scprofesores.belongsToMany(models.scareas,{foreignKey:"mtmscprofesoresscareasId",through:"scareas_scprofesores"})

                  models.scareas.belongsToMany(models.scprofesores,{foreignKey:"mtmscareasscprofesoresId",through:"scareas_scprofesores"})
                models.scprofesores.belongsToMany(models.scmaterias,{foreignKey:"mtmscprofesoresscmateriasId",through:"scmaterias_scprofesores"})

                  models.scmaterias.belongsToMany(models.scprofesores,{foreignKey:"mtmscmateriasscprofesoresId",through:"scmaterias_scprofesores"})
                this.hasMany(models.scgrupos)

                  models.scgrupos.belongsTo(models.scprofesores,
                    {foreignKey:"scprofesoresId"})
                    
                  }}
export default scprofesores