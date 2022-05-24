
            export default{
          Query:{

                telefonos:async(parent,args,{db})=>{
                  const products=await db.telefonos.findAll()
                  return products     
                }
              },
              Mutation:{
                createtelefonos:async(parent,args,{db})=>{
                  const product=await db.telefonos.create(args)
                  return product
                },
                getDatatelefonos:async(parent,args,{db})=>{
                  const products=await db.telefonos.findAll({raw:true})
                  
                  return products
                },
                removetelefonos:async(parent,args,{db})=>{
                  try{
                    const product=await db.telefonos.findByPk(args.id)
                    product.destroy()
                    return true
                  }catch(e){
                    console.log("error",e)
                    return false
                  }
                },
                edittelefonos:async(parent,args,{db})=>{
              await db.telefonos.update({
                      id:args["id"],telefono:args["telefono"],otmclientestelefonosId:args["otmclientestelefonosId"]
                    },
                    {
                    where:{id:args.id}
                    }
                  )
                
                  const nuevo=await db.telefonos.findByPk(args.id)
                  return nuevo

                }
              }
            }
          