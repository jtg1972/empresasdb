import Sequelize from 'sequelize'

          
          class Grupos extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 grupo:DataTypes.STRING},{sequelize})
}static associate(models){models.Grupos.belongsToMany(models.Alumnos,{foreignKey:"mtmGruposAlumnosId",through:"Alumnos_Grupos"})

                  models.Alumnos.belongsToMany(models.Grupos,{foreignKey:"mtmAlumnosGruposId",through:"Alumnos_Grupos"})
                }}
export default Grupos