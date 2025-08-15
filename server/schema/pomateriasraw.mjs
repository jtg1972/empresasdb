
          import {gql} from 'apollo-server-express'

          export default gql`type pomateriasraw{
              
              id:Int
materia:String
otmpomateriasrawpoprofesoresraw:[poprofesoresraw]
otmpocarrerasrawpomateriasrawId:Int
materiaidGlobalCatQuery:Int
materiaidFinalCatQuery:Int
materiaidProductQuery:Int

            }

            type Query{
              pomateriasraw:[pomateriasraw]
              
              
            }
            type Mutation{
            
              createpomateriasraw(
                id:Int,
materia:String,
otmpocarrerasrawpomateriasrawId:Int,
materiaidGlobalCatQuery:Int,
materiaidFinalCatQuery:Int,
materiaidProductQuery:Int
,
                ):pomateriasraw
              
              
              getDatapomateriasraw:[pomateriasraw]
removepomateriasraw(id:Int):Boolean!
editpomateriasraw(id:Int,
materia:String,
otmpocarrerasrawpomateriasrawId:Int,
materiaidGlobalCatQuery:Int,
materiaidFinalCatQuery:Int,
materiaidProductQuery:Int
,):pomateriasraw
              getpomateriasraw(id:Int):pomateriasraw
              
            }`
          