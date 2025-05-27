
          import {gql} from 'apollo-server-express'

          export default gql`type sbgruposraw{
              
              id:Int
clavegrupo:String

            }

            type Query{
              sbgruposraw:[sbgruposraw]
              
              
            }
            type Mutation{
            
              createsbgruposraw(
                id:Int,
clavegrupo:String,

                ):sbgruposraw
              
              
              getDatasbgruposraw:[sbgruposraw]
removesbgruposraw(id:Int):Boolean!
editsbgruposraw(id:Int,
clavegrupo:String,
):sbgruposraw
              getsbgruposraw(id:Int):sbgruposraw
              
            }`
          