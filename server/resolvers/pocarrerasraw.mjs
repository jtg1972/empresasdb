
            import {Op} from 'sequelize'
            export default{
          pocarrerasraw:{
              otmpocarrerasrawpomateriasraw:async(parent,args,{db})=>{
                    const x=await db.pomateriasraw.findAll({
                      where:{otmpocarrerasrawpomateriasrawId:parent.id},
                      raw:true
                    })
                    
                    return x
                  },
              
            },
            Query:{
                pocarrerasraw:async(parent,args,{db})=>{
                  const products=await db.pocarrerasraw.findAll()
                  return products     
                }
              },Mutation:{
                
                createpocarrerasraw:async(parent,args,{db})=>{const product=await db.pocarrerasraw.create(args)
                  return product
                  
                },
               
                getDatapocarrerasraw:async(parent,args,{db})=>{
                  const products=await db.pocarrerasraw.findAll({raw:true})
                  
                  return products
                },removepocarrerasraw:async(parent,args,{db})=>{
                      try{
                        const product=await db.pocarrerasraw.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getpocarrerasraw:async(parent,args,{db})=>{
                  const resp=await db.pocarrerasraw.findByPk(args.id)
                  return resp
                },
                editpocarrerasraw:async(parent,args,{db})=>{
              let camposDate=[]
await db.pocarrerasraw.update({
                        id:args["id"],carrera:args.carrera,yearcreated:args.yearcreated,otmpocarrerasrawpomateriasraw:args.otmpocarrerasrawpomateriasraw,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.pocarrerasraw.findByPk(args.id)
                    return nuevo

                  }
                }
              }