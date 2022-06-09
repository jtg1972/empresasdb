import Sequelize from 'sequelize'

          class atunconaceite extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 name:DataTypes.STRING,
		 agen1:DataTypes.STRING,
		 precio:DataTypes.INTEGER},{sequelize})
}}
export default atunconaceite