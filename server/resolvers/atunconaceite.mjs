
            export default{
          Query:{

                atunconaceite:async(parent,args,{db})=>{
                  const products=await db.atunconaceite.findAll()
                  return products     
                }
              },
              Mutation:{
                createatunconaceite:async(parent,args,{db})=>{
                  const product=await db.atunconaceite.create(args)
                  return product
                },
                getDataatunconaceite:async(parent,args,{db})=>{
                  const products=await db.atunconaceite.findAll({raw:true})
                  
                  return products
                },
                removeatunconaceite:async(parent,args,{db})=>{
                  try{
                    const product=await db.atunconaceite.findByPk(args.id)
                    product.destroy()
                    return true
                  }catch(e){
                    console.log("error",e)
                    return false
                  }
                },
                editatunconaceite:async(parent,args,{db})=>{
              await db.atunconaceite.update({
                      id:args["id"],name:args["name"],agen1:args["agen1"],precio:args["precio"]
                    },
                    {
                    where:{id:args.id}
                    }
                  )
                
                  const nuevo=await db.atunconaceite.findByPk(args.id)
                  return nuevo

                }
              }
            }
          