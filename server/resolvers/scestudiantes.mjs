
            import {Op} from 'sequelize'
            export default{
          datamtmsccarrerasscestudiantes:{
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
                  
                  
                },datamtmscgruposscestudiantes:{
                  mtmscestudiantesscgrupos:async(parent,args,{db})=>{
                    const x=await db.scestudiantes_scgrupos.findAll({
                      where:{mtmscgruposscestudiantesId:parent.id},
                      raw:true
                    })
                    const cd=x.map(c=>c["mtmscestudiantesscgruposId"])
                    console.log("cdddd",cd)
                    let recs=await db.scestudiantes.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    recs=recs.map(r=>{
                      let nf="mtmscestudiantesscgruposId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return recs
                  }
                  
                  
                },scestudiantes:{
              
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
                  },
                  mtmscgruposscestudiantes:async(parent,args,{db})=>{
                    const x=await db.scestudiantes_scgrupos.findAll({
                      where:{mtmscestudiantesscgruposId:parent.id},
                      raw:true
                    })
                    const cd=x.map(c=>c["mtmscgruposscestudiantesId"])
                    console.log("cdddd",cd)
                    let recs=await db.scgrupos.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    recs=recs.map(r=>{
                      let nf="mtmscgruposscestudiantesId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return recs
                  }
                  
            },
            Query:{
                scestudiantes:async(parent,args,{db})=>{
                  const products=await db.scestudiantes.findAll()
                  return products     
                }
              },Mutation:{
                
                createscestudiantes:async(parent,args,{db})=>{const product=await db.scestudiantes.create(args)
                  return product
                  
                },
               
                getDatascestudiantes:async(parent,args,{db})=>{
                  const products=await db.scestudiantes.findAll({raw:true})
                  
                  return products
                },removescestudiantes:async(parent,args,{db})=>{
                      try{
                        const product=await db.scestudiantes.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getscestudiantes:async(parent,args,{db})=>{
                  const resp=await db.scestudiantes.findByPk(args.id)
                  return resp
                },
                editscestudiantes:async(parent,args,{db})=>{
              let camposDate=[]
await db.scestudiantes.update({
                        id:args["id"],nombre:args.nombre,boleta:args.boleta,startingYear:args.startingYear,semestertype:args.semestertype,mtmsccarrerasscestudiantes:args.mtmsccarrerasscestudiantes,mtmscgruposscestudiantes:args.mtmscgruposscestudiantes,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.scestudiantes.findByPk(args.id)
                    return nuevo

                  }
                }
              }