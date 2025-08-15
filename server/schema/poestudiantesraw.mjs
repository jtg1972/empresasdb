
          import {gql} from 'apollo-server-express'

          export default gql`type originalmtmpogruposrawpoestudiantesraw{
                  
otmpoprofesoresrawpogruposrawId:Int

clave:String
semestre:Int
tiposemestre:String
year:Int
id:Int
mtmpoestudiantesrawpogruposraw:[datamtmpoestudiantesrawpogruposraw]
mtmpoestudiantesrawpogruposrawId:Int
mtmpogruposrawpoestudiantesrawId:Int
calificacion:Int
                  key:String
                    
      
                }
                type copymtmpogruposrawpoestudiantesraw{
                  

nombre:String
yearingreso:Int
tiposemestre:String
id:Int
mtmpoestudiantesrawpogruposrawId:Int
mtmpogruposrawpoestudiantesrawId:Int
calificacion:Int
                  key:String
                }
                type datamtmpogruposrawpoestudiantesraw{
                  original:originalmtmpogruposrawpoestudiantesraw
                  copy:copymtmpogruposrawpoestudiantesraw
                  
                }
                type poestudiantesraw{
              
              id:Int
estudiantesidGlobalCatQuery:Int
estudiantesidFinalCatQuery:Int
estudiantesidProductQuery:Int
mtmpogruposrawpoestudiantesraw:[datamtmpogruposrawpoestudiantesraw],
nombre:String
yearingreso:Int
tiposemestre:String

            }

            type Query{
              poestudiantesraw:[poestudiantesraw]
              
              
            }
            type Mutation{
            
              createpoestudiantesraw(
                id:Int,
estudiantesidGlobalCatQuery:Int,
estudiantesidFinalCatQuery:Int,
estudiantesidProductQuery:Int
,nombre:String,
yearingreso:Int,
tiposemestre:String,

                ):poestudiantesraw
              
              
              getDatapoestudiantesraw:[poestudiantesraw]
removepoestudiantesraw(id:Int):Boolean!
editpoestudiantesraw(id:Int,
estudiantesidGlobalCatQuery:Int,
estudiantesidFinalCatQuery:Int,
estudiantesidProductQuery:Int
,nombre:String,
yearingreso:Int,
tiposemestre:String,
):poestudiantesraw
              getpoestudiantesraw(id:Int):poestudiantesraw
              
            }`
          