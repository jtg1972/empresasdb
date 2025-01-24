
            import {Op} from 'sequelize'
            export default{
          Query:{
                scestudiantes_scgrupos:async(parent,args,{db})=>{
                  const products=await db.scestudiantes_scgrupos.findAll()
                  return products     
                }
              },Mutation:{
                
            getonedatamtmscestudiantesscgrupos:async(parent,args,{db})=>{
              try{
                let product=await db.scestudiantes_scgrupos.findAll({
                  where:{
                    mtmscgruposscestudiantesId:args.mtmscgruposscestudiantesId,
                    mtmscestudiantesscgruposId:args.mtmscestudiantesscgruposId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.scestudiantes.findAll({
                  where:{
                    id:args.mtmscestudiantesscgruposId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getonedatamtmscgruposscestudiantes:async(parent,args,{db})=>{
              try{
                let product=await db.scestudiantes_scgrupos.findAll({
                  where:{
                    mtmscgruposscestudiantesId:args.mtmscgruposscestudiantesId,
                    mtmscestudiantesscgruposId:args.mtmscestudiantesscgruposId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.scgrupos.findAll({
                  where:{
                    id:args.mtmscgruposscestudiantesId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getdatamtmscestudiantesscgrupos:async(parent,args,{db})=>{
              try{
                let products=await db.scestudiantes_scgrupos.findAll({
                  where:{
                    mtmscgruposscestudiantesId:args.mtmscgruposscestudiantesId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmscestudiantesscgruposId)
                let respProds=await db.scestudiantes.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmscestudiantesscgruposId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            getdatamtmscgruposscestudiantes:async(parent,args,{db})=>{
              try{
                let products=await db.scestudiantes_scgrupos.findAll({
                  where:{
                    mtmscestudiantesscgruposId:args.mtmscestudiantesscgruposId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmscgruposscestudiantesId)
                let respProds=await db.scgrupos.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmscgruposscestudiantesId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            createdatamtmscestudiantesscgrupos:async(parent,args,{db})=>{
              try{
                let product=await db.scestudiantes_scgrupos.create(args)
                product=product.dataValues
                let alumno=await db.scestudiantes.findAll({
                  where:{
                    id:args.mtmscestudiantesscgruposId
                  },
                  raw:true
                })
                return {...alumno[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            createdatamtmscgruposscestudiantes:async(parent,args,{db})=>{
              try{
                let product=await db.scestudiantes_scgrupos.create(args)
                product=product.dataValues
                let grupo=await db.scgrupos.findAll({
                  where:{
                    id:args.mtmscgruposscestudiantesId
                  },
                  raw:true
                })
                return {...grupo[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },editdatamtmscestudiantesscgrupos:async(parent,args,{db})=>{
              let rec=await db.scestudiantes_scgrupos.update({
                

calificacion:args.calificacion,
              },
              {
                where:{
                  mtmscestudiantesscgruposId:args.mtmscestudiantesscgruposId,
                  mtmscgruposscestudiantesId:args.mtmscgruposscestudiantesId
                }
              })
              let r2=await db.scestudiantes_scgrupos.findAll({
                where:{
                  mtmscestudiantesscgruposId:args.mtmscestudiantesscgruposId,
                  mtmscgruposscestudiantesId:args.mtmscgruposscestudiantesId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.scestudiantes.findAll({
                where:{id:args.mtmscestudiantesscgruposId},
                raw:true
              })
              r1=r1[0]
              return {...r1,...r2}
            },
            editdatamtmscgruposscestudiantes:async(parent,args,{db})=>{
              let rec=await db.scestudiantes_scgrupos.update({
                

calificacion:args.calificacion,
              },
              {
                where:{
                  mtmscestudiantesscgruposId:args.mtmscestudiantesscgruposId,
                  mtmscgruposscestudiantesId:args.mtmscgruposscestudiantesId
                }
              })
              let r2=await db.scestudiantes_scgrupos.findAll({
                where:{
                  mtmscestudiantesscgruposId:args.mtmscestudiantesscgruposId,
                  mtmscgruposscestudiantesId:args.mtmscgruposscestudiantesId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.scgrupos.findAll({
                where:{id:args.mtmscgruposscestudiantesId},
                raw:true
              })
              r1=r1[0]
              return {...r1,...r2}
            },
            
                createscestudiantes_scgrupos:async(parent,args,{db})=>{const product=await db.scestudiantes_scgrupos.create(args)
                  return product
                  
                },
               
                getDatascestudiantes_scgrupos:async(parent,args,{db})=>{
                  const products=await db.scestudiantes_scgrupos.findAll({raw:true})
                  
                  return products
                },removescestudiantes_scgrupos:async(parent,args,{db})=>{
                  
              try{
                const products=await db.scestudiantes_scgrupos.findOne({where:{
                  mtmscestudiantesscgruposId:args.mtmscestudiantesscgruposId,
                  mtmscgruposscestudiantesId:args.mtmscgruposscestudiantesId
                }})
                console.log("productsreciente",products)
                products.destroy()
              
                return true
              }catch(e){
                console.log("error",e)
                return false
              }
            },
            getscestudiantes_scgrupos:async(parent,args,{db})=>{
                  const resp=await db.scestudiantes_scgrupos.findByPk(args.id)
                  return resp
                },
                editscestudiantes_scgrupos:async(parent,args,{db})=>{
              await db.scestudiantes_scgrupos.update({
                        mtmscgruposscestudiantesId:args.mtmscgruposscestudiantesId,
mtmscestudiantesscgruposId:args.mtmscestudiantesscgruposId,
calificacion:args.calificacion
                      },
                      {
                        where:{
                          mtmscgruposscestudiantesId:args.mtmscgruposscestudiantesId,
mtmscestudiantesscgruposId:args.mtmscestudiantesscgruposId
                        }
                      }
                    )
                  
                    let nuevo=await db.scestudiantes_scgrupos.findAll({
                      where:{
                        mtmscgruposscestudiantesId:args.mtmscgruposscestudiantesId,
mtmscestudiantesscgruposId:args.mtmscestudiantesscgruposId
                      },raw:true
                    })
                    nuevo=nuevo[0]
                    return nuevo

                  }
                }
              }