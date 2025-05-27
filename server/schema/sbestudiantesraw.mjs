
          import {gql} from 'apollo-server-express'

          export default gql`type sbestudiantesraw{
              
              id:Int
nombre:String
boleta:String
incomingyear:Int
semestertype:String

            }

            type Query{
              sbestudiantesraw:[sbestudiantesraw]
              
              
            }
            type Mutation{
            
              createsbestudiantesraw(
                id:Int,
nombre:String,
boleta:String,
incomingyear:Int,
semestertype:String,

                ):sbestudiantesraw
              
              
              getDatasbestudiantesraw:[sbestudiantesraw]
removesbestudiantesraw(id:Int):Boolean!
editsbestudiantesraw(id:Int,
nombre:String,
boleta:String,
incomingyear:Int,
semestertype:String,
):sbestudiantesraw
              getsbestudiantesraw(id:Int):sbestudiantesraw
              
            }`
          