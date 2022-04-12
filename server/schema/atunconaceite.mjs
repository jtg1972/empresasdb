
          import {gql} from 'apollo-server-express'

          export default gql`
            type atunconaceite{
              
              id:Int
name:String
agen1:String

            }

            type Query{
              atunconaceite:[atunconaceite]
              
            }
            type Mutation{
              createatunconaceite(
                id:Int,
name:String,
agen1:String,

                ):atunconaceite
              getDataatunconaceite:[atunconaceite]
              deleteatunconaceite(id:Int):Boolean!
              editatunconaceite(id:Int,
name:String,
agen1:String,
):atunconaceite
              
            }`
          