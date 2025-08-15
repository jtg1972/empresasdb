
            import {Op} from 'sequelize'
            export default{
          originalmtmpoestudiantesrawpogruposraw:{
                  mtmpogruposrawpoestudiantesraw:async(parent,args,{db})=>{
                    const products=await db.poestudiantesraw_pogruposraw.findAll({
                      where:{mtmpoestudiantesrawpogruposrawId:parent.id},
                      raw:true
                    })
                    let oneside=await db.poestudiantesraw.findAll({
                      where:{
                        id:parent.id
                      },raw:true
                    })
                    const cids=x.map(c=>c["mtmpoestudiantesrawpogruposrawId"])
                    console.log("cdddd",cd)
                    let recs=await db.pogruposraw.findAll({where:{id:{[Op.in]:cids}},raw:true})
                    let final=products.map(r=>{
                      let nf="mtmpogruposrawpoestudiantesrawId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return final
                  }
                  
                  
                },pogruposraw:{
              
              mtmpoestudiantesrawpogruposraw:async(parent,args,{db})=>{
                    const products=await db.poestudiantesraw_pogruposraw.findAll({
                      where:{mtmpogruposrawpoestudiantesrawId:parent.id},
                      raw:true
                    })
                    let oneside=await db.pogruposraw.findAll({
                      where:{
                        id:parent.id
                      },raw:true
                    })
                    const cd=products.map(c=>c["mtmpoestudiantesrawpogruposrawId"])
                    console.log("cdddd",cd)
                    let recs=await db.poestudiantesraw.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    let final=products.map(r=>{
                      
                      let p=recs.filter(t=>t.id==r.mtmpoestudiantesrawpogruposrawId)[0]
                      
                      return {
                        original:{
                          ...r,...p,
                          key:"mtmpoestudiantesrawpogruposraw"
                        },
                        copy:{
                          ...oneside[0],
                          ...r,
                          key:"mtmpogruposrawpoestudiantesraw"
                        }
                    }})
                    return final
                  },
                  
            },
            Query:{
                pogruposraw:async(parent,args,{db})=>{
                  const products=await db.pogruposraw.findAll()
                  return products     
                }
              },Mutation:{
                
                createpogruposraw:async(parent,args,{db})=>{const product=await db.pogruposraw.create(args)
                  return product
                  
                },
               
                getDatapogruposraw:async(parent,args,{db})=>{
                  const products=await db.pogruposraw.findAll({raw:true})
                  
                  return products
                },removepogruposraw:async(parent,args,{db})=>{
                      try{
                        const product=await db.pogruposraw.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getpogruposraw:async(parent,args,{db})=>{
                  const resp=await db.pogruposraw.findByPk(args.id)
                  return resp
                },
                editpogruposraw:async(parent,args,{db})=>{
              let camposDate=[]
await db.pogruposraw.update({
                        id:args["id"],mtmpoestudiantesrawpogruposraw:args.mtmpoestudiantesrawpogruposraw,otmpoprofesoresrawpogruposrawId:args.otmpoprofesoresrawpogruposrawId,gruposid:args.gruposid,clave:args.clave,semestre:args.semestre,tiposemestre:args.tiposemestre,year:args.year,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.pogruposraw.findByPk(args.id)
                    return nuevo

                  }
                }
              }