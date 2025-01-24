
          import {gql} from 'apollo-server-express'

          export default gql`type datamtmscprofesoresscareas{
                  nombre:String
noderegistro:String



id:Int
mtmscareasscprofesores:[datamtmscareasscprofesores]
mtmscprofesoresscareasId:Int
mtmscareasscprofesoresId:Int
                },type scareas{
              
              id:Int
area:String
otmscareassccarreras:[sccarreras]
otmscareasscmaterias:[scmaterias]
mtmscprofesoresscareas:[datamtmscprofesoresscareas],

            }

            type Query{
              scareas:[scareas]
              
              
            }
            type Mutation{
            
              createscareas(
                id:Int,
area:String,

                ):scareas
              
              
              getDatascareas:[scareas]
removescareas(id:Int):Boolean!
editscareas(id:Int,
area:String,
):scareas
              getscareas(id:Int):scareas
              
            }`
          