
            import {Op} from 'sequelize'
            import {codifyRuleMtm} from './../utils/whereClauses/index.mjs'
            import codifyRule from './../utils/whereClauses/index.mjs'
            export default{
          datamtmsbcarrerassbmaterias:{
                  mtmsbmateriassbcarreras:async(parent,args,{db})=>{
                        let products=[]
                        let whereClauses=JSON.parse(parent.whereClauses)
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
                          objeto.mtmsbcarrerassbmateriasId=x["id"]
                          if(objeto["mtmsbmateriassbcarrerasId"]!=null)
                            res.push(objeto)
                        })
                        res.map(o=>({
                          ...o,
                          whereClauses:parent.whereClauses,
                          key:"mtmsbmateriassbcarreras",
                          otherKey:"mtmsbcarrerassbmaterias"


                        }))
                        return res

                    }
                }  
                ,
datamtmsbprofesoressbmaterias:{
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
sbmaterias:{
              otmsbmateriassbgrupos:async(parent,args,{db})=>{
                    let nj=JSON.parse(parent.whereClauses)
                    let wc={}
                    if(parent?.whereClauses!=undefined &&
                      nj?.["otmsbmateriassbgrupos"] &&
                      nj?.["otmsbmateriassbgrupos"]?.["main"]!=undefined &&
                      nj?.["otmsbmateriassbgrupos"]?.["main"]!="none"
                    ){
                      wc=codifyRule(nj,"otmsbmateriassbgrupos")
                      
                    }
                    let products=await db.sbgrupos.findAll({
                      where:{[Op.and]:[{otmsbmateriassbgruposId:parent.id},{...wc}]},
                      raw:true

                    })
                    products=products.map(x=>({
                      ...x,whereClauses:parent.whereClauses
                    }))
                    return products
                  },
              mtmsbcarrerassbmaterias:async(parent,args,{db})=>{
                    let products=[]
                    let whereClauses=JSON.parse(parent.whereClauses)
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
                      objeto["id"]=x["sbcarreras.id"]
                      objeto.mtmsbmateriassbcarrerasId=x["id"]
                      if(objeto["mtmsbcarrerassbmateriasId"]!=null)
                        res.push(objeto)
                    })
                    res.map(o=>({
                      ...o,
                      whereClauses:parent.whereClauses,
                      key:"mtmsbcarrerassbmaterias",
                      otherKey:"mtmsbmateriassbcarreras"


                    }))
                    return res

                },mtmsbprofesoressbmaterias:async(parent,args,{db})=>{
                    let products=[]
                    let whereClauses=JSON.parse(parent.whereClauses)
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
                      objeto.mtmsbmateriassbprofesoresId=x["id"]
                      if(objeto["mtmsbprofesoressbmateriasId"]!=null)
                        res.push(objeto)
                    })
                    res.map(o=>({
                      ...o,
                      whereClauses:parent.whereClauses,
                      key:"mtmsbprofesoressbmaterias",
                      otherKey:"mtmsbmateriassbprofesores"


                    }))
                    return res

                },
            },
            Query:{
                sbmaterias:async(parent,args,{db})=>{
                  const products=await db.sbmaterias.findAll()
                  return products     
                }
              },
              Mutation:{
                
                

                createsbmaterias:async(parent,args,{db})=>{
                let product=null
                let p=null
                if(args.id==null){
                  product=await db.sbmaterias.create(args)
                  return product
                }else{
                  p=await db.sbmaterias.update({
                    [args["parentArg"]]:args[args["parentArg"]],
                    
                  },
                  {
                  where:{id:args.id}
                  })
                }
                if(p){
                  const nuevo=await db.sbmaterias.findByPk(args.id)
                  return nuevo
                }
                return null
              },
               
                getDatasbmaterias:async(parent,args,{db})=>{
                  let nj={}
                  if(args.whereClauses!=""){
                    nj=JSON.parse(args.whereClauses)
                  }
                  let condWhere={}
                  if(nj?.sbmaterias?.["main"]!=undefined &&
                  nj?.sbmaterias?.["main"]!="none")
                    condWhere=codifyRule(nj,sbmaterias)
                  let products=await db.sbmaterias.findAll({
                    raw:true,
                    where:{...condWhere}
                  })
                  products=products.map(x=>({
                    ...x,whereClauses:args.whereClauses
                  }))
                  return products
                },removesbmaterias:async(parent,args,{db})=>{
                      let p
                      try{
                        if(args.hardDelete==true){
                          const product=await db.sbmaterias.findByPk(args.id)
                          product.destroy()
                          return true
                        }else{
                          p=await db.sbmaterias.update({
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
                    getsbmaterias:async(parent,args,{db})=>{
                  const resp=await db.sbmaterias.findByPk(args.id)
                  return resp
                },
                editsbmaterias:async(parent,args,{db})=>{
              let camposDate=[]
await db.sbmaterias.update({
                        id:args["id"],materia:args.materia,materiaId:args.materiaId,mtmsbcarrerassbmaterias:args.mtmsbcarrerassbmaterias,otmsbareasbmateriasId:args.otmsbareasbmateriasId,otmsbmateriassbgrupos:args.otmsbmateriassbgrupos,mtmsbprofesoressbmaterias:args.mtmsbprofesoressbmaterias,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.sbmaterias.findByPk(args.id)
                    return nuevo

                  }
                }
              }