
            export default{
          clientes:{
              otmclientesfacturas:async(parent,args,{db})=>{
                    const x=await db.facturas.findAll({
                      where:{otmclientesfacturasId:parent.id},
                      raw:true
                    })
                    return x
                  },otmclientestelefonos:async(parent,args,{db})=>{
                    const x=await db.telefonos.findAll({
                      where:{otmclientestelefonosId:parent.id},
                      raw:true
                    })
                    return x
                  },
            },
            Query:{

                clientes:async(parent,args,{db})=>{
                  const products=await db.clientes.findAll()
                  return products     
                }
              },
              Mutation:{
                createclientes:async(parent,args,{db})=>{
                  const product=await db.clientes.create(args)
                  return product
                },
                getDataclientes:async(parent,args,{db})=>{
                  const products=await db.clientes.findAll({raw:true})
                  
                  return products
                },
                removeclientes:async(parent,args,{db})=>{
                  try{
                    const product=await db.clientes.findByPk(args.id)
                    product.destroy()
                    return true
                  }catch(e){
                    console.log("error",e)
                    return false
                  }
                },
                editclientes:async(parent,args,{db})=>{
              await db.clientes.update({
                      id:args["id"],otmclientesfacturas:args["otmclientesfacturas"],otmclientestelefonos:args["otmclientestelefonos"],name:args["name"],domicilio:args["domicilio"],telefono:args["telefono"]
                    },
                    {
                    where:{id:args.id}
                    }
                  )
                
                  const nuevo=await db.clientes.findByPk(args.id)
                  return nuevo

                }
              }
            }
          