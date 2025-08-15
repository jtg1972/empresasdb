
          import {gql} from 'apollo-server-express'

          export default gql`type datamtmsbareasbprofesores{
                  area:String
otmsbareasbcarreras:[sbcarreras]
otmsbareasbmaterias:[sbmaterias]
mtmsbprofesoressbarea:[datamtmsbprofesoressbarea]
id:Int
mtmsbprofesoressbareaId:Int
mtmsbareasbprofesoresId:Int
                  key:String
                },type datamtmsbmateriassbprofesores{
                  materia:String

mtmsbcarrerassbmaterias:[datamtmsbcarrerassbmaterias]
otmsbareasbmateriasId:Int
otmsbmateriassbgrupos:[sbgrupos]
mtmsbprofesoressbmaterias:[datamtmsbprofesoressbmaterias]
id:Int
mtmsbmateriassbprofesoresId:Int
mtmsbprofesoressbmateriasId:Int
                  key:String
                },type sbprofesores{
              
              id:Int
nombre:String
registro:String
mtmsbareasbprofesores:[datamtmsbareasbprofesores],
mtmsbmateriassbprofesores:[datamtmsbmateriassbprofesores],
otmsbgrupossbprofesoresId:Int
profesorIdGlobalCatQuery:Int
profesorIdFinalCatQuery:Int
profesorIdProductQuery:Int

            }

            type Query{
              sbprofesores:[sbprofesores]
              
              
            }
            type Mutation{
            
              createsbprofesores(
                id:Int,
nombre:String,
registro:String,
otmsbgrupossbprofesoresId:Int,
profesorIdGlobalCatQuery:Int,
profesorIdFinalCatQuery:Int,
profesorIdProductQuery:Int
,
                parentArg:String
                ):sbprofesores
              
              
              getDatasbprofesores:[sbprofesores]
removesbprofesores(id:Int,parentArg:String,
                  hardDelete:Boolean):Boolean!
editsbprofesores(id:Int,
nombre:String,
registro:String,
otmsbgrupossbprofesoresId:Int,
profesorIdGlobalCatQuery:Int,
profesorIdFinalCatQuery:Int,
profesorIdProductQuery:Int
,):sbprofesores
              getsbprofesores(id:Int):sbprofesores
              
            }`
          