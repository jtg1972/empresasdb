
            export default{
              Query:{

                atunconagua:async(parent,args,{db})=>{
                  const products=await db.atunconagua.findAll()
                  return products     
                }
              },
              Mutation:{
                createatunconagua:async(parent,args,{db})=>{
                  const product=await db.atunconagua.create(args)
                  return product
                },
                getDataatunconagua:async(parent,args,{db})=>{
                  const products=await db.atunconagua.findAll({raw:true})
                  
                  return products
                },
                removeatunconagua:async(parent,args,{db})=>{
                  try{
                    const product=await db.atunconagua.findByPk(args.id)
                    product.destroy()
                    return true
                  }catch(e){
                    console.log("error",e)
                    return false
                  }
                },
                editatunconagua:async(parent,args,{db})=>{
              await db.atunconagua.update({
                      id:args["id"],name:args["name"],calorias:args["calorias"],agen1:args["agen1"],fats:args["fats"],f1:args["f1"]
                    },
                    {
                    where:{id:args.id}
                    }
                  )
                
                  const nuevo=await db.atunconagua.findByPk(args.id)
                  return nuevo

                }
              }
            }
          