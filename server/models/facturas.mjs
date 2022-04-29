import Sequelize from 'sequelize'

          class facturas extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 fecha:DataTypes.DATEONLY,
		 clave:DataTypes.STRING,
		 clientesId:DataTypes.INTEGER},{sequelize})
}static associate(models){this.hasMany(models.detallesFacturas)

                  models.detallesFacturas.belongsTo(models.facturas,
                    {foreignKey:"facturasId"})
                    
                  }}
export default facturas