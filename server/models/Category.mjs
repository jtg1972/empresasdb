import Sequelize from 'sequelize'
class Category extends Sequelize.Model{
  static init(sequelize,DataTypes){
    return super.init({
      name:DataTypes.STRING,
      parentCategories:DataTypes.STRING,
      parentCategory:DataTypes.INTEGER,
      typeOfCategory:{
        type:DataTypes.INTEGER,
        defaultValue:1
      },
      manyToMany:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
      }
    },{sequelize})
  }
}
export default Category
