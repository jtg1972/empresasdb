
          import {gql} from 'apollo-server-express'

          export default gql`
          type originalmtmsccarrerasscmaterias{
            id:Int
                      carrera:String
                      otmscareassccarrerasId:Int
                      semestre:String
                      mtmscmateriassccarrerasId:Int
                      mtmsccarrerasscmateriasId:Int
                      key:String
                      mtmscmateriassccarreras:[datamtmscmateriassccarreras]
          }
          type copymtmsccarrerasscmaterias{
            id:Int
                    materia:String
                    otmscareasscmateriasId:Int
                  semestre:String
                    mtmscmateriassccarrerasId:Int
                    mtmsccarrerasscmateriasId:Int
                    key:String
                    mtmsccarrerasscmaterias:[datamtmsccarrerasscmaterias]

          }
          
          type datamtmsccarrerasscmaterias{
                  original:originalmtmsccarrerasscmaterias
                
                copy:copymtmsccarrerasscmaterias
              } type datamtmscprofesoresscmaterias{
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
          