
          import {gql} from 'apollo-server-express'

          export default gql`

            
            type facturas{
              
              id:Int
otmclientesfacturasId:Int
fecha:String
clave:String

            }

            type Query{
              facturas:[facturas]
              
              
            }
            type Mutation{
              createfacturas(
                id:Int,
otmclientesfacturasId:Int,
fecha:String,
clave:String,

                ):facturas
              getDatafacturas:[facturas]
              removefacturas(id:Int):Boolean!
              editfacturas(id:Int,
otmclientesfacturasId:Int,
fecha:String,
clave:String,
):facturas
              
            }`
          