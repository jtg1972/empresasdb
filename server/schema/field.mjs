import {gql} from 'apollo-server-express'

export default gql`
  type Field{
    id:Int!
    name:String!
    category:Int!
    dataType:String!
    values:String
    declaredType:String!
  }

  type Query{
    fields:[Field!]

  }
  type Mutation{
    createField(
      name:String!,
      category:Int!,
      declaredType:String!,
      values:String,
      dataType:String!):Field!,
    addValueToField(id:Int!,value:String!):Field!,
    createTable(category:Int!):Boolean
  }
`