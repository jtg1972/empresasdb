import Sequelize from 'sequelize'

      class Alimentos extends Sequelize.Model{

        	static init(sequelize,DataTypes){

          		return super.init({
		 Name:DataTypes.STRING,
		 Price:DataTypes.INTEGER,
		 Cost:DataTypes.INTEGER,
		 Added1:DataTypes.STRING},{sequelize})
}}
export default Alimentos