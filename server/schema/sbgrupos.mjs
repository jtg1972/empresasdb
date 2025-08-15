
          import {gql} from 'apollo-server-express'

          export default gql`type datamtmsbestudiantessbgrupos{
                  nombre:String
boleta:String
incomingyear:Int
semesterType:String

mtmsbgrupossbestudiantes:[datamtmsbgrupossbestudiantes]
id:Int
mtmsbgrupossbestudiantesId:Int
calificacion:Int
mtmsbestudiantessbgruposId:Int
                  key:String
                },type sbgrupos{
              
              id:Int
clavedelgrupo:String
grupoIdGlobalCatQuery:Int
grupoIdFinalCatQuery:Int
grupoIdProductQuery:Int
otmsbmateriassbgruposId:Int
mtmsbestudiantessbgrupos:[datamtmsbestudiantessbgrupos],
otmsbgrupossbprofesores:[sbprofesores]

            }

            type Query{
              sbgrupos:[sbgrupos]
              
              
            }
            type Mutation{
            
              createsbgrupos(
                id:Int,
clavedelgrupo:String,
grupoIdGlobalCatQuery:Int,
grupoIdFinalCatQuery:Int,
grupoIdProductQuery:Int
,otmsbmateriassbgruposId:Int,

                parentArg:String
                ):sbgrupos
              
              
              getDatasbgrupos:[sbgrupos]
removesbgrupos(id:Int,parentArg:String,
                  hardDelete:Boolean):Boolean!
editsbgrupos(id:Int,
clavedelgrupo:String,
grupoIdGlobalCatQuery:Int,
grupoIdFinalCatQuery:Int,
grupoIdProductQuery:Int
,otmsbmateriassbgruposId:Int,
):sbgrupos
              getsbgrupos(id:Int):sbgrupos
              
            }`
          