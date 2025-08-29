
            import {Op} from 'sequelize'
            import codifyRule from './../utils/whereClauses/index.mjs'
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
                  /*const products=await db.detallesFacturas.findAll({raw:true})
                  
                  return products*/
                  if(args.whereClauses!=""){
                    console.log("nj",args.whereClauses,JSON.parse(args.whereClauses))
                    let nj=JSON.parse(args.whereClauses)
                    if(nj?.["detallesFacturas"]?.["main"]!=undefined && nj?.["detallesFacturas"]?.["main"]!="none"){
                      console.log("nj",nj)
                      //let getRules=gr(args.rules)
                      //let products=await db.sbarea.findAll({raw:true,where:nj["sbarea"]})
                      let products=await db.detallesFacturas.findAll({
                        where:{...codifyRule(JSON.parse(args.whereClauses),"detallesFacturas")},
                        raw:true})
                      products=products.map(x=>{
                        return {...x,whereClauses:args.whereClauses}
                      })
                      return products
                    }
                  }
                  
                  let products=await db.detallesFacturas.findAll({raw:true})
                  products=products.map(x=>{
                    return {...x,whereClauses:args.whereClauses}
                  })
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