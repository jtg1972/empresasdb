
          import {gql} from 'apollo-server-express'

          export default gql`type datamtmscareasscprofesores{
                  area:String



id:Int
mtmscprofesoresscareas:[datamtmscprofesoresscareas]
mtmscprofesoresscareasId:Int
mtmscareasscprofesoresId:Int
                },type datamtmscmateriasscprofesores{
                  materia:String
otmscareasscmateriasId:Int




id:Int
mtmscprofesoresscmaterias:[datamtmscprofesoresscmaterias]
mtmscprofesoresscmateriasId:Int
mtmscmateriasscprofesoresId:Int
                }
    type scprofesores{
              
              id:Int
nombre:String
noderegistro:String
mtmscareasscprofesores:[datamtmscareasscprofesores],
mtmscmateriasscprofesores:[datamtmscmateriasscprofesores],
otmscprofesoresscgrupos:[scgrupos]

            }

            type Query{
              scprofesores:[scprofesores]
              
              
            }
            type Mutation{
            
              createscprofesores(
                id:Int,
nombre:String,
noderegistro:String,

                ):scprofesores
              
              
              getDatascprofesores:[scprofesores]
removescprofesores(id:Int):Boolean!
editscprofesores(id:Int,
nombre:String,
noderegistro:String,
):scprofesores
              getscprofesores(id:Int):scprofesores
              
            }`
          