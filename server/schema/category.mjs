import {gql} from 'apollo-server-express'

export default gql`
  type Category{
    id:Int!
    name:String!
    parentCategories:[Int!]
    fields:[Field!]
    parentCategory:Int
    bookmark:[Category!]
    typeOfCategory:Int
    manyToMany:Boolean
    
  }

  type Query{
    categories:[Category!]
    selectCategory(
      id:Int!
    ):Category!
  }
  type Mutation{
    createCategory(
      name:String!,
      parentCategory:Int,
      typeOfCategory:Int,
      manyToMany:Boolean
      ):Category!,
    deleteCategory(id:Int!):Boolean!
  
    
    
  }
`