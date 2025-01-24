
            import {Op} from 'sequelize'
            export default{
          datamtmAlumnosGrupos:{
                  mtmGruposAlumnos:async(parent,args,{db})=>{
                    const x=await db.Alumnos_Grupos.findAll({
                      where:{mtmAlumnosGruposId:parent.id},
                      raw:true
                    })
                    const cd=x.map(c=>c["mtmGruposAlumnosId"])
                    console.log("cdddd",cd)
                    let recs=await db.Grupos.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    recs=recs.map(r=>{
                      let nf="mtmGruposAlumnosId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return recs
                  }
                  
                  
                },Grupos:{
              
              mtmAlumnosGrupos:async(parent,args,{db})=>{
                    const x=await db.Alumnos_Grupos.findAll({
                      where:{mtmGruposAlumnosId:parent.id},
                      raw:true
                    })
                    const cd=x.map(c=>c["mtmAlumnosGruposId"])
                    console.log("cdddd",cd)
                    let recs=await db.Alumnos.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    recs=recs.map(r=>{
                      let nf="mtmAlumnosGruposId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return recs
                  }
                  
            },
            Query:{
                Grupos:async(parent,args,{db})=>{
                  const products=await db.Grupos.findAll()
                  return products     
                }
              },Mutation:{
                
                createGrupos:async(parent,args,{db})=>{const product=await db.Grupos.create(args)
                  return product
                  
                },
               
                getDataGrupos:async(parent,args,{db})=>{
                  const products=await db.Grupos.findAll({raw:true})
                  
                  return products
                },removeGrupos:async(parent,args,{db})=>{
                      try{
                        const product=await db.Grupos.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getGrupos:async(parent,args,{db})=>{
                  const resp=await db.Grupos.findByPk(args.id)
                  return resp
                },
                editGrupos:async(parent,args,{db})=>{
              let camposDate=[]
await db.Grupos.update({
                        id:args["id"],mtmAlumnosGrupos:args.mtmAlumnosGrupos,grupo:args.grupo,otmscmateriasGruposId:args.otmscmateriasGruposId,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.Grupos.findByPk(args.id)
                    return nuevo

                  }
                }
              }