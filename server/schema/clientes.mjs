
          import {gql} from 'apollo-server-express'

          export default gql`

            
            type clientes{
              
              id:Int
otmclientesfacturas:[facturas]name:String
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
          