import Sequelize from 'sequelize'
class Fields extends Sequelize.Model{
  static init(sequelize,DataTypes){
    return super.init({
      name:DataTypes.STRING,
      category:DataTypes.INTEGER,
      dataType:DataTypes.STRING,
      values:DataTypes.STRING,
      declaredType:DataTypes.STRING
    },{sequelize})
  }
}
export default Fields
