import Sequelize from 'sequelize'

          class detallesFacturas extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 otmfacturasdetallesFacturasId:DataTypes.INTEGER,
		 cantidad:DataTypes.INTEGER,
		 precio:DataTypes.INTEGER,
		 producto:DataTypes.STRING,
		 atunesGlobalCatQuery:DataTypes.INTEGER,
		 atunesFinalCatQuery:DataTypes.INTEGER,
		 atunesProductQuery:DataTypes.INTEGER},{sequelize})
}}
export default detallesFacturas