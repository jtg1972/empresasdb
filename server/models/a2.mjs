import Sequelize from 'sequelize'

      class a2 extends Sequelize.Model{

        	static init(sequelize,DataTypes){

          		return super.init({
		 Colesterol:DataTypes.STRING,
		 General2:DataTypes.STRING,
		 General1:DataTypes.STRING,
		 campon:DataTypes.STRING,
		 a3:DataTypes.STRING,
		 a4:DataTypes.INTEGER,
		 a5:DataTypes.STRING,
		 a6:DataTypes.INTEGER,
		 a7:DataTypes.INTEGER},{sequelize})
}}
export default a2