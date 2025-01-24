
          import {gql} from 'apollo-server-express'

          export default gql`type datamtmsccarrerasscestudiantes{
                  carrera:String
otmscareassccarrerasId:Int


id:Int
mtmscestudiantessccarreras:[datamtmscestudiantessccarreras]
mtmscestudiantessccarrerasId:Int
mtmsccarrerasscestudiantesId:Int
                },type datamtmscgruposscestudiantes{
                  clavedelgrupo:String
otmscprofesoresscgruposId:Int

otmscmateriasscgruposId:Int
id:Int
mtmscestudiantesscgrupos:[datamtmscestudiantesscgrupos]
mtmscgruposscestudiantesId:Int
mtmscestudiantesscgruposId:Int
calificacion:Int
                },type scestudiantes{
              
              id:Int
nombre:String
boleta:String
startingYear:String
semestertype:String
mtmsccarrerasscestudiantes:[datamtmsccarrerasscestudiantes],
mtmscgruposscestudiantes:[datamtmscgruposscestudiantes],

            }

            type Query{
              scestudiantes:[scestudiantes]
              
              
            }
            type Mutation{
            
              createscestudiantes(
                id:Int,
nombre:String,
boleta:String,
startingYear:String,
semestertype:String,

                ):scestudiantes
              
              
              getDatascestudiantes:[scestudiantes]
removescestudiantes(id:Int):Boolean!
editscestudiantes(id:Int,
nombre:String,
boleta:String,
startingYear:String,
semestertype:String,
):scestudiantes
              getscestudiantes(id:Int):scestudiantes
              
            }`
          