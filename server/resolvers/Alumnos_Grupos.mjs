
            import {Op} from 'sequelize'
            export default{
          Query:{

                Alumnos_Grupos:async(parent,args,{db})=>{
                  const products=await db.Alumnos_Grupos.findAll()
                  return products     
                }
              },
              Mutation:{
                createAlumnos_Grupos:async(parent,args,{db})=>{
                  const product=await db.Alumnos_Grupos.create(args)
                  return product
                },
                getDataAlumnos_Grupos:async(parent,args,{db})=>{
                  const products=await db.Alumnos_Grupos.findAll({raw:true})
                  
                  return products
                },
                removeAlumnos_Grupos:async(parent,args,{db})=>{
                  try{
                    const product=await db.Alumnos_Grupos.findByPk(args.id)
                    product.destroy()
                    return true
                  }catch(e){
                    console.log("error",e)
                    return false
                  }
                },
                editAlumnos_Grupos:async(parent,args,{db})=>{
              await db.Alumnos_Grupos.update({
                      id:args["id"],mtmAlumnosGruposId:args["mtmAlumnosGruposId"],mtmGruposAlumnosId:args["mtmGruposAlumnosId"]
                    },
                    {
                    where:{id:args.id}
                    }
                  )
                
                  const nuevo=await db.Alumnos_Grupos.findByPk(args.id)
                  return nuevo

                }
              }
            }
          