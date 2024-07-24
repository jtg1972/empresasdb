import Sequelize from 'sequelize'

          
          class clientes extends Sequelize.Model{

          	static init(sequelize,DataTypes){

            		return super.init({
		 name:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 domicilio:{
                type:DataTypes.STRING,
                defaultValue:""
              },
		 telefono:{
                type:DataTypes.STRING,
                defaultValue:""
              }},{sequelize})
}static associate(models){this.hasMany(models.facturas)

                  models.facturas.belongsTo(models.clientes,
                    {foreignKey:"clientesId"})
                    
                  this.hasMany(models.telefonos)

                  models.telefonos.belongsTo(models.clientes,
                    {foreignKey:"clientesId"})
                    
                  }}
export default clientes