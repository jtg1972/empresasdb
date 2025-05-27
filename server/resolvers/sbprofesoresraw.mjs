
            import {Op} from 'sequelize'
            export default{
          Query:{
                sbprofesoresraw:async(parent,args,{db})=>{
                  const products=await db.sbprofesoresraw.findAll()
                  return products     
                }
              },Mutation:{
                
                createsbprofesoresraw:async(parent,args,{db})=>{const product=await db.sbprofesoresraw.create(args)
                  return product
                  
                },
               
                getDatasbprofesoresraw:async(parent,args,{db})=>{
                  const products=await db.sbprofesoresraw.findAll({raw:true})
                  
                  return products
                },removesbprofesoresraw:async(parent,args,{db})=>{
                      try{
                        const product=await db.sbprofesoresraw.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getsbprofesoresraw:async(parent,args,{db})=>{
                  const resp=await db.sbprofesoresraw.findByPk(args.id)
                  return resp
                },
                editsbprofesoresraw:async(parent,args,{db})=>{
              let camposDate=[]
await db.sbprofesoresraw.update({
                        id:args["id"],nombre:args.nombre,registro:args.registro,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.sbprofesoresraw.findByPk(args.id)
                    return nuevo

                  }
                }
              }