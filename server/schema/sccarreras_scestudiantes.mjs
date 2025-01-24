
          import {gql} from 'apollo-server-express'

          export default gql`type sccarreras_scestudiantes{
              
              id:Int
mtmscestudiantessccarrerasId:Int
		 mtmscestudiantessccarrerasIdGlobalCatQuery:Int
		 mtmscestudiantessccarrerasIdFinalCatQuery:Int
		 mtmscestudiantessccarrerasIdProductQuery:Int
mtmsccarrerasscestudiantesId:Int
		 mtmsccarrerasscestudiantesIdGlobalCatQuery:Int
		 mtmsccarrerasscestudiantesIdFinalCatQuery:Int
		 mtmsccarrerasscestudiantesIdProductQuery:Int

            }

            type Query{
              sccarreras_scestudiantes:[sccarreras_scestudiantes]
              
              
            }
            type Mutation{
              getonedatamtmsccarrerasscestudiantes(id:Int,
mtmscestudiantessccarrerasId:Int,
		 mtmscestudiantessccarrerasIdGlobalCatQuery:Int,
		 mtmscestudiantessccarrerasIdFinalCatQuery:Int,
		 mtmscestudiantessccarrerasIdProductQuery:Int,
mtmsccarrerasscestudiantesId:Int,
		 mtmsccarrerasscestudiantesIdGlobalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdFinalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdProductQuery:Int,
):datamtmsccarrerasscestudiantes
              getonedatamtmscestudiantessccarreras(id:Int,
mtmscestudiantessccarrerasId:Int,
		 mtmscestudiantessccarrerasIdGlobalCatQuery:Int,
		 mtmscestudiantessccarrerasIdFinalCatQuery:Int,
		 mtmscestudiantessccarrerasIdProductQuery:Int,
mtmsccarrerasscestudiantesId:Int,
		 mtmsccarrerasscestudiantesIdGlobalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdFinalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdProductQuery:Int,
):datamtmscestudiantessccarreras
              getdatamtmsccarrerasscestudiantes(id:Int,
mtmscestudiantessccarrerasId:Int,
		 mtmscestudiantessccarrerasIdGlobalCatQuery:Int,
		 mtmscestudiantessccarrerasIdFinalCatQuery:Int,
		 mtmscestudiantessccarrerasIdProductQuery:Int,
mtmsccarrerasscestudiantesId:Int,
		 mtmsccarrerasscestudiantesIdGlobalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdFinalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdProductQuery:Int,
):[datamtmsccarrerasscestudiantes]
              getdatamtmscestudiantessccarreras(id:Int,
mtmscestudiantessccarrerasId:Int,
		 mtmscestudiantessccarrerasIdGlobalCatQuery:Int,
		 mtmscestudiantessccarrerasIdFinalCatQuery:Int,
		 mtmscestudiantessccarrerasIdProductQuery:Int,
mtmsccarrerasscestudiantesId:Int,
		 mtmsccarrerasscestudiantesIdGlobalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdFinalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdProductQuery:Int,
):[datamtmscestudiantessccarreras]
              createdatamtmsccarrerasscestudiantes(id:Int,
mtmscestudiantessccarrerasId:Int,
		 mtmscestudiantessccarrerasIdGlobalCatQuery:Int,
		 mtmscestudiantessccarrerasIdFinalCatQuery:Int,
		 mtmscestudiantessccarrerasIdProductQuery:Int,
mtmsccarrerasscestudiantesId:Int,
		 mtmsccarrerasscestudiantesIdGlobalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdFinalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdProductQuery:Int,
):datamtmsccarrerasscestudiantes
              createdatamtmscestudiantessccarreras(id:Int,
mtmscestudiantessccarrerasId:Int,
		 mtmscestudiantessccarrerasIdGlobalCatQuery:Int,
		 mtmscestudiantessccarrerasIdFinalCatQuery:Int,
		 mtmscestudiantessccarrerasIdProductQuery:Int,
mtmsccarrerasscestudiantesId:Int,
		 mtmsccarrerasscestudiantesIdGlobalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdFinalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdProductQuery:Int,
):datamtmscestudiantessccarreras
              editdatamtmsccarrerasscestudiantes(id:Int,
mtmscestudiantessccarrerasId:Int,
		 mtmscestudiantessccarrerasIdGlobalCatQuery:Int,
		 mtmscestudiantessccarrerasIdFinalCatQuery:Int,
		 mtmscestudiantessccarrerasIdProductQuery:Int,
mtmsccarrerasscestudiantesId:Int,
		 mtmsccarrerasscestudiantesIdGlobalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdFinalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdProductQuery:Int,
):datamtmsccarrerasscestudiantes
              editdatamtmscestudiantessccarreras(id:Int,
mtmscestudiantessccarrerasId:Int,
		 mtmscestudiantessccarrerasIdGlobalCatQuery:Int,
		 mtmscestudiantessccarrerasIdFinalCatQuery:Int,
		 mtmscestudiantessccarrerasIdProductQuery:Int,
mtmsccarrerasscestudiantesId:Int,
		 mtmsccarrerasscestudiantesIdGlobalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdFinalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdProductQuery:Int,
):datamtmscestudiantessccarreras

              
            
              createsccarreras_scestudiantes(
                id:Int,
mtmscestudiantessccarrerasId:Int,
		 mtmscestudiantessccarrerasIdGlobalCatQuery:Int,
		 mtmscestudiantessccarrerasIdFinalCatQuery:Int,
		 mtmscestudiantessccarrerasIdProductQuery:Int,
mtmsccarrerasscestudiantesId:Int,
		 mtmsccarrerasscestudiantesIdGlobalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdFinalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdProductQuery:Int,

                ):sccarreras_scestudiantes
              
              
              getDatasccarreras_scestudiantes:[sccarreras_scestudiantes]
removesccarreras_scestudiantes(mtmsccarrerasscestudiantesId:Int,mtmscestudiantessccarrerasId:Int):Boolean
editsccarreras_scestudiantes(id:Int,
mtmscestudiantessccarrerasId:Int,
		 mtmscestudiantessccarrerasIdGlobalCatQuery:Int,
		 mtmscestudiantessccarrerasIdFinalCatQuery:Int,
		 mtmscestudiantessccarrerasIdProductQuery:Int,
mtmsccarrerasscestudiantesId:Int,
		 mtmsccarrerasscestudiantesIdGlobalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdFinalCatQuery:Int,
		 mtmsccarrerasscestudiantesIdProductQuery:Int,
):sccarreras_scestudiantes
              getsccarreras_scestudiantes(id:Int):sccarreras_scestudiantes
              
            }`
          