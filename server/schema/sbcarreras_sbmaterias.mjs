
          import {gql} from 'apollo-server-express'

          export default gql`type sbcarreras_sbmaterias{
              
              id:Int
mtmsbcarrerassbmateriasId:Int
		 mtmsbcarrerassbmateriasIdGlobalCatQuery:Int
		 mtmsbcarrerassbmateriasIdFinalCatQuery:Int
		 mtmsbcarrerassbmateriasIdProductQuery:Int
mtmsbmateriassbcarrerasId:Int
		 mtmsbmateriassbcarrerasIdGlobalCatQuery:Int
		 mtmsbmateriassbcarrerasIdFinalCatQuery:Int
		 mtmsbmateriassbcarrerasIdProductQuery:Int
semestre:Int

              whereClauses:String
              sortClauses:String
            }

            type Query{
              sbcarreras_sbmaterias:[sbcarreras_sbmaterias]
              
              
            }
            type Mutation{
              getonedatamtmsbcarrerassbmaterias(id:Int,
mtmsbcarrerassbmateriasId:Int,
		 mtmsbcarrerassbmateriasIdGlobalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdFinalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdProductQuery:Int,
mtmsbmateriassbcarrerasId:Int,
		 mtmsbmateriassbcarrerasIdGlobalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdFinalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdProductQuery:Int,
semestre:Int,
):datamtmsbcarrerassbmaterias
              getonedatamtmsbmateriassbcarreras(id:Int,
mtmsbcarrerassbmateriasId:Int,
		 mtmsbcarrerassbmateriasIdGlobalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdFinalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdProductQuery:Int,
mtmsbmateriassbcarrerasId:Int,
		 mtmsbmateriassbcarrerasIdGlobalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdFinalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdProductQuery:Int,
semestre:Int,
):datamtmsbmateriassbcarreras
              getdatamtmsbcarrerassbmaterias(id:Int,
mtmsbcarrerassbmateriasId:Int,
		 mtmsbcarrerassbmateriasIdGlobalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdFinalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdProductQuery:Int,
mtmsbmateriassbcarrerasId:Int,
		 mtmsbmateriassbcarrerasIdGlobalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdFinalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdProductQuery:Int,
semestre:Int,
):[datamtmsbcarrerassbmaterias]
              getdatamtmsbmateriassbcarreras(id:Int,
mtmsbcarrerassbmateriasId:Int,
		 mtmsbcarrerassbmateriasIdGlobalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdFinalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdProductQuery:Int,
mtmsbmateriassbcarrerasId:Int,
		 mtmsbmateriassbcarrerasIdGlobalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdFinalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdProductQuery:Int,
semestre:Int,
):[datamtmsbmateriassbcarreras]
              createdatamtmsbcarrerassbmaterias(id:Int,
mtmsbcarrerassbmateriasId:Int,
		 mtmsbcarrerassbmateriasIdGlobalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdFinalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdProductQuery:Int,
mtmsbmateriassbcarrerasId:Int,
		 mtmsbmateriassbcarrerasIdGlobalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdFinalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdProductQuery:Int,
semestre:Int,
):datamtmsbcarrerassbmaterias
              createdatamtmsbmateriassbcarreras(id:Int,
mtmsbcarrerassbmateriasId:Int,
		 mtmsbcarrerassbmateriasIdGlobalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdFinalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdProductQuery:Int,
mtmsbmateriassbcarrerasId:Int,
		 mtmsbmateriassbcarrerasIdGlobalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdFinalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdProductQuery:Int,
semestre:Int,
):datamtmsbmateriassbcarreras
              editdatamtmsbcarrerassbmaterias(id:Int,
mtmsbcarrerassbmateriasId:Int,
		 mtmsbcarrerassbmateriasIdGlobalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdFinalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdProductQuery:Int,
mtmsbmateriassbcarrerasId:Int,
		 mtmsbmateriassbcarrerasIdGlobalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdFinalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdProductQuery:Int,
semestre:Int,
):datamtmsbcarrerassbmaterias
              editdatamtmsbmateriassbcarreras(id:Int,
mtmsbcarrerassbmateriasId:Int,
		 mtmsbcarrerassbmateriasIdGlobalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdFinalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdProductQuery:Int,
mtmsbmateriassbcarrerasId:Int,
		 mtmsbmateriassbcarrerasIdGlobalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdFinalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdProductQuery:Int,
semestre:Int,
):datamtmsbmateriassbcarreras

              
            
              createsbcarreras_sbmaterias(
                id:Int,
mtmsbcarrerassbmateriasId:Int,
		 mtmsbcarrerassbmateriasIdGlobalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdFinalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdProductQuery:Int,
mtmsbmateriassbcarrerasId:Int,
		 mtmsbmateriassbcarrerasIdGlobalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdFinalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdProductQuery:Int,
semestre:Int,

                parentArg:String
                ):sbcarreras_sbmaterias
              
              
              getDatasbcarreras_sbmaterias(whereClauses:String,sortClauses:String):[sbcarreras_sbmaterias]
removesbcarreras_sbmaterias(mtmsbcarrerassbmateriasId:Int,mtmsbmateriassbcarrerasId:Int):Boolean
editsbcarreras_sbmaterias(id:Int,
mtmsbcarrerassbmateriasId:Int,
		 mtmsbcarrerassbmateriasIdGlobalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdFinalCatQuery:Int,
		 mtmsbcarrerassbmateriasIdProductQuery:Int,
mtmsbmateriassbcarrerasId:Int,
		 mtmsbmateriassbcarrerasIdGlobalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdFinalCatQuery:Int,
		 mtmsbmateriassbcarrerasIdProductQuery:Int,
semestre:Int,
):sbcarreras_sbmaterias
              getsbcarreras_sbmaterias(id:Int):sbcarreras_sbmaterias
              
            }`
          