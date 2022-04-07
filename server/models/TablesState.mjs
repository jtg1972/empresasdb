import Sequelize from 'sequelize'
class TablesState extends Sequelize.Model{
  static init(sequelize,DataTypes){
    return super.init({
      category:DataTypes.INTEGER,
      name:DataTypes.STRING,
      state:DataTypes.STRING
    },{sequelize})
  }
}
export default TablesState
