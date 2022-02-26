import { rf } from "./pivoteModels.mjs";

rf();
/*import Sequelize from 'sequelize'
import Product from './product.mjs'
import Category from './category.mjs'
import Fields from './fields.mjs'
//import { readFiles } from './pivoteModels.mjs'
import { rf } from './pivoteModels.mjs'
//import { imports } from './pivoteModels.mjs'

const sequelize=new Sequelize('business',
'postgres','postgres',{
  dialect:'postgres'
})

/*const models={
  Product:Product.init(sequelize,Sequelize),
  Category:Category.init(sequelize,Sequelize),
  Fields:Fields.init(sequelize,Sequelize),
}
const models=rf()
Object.values(models)
  .filter(model=>typeof model.associate==="function")
  .forEach(model=>model.associates(models))

const db={
  ...models,
  sequelize,
  Sequelize
}

export default db*/