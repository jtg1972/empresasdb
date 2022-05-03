import Sequelize from 'sequelize'

          class facturas extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 clientesId:DataTypes.INTEGER,
		 fecha:DataTypes.DATEONLY,
		 clave:DataTypes.STRING},{sequelize})
}}
export default facturas