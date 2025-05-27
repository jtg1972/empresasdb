
            import {Op} from 'sequelize'
            export default{
          Query:{
                sbmateriasraw:async(parent,args,{db})=>{
                  const products=await db.sbmateriasraw.findAll()
                  return products     
                }
              },Mutation:{
                
                createsbmateriasraw:async(parent,args,{db})=>{const product=await db.sbmateriasraw.create(args)
                  return product
                  
                },
               
                getDatasbmateriasraw:async(parent,args,{db})=>{
                  const products=await db.sbmateriasraw.findAll({raw:true})
                  
                  return products
                },removesbmateriasraw:async(parent,args,{db})=>{
                      try{
                        const product=await db.sbmateriasraw.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getsbmateriasraw:async(parent,args,{db})=>{
                  const resp=await db.sbmateriasraw.findByPk(args.id)
                  return resp
                },
                editsbmateriasraw:async(parent,args,{db})=>{
              let camposDate=[]
await db.sbmateriasraw.update({
                        id:args["id"],materia:args.materia,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.sbmateriasraw.findByPk(args.id)
                    return nuevo

                  }
                }
              }