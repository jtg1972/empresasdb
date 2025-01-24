import Sequelize from 'sequelize'

          
          class scestudiantes extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 nombre:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 boleta:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 startingYear:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 semestertype:{
                type:DataTypes.STRING,
                defaultValue:""
              }},{sequelize})
}static associate(models){models.scestudiantes.belongsToMany(models.sccarreras,{foreignKey:"mtmscestudiantessccarrerasId",through:"sccarreras_scestudiantes"})

                  models.sccarreras.belongsToMany(models.scestudiantes,{foreignKey:"mtmsccarrerasscestudiantesId",through:"sccarreras_scestudiantes"})
                models.scestudiantes.belongsToMany(models.scgrupos,{foreignKey:"mtmscestudiantesscgruposId",through:"scestudiantes_scgrupos"})

                  models.scgrupos.belongsToMany(models.scestudiantes,{foreignKey:"mtmscgruposscestudiantesId",through:"scestudiantes_scgrupos"})
                }}
export default scestudiantes