
import {gql} from 'apollo-server-express'

export default gql`
  type Huachinango{
    id:Int!
    name:String
price:Int
piel:String
color:String

  }

  type Query{
    Huachinango:[Huachinango]
    
  }
  type Mutation{
    createHuachinango(
      name:String,
price:Int,
piel:String,
color:String,

      ):Huachinango
    getDataHuachinango:[Huachinango]
    
    
  }`
