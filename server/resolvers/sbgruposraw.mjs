
            import {Op} from 'sequelize'
            export default{
          Query:{
                sbgruposraw:async(parent,args,{db})=>{
                  const products=await db.sbgruposraw.findAll()
                  return products     
                }
              },Mutation:{
                
                createsbgruposraw:async(parent,args,{db})=>{const product=await db.sbgruposraw.create(args)
                  return product
                  
                },
               
                getDatasbgruposraw:async(parent,args,{db})=>{
                  const products=await db.sbgruposraw.findAll({raw:true})
                  
                  return products
                },removesbgruposraw:async(parent,args,{db})=>{
                      try{
                        const product=await db.sbgruposraw.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getsbgruposraw:async(parent,args,{db})=>{
                  const resp=await db.sbgruposraw.findByPk(args.id)
                  return resp
                },
                editsbgruposraw:async(parent,args,{db})=>{
              let camposDate=[]
await db.sbgruposraw.update({
                        id:args["id"],clavegrupo:args.clavegrupo,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.sbgruposraw.findByPk(args.id)
                    return nuevo

                  }
                }
              }