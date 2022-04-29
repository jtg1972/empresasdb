import Sequelize from 'sequelize'

          class detallesFacturas extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 producto:DataTypes.INTEGER,
		 cantidad:DataTypes.INTEGER,
		 precio:DataTypes.INTEGER,
		 facturasId:DataTypes.INTEGER},{sequelize})
}}
export default detallesFacturas