
            import {Op} from 'sequelize'
            export default{
          datamtmscprofesoresscareas:{
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
                  }
                  
                  
                },scareas:{
              otmscareassccarreras:async(parent,args,{db})=>{
                    const x=await db.sccarreras.findAll({
                      where:{otmscareassccarrerasId:parent.id},
                      raw:true
                    })
                    
                    return x
                  },otmscareasscmaterias:async(parent,args,{db})=>{
                    const x=await db.scmaterias.findAll({
                      where:{otmscareasscmateriasId:parent.id},
                      raw:true
                    })
                    
                    return x
                  },
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
                  
            },
            Query:{
                scareas:async(parent,args,{db})=>{
                  const products=await db.scareas.findAll()
                  return products     
                }
              },Mutation:{
                
                createscareas:async(parent,args,{db})=>{const product=await db.scareas.create(args)
                  return product
                  
                },
               
                getDatascareas:async(parent,args,{db})=>{
                  const products=await db.scareas.findAll({raw:true})
                  
                  return products
                },removescareas:async(parent,args,{db})=>{
                      try{
                        const product=await db.scareas.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getscareas:async(parent,args,{db})=>{
                  const resp=await db.scareas.findByPk(args.id)
                  return resp
                },
                editscareas:async(parent,args,{db})=>{
              let camposDate=[]
await db.scareas.update({
                        id:args["id"],area:args.area,otmscareassccarreras:args.otmscareassccarreras,otmscareasscmaterias:args.otmscareasscmaterias,mtmscprofesoresscareas:args.mtmscprofesoresscareas,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.scareas.findByPk(args.id)
                    return nuevo

                  }
                }
              }