
import {gql} from 'apollo-server-express'

export default gql`
  type Alimentos{
    id:Int!
    Name:String
Price:Int
Cost:Int
Added1:String

  }

  type Query{
    Alimentos:[Alimentos]
    
  }
  type Mutation{
    createAlimentos(
      Name:String,
Price:Int,
Cost:Int,
Added1:String,

      ):Alimentos
    
    
  }`
