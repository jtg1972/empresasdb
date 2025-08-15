
          import {gql} from 'apollo-server-express'

          export default gql`type poprofesoresraw{
              
              id:Int
profesorIdGlobalCatQuery:Int
profesorIdFinalCatQuery:Int
profesorIdProductQuery:Int
otmpoprofesoresrawpogruposraw:[pogruposraw]
nombre:String
registro:String
ingresoyear:Int
tiposemestre:String
otmpomateriasrawpoprofesoresrawId:Int

            }

            type Query{
              poprofesoresraw:[poprofesoresraw]
              
              
            }
            type Mutation{
            
              createpoprofesoresraw(
                id:Int,
profesorIdGlobalCatQuery:Int,
profesorIdFinalCatQuery:Int,
profesorIdProductQuery:Int
,nombre:String,
registro:String,
ingresoyear:Int,
tiposemestre:String,
otmpomateriasrawpoprofesoresrawId:Int,

                ):poprofesoresraw
              
              
              getDatapoprofesoresraw:[poprofesoresraw]
removepoprofesoresraw(id:Int):Boolean!
editpoprofesoresraw(id:Int,
profesorIdGlobalCatQuery:Int,
profesorIdFinalCatQuery:Int,
profesorIdProductQuery:Int
,nombre:String,
registro:String,
ingresoyear:Int,
tiposemestre:String,
otmpomateriasrawpoprofesoresrawId:Int,
):poprofesoresraw
              getpoprofesoresraw(id:Int):poprofesoresraw
              
            }`
          