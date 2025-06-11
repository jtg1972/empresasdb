
            import {Op} from 'sequelize'
            export default{
          Query:{
                sbarea_sbprofesores:async(parent,args,{db})=>{
                  const products=await db.sbarea_sbprofesores.findAll()
                  return products     
                }
              },Mutation:{
                
            getonedatamtmsbareasbprofesores:async(parent,args,{db})=>{
              try{
                let product=await db.sbarea_sbprofesores.findAll({
                  where:{
                    mtmsbprofesoressbareaId:args.mtmsbprofesoressbareaId,
                    mtmsbareasbprofesoresId:args.mtmsbareasbprofesoresId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.sbarea.findAll({
                  where:{
                    id:args.mtmsbareasbprofesoresId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getonedatamtmsbprofesoressbarea:async(parent,args,{db})=>{
              try{
                let product=await db.sbarea_sbprofesores.findAll({
                  where:{
                    mtmsbprofesoressbareaId:args.mtmsbprofesoressbareaId,
                    mtmsbareasbprofesoresId:args.mtmsbareasbprofesoresId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.sbprofesores.findAll({
                  where:{
                    id:args.mtmsbprofesoressbareaId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getdatamtmsbareasbprofesores:async(parent,args,{db})=>{
              try{
                let products=await db.sbarea_sbprofesores.findAll({
                  where:{
                    mtmsbprofesoressbareaId:args.mtmsbprofesoressbareaId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmsbareasbprofesoresId)
                let respProds=await db.sbarea.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmsbareasbprofesoresId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            getdatamtmsbprofesoressbarea:async(parent,args,{db})=>{
              try{
                let products=await db.sbarea_sbprofesores.findAll({
                  where:{
                    mtmsbareasbprofesoresId:args.mtmsbareasbprofesoresId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmsbprofesoressbareaId)
                let respProds=await db.sbprofesores.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmsbprofesoressbareaId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            createdatamtmsbareasbprofesores:async(parent,args,{db})=>{
              try{
                let product=await db.sbarea_sbprofesores.create(args)
                product=product.dataValues
                let alumno=await db.sbarea.findAll({
                  where:{
                    id:args.mtmsbareasbprofesoresId
                  },
                  raw:true
                })
                let profesor=await db.sbprofesores.findAll({
                  where:{
                    id:args.mtmsbprofesoressbareaId
                  },
                  raw:true
                })
                console.log("resyovoy",product,alumno,profesor)
                return {original:{...alumno[0],...product,key:"mtmsbareasbprofesores"},
                copy:{...profesor[0],...product,key:"mtmsbprofesoressbarea"}}
              }catch(e){
                console.log("error",e)
              }
            },
            createdatamtmsbprofesoressbarea:async(parent,args,{db})=>{
              try{
                let product=await db.sbarea_sbprofesores.create(args)
                product=product.dataValues
                let alumno=await db.sbprofesores.findAll({
                  where:{
                    id:args.mtmsbprofesoressbareaId
                  },
                  raw:true
                })
                let profesor=await db.sbarea.findAll({
                  where:{
                    id:args.mtmsbareasbprofesoresId
                  },
                  raw:true
                })
                console.log("resyovoy",product,alumno,profesor)
                return {original:{...alumno[0],...product,key:"mtmsbprofesoressbarea"},
                copy:{...profesor[0],...product,key:"mtmsbareasbprofesores"}}
              }catch(e){
                console.log("error",e)
              }
            },editdatamtmsbareasbprofesores:async(parent,args,{db})=>{
              let rec=await db.sbarea_sbprofesores.update({
                

              },
              {
                where:{
                  mtmsbareasbprofesoresId:args.mtmsbareasbprofesoresId,
                  mtmsbprofesoressbareaId:args.mtmsbprofesoressbareaId
                }
              })
              let r2=await db.sbarea_sbprofesores.findAll({
                where:{
                  mtmsbareasbprofesoresId:args.mtmsbareasbprofesoresId,
                  mtmsbprofesoressbareaId:args.mtmsbprofesoressbareaId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.sbarea.findAll({
                where:{id:args.mtmsbareasbprofesoresId},
                raw:true
              })
              r1=r1[0]
              let r3=await db.sbprofesores.findAll({
                where:{id:args.mtmsbprofesoressbareaId},
                raw:true
              })
              r3=r3[0]


              return {
                original:{
                  
                    ...r1,
                    ...r2,
                  
                  key:"mtmsbareasbprofesores"
                },
                copy:{
                  
                    ...r3,
                    ...r2,
                  
                  key:"mtmsbprofesoressbarea"
                }
              }
            },
            editdatamtmsbprofesoressbarea:async(parent,args,{db})=>{
              let rec=await db.sbarea_sbprofesores.update({
                

              },
              {
                where:{
                  mtmsbareasbprofesoresId:args.mtmsbareasbprofesoresId,
                  mtmsbprofesoressbareaId:args.mtmsbprofesoressbareaId
                }
              })
              let r2=await db.sbarea_sbprofesores.findAll({
                where:{
                  mtmsbareasbprofesoresId:args.mtmsbareasbprofesoresId,
                  mtmsbprofesoressbareaId:args.mtmsbprofesoressbareaId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.sbprofesores.findAll({
                where:{id:args.mtmsbprofesoressbareaId},
                raw:true
              })
              r1=r1[0]
              let r3=await db.sbarea.findAll({
                where:{id:args.mtmsbareasbprofesoresId},
                raw:true
              })
              r3=r3[0]

              return {
                original:{
                  
                    ...r1,
                    ...r2,
                  
                  key:"mtmsbprofesoressbarea"
                },
                copy:{
                  
                    ...r3,
                    ...r2,
                  
                  key:"mtmsbareasbprofesores"
                }
              }
            },
            
                createsbarea_sbprofesores:async(parent,args,{db})=>{const product=await db.sbarea_sbprofesores.create(args)
                  return product
                  
                },
               
                getDatasbarea_sbprofesores:async(parent,args,{db})=>{
                  const products=await db.sbarea_sbprofesores.findAll({raw:true})
                  
                  return products
                },removesbarea_sbprofesores:async(parent,args,{db})=>{
                  
              try{
                const products=await db.sbarea_sbprofesores.findOne({where:{
                  mtmsbareasbprofesoresId:args.mtmsbareasbprofesoresId,
                  mtmsbprofesoressbareaId:args.mtmsbprofesoressbareaId
                }})
                console.log("productsreciente",products)
                products.destroy()
              
                return true
              }catch(e){
                console.log("error",e)
                return false
              }
            },
            getsbarea_sbprofesores:async(parent,args,{db})=>{
                  const resp=await db.sbarea_sbprofesores.findByPk(args.id)
                  return resp
                },
                editsbarea_sbprofesores:async(parent,args,{db})=>{
              await db.sbarea_sbprofesores.update({
                        mtmsbareasbprofesoresId:args.mtmsbareasbprofesoresId,
mtmsbprofesoressbareaId:args.mtmsbprofesoressbareaId
                      },
                      {
                        where:{
                          mtmsbareasbprofesoresId:args.mtmsbareasbprofesoresId,
mtmsbprofesoressbareaId:args.mtmsbprofesoressbareaId
                        }
                      }
                    )
                  
                    let nuevo=await db.sbarea_sbprofesores.findAll({
                      where:{
                        mtmsbareasbprofesoresId:args.mtmsbareasbprofesoresId,
mtmsbprofesoressbareaId:args.mtmsbprofesoressbareaId
                      },raw:true
                    })
                    nuevo=nuevo[0]
                    return nuevo

                  }
                }
              }