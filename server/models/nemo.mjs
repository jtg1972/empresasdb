import Sequelize from 'sequelize'

          class nemo extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 name:DataTypes.STRING},{sequelize})
}}
export default nemo