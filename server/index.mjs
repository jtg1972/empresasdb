import pkg from 'apollo-server-express'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import fs from 'fs'
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
/*import ProductSchema from './schema/product.mjs'
import CategorySchema from './schema/category.mjs'
import FieldSchema from './schema/field.mjs'

import ProductResolver from './resolvers/product.mjs'
import CategoryResolver from './resolvers/category.mjs'
import FieldResolver from './resolvers/field.mjs'
*/
const {ApolloServer}=pkg

const types=[]
const res=[]
const fileNames1=fs.readdirSync('./schema')

for(let i in fileNames1){
  let file=fileNames1[i]
  let name1=file.split(".")[0]
    let imptx=`./schema/${fileNames1[i]}`
    let obj=await import(imptx)
    types.push(obj.default)
   
}
const fileNames2=fs.readdirSync('./resolvers')

for(let i in fileNames2){
  let file=fileNames2[i]
  let name1=file.split(".")[0]
    let imptx=`./resolvers/${fileNames2[i]}`
    let obj=await import(imptx)
    res.push(obj.default)
   
}
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
      
  