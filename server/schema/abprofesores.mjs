
          import {gql} from 'apollo-server-express'

          export default gql`type abprofesores{
              
              id:Int

              whereClauses:String
              sortClauses:String
            }

            type Query{
              abprofesores:[abprofesores]
              
              
            }
            type Mutation{
            
              createabprofesores(
                id:Int,

                parentArg:String
                ):abprofesores
              
              
              getDataabprofesores(whereClauses:String,sortClauses:String):[abprofesores]
removeabprofesores(id:Int,parentArg:String,
                  hardDelete:Boolean):Boolean!
editabprofesores(id:Int,
):abprofesores
              getabprofesores(id:Int):abprofesores
              
            }`
          