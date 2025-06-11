
          import {gql} from 'apollo-server-express'

          export default gql`type originalmtmsbareasbprofesores{
                  area:String



id:Int
mtmsbprofesoressbarea:[datamtmsbprofesoressbarea]
mtmsbprofesoressbareaId:Int
mtmsbareasbprofesoresId:Int
                  key:String
                    
      
                }
                type copymtmsbareasbprofesores{
                  nombre:String
registro:String



id:Int
mtmsbprofesoressbareaId:Int
mtmsbareasbprofesoresId:Int
                  key:String
                }
                type datamtmsbareasbprofesores{
                  original:originalmtmsbareasbprofesores
                  copy:copymtmsbareasbprofesores
                  
                }
                type originalmtmsbareasbprofesores{
                  area:String



id:Int
mtmsbprofesoressbarea:[datamtmsbprofesoressbarea]
mtmsbprofesoressbareaId:Int
mtmsbareasbprofesoresId:Int
                  key:String
                    
      
                }
                type copymtmsbareasbprofesores{
                  nombre:String
registro:String



id:Int
mtmsbprofesoressbareaId:Int
mtmsbareasbprofesoresId:Int
                  key:String
                }
                type datamtmsbareasbprofesores{
                  original:originalmtmsbareasbprofesores
                  copy:copymtmsbareasbprofesores
                  
                }
                type originalmtmsbmateriassbprofesores{
                  materia:String


otmsbareasbmateriasId:Int


id:Int
mtmsbprofesoressbmaterias:[datamtmsbprofesoressbmaterias]
mtmsbmateriassbprofesoresId:Int
mtmsbprofesoressbmateriasId:Int
                  key:String
                    
      
                }
                type copymtmsbmateriassbprofesores{
                  nombre:String
registro:String



id:Int
mtmsbmateriassbprofesoresId:Int
mtmsbprofesoressbmateriasId:Int
                  key:String
                }
                type datamtmsbmateriassbprofesores{
                  original:originalmtmsbmateriassbprofesores
                  copy:copymtmsbmateriassbprofesores
                  
                }
                type sbprofesores{
              
              id:Int
nombre:String
registro:String
mtmsbareasbprofesores:[datamtmsbareasbprofesores],
profesorIdGlobalCatQuery:Int
profesorIdFinalCatQuery:Int
profesorIdProductQuery:Int
mtmsbmateriassbprofesores:[datamtmsbmateriassbprofesores],

            }

            type Query{
              sbprofesores:[sbprofesores]
              
              
            }
            type Mutation{
            
              createsbprofesores(
                id:Int,
nombre:String,
registro:String,
profesorIdGlobalCatQuery:Int,
profesorIdFinalCatQuery:Int,
profesorIdProductQuery:Int
,
                ):sbprofesores
              
              
              getDatasbprofesores:[sbprofesores]
removesbprofesores(id:Int):Boolean!
editsbprofesores(id:Int,
nombre:String,
registro:String,
profesorIdGlobalCatQuery:Int,
profesorIdFinalCatQuery:Int,
profesorIdProductQuery:Int
,):sbprofesores
              getsbprofesores(id:Int):sbprofesores
              
            }`
          