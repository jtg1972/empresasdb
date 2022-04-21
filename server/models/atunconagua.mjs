import Sequelize from 'sequelize'

          class atunconagua extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 name:DataTypes.STRING,
		 calorias:DataTypes.INTEGER,
		 agen1:DataTypes.STRING,
		 date1:DataTypes.DATEONLY,
		 fats:DataTypes.INTEGER,
		 f1:DataTypes.STRING},{sequelize})
}}
export default atunconagua