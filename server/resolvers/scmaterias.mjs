
            import {Op} from 'sequelize'
            export default{
        //datamtmsccarrerasscmaterias:{
          originalmtmsccarrerasscmaterias:{
                  mtmscmateriassccarreras:async(parent,args,{db})=>{
                    console.log("parentcatbien77",parent)
                    try{
                      let products=await db.sccarreras_scmaterias.findAll({
                        where:{
                          mtmsccarrerasscmateriasId:parent.original.id
                        },raw:true
      
                      })
                      let oneside=await db.sccarreras.findAll({
                        where:{
                          id:parent.original.id
                        },raw:true
                      })
                      
                      let cids=products.map(c=>c.mtmscmateriassccarrerasId)
                      let respProds=await db.scmaterias.findAll({
                        where:{id:{[Op.in]:cids}},
                        raw:true
                      })

                      console.log("aquiaquiaquiverver",parent.id,products,oneside,cids,respProds)
                      let final=products.map(r=>{
                        let p=respProds.filter(t=>t.id==r.mtmscmateriassccarrerasId)[0]
                        return {original:{
                            ...r,...p,
                          
                          key:"mtmscmateriassccarreras"
                        },
                        copy:{
                          
                            r,...oneside[0],
                          
                          key:"mtmsccarrerasscmaterias"
                        }
                      }
                      })
                      return final
                    }catch(e){
                      console.log("error",e)
                    }
                    /*const x=await db.sccarreras_scmaterias.findAll({
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
                    return recs*/
                  }
                  
                  
                },datamtmscprofesoresscmaterias:{
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
                  
                  
                },scmaterias:{
              otmscmateriasGrupos:async(parent,args,{db})=>{
                    const x=await db.Grupos.findAll({
                      where:{otmscmateriasGruposId:parent.id},
                      raw:true
                    })
                    
                    return x
                  },otmscmateriasscgrupos:async(parent,args,{db})=>{
                    const x=await db.scgrupos.findAll({
                      where:{otmscmateriasscgruposId:parent.id},
                      raw:true
                    })
                    
                    return x
                  },
              mtmsccarrerasscmaterias:async(parent,args,{db})=>{
                try{
                  let products=await db.sccarreras_scmaterias.findAll({
                    where:{
                      mtmscmateriassccarrerasId:parent.id
                    },raw:true
  
                  })
                  let oneside=await db.scmaterias.findAll({
                    where:{
                      id:parent.id
                    },raw:true
                  })
                  
                  let cids=products.map(c=>c.mtmsccarrerasscmateriasId)
                  let respProds=await db.sccarreras.findAll({
                    where:{id:{[Op.in]:cids}},
                    raw:true
                  })

                  console.log("aquiaquiaquiverver",parent.id,products,oneside,cids,respProds)
                  let final=products.map(r=>{
                    let p=respProds.filter(t=>t.id==r.mtmsccarrerasscmateriasId)[0]
                    return {original:{
                        ...r,...p,
                      
                      key:"mtmscmateriassccarreras"
                    },
                    copy:{
                      
                        ...oneside[0],...r,
                      
                      key:"mtmsccarrerasscmaterias"
                    }
                  }
                  })
                  return final
                }catch(e){
                  console.log("error",e)
                }
                    /*const x=await db.sccarreras_scmaterias.findAll({
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
                    return recs*/
                  },
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
                  
            },
            Query:{
                scmaterias:async(parent,args,{db})=>{
                  const products=await db.scmaterias.findAll()
                  return products     
                }
              },Mutation:{
                
                createscmaterias:async(parent,args,{db})=>{const product=await db.scmaterias.create(args)
                  return product
                  
                },
               
                getDatascmaterias:async(parent,args,{db})=>{
                  const products=await db.scmaterias.findAll({raw:true})
                  
                  return products
                },removescmaterias:async(parent,args,{db})=>{
                      try{
                        const product=await db.scmaterias.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getscmaterias:async(parent,args,{db})=>{
                  const resp=await db.scmaterias.findByPk(args.id)
                  return resp
                },
                editscmaterias:async(parent,args,{db})=>{
              let camposDate=[]
await db.scmaterias.update({
                        id:args["id"],materia:args.materia,otmscareasscmateriasId:args.otmscareasscmateriasId,mtmsccarrerasscmaterias:args.mtmsccarrerasscmaterias,mtmscprofesoresscmaterias:args.mtmscprofesoresscmaterias,otmscmateriasGrupos:args.otmscmateriasGrupos,otmscmateriasscgrupos:args.otmscmateriasscgrupos,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.scmaterias.findByPk(args.id)
                    return nuevo

                  }
                }
              }