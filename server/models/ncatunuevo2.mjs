import Sequelize from 'sequelize'

          class ncatunuevo2 extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 name:DataTypes.STRING,
		 ncatunnuevo2:DataTypes.STRING,
		 ncnvo3:DataTypes.STRING,
		 agen1:DataTypes.STRING,
},{sequelize})
}static associate(models){this.hasMany(models.Mojarra)

                  models.Mojarra.belongsTo(models.ncatunuevo2,
                    {foreignKey:"ncatunuevo2Id"})
                    }
                  }
export default ncatunuevo2