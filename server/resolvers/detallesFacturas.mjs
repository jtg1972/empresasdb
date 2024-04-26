
            import {Op} from 'sequelize'
            export default{
          detallesFacturas:{
              otmdetallesFacturassondetprod:async(parent,args,{db})=>{
                    const x=await db.sondetprod.findAll({
                      where:{otmdetallesFacturassondetprodId:parent.id},
                      raw:true
                    })
                    return x
                  },
              
            },
            Query:{
                detallesFacturas:async(parent,args,{db})=>{
                  const products=await db.detallesFacturas.findAll()
                  return products     
                }
              },Mutation:{
                
                createdetallesFacturas:async(parent,args,{db})=>{
                  const product=await db.detallesFacturas.create(args)
                  return product
                  
                },
               
                getDatadetallesFacturas:async(parent,args,{db})=>{
                  const products=await db.detallesFacturas.findAll({raw:true})
                  
                  return products
                },removedetallesFacturas:async(parent,args,{db})=>{
                      try{
                        const product=await db.detallesFacturas.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getdetallesFacturas:async(parent,args,{db})=>{
                  const resp=await db.detallesFacturas.findByPk(args.id)
                  return resp
                },
                editdetallesFacturas:async(parent,args,{db})=>{
              await db.detallesFacturas.update({
                        id:args["id"],otmfacturasdetallesFacturasId:args.otmfacturasdetallesFacturasId,cantidad:args.cantidad,precio:args.precio,otmdetallesFacturassondetprod:args.otmdetallesFacturassondetprod,producto:args.producto,atunes:args.atunes
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.detallesFacturas.findByPk(args.id)
                    return nuevo

                  }
                }
              }