import Sequelize from 'sequelize'

          
          class poprofesoresraw extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 profesorIdGlobalCatQuery:DataTypes.INTEGER,
		 profesorIdFinalCatQuery:DataTypes.INTEGER,
		 profesorIdProductQuery:DataTypes.INTEGER,
		 nombre:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 registro:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 ingresoyear:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 tiposemestre:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 otmpomateriasrawpoprofesoresrawId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              }},{sequelize})
}static associate(models){this.hasMany(models.pogruposraw)

                  models.pogruposraw.belongsTo(models.poprofesoresraw,
                    {foreignKey:"poprofesoresrawId"})
                    
                  }}
export default poprofesoresraw