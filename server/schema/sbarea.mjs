
          import {gql} from 'apollo-server-express'

          export default gql`type originalmtmsbprofesoressbarea{
                  nombre:String
registro:String


id:Int
mtmsbareasbprofesores:[datamtmsbareasbprofesores]
mtmsbprofesoressbareaId:Int
mtmsbareasbprofesoresId:Int
                  key:String
                    
      
                }
                type copymtmsbprofesoressbarea{
                  area:String



id:Int
mtmsbprofesoressbareaId:Int
mtmsbareasbprofesoresId:Int
                  key:String
                }
                type datamtmsbprofesoressbarea{
                  original:originalmtmsbprofesoressbarea
                  copy:copymtmsbprofesoressbarea
                  
                }
                type sbarea{
              
              id:Int
area:String
otmsbareasbcarreras:[sbcarreras]
otmsbareasbmaterias:[sbmaterias]
mtmsbprofesoressbarea:[datamtmsbprofesoressbarea],

            }

            type Query{
              sbarea:[sbarea]
              
              
            }
            type Mutation{
            
              createsbarea(
                id:Int,
area:String,

                ):sbarea
              
              
              getDatasbarea:[sbarea]
removesbarea(id:Int):Boolean!
editsbarea(id:Int,
area:String,
):sbarea
              getsbarea(id:Int):sbarea
              
            }`
          