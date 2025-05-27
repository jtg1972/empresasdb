
            import {Op} from 'sequelize'
            export default{
          Query:{
                sbcarreras_sbmaterias:async(parent,args,{db})=>{
                  const products=await db.sbcarreras_sbmaterias.findAll()
                  return products     
                }
              },Mutation:{
                
            getonedatamtmsbcarrerassbmaterias:async(parent,args,{db})=>{
              try{
                let product=await db.sbcarreras_sbmaterias.findAll({
                  where:{
                    mtmsbmateriassbcarrerasId:args.mtmsbmateriassbcarrerasId,
                    mtmsbcarrerassbmateriasId:args.mtmsbcarrerassbmateriasId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.sbcarreras.findAll({
                  where:{
                    id:args.mtmsbcarrerassbmateriasId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getonedatamtmsbmateriassbcarreras:async(parent,args,{db})=>{
              try{
                let product=await db.sbcarreras_sbmaterias.findAll({
                  where:{
                    mtmsbmateriassbcarrerasId:args.mtmsbmateriassbcarrerasId,
                    mtmsbcarrerassbmateriasId:args.mtmsbcarrerassbmateriasId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.sbmaterias.findAll({
                  where:{
                    id:args.mtmsbmateriassbcarrerasId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getdatamtmsbcarrerassbmaterias:async(parent,args,{db})=>{
              try{
                let products=await db.sbcarreras_sbmaterias.findAll({
                  where:{
                    mtmsbmateriassbcarrerasId:args.mtmsbmateriassbcarrerasId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmsbcarrerassbmateriasId)
                let respProds=await db.sbcarreras.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmsbcarrerassbmateriasId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            getdatamtmsbmateriassbcarreras:async(parent,args,{db})=>{
              try{
                let products=await db.sbcarreras_sbmaterias.findAll({
                  where:{
                    mtmsbcarrerassbmateriasId:args.mtmsbcarrerassbmateriasId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmsbmateriassbcarrerasId)
                let respProds=await db.sbmaterias.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmsbmateriassbcarrerasId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            createdatamtmsbcarrerassbmaterias:async(parent,args,{db})=>{
              try{
                /*console.log("entro8990")

                let cat1=db.Categories.findAll(
                  {
                    where:{
                    name:"sbcarreras"
                  },
                  raw:true
                })[0]
                let fields1=db.Fields.findAll({
                  where:{
                    category:cat1.id,
                    dataType:"queryCategory",
                    relationship:null

                  }
                })
                let cat2=db.Categories.findAll(
                  {
                    where:{
                    name:"sbmaterias"
                  },
                  raw:true
                })[0]
                let fields2=db.Fields.findAll({
                  where:{
                    category:cats2.id,
                    dataType:"queryCategory",
                    relationship:null

                  }
                })

                console.log("catresp1",cat1,cat2,fields1.name,fields2.name)*/

                let product=await db.sbcarreras_sbmaterias.create(args)
                product=product.dataValues
                let alumno=await db.sbcarreras.findAll({
                  where:{
                    id:args.mtmsbcarrerassbmateriasId
                  },
                  raw:true
                })
                let profesor=await db.sbmaterias.findAll({
                  where:{
                    id:args.mtmsbmateriassbcarrerasId
                  },
                  raw:true
                })
                console.log("resyovoy",product,alumno,profesor)
                return {original:{...alumno[0],...product,key:"mtmsbcarrerassbmaterias"},
                copy:{...profesor[0],...product,key:"mtmsbmateriassbcarreras"}}
              }catch(e){
                console.log("error",e)
              }
            },
            createdatamtmsbmateriassbcarreras:async(parent,args,{db})=>{
              try{
                /*console.log("entro8990")
                let cat1=db.categories.findAll(
                  {
                    where:{
                    name:"sbcarreras"
                  },
                  raw:true
                })[0]
                let fields1=db.fields.findAll({
                  where:{
                    category:cat1.id,
                    dataType:"queryCategory",
                    relationship:null

                  }
                })
                let cat2=db.categories.findAll(
                  {
                    where:{
                    name:"sbmaterias"
                  },
                  raw:true
                })[0]
                let fields2=db.fields.findAll({
                  where:{
                    category:cats2.id,
                    dataType:"queryCategory",
                    relationship:null

                  }
                })

                console.log("catresp1",cat1,cat2,fields1.name,fields2.name)
                */
                let product=await db.sbcarreras_sbmaterias.create(args)
                product=product.dataValues
                let alumno=await db.sbmaterias.findAll({
                  where:{
                    id:args.mtmsbmateriassbcarrerasId
                  },
                  raw:true
                })
                let profesor=await db.sbcarreras.findAll({
                  where:{
                    id:args.mtmsbcarrerassbmateriasId
                  },
                  raw:true
                })
                console.log("resyovoy",product,alumno,profesor)
                return {original:{...alumno[0],...product,key:"mtmsbmateriassbcarreras"},
                copy:{...profesor[0],...product,key:"mtmsbcarrerassbmaterias"}}
              }catch(e){
                console.log("error",e)
              }
            },editdatamtmsbcarrerassbmaterias:async(parent,args,{db})=>{
              let rec=await db.sbcarreras_sbmaterias.update({
                

semestre:args.semestre,
              },
              {
                where:{
                  mtmsbcarrerassbmateriasId:args.mtmsbcarrerassbmateriasId,
                  mtmsbmateriassbcarrerasId:args.mtmsbmateriassbcarrerasId
                }
              })
              let r2=await db.sbcarreras_sbmaterias.findAll({
                where:{
                  mtmsbcarrerassbmateriasId:args.mtmsbcarrerassbmateriasId,
                  mtmsbmateriassbcarrerasId:args.mtmsbmateriassbcarrerasId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.sbcarreras.findAll({
                where:{id:args.mtmsbcarrerassbmateriasId},
                raw:true
              })
              r1=r1[0]
              let r3=await db.sbmaterias.findAll({
                where:{id:args.mtmsbmateriassbcarrerasId},
                raw:true
              })
              r3=r3[0]


              return {
                original:{
                  
                    ...r1,
                    ...r2,
                  
                  key:"mtmsbcarrerassbmaterias"
                },
                copy:{
                  
                    ...r3,
                    ...r2,
                  
                  key:"mtmsbmateriassbcarreras"
                }
              }
            },
            editdatamtmsbmateriassbcarreras:async(parent,args,{db})=>{
              let rec=await db.sbcarreras_sbmaterias.update({
                

semestre:args.semestre,
              },
              {
                where:{
                  mtmsbcarrerassbmateriasId:args.mtmsbcarrerassbmateriasId,
                  mtmsbmateriassbcarrerasId:args.mtmsbmateriassbcarrerasId
                }
              })
              let r2=await db.sbcarreras_sbmaterias.findAll({
                where:{
                  mtmsbcarrerassbmateriasId:args.mtmsbcarrerassbmateriasId,
                  mtmsbmateriassbcarrerasId:args.mtmsbmateriassbcarrerasId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.sbmaterias.findAll({
                where:{id:args.mtmsbmateriassbcarrerasId},
                raw:true
              })
              r1=r1[0]
              let r3=await db.sbcarreras.findAll({
                where:{id:args.mtmsbcarrerassbmateriasId},
                raw:true
              })
              r3=r3[0]

              return {
                original:{
                  
                    ...r1,
                    ...r2,
                  
                  key:"mtmsbmateriassbcarreras"
                },
                copy:{
                  
                    ...r3,
                    ...r2,
                  
                  key:"mtmsbcarrerassbmaterias"
                }
              }
            },
            
                createsbcarreras_sbmaterias:async(parent,args,{db})=>{const product=await db.sbcarreras_sbmaterias.create(args)
                  return product
                  
                },
               
                getDatasbcarreras_sbmaterias:async(parent,args,{db})=>{
                  const products=await db.sbcarreras_sbmaterias.findAll({raw:true})
                  
                  return products
                },removesbcarreras_sbmaterias:async(parent,args,{db})=>{
                  
              try{
                const products=await db.sbcarreras_sbmaterias.findOne({where:{
                  mtmsbcarrerassbmateriasId:args.mtmsbcarrerassbmateriasId,
                  mtmsbmateriassbcarrerasId:args.mtmsbmateriassbcarrerasId
                }})
                console.log("productsreciente",products)
                products.destroy()
              
                return true
              }catch(e){
                console.log("error",e)
                return false
              }
            },
            getsbcarreras_sbmaterias:async(parent,args,{db})=>{
                  const resp=await db.sbcarreras_sbmaterias.findByPk(args.id)
                  return resp
                },
                editsbcarreras_sbmaterias:async(parent,args,{db})=>{
              await db.sbcarreras_sbmaterias.update({
                        mtmsbcarrerassbmateriasId:args.mtmsbcarrerassbmateriasId,
mtmsbmateriassbcarrerasId:args.mtmsbmateriassbcarrerasId,
semestre:args.semestre
                      },
                      {
                        where:{
                          mtmsbcarrerassbmateriasId:args.mtmsbcarrerassbmateriasId,
mtmsbmateriassbcarrerasId:args.mtmsbmateriassbcarrerasId
                        }
                      }
                    )
                  
                    let nuevo=await db.sbcarreras_sbmaterias.findAll({
                      where:{
                        mtmsbcarrerassbmateriasId:args.mtmsbcarrerassbmateriasId,
mtmsbmateriassbcarrerasId:args.mtmsbmateriassbcarrerasId
                      },raw:true
                    })
                    nuevo=nuevo[0]
                    return nuevo

                  }
                }
              }