
            import {Op} from 'sequelize'
            import {codifyRuleMtm} from './../utils/whereClauses/index.mjs'
            import {codifySortRule} from './../utils/whereClauses/index.mjs'
            import {codifySortRuleMtm} from './../utils/whereClauses/index.mjs'
            import codifyRule from './../utils/whereClauses/index.mjs'
            export default{
          datamtmsbareasbprofesores:{
                  otmsbareasbcarreras:async(parent,args,{db})=>{
                      let nj
                      if(parent.whereClauses)
                        nj=JSON.parse(parent.whereClauses)
                      let wc={}
                      if(nj?.whereClauses!=undefined &&
                        nj?.["otmsbareasbcarreras"] &&
                        nj?.["otmsbareasbcarreras"]?.["main"]!=undefined &&
                        nj?.["otmsbareasbcarreras"]?.["main"]!="none"
                      ){
                        wc=codifyRule(nj,"otmsbareasbcarreras")
                        
                      }
                      let sj={}
                      if(parent?.sortClauses!=undefined)
                        sj=JSON.parse(parent.sortClauses)
                      let codSort=[]
                      if(sj!=undefined && sj?.["otmsbareasbcarreras"]!=undefined && sj?.["otmsbareasbcarreras"]?.[0]!="nosort")
                        codSort=codifySortRule(sj["otmsbareasbcarreras"])
                      let products=await db.sbcarreras.findAll({
                        where:{[Op.and]:[{otmsbareasbcarrerasId:parent.id},{...wc}]},
                        raw:true,
                        order:codSort

                      })
                      products=products.map(x=>({
                        ...x,whereClauses:parent.whereClauses,
                        sortClauses:parent.sortClauses
                      }))
                      return products
                    },
otmsbareasbmaterias:async(parent,args,{db})=>{
                      let nj
                      if(parent.whereClauses)
                        nj=JSON.parse(parent.whereClauses)
                      let wc={}
                      if(nj?.whereClauses!=undefined &&
                        nj?.["otmsbareasbmaterias"] &&
                        nj?.["otmsbareasbmaterias"]?.["main"]!=undefined &&
                        nj?.["otmsbareasbmaterias"]?.["main"]!="none"
                      ){
                        wc=codifyRule(nj,"otmsbareasbmaterias")
                        
                      }
                      let sj={}
                      if(parent?.sortClauses!=undefined)
                        sj=JSON.parse(parent.sortClauses)
                      let codSort=[]
                      if(sj!=undefined && sj?.["otmsbareasbmaterias"]!=undefined && sj?.["otmsbareasbmaterias"]?.[0]!="nosort")
                        codSort=codifySortRule(sj["otmsbareasbmaterias"])
                      let products=await db.sbmaterias.findAll({
                        where:{[Op.and]:[{otmsbareasbmateriasId:parent.id},{...wc}]},
                        raw:true,
                        order:codSort

                      })
                      products=products.map(x=>({
                        ...x,whereClauses:parent.whereClauses,
                        sortClauses:parent.sortClauses
                      }))
                      return products
                    },
mtmsbprofesoressbarea:async(parent,args,{db})=>{
                        let products=[]
                        let whereClauses
                        if(parent.whereClauses)
                          whereClauses=JSON.parse(parent.whereClauses)
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
                        let sj={}
                      if(parent?.sortClauses!=undefined)
                        sj=JSON.parse(parent.sortClauses)
                      let codSortSingle=[]
                     console.log("parentsort",sj)
                      if(sj!=undefined && sj?.["mtmsbprofesoressbarea"]!=undefined && sj?.["mtmsbprofesoressbarea"]?.[0]!="nosort")
                        codSortSingle=codifySortRuleMtm(sj["mtmsbprofesoressbarea"],"sbprofesores",db.sbprofesores,"sbarea_sbprofesores",db.sbarea_sbprofesores)
                      
                      
                    console.log("codsortsingle",codSortSingle)
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
                              },
                              
                            }
                          },
                          order:codSortSingle,
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
                          Object.keys(objeto).filter(z=>{
                        
                            if("mtmsbprofesoressbareaId".startsWith(z))
                              objeto["mtmsbprofesoressbareaId"]=objeto[z]
                        })
                        //in field server
                          if(objeto["mtmsbprofesoressbareaId"]!=null)
                            res.push(objeto)
                        })
                        res=res.map(o=>({
                          ...o,
                          whereClauses:parent.whereClauses,
                          sortClauses:parent.sortClauses,
                          key:"mtmsbprofesoressbarea",
                          otherKey:"mtmsbareasbprofesores"


                        }))
                        return res

                    }
                }  
                ,
