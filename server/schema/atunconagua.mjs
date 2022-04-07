
          import {gql} from 'apollo-server-express'

          export default gql`
            type atunconagua{
                id:Int!
              name:String
calorias:Int
agen1:String

            }

            type Query{
              atunconagua:[atunconagua]
              
            }
            type Mutation{
              createatunconagua(
                name:String,
calorias:Int,
agen1:String,

                ):atunconagua
              getDataatunconagua:[atunconagua]
              
              
            }`
          