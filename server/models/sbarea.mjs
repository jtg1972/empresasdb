import Sequelize from 'sequelize'

          
          class sbarea extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 area:{
                type:DataTypes.STRING,
                defaultValue:""
              }},{sequelize})
}static associate(models){this.hasMany(models.sbcarreras)

                  models.sbcarreras.belongsTo(models.sbarea,
                    {foreignKey:"sbareaId"})
                    
                  this.hasMany(models.sbmaterias)

                  models.sbmaterias.belongsTo(models.sbarea,
                    {foreignKey:"sbareaId"})
                    
                  models.sbarea.belongsToMany(models.sbprofesores,{foreignKey:"mtmsbareasbprofesoresId",through:"sbarea_sbprofesores"})

                  models.sbprofesores.belongsToMany(models.sbarea,{foreignKey:"mtmsbprofesoressbareaId",through:"sbarea_sbprofesores"})
                }}
export default sbarea