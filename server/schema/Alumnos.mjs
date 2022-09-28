
          import {gql} from 'apollo-server-express'

          export default gql`type datamtmGruposAlumnos{
                  
grupo:String
id:Int
mtmAlumnosGrupos:[datamtmAlumnosGrupos]
mtmAlumnosGruposId:Int
mtmGruposAlumnosId:Int
campo_mutuo1:String
campo_mutuo2:String
campo_mutuo3:String
                }type Alumnos{
              
              id:Int
mtmGruposAlumnos:[datamtmGruposAlumnos]
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
              getAlumnos(id:Int):Alumnos
              
            }`
          