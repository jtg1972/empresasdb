
          import {gql} from 'apollo-server-express'

          export default gql`
            type Mojarra{
              
              id:Int
name:String
aletas:String
color:String
mojf1:Int

            }

            type Query{
              Mojarra:[Mojarra]
              
            }
            type Mutation{
              createMojarra(
                id:Int,
name:String,
aletas:String,
color:String,
mojf1:Int,

                ):Mojarra
              getDataMojarra:[Mojarra]
              deleteMojarra(id:Int):Boolean!
              editMojarra(id:Int,
name:String,
aletas:String,
color:String,
mojf1:Int,
):Mojarra
              
            }`
          