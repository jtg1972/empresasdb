
          import {gql} from 'apollo-server-express'

          export default gql`type originalmtmsbcarrerassbmaterias{
                  carrera:String


otmsbareasbcarrerasId:Int
id:Int
mtmsbmateriassbcarreras:[datamtmsbmateriassbcarreras]
mtmsbcarrerassbmateriasId:Int
mtmsbmateriassbcarrerasId:Int
semestre:Int
                  key:String
                    
      
                }
                type copymtmsbcarrerassbmaterias{
                  materia:String


otmsbareasbmateriasId:Int


id:Int
mtmsbcarrerassbmateriasId:Int
mtmsbmateriassbcarrerasId:Int
semestre:Int
                  key:String
                }
                type datamtmsbcarrerassbmaterias{
                  original:originalmtmsbcarrerassbmaterias
                  copy:copymtmsbcarrerassbmaterias
                  
                }
                type originalmtmsbcarrerassbmaterias{
                  carrera:String


otmsbareasbcarrerasId:Int
id:Int
mtmsbmateriassbcarreras:[datamtmsbmateriassbcarreras]
mtmsbcarrerassbmateriasId:Int
mtmsbmateriassbcarrerasId:Int
semestre:Int
                  key:String
                    
      
                }
                type copymtmsbcarrerassbmaterias{
                  materia:String


otmsbareasbmateriasId:Int


id:Int
mtmsbcarrerassbmateriasId:Int
mtmsbmateriassbcarrerasId:Int
semestre:Int
                  key:String
                }
                type datamtmsbcarrerassbmaterias{
                  original:originalmtmsbcarrerassbmaterias
                  copy:copymtmsbcarrerassbmaterias
                  
                }
                type originalmtmsbprofesoressbmaterias{
                  nombre:String
registro:String



id:Int
mtmsbmateriassbprofesores:[datamtmsbmateriassbprofesores]
mtmsbmateriassbprofesoresId:Int
mtmsbprofesoressbmateriasId:Int
                  key:String
                    
      
                }
                type copymtmsbprofesoressbmaterias{
                  materia:String


otmsbareasbmateriasId:Int


id:Int
mtmsbmateriassbprofesoresId:Int
mtmsbprofesoressbmateriasId:Int
                  key:String
                }
                type datamtmsbprofesoressbmaterias{
                  original:originalmtmsbprofesoressbmaterias
                  copy:copymtmsbprofesoressbmaterias
                  
                }
                type sbmaterias{
              
              id:Int
materia:String
materiaIdGlobalCatQuery:Int
materiaIdFinalCatQuery:Int
materiaIdProductQuery:Int
mtmsbcarrerassbmaterias:[datamtmsbcarrerassbmaterias],
otmsbareasbmateriasId:Int
otmsbmateriassbgrupos:[sbgrupos]
mtmsbprofesoressbmaterias:[datamtmsbprofesoressbmaterias],

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

                ):sbmaterias
              
              
              getDatasbmaterias:[sbmaterias]
removesbmaterias(id:Int):Boolean!
editsbmaterias(id:Int,
materia:String,
materiaIdGlobalCatQuery:Int,
materiaIdFinalCatQuery:Int,
materiaIdProductQuery:Int
,otmsbareasbmateriasId:Int,
):sbmaterias
              getsbmaterias(id:Int):sbmaterias
              
            }`
          