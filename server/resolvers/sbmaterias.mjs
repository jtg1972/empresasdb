
            import {Op} from 'sequelize'
            export default{
          datamtmsbcarrerassbmaterias:{
                  mtmsbmateriassbcarreras:async(parent,args,{db})=>{
                      
                        const products=await db.sbcarreras_sbmaterias.findAll({
                          where:{mtmsbcarrerassbmateriasId:parent.id},
                          raw:true
                        })
                        let oneside=await db.sbcarreras.findAll({
                          where:{
                            id:parent.id
                          },raw:true
                        })
                        const cd=products.map(c=>c["mtmsbmateriassbcarrerasId"])
                        console.log("cdddd",cd)
                        let recs=await db.sbmaterias.findAll({where:{id:{[Op.in]:cd}},raw:true})
                        let final=products.map(r=>{
                          
                          let p=recs.filter(t=>t.id==r.mtmsbmateriassbcarrerasId)[0]
                          
                          return {
                            
                              ...r,...p,
                              key:"mtmsbmateriassbcarreras"
                            }
                           
                        })
                        return final
                      

                    }
                }  
                ,
datamtmsbprofesoressbmaterias:{
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
                            
                              ...r,...p,
                              key:"mtmsbareasbprofesores"
                            }
                           
                        })
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
                            
                              ...r,...p,
                              key:"mtmsbmateriassbprofesores"
                            }
                           
                        })
                        return final
                      

                    }
                }  
                ,
sbmaterias:{
              otmsbmateriassbgrupos:async(parent,args,{db})=>{
                    const x=await db.sbgrupos.findAll({
                      where:{otmsbmateriassbgruposId:parent.id},
                      raw:true
                    })
                    
                    return x
                  },
              mtmsbcarrerassbmaterias:async(parent,args,{db})=>{
                    const products=await db.sbcarreras_sbmaterias.findAll({
                      where:{mtmsbmateriassbcarrerasId:parent.id},
                      raw:true
                    })
                    let oneside=await db.sbmaterias.findAll({
                      where:{
                        id:parent.id
                      },raw:true
                    })
                    const cd=products.map(c=>c["mtmsbcarrerassbmateriasId"])
                    console.log("cdddd",cd)
                    let recs=await db.sbcarreras.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    let final=products.map(r=>{
                      
                      let p=recs.filter(t=>t.id==r.mtmsbcarrerassbmateriasId)[0]
                      
                      return {
                        
                          ...r,...p,
                          key:"mtmsbcarrerassbmaterias"
                        }
                       
                    })
                    return final
                  },
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
                    const cd=products.map(c=>c["mtmsbprofesoressbmateriasId"])
                    console.log("cdddd",cd)
                    let recs=await db.sbprofesores.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    let final=products.map(r=>{
                      
                      let p=recs.filter(t=>t.id==r.mtmsbprofesoressbmateriasId)[0]
                      
                      return {
                        
                          ...r,...p,
                          key:"mtmsbprofesoressbmaterias"
                        }
                       
                    })
                    return final
                  },
                  
            },
            Query:{
                sbmaterias:async(parent,args,{db})=>{
                  const products=await db.sbmaterias.findAll()
                  return products     
                }
              },Mutation:{
                
                

                createsbmaterias:async(parent,args,{db})=>{
                let product=null
                let p=null
                if(args.id==null){
                  product=await db.sbmaterias.create(args)
                  return product
                }else{
                  p=await db.sbmaterias.update({
                    [args["parentArg"]]:args[args["parentArg"]],
                    
                  },
                  {
                  where:{id:args.id}
                  })
                }
                if(p){
                  const nuevo=await db.sbmaterias.findByPk(args.id)
                  return nuevo
                }
                return null
              },
               
                getDatasbmaterias:async(parent,args,{db})=>{
                  const products=await db.sbmaterias.findAll({raw:true})
                  
                  return products
                },removesbmaterias:async(parent,args,{db})=>{
                      let p
                      try{
                        if(args.hardDelete==true){
                          const product=await db.sbmaterias.findByPk(args.id)
                          product.destroy()
                          return true
                        }else{
                          p=await db.sbmaterias.update({
                            [args["parentArg"]]:0,
                            
                          },
                          {
                          where:{id:args.id}
                          }
                          
                        )
                        return true
                        }
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getsbmaterias:async(parent,args,{db})=>{
                  const resp=await db.sbmaterias.findByPk(args.id)
                  return resp
                },
                editsbmaterias:async(parent,args,{db})=>{
              let camposDate=[]
await db.sbmaterias.update({
                        id:args["id"],materia:args.materia,materiaId:args.materiaId,mtmsbcarrerassbmaterias:args.mtmsbcarrerassbmaterias,otmsbareasbmateriasId:args.otmsbareasbmateriasId,otmsbmateriassbgrupos:args.otmsbmateriassbgrupos,mtmsbprofesoressbmaterias:args.mtmsbprofesoressbmaterias,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.sbmaterias.findByPk(args.id)
                    return nuevo

                  }
                }
              }