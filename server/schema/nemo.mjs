
          import {gql} from 'apollo-server-express'

          export default gql`
            type nemo{
              
              id:Int
name:String

            }

            type Query{
              nemo:[nemo]
              
            }
            type Mutation{
              createnemo(
                id:Int,
name:String,

                ):nemo
              getDatanemo:[nemo]
              removenemo(id:Int):Boolean!
              editnemo(id:Int,
name:String,
):nemo
              
            }`
          