
import {gql} from 'apollo-server-express'

export default gql`
  type a2{
    id:Int!
    Colesterol:String
General2:String
General1:String
campon:String
a3:String
a4:Int
a5:String
a6:Int
a7:Int

  }

  type Query{
    a2:[a2]
    
  }
  type Mutation{
    createa2(
      Colesterol:String,
General2:String,
General1:String,
campon:String,
a3:String,
a4:Int,
a5:String,
a6:Int,
a7:Int,

      ):a2
    
    
  }`
