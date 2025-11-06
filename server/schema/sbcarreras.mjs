
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
                  otherKey:String,
                  whereClauses:String,
                  sortClauses:String,

                },type sbcarreras{
              
              id:Int
carrera:String
mtmsbmateriassbcarreras:[datamtmsbmateriassbcarreras],
otmsbareasbcarrerasId:Int
carreraIdGlobalCatQuery:Int
carreraIdFinalCatQuery:Int
carreraIdProductQuery:Int

              whereClauses:String
              sortClauses:String
            }

            type Query{
              sbcarreras:[sbcarreras]
              
              
            }
            type Mutation{
            
              createsbcarreras(
                id:Int,
carrera:String,
otmsbareasbcarrerasId:Int,
carreraIdGlobalCatQuery:Int,
carreraIdFinalCatQuery:Int,
carreraIdProductQuery:Int
,
                parentArg:String
                ):sbcarreras
              
              
              getDatasbcarreras(whereClauses:String,sortClauses:String):[sbcarreras]
removesbcarreras(id:Int,parentArg:String,
                  hardDelete:Boolean,
                  otmCategoryIds:[String],
                  mtmCategoryIds:[String]
                  ):Boolean!
editsbcarreras(id:Int,
carrera:String,
otmsbareasbcarrerasId:Int,
carreraIdGlobalCatQuery:Int,
carreraIdFinalCatQuery:Int,
carreraIdProductQuery:Int
,):sbcarreras
              getsbcarreras(id:Int):sbcarreras
              
            }`
          