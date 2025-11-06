
          import {gql} from 'apollo-server-express'

          export default gql`type sbmaterias_sbprofesores{
              
              id:Int
mtmsbmateriassbprofesoresId:Int
		 mtmsbmateriassbprofesoresIdGlobalCatQuery:Int
		 mtmsbmateriassbprofesoresIdFinalCatQuery:Int
		 mtmsbmateriassbprofesoresIdProductQuery:Int
mtmsbprofesoressbmateriasId:Int
		 mtmsbprofesoressbmateriasIdGlobalCatQuery:Int
		 mtmsbprofesoressbmateriasIdFinalCatQuery:Int
		 mtmsbprofesoressbmateriasIdProductQuery:Int

              whereClauses:String
              sortClauses:String
            }

            type Query{
              sbmaterias_sbprofesores:[sbmaterias_sbprofesores]
              
              
            }
            type Mutation{
              getonedatamtmsbmateriassbprofesores(id:Int,
mtmsbmateriassbprofesoresId:Int,
		 mtmsbmateriassbprofesoresIdGlobalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdFinalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdProductQuery:Int,
mtmsbprofesoressbmateriasId:Int,
		 mtmsbprofesoressbmateriasIdGlobalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdFinalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdProductQuery:Int,
):datamtmsbmateriassbprofesores
              getonedatamtmsbprofesoressbmaterias(id:Int,
mtmsbmateriassbprofesoresId:Int,
		 mtmsbmateriassbprofesoresIdGlobalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdFinalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdProductQuery:Int,
mtmsbprofesoressbmateriasId:Int,
		 mtmsbprofesoressbmateriasIdGlobalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdFinalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdProductQuery:Int,
):datamtmsbprofesoressbmaterias
              getdatamtmsbmateriassbprofesores(id:Int,
mtmsbmateriassbprofesoresId:Int,
		 mtmsbmateriassbprofesoresIdGlobalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdFinalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdProductQuery:Int,
mtmsbprofesoressbmateriasId:Int,
		 mtmsbprofesoressbmateriasIdGlobalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdFinalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdProductQuery:Int,
):[datamtmsbmateriassbprofesores]
              getdatamtmsbprofesoressbmaterias(id:Int,
mtmsbmateriassbprofesoresId:Int,
		 mtmsbmateriassbprofesoresIdGlobalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdFinalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdProductQuery:Int,
mtmsbprofesoressbmateriasId:Int,
		 mtmsbprofesoressbmateriasIdGlobalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdFinalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdProductQuery:Int,
):[datamtmsbprofesoressbmaterias]
              createdatamtmsbmateriassbprofesores(id:Int,
mtmsbmateriassbprofesoresId:Int,
		 mtmsbmateriassbprofesoresIdGlobalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdFinalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdProductQuery:Int,
mtmsbprofesoressbmateriasId:Int,
		 mtmsbprofesoressbmateriasIdGlobalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdFinalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdProductQuery:Int,
):datamtmsbmateriassbprofesores
              createdatamtmsbprofesoressbmaterias(id:Int,
mtmsbmateriassbprofesoresId:Int,
		 mtmsbmateriassbprofesoresIdGlobalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdFinalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdProductQuery:Int,
mtmsbprofesoressbmateriasId:Int,
		 mtmsbprofesoressbmateriasIdGlobalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdFinalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdProductQuery:Int,
):datamtmsbprofesoressbmaterias
              editdatamtmsbmateriassbprofesores(id:Int,
mtmsbmateriassbprofesoresId:Int,
		 mtmsbmateriassbprofesoresIdGlobalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdFinalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdProductQuery:Int,
mtmsbprofesoressbmateriasId:Int,
		 mtmsbprofesoressbmateriasIdGlobalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdFinalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdProductQuery:Int,
):datamtmsbmateriassbprofesores
              editdatamtmsbprofesoressbmaterias(id:Int,
mtmsbmateriassbprofesoresId:Int,
		 mtmsbmateriassbprofesoresIdGlobalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdFinalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdProductQuery:Int,
mtmsbprofesoressbmateriasId:Int,
		 mtmsbprofesoressbmateriasIdGlobalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdFinalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdProductQuery:Int,
):datamtmsbprofesoressbmaterias

              
            
              createsbmaterias_sbprofesores(
                id:Int,
mtmsbmateriassbprofesoresId:Int,
		 mtmsbmateriassbprofesoresIdGlobalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdFinalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdProductQuery:Int,
mtmsbprofesoressbmateriasId:Int,
		 mtmsbprofesoressbmateriasIdGlobalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdFinalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdProductQuery:Int,

                parentArg:String
                ):sbmaterias_sbprofesores
              
              
              getDatasbmaterias_sbprofesores(whereClauses:String,sortClauses:String):[sbmaterias_sbprofesores]
removesbmaterias_sbprofesores(mtmsbmateriassbprofesoresId:Int,mtmsbprofesoressbmateriasId:Int):Boolean
editsbmaterias_sbprofesores(id:Int,
mtmsbmateriassbprofesoresId:Int,
		 mtmsbmateriassbprofesoresIdGlobalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdFinalCatQuery:Int,
		 mtmsbmateriassbprofesoresIdProductQuery:Int,
mtmsbprofesoressbmateriasId:Int,
		 mtmsbprofesoressbmateriasIdGlobalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdFinalCatQuery:Int,
		 mtmsbprofesoressbmateriasIdProductQuery:Int,
):sbmaterias_sbprofesores
              getsbmaterias_sbprofesores(id:Int):sbmaterias_sbprofesores
              
            }`
          