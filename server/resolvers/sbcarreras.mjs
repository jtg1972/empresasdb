
            import {Op} from 'sequelize'
            export default{
          datamtmsbmateriassbcarreras:{
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
sbcarreras:{
              
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
                          whereClauses:parent.whereClauses,
                          ...r,...p,
                          key:"mtmsbmateriassbcarreras"
                        }
                       
                    })
                    return final
                  },
                  
            },
            Query:{
                sbcarreras:async(parent,args,{db})=>{
                  const products=await db.sbcarreras.findAll()
                  return products     
                }
              },Mutation:{
                
                

                createsbcarreras:async(parent,args,{db})=>{
                let product=null
                let p=null
                if(args.id==null){
                  product=await db.sbcarreras.create(args)
                  return product
                }else{
                  p=await db.sbcarreras.update({
                    [args["parentArg"]]:args[args["parentArg"]],
                    
                  },
                  {
                  where:{id:args.id}
                  })
                }
                if(p){
                  const nuevo=await db.sbcarreras.findByPk(args.id)
                  return nuevo
                }
                return null
              },
               
                getDatasbcarreras:async(parent,args,{db})=>{
                  const products=await db.sbcarreras.findAll({raw:true})
                  
                  return products
                },removesbcarreras:async(parent,args,{db})=>{
                      let p
                      try{
                        if(args.hardDelete==true){
                          const product=await db.sbcarreras.findByPk(args.id)
                          product.destroy()
                          return true
                        }else{
                          p=await db.sbcarreras.update({
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
                    getsbcarreras:async(parent,args,{db})=>{
                  const resp=await db.sbcarreras.findByPk(args.id)
                  return resp
                },
                editsbcarreras:async(parent,args,{db})=>{
              let camposDate=[]
await db.sbcarreras.update({
                        id:args["id"],carrera:args.carrera,carreraId:args.carreraId,mtmsbmateriassbcarreras:args.mtmsbmateriassbcarreras,otmsbareasbcarrerasId:args.otmsbareasbcarrerasId,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.sbcarreras.findByPk(args.id)
                    return nuevo

                  }
                }
              }