import Sequelize from 'sequelize'

          class detallesFacturas extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 otmfacturasdetallesFacturasId:DataTypes.INTEGER,
		 producto:DataTypes.INTEGER,
		 cantidad:DataTypes.INTEGER,
		 precio:DataTypes.INTEGER,
		 atunesGlobalCatQuery:DataTypes.INTEGER,
		 atunesFinalCatQuery:DataTypes.INTEGER,
		 atunesProductQuery:DataTypes.INTEGER,
		 mojarraGlobalCatQuery:DataTypes.INTEGER,
		 mojarraFinalCatQuery:DataTypes.INTEGER,
		 mojarraProductQuery:DataTypes.INTEGER},{sequelize})
}}
export default detallesFacturas