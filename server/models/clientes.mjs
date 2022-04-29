import Sequelize from 'sequelize'

          class clientes extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 name:DataTypes.STRING,
		 domicilio:DataTypes.STRING,
		 telefono:DataTypes.STRING},{sequelize})
}static associate(models){this.hasMany(models.facturas)

                  models.facturas.belongsTo(models.clientes,
                    {foreignKey:"clientesId"})
                    
                  }}
export default clientes