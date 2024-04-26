import Sequelize from 'sequelize'

          
          class sondetprod extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 numeric1:DataTypes.INTEGER,
		 otmdetallesFacturassondetprodId:DataTypes.INTEGER},{sequelize})
}}
export default sondetprod