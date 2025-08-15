import Sequelize from 'sequelize'

          
          class pogruposraw extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 otmpoprofesoresrawpogruposrawId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 gruposidGlobalCatQuery:DataTypes.INTEGER,
		 gruposidFinalCatQuery:DataTypes.INTEGER,
		 gruposidProductQuery:DataTypes.INTEGER,
		 clave:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 semestre:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 tiposemestre:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 year:{
                type:DataTypes.INTEGER,
                defaultValue:0
              }},{sequelize})
}static associate(models){models.pogruposraw.belongsToMany(models.poestudiantesraw,{foreignKey:"mtmpogruposrawpoestudiantesrawId",through:"poestudiantesraw_pogruposraw"})

                  models.poestudiantesraw.belongsToMany(models.pogruposraw,{foreignKey:"mtmpoestudiantesrawpogruposrawId",through:"poestudiantesraw_pogruposraw"})
                }}
export default pogruposraw