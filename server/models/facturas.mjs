import Sequelize from 'sequelize'

          
          class facturas extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 otmclientesfacturasId:{
                type:DataTypes.INTEGER,
                defaultValue:0
              },
		 clave:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 invoiceDate:{
                type:DataTypes.DATE,
                
              }},{sequelize})
}static associate(models){this.hasMany(models.detallesFacturas)

                  models.detallesFacturas.belongsTo(models.facturas,
                    {foreignKey:"facturasId"})
                    
                  }}
export default facturas