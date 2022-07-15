
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
campo_mutuo1:String

            }

            type Query{
              Alumnos_Grupos:[Alumnos_Grupos]
              
            }
            type Mutation{
							getonedatamtmGruposAlumnos(id:Int,
								mtmAlumnosGruposId:Int,
										 mtmAlumnosGruposIdGlobalCatQuery:Int,
										 mtmAlumnosGruposIdFinalCatQuery:Int,
										 mtmAlumnosGruposIdProductQuery:Int,
								mtmGruposAlumnosId:Int,
										 mtmGruposAlumnosIdGlobalCatQuery:Int,
										 mtmGruposAlumnosIdFinalCatQuery:Int,
										 mtmGruposAlumnosIdProductQuery:Int,
								campo_mutuo1:String,
								):datamtmGruposAlumnos
							getonedatamtmAlumnosGrupos(id:Int,
								mtmAlumnosGruposId:Int,
										 mtmAlumnosGruposIdGlobalCatQuery:Int,
										 mtmAlumnosGruposIdFinalCatQuery:Int,
										 mtmAlumnosGruposIdProductQuery:Int,
								mtmGruposAlumnosId:Int,
										 mtmGruposAlumnosIdGlobalCatQuery:Int,
										 mtmGruposAlumnosIdFinalCatQuery:Int,
										 mtmGruposAlumnosIdProductQuery:Int,
								campo_mutuo1:String,
								):datamtmAlumnosGrupos
								getdatamtmGruposAlumnos(id:Int,
									mtmAlumnosGruposId:Int,
											 mtmAlumnosGruposIdGlobalCatQuery:Int,
											 mtmAlumnosGruposIdFinalCatQuery:Int,
											 mtmAlumnosGruposIdProductQuery:Int,
									mtmGruposAlumnosId:Int,
											 mtmGruposAlumnosIdGlobalCatQuery:Int,
											 mtmGruposAlumnosIdFinalCatQuery:Int,
											 mtmGruposAlumnosIdProductQuery:Int,
									campo_mutuo1:String):[datamtmGruposAlumnos]

									getdatamtmAlumnosGrupos(id:Int,
										mtmAlumnosGruposId:Int,
												 mtmAlumnosGruposIdGlobalCatQuery:Int,
												 mtmAlumnosGruposIdFinalCatQuery:Int,
												 mtmAlumnosGruposIdProductQuery:Int,
										mtmGruposAlumnosId:Int,
												 mtmGruposAlumnosIdGlobalCatQuery:Int,
												 mtmGruposAlumnosIdFinalCatQuery:Int,
												 mtmGruposAlumnosIdProductQuery:Int,
										campo_mutuo1:String):[datamtmAlumnosGrupos]
							Alumnos_GruposByAlumnosId(mtmAlumnosGruposId:Int):[Alumnos_Grupos]
							Alumnos_GruposByGruposId(mtmGruposAlumnosId:Int):[Alumnos_Grupos]
							createdatamtmAlumnosGrupos(
                id:Int,
mtmAlumnosGruposId:Int,
		 mtmAlumnosGruposIdGlobalCatQuery:Int,
		 mtmAlumnosGruposIdFinalCatQuery:Int,
		 mtmAlumnosGruposIdProductQuery:Int,
mtmGruposAlumnosId:Int,
		 mtmGruposAlumnosIdGlobalCatQuery:Int,
		 mtmGruposAlumnosIdFinalCatQuery:Int,
		 mtmGruposAlumnosIdProductQuery:Int,
campo_mutuo1:String,

                ):datamtmAlumnosGrupos
								createdatamtmGruposAlumnos(
									id:Int,
	mtmAlumnosGruposId:Int,
			 mtmAlumnosGruposIdGlobalCatQuery:Int,
			 mtmAlumnosGruposIdFinalCatQuery:Int,
			 mtmAlumnosGruposIdProductQuery:Int,
	mtmGruposAlumnosId:Int,
			 mtmGruposAlumnosIdGlobalCatQuery:Int,
			 mtmGruposAlumnosIdFinalCatQuery:Int,
			 mtmGruposAlumnosIdProductQuery:Int,
	campo_mutuo1:String,
	
									):datamtmGruposAlumnos
	
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
campo_mutuo1:String,

                ):Alumnos_Grupos
              
              
              getDataAlumnos_Grupos:[Alumnos_Grupos]
removeAlumnos_Grupos(mtmAlumnosGruposId:Int,mtmGruposAlumnosId:Int):Boolean
editAlumnos_Grupos(id:Int,
mtmAlumnosGruposId:Int,
		 mtmAlumnosGruposIdGlobalCatQuery:Int,
		 mtmAlumnosGruposIdFinalCatQuery:Int,
		 mtmAlumnosGruposIdProductQuery:Int,
mtmGruposAlumnosId:Int,
		 mtmGruposAlumnosIdGlobalCatQuery:Int,
		 mtmGruposAlumnosIdFinalCatQuery:Int,
		 mtmGruposAlumnosIdProductQuery:Int,
campo_mutuo1:String,
):Alumnos_Grupos
              getAlumnos_Grupos(id:Int):Alumnos_Grupos
              
            }`
          