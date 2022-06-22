import Sequelize from 'sequelize'

          
          class Alumnos extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 estudiante:DataTypes.STRING},{sequelize})
}static associate(models){models.Alumnos.belongsToMany(models.Grupos,{foreignKey:"mtmAlumnosGruposId",through:"Alumnos_Grupos"})

                  models.Grupos.belongsToMany(models.Alumnos,{foreignKey:"mtmGruposAlumnosId",through:"Alumnos_Grupos"})
                }}
export default Alumnos