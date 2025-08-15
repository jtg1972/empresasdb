
            import {Op} from 'sequelize'
            export default{
          pomateriasraw:{
              otmpomateriasrawpoprofesoresraw:async(parent,args,{db})=>{
                /*console.log("dbname",db)
                  let dq=await db.Category.findAll({
                    where:{
                      name:"pomateriasraw",
                      
                    },
                    raw:true
                  })
                  dq=dq[0]
                  console.log("vercat",dq)
                  let dqf=await db.Fields.findAll({
                    where:{
                      category:dq.id,
                      dataType:"queryCategory"
                    }
                  })
                  console.log("DQDQF",dq,dqf[0],parent,`${dqf[0]["name"]}ProductQuery`)
                  */
                
                    const x=await db.poprofesoresraw.findAll({
                      where:{otmpomateriasrawpoprofesoresrawId:parent.id},//parent[`${dqf[0]["name"]}ProductQuery`]},
                      raw:true
                    })
                    console.log("xrecs",x)
                    
                    return x
                  },
              
            },
            Query:{
                pomateriasraw:async(parent,args,{db})=>{
                  const products=await db.pomateriasraw.findAll()
                  return products     
                }
              },Mutation:{
                
                createpomateriasraw:async(parent,args,{db})=>{const product=await db.pomateriasraw.create(args)
                  return product
                  
                },
               
                getDatapomateriasraw:async(parent,args,{db})=>{
                  const products=await db.pomateriasraw.findAll({raw:true})
                  
                  return products
                },removepomateriasraw:async(parent,args,{db})=>{
                      try{
                        const product=await db.pomateriasraw.findByPk(args.id)
                        product.destroy()
                        return true
                      }catch(e){
                        console.log("error",e)
                        return false
                      }
                    },
                    getpomateriasraw:async(parent,args,{db})=>{
                  const resp=await db.pomateriasraw.findByPk(args.id)
                  return resp
                },
                editpomateriasraw:async(parent,args,{db})=>{
              let camposDate=[]
await db.pomateriasraw.update({
                        id:args["id"],materia:args.materia,otmpomateriasrawpoprofesoresraw:args.otmpomateriasrawpoprofesoresraw,otmpocarrerasrawpomateriasrawId:args.otmpocarrerasrawpomateriasrawId,materiaid:args.materiaid,
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.pomateriasraw.findByPk(args.id)
                    return nuevo

                  }
                }
              }