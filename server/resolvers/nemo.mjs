
            export default{
              Query:{

                nemo:async(parent,args,{db})=>{
                  const products=await db.nemo.findAll()
                  return products     
                }
              },
              Mutation:{
                createnemo:async(parent,args,{db})=>{
                  const product=await db.nemo.create(args)
                  return product
                },
                getDatanemo:async(parent,args,{db})=>{
                  const products=await db.nemo.findAll({raw:true})
                  
                  return products
                },
                removenemo:async(parent,args,{db})=>{
                  try{
                    const product=await db.nemo.findByPk(args.id)
                    product.destroy()
                    return true
                  }catch(e){
                    console.log("error",e)
                    return false
                  }
                },
                editnemo:async(parent,args,{db})=>{
              await db.nemo.update({
                      id:args["id"],name:args["name"]
                    },
                    {
                    where:{id:args.id}
                    }
                  )
                
                  const nuevo=await db.nemo.findByPk(args.id)
                  return nuevo

                }
              }
            }
          