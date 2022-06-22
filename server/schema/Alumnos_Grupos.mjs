
          import {gql} from 'apollo-server-express'

          export default gql`

            
            type Alumnos_Grupos{
              
              id:Int
mtmAlumnosGruposId:Int
		 mtmAlumnosGruposIdGlobalCatQuery:Int
		 mtmAlumnosGruposIdFinalCatQuery:Int
		 mtmAlumnosGruposIdProductQuery:Int
mtmGruposAlumnosId:Int
		 mtmGruposAlumnosIdGlobalCatQuery:Int
		 mtmGruposAlumnosIdFinalCatQuery:Int
		 mtmGruposAlumnosIdProductQuery:Int

            }

            type Query{
              Alumnos_Grupos:[Alumnos_Grupos]
              
              
            }
            type Mutation{
              createAlumnos_Grupos(
                id:Int,
mtmAlumnosGruposId:Int,
		 mtmAlumnosGruposIdGlobalCatQuery:Int,
		 mtmAlumnosGruposIdFinalCatQuery:Int,
		 mtmAlumnosGruposIdProductQuery:Int,
mtmGruposAlumnosId:Int,
		 mtmGruposAlumnosIdGlobalCatQuery:Int,
		 mtmGruposAlumnosIdFinalCatQuery:Int,
		 mtmGruposAlumnosIdProductQuery:Int,

                ):Alumnos_Grupos
              getDataAlumnos_Grupos:[Alumnos_Grupos]
              removeAlumnos_Grupos(id:Int):Boolean!
              editAlumnos_Grupos(id:Int,
mtmAlumnosGruposId:Int,
		 mtmAlumnosGruposIdGlobalCatQuery:Int,
		 mtmAlumnosGruposIdFinalCatQuery:Int,
		 mtmAlumnosGruposIdProductQuery:Int,
mtmGruposAlumnosId:Int,
		 mtmGruposAlumnosIdGlobalCatQuery:Int,
		 mtmGruposAlumnosIdFinalCatQuery:Int,
		 mtmGruposAlumnosIdProductQuery:Int,
):Alumnos_Grupos
              
            }`
          