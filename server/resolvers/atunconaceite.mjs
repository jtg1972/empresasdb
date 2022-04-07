
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
                  const products=await db.atunconaceite.findAll()
                  return products     
                }
              }
            }
          