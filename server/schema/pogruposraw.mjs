
          import {gql} from 'apollo-server-express'

          export default gql`type originalmtmpoestudiantesrawpogruposraw{
                  
nombre:String
yearingreso:Int
tiposemestre:String
id:Int
mtmpogruposrawpoestudiantesraw:[datamtmpogruposrawpoestudiantesraw]
mtmpoestudiantesrawpogruposrawId:Int
mtmpogruposrawpoestudiantesrawId:Int
calificacion:Int
                  key:String
                    
      
                }
                type copymtmpoestudiantesrawpogruposraw{
                  
otmpoprofesoresrawpogruposrawId:Int

clave:String
semestre:Int
tiposemestre:String
year:Int
id:Int
mtmpoestudiantesrawpogruposrawId:Int
mtmpogruposrawpoestudiantesrawId:Int
calificacion:Int
                  key:String
                }
                type datamtmpoestudiantesrawpogruposraw{
                  original:originalmtmpoestudiantesrawpogruposraw
                  copy:copymtmpoestudiantesrawpogruposraw
                  
                }
                type pogruposraw{
              
              id:Int
mtmpoestudiantesrawpogruposraw:[datamtmpoestudiantesrawpogruposraw],
otmpoprofesoresrawpogruposrawId:Int
gruposidGlobalCatQuery:Int
gruposidFinalCatQuery:Int
gruposidProductQuery:Int
clave:String
semestre:Int
tiposemestre:String
year:Int

            }

            type Query{
              pogruposraw:[pogruposraw]
              
              
            }
            type Mutation{
            
              createpogruposraw(
                id:Int,
otmpoprofesoresrawpogruposrawId:Int,
gruposidGlobalCatQuery:Int,
gruposidFinalCatQuery:Int,
gruposidProductQuery:Int
,clave:String,
semestre:Int,
tiposemestre:String,
year:Int,

                ):pogruposraw
              
              
              getDatapogruposraw:[pogruposraw]
removepogruposraw(id:Int):Boolean!
editpogruposraw(id:Int,
otmpoprofesoresrawpogruposrawId:Int,
gruposidGlobalCatQuery:Int,
gruposidFinalCatQuery:Int,
gruposidProductQuery:Int
,clave:String,
semestre:Int,
tiposemestre:String,
year:Int,
):pogruposraw
              getpogruposraw(id:Int):pogruposraw
              
            }`
          