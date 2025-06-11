
          import {gql} from 'apollo-server-express'

          export default gql`type originalmtmsbestudiantessbgrupos{
                  nombre:String
boleta:String
incomingyear:Int
semesterType:String


id:Int
mtmsbgrupossbestudiantes:[datamtmsbgrupossbestudiantes]
mtmsbgrupossbestudiantesId:Int
calificacion:Int
mtmsbestudiantessbgruposId:Int
                  key:String
                    
      
                }
                type copymtmsbestudiantessbgrupos{
                  clavedelgrupo:String

otmsbmateriassbgruposId:Int

id:Int
mtmsbgrupossbestudiantesId:Int
calificacion:Int
mtmsbestudiantessbgruposId:Int
                  key:String
                }
                type datamtmsbestudiantessbgrupos{
                  original:originalmtmsbestudiantessbgrupos
                  copy:copymtmsbestudiantessbgrupos
                  
                }
                type sbgrupos{
              
              id:Int
clavedelgrupo:String
grupoIdGlobalCatQuery:Int
grupoIdFinalCatQuery:Int
grupoIdProductQuery:Int
otmsbmateriassbgruposId:Int
mtmsbestudiantessbgrupos:[datamtmsbestudiantessbgrupos],

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

                ):sbgrupos
              
              
              getDatasbgrupos:[sbgrupos]
removesbgrupos(id:Int):Boolean!
editsbgrupos(id:Int,
clavedelgrupo:String,
grupoIdGlobalCatQuery:Int,
grupoIdFinalCatQuery:Int,
grupoIdProductQuery:Int
,otmsbmateriassbgruposId:Int,
):sbgrupos
              getsbgrupos(id:Int):sbgrupos
              
            }`
          