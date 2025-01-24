import Sequelize from 'sequelize'

          
          class scgrupos extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 clavedelgrupo:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 otmscprofesoresscgruposId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 otmscmateriasscgruposId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              }},{sequelize})
}static associate(models){models.scgrupos.belongsToMany(models.scestudiantes,{foreignKey:"mtmscgruposscestudiantesId",through:"scestudiantes_scgrupos"})

                  models.scestudiantes.belongsToMany(models.scgrupos,{foreignKey:"mtmscestudiantesscgruposId",through:"scestudiantes_scgrupos"})
                }}
export default scgrupos