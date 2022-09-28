
          import {gql} from 'apollo-server-express'

          export default gql`type Alumnos_Grupos{
              
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
campo_mutuo2:String
campo_mutuo3:String

            }

            type Query{
              Alumnos_Grupos:[Alumnos_Grupos]
              
              
            }
            type Mutation{
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
campo_mutuo2:String,
campo_mutuo3:String,
):datamtmAlumnosGrupos
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
campo_mutuo2:String,
campo_mutuo3:String,
):datamtmGruposAlumnos
              getdatamtmAlumnosGrupos(id:Int,
mtmAlumnosGruposId:Int,
		 mtmAlumnosGruposIdGlobalCatQuery:Int,
		 mtmAlumnosGruposIdFinalCatQuery:Int,
		 mtmAlumnosGruposIdProductQuery:Int,
mtmGruposAlumnosId:Int,
		 mtmGruposAlumnosIdGlobalCatQuery:Int,
		 mtmGruposAlumnosIdFinalCatQuery:Int,
		 mtmGruposAlumnosIdProductQuery:Int,
campo_mutuo1:String,
campo_mutuo2:String,
campo_mutuo3:String,
):[datamtmAlumnosGrupos]
              getdatamtmGruposAlumnos(id:Int,
mtmAlumnosGruposId:Int,
		 mtmAlumnosGruposIdGlobalCatQuery:Int,
		 mtmAlumnosGruposIdFinalCatQuery:Int,
		 mtmAlumnosGruposIdProductQuery:Int,
mtmGruposAlumnosId:Int,
		 mtmGruposAlumnosIdGlobalCatQuery:Int,
		 mtmGruposAlumnosIdFinalCatQuery:Int,
		 mtmGruposAlumnosIdProductQuery:Int,
campo_mutuo1:String,
campo_mutuo2:String,
campo_mutuo3:String,
):[datamtmGruposAlumnos]
              createdatamtmAlumnosGrupos(id:Int,
mtmAlumnosGruposId:Int,
		 mtmAlumnosGruposIdGlobalCatQuery:Int,
		 mtmAlumnosGruposIdFinalCatQuery:Int,
		 mtmAlumnosGruposIdProductQuery:Int,
mtmGruposAlumnosId:Int,
		 mtmGruposAlumnosIdGlobalCatQuery:Int,
		 mtmGruposAlumnosIdFinalCatQuery:Int,
		 mtmGruposAlumnosIdProductQuery:Int,
campo_mutuo1:String,
campo_mutuo2:String,
campo_mutuo3:String,
):datamtmAlumnosGrupos
              createdatamtmGruposAlumnos(id:Int,
mtmAlumnosGruposId:Int,
		 mtmAlumnosGruposIdGlobalCatQuery:Int,
		 mtmAlumnosGruposIdFinalCatQuery:Int,
		 mtmAlumnosGruposIdProductQuery:Int,
mtmGruposAlumnosId:Int,
		 mtmGruposAlumnosIdGlobalCatQuery:Int,
		 mtmGruposAlumnosIdFinalCatQuery:Int,
		 mtmGruposAlumnosIdProductQuery:Int,
campo_mutuo1:String,
campo_mutuo2:String,
campo_mutuo3:String,
):datamtmGruposAlumnos
              editdatamtmAlumnosGrupos(id:Int,
mtmAlumnosGruposId:Int,
		 mtmAlumnosGruposIdGlobalCatQuery:Int,
		 mtmAlumnosGruposIdFinalCatQuery:Int,
		 mtmAlumnosGruposIdProductQuery:Int,
mtmGruposAlumnosId:Int,
		 mtmGruposAlumnosIdGlobalCatQuery:Int,
		 mtmGruposAlumnosIdFinalCatQuery:Int,
		 mtmGruposAlumnosIdProductQuery:Int,
campo_mutuo1:String,
campo_mutuo2:String,
campo_mutuo3:String,
):datamtmAlumnosGrupos
              editdatamtmGruposAlumnos(id:Int,
mtmAlumnosGruposId:Int,
		 mtmAlumnosGruposIdGlobalCatQuery:Int,
		 mtmAlumnosGruposIdFinalCatQuery:Int,
		 mtmAlumnosGruposIdProductQuery:Int,
mtmGruposAlumnosId:Int,
		 mtmGruposAlumnosIdGlobalCatQuery:Int,
		 mtmGruposAlumnosIdFinalCatQuery:Int,
		 mtmGruposAlumnosIdProductQuery:Int,
campo_mutuo1:String,
campo_mutuo2:String,
campo_mutuo3:String,
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
campo_mutuo2:String,
campo_mutuo3:String,

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
campo_mutuo2:String,
campo_mutuo3:String,
):Alumnos_Grupos
              getAlumnos_Grupos(id:Int):Alumnos_Grupos
              
            }`
          