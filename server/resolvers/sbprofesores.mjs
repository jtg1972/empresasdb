
            import {Op} from 'sequelize'
            export default{
          datamtmsbareasbprofesores:{
                  otmsbareasbcarreras:async(parent,args,{db})=>{
                      const x=await db.sbcarreras.findAll({
                        where:{otmsbareasbcarrerasId:parent.id},
                        raw:true
                      })
                      
                      return x
                    },
otmsbareasbmaterias:async(parent,args,{db})=>{
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
                            
                              ...r,...p,
                              key:"mtmsbprofesoressbarea"
                            }
                           
                        })
                        return final
                      

                    }
                }  
                ,
datamtmsbmateriassbprofesores:{
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
otmsbmateriassbgrupos:async(parent,args,{db})=>{
                      const x=await db.sbgrupos.findAll({
                        where:{otmsbmateriassbgruposId:parent.id},
                        raw:true
                      })
                      
                      return x
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
                      

                    }
                }  
                ,
sbprofesores:{
              
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
                  },
                  
            },
            Query:{
                sbprofesores:async(parent,args,{db})=>{
                  const products=await db.sbprofesores.findAll()
                  return products     
                }
              },Mutation:{
                
                

                createsbprofesores:async(parent,args,{db})=>{
                let product=null
                let p=null
                if(args.id==null){
                  product=await db.sbprofesores.create(args)
                  return product
                }else{
                  p=await db.sbprofesores.update({
                    [args["parentArg"]]:args[args["parentArg"]],
                    
                  },
                  {
                  where:{id:args.id}
                  })
                }
                if(p){
                  const nuevo=await db.sbprofesores.findByPk(args.id)
                  return nuevo
                }
                return null
              },
               
                getDatasbprofesores:async(parent,args,{db})=>{
                  const products=await db.sbprofesores.findAll({raw:true})
                  
                  return products
                },removesbprofesores:async(parent,args,{db})=>{
                      let p
                      try{
                        if(args.hardDelete==true){
                          const product=await db.sbprofesores.findByPk(args.id)
                          product.destroy()
                          return true
                        }else{
                          p=await db.sbprofesores.update({
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
                    getsbprofesores:async(parent,args,{db})=>{
                  const resp=await db.sbprofesores.findByPk(args.id)
                  return resp
                },
                editsbprofesores:async(parent,args,{db})=>{
              let camposDate=[]
await db.sbprofesores.update({
                        id:args["id"],nombre:args.nombre,registro:args.registro,mtmsbareasbprofesores:args.mtmsbareasbprofesores,mtmsbmateriassbprofesores:args.mtmsbmateriassbprofesores,otmsbgrupossbprofesoresId:args.otmsbgrupossbprofesoresId,profesorId:args.profesorId,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.sbprofesores.findByPk(args.id)
                    return nuevo

                  }
                }
              }