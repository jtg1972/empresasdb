
            import {Op} from 'sequelize'
            export default{
          datamtmscareasscprofesores:{
                  mtmscprofesoresscareas:async(parent,args,{db})=>{
                    const x=await db.scareas_scprofesores.findAll({
                      where:{mtmscareasscprofesoresId:parent.id},
                      raw:true
                    })
                    const cd=x.map(c=>c["mtmscprofesoresscareasId"])
                    console.log("cdddd",cd)
                    let recs=await db.scprofesores.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    recs=recs.map(r=>{
                      let nf="mtmscprofesoresscareasId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return recs
                  }
                  
                  
                },datamtmscmateriasscprofesores:{
                  mtmscprofesoresscmaterias:async(parent,args,{db})=>{
                    const x=await db.scmaterias_scprofesores.findAll({
                      where:{mtmscmateriasscprofesoresId:parent.id},
                      raw:true
                    })
                    const cd=x.map(c=>c["mtmscprofesoresscmateriasId"])
                    console.log("cdddd",cd)
                    let recs=await db.scprofesores.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    recs=recs.map(r=>{
                      let nf="mtmscprofesoresscmateriasId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return recs
                  }
                  
                  
                },scprofesores:{
              otmscprofesoresscgrupos:async(parent,args,{db})=>{
                    const x=await db.scgrupos.findAll({
                      where:{otmscprofesoresscgruposId:parent.id},
                      raw:true
                    })
                    
                    return x
                  },
              mtmscareasscprofesores:async(parent,args,{db})=>{
                    const x=await db.scareas_scprofesores.findAll({
                      where:{mtmscprofesoresscareasId:parent.id},
                      raw:true
                    })
                    const cd=x.map(c=>c["mtmscareasscprofesoresId"])
                    console.log("cdddd",cd)
                    let recs=await db.scareas.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    recs=recs.map(r=>{
                      let nf="mtmscareasscprofesoresId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return recs
                  },
                  mtmscmateriasscprofesores:async(parent,args,{db})=>{
                    const x=await db.scmaterias_scprofesores.findAll({
                      where:{mtmscprofesoresscmateriasId:parent.id},
                      raw:true
                    })
                    const cd=x.map(c=>c["mtmscmateriasscprofesoresId"])
                    console.log("cdddd",cd)
                    let recs=await db.scmaterias.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    recs=recs.map(r=>{
                      let nf="mtmscmateriasscprofesoresId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return recs
                  }
                  
            },
            Query:{
                scprofesores:async(parent,args,{db})=>{
                  const products=await db.scprofesores.findAll()
                  return products     
                }
              },Mutation:{
                
                createscprofesores:async(parent,args,{db})=>{const product=await db.scprofesores.create(args)
                  return product
                  
                },
               
                getDatascprofesores:async(parent,args,{db})=>{
                  const products=await db.scprofesores.findAll({raw:true})
                  
                  return products
                },removescprofesores:async(parent,args,{db})=>{
                      try{
                        const product=await db.scprofesores.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getscprofesores:async(parent,args,{db})=>{
                  const resp=await db.scprofesores.findByPk(args.id)
                  return resp
                },
                editscprofesores:async(parent,args,{db})=>{
              let camposDate=[]
await db.scprofesores.update({
                        id:args["id"],nombre:args.nombre,noderegistro:args.noderegistro,mtmscareasscprofesores:args.mtmscareasscprofesores,mtmscmateriasscprofesores:args.mtmscmateriasscprofesores,otmscprofesoresscgrupos:args.otmscprofesoresscgrupos,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.scprofesores.findByPk(args.id)
                    return nuevo

                  }
                }
              }