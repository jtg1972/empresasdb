
            import {Op} from 'sequelize'
            export default{
          Query:{
                sbgrupos:async(parent,args,{db})=>{
                  const products=await db.sbgrupos.findAll()
                  return products     
                }
              },Mutation:{
                
                createsbgrupos:async(parent,args,{db})=>{const product=await db.sbgrupos.create(args)
                  return product
                  
                },
               
                getDatasbgrupos:async(parent,args,{db})=>{
                  const products=await db.sbgrupos.findAll({raw:true})
                  
                  return products
                },removesbgrupos:async(parent,args,{db})=>{
                      try{
                        const product=await db.sbgrupos.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getsbgrupos:async(parent,args,{db})=>{
                  const resp=await db.sbgrupos.findByPk(args.id)
                  return resp
                },
                editsbgrupos:async(parent,args,{db})=>{
              let camposDate=[]
await db.sbgrupos.update({
                        id:args["id"],clavedelgrupo:args.clavedelgrupo,grupoId:args.grupoId,otmsbmateriassbgruposId:args.otmsbmateriassbgruposId,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.sbgrupos.findByPk(args.id)
                    return nuevo

                  }
                }
              }