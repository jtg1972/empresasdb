
          import {gql} from 'apollo-server-express'

          export default gql`

            
            type Grupos{
              
              id:Int
mtmAlumnosGrupos:[Alumnos]
grupo:String

            }

            type Query{
              Grupos:[Grupos]
              
              
            }
            type Mutation{
              createGrupos(
                id:Int,
grupo:String,

                ):Grupos
              
              
              getDataGrupos:[Grupos]
              removeGrupos(id:Int):Boolean!
              editGrupos(id:Int,
grupo:String,
):Grupos
              getGrupos(id:Int):Grupos
              
            }`
          