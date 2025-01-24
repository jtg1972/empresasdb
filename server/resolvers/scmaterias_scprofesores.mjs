
            import {Op} from 'sequelize'
            export default{
          Query:{
                scmaterias_scprofesores:async(parent,args,{db})=>{
                  const products=await db.scmaterias_scprofesores.findAll()
                  return products     
                }
              },Mutation:{
                
            getonedatamtmscmateriasscprofesores:async(parent,args,{db})=>{
              try{
                let product=await db.scmaterias_scprofesores.findAll({
                  where:{
                    mtmscprofesoresscmateriasId:args.mtmscprofesoresscmateriasId,
                    mtmscmateriasscprofesoresId:args.mtmscmateriasscprofesoresId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.scmaterias.findAll({
                  where:{
                    id:args.mtmscmateriasscprofesoresId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getonedatamtmscprofesoresscmaterias:async(parent,args,{db})=>{
              try{
                let product=await db.scmaterias_scprofesores.findAll({
                  where:{
                    mtmscprofesoresscmateriasId:args.mtmscprofesoresscmateriasId,
                    mtmscmateriasscprofesoresId:args.mtmscmateriasscprofesoresId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.scprofesores.findAll({
                  where:{
                    id:args.mtmscprofesoresscmateriasId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getdatamtmscmateriasscprofesores:async(parent,args,{db})=>{
              try{
                let products=await db.scmaterias_scprofesores.findAll({
                  where:{
                    mtmscprofesoresscmateriasId:args.mtmscprofesoresscmateriasId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmscmateriasscprofesoresId)
                let respProds=await db.scmaterias.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmscmateriasscprofesoresId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            getdatamtmscprofesoresscmaterias:async(parent,args,{db})=>{
              try{
                let products=await db.scmaterias_scprofesores.findAll({
                  where:{
                    mtmscmateriasscprofesoresId:args.mtmscmateriasscprofesoresId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmscprofesoresscmateriasId)
                let respProds=await db.scprofesores.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmscprofesoresscmateriasId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            createdatamtmscmateriasscprofesores:async(parent,args,{db})=>{
              try{
                let product=await db.scmaterias_scprofesores.create(args)
                product=product.dataValues
                let alumno=await db.scmaterias.findAll({
                  where:{
                    id:args.mtmscmateriasscprofesoresId
                  },
                  raw:true
                })
                return {...alumno[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            createdatamtmscprofesoresscmaterias:async(parent,args,{db})=>{
              try{
                let product=await db.scmaterias_scprofesores.create(args)
                product=product.dataValues
                let grupo=await db.scprofesores.findAll({
                  where:{
                    id:args.mtmscprofesoresscmateriasId
                  },
                  raw:true
                })
                return {...grupo[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },editdatamtmscmateriasscprofesores:async(parent,args,{db})=>{
              let rec=await db.scmaterias_scprofesores.update({
                

              },
              {
                where:{
                  mtmscmateriasscprofesoresId:args.mtmscmateriasscprofesoresId,
                  mtmscprofesoresscmateriasId:args.mtmscprofesoresscmateriasId
                }
              })
              let r2=await db.scmaterias_scprofesores.findAll({
                where:{
                  mtmscmateriasscprofesoresId:args.mtmscmateriasscprofesoresId,
                  mtmscprofesoresscmateriasId:args.mtmscprofesoresscmateriasId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.scmaterias.findAll({
                where:{id:args.mtmscmateriasscprofesoresId},
                raw:true
              })
              r1=r1[0]
              return {...r1,...r2}
            },
            editdatamtmscprofesoresscmaterias:async(parent,args,{db})=>{
              let rec=await db.scmaterias_scprofesores.update({
                

              },
              {
                where:{
                  mtmscmateriasscprofesoresId:args.mtmscmateriasscprofesoresId,
                  mtmscprofesoresscmateriasId:args.mtmscprofesoresscmateriasId
                }
              })
              let r2=await db.scmaterias_scprofesores.findAll({
                where:{
                  mtmscmateriasscprofesoresId:args.mtmscmateriasscprofesoresId,
                  mtmscprofesoresscmateriasId:args.mtmscprofesoresscmateriasId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.scprofesores.findAll({
                where:{id:args.mtmscprofesoresscmateriasId},
                raw:true
              })
              r1=r1[0]
              return {...r1,...r2}
            },
            
                createscmaterias_scprofesores:async(parent,args,{db})=>{const product=await db.scmaterias_scprofesores.create(args)
                  return product
                  
                },
               
                getDatascmaterias_scprofesores:async(parent,args,{db})=>{
                  const products=await db.scmaterias_scprofesores.findAll({raw:true})
                  
                  return products
                },removescmaterias_scprofesores:async(parent,args,{db})=>{
                  
              try{
                const products=await db.scmaterias_scprofesores.findOne({where:{
                  mtmscmateriasscprofesoresId:args.mtmscmateriasscprofesoresId,
                  mtmscprofesoresscmateriasId:args.mtmscprofesoresscmateriasId
                }})
                console.log("productsreciente",products)
                products.destroy()
              
                return true
              }catch(e){
                console.log("error",e)
                return false
              }
            },
            getscmaterias_scprofesores:async(parent,args,{db})=>{
                  const resp=await db.scmaterias_scprofesores.findByPk(args.id)
                  return resp
                },
                editscmaterias_scprofesores:async(parent,args,{db})=>{
              await db.scmaterias_scprofesores.update({
                        mtmscprofesoresscmateriasId:args.mtmscprofesoresscmateriasId,
mtmscmateriasscprofesoresId:args.mtmscmateriasscprofesoresId
                      },
                      {
                        where:{
                          mtmscprofesoresscmateriasId:args.mtmscprofesoresscmateriasId,
mtmscmateriasscprofesoresId:args.mtmscmateriasscprofesoresId
                        }
                      }
                    )
                  
                    let nuevo=await db.scmaterias_scprofesores.findAll({
                      where:{
                        mtmscprofesoresscmateriasId:args.mtmscprofesoresscmateriasId,
mtmscmateriasscprofesoresId:args.mtmscmateriasscprofesoresId
                      },raw:true
                    })
                    nuevo=nuevo[0]
                    return nuevo

                  }
                }
              }