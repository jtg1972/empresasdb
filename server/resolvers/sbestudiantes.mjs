
            import {Op} from 'sequelize'
            export default{
          Query:{
                sbestudiantes:async(parent,args,{db})=>{
                  const products=await db.sbestudiantes.findAll()
                  return products     
                }
              },Mutation:{
                
                createsbestudiantes:async(parent,args,{db})=>{const product=await db.sbestudiantes.create(args)
                  return product
                  
                },
               
                getDatasbestudiantes:async(parent,args,{db})=>{
                  const products=await db.sbestudiantes.findAll({raw:true})
                  
                  return products
                },removesbestudiantes:async(parent,args,{db})=>{
                      try{
                        const product=await db.sbestudiantes.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getsbestudiantes:async(parent,args,{db})=>{
                  const resp=await db.sbestudiantes.findByPk(args.id)
                  return resp
                },
                editsbestudiantes:async(parent,args,{db})=>{
              let camposDate=[]
await db.sbestudiantes.update({
                        id:args["id"],nombre:args.nombre,boleta:args.boleta,incomingyear:args.incomingyear,semesterType:args.semesterType,estudianteId:args.estudianteId,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.sbestudiantes.findByPk(args.id)
                    return nuevo

                  }
                }
              }