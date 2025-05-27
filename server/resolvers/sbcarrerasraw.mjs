
            import {Op} from 'sequelize'
            export default{
          Query:{
                sbcarrerasraw:async(parent,args,{db})=>{
                  const products=await db.sbcarrerasraw.findAll()
                  return products     
                }
              },Mutation:{
                
                createsbcarrerasraw:async(parent,args,{db})=>{const product=await db.sbcarrerasraw.create(args)
                  return product
                  
                },
               
                getDatasbcarrerasraw:async(parent,args,{db})=>{
                  const products=await db.sbcarrerasraw.findAll({raw:true})
                  
                  return products
                },removesbcarrerasraw:async(parent,args,{db})=>{
                      try{
                        const product=await db.sbcarrerasraw.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getsbcarrerasraw:async(parent,args,{db})=>{
                  const resp=await db.sbcarrerasraw.findByPk(args.id)
                  return resp
                },
                editsbcarrerasraw:async(parent,args,{db})=>{
              let camposDate=[]
await db.sbcarrerasraw.update({
                        id:args["id"],carrera:args.carrera,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.sbcarrerasraw.findByPk(args.id)
                    return nuevo

                  }
                }
              }