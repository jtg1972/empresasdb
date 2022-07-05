
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
          