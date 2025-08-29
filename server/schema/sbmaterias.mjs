
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
                  otherKey:String
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
                  otherKey:String
                },type sbmaterias{
              
              id:Int
materia:String
materiaIdGlobalCatQuery:Int
materiaIdFinalCatQuery:Int
materiaIdProductQuery:Int
mtmsbcarrerassbmaterias:[datamtmsbcarrerassbmaterias],
otmsbareasbmateriasId:Int
otmsbmateriassbgrupos:[sbgrupos]
mtmsbprofesoressbmaterias:[datamtmsbprofesoressbmaterias],

              whereClauses:String
            }

            type Query{
              sbmaterias:[sbmaterias]
              
              
            }
            type Mutation{
            
              createsbmaterias(
                id:Int,
materia:String,
materiaIdGlobalCatQuery:Int,
materiaIdFinalCatQuery:Int,
materiaIdProductQuery:Int
,otmsbareasbmateriasId:Int,

                parentArg:String
                ):sbmaterias
              
              
              getDatasbmaterias(whereClauses:String):[sbmaterias]
removesbmaterias(id:Int,parentArg:String,
                  hardDelete:Boolean):Boolean!
editsbmaterias(id:Int,
materia:String,
materiaIdGlobalCatQuery:Int,
materiaIdFinalCatQuery:Int,
materiaIdProductQuery:Int
,otmsbareasbmateriasId:Int,
):sbmaterias
              getsbmaterias(id:Int):sbmaterias
              
            }`
          