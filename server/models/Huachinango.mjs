import Sequelize from 'sequelize'

      class Huachinango extends Sequelize.Model{

        	static init(sequelize,DataTypes){

          		return super.init({
		 name:DataTypes.STRING,
		 price:DataTypes.INTEGER,
		 piel:DataTypes.STRING,
		 color:DataTypes.STRING},{sequelize})
}}
export default Huachinango