
          import {gql} from 'apollo-server-express'

          export default gql`

            
            type telefonos{
              
              id:Int
telefono:String
otmclientestelefonosId:Int

            }

            type Query{
              telefonos:[telefonos]
              
              
            }
            type Mutation{
              createtelefonos(
                id:Int,
telefono:String,
otmclientestelefonosId:Int,

                ):telefonos
              getDatatelefonos:[telefonos]
              removetelefonos(id:Int):Boolean!
              edittelefonos(id:Int,
telefono:String,
otmclientestelefonosId:Int,
):telefonos
              
            }`
          