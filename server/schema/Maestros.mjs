
          import {gql} from 'apollo-server-express'

          export default gql`

            
            type Maestros{
              
              id:Int
maestro:String

            }

            type Query{
              Maestros:[Maestros]
              
              
            }
            type Mutation{
              createMaestros(
                id:Int,
maestro:String,

                ):Maestros
              getDataMaestros:[Maestros]
              removeMaestros(id:Int):Boolean!
              editMaestros(id:Int,
maestro:String,
):Maestros
              
            }`
          