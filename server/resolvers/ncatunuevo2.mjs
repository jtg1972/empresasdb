
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
                  const products=await db.ncatunuevo2.findAll()
                  return products     
                }
              }
            }
          