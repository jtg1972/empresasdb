
            import {Op} from 'sequelize'
            export default{
          datamtmscmateriassccarreras:{
                  mtmsccarrerasscmaterias:async(parent,args,{db})=>{
                    const x=await db.sccarreras_scmaterias.findAll({
                      where:{mtmscmateriassccarrerasId:parent.id},
                      raw:true
                    })
                    const cd=x.map(c=>c["mtmsccarrerasscmateriasId"])
                    console.log("cdddd",cd)
                    let recs=await db.sccarreras.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    recs=recs.map(r=>{
                      let nf="mtmsccarrerasscmateriasId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return recs
                  }
                  
                  
                },datamtmscestudiantessccarreras:{
                  mtmsccarrerasscestudiantes:async(parent,args,{db})=>{
                    const x=await db.sccarreras_scestudiantes.findAll({
                      where:{mtmscestudiantessccarrerasId:parent.id},
                      raw:true
                    })
                    const cd=x.map(c=>c["mtmsccarrerasscestudiantesId"])
                    console.log("cdddd",cd)
                    let recs=await db.sccarreras.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    recs=recs.map(r=>{
                      let nf="mtmsccarrerasscestudiantesId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return recs
                  }
                  
                  
                },sccarreras:{
              
              mtmscmateriassccarreras:async(parent,args,{db})=>{
                    const x=await db.sccarreras_scmaterias.findAll({
                      where:{mtmsccarrerasscmateriasId:parent.id},
                      raw:true
                    })
                    const cd=x.map(c=>c["mtmscmateriassccarrerasId"])
                    console.log("cdddd",cd)
                    let recs=await db.scmaterias.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    recs=recs.map(r=>{
                      let nf="mtmscmateriassccarrerasId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return recs
                  },
                  mtmscestudiantessccarreras:async(parent,args,{db})=>{
                    const x=await db.sccarreras_scestudiantes.findAll({
                      where:{mtmsccarrerasscestudiantesId:parent.id},
                      raw:true
                    })
                    const cd=x.map(c=>c["mtmscestudiantessccarrerasId"])
                    console.log("cdddd",cd)
                    let recs=await db.scestudiantes.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    recs=recs.map(r=>{
                      let nf="mtmscestudiantessccarrerasId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return recs
                  }
                  
            },
            Query:{
                sccarreras:async(parent,args,{db})=>{
                  const products=await db.sccarreras.findAll()
                  return products     
                }
              },Mutation:{
                
                createsccarreras:async(parent,args,{db})=>{const product=await db.sccarreras.create(args)
                  return product
                  
                },
               
                getDatasccarreras:async(parent,args,{db})=>{
                  const products=await db.sccarreras.findAll({raw:true})
                  
                  return products
                },removesccarreras:async(parent,args,{db})=>{
                      try{
                        const product=await db.sccarreras.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getsccarreras:async(parent,args,{db})=>{
                  const resp=await db.sccarreras.findByPk(args.id)
                  return resp
                },
                editsccarreras:async(parent,args,{db})=>{
              let camposDate=[]
await db.sccarreras.update({
                        id:args["id"],carrera:args.carrera,otmscareassccarrerasId:args.otmscareassccarrerasId,mtmscmateriassccarreras:args.mtmscmateriassccarreras,mtmscestudiantessccarreras:args.mtmscestudiantessccarreras,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.sccarreras.findByPk(args.id)
                    return nuevo

                  }
                }
              }