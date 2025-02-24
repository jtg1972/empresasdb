
          import {gql} from 'apollo-server-express'

          export default gql`type datamtmAlumnosGrupos{
                  
estudiante:String
id:Int
mtmGruposAlumnos:[datamtmGruposAlumnos]
mtmAlumnosGruposId:Int
mtmGruposAlumnosId:Int
campo_mutuo1:String
campo_mutuo2:String
campo_mutuo3:String
                },type Grupos{
              
              id:Int
mtmAlumnosGrupos:[datamtmAlumnosGrupos],
grupo:String
otmscmateriasGruposId:Int

            }

            type Query{
              Grupos:[Grupos]
              
              
            }
            type Mutation{
            
              createGrupos(
                id:Int,
grupo:String,
otmscmateriasGruposId:Int,

                ):Grupos
              
              
              getDataGrupos:[Grupos]
removeGrupos(id:Int):Boolean!
editGrupos(id:Int,
grupo:String,
otmscmateriasGruposId:Int,
):Grupos
              getGrupos(id:Int):Grupos
              
            }`
          