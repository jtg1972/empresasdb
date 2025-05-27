
          import {gql} from 'apollo-server-express'

          export default gql`type sccarreras_scmaterias{
              
              id:Int
mtmscmateriassccarrerasId:Int
		 mtmscmateriassccarrerasIdGlobalCatQuery:Int
		 mtmscmateriassccarrerasIdFinalCatQuery:Int
		 mtmscmateriassccarrerasIdProductQuery:Int
mtmsccarrerasscmateriasId:Int
		 mtmsccarrerasscmateriasIdGlobalCatQuery:Int
		 mtmsccarrerasscmateriasIdFinalCatQuery:Int
		 mtmsccarrerasscmateriasIdProductQuery:Int
semestre:String

            }

            type Query{
              sccarreras_scmaterias:[sccarreras_scmaterias]
              
              
            }
            type Mutation{
              
              getdatamtmsccarrerasscmaterias(id:Int,
mtmscmateriassccarrerasId:Int,
		 mtmscmateriassccarrerasIdGlobalCatQuery:Int,
		 mtmscmateriassccarrerasIdFinalCatQuery:Int,
		 mtmscmateriassccarrerasIdProductQuery:Int,
mtmsccarrerasscmateriasId:Int,
		 mtmsccarrerasscmateriasIdGlobalCatQuery:Int,
		 mtmsccarrerasscmateriasIdFinalCatQuery:Int,
		 mtmsccarrerasscmateriasIdProductQuery:Int,
semestre:String,
):[datamtmsccarrerasscmaterias]
              getdatamtmscmateriassccarreras(id:Int,
mtmscmateriassccarrerasId:Int,
		 mtmscmateriassccarrerasIdGlobalCatQuery:Int,
		 mtmscmateriassccarrerasIdFinalCatQuery:Int,
		 mtmscmateriassccarrerasIdProductQuery:Int,
mtmsccarrerasscmateriasId:Int,
		 mtmsccarrerasscmateriasIdGlobalCatQuery:Int,
		 mtmsccarrerasscmateriasIdFinalCatQuery:Int,
		 mtmsccarrerasscmateriasIdProductQuery:Int,
semestre:String,
):[datamtmscmateriassccarreras]
              createdatamtmsccarrerasscmaterias(id:Int,
mtmscmateriassccarrerasId:Int,
		 mtmscmateriassccarrerasIdGlobalCatQuery:Int,
		 mtmscmateriassccarrerasIdFinalCatQuery:Int,
		 mtmscmateriassccarrerasIdProductQuery:Int,
mtmsccarrerasscmateriasId:Int,
		 mtmsccarrerasscmateriasIdGlobalCatQuery:Int,
		 mtmsccarrerasscmateriasIdFinalCatQuery:Int,
		 mtmsccarrerasscmateriasIdProductQuery:Int,
semestre:String,
):datamtmsccarrerasscmaterias
              createdatamtmscmateriassccarreras(id:Int,
mtmscmateriassccarrerasId:Int,
		 mtmscmateriassccarrerasIdGlobalCatQuery:Int,
		 mtmscmateriassccarrerasIdFinalCatQuery:Int,
		 mtmscmateriassccarrerasIdProductQuery:Int,
mtmsccarrerasscmateriasId:Int,
		 mtmsccarrerasscmateriasIdGlobalCatQuery:Int,
		 mtmsccarrerasscmateriasIdFinalCatQuery:Int,
		 mtmsccarrerasscmateriasIdProductQuery:Int,
semestre:String,
):datamtmscmateriassccarreras
              editdatamtmsccarrerasscmaterias(id:Int,
mtmscmateriassccarrerasId:Int,
		 mtmscmateriassccarrerasIdGlobalCatQuery:Int,
		 mtmscmateriassccarrerasIdFinalCatQuery:Int,
		 mtmscmateriassccarrerasIdProductQuery:Int,
mtmsccarrerasscmateriasId:Int,
		 mtmsccarrerasscmateriasIdGlobalCatQuery:Int,
		 mtmsccarrerasscmateriasIdFinalCatQuery:Int,
		 mtmsccarrerasscmateriasIdProductQuery:Int,
semestre:String,
):datamtmsccarrerasscmaterias
              editdatamtmscmateriassccarreras(id:Int,
mtmscmateriassccarrerasId:Int,
		 mtmscmateriassccarrerasIdGlobalCatQuery:Int,
		 mtmscmateriassccarrerasIdFinalCatQuery:Int,
		 mtmscmateriassccarrerasIdProductQuery:Int,
mtmsccarrerasscmateriasId:Int,
		 mtmsccarrerasscmateriasIdGlobalCatQuery:Int,
		 mtmsccarrerasscmateriasIdFinalCatQuery:Int,
		 mtmsccarrerasscmateriasIdProductQuery:Int,
semestre:String,
):datamtmscmateriassccarreras

              
            
              createsccarreras_scmaterias(
                id:Int,
mtmscmateriassccarrerasId:Int,
		 mtmscmateriassccarrerasIdGlobalCatQuery:Int,
		 mtmscmateriassccarrerasIdFinalCatQuery:Int,
		 mtmscmateriassccarrerasIdProductQuery:Int,
mtmsccarrerasscmateriasId:Int,
		 mtmsccarrerasscmateriasIdGlobalCatQuery:Int,
		 mtmsccarrerasscmateriasIdFinalCatQuery:Int,
		 mtmsccarrerasscmateriasIdProductQuery:Int,
semestre:String,

                ):sccarreras_scmaterias
              
              
              getDatasccarreras_scmaterias:[sccarreras_scmaterias]
removesccarreras_scmaterias(mtmsccarrerasscmateriasId:Int,mtmscmateriassccarrerasId:Int):Boolean
editsccarreras_scmaterias(id:Int,
mtmscmateriassccarrerasId:Int,
		 mtmscmateriassccarrerasIdGlobalCatQuery:Int,
		 mtmscmateriassccarrerasIdFinalCatQuery:Int,
		 mtmscmateriassccarrerasIdProductQuery:Int,
mtmsccarrerasscmateriasId:Int,
		 mtmsccarrerasscmateriasIdGlobalCatQuery:Int,
		 mtmsccarrerasscmateriasIdFinalCatQuery:Int,
		 mtmsccarrerasscmateriasIdProductQuery:Int,
semestre:String,
):sccarreras_scmaterias
              getsccarreras_scmaterias(id:Int):sccarreras_scmaterias
              
            }`

	/*schema mutation next
	type Mutation{
              getonedatamtmsccarrerasscmaterias(id:Int,
mtmscmateriassccarrerasId:Int,
		 mtmscmateriassccarrerasIdGlobalCatQuery:Int,
		 mtmscmateriassccarrerasIdFinalCatQuery:Int,
		 mtmscmateriassccarrerasIdProductQuery:Int,
mtmsccarrerasscmateriasId:Int,
		 mtmsccarrerasscmateriasIdGlobalCatQuery:Int,
		 mtmsccarrerasscmateriasIdFinalCatQuery:Int,
		 mtmsccarrerasscmateriasIdProductQuery:Int,
semestre:String,
):datamtmsccarrerasscmaterias
              getonedatamtmscmateriassccarreras(id:Int,
mtmscmateriassccarrerasId:Int,
		 mtmscmateriassccarrerasIdGlobalCatQuery:Int,
		 mtmscmateriassccarrerasIdFinalCatQuery:Int,
		 mtmscmateriassccarrerasIdProductQuery:Int,
mtmsccarrerasscmateriasId:Int,
		 mtmsccarrerasscmateriasIdGlobalCatQuery:Int,
		 mtmsccarrerasscmateriasIdFinalCatQuery:Int,
		 mtmsccarrerasscmateriasIdProductQuery:Int,
semestre:String,
):datamtmscmateriassccarreras
              getdatamtmsccarrerasscmaterias(id:Int,
mtmscmateriassccarrerasId:Int,
		 mtmscmateriassccarrerasIdGlobalCatQuery:Int,
		 mtmscmateriassccarrerasIdFinalCatQuery:Int,
		 mtmscmateriassccarrerasIdProductQuery:Int,
mtmsccarrerasscmateriasId:Int,
		 mtmsccarrerasscmateriasIdGlobalCatQuery:Int,
		 mtmsccarrerasscmateriasIdFinalCatQuery:Int,
		 mtmsccarrerasscmateriasIdProductQuery:Int,
semestre:String,
):[datamtmsccarrerasscmaterias]
              getdatamtmscmateriassccarreras(id:Int,
mtmscmateriassccarrerasId:Int,
		 mtmscmateriassccarrerasIdGlobalCatQuery:Int,
		 mtmscmateriassccarrerasIdFinalCatQuery:Int,
		 mtmscmateriassccarrerasIdProductQuery:Int,
mtmsccarrerasscmateriasId:Int,
		 mtmsccarrerasscmateriasIdGlobalCatQuery:Int,
		 mtmsccarrerasscmateriasIdFinalCatQuery:Int,
		 mtmsccarrerasscmateriasIdProductQuery:Int,
semestre:String,
):[datamtmscmateriassccarreras]
              createdatamtmsccarrerasscmaterias(id:Int,
mtmscmateriassccarrerasId:Int,
		 mtmscmateriassccarrerasIdGlobalCatQuery:Int,
		 mtmscmateriassccarrerasIdFinalCatQuery:Int,
		 mtmscmateriassccarrerasIdProductQuery:Int,
mtmsccarrerasscmateriasId:Int,
		 mtmsccarrerasscmateriasIdGlobalCatQuery:Int,
		 mtmsccarrerasscmateriasIdFinalCatQuery:Int,
		 mtmsccarrerasscmateriasIdProductQuery:Int,
semestre:String,
):datamtmsccarrerasscmaterias
              createdatamtmscmateriassccarreras(id:Int,
mtmscmateriassccarrerasId:Int,
		 mtmscmateriassccarrerasIdGlobalCatQuery:Int,
		 mtmscmateriassccarrerasIdFinalCatQuery:Int,
		 mtmscmateriassccarrerasIdProductQuery:Int,
mtmsccarrerasscmateriasId:Int,
		 mtmsccarrerasscmateriasIdGlobalCatQuery:Int,
		 mtmsccarrerasscmateriasIdFinalCatQuery:Int,
		 mtmsccarrerasscmateriasIdProductQuery:Int,
semestre:String,
):datamtmscmateriassccarreras
              editdatamtmsccarrerasscmaterias(id:Int,
mtmscmateriassccarrerasId:Int,
		 mtmscmateriassccarrerasIdGlobalCatQuery:Int,
		 mtmscmateriassccarrerasIdFinalCatQuery:Int,
		 mtmscmateriassccarrerasIdProductQuery:Int,
mtmsccarrerasscmateriasId:Int,
		 mtmsccarrerasscmateriasIdGlobalCatQuery:Int,
		 mtmsccarrerasscmateriasIdFinalCatQuery:Int,
		 mtmsccarrerasscmateriasIdProductQuery:Int,
semestre:String,
):datamtmsccarrerasscmaterias
              editdatamtmscmateriassccarreras(id:Int,
mtmscmateriassccarrerasId:Int,
		 mtmscmateriassccarrerasIdGlobalCatQuery:Int,
		 mtmscmateriassccarrerasIdFinalCatQuery:Int,
		 mtmscmateriassccarrerasIdProductQuery:Int,
mtmsccarrerasscmateriasId:Int,
		 mtmsccarrerasscmateriasIdGlobalCatQuery:Int,
		 mtmsccarrerasscmateriasIdFinalCatQuery:Int,
		 mtmsccarrerasscmateriasIdProductQuery:Int,
semestre:String,
):datamtmscmateriassccarreras

              
            
              createsccarreras_scmaterias(
                id:Int,
mtmscmateriassccarrerasId:Int,
		 mtmscmateriassccarrerasIdGlobalCatQuery:Int,
		 mtmscmateriassccarrerasIdFinalCatQuery:Int,
		 mtmscmateriassccarrerasIdProductQuery:Int,
mtmsccarrerasscmateriasId:Int,
		 mtmsccarrerasscmateriasIdGlobalCatQuery:Int,
		 mtmsccarrerasscmateriasIdFinalCatQuery:Int,
		 mtmsccarrerasscmateriasIdProductQuery:Int,
semestre:String,

                ):sccarreras_scmaterias
              
              
              getDatasccarreras_scmaterias:[sccarreras_scmaterias]
removesccarreras_scmaterias(mtmsccarrerasscmateriasId:Int,mtmscmateriassccarrerasId:Int):Boolean
editsccarreras_scmaterias(id:Int,
mtmscmateriassccarrerasId:Int,
		 mtmscmateriassccarrerasIdGlobalCatQuery:Int,
		 mtmscmateriassccarrerasIdFinalCatQuery:Int,
		 mtmscmateriassccarrerasIdProductQuery:Int,
mtmsccarrerasscmateriasId:Int,
		 mtmsccarrerasscmateriasIdGlobalCatQuery:Int,
		 mtmsccarrerasscmateriasIdFinalCatQuery:Int,
		 mtmsccarrerasscmateriasIdProductQuery:Int,
semestre:String,
):sccarreras_scmaterias
              getsccarreras_scmaterias(id:Int):sccarreras_scmaterias
              
            }*/
          