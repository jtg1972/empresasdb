import Sequelize from 'sequelize'

          
          class sbcarrerasraw extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 carrera:{
                type:DataTypes.STRING,
                defaultValue:""
              }},{sequelize})
}}
export default sbcarrerasraw