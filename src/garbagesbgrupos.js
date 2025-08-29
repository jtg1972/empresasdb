import {Op} from 'sequelize'
import {codifyRuleMtm} from './../utils/whereClauses/index.mjs'
import codifyRule from './../utils/whereClauses/index.mjs'
export default{
datamtmsbestudiantessbgrupos:{
      mtmsbgrupossbestudiantes:async(parent,args,{db})=>{
          
            const products=await db.sbestudiantes_sbgrupos.findAll({
              where:{mtmsbestudiantessbgruposId:parent.id},
              raw:true
            })
            let oneside=await db.sbestudiantes.findAll({
              where:{
                id:parent.id
              },raw:true
            })
            const cd=products.map(c=>c["mtmsbgrupossbestudiantesId"])
            console.log("cdddd",cd)
            let recs=await db.sbgrupos.findAll({where:{id:{[Op.in]:cd}},raw:true})
            let final=products.map(r=>{
              
              let p=recs.filter(t=>t.id==r.mtmsbgrupossbestudiantesId)[0]
              
              return {
                
                  ...r,...p,
                  key:"mtmsbgrupossbestudiantes"
                }
               
            })
            return final
          

        }
    }  
    ,
sbgrupos:{
  otmsbgrupossbprofesores:async(parent,args,{db})=>{
        const x=await db.sbprofesores.findAll({
          where:{otmsbgrupossbprofesoresId:parent.id},
          raw:true
        })
        
        return x
      },
  mtmsbestudiantessbgrupos:async(parent,args,{db})=>{
    let products=[]
    
    let whereClauses=JSON.parse(parent.whereClauses)
    console.log("parentwherec1",whereClauses,parent)
    console.log("parentwherec11",whereClauses["mtmsbestudiantessbgrupos"]?.main)
    let singleWhere={}
    let sharedWhere={}
    if(whereClauses!=undefined && 
      whereClauses?.["mtmsbestudiantessbgrupos"]?.["single"]?.["main"]!=undefined &&
      whereClauses?.["mtmsbestudiantessbgrupos"]?.["single"]?.["main"]!="none"){
      singleWhere=codifyRuleMtm(whereClauses,"mtmsbestudiantessbgrupos","single")
    }
    if(whereClauses!=undefined && 
      whereClauses?.["mtmsbestudiantessbgrupos"]?.["shared"]?.["main"]!=undefined &&
      whereClauses?.["mtmsbestudiantessbgrupos"]?.["shared"]?.["main"]!="none"){
      sharedWhere=codifyRuleMtm(whereClauses,"mtmsbestudiantessbgrupos","shared")
    }
      
      
      
      products=await db.sbgrupos.findAll({
        where:{id:parent.id},
        include:{
          required:false,
          model:db.sbestudiantes,
          required:false,
          where:{...singleWhere},//nombre:{[Op.like]:"t%"}},
          through:{
            model:db.sbestudiantes_sbgrupos,
            
              where:{
                ...sharedWhere
                  
              },
            }
            
           
          
          },
        raw:true
      })
  console.log("prodfinal",products)
    let objecto={}
    let res=[]
    products.forEach(x=>{
      let objeto={}
      if(x["sbestudiantes.sbestudiantes_sbgrupos.mtmsbestudiantessbgruposId"]!=null){
        objeto.boleta=x[`sbestudiantes.boleta`]
        objeto.nombre=x[`sbestudiantes.nombre`]
        //objeto.id=x[`sbprofesores.id`]
        objeto.mtmsbestudiantessbgruposId=x[`sbestudiantes.sbestudiantes_sbgrupos.mtmsbestudiantessbgruposId`]

        objeto.mtmsbgrupossbestudiantesId=x[`id`]
        objeto.semesterType=x["sbestudiantes.semesterType"]
        objeto.calificacion=x["sbestudiantes.sbestudiantes_sbgrupos.calificacion"]
        objeto.incomingyear=x["sbestudiantes.incomingyear"]
        objeto.id=x["sbestudiantes.id"]
        //console.log("productsui",products)
        res.push(objeto)
      }
    })
    console.log("objcod",products,res)
    res=res.map(x=>(
      {
        ...x,
        whereClauses:parent.whereClauses,
        
      }
    ))
    return res
    
        
      },
      
},
Query:{
    sbgrupos:async(parent,args,{db})=>{
      const products=await db.sbgrupos.findAll()
      return products     
    }
  },Mutation:{
    
    

    createsbgrupos:async(parent,args,{db})=>{
    let product=null
    let p=null
    if(args.id==null){
      product=await db.sbgrupos.create(args)
      return product
    }else{
      p=await db.sbgrupos.update({
        [args["parentArg"]]:args[args["parentArg"]],
        
      },
      {
      where:{id:args.id}
      })
    }
    if(p){
      const nuevo=await db.sbgrupos.findByPk(args.id)
      return nuevo
    }
    return null
  },
   
    getDatasbgrupos:async(parent,args,{db})=>{
      const products=await db.sbgrupos.findAll({raw:true})
      let jsString=JSON.parse(args.whereClauses)
      return products.map(x=>({
        ...x,whereClauses:args.whereClauses
      }))
    },removesbgrupos:async(parent,args,{db})=>{
          let p
          try{
            if(args.hardDelete==true){
              const product=await db.sbgrupos.findByPk(args.id)
              product.destroy()
              return true
            }else{
              p=await db.sbgrupos.update({
                [args["parentArg"]]:0,
                
              },
              {
              where:{id:args.id}
              }
              
            )
            return true
            }
          }catch(e){
            console.log("error",e)
            return false
          }
        },
        getsbgrupos:async(parent,args,{db})=>{
      const resp=await db.sbgrupos.findByPk(args.id)
      return resp
    },
    editsbgrupos:async(parent,args,{db})=>{
  let camposDate=[]
await db.sbgrupos.update({
            id:args["id"],clavedelgrupo:args.clavedelgrupo,grupoId:args.grupoId,otmsbmateriassbgruposId:args.otmsbmateriassbgruposId,mtmsbestudiantessbgrupos:args.mtmsbestudiantessbgrupos,otmsbgrupossbprofesores:args.otmsbgrupossbprofesores,
            ...camposDate
          },
          {
          where:{id:args.id}
          }
        )
      
        const nuevo=await db.sbgrupos.findByPk(args.id)
        return nuevo

      }
    }
  }