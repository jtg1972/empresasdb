import Sequelize from 'sequelize'

          class atunconagua extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 name:DataTypes.STRING,
		 calorias:DataTypes.INTEGER,
		 agen1:DataTypes.STRING,
		 fats:DataTypes.INTEGER,
		 f1:DataTypes.STRING,
},{sequelize})
}static associate(models){this.hasMany(models.Mojarra)

                  models.Mojarra.belongsTo(models.atunconagua,
                    {foreignKey:"atunconaguaId"})
                    }
                  }
export default atunconagua