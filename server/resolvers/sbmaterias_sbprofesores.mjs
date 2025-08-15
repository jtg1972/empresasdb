
            import {Op} from 'sequelize'
            export default{
          Query:{
                sbmaterias_sbprofesores:async(parent,args,{db})=>{
                  const products=await db.sbmaterias_sbprofesores.findAll()
                  return products     
                }
              },Mutation:{
                
            getonedatamtmsbmateriassbprofesores:async(parent,args,{db})=>{
              try{
                let product=await db.sbmaterias_sbprofesores.findAll({
                  where:{
                    mtmsbprofesoressbmateriasId:args.mtmsbprofesoressbmateriasId,
                    mtmsbmateriassbprofesoresId:args.mtmsbmateriassbprofesoresId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.sbmaterias.findAll({
                  where:{
                    id:args.mtmsbmateriassbprofesoresId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getonedatamtmsbprofesoressbmaterias:async(parent,args,{db})=>{
              try{
                let product=await db.sbmaterias_sbprofesores.findAll({
                  where:{
                    mtmsbprofesoressbmateriasId:args.mtmsbprofesoressbmateriasId,
                    mtmsbmateriassbprofesoresId:args.mtmsbmateriassbprofesoresId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.sbprofesores.findAll({
                  where:{
                    id:args.mtmsbprofesoressbmateriasId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getdatamtmsbmateriassbprofesores:async(parent,args,{db})=>{
              try{
                let products=await db.sbmaterias_sbprofesores.findAll({
                  where:{
                    mtmsbprofesoressbmateriasId:args.mtmsbprofesoressbmateriasId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmsbmateriassbprofesoresId)
                let respProds=await db.sbmaterias.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmsbmateriassbprofesoresId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            getdatamtmsbprofesoressbmaterias:async(parent,args,{db})=>{
              try{
                let products=await db.sbmaterias_sbprofesores.findAll({
                  where:{
                    mtmsbmateriassbprofesoresId:args.mtmsbmateriassbprofesoresId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmsbprofesoressbmateriasId)
                let respProds=await db.sbprofesores.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmsbprofesoressbmateriasId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            createdatamtmsbmateriassbprofesores:async(parent,args,{db})=>{
              try{
                let product=await db.sbmaterias_sbprofesores.create(args)
                product=product.dataValues
                let alumno=await db.sbmaterias.findAll({
                  where:{
                    id:args.mtmsbmateriassbprofesoresId
                  },
                  raw:true
                })
                let profesor=await db.sbprofesores.findAll({
                  where:{
                    id:args.mtmsbprofesoressbmateriasId
                  },
                  raw:true
                })
                console.log("resyovoy",product,alumno,profesor)
                return {original:{...alumno[0],...product,key:"mtmsbmateriassbprofesores"},
                copy:{...profesor[0],...product,key:"mtmsbprofesoressbmaterias"}}
              }catch(e){
                console.log("errorjor",e)
              }
            },
            createdatamtmsbprofesoressbmaterias:async(parent,args,{db})=>{
              try{
                let product=await db.sbmaterias_sbprofesores.create(args)
                product=product.dataValues
                let alumno=await db.sbprofesores.findAll({
                  where:{
                    id:args.mtmsbprofesoressbmateriasId
                  },
                  raw:true
                })
                let profesor=await db.sbmaterias.findAll({
                  where:{
                    id:args.mtmsbmateriassbprofesoresId
                  },
                  raw:true
                })
                console.log("resyovoy",product,alumno,profesor)
                return {original:{...alumno[0],...product,key:"mtmsbprofesoressbmaterias"},
                copy:{...profesor[0],...product,key:"mtmsbmateriassbprofesores"}}
              }catch(e){
                console.log("errorjor",e)
              }
            },editdatamtmsbmateriassbprofesores:async(parent,args,{db})=>{
              let rec=await db.sbmaterias_sbprofesores.update({
                

              },
              {
                where:{
                  mtmsbmateriassbprofesoresId:args.mtmsbmateriassbprofesoresId,
                  mtmsbprofesoressbmateriasId:args.mtmsbprofesoressbmateriasId
                }
              })
              let r2=await db.sbmaterias_sbprofesores.findAll({
                where:{
                  mtmsbmateriassbprofesoresId:args.mtmsbmateriassbprofesoresId,
                  mtmsbprofesoressbmateriasId:args.mtmsbprofesoressbmateriasId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.sbmaterias.findAll({
                where:{id:args.mtmsbmateriassbprofesoresId},
                raw:true
              })
              r1=r1[0]
              let r3=await db.sbprofesores.findAll({
                where:{id:args.mtmsbprofesoressbmateriasId},
                raw:true
              })
              r3=r3[0]


              return {
                original:{
                  
                    ...r1,
                    ...r2,
                  
                  key:"mtmsbmateriassbprofesores"
                },
                copy:{
                  
                    ...r3,
                    ...r2,
                  
                  key:"mtmsbprofesoressbmaterias"
                }
              }
            },
            editdatamtmsbprofesoressbmaterias:async(parent,args,{db})=>{
              let rec=await db.sbmaterias_sbprofesores.update({
                

              },
              {
                where:{
                  mtmsbmateriassbprofesoresId:args.mtmsbmateriassbprofesoresId,
                  mtmsbprofesoressbmateriasId:args.mtmsbprofesoressbmateriasId
                }
              })
              let r2=await db.sbmaterias_sbprofesores.findAll({
                where:{
                  mtmsbmateriassbprofesoresId:args.mtmsbmateriassbprofesoresId,
                  mtmsbprofesoressbmateriasId:args.mtmsbprofesoressbmateriasId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.sbprofesores.findAll({
                where:{id:args.mtmsbprofesoressbmateriasId},
                raw:true
              })
              r1=r1[0]
              let r3=await db.sbmaterias.findAll({
                where:{id:args.mtmsbmateriassbprofesoresId},
                raw:true
              })
              r3=r3[0]

              return {
                original:{
                  
                    ...r1,
                    ...r2,
                  
                  key:"mtmsbprofesoressbmaterias"
                },
                copy:{
                  
                    ...r3,
                    ...r2,
                  
                  key:"mtmsbmateriassbprofesores"
                }
              }
            },
            
                createsbmaterias_sbprofesores:async(parent,args,{db})=>{const product=await db.sbmaterias_sbprofesores.create(args)
                  return product
                  
                },
               
                getDatasbmaterias_sbprofesores:async(parent,args,{db})=>{
                  const products=await db.sbmaterias_sbprofesores.findAll({raw:true})
                  
                  return products
                },removesbmaterias_sbprofesores:async(parent,args,{db})=>{
                  
              try{
                const products=await db.sbmaterias_sbprofesores.findOne({where:{
                  mtmsbmateriassbprofesoresId:args.mtmsbmateriassbprofesoresId,
                  mtmsbprofesoressbmateriasId:args.mtmsbprofesoressbmateriasId
                }})
                console.log("productsreciente",products)
                products.destroy()
              
                return true
              }catch(e){
                console.log("error",e)
                return false
              }
            },
            getsbmaterias_sbprofesores:async(parent,args,{db})=>{
                  const resp=await db.sbmaterias_sbprofesores.findByPk(args.id)
                  return resp
                },
                editsbmaterias_sbprofesores:async(parent,args,{db})=>{
              await db.sbmaterias_sbprofesores.update({
                        mtmsbmateriassbprofesoresId:args.mtmsbmateriassbprofesoresId,
mtmsbprofesoressbmateriasId:args.mtmsbprofesoressbmateriasId
                      },
                      {
                        where:{
                          mtmsbmateriassbprofesoresId:args.mtmsbmateriassbprofesoresId,
mtmsbprofesoressbmateriasId:args.mtmsbprofesoressbmateriasId
                        }
                      }
                    )
                  
                    let nuevo=await db.sbmaterias_sbprofesores.findAll({
                      where:{
                        mtmsbmateriassbprofesoresId:args.mtmsbmateriassbprofesoresId,
mtmsbprofesoressbmateriasId:args.mtmsbprofesoressbmateriasId
                      },raw:true
                    })
                    nuevo=nuevo[0]
                    return nuevo

                  }
                }
              }