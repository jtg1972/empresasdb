
            import {Op} from 'sequelize'
            export default{
          Query:{
                sccarreras_scmaterias:async(parent,args,{db})=>{
                  const products=await db.sccarreras_scmaterias.findAll()
                  return products     
                }
              },Mutation:{
                
            getonedatamtmsccarrerasscmaterias:async(parent,args,{db})=>{
              try{
                let product=await db.sccarreras_scmaterias.findAll({
                  where:{
                    mtmscmateriassccarrerasId:args.mtmscmateriassccarrerasId,
                    mtmsccarrerasscmateriasId:args.mtmsccarrerasscmateriasId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.sccarreras.findAll({
                  where:{
                    id:args.mtmsccarrerasscmateriasId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getonedatamtmscmateriassccarreras:async(parent,args,{db})=>{
              try{
                let product=await db.sccarreras_scmaterias.findAll({
                  where:{
                    mtmscmateriassccarrerasId:args.mtmscmateriassccarrerasId,
                    mtmsccarrerasscmateriasId:args.mtmsccarrerasscmateriasId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.scmaterias.findAll({
                  where:{
                    id:args.mtmscmateriassccarrerasId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getdatamtmsccarrerasscmaterias:async(parent,args,{db})=>{
              try{
                let products=await db.sccarreras_scmaterias.findAll({
                  where:{
                    mtmscmateriassccarrerasId:args.mtmscmateriassccarrerasId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmsccarrerasscmateriasId)
                let respProds=await db.sccarreras.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmsccarrerasscmateriasId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            getdatamtmscmateriassccarreras:async(parent,args,{db})=>{
              try{
                let products=await db.sccarreras_scmaterias.findAll({
                  where:{
                    mtmsccarrerasscmateriasId:args.mtmsccarrerasscmateriasId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmscmateriassccarrerasId)
                let respProds=await db.scmaterias.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmscmateriassccarrerasId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            createdatamtmsccarrerasscmaterias:async(parent,args,{db})=>{
              try{

                console.log("argsargsargs111",args)
                let product=await db.sccarreras_scmaterias.create(args)
                product=product.dataValues
                let alumno=await db.sccarreras.findAll({
                  where:{
                    id:args.mtmsccarrerasscmateriasId
                  },
                  raw:true
                })
                return {...alumno[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            createdatamtmscmateriassccarreras:async(parent,args,{db})=>{
              try{
                let product=await db.sccarreras_scmaterias.create(args)
                product=product.dataValues
                let grupo=await db.scmaterias.findAll({
                  where:{
                    id:args.mtmscmateriassccarrerasId
                  },
                  raw:true
                })
                return {...grupo[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },editdatamtmsccarrerasscmaterias:async(parent,args,{db})=>{
              let rec=await db.sccarreras_scmaterias.update({
                

semestre:args.semestre,
              },
              {
                where:{
                  mtmsccarrerasscmateriasId:args.mtmsccarrerasscmateriasId,
                  mtmscmateriassccarrerasId:args.mtmscmateriassccarrerasId
                }
              })
              let r2=await db.sccarreras_scmaterias.findAll({
                where:{
                  mtmsccarrerasscmateriasId:args.mtmsccarrerasscmateriasId,
                  mtmscmateriassccarrerasId:args.mtmscmateriassccarrerasId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.sccarreras.findAll({
                where:{id:args.mtmsccarrerasscmateriasId},
                raw:true
              })
              r1=r1[0]
              return {...r1,...r2}
            },
            editdatamtmscmateriassccarreras:async(parent,args,{db})=>{
              let rec=await db.sccarreras_scmaterias.update({
                

semestre:args.semestre,
              },
              {
                where:{
                  mtmsccarrerasscmateriasId:args.mtmsccarrerasscmateriasId,
                  mtmscmateriassccarrerasId:args.mtmscmateriassccarrerasId
                }
              })
              let r2=await db.sccarreras_scmaterias.findAll({
                where:{
                  mtmsccarrerasscmateriasId:args.mtmsccarrerasscmateriasId,
                  mtmscmateriassccarrerasId:args.mtmscmateriassccarrerasId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.scmaterias.findAll({
                where:{id:args.mtmscmateriassccarrerasId},
                raw:true
              })
              r1=r1[0]
              return {...r1,...r2}
            },
            
                createsccarreras_scmaterias:async(parent,args,{db})=>{const product=await db.sccarreras_scmaterias.create(args)
                  return product
                  
                },
               
                getDatasccarreras_scmaterias:async(parent,args,{db})=>{
                  const products=await db.sccarreras_scmaterias.findAll({raw:true})
                  
                  return products
                },removesccarreras_scmaterias:async(parent,args,{db})=>{
                  
              try{
                const products=await db.sccarreras_scmaterias.findOne({where:{
                  mtmsccarrerasscmateriasId:args.mtmsccarrerasscmateriasId,
                  mtmscmateriassccarrerasId:args.mtmscmateriassccarrerasId
                }})
                console.log("productsreciente",products)
                products.destroy()
              
                return true
              }catch(e){
                console.log("error",e)
                return false
              }
            },
            getsccarreras_scmaterias:async(parent,args,{db})=>{
                  const resp=await db.sccarreras_scmaterias.findByPk(args.id)
                  return resp
                },
                editsccarreras_scmaterias:async(parent,args,{db})=>{
              await db.sccarreras_scmaterias.update({
                        mtmscmateriassccarrerasId:args.mtmscmateriassccarrerasId,
mtmsccarrerasscmateriasId:args.mtmsccarrerasscmateriasId,
semestre:args.semestre
                      },
                      {
                        where:{
                          mtmscmateriassccarrerasId:args.mtmscmateriassccarrerasId,
mtmsccarrerasscmateriasId:args.mtmsccarrerasscmateriasId
                        }
                      }
                    )
                  
                    let nuevo=await db.sccarreras_scmaterias.findAll({
                      where:{
                        mtmscmateriassccarrerasId:args.mtmscmateriassccarrerasId,
mtmsccarrerasscmateriasId:args.mtmsccarrerasscmateriasId
                      },raw:true
                    })
                    nuevo=nuevo[0]
                    return nuevo

                  }
                }
              }