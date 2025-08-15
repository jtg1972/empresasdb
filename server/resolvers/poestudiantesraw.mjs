
            import {Op} from 'sequelize'
            export default{
          originalmtmpogruposrawpoestudiantesraw:{
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
                    const cids=x.map(c=>c["mtmpogruposrawpoestudiantesrawId"])
                    console.log("cdddd",cd)
                    let recs=await db.poestudiantesraw.findAll({where:{id:{[Op.in]:cids}},raw:true})
                    let final=products.map(r=>{
                      let nf="mtmpoestudiantesrawpogruposrawId"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return final
                  }
                  
                  
                },poestudiantesraw:{
              
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
                    const cd=products.map(c=>c["mtmpogruposrawpoestudiantesrawId"])
                    console.log("cdddd",cd)
                    let recs=await db.pogruposraw.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    let final=products.map(r=>{
                      
                      let p=recs.filter(t=>t.id==r.mtmpogruposrawpoestudiantesrawId)[0]
                      
                      return {
                        original:{
                          ...r,...p,
                          key:"mtmpogruposrawpoestudiantesraw"
                        },
                        copy:{
                          ...oneside[0],
                          ...r,
                          key:"mtmpoestudiantesrawpogruposraw"
                        }
                    }})
                    return final
                  },
                  
            },
            Query:{
                poestudiantesraw:async(parent,args,{db})=>{
                  const products=await db.poestudiantesraw.findAll()
                  return products     
                }
              },Mutation:{
                
                createpoestudiantesraw:async(parent,args,{db})=>{const product=await db.poestudiantesraw.create(args)
                  return product
                  
                },
               
                getDatapoestudiantesraw:async(parent,args,{db})=>{
                  const products=await db.poestudiantesraw.findAll({raw:true})
                  
                  return products
                },removepoestudiantesraw:async(parent,args,{db})=>{
                      try{
                        const product=await db.poestudiantesraw.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getpoestudiantesraw:async(parent,args,{db})=>{
                  const resp=await db.poestudiantesraw.findByPk(args.id)
                  return resp
                },
                editpoestudiantesraw:async(parent,args,{db})=>{
              let camposDate=[]
await db.poestudiantesraw.update({
                        id:args["id"],estudiantesid:args.estudiantesid,mtmpogruposrawpoestudiantesraw:args.mtmpogruposrawpoestudiantesraw,nombre:args.nombre,yearingreso:args.yearingreso,tiposemestre:args.tiposemestre,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.poestudiantesraw.findByPk(args.id)
                    return nuevo

                  }
                }
              }