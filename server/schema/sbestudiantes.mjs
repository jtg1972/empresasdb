
          import {gql} from 'apollo-server-express'

          export default gql`type datamtmsbgrupossbestudiantes{
                  clavedelgrupo:String

otmsbmateriassbgruposId:Int
mtmsbestudiantessbgrupos:[datamtmsbestudiantessbgrupos]
otmsbgrupossbprofesores:[sbprofesores]
id:Int
mtmsbgrupossbestudiantesId:Int
calificacion:Int
mtmsbestudiantessbgruposId:Int
                  key:String
                  otherKey:String
                },type sbestudiantes{
              
              id:Int
nombre:String
boleta:String
incomingyear:Int
semesterType:String
estudianteIdGlobalCatQuery:Int
estudianteIdFinalCatQuery:Int
estudianteIdProductQuery:Int
mtmsbgrupossbestudiantes:[datamtmsbgrupossbestudiantes],

              whereClauses:String
              sortClauses:String
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
                parentArg:String
                ):sbestudiantes
              
              
              getDatasbestudiantes(whereClauses:String,sortClauses:String):[sbestudiantes]
removesbestudiantes(id:Int,parentArg:String,
                  hardDelete:Boolean):Boolean!
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
          