
          import {gql} from 'apollo-server-express'

          export default gql`type sbarea_sbprofesores{
              
              id:Int
mtmsbprofesoressbareaId:Int
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int
		 mtmsbprofesoressbareaIdFinalCatQuery:Int
		 mtmsbprofesoressbareaIdProductQuery:Int
mtmsbareasbprofesoresId:Int
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int
		 mtmsbareasbprofesoresIdFinalCatQuery:Int
		 mtmsbareasbprofesoresIdProductQuery:Int

            }

            type Query{
              sbarea_sbprofesores:[sbarea_sbprofesores]
              
              
            }
            type Mutation{
              getonedatamtmsbareasbprofesores(id:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,
):datamtmsbareasbprofesores
              getonedatamtmsbprofesoressbarea(id:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,
):datamtmsbprofesoressbarea
              getdatamtmsbareasbprofesores(id:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,
):[datamtmsbareasbprofesores]
              getdatamtmsbprofesoressbarea(id:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,
):[datamtmsbprofesoressbarea]
              createdatamtmsbareasbprofesores(id:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,
):datamtmsbareasbprofesores
              createdatamtmsbprofesoressbarea(id:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,
):datamtmsbprofesoressbarea
              editdatamtmsbareasbprofesores(id:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,
):datamtmsbareasbprofesores
              editdatamtmsbprofesoressbarea(id:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,
):datamtmsbprofesoressbarea

              
            
              createsbarea_sbprofesores(
                id:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,

                ):sbarea_sbprofesores
              
              
              getDatasbarea_sbprofesores:[sbarea_sbprofesores]
removesbarea_sbprofesores(mtmsbareasbprofesoresId:Int,mtmsbprofesoressbareaId:Int):Boolean
editsbarea_sbprofesores(id:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,
):sbarea_sbprofesores
              getsbarea_sbprofesores(id:Int):sbarea_sbprofesores
              
            }`
          