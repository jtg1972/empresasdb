import {gql} from 'apollo-server-express'

export default gql`
  type Product{
    id:Int!
    name:String!
    price:Int!
  }

  type Query{
    products:[Product!]
    hi:String!
  }
  type Mutation{
    createProduct(name:String!,price:Int!):Product!
  }
`