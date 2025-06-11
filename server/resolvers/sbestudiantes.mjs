
            import {Op} from 'sequelize'
            export default{
          originalmtmsbgrupossbestudiantes:{
                  mtmsbestudiantessbgrupos:async(parent,args,{db})=>{
                    const products=await db.sbestudiantes_sbgrupos.findAll({
                      where:{mtmsbgrupossbestudiantesId:parent.id},
                      raw:true
                    })
                    let oneside=await db.sbgrupos.findAll({
                      where:{
                        id:parent.id
                      },raw:true
                    })
                    const cids=x.map(c=>c["mtmsbgrupossbestudiantesId"])
                    console.log("cdddd",cd)
                    let recs=await db.sbestudiantes.findAll({where:{id:{[Op.in]:cids}},raw:true})
                    let final=products.map(r=>{
                      let nf="mtmsbestudiantessbgruposId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return final
                  }
                  
                  
                },sbestudiantes:{
              
              mtmsbgrupossbestudiantes:async(parent,args,{db})=>{
                    const products=await db.sbestudiantes_sbgrupos.findAll({
                      where:{mtmsbestudiantessbgruposId:parent.id},
                      raw:true
                    })
                    let oneside=await db.sbestudiantes.findAll({
                      where:{
                        id:parent.id
                      },raw:true
                    })
                    const cd=products.map(c=>c["mtmsbgrupossbestudiantesId"])
                    console.log("cdddd",cd)
                    let recs=await db.sbgrupos.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    let final=products.map(r=>{
                      
                      let p=recs.filter(t=>t.id==r.mtmsbgrupossbestudiantesId)[0]
                      
                      return {
                        original:{
                          ...r,...p,
                          key:"mtmsbgrupossbestudiantes"
                        },
                        copy:{
                          ...oneside[0],
                          ...r,
                          key:"mtmsbestudiantessbgrupos"
                        }
                    }})
                    return final
                  },
                  
            },
            Query:{
                sbestudiantes:async(parent,args,{db})=>{
                  const products=await db.sbestudiantes.findAll()
                  return products     
                }
              },Mutation:{
                
                createsbestudiantes:async(parent,args,{db})=>{const product=await db.sbestudiantes.create(args)
                  return product
                  
                },
               
                getDatasbestudiantes:async(parent,args,{db})=>{
                  const products=await db.sbestudiantes.findAll({raw:true})
                  
                  return products
                },removesbestudiantes:async(parent,args,{db})=>{
                      try{
                        const product=await db.sbestudiantes.findByPk(args.id)
                        product.destroy()
                        return true
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