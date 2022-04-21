import Sequelize from 'sequelize'

          class atunconaceite extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 name:DataTypes.STRING,
		 agen1:DataTypes.STRING,
		 date1:DataTypes.DATEONLY},{sequelize})
}}
export default atunconaceite