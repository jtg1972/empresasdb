
          import {gql} from 'apollo-server-express'

          export default gql`type sbestudiantes{
              
              id:Int
nombre:String
boleta:String
incomingyear:Int
semesterType:String
estudianteIdGlobalCatQuery:Int
estudianteIdFinalCatQuery:Int
estudianteIdProductQuery:Int

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
          