
            import {Op} from 'sequelize'
            export default{
          originalmtmsbmateriassbcarreras:{
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
                    const cids=x.map(c=>c["mtmsbmateriassbcarrerasId"])
                    console.log("cdddd",cd)
                    let recs=await db.sbcarreras.findAll({where:{id:{[Op.in]:cids}},raw:true})
                    let final=products.map(r=>{
                      let nf="mtmsbcarrerassbmateriasId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return final
                  }
                  
                  
                },sbcarreras:{
              
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
                        original:{
                          ...r,...p,
                          key:"mtmsbmateriassbcarreras"
                        },
                        copy:{
                          ...oneside[0],
                          ...r,
                          key:"mtmsbcarrerassbmaterias"
                        }
                    }})
                    return final
                  },
                  
            },
            Query:{
                sbcarreras:async(parent,args,{db})=>{
                  const products=await db.sbcarreras.findAll()
                  return products     
                }
              },Mutation:{
                
                createsbcarreras:async(parent,args,{db})=>{const product=await db.sbcarreras.create(args)
                  return product
                  
                },
               
                getDatasbcarreras:async(parent,args,{db})=>{
                  const products=await db.sbcarreras.findAll({raw:true})
                  
                  return products
                },removesbcarreras:async(parent,args,{db})=>{
                      try{
                        const product=await db.sbcarreras.findByPk(args.id)
                        product.destroy()
                        return true
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