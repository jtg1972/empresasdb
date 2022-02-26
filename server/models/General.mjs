import Sequelize from 'sequelize'

      class General extends Sequelize.Model{

        	static init(sequelize,DataTypes){

          		return super.init({
		 Name:DataTypes.STRING,
		 Price:DataTypes.INTEGER,
		 Cost:DataTypes.INTEGER},{sequelize})
}}
export default General