datamtmsbmateriassbprofesores:{
                  mtmsbcarrerassbmaterias:async(parent,args,{db})=>{
                        let products=[]
                        let whereClauses
                        if(parent.whereClauses)
                          whereClauses=JSON.parse(parent.whereClauses)
                        let singleWhere={}
                        let sharedWhere={}
                        if(whereClauses!=undefined &&
                          whereClauses?.["mtmsbcarrerassbmaterias"]?.["single"]?.["main"]!=undefined &&
                          whereClauses?.["mtmsbcarrerassbmaterias"]?.["single"]?.["main"]!="none"
                        ){
                          singleWhere=codifyRuleMtm(whereClauses,"mtmsbcarrerassbmaterias","single")
                        }
                        if(whereClauses!=undefined &&
                          whereClauses?.["mtmsbcarrerassbmaterias"]?.["shared"]?.["main"]!=undefined &&
                          whereClauses?.["mtmsbcarrerassbmaterias"]?.["shared"]?.["main"]!="none"
                        ){
                          sharedWhere=codifyRuleMtm(whereClauses,"mtmsbcarrerassbmaterias","shared")
                        }
                        let sj={}
                      if(parent?.sortClauses!=undefined)
                        sj=JSON.parse(parent.sortClauses)
                      let codSortSingle=[]
                     console.log("parentsort",sj)
                      if(sj!=undefined && sj?.["mtmsbcarrerassbmaterias"]!=undefined && sj?.["mtmsbcarrerassbmaterias"]?.[0]!="nosort")
                        codSortSingle=codifySortRuleMtm(sj["mtmsbcarrerassbmaterias"],"sbcarreras",db.sbcarreras,"sbcarreras_sbmaterias",db.sbcarreras_sbmaterias)
                      
                      
                    console.log("codsortsingle",codSortSingle)
                        products=await db.sbmaterias.findAll({
                          where:{id:parent.id},
                          include:{
                            required:false,
                            model:db.sbcarreras,
                            where:{
                              ...singleWhere
                            },
                            
                            through:{
                              model:db.sbcarreras_sbmaterias,
                              where:{
                                ...sharedWhere
                              },
                              
                            }
                          },
                          order:codSortSingle,
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
                          
                          objeto["id"]=x["sbcarreras.id"]
                          objeto.mtmsbmateriassbcarrerasId=x["id"]
                          Object.keys(objeto).filter(z=>{
                        
                            if("mtmsbcarrerassbmateriasId".startsWith(z))
                              objeto["mtmsbcarrerassbmateriasId"]=objeto[z]
                        })
                        //in field server
                          if(objeto["mtmsbcarrerassbmateriasId"]!=null)
                            res.push(objeto)
                        })
                        res=res.map(o=>({
                          ...o,
                          whereClauses:parent.whereClauses,
                          sortClauses:parent.sortClauses,
                          key:"mtmsbcarrerassbmaterias",
                          otherKey:"mtmsbmateriassbcarreras"


                        }))
                        return res

                    },
otmsbmateriassbgrupos:async(parent,args,{db})=>{
                      let nj
                      if(parent.whereClauses)
                        nj=JSON.parse(parent.whereClauses)
                      let wc={}
                      if(nj?.whereClauses!=undefined &&
                        nj?.["otmsbmateriassbgrupos"] &&
                        nj?.["otmsbmateriassbgrupos"]?.["main"]!=undefined &&
                        nj?.["otmsbmateriassbgrupos"]?.["main"]!="none"
                      ){
                        wc=codifyRule(nj,"otmsbmateriassbgrupos")
                        
                      }
                      let sj={}
                      if(parent?.sortClauses!=undefined)
                        sj=JSON.parse(parent.sortClauses)
                      let codSort=[]
                      if(sj!=undefined && sj?.["otmsbmateriassbgrupos"]!=undefined && sj?.["otmsbmateriassbgrupos"]?.[0]!="nosort")
                        codSort=codifySortRule(sj["otmsbmateriassbgrupos"])
                      let products=await db.sbgrupos.findAll({
                        where:{[Op.and]:[{otmsbmateriassbgruposId:parent.id},{...wc}]},
                        raw:true,
                        order:codSort

                      })
                      products=products.map(x=>({
                        ...x,whereClauses:parent.whereClauses,
                        sortClauses:parent.sortClauses
                      }))
                      return products
                    },
mtmsbprofesoressbmaterias:async(parent,args,{db})=>{
                        let products=[]
                        let whereClauses
                        if(parent.whereClauses)
                          whereClauses=JSON.parse(parent.whereClauses)
                        let singleWhere={}
                        let sharedWhere={}
                        if(whereClauses!=undefined &&
                          whereClauses?.["mtmsbprofesoressbmaterias"]?.["single"]?.["main"]!=undefined &&
                          whereClauses?.["mtmsbprofesoressbmaterias"]?.["single"]?.["main"]!="none"
                        ){
                          singleWhere=codifyRuleMtm(whereClauses,"mtmsbprofesoressbmaterias","single")
                        }
                        if(whereClauses!=undefined &&
                          whereClauses?.["mtmsbprofesoressbmaterias"]?.["shared"]?.["main"]!=undefined &&
                          whereClauses?.["mtmsbprofesoressbmaterias"]?.["shared"]?.["main"]!="none"
                        ){
                          sharedWhere=codifyRuleMtm(whereClauses,"mtmsbprofesoressbmaterias","shared")
                        }
                        let sj={}
                      if(parent?.sortClauses!=undefined)
                        sj=JSON.parse(parent.sortClauses)
                      let codSortSingle=[]
                     console.log("parentsort",sj)
                      if(sj!=undefined && sj?.["mtmsbprofesoressbmaterias"]!=undefined && sj?.["mtmsbprofesoressbmaterias"]?.[0]!="nosort")
                        codSortSingle=codifySortRuleMtm(sj["mtmsbprofesoressbmaterias"],"sbprofesores",db.sbprofesores,"sbmaterias_sbprofesores",db.sbmaterias_sbprofesores)
                      
                      
                    console.log("codsortsingle",codSortSingle)
                        products=await db.sbmaterias.findAll({
                          where:{id:parent.id},
                          include:{
                            required:false,
                            model:db.sbprofesores,
                            where:{
                              ...singleWhere
                            },
                            
                            through:{
                              model:db.sbmaterias_sbprofesores,
                              where:{
                                ...sharedWhere
                              },
                              
                            }
                          },
                          order:codSortSingle,
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
                          objeto.mtmsbmateriassbprofesoresId=x["id"]
                          Object.keys(objeto).filter(z=>{
                        
                            if("mtmsbprofesoressbmateriasId".startsWith(z))
                              objeto["mtmsbprofesoressbmateriasId"]=objeto[z]
                        })
                        //in field server
                          if(objeto["mtmsbprofesoressbmateriasId"]!=null)
                            res.push(objeto)
                        })
                        res=res.map(o=>({
                          ...o,
                          whereClauses:parent.whereClauses,
                          sortClauses:parent.sortClauses,
                          key:"mtmsbprofesoressbmaterias",
                          otherKey:"mtmsbmateriassbprofesores"


                        }))
                        return res

                    }
                }  
                ,
