import Sequelize from 'sequelize'

          
          class scmaterias extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 materia:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 otmscareasscmateriasId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              }},{sequelize})
}static associate(models){models.scmaterias.belongsToMany(models.sccarreras,{foreignKey:"mtmscmateriassccarrerasId",through:"sccarreras_scmaterias"})

                  models.sccarreras.belongsToMany(models.scmaterias,{foreignKey:"mtmsccarrerasscmateriasId",through:"sccarreras_scmaterias"})
                models.scmaterias.belongsToMany(models.scprofesores,{foreignKey:"mtmscmateriasscprofesoresId",through:"scmaterias_scprofesores"})

                  models.scprofesores.belongsToMany(models.scmaterias,{foreignKey:"mtmscprofesoresscmateriasId",through:"scmaterias_scprofesores"})
                this.hasMany(models.Grupos)

                  models.Grupos.belongsTo(models.scmaterias,
                    {foreignKey:"scmateriasId"})
                    
                  this.hasMany(models.scgrupos)

                  models.scgrupos.belongsTo(models.scmaterias,
                    {foreignKey:"scmateriasId"})
                    
                  }}
export default scmaterias