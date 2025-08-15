
          import {gql} from 'apollo-server-express'

          export default gql`type pocarrerasraw{
              
              id:Int
carrera:String
yearcreated:Int
otmpocarrerasrawpomateriasraw:[pomateriasraw]

            }

            type Query{
              pocarrerasraw:[pocarrerasraw]
              
              
            }
            type Mutation{
            
              createpocarrerasraw(
                id:Int,
carrera:String,
yearcreated:Int,

                ):pocarrerasraw
              
              
              getDatapocarrerasraw:[pocarrerasraw]
removepocarrerasraw(id:Int):Boolean!
editpocarrerasraw(id:Int,
carrera:String,
yearcreated:Int,
):pocarrerasraw
              getpocarrerasraw(id:Int):pocarrerasraw
              
            }`
          