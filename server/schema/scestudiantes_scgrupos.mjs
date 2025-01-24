
          import {gql} from 'apollo-server-express'

          export default gql`type scestudiantes_scgrupos{
              
              id:Int
mtmscgruposscestudiantesId:Int
		 mtmscgruposscestudiantesIdGlobalCatQuery:Int
		 mtmscgruposscestudiantesIdFinalCatQuery:Int
		 mtmscgruposscestudiantesIdProductQuery:Int
mtmscestudiantesscgruposId:Int
		 mtmscestudiantesscgruposIdGlobalCatQuery:Int
		 mtmscestudiantesscgruposIdFinalCatQuery:Int
		 mtmscestudiantesscgruposIdProductQuery:Int
calificacion:Int

            }

            type Query{
              scestudiantes_scgrupos:[scestudiantes_scgrupos]
              
              
            }
            type Mutation{
              getonedatamtmscestudiantesscgrupos(id:Int,
mtmscgruposscestudiantesId:Int,
		 mtmscgruposscestudiantesIdGlobalCatQuery:Int,
		 mtmscgruposscestudiantesIdFinalCatQuery:Int,
		 mtmscgruposscestudiantesIdProductQuery:Int,
mtmscestudiantesscgruposId:Int,
		 mtmscestudiantesscgruposIdGlobalCatQuery:Int,
		 mtmscestudiantesscgruposIdFinalCatQuery:Int,
		 mtmscestudiantesscgruposIdProductQuery:Int,
calificacion:Int,
):datamtmscestudiantesscgrupos
              getonedatamtmscgruposscestudiantes(id:Int,
mtmscgruposscestudiantesId:Int,
		 mtmscgruposscestudiantesIdGlobalCatQuery:Int,
		 mtmscgruposscestudiantesIdFinalCatQuery:Int,
		 mtmscgruposscestudiantesIdProductQuery:Int,
mtmscestudiantesscgruposId:Int,
		 mtmscestudiantesscgruposIdGlobalCatQuery:Int,
		 mtmscestudiantesscgruposIdFinalCatQuery:Int,
		 mtmscestudiantesscgruposIdProductQuery:Int,
calificacion:Int,
):datamtmscgruposscestudiantes
              getdatamtmscestudiantesscgrupos(id:Int,
mtmscgruposscestudiantesId:Int,
		 mtmscgruposscestudiantesIdGlobalCatQuery:Int,
		 mtmscgruposscestudiantesIdFinalCatQuery:Int,
		 mtmscgruposscestudiantesIdProductQuery:Int,
mtmscestudiantesscgruposId:Int,
		 mtmscestudiantesscgruposIdGlobalCatQuery:Int,
		 mtmscestudiantesscgruposIdFinalCatQuery:Int,
		 mtmscestudiantesscgruposIdProductQuery:Int,
calificacion:Int,
):[datamtmscestudiantesscgrupos]
              getdatamtmscgruposscestudiantes(id:Int,
mtmscgruposscestudiantesId:Int,
		 mtmscgruposscestudiantesIdGlobalCatQuery:Int,
		 mtmscgruposscestudiantesIdFinalCatQuery:Int,
		 mtmscgruposscestudiantesIdProductQuery:Int,
mtmscestudiantesscgruposId:Int,
		 mtmscestudiantesscgruposIdGlobalCatQuery:Int,
		 mtmscestudiantesscgruposIdFinalCatQuery:Int,
		 mtmscestudiantesscgruposIdProductQuery:Int,
calificacion:Int,
):[datamtmscgruposscestudiantes]
              createdatamtmscestudiantesscgrupos(id:Int,
mtmscgruposscestudiantesId:Int,
		 mtmscgruposscestudiantesIdGlobalCatQuery:Int,
		 mtmscgruposscestudiantesIdFinalCatQuery:Int,
		 mtmscgruposscestudiantesIdProductQuery:Int,
mtmscestudiantesscgruposId:Int,
		 mtmscestudiantesscgruposIdGlobalCatQuery:Int,
		 mtmscestudiantesscgruposIdFinalCatQuery:Int,
		 mtmscestudiantesscgruposIdProductQuery:Int,
calificacion:Int,
):datamtmscestudiantesscgrupos
              createdatamtmscgruposscestudiantes(id:Int,
mtmscgruposscestudiantesId:Int,
		 mtmscgruposscestudiantesIdGlobalCatQuery:Int,
		 mtmscgruposscestudiantesIdFinalCatQuery:Int,
		 mtmscgruposscestudiantesIdProductQuery:Int,
mtmscestudiantesscgruposId:Int,
		 mtmscestudiantesscgruposIdGlobalCatQuery:Int,
		 mtmscestudiantesscgruposIdFinalCatQuery:Int,
		 mtmscestudiantesscgruposIdProductQuery:Int,
calificacion:Int,
):datamtmscgruposscestudiantes
              editdatamtmscestudiantesscgrupos(id:Int,
mtmscgruposscestudiantesId:Int,
		 mtmscgruposscestudiantesIdGlobalCatQuery:Int,
		 mtmscgruposscestudiantesIdFinalCatQuery:Int,
		 mtmscgruposscestudiantesIdProductQuery:Int,
mtmscestudiantesscgruposId:Int,
		 mtmscestudiantesscgruposIdGlobalCatQuery:Int,
		 mtmscestudiantesscgruposIdFinalCatQuery:Int,
		 mtmscestudiantesscgruposIdProductQuery:Int,
calificacion:Int,
):datamtmscestudiantesscgrupos
              editdatamtmscgruposscestudiantes(id:Int,
mtmscgruposscestudiantesId:Int,
		 mtmscgruposscestudiantesIdGlobalCatQuery:Int,
		 mtmscgruposscestudiantesIdFinalCatQuery:Int,
		 mtmscgruposscestudiantesIdProductQuery:Int,
mtmscestudiantesscgruposId:Int,
		 mtmscestudiantesscgruposIdGlobalCatQuery:Int,
		 mtmscestudiantesscgruposIdFinalCatQuery:Int,
		 mtmscestudiantesscgruposIdProductQuery:Int,
calificacion:Int,
):datamtmscgruposscestudiantes

              
            
              createscestudiantes_scgrupos(
                id:Int,
mtmscgruposscestudiantesId:Int,
		 mtmscgruposscestudiantesIdGlobalCatQuery:Int,
		 mtmscgruposscestudiantesIdFinalCatQuery:Int,
		 mtmscgruposscestudiantesIdProductQuery:Int,
mtmscestudiantesscgruposId:Int,
		 mtmscestudiantesscgruposIdGlobalCatQuery:Int,
		 mtmscestudiantesscgruposIdFinalCatQuery:Int,
		 mtmscestudiantesscgruposIdProductQuery:Int,
calificacion:Int,

                ):scestudiantes_scgrupos
              
              
              getDatascestudiantes_scgrupos:[scestudiantes_scgrupos]
removescestudiantes_scgrupos(mtmscestudiantesscgruposId:Int,mtmscgruposscestudiantesId:Int):Boolean
editscestudiantes_scgrupos(id:Int,
mtmscgruposscestudiantesId:Int,
		 mtmscgruposscestudiantesIdGlobalCatQuery:Int,
		 mtmscgruposscestudiantesIdFinalCatQuery:Int,
		 mtmscgruposscestudiantesIdProductQuery:Int,
mtmscestudiantesscgruposId:Int,
		 mtmscestudiantesscgruposIdGlobalCatQuery:Int,
		 mtmscestudiantesscgruposIdFinalCatQuery:Int,
		 mtmscestudiantesscgruposIdProductQuery:Int,
calificacion:Int,
):scestudiantes_scgrupos
              getscestudiantes_scgrupos(id:Int):scestudiantes_scgrupos
              
            }`
          