
          import {gql} from 'apollo-server-express'

          export default gql`
            type atunconaceite{
                id:Int!
              name:String
price:Int
tamano:String
agen1:String

            }

            type Query{
              atunconaceite:[atunconaceite]
              
            }
            type Mutation{
              createatunconaceite(
                name:String,
price:Int,
tamano:String,
agen1:String,

                ):atunconaceite
              getDataatunconaceite:[atunconaceite]
              
              
            }`
          