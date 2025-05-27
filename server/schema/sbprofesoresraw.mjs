
          import {gql} from 'apollo-server-express'

          export default gql`type sbprofesoresraw{
              
              id:Int
nombre:String
registro:String

            }

            type Query{
              sbprofesoresraw:[sbprofesoresraw]
              
              
            }
            type Mutation{
            
              createsbprofesoresraw(
                id:Int,
nombre:String,
registro:String,

                ):sbprofesoresraw
              
              
              getDatasbprofesoresraw:[sbprofesoresraw]
removesbprofesoresraw(id:Int):Boolean!
editsbprofesoresraw(id:Int,
nombre:String,
registro:String,
):sbprofesoresraw
              getsbprofesoresraw(id:Int):sbprofesoresraw
              
            }`
          