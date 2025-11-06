
            import {Op} from 'sequelize'
            import {codifyRuleMtm} from './../utils/whereClauses/index.mjs'
            import {codifySortRule} from './../utils/whereClauses/index.mjs'
            import {codifySortRuleMtm} from './../utils/whereClauses/index.mjs'
            import codifyRule from './../utils/whereClauses/index.mjs'
            export default{
          Query:{
                sbarea_sbprofesores:async(parent,args,{db})=>{
                  const products=await db.sbarea_sbprofesores.findAll()
                  return products     
                }
              },
              Mutation:{
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
                let siexiste=await db.sbarea_sbprofesores.findAll({where:{
                  mtmsbprofesoressbareaId:args.mtmsbprofesoressbareaId,
                  mtmsbareasbprofesoresId:args.mtmsbareasbprofesoresId

                },raw:true})
                let product
                if(siexiste.length==0){
                  product=await db.sbarea_sbprofesores.create(args)
                  product=product.dataValues
                }else{
                  product=siexiste[0]
                }
                
                
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
                return {...alumno[0],...product,key:"mtmsbareasbprofesores",
              otherKey:"mtmsbprofesoressbarea"}
                
              }catch(e){
                console.log("error",e)
              }
            },
            createdatamtmsbprofesoressbarea:async(parent,args,{db})=>{
              try{
                let siexiste=await db.sbarea_sbprofesores.findAll({where:{
                  mtmsbprofesoressbareaId:args.mtmsbprofesoressbareaId,
                  mtmsbareasbprofesoresId:args.mtmsbareasbprofesoresId

                },raw:true})
                let product
                if(siexiste.length==0){
                  product=await db.sbarea_sbprofesores.create(args)
                  product=product.dataValues
                }else{
                  product=siexiste[0]
                }
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
                return {...alumno[0],...product,key:"mtmsbprofesoressbarea",
              otherKey:"mtmsbareasbprofesores"}
                
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
                  
                    ...r1,
                    ...r2,
                  
                  key:"mtmsbareasbprofesores"
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
                    ...r1,
                    ...r2,
                  
                  key:"mtmsbprofesoressbarea"
                
              }
            },
            createsbarea_sbprofesores:async(parent,args,{db})=>{
                let product=null
                let p=null
                if(args.id==null){
                  product=await db.sbarea_sbprofesores.create(args)
                  return product
                }else{
                  p=await db.sbarea_sbprofesores.update({
                    [args["parentArg"]]:args[args["parentArg"]],
                    
                  },
                  {
                  where:{id:args.id}
                  })
                }
                if(p){
                  const nuevo=await db.sbarea_sbprofesores.findByPk(args.id)
                  return nuevo
                }
                return null
              },
               
                getDatasbarea_sbprofesores:async(parent,args,{db})=>{
                  let nj={}
                  
                  if(args.whereClauses!=""){
                    nj=JSON.parse(args.whereClauses)
                  }
                  let condWhere={}
                  if(nj?.sbarea_sbprofesores?.["main"]!=undefined &&
                  nj?.sbarea_sbprofesores?.["main"]!="none")
                    condWhere=codifyRule(nj,sbarea_sbprofesores)

                  let sj={}
                  if(args?.sortClauses!=undefined)
                    sj=JSON.parse(args.sortClauses)
                  let codSort=[]
                  if(sj!=undefined && sj?.["sbarea_sbprofesores"]!=undefined && sj?.["sbarea_sbprofesores"]?.[0]!="nosort")
                    codSort=codifySortRule(sj["sbarea_sbprofesores"])
                  let products=await db.sbarea_sbprofesores.findAll({
                    raw:true,
                    where:{...condWhere},
                    order:codSort
                  })
                  products=products.map(x=>({
                    ...x,whereClauses:args.whereClauses,sortClauses:args.sortClauses
                  }))
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
                        mtmsbprofesoressbareaId:args.mtmsbprofesoressbareaId,
mtmsbareasbprofesoresId:args.mtmsbareasbprofesoresId
                      },
                      {
                        where:{
                          mtmsbprofesoressbareaId:args.mtmsbprofesoressbareaId,
mtmsbareasbprofesoresId:args.mtmsbareasbprofesoresId
                        }
                      }
                    )
                  
                    let nuevo=await db.sbarea_sbprofesores.findAll({
                      where:{
                        mtmsbprofesoressbareaId:args.mtmsbprofesoressbareaId,
mtmsbareasbprofesoresId:args.mtmsbareasbprofesoresId
                      },raw:true
                    })
                    nuevo=nuevo[0]
                    return nuevo

                  }
                }
              }