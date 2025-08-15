
            import {Op} from 'sequelize'
            export default{
          poprofesoresraw:{
              otmpoprofesoresrawpogruposraw:async(parent,args,{db})=>{
                    const x=await db.pogruposraw.findAll({
                      where:{otmpoprofesoresrawpogruposrawId:parent.id},
                      raw:true
                    })
                    
                    return x
                  },
              
            },
            Query:{
                poprofesoresraw:async(parent,args,{db})=>{
                  const products=await db.poprofesoresraw.findAll()
                  return products     
                }
              },Mutation:{
                
                createpoprofesoresraw:async(parent,args,{db})=>{const product=await db.poprofesoresraw.create(args)
                  return product
                  
                },
               
                getDatapoprofesoresraw:async(parent,args,{db})=>{
                  const products=await db.poprofesoresraw.findAll({raw:true})
                  
                  return products
                },removepoprofesoresraw:async(parent,args,{db})=>{
                      try{
                        const product=await db.poprofesoresraw.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getpoprofesoresraw:async(parent,args,{db})=>{
                  const resp=await db.poprofesoresraw.findByPk(args.id)
                  return resp
                },
                editpoprofesoresraw:async(parent,args,{db})=>{
              let camposDate=[]
await db.poprofesoresraw.update({
                        id:args["id"],profesorId:args.profesorId,otmpoprofesoresrawpogruposraw:args.otmpoprofesoresrawpogruposraw,nombre:args.nombre,registro:args.registro,ingresoyear:args.ingresoyear,tiposemestre:args.tiposemestre,otmpomateriasrawpoprofesoresrawId:args.otmpomateriasrawpoprofesoresrawId,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.poprofesoresraw.findByPk(args.id)
                    return nuevo

                  }
                }
              }