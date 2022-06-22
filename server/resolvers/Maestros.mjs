
            import {Op} from 'sequelize'
            export default{
          Query:{

                Maestros:async(parent,args,{db})=>{
                  const products=await db.Maestros.findAll()
                  return products     
                }
              },
              Mutation:{
                createMaestros:async(parent,args,{db})=>{
                  const product=await db.Maestros.create(args)
                  return product
                },
                getDataMaestros:async(parent,args,{db})=>{
                  const products=await db.Maestros.findAll({raw:true})
                  
                  return products
                },
                removeMaestros:async(parent,args,{db})=>{
                  try{
                    const product=await db.Maestros.findByPk(args.id)
                    product.destroy()
                    return true
                  }catch(e){
                    console.log("error",e)
                    return false
                  }
                },
                editMaestros:async(parent,args,{db})=>{
              await db.Maestros.update({
                      id:args["id"],maestro:args["maestro"]
                    },
                    {
                    where:{id:args.id}
                    }
                  )
                
                  const nuevo=await db.Maestros.findByPk(args.id)
                  return nuevo

                }
              }
            }
          