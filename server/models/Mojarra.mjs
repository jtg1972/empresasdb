import Sequelize from 'sequelize'

          class Mojarra extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 name:DataTypes.STRING,
		 price:DataTypes.INTEGER,
		 aletas:DataTypes.STRING,
		 color:DataTypes.STRING,
		 mojf1:DataTypes.INTEGER},{sequelize})
}}
export default Mojarra