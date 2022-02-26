
import {gql} from 'apollo-server-express'

export default gql`
  type General{
    id:Int!
    Name:String
Price:Int
Cost:Int

  }

  type Query{
    General:[General]
    
  }
  type Mutation{
    createGeneral(
      Name:String,
Price:Int,
Cost:Int,

      ):General
    
    
  }`
