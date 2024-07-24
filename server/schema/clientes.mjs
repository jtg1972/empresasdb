
          import {gql} from 'apollo-server-express'
//otmclientesfacturas:[facturas]
          export default gql`

            
            type clientes{
              
              id:Int
otmclientestelefonos:[telefonos]
name:String
otmclientesfacturas:[facturas]
domicilio:String
telefono:String

            }

            type Query{
              clientes:[clientes]
              
              
            }
            type Mutation{
              createclientes(
                id:Int,
name:String,
domicilio:String,
telefono:String,

                ):clientes
              getDataclientes:[clientes]
              removeclientes(id:Int):Boolean!
              editclientes(id:Int,
name:String,
domicilio:String,
telefono:String,
):clientes
              
            }`
          