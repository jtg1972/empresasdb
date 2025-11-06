
          import {gql} from 'apollo-server-express'

          export default gql`type sbestudiantes_sbgrupos{
              
              id:Int
mtmsbgrupossbestudiantesId:Int
		 mtmsbgrupossbestudiantesIdGlobalCatQuery:Int
		 mtmsbgrupossbestudiantesIdFinalCatQuery:Int
		 mtmsbgrupossbestudiantesIdProductQuery:Int
calificacion:Int
mtmsbestudiantessbgruposId:Int
		 mtmsbestudiantessbgruposIdGlobalCatQuery:Int
		 mtmsbestudiantessbgruposIdFinalCatQuery:Int
		 mtmsbestudiantessbgruposIdProductQuery:Int

              whereClauses:String
              sortClauses:String
            }

            type Query{
              sbestudiantes_sbgrupos:[sbestudiantes_sbgrupos]
              
              
            }
            type Mutation{
              getonedatamtmsbestudiantessbgrupos(id:Int,
mtmsbgrupossbestudiantesId:Int,
		 mtmsbgrupossbestudiantesIdGlobalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdFinalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdProductQuery:Int,
calificacion:Int,
mtmsbestudiantessbgruposId:Int,
		 mtmsbestudiantessbgruposIdGlobalCatQuery:Int,
		 mtmsbestudiantessbgruposIdFinalCatQuery:Int,
		 mtmsbestudiantessbgruposIdProductQuery:Int,
):datamtmsbestudiantessbgrupos
              getonedatamtmsbgrupossbestudiantes(id:Int,
mtmsbgrupossbestudiantesId:Int,
		 mtmsbgrupossbestudiantesIdGlobalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdFinalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdProductQuery:Int,
calificacion:Int,
mtmsbestudiantessbgruposId:Int,
		 mtmsbestudiantessbgruposIdGlobalCatQuery:Int,
		 mtmsbestudiantessbgruposIdFinalCatQuery:Int,
		 mtmsbestudiantessbgruposIdProductQuery:Int,
):datamtmsbgrupossbestudiantes
              getdatamtmsbestudiantessbgrupos(id:Int,
mtmsbgrupossbestudiantesId:Int,
		 mtmsbgrupossbestudiantesIdGlobalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdFinalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdProductQuery:Int,
calificacion:Int,
mtmsbestudiantessbgruposId:Int,
		 mtmsbestudiantessbgruposIdGlobalCatQuery:Int,
		 mtmsbestudiantessbgruposIdFinalCatQuery:Int,
		 mtmsbestudiantessbgruposIdProductQuery:Int,
):[datamtmsbestudiantessbgrupos]
              getdatamtmsbgrupossbestudiantes(id:Int,
mtmsbgrupossbestudiantesId:Int,
		 mtmsbgrupossbestudiantesIdGlobalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdFinalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdProductQuery:Int,
calificacion:Int,
mtmsbestudiantessbgruposId:Int,
		 mtmsbestudiantessbgruposIdGlobalCatQuery:Int,
		 mtmsbestudiantessbgruposIdFinalCatQuery:Int,
		 mtmsbestudiantessbgruposIdProductQuery:Int,
):[datamtmsbgrupossbestudiantes]
              createdatamtmsbestudiantessbgrupos(id:Int,
mtmsbgrupossbestudiantesId:Int,
		 mtmsbgrupossbestudiantesIdGlobalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdFinalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdProductQuery:Int,
calificacion:Int,
mtmsbestudiantessbgruposId:Int,
		 mtmsbestudiantessbgruposIdGlobalCatQuery:Int,
		 mtmsbestudiantessbgruposIdFinalCatQuery:Int,
		 mtmsbestudiantessbgruposIdProductQuery:Int,
):datamtmsbestudiantessbgrupos
              createdatamtmsbgrupossbestudiantes(id:Int,
mtmsbgrupossbestudiantesId:Int,
		 mtmsbgrupossbestudiantesIdGlobalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdFinalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdProductQuery:Int,
calificacion:Int,
mtmsbestudiantessbgruposId:Int,
		 mtmsbestudiantessbgruposIdGlobalCatQuery:Int,
		 mtmsbestudiantessbgruposIdFinalCatQuery:Int,
		 mtmsbestudiantessbgruposIdProductQuery:Int,
):datamtmsbgrupossbestudiantes
              editdatamtmsbestudiantessbgrupos(id:Int,
mtmsbgrupossbestudiantesId:Int,
		 mtmsbgrupossbestudiantesIdGlobalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdFinalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdProductQuery:Int,
calificacion:Int,
mtmsbestudiantessbgruposId:Int,
		 mtmsbestudiantessbgruposIdGlobalCatQuery:Int,
		 mtmsbestudiantessbgruposIdFinalCatQuery:Int,
		 mtmsbestudiantessbgruposIdProductQuery:Int,
):datamtmsbestudiantessbgrupos
              editdatamtmsbgrupossbestudiantes(id:Int,
mtmsbgrupossbestudiantesId:Int,
		 mtmsbgrupossbestudiantesIdGlobalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdFinalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdProductQuery:Int,
calificacion:Int,
mtmsbestudiantessbgruposId:Int,
		 mtmsbestudiantessbgruposIdGlobalCatQuery:Int,
		 mtmsbestudiantessbgruposIdFinalCatQuery:Int,
		 mtmsbestudiantessbgruposIdProductQuery:Int,
):datamtmsbgrupossbestudiantes

              
            
              createsbestudiantes_sbgrupos(
                id:Int,
mtmsbgrupossbestudiantesId:Int,
		 mtmsbgrupossbestudiantesIdGlobalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdFinalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdProductQuery:Int,
calificacion:Int,
mtmsbestudiantessbgruposId:Int,
		 mtmsbestudiantessbgruposIdGlobalCatQuery:Int,
		 mtmsbestudiantessbgruposIdFinalCatQuery:Int,
		 mtmsbestudiantessbgruposIdProductQuery:Int,

                parentArg:String
                ):sbestudiantes_sbgrupos
              
              
              getDatasbestudiantes_sbgrupos(whereClauses:String,sortClauses:String):[sbestudiantes_sbgrupos]
removesbestudiantes_sbgrupos(mtmsbestudiantessbgruposId:Int,mtmsbgrupossbestudiantesId:Int):Boolean
editsbestudiantes_sbgrupos(id:Int,
mtmsbgrupossbestudiantesId:Int,
		 mtmsbgrupossbestudiantesIdGlobalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdFinalCatQuery:Int,
		 mtmsbgrupossbestudiantesIdProductQuery:Int,
calificacion:Int,
mtmsbestudiantessbgruposId:Int,
		 mtmsbestudiantessbgruposIdGlobalCatQuery:Int,
		 mtmsbestudiantessbgruposIdFinalCatQuery:Int,
		 mtmsbestudiantessbgruposIdProductQuery:Int,
):sbestudiantes_sbgrupos
              getsbestudiantes_sbgrupos(id:Int):sbestudiantes_sbgrupos
              
            }`
          