
          import {gql} from 'apollo-server-express'

          export default gql`type datamtmsbcarrerassbmaterias{
                  carrera:String
mtmsbmateriassbcarreras:[datamtmsbmateriassbcarreras]
otmsbareasbcarrerasId:Int

id:Int
mtmsbcarrerassbmateriasId:Int
mtmsbmateriassbcarrerasId:Int
semestre:Int
                  key:String
                  otherKey:String,
                  whereClauses:String,
                  sortClauses:String,

                },type datamtmsbprofesoressbmaterias{
                  nombre:String
registro:String
mtmsbareasbprofesores:[datamtmsbareasbprofesores]
mtmsbmateriassbprofesores:[datamtmsbmateriassbprofesores]
otmsbgrupossbprofesoresId:Int

id:Int
mtmsbmateriassbprofesoresId:Int
mtmsbprofesoressbmateriasId:Int
                  key:String
                  otherKey:String,
                  whereClauses:String,
                  sortClauses:String,

                },type sbmaterias{
              
              id:Int
materia:String
mtmsbcarrerassbmaterias:[datamtmsbcarrerassbmaterias],
otmsbareasbmateriasId:Int
otmsbmateriassbgrupos:[sbgrupos]
mtmsbprofesoressbmaterias:[datamtmsbprofesoressbmaterias],
materiaIdGlobalCatQuery:Int
materiaIdFinalCatQuery:Int
materiaIdProductQuery:Int

              whereClauses:String
              sortClauses:String
            }

            type Query{
              sbmaterias:[sbmaterias]
              
              
            }
            type Mutation{
            
              createsbmaterias(
                id:Int,
materia:String,
otmsbareasbmateriasId:Int,
materiaIdGlobalCatQuery:Int,
materiaIdFinalCatQuery:Int,
materiaIdProductQuery:Int
,
                parentArg:String
                ):sbmaterias
              
              
              getDatasbmaterias(whereClauses:String,sortClauses:String):[sbmaterias]
removesbmaterias(id:Int,parentArg:String,
                  hardDelete:Boolean,
                  otmCategoryIds:[String],
                  mtmCategoryIds:[String]
                  ):Boolean!
editsbmaterias(id:Int,
materia:String,
otmsbareasbmateriasId:Int,
materiaIdGlobalCatQuery:Int,
materiaIdFinalCatQuery:Int,
materiaIdProductQuery:Int
,):sbmaterias
              getsbmaterias(id:Int):sbmaterias
              
            }`
          