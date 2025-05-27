
            import {Op} from 'sequelize'
            export default{
          Query:{
                sbestudiantesraw:async(parent,args,{db})=>{
                  const products=await db.sbestudiantesraw.findAll()
                  return products     
                }
              },Mutation:{
                
                createsbestudiantesraw:async(parent,args,{db})=>{const product=await db.sbestudiantesraw.create(args)
                  return product
                  
                },
               
                getDatasbestudiantesraw:async(parent,args,{db})=>{
                  const products=await db.sbestudiantesraw.findAll({raw:true})
                  
                  return products
                },removesbestudiantesraw:async(parent,args,{db})=>{
                      try{
                        const product=await db.sbestudiantesraw.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getsbestudiantesraw:async(parent,args,{db})=>{
                  const resp=await db.sbestudiantesraw.findByPk(args.id)
                  return resp
                },
                editsbestudiantesraw:async(parent,args,{db})=>{
              let camposDate=[]
await db.sbestudiantesraw.update({
                        id:args["id"],nombre:args.nombre,boleta:args.boleta,incomingyear:args.incomingyear,semestertype:args.semestertype,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.sbestudiantesraw.findByPk(args.id)
                    return nuevo

                  }
                }
              }