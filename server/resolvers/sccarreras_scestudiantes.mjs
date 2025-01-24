
            import {Op} from 'sequelize'
            export default{
          Query:{
                sccarreras_scestudiantes:async(parent,args,{db})=>{
                  const products=await db.sccarreras_scestudiantes.findAll()
                  return products     
                }
              },Mutation:{
                
            getonedatamtmsccarrerasscestudiantes:async(parent,args,{db})=>{
              try{
                let product=await db.sccarreras_scestudiantes.findAll({
                  where:{
                    mtmscestudiantessccarrerasId:args.mtmscestudiantessccarrerasId,
                    mtmsccarrerasscestudiantesId:args.mtmsccarrerasscestudiantesId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.sccarreras.findAll({
                  where:{
                    id:args.mtmsccarrerasscestudiantesId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getonedatamtmscestudiantessccarreras:async(parent,args,{db})=>{
              try{
                let product=await db.sccarreras_scestudiantes.findAll({
                  where:{
                    mtmscestudiantessccarrerasId:args.mtmscestudiantessccarrerasId,
                    mtmsccarrerasscestudiantesId:args.mtmsccarrerasscestudiantesId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.scestudiantes.findAll({
                  where:{
                    id:args.mtmscestudiantessccarrerasId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getdatamtmsccarrerasscestudiantes:async(parent,args,{db})=>{
              try{
                let products=await db.sccarreras_scestudiantes.findAll({
                  where:{
                    mtmscestudiantessccarrerasId:args.mtmscestudiantessccarrerasId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmsccarrerasscestudiantesId)
                let respProds=await db.sccarreras.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmsccarrerasscestudiantesId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            getdatamtmscestudiantessccarreras:async(parent,args,{db})=>{
              try{
                let products=await db.sccarreras_scestudiantes.findAll({
                  where:{
                    mtmsccarrerasscestudiantesId:args.mtmsccarrerasscestudiantesId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmscestudiantessccarrerasId)
                let respProds=await db.scestudiantes.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmscestudiantessccarrerasId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            createdatamtmsccarrerasscestudiantes:async(parent,args,{db})=>{
              try{
                let product=await db.sccarreras_scestudiantes.create(args)
                product=product.dataValues
                let alumno=await db.sccarreras.findAll({
                  where:{
                    id:args.mtmsccarrerasscestudiantesId
                  },
                  raw:true
                })
                return {...alumno[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            createdatamtmscestudiantessccarreras:async(parent,args,{db})=>{
              try{
                let product=await db.sccarreras_scestudiantes.create(args)
                product=product.dataValues
                let grupo=await db.scestudiantes.findAll({
                  where:{
                    id:args.mtmscestudiantessccarrerasId
                  },
                  raw:true
                })
                return {...grupo[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },editdatamtmsccarrerasscestudiantes:async(parent,args,{db})=>{
              let rec=await db.sccarreras_scestudiantes.update({
                

              },
              {
                where:{
                  mtmsccarrerasscestudiantesId:args.mtmsccarrerasscestudiantesId,
                  mtmscestudiantessccarrerasId:args.mtmscestudiantessccarrerasId
                }
              })
              let r2=await db.sccarreras_scestudiantes.findAll({
                where:{
                  mtmsccarrerasscestudiantesId:args.mtmsccarrerasscestudiantesId,
                  mtmscestudiantessccarrerasId:args.mtmscestudiantessccarrerasId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.sccarreras.findAll({
                where:{id:args.mtmsccarrerasscestudiantesId},
                raw:true
              })
              r1=r1[0]
              return {...r1,...r2}
            },
            editdatamtmscestudiantessccarreras:async(parent,args,{db})=>{
              let rec=await db.sccarreras_scestudiantes.update({
                

              },
              {
                where:{
                  mtmsccarrerasscestudiantesId:args.mtmsccarrerasscestudiantesId,
                  mtmscestudiantessccarrerasId:args.mtmscestudiantessccarrerasId
                }
              })
              let r2=await db.sccarreras_scestudiantes.findAll({
                where:{
                  mtmsccarrerasscestudiantesId:args.mtmsccarrerasscestudiantesId,
                  mtmscestudiantessccarrerasId:args.mtmscestudiantessccarrerasId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.scestudiantes.findAll({
                where:{id:args.mtmscestudiantessccarrerasId},
                raw:true
              })
              r1=r1[0]
              return {...r1,...r2}
            },
            
                createsccarreras_scestudiantes:async(parent,args,{db})=>{const product=await db.sccarreras_scestudiantes.create(args)
                  return product
                  
                },
               
                getDatasccarreras_scestudiantes:async(parent,args,{db})=>{
                  const products=await db.sccarreras_scestudiantes.findAll({raw:true})
                  
                  return products
                },removesccarreras_scestudiantes:async(parent,args,{db})=>{
                  
              try{
                const products=await db.sccarreras_scestudiantes.findOne({where:{
                  mtmsccarrerasscestudiantesId:args.mtmsccarrerasscestudiantesId,
                  mtmscestudiantessccarrerasId:args.mtmscestudiantessccarrerasId
                }})
                console.log("productsreciente",products)
                products.destroy()
              
                return true
              }catch(e){
                console.log("error",e)
                return false
              }
            },
            getsccarreras_scestudiantes:async(parent,args,{db})=>{
                  const resp=await db.sccarreras_scestudiantes.findByPk(args.id)
                  return resp
                },
                editsccarreras_scestudiantes:async(parent,args,{db})=>{
              await db.sccarreras_scestudiantes.update({
                        mtmscestudiantessccarrerasId:args.mtmscestudiantessccarrerasId,
mtmsccarrerasscestudiantesId:args.mtmsccarrerasscestudiantesId
                      },
                      {
                        where:{
                          mtmscestudiantessccarrerasId:args.mtmscestudiantessccarrerasId,
mtmsccarrerasscestudiantesId:args.mtmsccarrerasscestudiantesId
                        }
                      }
                    )
                  
                    let nuevo=await db.sccarreras_scestudiantes.findAll({
                      where:{
                        mtmscestudiantessccarrerasId:args.mtmscestudiantessccarrerasId,
mtmsccarrerasscestudiantesId:args.mtmsccarrerasscestudiantesId
                      },raw:true
                    })
                    nuevo=nuevo[0]
                    return nuevo

                  }
                }
              }