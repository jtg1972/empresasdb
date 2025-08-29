
          import {gql} from 'apollo-server-express'

          export default gql`type detallesFacturas{
              
              id:Int
otmfacturasdetallesFacturasId:Int
cantidad:Int
precio:Int
otmdetallesFacturassondetprod:[sondetprod]
producto:String
atunesGlobalCatQuery:Int
atunesFinalCatQuery:Int
atunesProductQuery:Int

            }

            type Query{
              detallesFacturas:[detallesFacturas]
              
              
            }
            type Mutation{
            
              createdetallesFacturas(
                id:Int,
otmfacturasdetallesFacturasId:Int,
cantidad:Int,
precio:Int,
producto:String,
atunesGlobalCatQuery:Int,
atunesFinalCatQuery:Int,
atunesProductQuery:Int
,
                ):detallesFacturas
              
              
              getDatadetallesFacturas(whereClauses:String):[detallesFacturas]
removedetallesFacturas(id:Int):Boolean!
editdetallesFacturas(id:Int,
otmfacturasdetallesFacturasId:Int,
cantidad:Int,
precio:Int,
producto:String,
atunesGlobalCatQuery:Int,
atunesFinalCatQuery:Int,
atunesProductQuery:Int
,):detallesFacturas
              getdetallesFacturas(id:Int):detallesFacturas
              
            }`
          