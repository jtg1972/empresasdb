
            import {Op} from 'sequelize'
            export default{
          Query:{
                Alumnos_Grupos:async(parent,args,{db})=>{
                  const products=await db.Alumnos_Grupos.findAll()
                  return products     
                },
                
                
              },
              Mutation:{
                createAlumnos_Grupos:async(parent,args,{db})=>{
                  const product=await db.Alumnos_Grupos.create(args)
                  return product
                  
                },
                getdatamtmGruposAlumnos:async(parent,args,{db})=>{
                  try{
                    console.log("argsbusca21",args)

                  let products=await db.Alumnos_Grupos.findAll({
                    where:{mtmAlumnosGruposId:args.mtmAlumnosGruposId},
                    raw:true
                  })
                  let cids=products.map(c=>c.mtmGruposAlumnosId)
                  let respProds=await db.Grupos.findAll({
                    where:{id:{[Op.in]:cids}},
                    raw:true
                  })
                  let final=products.map(r=>{
                    let p=respProds.filter(t=>t.id==r.mtmGruposAlumnosId)[0]
                    return {...r,...p}

                  })
                  console.log("final",final)
                  return final
                }catch(e){
                  console.log("getdatamtmgruposalu")
                }
                },
                getdatamtmAlumnosGrupos:async(parent,args,{db})=>{
                  try{
                    console.log("argsbusca",args)

                  let products=await db.Alumnos_Grupos.findAll({
                    where:{mtmGruposAlumnosId:args.mtmGruposAlumnosId},
                    raw:true
                  })
                  let cids=products.map(c=>c.mtmAlumnosGruposId)
                  let respProds=await db.Alumnos.findAll({
                    where:{id:{[Op.in]:cids}},
                    raw:true
                  })
                  let final=products.map(r=>{
                    let p=respProds.filter(t=>t.id==r.mtmAlumnosGruposId)[0]
                    return {...r,...p}

                  })
                  console.log("final",final)
                  return final
                }catch(e){
                  console.log("getdatamtmalugru")
                }
                },


                createdatamtmGruposAlumnos:async(parent,args,{db})=>{
                  try{
                  console.log("args",args)
                  let product=await db.Alumnos_Grupos.create(args)
                  product=product.dataValues
                  console.log("producto",product)
                  let grupo=await db.Grupos.findAll({where:{id:args.mtmGruposAlumnosId},raw:true})
                  
                  return {...grupo[0],...product}
                  }catch(e){
                    console.log("createdatamtmgruposal")
                  }

                },
                createdatamtmAlumnosGrupos:async(parent,args,{db})=>{
                  try{
                    console.log("argsbusca",args)

                  let product=await db.Alumnos_Grupos.create(args)
                  product=product.dataValues
                  console.log("producto",product)
                  let alumno=await db.Alumnos.findAll({where:{id:args.mtmAlumnosGruposId},raw:true})
                  console.log("res",{...alumno[0],...product})
                  return {...alumno[0],...product}
                  }catch(e){
                    console.log("createdatamtmalgr")
                  }
                },
                getonedatamtmGruposAlumnos:async(parent,args,{db})=>{
                  console.log("argsbusca",args)

                  try{
                  let product=await db.Alumnos_Grupos.findAll({
                    where:{
                      mtmGruposAlumnosId:args.mtmGruposAlumnosId,
                      mtmAlumnosGruposId:args.mtmAlumnosGruposId
                    },
                    raw:true
                  })
                  product=product[0]
                  let respProd=await db.Grupos.findAll({
                    where:{
                      id:args.mtmGruposAlumnosId
                    },
                    raw:true
                  })
                  console.log("res22",{...respProd[0],...product})
                  return {...respProd[0],...product}
                }catch(e){
                  console.log("geonedatamtmgrual")
                }
                },
                getonedatamtmAlumnosGrupos:async(parent,args,{db})=>{
                  try{
                  console.log("argsbusca",args)
                  let product=await db.Alumnos_Grupos.findAll({
                    where:{
                      mtmGruposAlumnosId:args.mtmGruposAlumnosId,
                      mtmAlumnosGruposId:args.mtmAlumnosGruposId
                    },
                    raw:true
                  })
                  product=product[0]
                  let respProd=await db.Alumnos.findAll({
                    where:{
                      id:args.mtmAlumnosGruposId
                    },
                    raw:true
                  })
                  console.log("res22",{...respProd[0],...product})
                  return {...respProd[0],...product}
                }catch(e){
                  console.log("getonedataalgru")
                }
                },
               
                getDataAlumnos_Grupos:async(parent,args,{db})=>{
                  const products=await db.Alumnos_Grupos.findAll({raw:true})
                  
                  return products
                },removeAlumnos_Grupos:async(parent,args,{db})=>{
                  
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
            Alumnos_GruposByAlumnosId:async(parent,args,{db})=>{
              const products=await db.Alumnos_Grupos.findAll({
                where:{mtmAlumnosGruposId:args.mtmAlumnosGruposId},
                raw:true})
              return products
            },
            Alumnos_GruposByGruposId:async(parent,args,{db})=>{
              const products=await db.Alumnos_Grupos.findAll({
                where:{mtmGruposAlumnosId:args.mtmGruposAlumnosId},
                raw:true})
              return products
            },
            getAlumnos_Grupos:async(parent,args,{db})=>{
                  const resp=await db.Alumnos_Grupos.findByPk(args.id)
                  return resp
                },
                editAlumnos_Grupos:async(parent,args,{db})=>{
              await db.Alumnos_Grupos.update({
                      
                      campo_mutuo1:args["campo_mutuo1"]
                    },
                    {
                    where:{
                      mtmAlumnosGruposId:args["mtmAlumnosGruposId"],
                      mtmGruposAlumnosId:args["mtmGruposAlumnosId"]
                    }
                    }
                  )
                
                  const nuevo=await db.Alumnos_Grupos.findByPk(args.id)
                  return nuevo

                }
              }
            }
          