import Sequelize from 'sequelize'

          class telefonos extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 telefono:DataTypes.STRING,
		 otmclientestelefonosId:DataTypes.INTEGER},{sequelize})
}}
export default telefonos