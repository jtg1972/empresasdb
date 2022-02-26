import Sequelize from 'sequelize'

      class GeneralNew extends Sequelize.Model{

        	static init(sequelize,DataTypes){

          		return super.init({
		 name:DataTypes.STRING,
		 price:DataTypes.INTEGER},{sequelize})
}}
export default GeneralNew