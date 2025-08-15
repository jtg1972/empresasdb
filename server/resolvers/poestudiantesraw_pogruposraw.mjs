
            import {Op} from 'sequelize'
            export default{
          Query:{
                poestudiantesraw_pogruposraw:async(parent,args,{db})=>{
                  const products=await db.poestudiantesraw_pogruposraw.findAll()
                  return products     
                }
              },Mutation:{
                
            getonedatamtmpoestudiantesrawpogruposraw:async(parent,args,{db})=>{
              try{
                let product=await db.poestudiantesraw_pogruposraw.findAll({
                  where:{
                    mtmpogruposrawpoestudiantesrawId:args.mtmpogruposrawpoestudiantesrawId,
                    mtmpoestudiantesrawpogruposrawId:args.mtmpoestudiantesrawpogruposrawId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.poestudiantesraw.findAll({
                  where:{
                    id:args.mtmpoestudiantesrawpogruposrawId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getonedatamtmpogruposrawpoestudiantesraw:async(parent,args,{db})=>{
              try{
                let product=await db.poestudiantesraw_pogruposraw.findAll({
                  where:{
                    mtmpogruposrawpoestudiantesrawId:args.mtmpogruposrawpoestudiantesrawId,
                    mtmpoestudiantesrawpogruposrawId:args.mtmpoestudiantesrawpogruposrawId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.pogruposraw.findAll({
                  where:{
                    id:args.mtmpogruposrawpoestudiantesrawId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getdatamtmpoestudiantesrawpogruposraw:async(parent,args,{db})=>{
              try{
                let products=await db.poestudiantesraw_pogruposraw.findAll({
                  where:{
                    mtmpogruposrawpoestudiantesrawId:args.mtmpogruposrawpoestudiantesrawId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmpoestudiantesrawpogruposrawId)
                let respProds=await db.poestudiantesraw.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmpoestudiantesrawpogruposrawId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            getdatamtmpogruposrawpoestudiantesraw:async(parent,args,{db})=>{
              try{
                let products=await db.poestudiantesraw_pogruposraw.findAll({
                  where:{
                    mtmpoestudiantesrawpogruposrawId:args.mtmpoestudiantesrawpogruposrawId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmpogruposrawpoestudiantesrawId)
                let respProds=await db.pogruposraw.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmpogruposrawpoestudiantesrawId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            createdatamtmpoestudiantesrawpogruposraw:async(parent,args,{db})=>{
              try{
                let product=await db.poestudiantesraw_pogruposraw.create(args)
                product=product.dataValues
                let alumno=await db.poestudiantesraw.findAll({
                  where:{
                    id:args.mtmpoestudiantesrawpogruposrawId
                  },
                  raw:true
                })
                let profesor=await db.pogruposraw.findAll({
                  where:{
                    id:args.mtmpogruposrawpoestudiantesrawId
                  },
                  raw:true
                })
                console.log("resyovoy",product,alumno,profesor)
                return {original:{...alumno[0],...product,key:"mtmpoestudiantesrawpogruposraw"},
                copy:{...profesor[0],...product,key:"mtmpogruposrawpoestudiantesraw"}}
              }catch(e){
                console.log("error",e)
              }
            },
            createdatamtmpogruposrawpoestudiantesraw:async(parent,args,{db})=>{
              try{
                let product=await db.poestudiantesraw_pogruposraw.create(args)
                product=product.dataValues
                let alumno=await db.pogruposraw.findAll({
                  where:{
                    id:args.mtmpogruposrawpoestudiantesrawId
                  },
                  raw:true
                })
                let profesor=await db.poestudiantesraw.findAll({
                  where:{
                    id:args.mtmpoestudiantesrawpogruposrawId
                  },
                  raw:true
                })
                console.log("resyovoy",product,alumno,profesor)
                return {original:{...alumno[0],...product,key:"mtmpogruposrawpoestudiantesraw"},
                copy:{...profesor[0],...product,key:"mtmpoestudiantesrawpogruposraw"}}
              }catch(e){
                console.log("error",e)
              }
            },editdatamtmpoestudiantesrawpogruposraw:async(parent,args,{db})=>{
              let rec=await db.poestudiantesraw_pogruposraw.update({
                

calificacion:args.calificacion,
              },
              {
                where:{
                  mtmpoestudiantesrawpogruposrawId:args.mtmpoestudiantesrawpogruposrawId,
                  mtmpogruposrawpoestudiantesrawId:args.mtmpogruposrawpoestudiantesrawId
                }
              })
              let r2=await db.poestudiantesraw_pogruposraw.findAll({
                where:{
                  mtmpoestudiantesrawpogruposrawId:args.mtmpoestudiantesrawpogruposrawId,
                  mtmpogruposrawpoestudiantesrawId:args.mtmpogruposrawpoestudiantesrawId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.poestudiantesraw.findAll({
                where:{id:args.mtmpoestudiantesrawpogruposrawId},
                raw:true
              })
              r1=r1[0]
              let r3=await db.pogruposraw.findAll({
                where:{id:args.mtmpogruposrawpoestudiantesrawId},
                raw:true
              })
              r3=r3[0]


              return {
                original:{
                  
                    ...r1,
                    ...r2,
                  
                  key:"mtmpoestudiantesrawpogruposraw"
                },
                copy:{
                  
                    ...r3,
                    ...r2,
                  
                  key:"mtmpogruposrawpoestudiantesraw"
                }
              }
            },
            editdatamtmpogruposrawpoestudiantesraw:async(parent,args,{db})=>{
              let rec=await db.poestudiantesraw_pogruposraw.update({
                

calificacion:args.calificacion,
              },
              {
                where:{
                  mtmpoestudiantesrawpogruposrawId:args.mtmpoestudiantesrawpogruposrawId,
                  mtmpogruposrawpoestudiantesrawId:args.mtmpogruposrawpoestudiantesrawId
                }
              })
              let r2=await db.poestudiantesraw_pogruposraw.findAll({
                where:{
                  mtmpoestudiantesrawpogruposrawId:args.mtmpoestudiantesrawpogruposrawId,
                  mtmpogruposrawpoestudiantesrawId:args.mtmpogruposrawpoestudiantesrawId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.pogruposraw.findAll({
                where:{id:args.mtmpogruposrawpoestudiantesrawId},
                raw:true
              })
              r1=r1[0]
              let r3=await db.poestudiantesraw.findAll({
                where:{id:args.mtmpoestudiantesrawpogruposrawId},
                raw:true
              })
              r3=r3[0]

              return {
                original:{
                  
                    ...r1,
                    ...r2,
                  
                  key:"mtmpogruposrawpoestudiantesraw"
                },
                copy:{
                  
                    ...r3,
                    ...r2,
                  
                  key:"mtmpoestudiantesrawpogruposraw"
                }
              }
            },
            
                createpoestudiantesraw_pogruposraw:async(parent,args,{db})=>{const product=await db.poestudiantesraw_pogruposraw.create(args)
                  return product
                  
                },
               
                getDatapoestudiantesraw_pogruposraw:async(parent,args,{db})=>{
                  const products=await db.poestudiantesraw_pogruposraw.findAll({raw:true})
                  
                  return products
                },removepoestudiantesraw_pogruposraw:async(parent,args,{db})=>{
                  
              try{
                const products=await db.poestudiantesraw_pogruposraw.findOne({where:{
                  mtmpoestudiantesrawpogruposrawId:args.mtmpoestudiantesrawpogruposrawId,
                  mtmpogruposrawpoestudiantesrawId:args.mtmpogruposrawpoestudiantesrawId
                }})
                console.log("productsreciente",products)
                products.destroy()
              
                return true
              }catch(e){
                console.log("error",e)
                return false
              }
            },
            getpoestudiantesraw_pogruposraw:async(parent,args,{db})=>{
                  const resp=await db.poestudiantesraw_pogruposraw.findByPk(args.id)
                  return resp
                },
                editpoestudiantesraw_pogruposraw:async(parent,args,{db})=>{
              await db.poestudiantesraw_pogruposraw.update({
                        mtmpoestudiantesrawpogruposrawId:args.mtmpoestudiantesrawpogruposrawId,
mtmpogruposrawpoestudiantesrawId:args.mtmpogruposrawpoestudiantesrawId,
calificacion:args.calificacion
                      },
                      {
                        where:{
                          mtmpoestudiantesrawpogruposrawId:args.mtmpoestudiantesrawpogruposrawId,
mtmpogruposrawpoestudiantesrawId:args.mtmpogruposrawpoestudiantesrawId
                        }
                      }
                    )
                  
                    let nuevo=await db.poestudiantesraw_pogruposraw.findAll({
                      where:{
                        mtmpoestudiantesrawpogruposrawId:args.mtmpoestudiantesrawpogruposrawId,
mtmpogruposrawpoestudiantesrawId:args.mtmpogruposrawpoestudiantesrawId
                      },raw:true
                    })
                    nuevo=nuevo[0]
                    return nuevo

                  }
                }
              }