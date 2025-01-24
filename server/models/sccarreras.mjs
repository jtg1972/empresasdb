import Sequelize from 'sequelize'

          
          class sccarreras extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 carrera:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 otmscareassccarrerasId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              }},{sequelize})
}static associate(models){models.sccarreras.belongsToMany(models.scmaterias,{foreignKey:"mtmsccarrerasscmateriasId",through:"sccarreras_scmaterias"})

                  models.scmaterias.belongsToMany(models.sccarreras,{foreignKey:"mtmscmateriassccarrerasId",through:"sccarreras_scmaterias"})
                models.sccarreras.belongsToMany(models.scestudiantes,{foreignKey:"mtmsccarrerasscestudiantesId",through:"sccarreras_scestudiantes"})

                  models.scestudiantes.belongsToMany(models.sccarreras,{foreignKey:"mtmscestudiantessccarrerasId",through:"sccarreras_scestudiantes"})
                }}
export default sccarreras