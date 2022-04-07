
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
                  const products=await db.atunconagua.findAll()
                  return products     
                }
              }
            }
          