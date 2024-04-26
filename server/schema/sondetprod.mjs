
          import {gql} from 'apollo-server-express'

          export default gql`type sondetprod{
              
              id:Int
numeric1:Int
otmdetallesFacturassondetprodId:Int

            }

            type Query{
              sondetprod:[sondetprod]
              
              
            }
            type Mutation{
            
              createsondetprod(
                id:Int,
numeric1:Int,
otmdetallesFacturassondetprodId:Int,

                ):sondetprod
              
              
              getDatasondetprod:[sondetprod]
removesondetprod(id:Int):Boolean!
editsondetprod(id:Int,
numeric1:Int,
otmdetallesFacturassondetprodId:Int,
):sondetprod
              getsondetprod(id:Int):sondetprod
              
            }`
          