import Sequelize from 'sequelize'

          
          class sbcarreras_sbmaterias extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 mtmsbcarrerassbmateriasId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmsbcarrerassbmateriasIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmsbcarrerassbmateriasIdFinalCatQuery:DataTypes.INTEGER,
		 mtmsbcarrerassbmateriasIdProductQuery:DataTypes.INTEGER,
		 mtmsbmateriassbcarrerasId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 mtmsbmateriassbcarrerasIdGlobalCatQuery:DataTypes.INTEGER,
		 mtmsbmateriassbcarrerasIdFinalCatQuery:DataTypes.INTEGER,
		 mtmsbmateriassbcarrerasIdProductQuery:DataTypes.INTEGER,
		 semestre:{
                type:DataTypes.INTEGER,
                defaultValue:0
              }},{sequelize})
}}
export default sbcarreras_sbmaterias