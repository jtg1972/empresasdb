
            import {Op} from 'sequelize'
            export default{
          Query:{
                scareas_scprofesores:async(parent,args,{db})=>{
                  const products=await db.scareas_scprofesores.findAll()
                  return products     
                }
              },Mutation:{
                
            getonedatamtmscareasscprofesores:async(parent,args,{db})=>{
              try{
                let product=await db.scareas_scprofesores.findAll({
                  where:{
                    mtmscprofesoresscareasId:args.mtmscprofesoresscareasId,
                    mtmscareasscprofesoresId:args.mtmscareasscprofesoresId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.scareas.findAll({
                  where:{
                    id:args.mtmscareasscprofesoresId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getonedatamtmscprofesoresscareas:async(parent,args,{db})=>{
              try{
                let product=await db.scareas_scprofesores.findAll({
                  where:{
                    mtmscprofesoresscareasId:args.mtmscprofesoresscareasId,
                    mtmscareasscprofesoresId:args.mtmscareasscprofesoresId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.scprofesores.findAll({
                  where:{
                    id:args.mtmscprofesoresscareasId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getdatamtmscareasscprofesores:async(parent,args,{db})=>{
              try{
                let products=await db.scareas_scprofesores.findAll({
                  where:{
                    mtmscprofesoresscareasId:args.mtmscprofesoresscareasId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmscareasscprofesoresId)
                let respProds=await db.scareas.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmscareasscprofesoresId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            getdatamtmscprofesoresscareas:async(parent,args,{db})=>{
              try{
                let products=await db.scareas_scprofesores.findAll({
                  where:{
                    mtmscareasscprofesoresId:args.mtmscareasscprofesoresId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmscprofesoresscareasId)
                let respProds=await db.scprofesores.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmscprofesoresscareasId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            createdatamtmscareasscprofesores:async(parent,args,{db})=>{
              try{
                let product=await db.scareas_scprofesores.create(args)
                product=product.dataValues
                let alumno=await db.scareas.findAll({
                  where:{
                    id:args.mtmscareasscprofesoresId
                  },
                  raw:true
                })
                let profesor=await db.scprofesores.findAll({
                 where:{id:args.mtmscprofesoresscareasId
                },
                raw:true})
                return {...alumno[0],...product}
               
                
              }catch(e){
                console.log("error",e)
              }
            },
            createdatamtmscprofesoresscareas:async(parent,args,{db})=>{
              try{
                let product=await db.scareas_scprofesores.create(args)
                product=product.dataValues
                let grupo=await db.scprofesores.findAll({
                  where:{
                    id:args.mtmscprofesoresscareasId
                  },
                  raw:true
                })
                return {...grupo[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },editdatamtmscareasscprofesores:async(parent,args,{db})=>{
              let rec=await db.scareas_scprofesores.update({
                

              },
              {
                where:{
                  mtmscareasscprofesoresId:args.mtmscareasscprofesoresId,
                  mtmscprofesoresscareasId:args.mtmscprofesoresscareasId
                }
              })
              let r2=await db.scareas_scprofesores.findAll({
                where:{
                  mtmscareasscprofesoresId:args.mtmscareasscprofesoresId,
                  mtmscprofesoresscareasId:args.mtmscprofesoresscareasId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.scareas.findAll({
                where:{id:args.mtmscareasscprofesoresId},
                raw:true
              })
              r1=r1[0]
              return {...r1,...r2}
            },
            editdatamtmscprofesoresscareas:async(parent,args,{db})=>{
              let rec=await db.scareas_scprofesores.update({
                

              },
              {
                where:{
                  mtmscareasscprofesoresId:args.mtmscareasscprofesoresId,
                  mtmscprofesoresscareasId:args.mtmscprofesoresscareasId
                }
              })
              let r2=await db.scareas_scprofesores.findAll({
                where:{
                  mtmscareasscprofesoresId:args.mtmscareasscprofesoresId,
                  mtmscprofesoresscareasId:args.mtmscprofesoresscareasId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.scprofesores.findAll({
                where:{id:args.mtmscprofesoresscareasId},
                raw:true
              })
              r1=r1[0]
              return {...r1,...r2}
            },
            
                createscareas_scprofesores:async(parent,args,{db})=>{const product=await db.scareas_scprofesores.create(args)
                  return product
                  
                },
               
                getDatascareas_scprofesores:async(parent,args,{db})=>{
                  const products=await db.scareas_scprofesores.findAll({raw:true})
                  
                  return products
                },removescareas_scprofesores:async(parent,args,{db})=>{
                  
              try{
                const products=await db.scareas_scprofesores.findOne({where:{
                  mtmscareasscprofesoresId:args.mtmscareasscprofesoresId,
                  mtmscprofesoresscareasId:args.mtmscprofesoresscareasId
                }})
                console.log("productsreciente",products)
                products.destroy()
              
                return true
              }catch(e){
                console.log("error",e)
                return false
              }
            },
            getscareas_scprofesores:async(parent,args,{db})=>{
                  const resp=await db.scareas_scprofesores.findByPk(args.id)
                  return resp
                },
                editscareas_scprofesores:async(parent,args,{db})=>{
              await db.scareas_scprofesores.update({
                        mtmscprofesoresscareasId:args.mtmscprofesoresscareasId,
mtmscareasscprofesoresId:args.mtmscareasscprofesoresId
                      },
                      {
                        where:{
                          mtmscprofesoresscareasId:args.mtmscprofesoresscareasId,
mtmscareasscprofesoresId:args.mtmscareasscprofesoresId
                        }
                      }
                    )
                  
                    let nuevo=await db.scareas_scprofesores.findAll({
                      where:{
                        mtmscprofesoresscareasId:args.mtmscprofesoresscareasId,
mtmscareasscprofesoresId:args.mtmscareasscprofesoresId
                      },raw:true
                    })
                    nuevo=nuevo[0]
                    return nuevo

                  }
                }
              }