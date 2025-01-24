
            import {Op} from 'sequelize'
            export default{
          datamtmscestudiantesscgrupos:{
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
                  
                  
                },scgrupos:{
              
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
                  
            },
            Query:{
                scgrupos:async(parent,args,{db})=>{
                  const products=await db.scgrupos.findAll()
                  return products     
                }
              },Mutation:{
                
                createscgrupos:async(parent,args,{db})=>{const product=await db.scgrupos.create(args)
                  return product
                  
                },
               
                getDatascgrupos:async(parent,args,{db})=>{
                  const products=await db.scgrupos.findAll({raw:true})
                  
                  return products
                },removescgrupos:async(parent,args,{db})=>{
                      try{
                        const product=await db.scgrupos.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getscgrupos:async(parent,args,{db})=>{
                  const resp=await db.scgrupos.findByPk(args.id)
                  return resp
                },
                editscgrupos:async(parent,args,{db})=>{
              let camposDate=[]
await db.scgrupos.update({
                        id:args["id"],clavedelgrupo:args.clavedelgrupo,otmscprofesoresscgruposId:args.otmscprofesoresscgruposId,mtmscestudiantesscgrupos:args.mtmscestudiantesscgrupos,otmscmateriasscgruposId:args.otmscmateriasscgruposId,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.scgrupos.findByPk(args.id)
                    return nuevo

                  }
                }
              }