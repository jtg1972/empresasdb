
            import {Op} from 'sequelize'
            export default{
          originalmtmsbestudiantessbgrupos:{
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
                    const cids=x.map(c=>c["mtmsbestudiantessbgruposId"])
                    console.log("cdddd",cd)
                    let recs=await db.sbgrupos.findAll({where:{id:{[Op.in]:cids}},raw:true})
                    let final=products.map(r=>{
                      let nf="mtmsbgrupossbestudiantesId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return final
                  }
                  
                  
                },sbgrupos:{
              
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
                    const cd=products.map(c=>c["mtmsbestudiantessbgruposId"])
                    console.log("cdddd",cd)
                    let recs=await db.sbestudiantes.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    let final=products.map(r=>{
                      
                      let p=recs.filter(t=>t.id==r.mtmsbestudiantessbgruposId)[0]
                      
                      return {
                        original:{
                          ...r,...p,
                          key:"mtmsbestudiantessbgrupos"
                        },
                        copy:{
                          ...oneside[0],
                          ...r,
                          key:"mtmsbgrupossbestudiantes"
                        }
                    }})
                    return final
                  },
                  
            },
            Query:{
                sbgrupos:async(parent,args,{db})=>{
                  const products=await db.sbgrupos.findAll()
                  return products     
                }
              },Mutation:{
                
                createsbgrupos:async(parent,args,{db})=>{const product=await db.sbgrupos.create(args)
                  return product
                  
                },
               
                getDatasbgrupos:async(parent,args,{db})=>{
                  const products=await db.sbgrupos.findAll({raw:true})
                  
                  return products
                },removesbgrupos:async(parent,args,{db})=>{
                      try{
                        const product=await db.sbgrupos.findByPk(args.id)
                        product.destroy()
                        return true
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
                        id:args["id"],clavedelgrupo:args.clavedelgrupo,grupoId:args.grupoId,otmsbmateriassbgruposId:args.otmsbmateriassbgruposId,mtmsbestudiantessbgrupos:args.mtmsbestudiantessbgrupos,
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