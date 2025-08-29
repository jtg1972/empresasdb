
            import {Op} from 'sequelize'
            import {codifyRuleMtm} from './../utils/whereClauses/index.mjs'
            import codifyRule from './../utils/whereClauses/index.mjs'
            export default{
          datamtmsbgrupossbestudiantes:{
                  mtmsbestudiantessbgrupos:async(parent,args,{db})=>{
                        let products=[]
                        let whereClauses=JSON.parse(parent.whereClauses)
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
                          objeto["id"]=x["sbestudiantes.id"]
                          objeto.mtmsbgrupossbestudiantesId=x["id"]
                          if(objeto["mtmsbestudiantessbgruposId"]!=null)
                            res.push(objeto)
                        })
                        res.map(o=>({
                          ...o,
                          whereClauses:parent.whereClauses,
                          key:"mtmsbestudiantessbgrupos",
                          otherKey:"mtmsbgrupossbestudiantes"


                        }))
                        return res

                    },
otmsbgrupossbprofesores:async(parent,args,{db})=>{
                      let nj=JSON.parse(parent.whereClauses)
                      let wc={}
                      if(nj?.whereClauses!=undefined &&
                        nj?.["otmsbgrupossbprofesores"] &&
                        nj?.["otmsbgrupossbprofesores"]?.["main"]!=undefined &&
                        nj?.["otmsbgrupossbprofesores"]?.["main"]!="none"
                      ){
                        wc=codifyRule(nj,"otmsbgrupossbprofesores")
                        
                      }
                      let products=await db.sbprofesores.findAll({
                        where:{[Op.and]:[{otmsbgrupossbprofesoresId:parent.id},{...wc}]},
                        raw:true

                      })
                      products=products.map(x=>({
                        ...x,whereClauses:parent.whereClauses
                      }))
                      return products
                    }
                }  
                ,
sbestudiantes:{
              
              mtmsbgrupossbestudiantes:async(parent,args,{db})=>{
                    let products=[]
                    let whereClauses=JSON.parse(parent.whereClauses)
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
                      objeto["id"]=x["sbgrupos.id"]
                      objeto.mtmsbestudiantessbgruposId=x["id"]
                      if(objeto["mtmsbgrupossbestudiantesId"]!=null)
                        res.push(objeto)
                    })
                    res.map(o=>({
                      ...o,
                      whereClauses:parent.whereClauses,
                      key:"mtmsbgrupossbestudiantes",
                      otherKey:"mtmsbestudiantessbgrupos"


                    }))
                    return res

                },
            },
            Query:{
                sbestudiantes:async(parent,args,{db})=>{
                  const products=await db.sbestudiantes.findAll()
                  return products     
                }
              },
              Mutation:{
                
                

                createsbestudiantes:async(parent,args,{db})=>{
                let product=null
                let p=null
                if(args.id==null){
                  product=await db.sbestudiantes.create(args)
                  return product
                }else{
                  p=await db.sbestudiantes.update({
                    [args["parentArg"]]:args[args["parentArg"]],
                    
                  },
                  {
                  where:{id:args.id}
                  })
                }
                if(p){
                  const nuevo=await db.sbestudiantes.findByPk(args.id)
                  return nuevo
                }
                return null
              },
               
                getDatasbestudiantes:async(parent,args,{db})=>{
                  let nj={}
                  if(args.whereClauses!=""){
                    nj=JSON.parse(args.whereClauses)
                  }
                  let condWhere={}
                  if(nj?.sbestudiantes?.["main"]!=undefined &&
                  nj?.sbestudiantes?.["main"]!="none")
                    condWhere=codifyRule(nj,sbestudiantes)
                  let products=await db.sbestudiantes.findAll({
                    raw:true,
                    where:{...condWhere}
                  })
                  products=products.map(x=>({
                    ...x,whereClauses:args.whereClauses
                  }))
                  return products
                },removesbestudiantes:async(parent,args,{db})=>{
                      let p
                      try{
                        if(args.hardDelete==true){
                          const product=await db.sbestudiantes.findByPk(args.id)
                          product.destroy()
                          return true
                        }else{
                          p=await db.sbestudiantes.update({
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
                    getsbestudiantes:async(parent,args,{db})=>{
                  const resp=await db.sbestudiantes.findByPk(args.id)
                  return resp
                },
                editsbestudiantes:async(parent,args,{db})=>{
              let camposDate=[]
await db.sbestudiantes.update({
                        id:args["id"],nombre:args.nombre,boleta:args.boleta,incomingyear:args.incomingyear,semesterType:args.semesterType,estudianteId:args.estudianteId,mtmsbgrupossbestudiantes:args.mtmsbgrupossbestudiantes,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.sbestudiantes.findByPk(args.id)
                    return nuevo

                  }
                }
              }