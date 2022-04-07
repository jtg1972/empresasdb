import Sequelize from 'sequelize'

          class atunconaceite extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 name:DataTypes.STRING,
		 price:DataTypes.INTEGER,
		 tamano:DataTypes.STRING,
		 agen1:DataTypes.STRING},{sequelize})
}}
export default atunconaceite