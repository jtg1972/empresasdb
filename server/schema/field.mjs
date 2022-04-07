import {gql} from 'apollo-server-express'

export default gql`
  type Field{
    id:Int!
    name:String!
    category:Int!
    dataType:String!
    values:[String!]
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
      dataType:String!):Field!,
    addValueToField(id:Int!,value:String!):Field!,
    createTable(category:Int!,typeOfCategory:Int!):Boolean,
    createTableGood(categoryIds:[Int]):Boolean,
    removeField(id:Int!):Boolean!,
  
    removeMultipleValue(id:Int!,value:String!):Boolean
  } 
`

//createTableGood(categoryIds:[Int]):Boolean,