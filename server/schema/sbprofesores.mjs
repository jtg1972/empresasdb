
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
                type sbprofesores{
              
              id:Int
nombre:String
registro:String
profesorIdGlobalCatQuery:Int
profesorIdFinalCatQuery:Int
profesorIdProductQuery:Int
mtmsbareasbprofesores:[datamtmsbareasbprofesores],

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
          