sbprofesores:{
              
              mtmsbareasbprofesores:async(parent,args,{db})=>{
                    let products=[]
                    let whereClauses
                    if(parent.whereClauses)
                      whereClauses=JSON.parse(parent.whereClauses)
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
                    let sj={}
                      if(parent?.sortClauses!=undefined)
                        sj=JSON.parse(parent.sortClauses)
                      let codSortSingle=[]
                     console.log("parentsort",sj)
                      if(sj!=undefined && sj?.["mtmsbareasbprofesores"]!=undefined && sj?.["mtmsbareasbprofesores"]?.[0]!="nosort")
                        codSortSingle=codifySortRuleMtm(sj["mtmsbareasbprofesores"],"sbarea",db.sbarea,"sbarea_sbprofesores",db.sbarea_sbprofesores)
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
                          },
                          
                        }
                      },
                      order:codSortSingle,
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
                      
                      objeto["id"]=x["sbareas.id"]
                      objeto.mtmsbprofesoressbareaId=x["id"]
                      Object.keys(objeto).filter(z=>{
                        
                        if("mtmsbareasbprofesoresId".startsWith(z))
                          objeto["mtmsbareasbprofesoresId"]=objeto[z]
                    })
                    //in field server
                      if(objeto["mtmsbareasbprofesoresId"]!=null)
                        res.push(objeto)
                    })
                    res=res.map(o=>({
                      ...o,
                      whereClauses:parent.whereClauses,
                      sortClauses:parent.sortClauses,
                      key:"mtmsbareasbprofesores",
                      otherKey:"mtmsbprofesoressbarea"


                    }))
                    return res

                },mtmsbmateriassbprofesores:async(parent,args,{db})=>{
                    let products=[]
                    let whereClauses
                    if(parent.whereClauses)
                      whereClauses=JSON.parse(parent.whereClauses)
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
                    let sj={}
                      if(parent?.sortClauses!=undefined)
                        sj=JSON.parse(parent.sortClauses)
                      let codSortSingle=[]
                     console.log("parentsort",sj)
                      if(sj!=undefined && sj?.["mtmsbmateriassbprofesores"]!=undefined && sj?.["mtmsbmateriassbprofesores"]?.[0]!="nosort")
                        codSortSingle=codifySortRuleMtm(sj["mtmsbmateriassbprofesores"],"sbmaterias",db.sbmaterias,"sbmaterias_sbprofesores",db.sbmaterias_sbprofesores)
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
                          },
                          
                        }
                      },
                      order:codSortSingle,
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
                      Object.keys(objeto).filter(z=>{
                        
                        if("mtmsbmateriassbprofesoresId".startsWith(z))
                          objeto["mtmsbmateriassbprofesoresId"]=objeto[z]
                    })
                    //in field server
                      if(objeto["mtmsbmateriassbprofesoresId"]!=null)
                        res.push(objeto)
                    })
                    res=res.map(o=>({
                      ...o,
                      whereClauses:parent.whereClauses,
                      sortClauses:parent.sortClauses,
                      key:"mtmsbmateriassbprofesores",
                      otherKey:"mtmsbprofesoressbmaterias"


                    }))
                    return res

                },
            },
            Query:{
                sbprofesores:async(parent,args,{db})=>{
                  const products=await db.sbprofesores.findAll()
                  return products     
                }
              },
              Mutation:{createsbprofesores:async(parent,args,{db})=>{
                let product=null
                let p=null
                if(args.id==null){
                  product=await db.sbprofesores.create(args)
                  return product
                }else{
                  p=await db.sbprofesores.update({
                    [args["parentArg"]]:args[args["parentArg"]],
                    
                  },
                  {
                  where:{id:args.id}
                  })
                }
                if(p){
                  const nuevo=await db.sbprofesores.findByPk(args.id)
                  return nuevo
                }
                return null
              },
               
                getDatasbprofesores:async(parent,args,{db})=>{
                  let nj={}
                  
                  if(args.whereClauses!=""){
                    nj=JSON.parse(args.whereClauses)
                  }
                  let condWhere={}
                  if(nj?.sbprofesores?.["main"]!=undefined &&
                  nj?.sbprofesores?.["main"]!="none")
                    condWhere=codifyRule(nj,sbprofesores)

                  let sj={}
                  if(args?.sortClauses!=undefined)
                    sj=JSON.parse(args.sortClauses)
                  let codSort=[]
                  if(sj!=undefined && sj?.["sbprofesores"]!=undefined && sj?.["sbprofesores"]?.[0]!="nosort")
                    codSort=codifySortRule(sj["sbprofesores"])
                  let products=await db.sbprofesores.findAll({
                    raw:true,
                    where:{...condWhere},
                    order:codSort
                  })
                  products=products.map(x=>({
                    ...x,whereClauses:args.whereClauses,sortClauses:args.sortClauses
                  }))
                  return products
                },removesbprofesores:async(parent,args,{db})=>{
                      let p
                      try{
                        if(args.hardDelete==true){
                          for(let x=0;x<args.otmCategoryIds.length;x++){
                            let ke=args.otmCategoryIds[x]
                            let fi="otmsbprofesores"+ke+"Id"
                            console.log("resres",
                              "db."+ke+".update({"+fi+":0},{where:{"+fi+":"+args.id+"}})")
                            db[ke].update({[fi]:0},{where:{[fi]:args.id}})
                          }
                          let table=""
                          
                            
                          for(let x=0;x<args.mtmCategoryIds.length;x++){
                            if("sbprofesores">args.mtmCategoryIds[x])
                              table=args.mtmCategoryIds[x]+"_"+"sbprofesores"
                            else
                              table="sbprofesores"+"_"+args.mtmCategoryIds[x]
                            
                            let mtmvar="mtm"+"sbprofesores"+args.mtmCategoryIds[x]+"Id"
                            console.log("resres",
                              "db."+table+".destroy({where:{"+mtmvar+":"+args.id+"}})")
                            db[table].destroy({where:{[mtmvar]:args.id}})
                          }
                         const product=await db.sbarea.findByPk(args.id)
                          product.destroy()
                          return true

                        }else{
                          p=await db.sbprofesores.update({
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
                    getsbprofesores:async(parent,args,{db})=>{
                  const resp=await db.sbprofesores.findByPk(args.id)
                  return resp
                },
                editsbprofesores:async(parent,args,{db})=>{
              let camposDate=[]
await db.sbprofesores.update({
                        id:args["id"],nombre:args.nombre,registro:args.registro,mtmsbareasbprofesores:args.mtmsbareasbprofesores,mtmsbmateriassbprofesores:args.mtmsbmateriassbprofesores,otmsbgrupossbprofesoresId:args.otmsbgrupossbprofesoresId,profesorId:args.profesorId,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.sbprofesores.findByPk(args.id)
                    return nuevo

                  }
                }
              }