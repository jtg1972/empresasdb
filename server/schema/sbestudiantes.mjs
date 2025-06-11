
          import {gql} from 'apollo-server-express'

          export default gql`type originalmtmsbgrupossbestudiantes{
                  clavedelgrupo:String

otmsbmateriassbgruposId:Int

id:Int
mtmsbestudiantessbgrupos:[datamtmsbestudiantessbgrupos]
mtmsbgrupossbestudiantesId:Int
calificacion:Int
mtmsbestudiantessbgruposId:Int
                  key:String
                    
      
                }
                type copymtmsbgrupossbestudiantes{
                  nombre:String
boleta:String
incomingyear:Int
semesterType:String


id:Int
mtmsbgrupossbestudiantesId:Int
calificacion:Int
mtmsbestudiantessbgruposId:Int
                  key:String
                }
                type datamtmsbgrupossbestudiantes{
                  original:originalmtmsbgrupossbestudiantes
                  copy:copymtmsbgrupossbestudiantes
                  
                }
                type sbestudiantes{
              
              id:Int
nombre:String
boleta:String
incomingyear:Int
semesterType:String
estudianteIdGlobalCatQuery:Int
estudianteIdFinalCatQuery:Int
estudianteIdProductQuery:Int
mtmsbgrupossbestudiantes:[datamtmsbgrupossbestudiantes],

            }

            type Query{
              sbestudiantes:[sbestudiantes]
              
              
            }
            type Mutation{
            
              createsbestudiantes(
                id:Int,
nombre:String,
boleta:String,
incomingyear:Int,
semesterType:String,
estudianteIdGlobalCatQuery:Int,
estudianteIdFinalCatQuery:Int,
estudianteIdProductQuery:Int
,
                ):sbestudiantes
              
              
              getDatasbestudiantes:[sbestudiantes]
removesbestudiantes(id:Int):Boolean!
editsbestudiantes(id:Int,
nombre:String,
boleta:String,
incomingyear:Int,
semesterType:String,
estudianteIdGlobalCatQuery:Int,
estudianteIdFinalCatQuery:Int,
estudianteIdProductQuery:Int
,):sbestudiantes
              getsbestudiantes(id:Int):sbestudiantes
              
            }`
          