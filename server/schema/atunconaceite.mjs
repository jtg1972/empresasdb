
          import {gql} from 'apollo-server-express'

          export default gql`

            
            type atunconaceite{
              
              id:Int
name:String
agen1:String
precio:Int

            }

            type Query{
              atunconaceite:[atunconaceite]
              
              
            }
            type Mutation{
              createatunconaceite(
                id:Int,
name:String,
agen1:String,
precio:Int,

                ):atunconaceite
              getDataatunconaceite:[atunconaceite]
              removeatunconaceite(id:Int):Boolean!
              editatunconaceite(id:Int,
name:String,
agen1:String,
precio:Int,
):atunconaceite
              
            }`
          