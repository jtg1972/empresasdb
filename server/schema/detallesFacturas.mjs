
          import {gql} from 'apollo-server-express'

          export default gql`

            
            type detallesFacturas{
              
              id:Int
otmfacturasdetallesFacturasId:Int
producto:Int
cantidad:Int
precio:Int
atunesGlobalCatQuery:Int
atunesFinalCatQuery:Int
atunesProductQuery:Int
mojarraGlobalCatQuery:Int
mojarraFinalCatQuery:Int
mojarraProductQuery:Int

            }

            type Query{
              detallesFacturas:[detallesFacturas]
              
              
            }
            type Mutation{
              createdetallesFacturas(
                id:Int,
otmfacturasdetallesFacturasId:Int,
producto:Int,
cantidad:Int,
precio:Int,
atunesGlobalCatQuery:Int,
atunesFinalCatQuery:Int,
atunesProductQuery:Int
,mojarraGlobalCatQuery:Int,
mojarraFinalCatQuery:Int,
mojarraProductQuery:Int
,
                ):detallesFacturas
              getDatadetallesFacturas:[detallesFacturas]
              removedetallesFacturas(id:Int):Boolean!
              editdetallesFacturas(id:Int,
otmfacturasdetallesFacturasId:Int,
producto:Int,
cantidad:Int,
precio:Int,
atunesGlobalCatQuery:Int,
atunesFinalCatQuery:Int,
atunesProductQuery:Int
,mojarraGlobalCatQuery:Int,
mojarraFinalCatQuery:Int,
mojarraProductQuery:Int
,):detallesFacturas
              
            }`
          