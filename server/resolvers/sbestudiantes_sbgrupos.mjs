
            import {Op} from 'sequelize'
            import {codifyRuleMtm} from './../utils/whereClauses/index.mjs'
            import {codifySortRule} from './../utils/whereClauses/index.mjs'
            import {codifySortRuleMtm} from './../utils/whereClauses/index.mjs'
            import codifyRule from './../utils/whereClauses/index.mjs'
            export default{
          Query:{
                sbestudiantes_sbgrupos:async(parent,args,{db})=>{
                  const products=await db.sbestudiantes_sbgrupos.findAll()
                  return products     
                }
              },
              Mutation:{
            getonedatamtmsbestudiantessbgrupos:async(parent,args,{db})=>{
              try{
                let product=await db.sbestudiantes_sbgrupos.findAll({
                  where:{
                    mtmsbgrupossbestudiantesId:args.mtmsbgrupossbestudiantesId,
                    mtmsbestudiantessbgruposId:args.mtmsbestudiantessbgruposId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.sbestudiantes.findAll({
                  where:{
                    id:args.mtmsbestudiantessbgruposId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getonedatamtmsbgrupossbestudiantes:async(parent,args,{db})=>{
              try{
                let product=await db.sbestudiantes_sbgrupos.findAll({
                  where:{
                    mtmsbgrupossbestudiantesId:args.mtmsbgrupossbestudiantesId,
                    mtmsbestudiantessbgruposId:args.mtmsbestudiantessbgruposId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.sbgrupos.findAll({
                  where:{
                    id:args.mtmsbgrupossbestudiantesId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getdatamtmsbestudiantessbgrupos:async(parent,args,{db})=>{
              try{
                let products=await db.sbestudiantes_sbgrupos.findAll({
                  where:{
                    mtmsbgrupossbestudiantesId:args.mtmsbgrupossbestudiantesId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmsbestudiantessbgruposId)
                let respProds=await db.sbestudiantes.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmsbestudiantessbgruposId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            getdatamtmsbgrupossbestudiantes:async(parent,args,{db})=>{
              try{
                let products=await db.sbestudiantes_sbgrupos.findAll({
                  where:{
                    mtmsbestudiantessbgruposId:args.mtmsbestudiantessbgruposId
                  },raw:true

                })
                let cids=products.map(c=>c.mtmsbgrupossbestudiantesId)
                let respProds=await db.sbgrupos.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtmsbgrupossbestudiantesId)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            createdatamtmsbestudiantessbgrupos:async(parent,args,{db})=>{
              try{
                let siexiste=await db.sbestudiantes_sbgrupos.findAll({where:{
                  mtmsbgrupossbestudiantesId:args.mtmsbgrupossbestudiantesId,
                  mtmsbestudiantessbgruposId:args.mtmsbestudiantessbgruposId

                },raw:true})
                let product
                if(siexiste.length==0){
                  product=await db.sbestudiantes_sbgrupos.create(args)
                  product=product.dataValues
                }else{
                  product=siexiste[0]
                }
                
                
                let alumno=await db.sbestudiantes.findAll({
                  where:{
                    id:args.mtmsbestudiantessbgruposId
                  },
                  raw:true
                })
                let profesor=await db.sbgrupos.findAll({
                  where:{
                    id:args.mtmsbgrupossbestudiantesId
                  },
                  raw:true
                })
                console.log("resyovoy",product,alumno,profesor)
                return {...alumno[0],...product,key:"mtmsbestudiantessbgrupos",
              otherKey:"mtmsbgrupossbestudiantes"}
                
              }catch(e){
                console.log("error",e)
              }
            },
            createdatamtmsbgrupossbestudiantes:async(parent,args,{db})=>{
              try{
                let siexiste=await db.sbestudiantes_sbgrupos.findAll({where:{
                  mtmsbgrupossbestudiantesId:args.mtmsbgrupossbestudiantesId,
                  mtmsbestudiantessbgruposId:args.mtmsbestudiantessbgruposId

                },raw:true})
                let product
                if(siexiste.length==0){
                  product=await db.sbestudiantes_sbgrupos.create(args)
                  product=product.dataValues
                }else{
                  product=siexiste[0]
                }
                let alumno=await db.sbgrupos.findAll({
                  where:{
                    id:args.mtmsbgrupossbestudiantesId
                  },
                  raw:true
                })
                let profesor=await db.sbestudiantes.findAll({
                  where:{
                    id:args.mtmsbestudiantessbgruposId
                  },
                  raw:true
                })
                console.log("resyovoy",product,alumno,profesor)
                return {...alumno[0],...product,key:"mtmsbgrupossbestudiantes",
              otherKey:"mtmsbestudiantessbgrupos"}
                
              }catch(e){
                console.log("error",e)
              }
            },editdatamtmsbestudiantessbgrupos:async(parent,args,{db})=>{
              let rec=await db.sbestudiantes_sbgrupos.update({
                
calificacion:args.calificacion,

              },
              {
                where:{
                  mtmsbestudiantessbgruposId:args.mtmsbestudiantessbgruposId,
                  mtmsbgrupossbestudiantesId:args.mtmsbgrupossbestudiantesId
                }
              })
              let r2=await db.sbestudiantes_sbgrupos.findAll({
                where:{
                  mtmsbestudiantessbgruposId:args.mtmsbestudiantessbgruposId,
                  mtmsbgrupossbestudiantesId:args.mtmsbgrupossbestudiantesId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.sbestudiantes.findAll({
                where:{id:args.mtmsbestudiantessbgruposId},
                raw:true
              })
              r1=r1[0]
              let r3=await db.sbgrupos.findAll({
                where:{id:args.mtmsbgrupossbestudiantesId},
                raw:true
              })
              r3=r3[0]


              return {
                  
                    ...r1,
                    ...r2,
                  
                  key:"mtmsbestudiantessbgrupos"
                }
              
            },
            editdatamtmsbgrupossbestudiantes:async(parent,args,{db})=>{
              let rec=await db.sbestudiantes_sbgrupos.update({
                
calificacion:args.calificacion,

              },
              {
                where:{
                  mtmsbestudiantessbgruposId:args.mtmsbestudiantessbgruposId,
                  mtmsbgrupossbestudiantesId:args.mtmsbgrupossbestudiantesId
                }
              })
              let r2=await db.sbestudiantes_sbgrupos.findAll({
                where:{
                  mtmsbestudiantessbgruposId:args.mtmsbestudiantessbgruposId,
                  mtmsbgrupossbestudiantesId:args.mtmsbgrupossbestudiantesId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.sbgrupos.findAll({
                where:{id:args.mtmsbgrupossbestudiantesId},
                raw:true
              })
              r1=r1[0]
              let r3=await db.sbestudiantes.findAll({
                where:{id:args.mtmsbestudiantessbgruposId},
                raw:true
              })
              r3=r3[0]

              return {
                    ...r1,
                    ...r2,
                  
                  key:"mtmsbgrupossbestudiantes"
                
              }
            },
            createsbestudiantes_sbgrupos:async(parent,args,{db})=>{
                let product=null
                let p=null
                if(args.id==null){
                  product=await db.sbestudiantes_sbgrupos.create(args)
                  return product
                }else{
                  p=await db.sbestudiantes_sbgrupos.update({
                    [args["parentArg"]]:args[args["parentArg"]],
                    
                  },
                  {
                  where:{id:args.id}
                  })
                }
                if(p){
                  const nuevo=await db.sbestudiantes_sbgrupos.findByPk(args.id)
                  return nuevo
                }
                return null
              },
               
                getDatasbestudiantes_sbgrupos:async(parent,args,{db})=>{
                  let nj={}
                  
                  if(args.whereClauses!=""){
                    nj=JSON.parse(args.whereClauses)
                  }
                  let condWhere={}
                  if(nj?.sbestudiantes_sbgrupos?.["main"]!=undefined &&
                  nj?.sbestudiantes_sbgrupos?.["main"]!="none")
                    condWhere=codifyRule(nj,sbestudiantes_sbgrupos)

                  let sj={}
                  if(args?.sortClauses!=undefined)
                    sj=JSON.parse(args.sortClauses)
                  let codSort=[]
                  if(sj!=undefined && sj?.["sbestudiantes_sbgrupos"]!=undefined && sj?.["sbestudiantes_sbgrupos"]?.[0]!="nosort")
                    codSort=codifySortRule(sj["sbestudiantes_sbgrupos"])
                  let products=await db.sbestudiantes_sbgrupos.findAll({
                    raw:true,
                    where:{...condWhere},
                    order:codSort
                  })
                  products=products.map(x=>({
                    ...x,whereClauses:args.whereClauses,sortClauses:args.sortClauses
                  }))
                  return products
                },removesbestudiantes_sbgrupos:async(parent,args,{db})=>{
                  
              try{
                const products=await db.sbestudiantes_sbgrupos.findOne({where:{
                  mtmsbestudiantessbgruposId:args.mtmsbestudiantessbgruposId,
                  mtmsbgrupossbestudiantesId:args.mtmsbgrupossbestudiantesId
                }})
                console.log("productsreciente",products)
                products.destroy()
              
                return true
              }catch(e){
                console.log("error",e)
                return false
              }
            },
            getsbestudiantes_sbgrupos:async(parent,args,{db})=>{
                  const resp=await db.sbestudiantes_sbgrupos.findByPk(args.id)
                  return resp
                },
                editsbestudiantes_sbgrupos:async(parent,args,{db})=>{
              await db.sbestudiantes_sbgrupos.update({
                        mtmsbgrupossbestudiantesId:args.mtmsbgrupossbestudiantesId,
calificacion:args.calificacion,
mtmsbestudiantessbgruposId:args.mtmsbestudiantessbgruposId
                      },
                      {
                        where:{
                          mtmsbgrupossbestudiantesId:args.mtmsbgrupossbestudiantesId,
mtmsbestudiantessbgruposId:args.mtmsbestudiantessbgruposId
                        }
                      }
                    )
                  
                    let nuevo=await db.sbestudiantes_sbgrupos.findAll({
                      where:{
                        mtmsbgrupossbestudiantesId:args.mtmsbgrupossbestudiantesId,
mtmsbestudiantessbgruposId:args.mtmsbestudiantessbgruposId
                      },raw:true
                    })
                    nuevo=nuevo[0]
                    return nuevo

                  }
                }
              }