
          import {gql} from 'apollo-server-express'

          export default gql`
            type ncatunuevo2{
                id:Int!
              name:String
price:Int
tamano:String
ncatunnuevo2:String
ncnvo3:String
agen1:String

            }

            type Query{
              ncatunuevo2:[ncatunuevo2]
              
            }
            type Mutation{
              createncatunuevo2(
                name:String,
price:Int,
tamano:String,
ncatunnuevo2:String,
ncnvo3:String,
agen1:String,

                ):ncatunuevo2
              getDatancatunuevo2:[ncatunuevo2]
              
              
            }`
          