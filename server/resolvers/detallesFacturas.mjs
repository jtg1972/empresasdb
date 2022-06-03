
            export default{
          Query:{

                detallesFacturas:async(parent,args,{db})=>{
                  const products=await db.detallesFacturas.findAll()
                  return products     
                }
              },
              Mutation:{
                createdetallesFacturas:async(parent,args,{db})=>{
                  const product=await db.detallesFacturas.create(args)
                  return product
                },
                getDatadetallesFacturas:async(parent,args,{db})=>{
                  const products=await db.detallesFacturas.findAll({raw:true})
                  
                  return products
                },
                removedetallesFacturas:async(parent,args,{db})=>{
                  try{
                    const product=await db.detallesFacturas.findByPk(args.id)
                    product.destroy()
                    return true
                  }catch(e){
                    console.log("error",e)
                    return false
                  }
                },
                editdetallesFacturas:async(parent,args,{db})=>{
              await db.detallesFacturas.update({
                      id:args["id"],otmfacturasdetallesFacturasId:args["otmfacturasdetallesFacturasId"],producto:args["producto"],cantidad:args["cantidad"],precio:args["precio"],atunes:args["atunes"],mojarra:args["mojarra"]
                    },
                    {
                    where:{id:args.id}
                    }
                  )
                
                  const nuevo=await db.detallesFacturas.findByPk(args.id)
                  return nuevo

                }
              }
            }
          