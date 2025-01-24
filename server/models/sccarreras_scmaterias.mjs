import Sequelize from 'sequelize'

          
          class sccarreras_scmaterias extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 mtmscmateriassccarrerasId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmscmateriassccarrerasIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmscmateriassccarrerasIdFinalCatQuery:DataTypes.INTEGER,
		 mtmscmateriassccarrerasIdProductQuery:DataTypes.INTEGER,
		 mtmsccarrerasscmateriasId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmsccarrerasscmateriasIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmsccarrerasscmateriasIdFinalCatQuery:DataTypes.INTEGER,
		 mtmsccarrerasscmateriasIdProductQuery:DataTypes.INTEGER,
		 semestre:{
                type:DataTypes.STRING,
                defaultValue:""
              }},{sequelize})
}}
export default sccarreras_scmaterias