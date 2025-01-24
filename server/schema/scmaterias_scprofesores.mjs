
          import {gql} from 'apollo-server-express'

          export default gql`type scmaterias_scprofesores{
              
              id:Int
mtmscprofesoresscmateriasId:Int
		 mtmscprofesoresscmateriasIdGlobalCatQuery:Int
		 mtmscprofesoresscmateriasIdFinalCatQuery:Int
		 mtmscprofesoresscmateriasIdProductQuery:Int
mtmscmateriasscprofesoresId:Int
		 mtmscmateriasscprofesoresIdGlobalCatQuery:Int
		 mtmscmateriasscprofesoresIdFinalCatQuery:Int
		 mtmscmateriasscprofesoresIdProductQuery:Int

            }

            type Query{
              scmaterias_scprofesores:[scmaterias_scprofesores]
              
              
            }
            type Mutation{
              getonedatamtmscmateriasscprofesores(id:Int,
mtmscprofesoresscmateriasId:Int,
		 mtmscprofesoresscmateriasIdGlobalCatQuery:Int,
		 mtmscprofesoresscmateriasIdFinalCatQuery:Int,
		 mtmscprofesoresscmateriasIdProductQuery:Int,
mtmscmateriasscprofesoresId:Int,
		 mtmscmateriasscprofesoresIdGlobalCatQuery:Int,
		 mtmscmateriasscprofesoresIdFinalCatQuery:Int,
		 mtmscmateriasscprofesoresIdProductQuery:Int,
):datamtmscmateriasscprofesores
              getonedatamtmscprofesoresscmaterias(id:Int,
mtmscprofesoresscmateriasId:Int,
		 mtmscprofesoresscmateriasIdGlobalCatQuery:Int,
		 mtmscprofesoresscmateriasIdFinalCatQuery:Int,
		 mtmscprofesoresscmateriasIdProductQuery:Int,
mtmscmateriasscprofesoresId:Int,
		 mtmscmateriasscprofesoresIdGlobalCatQuery:Int,
		 mtmscmateriasscprofesoresIdFinalCatQuery:Int,
		 mtmscmateriasscprofesoresIdProductQuery:Int,
):datamtmscprofesoresscmaterias
              getdatamtmscmateriasscprofesores(id:Int,
mtmscprofesoresscmateriasId:Int,
		 mtmscprofesoresscmateriasIdGlobalCatQuery:Int,
		 mtmscprofesoresscmateriasIdFinalCatQuery:Int,
		 mtmscprofesoresscmateriasIdProductQuery:Int,
mtmscmateriasscprofesoresId:Int,
		 mtmscmateriasscprofesoresIdGlobalCatQuery:Int,
		 mtmscmateriasscprofesoresIdFinalCatQuery:Int,
		 mtmscmateriasscprofesoresIdProductQuery:Int,
):[datamtmscmateriasscprofesores]
              getdatamtmscprofesoresscmaterias(id:Int,
mtmscprofesoresscmateriasId:Int,
		 mtmscprofesoresscmateriasIdGlobalCatQuery:Int,
		 mtmscprofesoresscmateriasIdFinalCatQuery:Int,
		 mtmscprofesoresscmateriasIdProductQuery:Int,
mtmscmateriasscprofesoresId:Int,
		 mtmscmateriasscprofesoresIdGlobalCatQuery:Int,
		 mtmscmateriasscprofesoresIdFinalCatQuery:Int,
		 mtmscmateriasscprofesoresIdProductQuery:Int,
):[datamtmscprofesoresscmaterias]
              createdatamtmscmateriasscprofesores(id:Int,
mtmscprofesoresscmateriasId:Int,
		 mtmscprofesoresscmateriasIdGlobalCatQuery:Int,
		 mtmscprofesoresscmateriasIdFinalCatQuery:Int,
		 mtmscprofesoresscmateriasIdProductQuery:Int,
mtmscmateriasscprofesoresId:Int,
		 mtmscmateriasscprofesoresIdGlobalCatQuery:Int,
		 mtmscmateriasscprofesoresIdFinalCatQuery:Int,
		 mtmscmateriasscprofesoresIdProductQuery:Int,
):datamtmscmateriasscprofesores
              createdatamtmscprofesoresscmaterias(id:Int,
mtmscprofesoresscmateriasId:Int,
		 mtmscprofesoresscmateriasIdGlobalCatQuery:Int,
		 mtmscprofesoresscmateriasIdFinalCatQuery:Int,
		 mtmscprofesoresscmateriasIdProductQuery:Int,
mtmscmateriasscprofesoresId:Int,
		 mtmscmateriasscprofesoresIdGlobalCatQuery:Int,
		 mtmscmateriasscprofesoresIdFinalCatQuery:Int,
		 mtmscmateriasscprofesoresIdProductQuery:Int,
):datamtmscprofesoresscmaterias
              editdatamtmscmateriasscprofesores(id:Int,
mtmscprofesoresscmateriasId:Int,
		 mtmscprofesoresscmateriasIdGlobalCatQuery:Int,
		 mtmscprofesoresscmateriasIdFinalCatQuery:Int,
		 mtmscprofesoresscmateriasIdProductQuery:Int,
mtmscmateriasscprofesoresId:Int,
		 mtmscmateriasscprofesoresIdGlobalCatQuery:Int,
		 mtmscmateriasscprofesoresIdFinalCatQuery:Int,
		 mtmscmateriasscprofesoresIdProductQuery:Int,
):datamtmscmateriasscprofesores
              editdatamtmscprofesoresscmaterias(id:Int,
mtmscprofesoresscmateriasId:Int,
		 mtmscprofesoresscmateriasIdGlobalCatQuery:Int,
		 mtmscprofesoresscmateriasIdFinalCatQuery:Int,
		 mtmscprofesoresscmateriasIdProductQuery:Int,
mtmscmateriasscprofesoresId:Int,
		 mtmscmateriasscprofesoresIdGlobalCatQuery:Int,
		 mtmscmateriasscprofesoresIdFinalCatQuery:Int,
		 mtmscmateriasscprofesoresIdProductQuery:Int,
):datamtmscprofesoresscmaterias

              
            
              createscmaterias_scprofesores(
                id:Int,
mtmscprofesoresscmateriasId:Int,
		 mtmscprofesoresscmateriasIdGlobalCatQuery:Int,
		 mtmscprofesoresscmateriasIdFinalCatQuery:Int,
		 mtmscprofesoresscmateriasIdProductQuery:Int,
mtmscmateriasscprofesoresId:Int,
		 mtmscmateriasscprofesoresIdGlobalCatQuery:Int,
		 mtmscmateriasscprofesoresIdFinalCatQuery:Int,
		 mtmscmateriasscprofesoresIdProductQuery:Int,

                ):scmaterias_scprofesores
              
              
              getDatascmaterias_scprofesores:[scmaterias_scprofesores]
removescmaterias_scprofesores(mtmscmateriasscprofesoresId:Int,mtmscprofesoresscmateriasId:Int):Boolean
editscmaterias_scprofesores(id:Int,
mtmscprofesoresscmateriasId:Int,
		 mtmscprofesoresscmateriasIdGlobalCatQuery:Int,
		 mtmscprofesoresscmateriasIdFinalCatQuery:Int,
		 mtmscprofesoresscmateriasIdProductQuery:Int,
mtmscmateriasscprofesoresId:Int,
		 mtmscmateriasscprofesoresIdGlobalCatQuery:Int,
		 mtmscmateriasscprofesoresIdFinalCatQuery:Int,
		 mtmscmateriasscprofesoresIdProductQuery:Int,
):scmaterias_scprofesores
              getscmaterias_scprofesores(id:Int):scmaterias_scprofesores
              
            }`
          