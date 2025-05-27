
          import {gql} from 'apollo-server-express'

          export default gql`type sbcarrerasraw{
              
              id:Int
carrera:String

            }

            type Query{
              sbcarrerasraw:[sbcarrerasraw]
              
              
            }
            type Mutation{
            
              createsbcarrerasraw(
                id:Int,
carrera:String,

                ):sbcarrerasraw
              
              
              getDatasbcarrerasraw:[sbcarrerasraw]
removesbcarrerasraw(id:Int):Boolean!
editsbcarrerasraw(id:Int,
carrera:String,
):sbcarrerasraw
              getsbcarrerasraw(id:Int):sbcarrerasraw
              
            }`
          