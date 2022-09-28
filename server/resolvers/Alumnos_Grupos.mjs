
            import {Op} from 'sequelize'
            export default{
          Query:{
                Alumnos_Grupos:async(parent,args,{db})=>{
                  const products=await db.Alumnos_Grupos.findAll()
                  return products     
                }
              },Mutation:{
                
            getonedatamtmAlumnosGrupos:async(parent,args,{db})=>{
              try{
                let product=await db.Alumnos_Grupos.findAll({
                  where:{
                    mtmGruposAlumnosId:args.mtmGruposAlumnosId,
                    mtmAlumnosGruposId:args.mtmAlumnosGruposId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.Alumnos.findAll({
                  where:{
                    id:args.mtmAlumnosGruposId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getonedatamtmGruposAlumnos:async(parent,args,{db})=>{
              try{
                let product=await db.Alumnos_Grupos.findAll({
                  where:{
                    mtmGruposAlumnosId:args.mtmGruposAlumnosId,
                    mtmAlumnosGruposId:args.mtmAlumnosGruposId
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.Grupos.findAll({
                  where:{
                    id:args.mtmGruposAlumnosId
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getdatamtmAlumnosGrupos:async(parent,args,{db})=>{
              try{
                let products=await db.Alumnos_Grupos.findAll({
                  where:{
                    mtmGruposAlumnosId:args.mtmGruposAlumnosId
                  },raw:true

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
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            getdatamtmGruposAlumnos:async(parent,args,{db})=>{
              try{
                let products=await db.Alumnos_Grupos.findAll({
                  where:{
                    mtmAlumnosGruposId:args.mtmAlumnosGruposId
                  },raw:true

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
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            createdatamtmAlumnosGrupos:async(parent,args,{db})=>{
              try{
                let product=await db.Alumnos_Grupos.create(args)
                product=product.dataValues
                let alumno=await db.Alumnos.findAll({
                  where:{
                    id:args.mtmAlumnosGruposId
                  },
                  raw:true
                })
                return {...alumno[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            createdatamtmGruposAlumnos:async(parent,args,{db})=>{
              try{
                let product=await db.Alumnos_Grupos.create(args)
                product=product.dataValues
                let grupo=await db.Grupos.findAll({
                  where:{
                    id:args.mtmGruposAlumnosId
                  },
                  raw:true
                })
                return {...grupo[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },editdatamtmAlumnosGrupos:async(parent,args,{db})=>{
              let rec=await db.Alumnos_Grupos.update({
                

campo_mutuo1:args.campo_mutuo1,
campo_mutuo2:args.campo_mutuo2,
campo_mutuo3:args.campo_mutuo3,
              },
              {
                where:{
                  mtmAlumnosGruposId:args.mtmAlumnosGruposId,
                  mtmGruposAlumnosId:args.mtmGruposAlumnosId
                }
              })
              let r2=await db.Alumnos_Grupos.findAll({
                where:{
                  mtmAlumnosGruposId:args.mtmAlumnosGruposId,
                  mtmGruposAlumnosId:args.mtmGruposAlumnosId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.Alumnos.findAll({
                where:{id:args.mtmAlumnosGruposId},
                raw:true
              })
              r1=r1[0]
              return {...r1,...r2}
            },
            editdatamtmGruposAlumnos:async(parent,args,{db})=>{
              let rec=await db.Alumnos_Grupos.update({
                

campo_mutuo1:args.campo_mutuo1,
campo_mutuo2:args.campo_mutuo2,
campo_mutuo3:args.campo_mutuo3,
              },
              {
                where:{
                  mtmAlumnosGruposId:args.mtmAlumnosGruposId,
                  mtmGruposAlumnosId:args.mtmGruposAlumnosId
                }
              })
              let r2=await db.Alumnos_Grupos.findAll({
                where:{
                  mtmAlumnosGruposId:args.mtmAlumnosGruposId,
                  mtmGruposAlumnosId:args.mtmGruposAlumnosId
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.Grupos.findAll({
                where:{id:args.mtmGruposAlumnosId},
                raw:true
              })
              r1=r1[0]
              return {...r1,...r2}
            },
            
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
            getAlumnos_Grupos:async(parent,args,{db})=>{
                  const resp=await db.Alumnos_Grupos.findByPk(args.id)
                  return resp
                },
                editAlumnos_Grupos:async(parent,args,{db})=>{
              await db.Alumnos_Grupos.update({
                        mtmAlumnosGruposId:args.mtmAlumnosGruposId,
mtmGruposAlumnosId:args.mtmGruposAlumnosId,
campo_mutuo1:args.campo_mutuo1,
campo_mutuo2:args.campo_mutuo2,
campo_mutuo3:args.campo_mutuo3
                      },
                      {
                        where:{
                          mtmAlumnosGruposId:args.mtmAlumnosGruposId,
mtmGruposAlumnosId:args.mtmGruposAlumnosId
                        }
                      }
                    )
                  
                    let nuevo=await db.Alumnos_Grupos.findAll({
                      where:{
                        mtmAlumnosGruposId:args.mtmAlumnosGruposId,
mtmGruposAlumnosId:args.mtmGruposAlumnosId
                      },raw:true
                    })
                    nuevo=nuevo[0]
                    return nuevo

                  }
                }
              }