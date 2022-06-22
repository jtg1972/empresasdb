
            import {Op} from 'sequelize'
            export default{
          Grupos:{
              
              mtmAlumnosGrupos:async(parent,args,{db})=>{
                    const x=await db.Alumnos_Grupos.findAll({
                      where:{mtmGruposAlumnosId:parent.id},
                      raw:true
                    })
                    const cd=x.map(c=>c["mtmAlumnosGruposId"])
                    console.log("cdddd",cd)
                    const recs=db.Alumnos.findAll({where:{id:{[Op.in]:cd}}})
                    return recs
                  }
            },
            Query:{

                Grupos:async(parent,args,{db})=>{
                  const products=await db.Grupos.findAll()
                  return products     
                }
              },
              Mutation:{
                createGrupos:async(parent,args,{db})=>{
                  const product=await db.Grupos.create(args)
                  return product
                },
                getDataGrupos:async(parent,args,{db})=>{
                  const products=await db.Grupos.findAll({raw:true})
                  
                  return products
                },
                removeGrupos:async(parent,args,{db})=>{
                  try{
                    const product=await db.Grupos.findByPk(args.id)
                    product.destroy()
                    return true
                  }catch(e){
                    console.log("error",e)
                    return false
                  }
                },
                editGrupos:async(parent,args,{db})=>{
              await db.Grupos.update({
                      id:args["id"],mtmAlumnosGrupos:args["mtmAlumnosGrupos"],grupo:args["grupo"]
                    },
                    {
                    where:{id:args.id}
                    }
                  )
                
                  const nuevo=await db.Grupos.findByPk(args.id)
                  return nuevo

                }
              }
            }
          