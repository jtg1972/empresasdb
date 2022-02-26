import fs from 'fs'
import rf from '../models/pivoteModels.mjs'
import {Op} from 'sequelize'
const  WriteToFile=async(name,content)=>{ 
  
  let filePath=`${name}.mjs`
  fs.writeFile(filePath,content,(err)=>{
    if(err)
      throw err
    console.log("the file was succesfully saved")
  })
}


export default{
  Query:{
  
    fields:async(parent,args,{db})=>{
      const fields=await db.Fields.findAll({})
      return fields
    }
  },
  Mutation:{
    createField:async(parent,args,{db})=>{
      const field=await db.Fields.create(args)
      
      return field
      
    },
    addValueToField:async(parent,args,{db})=>{
      const field=await db.Fields.findByPk(args.id)
      let values=field.values
      let valuesArr=[]
      if(values!==null){
        valuesArr=values.split(",")
      }
      valuesArr.push(args.value)
      values=valuesArr.join(",")
      field.values=values
           
      return await field.save()

    },
    createTable:async(parent,args,{db})=>{
      const category=await db.Category.findByPk(args.category)
      let name=category.name

      let cats=category.parentCategories.split(",")
      cats=cats.map(c=>parseInt(c))
      cats.push(category.id)
      let content=`import Sequelize from 'sequelize'\n
      class ${name} extends Sequelize.Model{\n
        \tstatic init(sequelize,DataTypes){\n
          \t\treturn super.init({\n`
      const fields=await db.Fields.findAll({
        where:{category:{[Op.in]:cats}},
        raw:true
      })
      let fields1=fields.map(f=>{
        if(f.declaredType=="string"){
      
          return `\t\t\ ${f.name}:DataTypes.STRING`
        }else if(f.declaredType=="number"){
          return `\t\t\ ${f.name}:DataTypes.INTEGER`
        }
      }
      )  
      const ffs=fields1.join(',\n')
      content=content+ffs+`},{sequelize})\n}}`
      content+=`\nexport default ${name}`
      
      let content1=`

      //nuevo
      import pkg from 'apollo-server-express'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import {

  mergeSchemas
} from '@graphql-tools/schema'
import pkg1 from 'graphql'
const{execute,subscribe}=pkg1
import {makeExecutableSchema} from '@graphql-tools/schema'
import {createServer} from 'http'
import {SubscriptionServer} from 'subscriptions-transport-ws'
import graphqlUploadExpress from 'graphql-upload/public/graphqlUploadExpress.js'
import db from './models/index.mjs'
import ProductSchema from './schema/product.mjs'
import CategorySchema from './schema/category.mjs'
import FieldSchema from './schema/field.mjs'

import ProductResolver from './resolvers/product.mjs'
import CategoryResolver from './resolvers/category.mjs'
import FieldResolver from './resolvers/field.mjs'
const {ApolloServer}=pkg

const types=[ProductSchema,CategorySchema,FieldSchema]
const res=[ProductResolver,CategoryResolver,FieldResolver]
import {mergeTypeDefs,mergeResolvers} from '@graphql-tools/merge'
const typeDefs=mergeTypeDefs(types)
const resolvers=mergeResolvers(res)
//const resolvers=mergeResolvers(res)

const schema=mergeSchemas({typeDefs,resolvers:resolvers})

const app=express()
app.use(cors())
app.use(bodyParser.json())
app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));
const webSocketServer=createServer((request,response)=>{
  response.writeHead(404)
  response.end()
})

webSocketServer.listen(5000,()=>
  console.log("Websocket server is now running on http://localhost:5000/graphql")
)

const subscriptionServer=SubscriptionServer.create({
  schema,
  execute,
  subscribe,
  onConnect:()=>{
    console.log("Conect to server")
    return {}
  }
},{
  server:webSocketServer,
  path:'/graphql'
})

let server=new ApolloServer({
  schema,
  playground:{
    endpoint:"http://localhost:3000/graphql",

  },
  subscriptions:{
    path:"ws://localhost:5000/graphql"
  },
  context:()=>{
    return {
      db:db
    }
  }
})

await server.start()
app.use('/files',express.static("files"))
server.applyMiddleware({app,
  route:{
    payload:{
      maxBytes:52428800
    }
  }
})
db.sequelize.sync({alter:true}).then(x=>{
  console.log("x corriendo",x)
  app.listen(3000,()=>{
    //console.log("db",db)
    console.log("port running 3000")
  }
  )
}).catch(err=>console.log("errgeeg"))
      
  `
let r=[]
let x1=""
let x2=""
for(let f in fields){
  if(fields[f]["declaredType"]=="string"){
    x1+=`${fields[f]["name"]}:String\n`
    x2+=`${fields[f]["name"]}:String,\n`
    
    
  }
  else if(fields[f]["declaredType"]=="number"){
    x1+=`${fields[f]["name"]}:Int\n`
    x2+=`${fields[f]["name"]}:Int,\n`
    
  }
}
let c=r.join("\n")
let x=r.join(", ")
const content2=`
import {gql} from 'apollo-server-express'

export default gql\`
  type ${name}{
    id:Int!
    ${x1}
  }

  type Query{
    ${name}:[${name}]
    
  }
  type Mutation{
    create${name}(
      ${x2}
      ):${name}
    
    
  }\`
`

const content3=`
export default{
  Query:{
  
    ${name}:async(parent,args,{db})=>{
      const products=await db.${name}.findAll({})
      return products
    }
  },
  Mutation:{
    create${name}:async(parent,args,{db})=>{
      const product=await db.${name}.create(args)
      return product
    }
  }
}
`

      
      try{
        WriteToFile(`./models/${name}`,content)
        WriteToFile(`./schema/${name}`,content2)
        WriteToFile(`./resolvers/${name}`,content3)
        //WriteToFile("./index",content1)
        

        return true
      }catch(e){
        return false
      }
      
    }
    
  }
}