
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
                  console.log("prod",products)
                  /*const fp=products.map(p=>{
                    let obj={}
                    for(let f in p){
                      if(typeof p[f]==='object')
                        obj[f]=JSON.stringify(p[f])
                      else
                        obj[f]=p[f]
                    }
                    console.log("obj",obj)
                    return obj
                  })
                  return fp*/
                  return products
                },
                deleteatunconagua:async(parent,args,{db})=>{
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
                      name:args["name"],
                      calorias:args["calorias"],
                      agen1:args["agen1"],
                      date1:new Date(args["date1"]).toISOString(),
                      fats:args["fats"],f1:args["f1"]
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
          