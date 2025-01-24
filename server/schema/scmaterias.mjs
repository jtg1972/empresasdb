
          import {gql} from 'apollo-server-express'

          export default gql`type datamtmsccarrerasscmaterias{
                  carrera:String
otmscareassccarrerasId:Int


id:Int
mtmscmateriassccarreras:[datamtmscmateriassccarreras]
mtmscmateriassccarrerasId:Int
mtmsccarrerasscmateriasId:Int
semestre:String
                },type datamtmscprofesoresscmaterias{
                  nombre:String
noderegistro:String



id:Int
mtmscmateriasscprofesores:[datamtmscmateriasscprofesores]
mtmscprofesoresscmateriasId:Int
mtmscmateriasscprofesoresId:Int
                },type scmaterias{
              
              id:Int
materia:String
otmscareasscmateriasId:Int
mtmsccarrerasscmaterias:[datamtmsccarrerasscmaterias],
mtmscprofesoresscmaterias:[datamtmscprofesoresscmaterias],
otmscmateriasGrupos:[Grupos]
otmscmateriasscgrupos:[scgrupos]

            }

            type Query{
              scmaterias:[scmaterias]
              
              
            }
            type Mutation{
            
              createscmaterias(
                id:Int,
materia:String,
otmscareasscmateriasId:Int,

                ):scmaterias
              
              
              getDatascmaterias:[scmaterias]
removescmaterias(id:Int):Boolean!
editscmaterias(id:Int,
materia:String,
otmscareasscmateriasId:Int,
):scmaterias
              getscmaterias(id:Int):scmaterias
              
            }`
          