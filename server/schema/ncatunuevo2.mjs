
          import {gql} from 'apollo-server-express'

          export default gql`

            
            type ncatunuevo2{
              
              id:Int
name:String
ncatunnuevo2:String
ncnvo3:String
agen1:String
otmncatunuevo2Mojarra:[Mojarra]
            }

            type Query{
              ncatunuevo2:[ncatunuevo2]
              
              
            }
            type Mutation{
              createncatunuevo2(
                id:Int,
name:String,
ncatunnuevo2:String,
ncnvo3:String,
agen1:String,

                ):ncatunuevo2
              getDatancatunuevo2:[ncatunuevo2]
              removencatunuevo2(id:Int):Boolean!
              editncatunuevo2(id:Int,
name:String,
ncatunnuevo2:String,
ncnvo3:String,
agen1:String,
):ncatunuevo2
              
            }`
          