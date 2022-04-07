import {gql} from 'apollo-server-express'

export default gql`
  type TableState{
    id:Int!
    category:Int!
    name:String!
    state:String!
  }

  type Query{
    tableStates:[TableState!]
  
  }
  type Mutation{
    createTableState(category:Int!,name:String!,state:String!):TableState!
    editTableState(category:Int!,state:String!):TableState!
  }
`