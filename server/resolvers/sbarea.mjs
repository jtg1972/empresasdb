
            import {Op} from 'sequelize'
            import {codifyRuleMtm} from './../utils/whereClauses/index.mjs'
            import codifyRule from './../utils/whereClauses/index.mjs'
            export default{
          datamtmsbprofesoressbarea:{
                  mtmsbareasbprofesores:async(parent,args,{db})=>{
                        let products=[]
                        let whereClauses=JSON.parse(parent.whereClauses)
                        let singleWhere={}
                        let sharedWhere={}
                        if(whereClauses!=undefined &&
                          whereClauses?.["mtmsbareasbprofesores"]?.["single"]?.["main"]!=undefined &&
                          whereClauses?.["mtmsbareasbprofesores"]?.["single"]?.["main"]!="none"
                        ){
                          singleWhere=codifyRuleMtm(whereClauses,"mtmsbareasbprofesores","single")
                        }
                        if(whereClauses!=undefined &&
                          whereClauses?.["mtmsbareasbprofesores"]?.["shared"]?.["main"]!=undefined &&
                          whereClauses?.["mtmsbareasbprofesores"]?.["shared"]?.["main"]!="none"
                        ){
                          sharedWhere=codifyRuleMtm(whereClauses,"mtmsbareasbprofesores","shared")
                        }
                        products=await db.sbprofesores.findAll({
                          where:{id:parent.id},
                          include:{
                            required:false,
                            model:db.sbarea,
                            where:{
                              ...singleWhere
                            },
                            through:{
                              model:db.sbarea_sbprofesores,
                              where:{
                                ...sharedWhere
                              }
                            }
                          },
                          raw:true
                        })
                        let objeto={}
                        let res=[]
                        products=products.forEach(x=>{
                          objeto={}
                          let keys=Object.keys(x)
                          for(let k=0;k<keys.length;k++){
                            let lastSegmentPos=keys[k].lastIndexOf(".")
                            let lastSegmentText=keys[k].substring(lastSegmentPos+1)
                            console.log("lastsegkey",lastSegmentText,lastSegmentPos)
                            objeto[lastSegmentText]=x[keys[k]]
                          }
                          objeto["id"]=x["sbarea.id"]
                          objeto.mtmsbprofesoressbareaId=x["id"]
                          if(objeto["mtmsbareasbprofesoresId"]!=null)
                            res.push(objeto)
                        })
                        res.map(o=>({
                          ...o,
                          whereClauses:parent.whereClauses,
                          key:"mtmsbareasbprofesores",
                          otherKey:"mtmsbprofesoressbarea"


                        }))
                        return res

                    },
mtmsbmateriassbprofesores:async(parent,args,{db})=>{
                        let products=[]
                        let whereClauses=JSON.parse(parent.whereClauses)
                        let singleWhere={}
                        let sharedWhere={}
                        if(whereClauses!=undefined &&
                          whereClauses?.["mtmsbmateriassbprofesores"]?.["single"]?.["main"]!=undefined &&
                          whereClauses?.["mtmsbmateriassbprofesores"]?.["single"]?.["main"]!="none"
                        ){
                          singleWhere=codifyRuleMtm(whereClauses,"mtmsbmateriassbprofesores","single")
                        }
                        if(whereClauses!=undefined &&
                          whereClauses?.["mtmsbmateriassbprofesores"]?.["shared"]?.["main"]!=undefined &&
                          whereClauses?.["mtmsbmateriassbprofesores"]?.["shared"]?.["main"]!="none"
                        ){
                          sharedWhere=codifyRuleMtm(whereClauses,"mtmsbmateriassbprofesores","shared")
                        }
                        products=await db.sbprofesores.findAll({
                          where:{id:parent.id},
                          include:{
                            required:false,
                            model:db.sbmaterias,
                            where:{
                              ...singleWhere
                            },
                            through:{
                              model:db.sbmaterias_sbprofesores,
                              where:{
                                ...sharedWhere
                              }
                            }
                          },
                          raw:true
                        })
                        let objeto={}
                        let res=[]
                        products=products.forEach(x=>{
                          objeto={}
                          let keys=Object.keys(x)
                          for(let k=0;k<keys.length;k++){
                            let lastSegmentPos=keys[k].lastIndexOf(".")
                            let lastSegmentText=keys[k].substring(lastSegmentPos+1)
                            console.log("lastsegkey",lastSegmentText,lastSegmentPos)
                            objeto[lastSegmentText]=x[keys[k]]
                          }
                          objeto["id"]=x["sbmaterias.id"]
                          objeto.mtmsbprofesoressbmateriasId=x["id"]
                          if(objeto["mtmsbmateriassbprofesoresId"]!=null)
                            res.push(objeto)
                        })
                        res.map(o=>({
                          ...o,
                          whereClauses:parent.whereClauses,
                          key:"mtmsbmateriassbprofesores",
                          otherKey:"mtmsbprofesoressbmaterias"


                        }))
                        return res

                    }
                }  
                ,
sbarea:{
              otmsbareasbcarreras:async(parent,args,{db})=>{
                    let nj=JSON.parse(parent.whereClauses)
                    let wc={}
                    if(parent?.whereClauses!=undefined &&
                      nj?.["otmsbareasbcarreras"] &&
                      nj?.["otmsbareasbcarreras"]?.["main"]!=undefined &&
                      nj?.["otmsbareasbcarreras"]?.["main"]!="none"
                    ){
                      wc=codifyRule(nj,"otmsbareasbcarreras")
                      
                    }
                    let products=await db.sbcarreras.findAll({
                      where:{[Op.and]:[{otmsbareasbcarrerasId:parent.id},{...wc}]},
                      raw:true

                    })
                    products=products.map(x=>({
                      ...x,whereClauses:parent.whereClauses
                    }))
                    return products
                  },otmsbareasbmaterias:async(parent,args,{db})=>{
                    let nj=JSON.parse(parent.whereClauses)
                    let wc={}
                    if(parent?.whereClauses!=undefined &&
                      nj?.["otmsbareasbmaterias"] &&
                      nj?.["otmsbareasbmaterias"]?.["main"]!=undefined &&
                      nj?.["otmsbareasbmaterias"]?.["main"]!="none"
                    ){
                      wc=codifyRule(nj,"otmsbareasbmaterias")
                      
                    }
                    let products=await db.sbmaterias.findAll({
                      where:{[Op.and]:[{otmsbareasbmateriasId:parent.id},{...wc}]},
                      raw:true

                    })
                    products=products.map(x=>({
                      ...x,whereClauses:parent.whereClauses
                    }))
                    return products
                  },
              mtmsbprofesoressbarea:async(parent,args,{db})=>{
                    let products=[]
                    let whereClauses=JSON.parse(parent.whereClauses)
                    let singleWhere={}
                    let sharedWhere={}
                    if(whereClauses!=undefined &&
                      whereClauses?.["mtmsbprofesoressbarea"]?.["single"]?.["main"]!=undefined &&
                      whereClauses?.["mtmsbprofesoressbarea"]?.["single"]?.["main"]!="none"
                    ){
                      singleWhere=codifyRuleMtm(whereClauses,"mtmsbprofesoressbarea","single")
                    }
                    if(whereClauses!=undefined &&
                      whereClauses?.["mtmsbprofesoressbarea"]?.["shared"]?.["main"]!=undefined &&
                      whereClauses?.["mtmsbprofesoressbarea"]?.["shared"]?.["main"]!="none"
                    ){
                      sharedWhere=codifyRuleMtm(whereClauses,"mtmsbprofesoressbarea","shared")
                    }
                    products=await db.sbarea.findAll({
                      where:{id:parent.id},
                      include:{
                        required:false,
                        model:db.sbprofesores,
                        where:{
                          ...singleWhere
                        },
                        through:{
                          model:db.sbarea_sbprofesores,
                          where:{
                            ...sharedWhere
                          }
                        }
                      },
                      raw:true
                    })
                    let objeto={}
                    let res=[]
                    products=products.forEach(x=>{
                      objeto={}
                      let keys=Object.keys(x)
                      for(let k=0;k<keys.length;k++){
                        let lastSegmentPos=keys[k].lastIndexOf(".")
                        let lastSegmentText=keys[k].substring(lastSegmentPos+1)
                        console.log("lastsegkey",lastSegmentText,lastSegmentPos)
                        objeto[lastSegmentText]=x[keys[k]]
                      }
                      objeto["id"]=x["sbprofesores.id"]
                      objeto.mtmsbareasbprofesoresId=x["id"]
                      if(objeto["mtmsbprofesoressbareaId"]!=null)
                        res.push(objeto)
                    })
                    res.map(o=>({
                      ...o,
                      whereClauses:parent.whereClauses,
                      key:"mtmsbprofesoressbarea",
                      otherKey:"mtmsbareasbprofesores"


                    }))
                    return res

                },
            },
            Query:{
                sbarea:async(parent,args,{db})=>{
                  const products=await db.sbarea.findAll()
                  return products     
                }
              },
              Mutation:{
                
                

                createsbarea:async(parent,args,{db})=>{
                let product=null
                let p=null
                if(args.id==null){
                  product=await db.sbarea.create(args)
                  return product
                }else{
                  p=await db.sbarea.update({
                    [args["parentArg"]]:args[args["parentArg"]],
                    
                  },
                  {
                  where:{id:args.id}
                  })
                }
                if(p){
                  const nuevo=await db.sbarea.findByPk(args.id)
                  return nuevo
                }
                return null
              },
               
                getDatasbarea:async(parent,args,{db})=>{
                  let nj={}
                  if(args.whereClauses!=""){
                    nj=JSON.parse(args.whereClauses)
                  }
                  let condWhere={}
                  if(nj?.sbarea?.["main"]!=undefined &&
                  nj?.sbarea?.["main"]!="none")
                    condWhere=codifyRule(nj,sbarea)
                  let products=await db.sbarea.findAll({
                    raw:true,
                    where:{...condWhere}
                  })
                  products=products.map(x=>({
                    ...x,whereClauses:args.whereClauses
                  }))
                  return products
                },removesbarea:async(parent,args,{db})=>{
                      let p
                      try{
                        if(args.hardDelete==true){
                          const product=await db.sbarea.findByPk(args.id)
                          product.destroy()
                          return true
                        }else{
                          p=await db.sbarea.update({
                            [args["parentArg"]]:0,
                            
                          },
                          {
                          where:{id:args.id}
                          }
                          
                        )
                        return true
                        }
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getsbarea:async(parent,args,{db})=>{
                  const resp=await db.sbarea.findByPk(args.id)
                  return resp
                },
                editsbarea:async(parent,args,{db})=>{
              let camposDate=[]
await db.sbarea.update({
                        id:args["id"],area:args.area,otmsbareasbcarreras:args.otmsbareasbcarreras,otmsbareasbmaterias:args.otmsbareasbmaterias,mtmsbprofesoressbarea:args.mtmsbprofesoressbarea,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.sbarea.findByPk(args.id)
                    return nuevo

                  }
                }
              }