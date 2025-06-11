
          import {gql} from 'apollo-server-express'

          export default gql`type sbarea_sbprofesores{
              
              id:Int
mtmsbareasbprofesoresId:Int
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int
		 mtmsbareasbprofesoresIdFinalCatQuery:Int
		 mtmsbareasbprofesoresIdProductQuery:Int
mtmsbprofesoressbareaId:Int
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int
		 mtmsbprofesoressbareaIdFinalCatQuery:Int
		 mtmsbprofesoressbareaIdProductQuery:Int

            }

            type Query{
              sbarea_sbprofesores:[sbarea_sbprofesores]
              
              
            }
            type Mutation{
              getonedatamtmsbareasbprofesores(id:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,
):datamtmsbareasbprofesores
              getonedatamtmsbprofesoressbarea(id:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,
):datamtmsbprofesoressbarea
              getdatamtmsbareasbprofesores(id:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,
):[datamtmsbareasbprofesores]
              getdatamtmsbprofesoressbarea(id:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,
):[datamtmsbprofesoressbarea]
              createdatamtmsbareasbprofesores(id:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,
):datamtmsbareasbprofesores
              createdatamtmsbprofesoressbarea(id:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,
):datamtmsbprofesoressbarea
              editdatamtmsbareasbprofesores(id:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,
):datamtmsbareasbprofesores
              editdatamtmsbprofesoressbarea(id:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,
):datamtmsbprofesoressbarea

              
            
              createsbarea_sbprofesores(
                id:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,

                ):sbarea_sbprofesores
              
              
              getDatasbarea_sbprofesores:[sbarea_sbprofesores]
removesbarea_sbprofesores(mtmsbareasbprofesoresId:Int,mtmsbprofesoressbareaId:Int):Boolean
editsbarea_sbprofesores(id:Int,
mtmsbareasbprofesoresId:Int,
		 mtmsbareasbprofesoresIdGlobalCatQuery:Int,
		 mtmsbareasbprofesoresIdFinalCatQuery:Int,
		 mtmsbareasbprofesoresIdProductQuery:Int,
mtmsbprofesoressbareaId:Int,
		 mtmsbprofesoressbareaIdGlobalCatQuery:Int,
		 mtmsbprofesoressbareaIdFinalCatQuery:Int,
		 mtmsbprofesoressbareaIdProductQuery:Int,
):sbarea_sbprofesores
              getsbarea_sbprofesores(id:Int):sbarea_sbprofesores
              
            }`
          