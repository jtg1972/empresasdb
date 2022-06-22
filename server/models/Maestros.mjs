import Sequelize from 'sequelize'

          
          class Maestros extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 maestro:DataTypes.STRING},{sequelize})
}}
export default Maestros