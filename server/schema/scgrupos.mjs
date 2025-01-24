
          import {gql} from 'apollo-server-express'

          export default gql`type datamtmscestudiantesscgrupos{
                  nombre:String
boleta:String
startingYear:String
semestertype:String


id:Int
mtmscgruposscestudiantes:[datamtmscgruposscestudiantes]
mtmscgruposscestudiantesId:Int
mtmscestudiantesscgruposId:Int
calificacion:Int
                },type scgrupos{
              
              id:Int
clavedelgrupo:String
otmscprofesoresscgruposId:Int
mtmscestudiantesscgrupos:[datamtmscestudiantesscgrupos],
otmscmateriasscgruposId:Int

            }

            type Query{
              scgrupos:[scgrupos]
              
              
            }
            type Mutation{
            
              createscgrupos(
                id:Int,
clavedelgrupo:String,
otmscprofesoresscgruposId:Int,
otmscmateriasscgruposId:Int,

                ):scgrupos
              
              
              getDatascgrupos:[scgrupos]
removescgrupos(id:Int):Boolean!
editscgrupos(id:Int,
clavedelgrupo:String,
otmscprofesoresscgruposId:Int,
otmscmateriasscgruposId:Int,
):scgrupos
              getscgrupos(id:Int):scgrupos
              
            }`
          