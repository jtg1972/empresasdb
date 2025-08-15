
          import {gql} from 'apollo-server-express'

          export default gql`type poestudiantesraw_pogruposraw{
              
              id:Int
mtmpoestudiantesrawpogruposrawId:Int
		 mtmpoestudiantesrawpogruposrawIdGlobalCatQuery:Int
		 mtmpoestudiantesrawpogruposrawIdFinalCatQuery:Int
		 mtmpoestudiantesrawpogruposrawIdProductQuery:Int
mtmpogruposrawpoestudiantesrawId:Int
		 mtmpogruposrawpoestudiantesrawIdGlobalCatQuery:Int
		 mtmpogruposrawpoestudiantesrawIdFinalCatQuery:Int
		 mtmpogruposrawpoestudiantesrawIdProductQuery:Int
calificacion:Int

            }

            type Query{
              poestudiantesraw_pogruposraw:[poestudiantesraw_pogruposraw]
              
              
            }
            type Mutation{
              getonedatamtmpoestudiantesrawpogruposraw(id:Int,
mtmpoestudiantesrawpogruposrawId:Int,
		 mtmpoestudiantesrawpogruposrawIdGlobalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdFinalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdProductQuery:Int,
mtmpogruposrawpoestudiantesrawId:Int,
		 mtmpogruposrawpoestudiantesrawIdGlobalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdFinalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdProductQuery:Int,
calificacion:Int,
):datamtmpoestudiantesrawpogruposraw
              getonedatamtmpogruposrawpoestudiantesraw(id:Int,
mtmpoestudiantesrawpogruposrawId:Int,
		 mtmpoestudiantesrawpogruposrawIdGlobalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdFinalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdProductQuery:Int,
mtmpogruposrawpoestudiantesrawId:Int,
		 mtmpogruposrawpoestudiantesrawIdGlobalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdFinalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdProductQuery:Int,
calificacion:Int,
):datamtmpogruposrawpoestudiantesraw
              getdatamtmpoestudiantesrawpogruposraw(id:Int,
mtmpoestudiantesrawpogruposrawId:Int,
		 mtmpoestudiantesrawpogruposrawIdGlobalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdFinalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdProductQuery:Int,
mtmpogruposrawpoestudiantesrawId:Int,
		 mtmpogruposrawpoestudiantesrawIdGlobalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdFinalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdProductQuery:Int,
calificacion:Int,
):[datamtmpoestudiantesrawpogruposraw]
              getdatamtmpogruposrawpoestudiantesraw(id:Int,
mtmpoestudiantesrawpogruposrawId:Int,
		 mtmpoestudiantesrawpogruposrawIdGlobalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdFinalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdProductQuery:Int,
mtmpogruposrawpoestudiantesrawId:Int,
		 mtmpogruposrawpoestudiantesrawIdGlobalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdFinalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdProductQuery:Int,
calificacion:Int,
):[datamtmpogruposrawpoestudiantesraw]
              createdatamtmpoestudiantesrawpogruposraw(id:Int,
mtmpoestudiantesrawpogruposrawId:Int,
		 mtmpoestudiantesrawpogruposrawIdGlobalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdFinalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdProductQuery:Int,
mtmpogruposrawpoestudiantesrawId:Int,
		 mtmpogruposrawpoestudiantesrawIdGlobalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdFinalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdProductQuery:Int,
calificacion:Int,
):datamtmpoestudiantesrawpogruposraw
              createdatamtmpogruposrawpoestudiantesraw(id:Int,
mtmpoestudiantesrawpogruposrawId:Int,
		 mtmpoestudiantesrawpogruposrawIdGlobalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdFinalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdProductQuery:Int,
mtmpogruposrawpoestudiantesrawId:Int,
		 mtmpogruposrawpoestudiantesrawIdGlobalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdFinalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdProductQuery:Int,
calificacion:Int,
):datamtmpogruposrawpoestudiantesraw
              editdatamtmpoestudiantesrawpogruposraw(id:Int,
mtmpoestudiantesrawpogruposrawId:Int,
		 mtmpoestudiantesrawpogruposrawIdGlobalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdFinalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdProductQuery:Int,
mtmpogruposrawpoestudiantesrawId:Int,
		 mtmpogruposrawpoestudiantesrawIdGlobalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdFinalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdProductQuery:Int,
calificacion:Int,
):datamtmpoestudiantesrawpogruposraw
              editdatamtmpogruposrawpoestudiantesraw(id:Int,
mtmpoestudiantesrawpogruposrawId:Int,
		 mtmpoestudiantesrawpogruposrawIdGlobalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdFinalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdProductQuery:Int,
mtmpogruposrawpoestudiantesrawId:Int,
		 mtmpogruposrawpoestudiantesrawIdGlobalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdFinalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdProductQuery:Int,
calificacion:Int,
):datamtmpogruposrawpoestudiantesraw

              
            
              createpoestudiantesraw_pogruposraw(
                id:Int,
mtmpoestudiantesrawpogruposrawId:Int,
		 mtmpoestudiantesrawpogruposrawIdGlobalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdFinalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdProductQuery:Int,
mtmpogruposrawpoestudiantesrawId:Int,
		 mtmpogruposrawpoestudiantesrawIdGlobalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdFinalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdProductQuery:Int,
calificacion:Int,

                ):poestudiantesraw_pogruposraw
              
              
              getDatapoestudiantesraw_pogruposraw:[poestudiantesraw_pogruposraw]
removepoestudiantesraw_pogruposraw(mtmpoestudiantesrawpogruposrawId:Int,mtmpogruposrawpoestudiantesrawId:Int):Boolean
editpoestudiantesraw_pogruposraw(id:Int,
mtmpoestudiantesrawpogruposrawId:Int,
		 mtmpoestudiantesrawpogruposrawIdGlobalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdFinalCatQuery:Int,
		 mtmpoestudiantesrawpogruposrawIdProductQuery:Int,
mtmpogruposrawpoestudiantesrawId:Int,
		 mtmpogruposrawpoestudiantesrawIdGlobalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdFinalCatQuery:Int,
		 mtmpogruposrawpoestudiantesrawIdProductQuery:Int,
calificacion:Int,
):poestudiantesraw_pogruposraw
              getpoestudiantesraw_pogruposraw(id:Int):poestudiantesraw_pogruposraw
              
            }`
          