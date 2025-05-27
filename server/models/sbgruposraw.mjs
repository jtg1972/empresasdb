import Sequelize from 'sequelize'

          
          class sbgruposraw extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 clavegrupo:{
                type:DataTypes.STRING,
                defaultValue:""
              }},{sequelize})
}}
export default sbgruposraw