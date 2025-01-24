
          import {gql} from 'apollo-server-express'

          export default gql`type datamtmscmateriassccarreras{
                  materia:String
otmscareasscmateriasId:Int




id:Int
mtmsccarrerasscmaterias:[datamtmsccarrerasscmaterias]
mtmscmateriassccarrerasId:Int
mtmsccarrerasscmateriasId:Int
semestre:String
                },type datamtmscestudiantessccarreras{
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
mtmscmateriassccarreras:[datamtmscmateriassccarreras],
mtmscestudiantessccarreras:[datamtmscestudiantessccarreras],

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
          