
            import {Op} from 'sequelize'
            import {codifyRuleMtm} from './../utils/whereClauses/index.mjs'
            import {codifySortRule} from './../utils/whereClauses/index.mjs'
            import {codifySortRuleMtm} from './../utils/whereClauses/index.mjs'
            import codifyRule from './../utils/whereClauses/index.mjs'
            export default{
          Query:{
                sbcarreras_sbmaterias:async(parent,args,{db})=>{
                  const products=await db.sbcarreras_sbmaterias.findAll()
                  return products     
                }
              },
              Mutation:{
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
                let siexiste=await db.sbcarreras_sbmaterias.findAll({where:{
                  mtmsbmateriassbcarrerasId:args.mtmsbmateriassbcarrerasId,
                  mtmsbcarrerassbmateriasId:args.mtmsbcarrerassbmateriasId
                },raw:true})
                let product
                if(siexiste.length==0){
                  product=await db.sbcarreras_sbmaterias.create(args)
                  product=product.dataValues
                }else{
                  product=siexiste[0]
                }
                
                
                
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
                return {...alumno[0],...product,key:"mtmsbcarrerassbmaterias",
              otherKey:"mtmsbmateriassbcarreras"}
                
              }catch(e){
                console.log("error",e)
              }
            },
            createdatamtmsbmateriassbcarreras:async(parent,args,{db})=>{
              try{
                let siexiste=await db.sbcarreras_sbmaterias.findAll({where:{
                  mtmsbmateriassbcarrerasId:args.mtmsbmateriassbcarrerasId,
                  mtmsbcarrerassbmateriasId:args.mtmsbcarrerassbmateriasId
                },raw:true})
                let product
                if(siexiste.length==0){
                  product=await db.sbcarreras_sbmaterias.create(args)
                  product=product.dataValues
                }else{
                  product=siexiste[0]
                }
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
                return {...alumno[0],...product,key:"mtmsbmateriassbcarreras",
              otherKey:"mtmsbcarrerassbmaterias"}
                
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
                  
                    ...r1,
                    ...r2,
                  
                  key:"mtmsbcarrerassbmaterias"
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
                    ...r1,
                    ...r2,
                  
                  key:"mtmsbmateriassbcarreras"
                
              }
            },
            createsbcarreras_sbmaterias:async(parent,args,{db})=>{
                let product=null
                let p=null
                if(args.id==null){
                  product=await db.sbcarreras_sbmaterias.create(args)
                  return product
                }else{
                  p=await db.sbcarreras_sbmaterias.update({
                    [args["parentArg"]]:args[args["parentArg"]],
                    
                  },
                  {
                  where:{id:args.id}
                  })
                }
                if(p){
                  const nuevo=await db.sbcarreras_sbmaterias.findByPk(args.id)
                  return nuevo
                }
                return null
              },
               
                getDatasbcarreras_sbmaterias:async(parent,args,{db})=>{
                  let nj={}
                  
                  if(args.whereClauses!=""){
                    nj=JSON.parse(args.whereClauses)
                  }
                  let condWhere={}
                  if(nj?.sbcarreras_sbmaterias?.["main"]!=undefined &&
                  nj?.sbcarreras_sbmaterias?.["main"]!="none")
                    condWhere=codifyRule(nj,sbcarreras_sbmaterias)

                  let sj={}
                  if(args?.sortClauses!=undefined)
                    sj=JSON.parse(args.sortClauses)
                  let codSort=[]
                  if(sj!=undefined && sj?.["sbcarreras_sbmaterias"]!=undefined && sj?.["sbcarreras_sbmaterias"]?.[0]!="nosort")
                    codSort=codifySortRule(sj["sbcarreras_sbmaterias"])
                  let products=await db.sbcarreras_sbmaterias.findAll({
                    raw:true,
                    where:{...condWhere},
                    order:codSort
                  })
                  products=products.map(x=>({
                    ...x,whereClauses:args.whereClauses,sortClauses:args.sortClauses
                  }))
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