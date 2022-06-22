
          import {gql} from 'apollo-server-express'

          export default gql`

            
            type Alumnos{
              
              id:Int
mtmGruposAlumnos:[Grupos]
estudiante:String

            }

            type Query{
              Alumnos:[Alumnos]
              
              
            }
            type Mutation{
              createAlumnos(
                id:Int,
estudiante:String,

                ):Alumnos
              getDataAlumnos:[Alumnos]
              removeAlumnos(id:Int):Boolean!
              editAlumnos(id:Int,
estudiante:String,
):Alumnos
              
            }`
          