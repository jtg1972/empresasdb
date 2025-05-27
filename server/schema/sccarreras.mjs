
          import {gql} from 'apollo-server-express'

          export default gql`
          type originalmtmscmateriassccarreras{
            id:Int
              materia:String
              otmscareasscmateriasId:Int
              semestre:String
              mtmscmateriassccarrerasId:Int
              mtmsccarrerasscmateriasId:Int
              mtmsccarrerasscmaterias:[datamtmsccarrerasscmaterias]

              key:String
              

          }
          type copymtmscmateriassccarreras{
            id:Int
              carrera:String
              otmscareassccarrerasId:Int
              semestre:String
              mtmscmateriassccarrerasId:Int
              mtmsccarrerasscmateriasId:Int
              key:String
              mtmscmateriasccarreras:[datamtmscmateriassccarreras]
          }
          
          type datamtmscmateriassccarreras{
            original:originalmtmscmateriassccarreras
            copy:copymtmscmateriassccarreras
            
          } type datamtmscestudiantessccarreras{
                  nombre:String
boleta:String
startingYear:String
semestertype:String


id:Int
mtmsccarrerasscestudiantes:[datamtmsccarrerasscestudiantes]
mtmscestudiantessccarrerasId:Int
mtmsccarrerasscestudiantesId:Int
                },type sccarreras{
              
              id:Int
carrera:String
otmscareassccarrerasId:Int
mtmscmateriassccarreras:[datamtmscmateriassccarreras]
mtmscestudiantessccarreras:[datamtmscestudiantessccarreras]

            }

            type Query{
              sccarreras:[sccarreras]
              
              
            }
            type Mutation{
            
              createsccarreras(
                id:Int,
carrera:String,
otmscareassccarrerasId:Int,

                ):sccarreras
              
              
              getDatasccarreras:[sccarreras]
removesccarreras(id:Int):Boolean!
editsccarreras(id:Int,
carrera:String,
otmscareassccarrerasId:Int,
):sccarreras
              getsccarreras(id:Int):sccarreras
              
            }`
          