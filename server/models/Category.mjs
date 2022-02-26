import Sequelize from 'sequelize'
class Category extends Sequelize.Model{
  static init(sequelize,DataTypes){
    return super.init({
      name:DataTypes.STRING,
      parentCategories:DataTypes.STRING,
      parentCategory:DataTypes.INTEGER
    },{sequelize})
  }
}
export default Category
