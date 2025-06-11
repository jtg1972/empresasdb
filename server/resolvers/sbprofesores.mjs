
            import {Op} from 'sequelize'
            export default{
          originalmtmsbareasbprofesores:{
                  mtmsbprofesoressbarea:async(parent,args,{db})=>{
                    const products=await db.sbarea_sbprofesores.findAll({
                      where:{mtmsbareasbprofesoresId:parent.id},
                      raw:true
                    })
                    let oneside=await db.sbarea.findAll({
                      where:{
                        id:parent.id
                      },raw:true
                    })
                    const cids=x.map(c=>c["mtmsbareasbprofesoresId"])
                    console.log("cdddd",cd)
                    let recs=await db.sbprofesores.findAll({where:{id:{[Op.in]:cids}},raw:true})
                    let final=products.map(r=>{
                      let nf="mtmsbprofesoressbareaId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return final
                  }
                  
                  
                },originalmtmsbmateriassbprofesores:{
                  mtmsbprofesoressbmaterias:async(parent,args,{db})=>{
                    const products=await db.sbmaterias_sbprofesores.findAll({
                      where:{mtmsbmateriassbprofesoresId:parent.id},
                      raw:true
                    })
                    let oneside=await db.sbmaterias.findAll({
                      where:{
                        id:parent.id
                      },raw:true
                    })
                    const cids=x.map(c=>c["mtmsbmateriassbprofesoresId"])
                    console.log("cdddd",cd)
                    let recs=await db.sbprofesores.findAll({where:{id:{[Op.in]:cids}},raw:true})
                    let final=products.map(r=>{
                      let nf="mtmsbprofesoressbmateriasId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return final
                  }
                  
                  
                },sbprofesores:{
              
              mtmsbareasbprofesores:async(parent,args,{db})=>{
                    const products=await db.sbarea_sbprofesores.findAll({
                      where:{mtmsbprofesoressbareaId:parent.id},
                      raw:true
                    })
                    let oneside=await db.sbprofesores.findAll({
                      where:{
                        id:parent.id
                      },raw:true
                    })
                    const cd=products.map(c=>c["mtmsbareasbprofesoresId"])
                    console.log("cdddd",cd)
                    let recs=await db.sbarea.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    let final=products.map(r=>{
                      
                      let p=recs.filter(t=>t.id==r.mtmsbareasbprofesoresId)[0]
                      
                      return {
                        original:{
                          ...r,...p,
                          key:"mtmsbareasbprofesores"
                        },
                        copy:{
                          ...oneside[0],
                          ...r,
                          key:"mtmsbprofesoressbarea"
                        }
                    }})
                    return final
                  },
                  mtmsbmateriassbprofesores:async(parent,args,{db})=>{
                    const products=await db.sbmaterias_sbprofesores.findAll({
                      where:{mtmsbprofesoressbmateriasId:parent.id},
                      raw:true
                    })
                    let oneside=await db.sbprofesores.findAll({
                      where:{
                        id:parent.id
                      },raw:true
                    })
                    const cd=products.map(c=>c["mtmsbmateriassbprofesoresId"])
                    console.log("cdddd",cd)
                    let recs=await db.sbmaterias.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    let final=products.map(r=>{
                      
                      let p=recs.filter(t=>t.id==r.mtmsbmateriassbprofesoresId)[0]
                      
                      return {
                        original:{
                          ...r,...p,
                          key:"mtmsbmateriassbprofesores"
                        },
                        copy:{
                          ...oneside[0],
                          ...r,
                          key:"mtmsbprofesoressbmaterias"
                        }
                    }})
                    return final
                  },
                  
            },
            Query:{
                sbprofesores:async(parent,args,{db})=>{
                  const products=await db.sbprofesores.findAll()
                  return products     
                }
              },Mutation:{
                
                createsbprofesores:async(parent,args,{db})=>{const product=await db.sbprofesores.create(args)
                  return product
                  
                },
               
                getDatasbprofesores:async(parent,args,{db})=>{
                  const products=await db.sbprofesores.findAll({raw:true})
                  
                  return products
                },removesbprofesores:async(parent,args,{db})=>{
                      try{
                        const product=await db.sbprofesores.findByPk(args.id)
                        product.destroy()
                        return true
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
                        id:args["id"],nombre:args.nombre,registro:args.registro,mtmsbareasbprofesores:args.mtmsbareasbprofesores,profesorId:args.profesorId,mtmsbmateriassbprofesores:args.mtmsbmateriassbprofesores,
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