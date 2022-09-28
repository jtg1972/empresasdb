
            import {Op} from 'sequelize'
            export default{
          datamtmGruposAlumnos:{
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
                  
                  
                },Alumnos:{
              
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
                  
            },
            Query:{
                Alumnos:async(parent,args,{db})=>{
                  const products=await db.Alumnos.findAll()
                  return products     
                }
              },Mutation:{
                
                createAlumnos:async(parent,args,{db})=>{
                  const product=await db.Alumnos.create(args)
                  return product
                  
                },
               
                getDataAlumnos:async(parent,args,{db})=>{
                  const products=await db.Alumnos.findAll({raw:true})
                  
                  return products
                },removeAlumnos:async(parent,args,{db})=>{
                      try{
                        const product=await db.Alumnos.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getAlumnos:async(parent,args,{db})=>{
                  const resp=await db.Alumnos.findByPk(args.id)
                  return resp
                },
                editAlumnos:async(parent,args,{db})=>{
              await db.Alumnos.update({
                        id:args["id"],mtmGruposAlumnos:args.mtmGruposAlumnos,estudiante:args.estudiante
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.Alumnos.findByPk(args.id)
                    return nuevo

                  }
                }
              }