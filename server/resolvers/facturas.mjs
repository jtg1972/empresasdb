
            import {Op} from 'sequelize'
            import codifyRule from './../utils/whereClauses/index.mjs'
            export default{
          facturas:{
              otmfacturasdetallesFacturas:async(parent,args,{db})=>{
                    const x=await db.detallesFacturas.findAll({
                      where:{otmfacturasdetallesFacturasId:parent.id},
                      raw:true
                    })
                    return x
                  },
              
            },
            Query:{
                facturas:async(parent,args,{db})=>{
                  const products=await db.facturas.findAll()
                  return products     
                }
              },Mutation:{
                
                createfacturas:async(parent,args,{db})=>{
                  
                  if(new Date(args.invoiceDate)=="Invalid Date")
                    
                    args["invoiceDate"]=null
             


                  const product=await db.facturas.create(args)
                  
                  
                  return product
                  
                },
               
                getDatafacturas:async(parent,args,{db})=>{
                  /*const products=await db.facturas.findAll({raw:true})
                  
                  return products*/

                  if(args.whereClauses!=""){
                    console.log("nj",args.whereClauses,JSON.parse(args.whereClauses))
                    let nj=JSON.parse(args.whereClauses)
                    if(nj?.["facturas"]?.["main"]!=undefined && nj?.["facturas"]?.["main"]!="none"){
                      console.log("nj",nj)
                      //let getRules=gr(args.rules)
                      //let products=await db.sbarea.findAll({raw:true,where:nj["sbarea"]})
                      let products=await db.facturas.findAll({
                        where:{...codifyRule(JSON.parse(args.whereClauses),"facturas")},
                        raw:true})
                      products=products.map(x=>{
                        return {...x,whereClauses:args.whereClauses}
                      })
                      return products
                    }
                  }
                  
                  let products=await db.facturas.findAll({raw:true})
                  products=products.map(x=>{
                    return {...x,whereClauses:args.whereClauses}
                  })
                  return products
                 
                },removefacturas:async(parent,args,{db})=>{
                      try{
                        const product=await db.facturas.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getfacturas:async(parent,args,{db})=>{
                  const resp=await db.facturas.findByPk(args.id)
                  return resp
                },
            editfacturas:async(parent,args,{db})=>{
              let camposDate=[]
              if(new Date(args.invoiceDate)!="Invalid Date"){
                camposDate={...camposDate,invoiceDate:args.invoiceDate}
              }else
                camposDate={...camposDate,invoiceDate:null}
              


              await db.facturas.update({
                      id:args["id"],
                      otmclientesfacturasId:args.otmclientesfacturasId,
                      otmfacturasdetallesFacturas:args.otmfacturasdetallesFacturas,
                      clave:args.clave,
                      //invoiceDate:new Date(args.invoiceDate)!="Invalid date" || args.invoiceDate==undefined?
                      //new Date(args.invoiceDate):""
                      ...camposDate
                      //invoiceDate:null
                    },
                    {
                      where:{id:args.id}
                    }
              )
                  
              const nuevo=await db.facturas.findByPk(args.id)
              return nuevo

            }
          }
        }