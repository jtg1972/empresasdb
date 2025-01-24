
          import {gql} from 'apollo-server-express'

          export default gql`type scareas_scprofesores{
              
              id:Int
mtmscprofesoresscareasId:Int
		 mtmscprofesoresscareasIdGlobalCatQuery:Int
		 mtmscprofesoresscareasIdFinalCatQuery:Int
		 mtmscprofesoresscareasIdProductQuery:Int
mtmscareasscprofesoresId:Int
		 mtmscareasscprofesoresIdGlobalCatQuery:Int
		 mtmscareasscprofesoresIdFinalCatQuery:Int
		 mtmscareasscprofesoresIdProductQuery:Int

            }

            type Query{
              scareas_scprofesores:[scareas_scprofesores]
              
              
            }
            type Mutation{
              getonedatamtmscareasscprofesores(id:Int,
mtmscprofesoresscareasId:Int,
		 mtmscprofesoresscareasIdGlobalCatQuery:Int,
		 mtmscprofesoresscareasIdFinalCatQuery:Int,
		 mtmscprofesoresscareasIdProductQuery:Int,
mtmscareasscprofesoresId:Int,
		 mtmscareasscprofesoresIdGlobalCatQuery:Int,
		 mtmscareasscprofesoresIdFinalCatQuery:Int,
		 mtmscareasscprofesoresIdProductQuery:Int,
):datamtmscareasscprofesores
              getonedatamtmscprofesoresscareas(id:Int,
mtmscprofesoresscareasId:Int,
		 mtmscprofesoresscareasIdGlobalCatQuery:Int,
		 mtmscprofesoresscareasIdFinalCatQuery:Int,
		 mtmscprofesoresscareasIdProductQuery:Int,
mtmscareasscprofesoresId:Int,
		 mtmscareasscprofesoresIdGlobalCatQuery:Int,
		 mtmscareasscprofesoresIdFinalCatQuery:Int,
		 mtmscareasscprofesoresIdProductQuery:Int,
):datamtmscprofesoresscareas
              getdatamtmscareasscprofesores(id:Int,
mtmscprofesoresscareasId:Int,
		 mtmscprofesoresscareasIdGlobalCatQuery:Int,
		 mtmscprofesoresscareasIdFinalCatQuery:Int,
		 mtmscprofesoresscareasIdProductQuery:Int,
mtmscareasscprofesoresId:Int,
		 mtmscareasscprofesoresIdGlobalCatQuery:Int,
		 mtmscareasscprofesoresIdFinalCatQuery:Int,
		 mtmscareasscprofesoresIdProductQuery:Int,
):[datamtmscareasscprofesores]
              getdatamtmscprofesoresscareas(id:Int,
mtmscprofesoresscareasId:Int,
		 mtmscprofesoresscareasIdGlobalCatQuery:Int,
		 mtmscprofesoresscareasIdFinalCatQuery:Int,
		 mtmscprofesoresscareasIdProductQuery:Int,
mtmscareasscprofesoresId:Int,
		 mtmscareasscprofesoresIdGlobalCatQuery:Int,
		 mtmscareasscprofesoresIdFinalCatQuery:Int,
		 mtmscareasscprofesoresIdProductQuery:Int,
):[datamtmscprofesoresscareas]
              createdatamtmscareasscprofesores(id:Int,
mtmscprofesoresscareasId:Int,
		 mtmscprofesoresscareasIdGlobalCatQuery:Int,
		 mtmscprofesoresscareasIdFinalCatQuery:Int,
		 mtmscprofesoresscareasIdProductQuery:Int,
mtmscareasscprofesoresId:Int,
		 mtmscareasscprofesoresIdGlobalCatQuery:Int,
		 mtmscareasscprofesoresIdFinalCatQuery:Int,
		 mtmscareasscprofesoresIdProductQuery:Int,
):datamtmscareasscprofesores
              createdatamtmscprofesoresscareas(id:Int,
mtmscprofesoresscareasId:Int,
		 mtmscprofesoresscareasIdGlobalCatQuery:Int,
		 mtmscprofesoresscareasIdFinalCatQuery:Int,
		 mtmscprofesoresscareasIdProductQuery:Int,
mtmscareasscprofesoresId:Int,
		 mtmscareasscprofesoresIdGlobalCatQuery:Int,
		 mtmscareasscprofesoresIdFinalCatQuery:Int,
		 mtmscareasscprofesoresIdProductQuery:Int,
):datamtmscprofesoresscareas
              editdatamtmscareasscprofesores(id:Int,
mtmscprofesoresscareasId:Int,
		 mtmscprofesoresscareasIdGlobalCatQuery:Int,
		 mtmscprofesoresscareasIdFinalCatQuery:Int,
		 mtmscprofesoresscareasIdProductQuery:Int,
mtmscareasscprofesoresId:Int,
		 mtmscareasscprofesoresIdGlobalCatQuery:Int,
		 mtmscareasscprofesoresIdFinalCatQuery:Int,
		 mtmscareasscprofesoresIdProductQuery:Int,
):datamtmscareasscprofesores
              editdatamtmscprofesoresscareas(id:Int,
mtmscprofesoresscareasId:Int,
		 mtmscprofesoresscareasIdGlobalCatQuery:Int,
		 mtmscprofesoresscareasIdFinalCatQuery:Int,
		 mtmscprofesoresscareasIdProductQuery:Int,
mtmscareasscprofesoresId:Int,
		 mtmscareasscprofesoresIdGlobalCatQuery:Int,
		 mtmscareasscprofesoresIdFinalCatQuery:Int,
		 mtmscareasscprofesoresIdProductQuery:Int,
):datamtmscprofesoresscareas

              
            
              createscareas_scprofesores(
                id:Int,
mtmscprofesoresscareasId:Int,
		 mtmscprofesoresscareasIdGlobalCatQuery:Int,
		 mtmscprofesoresscareasIdFinalCatQuery:Int,
		 mtmscprofesoresscareasIdProductQuery:Int,
mtmscareasscprofesoresId:Int,
		 mtmscareasscprofesoresIdGlobalCatQuery:Int,
		 mtmscareasscprofesoresIdFinalCatQuery:Int,
		 mtmscareasscprofesoresIdProductQuery:Int,

                ):scareas_scprofesores
              
              
              getDatascareas_scprofesores:[scareas_scprofesores]
removescareas_scprofesores(mtmscareasscprofesoresId:Int,mtmscprofesoresscareasId:Int):Boolean
editscareas_scprofesores(id:Int,
mtmscprofesoresscareasId:Int,
		 mtmscprofesoresscareasIdGlobalCatQuery:Int,
		 mtmscprofesoresscareasIdFinalCatQuery:Int,
		 mtmscprofesoresscareasIdProductQuery:Int,
mtmscareasscprofesoresId:Int,
		 mtmscareasscprofesoresIdGlobalCatQuery:Int,
		 mtmscareasscprofesoresIdFinalCatQuery:Int,
		 mtmscareasscprofesoresIdProductQuery:Int,
):scareas_scprofesores
              getscareas_scprofesores(id:Int):scareas_scprofesores
              
            }`
          