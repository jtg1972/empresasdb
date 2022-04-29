
          import {gql} from 'apollo-server-express'

          export default gql`

            
            type detallesFacturas{
              
              id:Int
producto:Int
cantidad:Int
precio:Int
facturasId:Int

            }

            type Query{
              detallesFacturas:[detallesFacturas]
              
              
            }
            type Mutation{
              createdetallesFacturas(
                id:Int,
producto:Int,
cantidad:Int,
precio:Int,
facturasId:Int,

                ):detallesFacturas
              getDatadetallesFacturas:[detallesFacturas]
              removedetallesFacturas(id:Int):Boolean!
              editdetallesFacturas(id:Int,
producto:Int,
cantidad:Int,
precio:Int,
facturasId:Int,
):detallesFacturas
              
            }`
          