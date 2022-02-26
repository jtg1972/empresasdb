import fs from 'fs'
import Sequelize from 'sequelize'
const fileNames=fs.readdirSync('./models')
let i=[]
  fileNames.forEach(file=>{
    console.log("file",file)
    let name1=file.split(".")[0]
    if(name1!=="index" && name1!=="pivoteModels" &&
    name1!=="index2" && 
     name1!=="oldgoodindex"){
      //arg+=`${name1}.init(sequelize,Sequelize),`
      console.log("name1",name1)
      //import a1 from `./${name1}.mjs`
      //console.log("imp",imp)
      i.push(name1)
    }
  
  })
  const sequelize=new Sequelize('business',
  'postgres','postgres',{
    dialect:'postgres'
  })
  let g=[]
  
  export async function load(){
    let resp1={}
    let imps=[]
    for(let j in i){
      let fn=`./${i[j]}.mjs`
      let name1=i[j]
      if(name1!=="index" &&
    name1!=="index2" && 
    name1!=="pivoteModels" &&
    name1!=="oldgoodindex"){
    
      console.log("fn",fn)
      try{
      let obj=await import(fn)
      console.log("obj",obj)
      let say=obj.default
      imps.push(say)
      console.log("say",say)
      resp1={...resp1,[i[j]]:say.init(sequelize,Sequelize)}
      //console.log("res",res)
      
      }catch(e){
        console.log("error",e)
      }
    }
    }
    return {resp1,imps}
}
  
function loadClasses(){ 
  
  i.forEach(async j=>{
    console.log("j",j)
    let say=await load(j)
    console.log("say",say)
    
  })
 }
  

const  WriteToFile=(name,content)=>{ 
  
  let filePath=`./models/${name}.mjs`
  fs.writeFile(filePath,content,(err)=>{
    if(err){
      console.log("error",err)
      throw err
    }
    console.log("the file was succesfully saved")
  })
}

export default function rf(){
  console.log("Ij",imports().join("\n"))
  const r1=readFiles()
  //console.log("rf",rf)
  //const pj=JSON.parse(rf)
  console.log("models",r1)
  let  content=`
  import Sequelize from 'sequelize'
  //import Product from './product.mjs'
  //import Category from './category.mjs'
  //import Fields from './fields.mjs'
  //import { readFiles } from './pivoteModels.mjs'
  //import { rf } from './pivoteModels.mjs'
  //import { imports } from './pivoteModels.mjs'
  ${imports()}
  const sequelize=new Sequelize('business',
  'postgres','postgres',{
    dialect:'postgres'
  })
  
  /*const models={
    Product:Product.init(sequelize,Sequelize),
    Category:Category.init(sequelize,Sequelize),
    Fields:Fields.init(sequelize,Sequelize),
  }*/
  const models=${r1}
  Object.values(models)
    .filter(model=>typeof model.associate==="function")
    .forEach(model=>model.associates(models))
  
  const db={
    ...models,
    sequelize,
    Sequelize
  }
  
  export default db
`
console.log("content","hola")
WriteToFile("index2","hola")
} 

/*export function imports(){
  let i=[]
  const fileNames=fs.readdirSync('./models')
  fileNames.forEach(file=>{
    const name1=file.split(".")[0]
    if(name1!=="index" && name1!=="pivoteModels" &&
    name1!=="index2" && 
     name1!=="oldgoodindex"){
      //arg+=`${name1}.init(sequelize,Sequelize),`
      console.log("name1",name1)
      //const a1 =require(`./${name1}.mjs`)
      //console.log("imp",imp)
      i.push(a1)
    }
  
  })
  //i=i.join("\n")
  //console.log("imp",i)
  return i
}*/
export async function readFiles(){
  const fileNames=fs.readdirSync('./models')
  const models={}
  //const imp=imports();
  let arg={}
  let names={}
  await load()
  fileNames.forEach((file,ine)=>{
    let name1=file.split(".")[0]
    //import name1 from `./${name1}.mjs`
    //arg[name1]=names[name1]["init"](sequelize,Sequelize)
    if(name1!=="index" &&
    name1!=="index2" && 
    name1!=="pivoteModels" &&
    name1!=="oldgoodindex")
      arg={...arg,[name1]:g[ine]}
    
  })
  /*arg+='}'*/
  console.log("models12",arg)
  arg=JSON.stringify(arg)
  console.log("str",arg)
  arg=JSON.parse(arg)
  console.log("dec",arg)
  return arg
}