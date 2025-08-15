import Sequelize from 'sequelize'

          
          class poestudiantesraw extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 estudiantesidGlobalCatQuery:DataTypes.INTEGER,
		 estudiantesidFinalCatQuery:DataTypes.INTEGER,
		 estudiantesidProductQuery:DataTypes.INTEGER,
		 nombre:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 yearingreso:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 tiposemestre:{
                type:DataTypes.STRING,
                defaultValue:""
              }},{sequelize})
}static associate(models){models.poestudiantesraw.belongsToMany(models.pogruposraw,{foreignKey:"mtmpoestudiantesrawpogruposrawId",through:"poestudiantesraw_pogruposraw"})

                  models.pogruposraw.belongsToMany(models.poestudiantesraw,{foreignKey:"mtmpogruposrawpoestudiantesrawId",through:"poestudiantesraw_pogruposraw"})
                }}
export default poestudiantesraw