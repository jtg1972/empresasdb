
          import {gql} from 'apollo-server-express'

          export default gql`type sbgrupos{
              
              id:Int
clavedelgrupo:String
grupoIdGlobalCatQuery:Int
grupoIdFinalCatQuery:Int
grupoIdProductQuery:Int
otmsbmateriassbgruposId:Int

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
          