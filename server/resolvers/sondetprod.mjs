
            import {Op} from 'sequelize'
            export default{
          Query:{
                sondetprod:async(parent,args,{db})=>{
                  const products=await db.sondetprod.findAll()
                  return products     
                }
              },Mutation:{
                
                createsondetprod:async(parent,args,{db})=>{
                  const product=await db.sondetprod.create(args)
                  return product
                  
                },
               
                getDatasondetprod:async(parent,args,{db})=>{
                  const products=await db.sondetprod.findAll({raw:true})
                  
                  return products
                },removesondetprod:async(parent,args,{db})=>{
                      try{
                        const product=await db.sondetprod.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getsondetprod:async(parent,args,{db})=>{
                  const resp=await db.sondetprod.findByPk(args.id)
                  return resp
                },
                editsondetprod:async(parent,args,{db})=>{
              await db.sondetprod.update({
                        id:args["id"],numeric1:args.numeric1,otmdetallesFacturassondetprodId:args.otmdetallesFacturassondetprodId
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.sondetprod.findByPk(args.id)
                    return nuevo

                  }
                }
              }