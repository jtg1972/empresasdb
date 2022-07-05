
            import {Op} from 'sequelize'
            export default{
          Alumnos:{
              
              mtmGruposAlumnos:async(parent,args,{db})=>{
                    const x=await db.Alumnos_Grupos.findAll({
                      where:{mtmAlumnosGruposId:parent.id},
                      raw:true
                    })
                    const cd=x.map(c=>c["mtmGruposAlumnosId"])
                    console.log("cdddd",cd)
                    const recs=db.Grupos.findAll({where:{id:{[Op.in]:cd}},
                    raw:true})
                    return recs
                  }
            },
            Query:{
                Alumnos:async(parent,args,{db})=>{
                  const products=await db.Alumnos.findAll()
                  return products     
                }
              },
              Mutation:{
                createAlumnos:async(parent,args,{db})=>{
                  const product=await db.Alumnos.create(args)
                  return product
                  
                },
               
                getDataAlumnos:async(parent,args,{db})=>{
                  const products=await db.Alumnos.findAll({raw:true})
                  
                  return products
                },
removeAlumnos_Grupos:async(parent,args,{db})=>{
                  
                    try{
                      const products=await db.Alumnos_Grupos.findOne({where:{
                        mtmAlumnosGruposId:args.mtmAlumnosGruposId,
                        mtmGruposAlumnosId:args.mtmGruposAlumnosId
                      }})
                      console.log("productsreciente",products)
                      products.destroy()
                    
                      return true
                    }catch(e){
                      console.log("error",e)
                      return false
                    }
                  },
                  getAlumnos:async(parent,args,{db})=>{
                  const resp=await db.Alumnos.findByPk(args.id)
                  return resp
                },
                editAlumnos:async(parent,args,{db})=>{
              await db.Alumnos.update({
                      id:args["id"],mtmGruposAlumnos:args["mtmGruposAlumnos"],estudiante:args["estudiante"]
                    },
                    {
                    where:{id:args.id}
                    }
                  )
                
                  const nuevo=await db.Alumnos.findByPk(args.id)
                  return nuevo

                }
              }
            }
          