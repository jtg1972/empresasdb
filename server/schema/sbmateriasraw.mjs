
          import {gql} from 'apollo-server-express'

          export default gql`type sbmateriasraw{
              
              id:Int
materia:String

            }

            type Query{
              sbmateriasraw:[sbmateriasraw]
              
              
            }
            type Mutation{
            
              createsbmateriasraw(
                id:Int,
materia:String,

                ):sbmateriasraw
              
              
              getDatasbmateriasraw:[sbmateriasraw]
removesbmateriasraw(id:Int):Boolean!
editsbmateriasraw(id:Int,
materia:String,
):sbmateriasraw
              getsbmateriasraw(id:Int):sbmateriasraw
              
            }`
          