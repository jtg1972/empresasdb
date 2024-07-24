
            import {Op} from 'sequelize'
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
                  const products=await db.facturas.findAll({raw:true})
                  
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