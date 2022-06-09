import Sequelize from 'sequelize'

          class atunconagua extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 name:DataTypes.STRING,
		 calorias:DataTypes.INTEGER,
		 agen1:DataTypes.STRING,
		 fats:DataTypes.INTEGER,
		 f1:DataTypes.STRING,
		 precio:DataTypes.INTEGER},{sequelize})
}}
export default atunconagua