
            import {Op} from 'sequelize'
            export default{
          originalmtmsbprofesoressbarea:{
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
                    const cids=x.map(c=>c["mtmsbprofesoressbareaId"])
                    console.log("cdddd",cd)
                    let recs=await db.sbarea.findAll({where:{id:{[Op.in]:cids}},raw:true})
                    let final=products.map(r=>{
                      let nf="mtmsbareasbprofesoresId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return final
                  }
                  
                  
                },sbarea:{
              otmsbareasbcarreras:async(parent,args,{db})=>{
                    const x=await db.sbcarreras.findAll({
                      where:{otmsbareasbcarrerasId:parent.id},
                      raw:true
                    })
                    
                    return x
                  },otmsbareasbmaterias:async(parent,args,{db})=>{
                    const x=await db.sbmaterias.findAll({
                      where:{otmsbareasbmateriasId:parent.id},
                      raw:true
                    })
                    
                    return x
                  },
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
                    const cd=products.map(c=>c["mtmsbprofesoressbareaId"])
                    console.log("cdddd",cd)
                    let recs=await db.sbprofesores.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    let final=products.map(r=>{
                      
                      let p=recs.filter(t=>t.id==r.mtmsbprofesoressbareaId)[0]
                      
                      return {
                        original:{
                          ...r,...p,
                          key:"mtmsbprofesoressbarea"
                        },
                        copy:{
                          ...oneside[0],
                          ...r,
                          key:"mtmsbareasbprofesores"
                        }
                    }})
                    return final
                  },
                  
            },
            Query:{
                sbarea:async(parent,args,{db})=>{
                  const products=await db.sbarea.findAll()
                  return products     
                }
              },Mutation:{
                
                createsbarea:async(parent,args,{db})=>{const product=await db.sbarea.create(args)
                  return product
                  
                },
               
                getDatasbarea:async(parent,args,{db})=>{
                  const products=await db.sbarea.findAll({raw:true})
                  
                  return products
                },removesbarea:async(parent,args,{db})=>{
                      try{
                        const product=await db.sbarea.findByPk(args.id)
                        product.destroy()
                        return true
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