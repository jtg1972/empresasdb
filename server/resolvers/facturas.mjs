
            export default{
          Query:{

                facturas:async(parent,args,{db})=>{
                  const products=await db.facturas.findAll()
                  return products     
                }
              },
              Mutation:{
                createfacturas:async(parent,args,{db})=>{
                  const product=await db.facturas.create(args)
                  return product
                },
                getDatafacturas:async(parent,args,{db})=>{
                  const products=await db.facturas.findAll({raw:true})
                  
                  return products
                },
                removefacturas:async(parent,args,{db})=>{
                  try{
                    const product=await db.facturas.findByPk(args.id)
                    product.destroy()
                    return true
                  }catch(e){
                    console.log("error",e)
                    return false
                  }
                },
                editfacturas:async(parent,args,{db})=>{
              await db.facturas.update({
                      id:args["id"],clientesId:args["clientesId"],fecha:new Date(args["fecha"]),clave:args["clave"]
                    },
                    {
                    where:{id:args.id}
                    }
                  )
                
                  const nuevo=await db.facturas.findByPk(args.id)
                  return nuevo

                }
              }
            }
          