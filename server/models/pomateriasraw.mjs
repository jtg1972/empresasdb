import Sequelize from 'sequelize'

          
          class pomateriasraw extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 materia:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 otmpocarrerasrawpomateriasrawId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 materiaidGlobalCatQuery:DataTypes.INTEGER,
		 materiaidFinalCatQuery:DataTypes.INTEGER,
		 materiaidProductQuery:DataTypes.INTEGER},{sequelize})
}static associate(models){this.hasMany(models.poprofesoresraw)

                  models.poprofesoresraw.belongsTo(models.pomateriasraw,
                    {foreignKey:"pomateriasrawId"})
                    
                  }}
export default pomateriasraw