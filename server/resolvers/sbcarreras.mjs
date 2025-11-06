
            import {Op} from 'sequelize'
            import {codifyRuleMtm} from './../utils/whereClauses/index.mjs'
            import {codifySortRule} from './../utils/whereClauses/index.mjs'
            import {codifySortRuleMtm} from './../utils/whereClauses/index.mjs'
            import codifyRule from './../utils/whereClauses/index.mjs'
            export default{
          datamtmsbmateriassbcarreras:{
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
sbcarreras:{
              
              mtmsbmateriassbcarreras:async(parent,args,{db})=>{
                    let products=[]
                    let whereClauses
                    if(parent.whereClauses)
                      whereClauses=JSON.parse(parent.whereClauses)
                    let singleWhere={}
                    let sharedWhere={}
                    if(whereClauses!=undefined &&
                      whereClauses?.["mtmsbmateriassbcarreras"]?.["single"]?.["main"]!=undefined &&
                      whereClauses?.["mtmsbmateriassbcarreras"]?.["single"]?.["main"]!="none"
                    ){
                      singleWhere=codifyRuleMtm(whereClauses,"mtmsbmateriassbcarreras","single")
                    }
                    if(whereClauses!=undefined &&
                      whereClauses?.["mtmsbmateriassbcarreras"]?.["shared"]?.["main"]!=undefined &&
                      whereClauses?.["mtmsbmateriassbcarreras"]?.["shared"]?.["main"]!="none"
                    ){
                      sharedWhere=codifyRuleMtm(whereClauses,"mtmsbmateriassbcarreras","shared")
                    }
                    let sj={}
                      if(parent?.sortClauses!=undefined)
                        sj=JSON.parse(parent.sortClauses)
                      let codSortSingle=[]
                     console.log("parentsort",sj)
                      if(sj!=undefined && sj?.["mtmsbmateriassbcarreras"]!=undefined && sj?.["mtmsbmateriassbcarreras"]?.[0]!="nosort")
                        codSortSingle=codifySortRuleMtm(sj["mtmsbmateriassbcarreras"],"sbmaterias",db.sbmaterias,"sbcarreras_sbmaterias",db.sbcarreras_sbmaterias)
                    products=await db.sbcarreras.findAll({
                      where:{id:parent.id},
                      include:{
                        required:false,
                        model:db.sbmaterias,
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
                      
                      objeto["id"]=x["sbmaterias.id"]
                      objeto.mtmsbcarrerassbmateriasId=x["id"]
                      Object.keys(objeto).filter(z=>{
                        
                        if("mtmsbmateriassbcarrerasId".startsWith(z))
                          objeto["mtmsbmateriassbcarrerasId"]=objeto[z]
                    })
                    //in field server
                      if(objeto["mtmsbmateriassbcarrerasId"]!=null)
                        res.push(objeto)
                    })
                    res=res.map(o=>({
                      ...o,
                      whereClauses:parent.whereClauses,
                      sortClauses:parent.sortClauses,
                      key:"mtmsbmateriassbcarreras",
                      otherKey:"mtmsbcarrerassbmaterias"


                    }))
                    return res

                },
            },
            Query:{
                sbcarreras:async(parent,args,{db})=>{
                  const products=await db.sbcarreras.findAll()
                  return products     
                }
              },
              Mutation:{createsbcarreras:async(parent,args,{db})=>{
                let product=null
                let p=null
                if(args.id==null){
                  product=await db.sbcarreras.create(args)
                  return product
                }else{
                  p=await db.sbcarreras.update({
                    [args["parentArg"]]:args[args["parentArg"]],
                    
                  },
                  {
                  where:{id:args.id}
                  })
                }
                if(p){
                  const nuevo=await db.sbcarreras.findByPk(args.id)
                  return nuevo
                }
                return null
              },
               
                getDatasbcarreras:async(parent,args,{db})=>{
                  let nj={}
                  
                  if(args.whereClauses!=""){
                    nj=JSON.parse(args.whereClauses)
                  }
                  let condWhere={}
                  if(nj?.sbcarreras?.["main"]!=undefined &&
                  nj?.sbcarreras?.["main"]!="none")
                    condWhere=codifyRule(nj,sbcarreras)

                  let sj={}
                  if(args?.sortClauses!=undefined)
                    sj=JSON.parse(args.sortClauses)
                  let codSort=[]
                  if(sj!=undefined && sj?.["sbcarreras"]!=undefined && sj?.["sbcarreras"]?.[0]!="nosort")
                    codSort=codifySortRule(sj["sbcarreras"])
                  let products=await db.sbcarreras.findAll({
                    raw:true,
                    where:{...condWhere},
                    order:codSort
                  })
                  products=products.map(x=>({
                    ...x,whereClauses:args.whereClauses,sortClauses:args.sortClauses
                  }))
                  return products
                },removesbcarreras:async(parent,args,{db})=>{
                      let p
                      try{
                        if(args.hardDelete==true){
                          for(let x=0;x<args.otmCategoryIds.length;x++){
                            let ke=args.otmCategoryIds[x]
                            let fi="otmsbcarreras"+ke+"Id"
                            console.log("resres",
                              "db."+ke+".update({"+fi+":0},{where:{"+fi+":"+args.id+"}})")
                            db[ke].update({[fi]:0},{where:{[fi]:args.id}})
                          }
                          let table=""
                          
                            
                          for(let x=0;x<args.mtmCategoryIds.length;x++){
                            if("sbcarreras">args.mtmCategoryIds[x])
                              table=args.mtmCategoryIds[x]+"_"+"sbcarreras"
                            else
                              table="sbcarreras"+"_"+args.mtmCategoryIds[x]
                            
                            let mtmvar="mtm"+"sbcarreras"+args.mtmCategoryIds[x]+"Id"
                            console.log("resres",
                              "db."+table+".destroy({where:{"+mtmvar+":"+args.id+"}})")
                            db[table].destroy({where:{[mtmvar]:args.id}})
                          }
                         const product=await db.sbarea.findByPk(args.id)
                          product.destroy()
                          return true

                        }else{
                          p=await db.sbcarreras.update({
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
                    getsbcarreras:async(parent,args,{db})=>{
                  const resp=await db.sbcarreras.findByPk(args.id)
                  return resp
                },
                editsbcarreras:async(parent,args,{db})=>{
              let camposDate=[]
await db.sbcarreras.update({
                        id:args["id"],carrera:args.carrera,mtmsbmateriassbcarreras:args.mtmsbmateriassbcarreras,otmsbareasbcarrerasId:args.otmsbareasbcarrerasId,carreraId:args.carreraId,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.sbcarreras.findByPk(args.id)
                    return nuevo

                  }
                }
              }