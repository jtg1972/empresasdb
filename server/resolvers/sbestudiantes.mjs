
            import {Op} from 'sequelize'
            export default{
          datamtmsbgrupossbestudiantes:{
                  mtmsbestudiantessbgrupos:async(parent,args,{db})=>{
                      
                        const products=await db.sbestudiantes_sbgrupos.findAll({
                          where:{mtmsbgrupossbestudiantesId:parent.id},
                          raw:true
                        })
                        let oneside=await db.sbgrupos.findAll({
                          where:{
                            id:parent.id
                          },raw:true
                        })
                        const cd=products.map(c=>c["mtmsbestudiantessbgruposId"])
                        console.log("cdddd",cd)
                        let recs=await db.sbestudiantes.findAll({where:{id:{[Op.in]:cd}},raw:true})
                        let final=products.map(r=>{
                          
                          let p=recs.filter(t=>t.id==r.mtmsbestudiantessbgruposId)[0]
                          
                          return {
                            
                              ...r,...p,
                              key:"mtmsbestudiantessbgrupos"
                            }
                           
                        })
                        return final
                      

                    },
otmsbgrupossbprofesores:async(parent,args,{db})=>{
                      const x=await db.sbprofesores.findAll({
                        where:{otmsbgrupossbprofesoresId:parent.id},
                        raw:true
                      })
                      
                      return x
                    }
                }  
                ,
sbestudiantes:{
              
              mtmsbgrupossbestudiantes:async(parent,args,{db})=>{
                    const products=await db.sbestudiantes_sbgrupos.findAll({
                      where:{mtmsbestudiantessbgruposId:parent.id},
                      raw:true
                    })
                    let oneside=await db.sbestudiantes.findAll({
                      where:{
                        id:parent.id
                      },raw:true
                    })
                    const cd=products.map(c=>c["mtmsbgrupossbestudiantesId"])
                    console.log("cdddd",cd)
                    let recs=await db.sbgrupos.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    let final=products.map(r=>{
                      
                      let p=recs.filter(t=>t.id==r.mtmsbgrupossbestudiantesId)[0]
                      
                      return {
                        
                          ...r,...p,
                          key:"mtmsbgrupossbestudiantes"
                        }
                       
                    })
                    return final
                  },
                  
            },
            Query:{
                sbestudiantes:async(parent,args,{db})=>{
                  const products=await db.sbestudiantes.findAll()
                  return products     
                }
              },Mutation:{
                
                

                createsbestudiantes:async(parent,args,{db})=>{
                let product=null
                let p=null
                if(args.id==null){
                  product=await db.sbestudiantes.create(args)
                  return product
                }else{
                  p=await db.sbestudiantes.update({
                    [args["parentArg"]]:args[args["parentArg"]],
                    
                  },
                  {
                  where:{id:args.id}
                  })
                }
                if(p){
                  const nuevo=await db.sbestudiantes.findByPk(args.id)
                  return nuevo
                }
                return null
              },
               
                getDatasbestudiantes:async(parent,args,{db})=>{
                  const products=await db.sbestudiantes.findAll({raw:true})
                  
                  return products
                },removesbestudiantes:async(parent,args,{db})=>{
                      let p
                      try{
                        if(args.hardDelete==true){
                          const product=await db.sbestudiantes.findByPk(args.id)
                          product.destroy()
                          return true
                        }else{
                          p=await db.sbestudiantes.update({
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
                    getsbestudiantes:async(parent,args,{db})=>{
                  const resp=await db.sbestudiantes.findByPk(args.id)
                  return resp
                },
                editsbestudiantes:async(parent,args,{db})=>{
              let camposDate=[]
await db.sbestudiantes.update({
                        id:args["id"],nombre:args.nombre,boleta:args.boleta,incomingyear:args.incomingyear,semesterType:args.semesterType,estudianteId:args.estudianteId,mtmsbgrupossbestudiantes:args.mtmsbgrupossbestudiantes,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.sbestudiantes.findByPk(args.id)
                    return nuevo

                  }
                }
              }