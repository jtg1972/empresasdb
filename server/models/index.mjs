import Sequelize from 'sequelize'
import fs from 'fs'

const sequelize=new Sequelize(
  'business',
  'postgres',
  'postgres',{
  dialect:'postgres'
  }
)
const productos={}
let models={}
const fileNames=fs.readdirSync('./models')

for(let i in fileNames){
  let file=fileNames[i]
  let name1=file.split(".")[0]
  if(
    name1!=="index" &&
    name1!=="index2" && 
    name1!=="pivoteModels" &&
    name1!=="oldgoodindex"){
    let imptx=`./${fileNames[i]}`
    let obj=await import(imptx)
    productos[name1]=obj.default 
    models={...models,[name1]:productos[name1].init(sequelize,Sequelize)}      
  }
}
Object.values(models)
  .filter(model=>typeof model.associate==="function")
  .forEach(model=>model.associates(models))

const db={
  ...models,
  sequelize,
  Sequelize
}

export default db