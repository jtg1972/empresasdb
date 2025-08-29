
          import {gql} from 'apollo-server-express'

          export default gql`type datamtmsbprofesoressbarea{
                  nombre:String
registro:String
mtmsbareasbprofesores:[datamtmsbareasbprofesores]
mtmsbmateriassbprofesores:[datamtmsbmateriassbprofesores]
otmsbgrupossbprofesoresId:Int

id:Int
mtmsbprofesoressbareaId:Int
mtmsbareasbprofesoresId:Int
                  key:String
                  otherKey:String
                },type sbarea{
              
              id:Int
area:String
otmsbareasbcarreras:[sbcarreras]
otmsbareasbmaterias:[sbmaterias]
mtmsbprofesoressbarea:[datamtmsbprofesoressbarea],

              whereClauses:String
            }

            type Query{
              sbarea:[sbarea]
              
              
            }
            type Mutation{
            
              createsbarea(
                id:Int,
area:String,

                parentArg:String
                ):sbarea
              
              
              getDatasbarea(whereClauses:String):[sbarea]
removesbarea(id:Int,parentArg:String,
                  hardDelete:Boolean):Boolean!
editsbarea(id:Int,
area:String,
):sbarea
              getsbarea(id:Int):sbarea
              
            }`
          