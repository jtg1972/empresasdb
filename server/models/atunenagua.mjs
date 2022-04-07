import Sequelize from 'sequelize'

      class atunenagua extends Sequelize.Model{

        	static init(sequelize,DataTypes){

          		return super.init({
		 name:DataTypes.STRING,
		 price:DataTypes.INTEGER,
		 tamano:DataTypes.STRING,
		 grasas:DataTypes.INTEGER},{sequelize})
}}
export default atunenagua