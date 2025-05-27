import Sequelize from 'sequelize'

          
          class sbmateriasraw extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 materia:{
                type:DataTypes.STRING,
                defaultValue:""
              }},{sequelize})
}}
export default sbmateriasraw