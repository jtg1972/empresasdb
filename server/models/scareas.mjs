import Sequelize from 'sequelize'

          
          class scareas extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 area:{
                type:DataTypes.STRING,
                defaultValue:""
              }},{sequelize})
}static associate(models){this.hasMany(models.sccarreras)

                  models.sccarreras.belongsTo(models.scareas,
                    {foreignKey:"scareasId"})
                    
                  this.hasMany(models.scmaterias)

                  models.scmaterias.belongsTo(models.scareas,
                    {foreignKey:"scareasId"})
                    
                  models.scareas.belongsToMany(models.scprofesores,{foreignKey:"mtmscareasscprofesoresId",through:"scareas_scprofesores"})

                  models.scprofesores.belongsToMany(models.scareas,{foreignKey:"mtmscprofesoresscareasId",through:"scareas_scprofesores"})
                }}
export default scareas