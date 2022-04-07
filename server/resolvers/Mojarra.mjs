
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
                }
              }
            }
          