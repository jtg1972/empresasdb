
          import {gql} from 'apollo-server-express'

          export default gql`
            type Mojarra{
                id:Int!
              name:String
price:Int
aletas:String
color:String
mojf1:Int

            }

            type Query{
              Mojarra:[Mojarra]
              
            }
            type Mutation{
              createMojarra(
                name:String,
price:Int,
aletas:String,
color:String,
mojf1:Int,

                ):Mojarra
              getDataMojarra:[Mojarra]
              
              
            }`
          