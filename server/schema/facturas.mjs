
          import {gql} from 'apollo-server-express'

          export default gql`

            
            type facturas{
              
              id:Int
fecha:String
clave:String
clientesId:Int
otmfacturasdetallesFacturas:[detallesFacturas]
            }

            type Query{
              facturas:[facturas]
              
              
            }
            type Mutation{
              createfacturas(
                id:Int,
fecha:String,
clave:String,
clientesId:Int,

                ):facturas
              getDatafacturas:[facturas]
              removefacturas(id:Int):Boolean!
              editfacturas(id:Int,
fecha:String,
clave:String,
clientesId:Int,
):facturas
              
            }`
          