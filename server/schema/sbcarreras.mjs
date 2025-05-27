
          import {gql} from 'apollo-server-express'

          export default gql`type originalmtmsbmateriassbcarreras{
                  materia:String


otmsbareasbmateriasId:Int
id:Int
mtmsbcarrerassbmaterias:[datamtmsbcarrerassbmaterias]
mtmsbcarrerassbmateriasId:Int
mtmsbmateriassbcarrerasId:Int
semestre:Int
                  key:String
                    
      
                }
                type copymtmsbmateriassbcarreras{
                  carrera:String


otmsbareasbcarrerasId:Int
id:Int
mtmsbcarrerassbmateriasId:Int
mtmsbmateriassbcarrerasId:Int
semestre:Int
                  key:String
                }
                type datamtmsbmateriassbcarreras{
                  original:originalmtmsbmateriassbcarreras
                  copy:copymtmsbmateriassbcarreras
                  
                }
                type sbcarreras{
              
              id:Int
carrera:String
carreraIdGlobalCatQuery:Int
carreraIdFinalCatQuery:Int
carreraIdProductQuery:Int
mtmsbmateriassbcarreras:[datamtmsbmateriassbcarreras],
otmsbareasbcarrerasId:Int

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

                ):sbcarreras
              
              
              getDatasbcarreras:[sbcarreras]
removesbcarreras(id:Int):Boolean!
editsbcarreras(id:Int,
carrera:String,
carreraIdGlobalCatQuery:Int,
carreraIdFinalCatQuery:Int,
carreraIdProductQuery:Int
,otmsbareasbcarrerasId:Int,
):sbcarreras
              getsbcarreras(id:Int):sbcarreras
              
            }`
          