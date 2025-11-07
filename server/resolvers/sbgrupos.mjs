
            import {Op} from 'sequelize'
            import {codifyRuleMtm} from './../utils/whereClauses/index.mjs'
            import {codifySortRule} from './../utils/whereClauses/index.mjs'
            import {codifySortRuleMtm} from './../utils/whereClauses/index.mjs'
            import codifyRule from './../utils/whereClauses/index.mjs'
            export default{
          datamtmsbestudiantessbgrupos:{
                  mtmsbgrupossbestudiantes:async(parent,args,{db})=>{
                        let products=[]
                        let whereClauses
                        if(parent.whereClauses)
                          whereClauses=JSON.parse(parent.whereClauses)
                        let singleWhere={}
                        let sharedWhere={}
                        if(whereClauses!=undefined &&
                          whereClauses?.["mtmsbgrupossbestudiantes"]?.["single"]?.["main"]!=undefined &&
                          whereClauses?.["mtmsbgrupossbestudiantes"]?.["single"]?.["main"]!="none"
                        ){
                          singleWhere=codifyRuleMtm(whereClauses,"mtmsbgrupossbestudiantes","single")
                        }
                        if(whereClauses!=undefined &&
                          whereClauses?.["mtmsbgrupossbestudiantes"]?.["shared"]?.["main"]!=undefined &&
                          whereClauses?.["mtmsbgrupossbestudiantes"]?.["shared"]?.["main"]!="none"
                        ){
                          sharedWhere=codifyRuleMtm(whereClauses,"mtmsbgrupossbestudiantes","shared")
                        }
                        let sj={}
                      if(parent?.sortClauses!=undefined)
                        sj=JSON.parse(parent.sortClauses)
                      let codSortSingle=[]
                     console.log("parentsort",sj)
                      if(sj!=undefined && sj?.["mtmsbgrupossbestudiantes"]!=undefined && sj?.["mtmsbgrupossbestudiantes"]?.[0]!="nosort")
                        codSortSingle=codifySortRuleMtm(sj["mtmsbgrupossbestudiantes"],"sbgrupos",db.sbgrupos,"sbestudiantes_sbgrupos",db.sbestudiantes_sbgrupos)
                      
                      
                    console.log("codsortsingle",codSortSingle)
                        products=await db.sbestudiantes.findAll({
                          where:{id:parent.id},
                          include:{
                            required:false,
                            model:db.sbgrupos,
                            where:{
                              ...singleWhere
                            },
                            
                            through:{
                              model:db.sbestudiantes_sbgrupos,
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
                          
                          objeto["id"]=x["sbgrupos.id"]
                          objeto.mtmsbestudiantessbgruposId=x["id"]
                          Object.keys(objeto).filter(z=>{
                        
                            if("mtmsbgrupossbestudiantesId".startsWith(z))
                              objeto["mtmsbgrupossbestudiantesId"]=objeto[z]
                        })
                        //in field server
                          if(objeto["mtmsbgrupossbestudiantesId"]!=null)
                            res.push(objeto)
                        })
                        res=res.map(o=>({
                          ...o,
                          whereClauses:parent.whereClauses,
                          sortClauses:parent.sortClauses,
                          key:"mtmsbgrupossbestudiantes",
                          otherKey:"mtmsbestudiantessbgrupos"


                        }))
                        return res

                    }
                }  
                ,
sbgrupos:{
              otmsbgrupossbprofesores:async(parent,args,{db})=>{
                    let nj
                    if(parent?.whereClauses)
                      
                       nj=JSON.parse(parent.whereClauses)
                    let wc={}
                    if(parent?.whereClauses!=undefined &&
                      nj?.["otmsbgrupossbprofesores"] &&
                      nj?.["otmsbgrupossbprofesores"]?.["main"]!=undefined &&
                      nj?.["otmsbgrupossbprofesores"]?.["main"]!="none"
                    ){
                      wc=codifyRule(nj,"otmsbgrupossbprofesores")
                      
                    }
                    let sj={}
                      if(parent?.sortClauses!=undefined)
                        sj=JSON.parse(parent.sortClauses)
                      let codSort=[]
                      if(sj!=undefined && sj?.["otmsbgrupossbprofesores"]!=undefined && sj?.["otmsbgrupossbprofesores"]?.[0]!="nosort")
                        codSort=codifySortRule(sj["otmsbgrupossbprofesores"])
                    let products=await db.sbprofesores.findAll({
                      where:{[Op.and]:[{otmsbgrupossbprofesoresId:parent.id},{...wc}]},
                      raw:true,
                      order:codSort
                    })
                    products=products.map(x=>({
                      ...x,whereClauses:parent.whereClauses,
                      sortClauses:parent.sortClauses
                    }))
                    return products
                  },
              mtmsbestudiantessbgrupos:async(parent,args,{db})=>{
                    let products=[]
                    let whereClauses
                    if(parent.whereClauses)
                      whereClauses=JSON.parse(parent.whereClauses)
                    let singleWhere={}
                    let sharedWhere={}
                    if(whereClauses!=undefined &&
                      whereClauses?.["mtmsbestudiantessbgrupos"]?.["single"]?.["main"]!=undefined &&
                      whereClauses?.["mtmsbestudiantessbgrupos"]?.["single"]?.["main"]!="none"
                    ){
                      singleWhere=codifyRuleMtm(whereClauses,"mtmsbestudiantessbgrupos","single")
                    }
                    if(whereClauses!=undefined &&
                      whereClauses?.["mtmsbestudiantessbgrupos"]?.["shared"]?.["main"]!=undefined &&
                      whereClauses?.["mtmsbestudiantessbgrupos"]?.["shared"]?.["main"]!="none"
                    ){
                      sharedWhere=codifyRuleMtm(whereClauses,"mtmsbestudiantessbgrupos","shared")
                    }
                    let sj={}
                      if(parent?.sortClauses!=undefined)
                        sj=JSON.parse(parent.sortClauses)
                      let codSortSingle=[]
                     console.log("parentsort",sj)
                      if(sj!=undefined && sj?.["mtmsbestudiantessbgrupos"]!=undefined && sj?.["mtmsbestudiantessbgrupos"]?.[0]!="nosort")
                        codSortSingle=codifySortRuleMtm(sj["mtmsbestudiantessbgrupos"],"sbestudiantes",db.sbestudiantes,"sbestudiantes_sbgrupos",db.sbestudiantes_sbgrupos)
                    products=await db.sbgrupos.findAll({
                      where:{id:parent.id},
                      include:{
                        required:false,
                        model:db.sbestudiantes,
                        where:{
                          ...singleWhere
                        },
                        
                        through:{
                          model:db.sbestudiantes_sbgrupos,
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
                      
                      objeto["id"]=x["sbestudiantes.id"]
                      objeto.mtmsbgrupossbestudiantesId=x["id"]
                      Object.keys(objeto).filter(z=>{
                        
                        if("mtmsbestudiantessbgruposId".startsWith(z))
                          objeto["mtmsbestudiantessbgruposId"]=objeto[z]
                    })
                    //in field server
                      if(objeto["mtmsbestudiantessbgruposId"]!=null)
                        res.push(objeto)
                    })
                    res=res.map(o=>({
                      ...o,
                      whereClauses:parent.whereClauses,
                      sortClauses:parent.sortClauses,
                      key:"mtmsbestudiantessbgrupos",
                      otherKey:"mtmsbgrupossbestudiantes"


                    }))
                    return res

                },
            },
            Query:{
                sbgrupos:async(parent,args,{db})=>{
                  const products=await db.sbgrupos.findAll()
                  return products     
                }
              },
              Mutation:{createsbgrupos:async(parent,args,{db})=>{
                let product=null
                let p=null
                if(args.id==null){
                  product=await db.sbgrupos.create(args)
                  return product
                }else{
                  p=await db.sbgrupos.update({
                    [args["parentArg"]]:args[args["parentArg"]],
                    
                  },
                  {
                  where:{id:args.id}
                  })
                }
                if(p){
                  const nuevo=await db.sbgrupos.findByPk(args.id)
                  return nuevo
                }
                return null
              },
               
                getDatasbgrupos:async(parent,args,{db})=>{
                  let nj={}
                  
                  if(args.whereClauses!=""){
                    nj=JSON.parse(args.whereClauses)
                  }
                  let condWhere={}
                  if(nj?.sbgrupos?.["main"]!=undefined &&
                  nj?.sbgrupos?.["main"]!="none")
                    condWhere=codifyRule(nj,sbgrupos)

                  let sj={}
                  if(args?.sortClauses!=undefined)
                    sj=JSON.parse(args.sortClauses)
                  let codSort=[]
                  if(sj!=undefined && sj?.["sbgrupos"]!=undefined && sj?.["sbgrupos"]?.[0]!="nosort")
                    codSort=codifySortRule(sj["sbgrupos"])
                  let products=await db.sbgrupos.findAll({
                    raw:true,
                    where:{...condWhere},
                    order:codSort
                  })
                  products=products.map(x=>({
                    ...x,whereClauses:args.whereClauses,sortClauses:args.sortClauses
                  }))
                  return products
                },removesbgrupos:async(parent,args,{db})=>{
                      let p
                      try{
                        if(args.hardDelete==true){
                          for(let x=0;x<args.otmCategoryIds.length;x++){
                            let ke=args.otmCategoryIds[x]
                            let fi="otmsbgrupos"+ke+"Id"
                            console.log("resres",
                              "db."+ke+".update({"+fi+":0},{where:{"+fi+":"+args.id+"}})")
                            db[ke].update({[fi]:0},{where:{[fi]:args.id}})
                          }
                          let table=""
                          
                            
                          for(let x=0;x<args.mtmCategoryIds.length;x++){
                            if("sbgrupos">args.mtmCategoryIds[x])
                              table=args.mtmCategoryIds[x]+"_"+"sbgrupos"
                            else
                              table="sbgrupos"+"_"+args.mtmCategoryIds[x]
                            
                            let mtmvar="mtm"+"sbgrupos"+args.mtmCategoryIds[x]+"Id"
                            console.log("resres",
                              "db."+table+".destroy({where:{"+mtmvar+":"+args.id+"}})")
                            db[table].destroy({where:{[mtmvar]:args.id}})
                          }
                         const product=await db.sbgrupos.findByPk(args.id)
                          product.destroy()
                          return true

                        }else{
                          p=await db.sbgrupos.update({
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
                    getsbgrupos:async(parent,args,{db})=>{
                  const resp=await db.sbgrupos.findByPk(args.id)
                  return resp
                },
                editsbgrupos:async(parent,args,{db})=>{
              let camposDate=[]
await db.sbgrupos.update({
                        id:args["id"],clavedelgrupo:args.clavedelgrupo,otmsbmateriassbgruposId:args.otmsbmateriassbgruposId,mtmsbestudiantessbgrupos:args.mtmsbestudiantessbgrupos,grupoId:args.grupoId,otmsbgrupossbprofesores:args.otmsbgrupossbprofesores,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.sbgrupos.findByPk(args.id)
                    return nuevo

                  }
                }
              }