import Sequelize from 'sequelize'

          class atunconaceite extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 name:DataTypes.STRING,
		 agen1:DataTypes.STRING,
},{sequelize})
}static associate(models){this.hasMany(models.Mojarra)

                  models.Mojarra.belongsTo(models.atunconaceite,
                    {foreignKey:"atunconaceiteId"})
                    }
                  }
export default atunconaceite