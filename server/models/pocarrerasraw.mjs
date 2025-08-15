import Sequelize from 'sequelize'

          
          class pocarrerasraw extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 carrera:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 yearcreated:{
                type:DataTypes.INTEGER,
                defaultValue:0
              }},{sequelize})
}static associate(models){this.hasMany(models.pomateriasraw)

                  models.pomateriasraw.belongsTo(models.pocarrerasraw,
                    {foreignKey:"pocarrerasrawId"})
                    
                  }}
export default pocarrerasraw