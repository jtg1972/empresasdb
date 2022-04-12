
            export default{
              Query:{

                Mojarra:async(parent,args,{db})=>{
                  const products=await db.Mojarra.findAll()
                  return products     
                }
              },
              Mutation:{
                createMojarra:async(parent,args,{db})=>{
                  const product=await db.Mojarra.create(args)
                  return product
                },
                getDataMojarra:async(parent,args,{db})=>{
                  const products=await db.Mojarra.findAll()
                  return products     
                },
                deleteMojarra:async(parent,args,{db})=>{
                  try{
                    const product=await db.Mojarra.findByPk(args.id)
                    product.destroy()
                    return true
                  }catch(e){
                    console.log("error",e)
                    return false
                  }
                },
                editMojarra:async(parent,args,{db})=>{
              await db.Mojarra.update({
                      id:args["id"],name:args["name"],aletas:args["aletas"],color:args["color"],mojf1:args["mojf1"]
                    },
                    {
                    where:{id:args.id}
                    }
                  )
                
                  const nuevo=await db.Mojarra.findByPk(args.id)
                  return nuevo

                }
              }
            }
          