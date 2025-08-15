
          import {gql} from 'apollo-server-express'

          export default gql`type datamtmsbmateriassbcarreras{
                  materia:String

mtmsbcarrerassbmaterias:[datamtmsbcarrerassbmaterias]
otmsbareasbmateriasId:Int
otmsbmateriassbgrupos:[sbgrupos]
mtmsbprofesoressbmaterias:[datamtmsbprofesoressbmaterias]
id:Int
mtmsbcarrerassbmateriasId:Int
mtmsbmateriassbcarrerasId:Int
semestre:Int
                  key:String
                },type sbcarreras{
              
              id:Int
carrera:String
carreraIdGlobalCatQuery:Int
carreraIdFinalCatQuery:Int
carreraIdProductQuery:Int
mtmsbmateriassbcarreras:[datamtmsbmateriassbcarreras],
otmsbareasbcarrerasId:Int
whereClauses:String

            }

            type Query{
              sbcarreras:[sbcarreras]
              
              
            }
            type Mutation{
            
              createsbcarreras(
                id:Int,
carrera:String,
carreraIdGlobalCatQuery:Int,
carreraIdFinalCatQuery:Int,
carreraIdProductQuery:Int
,otmsbareasbcarrerasId:Int,

                parentArg:String
                ):sbcarreras
              
              
              getDatasbcarreras:[sbcarreras]
removesbcarreras(id:Int,parentArg:String,
                  hardDelete:Boolean):Boolean!
editsbcarreras(id:Int,
carrera:String,
carreraIdGlobalCatQuery:Int,
carreraIdFinalCatQuery:Int,
carreraIdProductQuery:Int
,otmsbareasbcarrerasId:Int,
):sbcarreras
              getsbcarreras(id:Int):sbcarreras
              
            }`
          