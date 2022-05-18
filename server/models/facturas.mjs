import Sequelize from 'sequelize'

          class facturas extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 otmclientesfacturasId:DataTypes.INTEGER,
		 clave:DataTypes.STRING},{sequelize})
}static associate(models){this.hasMany(models.detallesFacturas)

                  models.detallesFacturas.belongsTo(models.facturas,
                    {foreignKey:"facturasId"})
                    
                  }}
export default facturas