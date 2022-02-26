import Sequelize from 'sequelize'
class Product extends Sequelize.Model{
  static init(sequelize,DataTypes){
    return super.init({
      name:DataTypes.STRING,
      price:DataTypes.FLOAT
    },{sequelize})
  }
}
export default Product
