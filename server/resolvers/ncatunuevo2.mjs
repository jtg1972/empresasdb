
            export default{
              Query:{

                ncatunuevo2:async(parent,args,{db})=>{
                  const products=await db.ncatunuevo2.findAll()
                  return products     
                }
              },
              Mutation:{
                createncatunuevo2:async(parent,args,{db})=>{
                  const product=await db.ncatunuevo2.create(args)
                  return product
                },
                getDatancatunuevo2:async(parent,args,{db})=>{
                  const products=await db.ncatunuevo2.findAll({raw:true})
                  
                  return products
                },
                removencatunuevo2:async(parent,args,{db})=>{
                  try{
                    const product=await db.ncatunuevo2.findByPk(args.id)
                    product.destroy()
                    return true
                  }catch(e){
                    console.log("error",e)
                    return false
                  }
                },
                editncatunuevo2:async(parent,args,{db})=>{
              await db.ncatunuevo2.update({
                      id:args["id"],name:args["name"],ncatunnuevo2:args["ncatunnuevo2"],ncnvo3:args["ncnvo3"],agen1:args["agen1"],mojarras:args["mojarras"]
                    },
                    {
                    where:{id:args.id}
                    }
                  )
                
                  const nuevo=await db.ncatunuevo2.findByPk(args.id)
                  return nuevo

                }
              }
            }
          