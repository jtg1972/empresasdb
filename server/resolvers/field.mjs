import fs from 'fs'
import rf from '../models/pivoteModels.mjs'
import {Op} from 'sequelize'
const  WriteToFile=async(name,content)=>{ 
  
  let filePath=`${name}.mjs`
  fs.writeFile(filePath,content,(err)=>{
    if(err)
      throw err
    console.log("the file was succesfully saved")
  })
}


export default{
  Query:{
  
    fields:async(parent,args,{db})=>{
      const fields=await db.Fields.findAll({})
      return fields
    }
  },
  Mutation:{
    createField:async(parent,args,{db})=>{
      const field=await db.Fields.create(args)
      
      return field
      
    },
    removeField:async(parent,args,{db})=>{
      let x=await db.Fields.findByPk(args.id)
    
      if(x){
        
        if(args.relationship=="onetomany"){
          if(args.relationCategory>0){
            let z=await db.Category.findByPk(args.relationCategory)
            let y=await db.Fields.findAll({
              where:{name:`${args.mainCategoryName}${z.name}Id`},
              raw:true
            })
            if(y.length==1){
              let z=await db.Fields.findByPk(y[0].id)
              await x.destroy()
              await z.destroy()
              return true
            }
          }
        }else{
          await x.destroy()
          return true
        }
        
      }
      return false
    },
    addValueToField:async(parent,args,{db})=>{
      const field=await db.Fields.findByPk(args.id)
      let values=field.values
      let valuesArr=[]
      if(values!==null){
        valuesArr=values.split(",")
      }
      valuesArr.push(args.value)
      values=valuesArr.join(",")
      field.values=values
           
      let x= await field.save()
      console.log("xxx",x)
      return {...x.dataValues,values:valuesArr}

    },
    removeMultipleValue:async(parent,args,{db})=>{
      const field=await db.Fields.findByPk(args.id)
      if(field){
        let strFields=field.values
        if(field.values.trim!==null){
          const arrFields=field.values.split(",")
          const oldlen=arrFields.length
          const newArr=arrFields.filter(x=>x!==args.value)
          const newlen=newArr.length
          if(oldlen!==newlen){
            if(newlen==0){
              field.values=null
            }else{
              strFields=newArr.join(",")
              field.values=strFields
            }
            await field.save();
            return true
          }
        }
        

      }
      return false
    },
    createTable:async(parent,args,{db})=>{
      const category=await db.Category.findByPk(args.category)
      let name=category.name

      let cats=category.parentCategories.split(",")
      cats=cats.map(c=>parseInt(c))
      cats.push(category.id)
      let content=`import Sequelize from 'sequelize'\n
      class ${name} extends Sequelize.Model{\n
        \tstatic init(sequelize,DataTypes){\n
          \t\treturn super.init({\n`
      const fields=await db.Fields.findAll({
        where:{category:{[Op.in]:cats}},
        raw:true
      })
      let fields1=fields.map(f=>{
        if(f.declaredType=="string"){
      
          return `\t\t\ ${f.name}:DataTypes.STRING`
        }else if(f.declaredType=="number"){
          return `\t\t\ ${f.name}:DataTypes.INTEGER`
        }
      })  
      const ffs=fields1.join(',\n')
      content=content+ffs+`},{sequelize})\n}}`
      content+=`\nexport default ${name}`
      
      let r=[]
      let x1=""
      let x2=""
      for(let f in fields){
        if(fields[f]["declaredType"]=="string"){
          x1+=`${fields[f]["name"]}:String\n`
          x2+=`${fields[f]["name"]}:String,\n`
          
          
        }else if(fields[f]["declaredType"]=="number"){
          x1+=`${fields[f]["name"]}:Int\n`
          x2+=`${fields[f]["name"]}:Int,\n`
          
        }
      }
      let c=r.join("\n")
      let x=r.join(", ")
      const content2=`
      import {gql} from 'apollo-server-express'

      export default gql\`
        type ${name}{
          id:Int!
          ${x1}
        }

        type Query{
          ${name}:[${name}]
          
        }
        type Mutation{
          create${name}(
            ${x2}
            ):${name}
          getData${name}:[${name}]
          
    
        }\`
      `

      const content3=`
        export default{
          Query:{
          
            ${name}:async(parent,args,{db})=>{
              const products=await db.${name}.findAll()
              return products     
            }
          },
          Mutation:{
            create${name}:async(parent,args,{db})=>{
              const product=await db.${name}.create(args)
              return product
            },
            getData${name}:async(parent,args,{db})=>{
              const products=await db.${name}.findAll()
              return products     
            }
          }
        }
      `

      
      try{
        WriteToFile(`./models/${name}`,content)
        WriteToFile(`./schema/${name}`,content2)
        WriteToFile(`./resolvers/${name}`,content3)
        //WriteToFile("./index",content1)
        

        return true
      }catch(e){
        return false
      }
      
    },
    

    createTableGood:async(parent,args,{db})=>{
      let nnmtm=""
      let arrMtmResolver=[]
      let arrMtmResolverFinal=[]
      let cats2=await db.Category.findAll(
        {
          where:{
            id:{[Op.in]:[...args.categoryIds]}
          },
        raw:true
      })
      let cats1=cats2
      console.log("holamundo",args,cats1)
      try{
         console.log("args",args)
        
        let resultado=false
        for(let iteration=0;iteration<2;iteration++){
        for(let category in cats1){
          arrMtmResolverFinal=[]
          let name=cats1[category].name
          console.log("name",name)

          let cats=cats1[category].parentCategories.split(",")
          cats=cats.map(c=>parseInt(c))
          cats.push(cats1[category].id)
       
          let fieldsPiv=[]
          if(iteration==0){
          fieldsPiv=await db.Fields.findAll({
            where:{category:{[Op.in]:cats},dataType:"singleValue"},
            raw:true
            
          })}else{
            fieldsPiv=await db.Fields.findAll({
              where:{category:{[Op.in]:cats}},
              raw:true
              
            })
          }
          /*const mtm=fieldsPiv.filter(d=>{
            return d.dataType=="relationship"
            &&
            d.relationship=="manytomany"
          })*/
          /*for(let t in mtm){
            const pc=await db.Category.findByPk(mtm[t].relationCategory)
            if(pc){
              let className=""
              if(name<pc.name)
                className=`${name}_${pc.name}`
              else
                className=`${pc.name}_${name}`
              let t1=`
              import Sequelize from 'sequelize'\n
              class ${name} extends Sequelize.Model{
                \tstatic init(sequelize,DataTypes){\n
                  \t\treturn super.init({\n},{sequelize})}}
                  \nexport default ${name}`
              try{
                  WriteToFile(`./models/${name}`,t1)
              }catch(e){
                console.log(e)
              }
                      
                  
          
            }
          }*/
          let content=`import Sequelize from 'sequelize'\n
          
          class ${name} extends Sequelize.Model{\n
          \tstatic init(sequelize,DataTypes){\n
            \t\treturn super.init({\n`
          const fields=await db.Fields.findAll({
            where:{category:{[Op.in]:cats}},
            raw:true
          })
          console.log("FIELDSSSSS",fields)
          let fields1=[]
          for(let f in fields){
            if(fields[f].declaredType=="string"){
          
              fields1.push(`\t\t\ ${fields[f].name}:{
                type:DataTypes.STRING,
                defaultValue:""
              }`)
            }else if(fields[f].declaredType=="number"){
              fields1.push(`\t\t\ ${fields[f].name}:{
                type:DataTypes.INTEGER,
                defaultValue:0
              }`)
              if(fields[f].dataType=="queryCategory"){
              fields1.push(`\t\t ${fields[f].name}GlobalCatQuery:DataTypes.INTEGER`)
              fields1.push(`\t\t ${fields[f].name}FinalCatQuery:DataTypes.INTEGER`)
              fields1.push(`\t\t ${fields[f].name}ProductQuery:DataTypes.INTEGER`)  
              }
            }else if(fields[f].declaredType=="date"){
              fields1.push(`\t\t ${fields[f].name}:{
                type:DataTypes.DATE,
                
              }`)

            }else if(fields[f].dataType=="queryCategory"){
              fields1.push(`\t\t ${fields[f].name}GlobalCatQuery:DataTypes.INTEGER`)
              fields1.push(`\t\t ${fields[f].name}FinalCatQuery:DataTypes.INTEGER`)
              fields1.push(`\t\t ${fields[f].name}ProductQuery:DataTypes.INTEGER`)
            }
          }  
          const ffs=fields1.join(',\n')
          content=content+ffs+`},{sequelize})\n}`
          const relations=fields.filter(f=>f.dataType=="relationship")
          if(relations.length>0){
            content+=`static associate(models){`
            for(let r in relations){
              if(relations[r].relationship=="onetomany"){
                const catDest=await db.Category.findByPk(relations[r].relationCategory)
                if(catDest){
                  content+=`this.hasMany(models.${catDest.name})\n
                  models.${catDest.name}.belongsTo(models.${name},
                    {foreignKey:"${name}Id"})
                    
                  `
                }
              }else if(relations[r].relationship=="manytomany"){
                const catDest=await db.Category.findByPk(relations[r].relationCategory)
                
                if(catDest){
                  let cn=""
                  if(name<catDest.name)
                    cn=`${name}_${catDest.name}`
                  else
                    cn=`${catDest.name}_${name}`
                  content+=`models.${name}.belongsToMany(models.${catDest.name},{foreignKey:"mtm${name}${catDest.name}Id",through:"${cn}"})\n
                  models.${catDest.name}.belongsToMany(models.${name},{foreignKey:"mtm${catDest.name}${name}Id",through:"${cn}"})
                `

                }
              }
            }
            content+=`}`
            
          }
          content+=`}`
            
          content+=`\nexport default ${name}`
          
          let r=[]
          let x1="id:Int\n"
          let x2="id:Int,\n"
          let x3=""
          let arrMtmFields=[]
          let indMtmFields=0
          let arrMtmDataRes=[]
          arrMtmResolver=[]
          let arrHelperFunctions=[]
          const defotm=""
          let newMtmDefinition=""
          for(let f in fields){
            arrMtmResolver=[]
            if(fields[f]["declaredType"]=="string"){
              x1+=`${fields[f]["name"]}:String\n`
              x2+=`${fields[f]["name"]}:String,\n`
      
            }else if(fields[f]["declaredType"]=="number"){
              x1+=`${fields[f]["name"]}:Int\n`
              x2+=`${fields[f]["name"]}:Int,\n`
              if(fields[f].dataType=="queryCategory"){
                x1+=`\t\t ${fields[f].name}GlobalCatQuery:Int\n`
                x1+=`\t\t ${fields[f].name}FinalCatQuery:Int\n`
                x1+=`\t\t ${fields[f].name}ProductQuery:Int\n`  
                x2+=`\t\t ${fields[f].name}GlobalCatQuery:Int,\n`
                x2+=`\t\t ${fields[f].name}FinalCatQuery:Int,\n`
                x2+=`\t\t ${fields[f].name}ProductQuery:Int,\n`  
              }
            }else if(fields[f]["dataType"]=="queryCategory"){
              x1+=`${fields[f]["name"]}GlobalCatQuery:Int\n`
              x2+=`${fields[f]["name"]}GlobalCatQuery:Int,\n`
              x1+=`${fields[f]["name"]}FinalCatQuery:Int\n`
              x2+=`${fields[f]["name"]}FinalCatQuery:Int,\n`
              x1+=`${fields[f]["name"]}ProductQuery:Int\n`
              x2+=`${fields[f]["name"]}ProductQuery:Int\n,`
              


            }else if(fields[f]["declaredType"]=="date"){
              x1+=`${fields[f]["name"]}:String\n`
              x2+=`${fields[f]["name"]}:String,\n`
            }else if(fields[f]["dataType"]=="relationship"){
              if(fields[f]["relationship"]=="onetomany"){
                const respCat=await db.Category.findByPk(fields[f]["relationCategory"])
                x1+=`otm${name}${respCat["name"]}:[${respCat["name"]}]\n`
                
              }else if(fields[f]["relationship"]=="manytomany"){
                const categoriesAll=await db.Category.findAll({raw:true})
                const respCat=await db.Category.findByPk(fields[f]["relationCategory"])
                const fieldsRespCat=await db.Fields.findAll({where:{category:respCat.id},raw:true})
                let catFields=fieldsRespCat.map(r=>{
                  if(r.declaredType=="string"){
                    return `${r.name}:String`
                  }else if(r.declaredType=="number"){
                    return `${r.name}:Int`
                  }else if(r.declaredType=="queryCategory"){
                    return `${r["name"]}FinalCatQuery:Int\n
                     ${r["name"]}ProductQuery:Int`

                  }else if(r.relationship=="manytomany"){
                    let n=categoriesAll.filter(x=>x.id==r.relationCategory)[0]
                    let c
                    if(n.name>respCat.name)
                      c=`${respCat.name}_${n.name}`
                    else
                      c=`${n.name}_${respCat.name}`
                    /*estaba anterior arrMtmResolver.push(`mtm${n.name}${respCat.name}:async(parent,args,{db})=>{
                      
                        const products=await db.${c}.findAll({
                          where:{mtm${respCat.name}${n.name}Id:parent.id},
                          raw:true
                        })
                        let oneside=await db.${respCat.name}.findAll({
                          where:{
                            id:parent.id
                          },raw:true
                        })
                        const cd=products.map(c=>c["mtm${n.name}${respCat.name}Id"])
                        console.log("cdddd",cd)
                        let recs=await db.${n.name}.findAll({where:{id:{[Op.in]:cd}},raw:true})
                        let final=products.map(r=>{
                          
                          let p=recs.filter(t=>t.id==r.mtm${n.name}${respCat.name}Id)[0]
                          
                          return {
                            
                              ...r,...p,
                              key:"mtm${n.name}${respCat.name}"
                            }
                           
                        })
                        return final
                      

                    }`)*/
                    arrMtmResolver.push(`mtm${n.name}${respCat.name}:async(parent,args,{db})=>{
                        let products=[]
                        let whereClauses
                        if(parent.whereClauses)
                          whereClauses=JSON.parse(parent.whereClauses)
                        let singleWhere={}
                        let sharedWhere={}
                        if(whereClauses!=undefined &&
                          whereClauses?.["mtm${n.name}${respCat.name}"]?.["single"]?.["main"]!=undefined &&
                          whereClauses?.["mtm${n.name}${respCat.name}"]?.["single"]?.["main"]!="none"
                        ){
                          singleWhere=codifyRuleMtm(whereClauses,"mtm${n.name}${respCat.name}","single")
                        }
                        if(whereClauses!=undefined &&
                          whereClauses?.["mtm${n.name}${respCat.name}"]?.["shared"]?.["main"]!=undefined &&
                          whereClauses?.["mtm${n.name}${respCat.name}"]?.["shared"]?.["main"]!="none"
                        ){
                          sharedWhere=codifyRuleMtm(whereClauses,"mtm${n.name}${respCat.name}","shared")
                        }
                        let sj={}
                      if(parent?.sortClauses!=undefined)
                        sj=JSON.parse(parent.sortClauses)
                      let codSortSingle=[]
                     console.log("parentsort",sj)
                      if(sj!=undefined && sj?.["mtm${n.name}${respCat.name}"]!=undefined && sj?.["mtm${n.name}${respCat.name}"]?.[0]!="nosort")
                        codSortSingle=codifySortRuleMtm(sj["mtm${n.name}${respCat.name}"],"${n.name}",db.${n.name},"${c}",db.${c})
                      
                      
                    console.log("codsortsingle",codSortSingle)
                        products=await db.${respCat.name}.findAll({
                          where:{id:parent.id},
                          include:{
                            required:false,
                            model:db.${n.name},
                            where:{
                              ...singleWhere
                            },
                            
                            through:{
                              model:db.${c},
                              where:{
                                ...sharedWhere
                              },
                              
                            }
                          },
                          order:codSortSingle,
                          raw:true
                        })
                        let objeto={}
                        let res=[]
                        products=products.forEach(x=>{
                          objeto={}
                          let keys=Object.keys(x)
                          for(let k=0;k<keys.length;k++){
                            let lastSegmentPos=keys[k].lastIndexOf(".")
                            let lastSegmentText=keys[k].substring(lastSegmentPos+1)
                            console.log("lastsegkey",lastSegmentText,lastSegmentPos)
                            objeto[lastSegmentText]=x[keys[k]]
                          }
                          
                          objeto["id"]=x["${n.name}${!n.name.endsWith("s")?"s":""}.id"]
                          objeto.mtm${respCat.name}${n.name}Id=x["id"]
                          Object.keys(objeto).filter(z=>{
                        
                            if("mtm${n.name}${respCat.name}Id".startsWith(z))
                              objeto["mtm${n.name}${respCat.name}Id"]=objeto[z]
                        })
                        //in field server
                          if(objeto["mtm${n.name}${respCat.name}Id"]!=null)
                            res.push(objeto)
                        })
                        res=res.map(o=>({
                          ...o,
                          whereClauses:parent.whereClauses,
                          sortClauses:parent.sortClauses,
                          key:"mtm${n.name}${respCat.name}",
                          otherKey:"mtm${respCat.name}${n.name}"


                        }))
                        return res

                    }`)
                    return `${r.name}:[data${r.name}]`
                    /*prototiponuevo
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
                  {...x,whereClauses:parent.whereClauses}
                ))
                return res
                
                    
                  },
                  
            }

                    */
                  }
                  else if(r.relationship=="onetomany"){
                    let n=categoriesAll.filter(x=>x.id==r.relationCategory)[0]
                    
                    
                    /*pasado bienarrMtmResolver.push(`otm${respCat.name}${n.name}:async(parent,args,{db})=>{
                      const x=await db.${n.name}.findAll({
                        where:{otm${respCat.name}${n.name}Id:parent.id},
                        raw:true
                      })
                      
                      return x
                    }`)*/
                    
                    arrMtmResolver.push(`otm${respCat.name}${n.name}:async(parent,args,{db})=>{
                      let nj
                      if(parent.whereClauses)
                        nj=JSON.parse(parent.whereClauses)
                      let wc={}
                      if(nj?.whereClauses!=undefined &&
                        nj?.["otm${respCat.name}${n.name}"] &&
                        nj?.["otm${respCat.name}${n.name}"]?.["main"]!=undefined &&
                        nj?.["otm${respCat.name}${n.name}"]?.["main"]!="none"
                      ){
                        wc=codifyRule(nj,"otm${respCat.name}${n.name}")
                        
                      }
                      let sj={}
                      if(parent?.sortClauses!=undefined)
                        sj=JSON.parse(parent.sortClauses)
                      let codSort=[]
                      if(sj!=undefined && sj?.["otm${respCat.name}${n.name}"]!=undefined && sj?.["otm${respCat.name}${n.name}"]?.[0]!="nosort")
                        codSort=codifySortRule(sj["otm${respCat.name}${n.name}"])
                      let products=await db.${n.name}.findAll({
                        where:{[Op.and]:[{otm${respCat.name}${n.name}Id:parent.id},{...wc}]},
                        raw:true,
                        order:codSort

                      })
                      products=products.map(x=>({
                        ...x,whereClauses:parent.whereClauses,
                        sortClauses:parent.sortClauses
                      }))
                      return products
                    }`)
                    return `${r.name}:[${n.name}]`
                    /*prototipo bien
                    otmsbareasbcarreras:async(parent,args,{db})=>{
                    let nj=JSON.parse(parent.whereClauses)
                    if(parent.whereClauses!=undefined){
                      let x=await db.sbcarreras.findAll({
                        where:{[Op.and]:[{otmsbareasbcarrerasId:parent.id},{...nj["otmsbareasbcarreras"]}]},
                        raw:true
                      })
                      x=x.map(y=>{
                        return {...y,whereClauses:parent.whereClauses}
                      })
                      return x
                    }
                    else{
                      let x=await db.sbcarreras.findAll({
                        where:{otmsbareascarrerasId:parent.id},
                        raw:true
                      })
                      return x
                    }

                  }

                    */
                  }
                  else
                    return ""
                })
                console.log("catfields11",catFields.join("\n"))
                let getFields=await db.Fields.findAll({where:{category:cats1[category].id},raw:true})
                const respCat1=""
              
                let cats1New=getFields.map(r=>{
                  if(r.declaredType=="string"){
                    return `${r.name}:String`
                  }else if(r.declaredType=="number"){
                    return `${r.name}:Int`
                  }else if(r.declaredType=="queryCategory"){
                    return `${r["name"]}FinalCatQuery:Int\n
                     ${r["name"]}ProductQuery:Int`

                  }else if(r.relationship=="manytomany"){
                    //arrMtmResolver.push(`${r.name}`)
                    return `${r.name}:[data${r.name}]`
                  }
                  else if(r.relationship=="onetomany"){
                    
                    return `${r.name}:[${r.name}]`
                  }
                  else
                    return ""
                })

                catFields.push("id:Int")
                cats1New.push("id:Int")
                let cn=""
                if(name<respCat.name)
                  cn=`${name}_${respCat.name}`
                else
                  cn=`${respCat.name}_${name}`
                let mtmCat=await db.Category.findAll({where:{name:cn},raw:true})
                mtmCat=mtmCat[0]
                let mtmFields=await db.Fields.findAll({where:{category:mtmCat.id},raw:true})
                mtmFields=mtmFields.map(m=>{
                  if(m.declaredType=="string"){
                    return `${m.name}:String`
                  }else if(m.declaredType=="number"){
                    return `${m.name}:Int`
                  }else if(m.dataType=="queryCategory" &&
                  m.declaredType=="number"){
                    return `${m["name"]}FinalCatQuery:Int\n
                     ${r["name"]}ProductQuery:Int`

                  }else
                    return ""

                })

                //catFields.push(`mtm${name}${respCat.name}:[datamtm${name}${respCat.name}]`)
                catFields=[...catFields,...mtmFields,]
                catFields=catFields.join("\n")
                cats1New.push("key:String")
                cats1New=[...cats1New,...mtmFields]
                cats1New=cats1New.join("\n")
                
                console.log("verrrr",`type datamtm${respCat.name}${name}{
                  ${catFields}
                  key:String
                }`,indMtmFields,mtmCat,mtmFields)
                
                
                console.log("typedatamtm",`type datamtm${respCat.name}${name}{
                  ${catFields}
                },`)
                arrMtmFields.push(`type datamtm${respCat.name}${name}{
                  ${catFields}
                  key:String
                  otherKey:String,
                  whereClauses:String,
                  sortClauses:String,

                },`)

                arrMtmResolverFinal.push(`datamtm${respCat.name}${name}:{
                  ${arrMtmResolver.join(",\n")}
                }  
                `)

                
                indMtmFields++
                x1+=`mtm${respCat.name}${name}:[datamtm${respCat.name}${name}],\n`
                
                if(respCat.name>name){
                  nnmtm=`${name}_${respCat.name}`
                
                }else{
                  nnmtm=`${respCat.name}_${name}`
                }
                /*arrMtmDataRes.push(`originalmtm${respCat.name}${name}:{
                  mtm${name}${respCat.name}:async(parent,args,{db})=>{
                    const products=await db.${nnmtm}.findAll({
                      where:{mtm${respCat.name}${name}Id:parent.id},
                      raw:true
                    })
                    let oneside=await db.${respCat.name}.findAll({
                      where:{
                        id:parent.id
                      },raw:true
                    })
                    const cids=x.map(c=>c["mtm${respCat.name}${name}Id"])
                    console.log("cdddd",cd)
                    let recs=await db.${name}.findAll({where:{id:{[Op.in]:cids}},raw:true})
                    let final=products.map(r=>{
                      let nf="mtm${name}${respCat.name}Id"
                      const di=x.filter(u=>u[nf]==r.id)[0]
                      return {...r,...di}
                    })
                    return final
                  }
                  
                  
                },`)*/


              }
            }
            
          }
          let c=r.join("\n")
          let x=r.join(", ")

          let manyToManyResolver=``
          let oneToManyResolver=``
          let manyToManyDelete=``
          if(cats1[category].manyToMany==true){
            const split=cats1[category].name.split("_")
            const fc=split[0]
            const sc=split[1]
            manyToManyDelete+=`remove${cats1[category].name}:async(parent,args,{db})=>{
                  
              try{
                const products=await db.${name}.findOne({where:{
                  mtm${fc}${sc}Id:args.mtm${fc}${sc}Id,
                  mtm${sc}${fc}Id:args.mtm${sc}${fc}Id
                }})
                console.log("productsreciente",products)
                products.destroy()
              
                return true
              }catch(e){
                console.log("error",e)
                return false
              }
            },
            `
          }
          if(relations.length>0){
            for(let r in relations){
              const respCat=await db.Category.findByPk(relations[r].relationCategory)
              if(respCat){
                if(relations[r].relationship=="onetomany"){
                  /*
                  `otm${name}${respCat.name}:async(parent,args,{db})=>{
                      let nj=JSON.parse(args.whereClauses)
                      let wc={}
                      if(parent.whereClauses!=undefined &&
                        parent.whereClauses["otm${name}${respCat.name}"] &&
                        parent.whereClauses["otm${name}${respCat.name}"]["main"]!=undefined &&
                        parent.whereClauses["otm${name}${respCat.name}"]["main"]!="none"
                      ){
                        wc=codifyRule(nj,"otm${name}${respCat.name}")
                        
                      }
                      let products=db.${n.name}.findAll({
                        where:{Op.and:[{otm${name}${respCat.name}Id:parent.id}],...wc},
                        raw:true

                      })
                      products=products.map(x=>({
                        ...x,whereClauses:parent.whereClauses
                      }))
                      return products
                    }`

                */
                  oneToManyResolver+=`otm${name}${respCat.name}:async(parent,args,{db})=>{
                    let nj
                    if(parent?.whereClauses)
                      
                       nj=JSON.parse(parent.whereClauses)
                    let wc={}
                    if(parent?.whereClauses!=undefined &&
                      nj?.["otm${name}${respCat.name}"] &&
                      nj?.["otm${name}${respCat.name}"]?.["main"]!=undefined &&
                      nj?.["otm${name}${respCat.name}"]?.["main"]!="none"
                    ){
                      wc=codifyRule(nj,"otm${name}${respCat.name}")
                      
                    }
                    let sj={}
                      if(parent?.sortClauses!=undefined)
                        sj=JSON.parse(parent.sortClauses)
                      let codSort=[]
                      if(sj!=undefined && sj?.["otm${name}${respCat.name}"]!=undefined && sj?.["otm${name}${respCat.name}"]?.[0]!="nosort")
                        codSort=codifySortRule(sj["otm${name}${respCat.name}"])
                    let products=await db.${respCat.name}.findAll({
                      where:{[Op.and]:[{otm${name}${respCat.name}Id:parent.id},{...wc}]},
                      raw:true,
                      order:codSort
                    })
                    products=products.map(x=>({
                      ...x,whereClauses:parent.whereClauses,
                      sortClauses:parent.sortClauses
                    }))
                    return products
                  },`
                }else if(relations[r].relationship=="manytomany"){
                  let c=""
                  if(name<respCat.name)
                    c=`${name}_${respCat.name}`
                  else
                    c=`${respCat.name}_${name}`
                  /*prototipobien
                  mtm${respCat.name}${name}:async(parent,args,{db})=>{
                        let products=[]
                        let whereClauses=JSON.parse(parent.whereClauses)
                        let singleWhere={}
                        let sharedWhere={}
                        if(whereClauses!=undefined &&
                          whereClauses["mtm${respCat.name}${name}"]["single"]["main"]!=undefined &&
                          whereClauses["mtm${respCat.name}${name}"]["single"]["main"]!="none"
                        ){
                          singleWhere=codifyRule(whereClauses,"mtm${respCat.name}${name}","single")
                        }
                        if(whereClauses!=undefined &&
                          whereClauses["mtm${respCat.name}${name}"]["shared"]["main"]!=undefined &&
                          whereClauses["mtm${respCat.name}${name}"]["shared"]["main"]!="none"
                        ){
                          sharedWhere=codifyRule(whereClauses,"mtm${respCat.name}${name}","shared")
                        }
                        products=await db.${name}.findAll({
                          where:{id:parent.id},
                          include:{
                            required:false,
                            model:db.${respCat.name},
                            where:{
                              ...singleWhere
                            },
                            through:{
                              model:${c}
                              where:{
                                ...sharedWhere
                              }
                            }
                          },
                          raw:true
                        })
                        let objeto={}
                        let res=[]
                        products=products.forEach(x=>{
                          objecto={}
                          let keys=Object.keys(x)
                          for(let k=0;k<keys.length;k++){
                            let lastSegmentPos=keys[k].lastIndexOf(".")
                            let lastSegmentText=keys[k].substring(lastSegmentPos+1)
                            console.log("lastsegkey",lastSegmentText,lastSegmentPos)
                            objeto[lastSegmentText]=x[keys[k]]
                          }
                          objeto[id]=x["${respCat.name}.id"]
                          objeto.mtm${name}${respCat.name}Id=x["id"]
                          if(x["mtm${respCat.name}${name}Id"]!=null)
                            res.push(objeto)
                        })
                        res.map(o=>({
                          ...o,
                          whereClauses:parent.whereClauses,
                          key:"mtm${respCat.name}${name},
                          otherKey:"mtm${name}${respCat.name}


                        }))
                        return res

                    }
                  
                  */
                  /*anterior bienmanyToManyResolver+=`mtm${respCat.name}${name}:async(parent,args,{db})=>{
                    const products=await db.${c}.findAll({
                      where:{mtm${name}${respCat.name}Id:parent.id},
                      raw:true
                    })
                    let oneside=await db.${name}.findAll({
                      where:{
                        id:parent.id
                      },raw:true
                    })
                    const cd=products.map(c=>c["mtm${respCat.name}${name}Id"])
                    console.log("cdddd",cd)
                    let recs=await db.${respCat.name}.findAll({where:{id:{[Op.in]:cd}},raw:true})
                    let final=products.map(r=>{
                      
                      let p=recs.filter(t=>t.id==r.mtm${respCat.name}${name}Id)[0]
                      
                      return {
                        
                          ...r,...p,
                          key:"mtm${respCat.name}${name}"
                        }
                       
                    })
                    return final
                  },
                  `*/
                  manyToManyResolver+=`mtm${respCat.name}${name}:async(parent,args,{db})=>{
                    let products=[]
                    let whereClauses
                    if(parent.whereClauses)
                      whereClauses=JSON.parse(parent.whereClauses)
                    let singleWhere={}
                    let sharedWhere={}
                    if(whereClauses!=undefined &&
                      whereClauses?.["mtm${respCat.name}${name}"]?.["single"]?.["main"]!=undefined &&
                      whereClauses?.["mtm${respCat.name}${name}"]?.["single"]?.["main"]!="none"
                    ){
                      singleWhere=codifyRuleMtm(whereClauses,"mtm${respCat.name}${name}","single")
                    }
                    if(whereClauses!=undefined &&
                      whereClauses?.["mtm${respCat.name}${name}"]?.["shared"]?.["main"]!=undefined &&
                      whereClauses?.["mtm${respCat.name}${name}"]?.["shared"]?.["main"]!="none"
                    ){
                      sharedWhere=codifyRuleMtm(whereClauses,"mtm${respCat.name}${name}","shared")
                    }
                    let sj={}
                      if(parent?.sortClauses!=undefined)
                        sj=JSON.parse(parent.sortClauses)
                      let codSortSingle=[]
                     console.log("parentsort",sj)
                      if(sj!=undefined && sj?.["mtm${respCat.name}${name}"]!=undefined && sj?.["mtm${respCat.name}${name}"]?.[0]!="nosort")
                        codSortSingle=codifySortRuleMtm(sj["mtm${respCat.name}${name}"],"${respCat.name}",db.${respCat.name},"${c}",db.${c})
                    products=await db.${name}.findAll({
                      where:{id:parent.id},
                      include:{
                        required:false,
                        model:db.${respCat.name},
                        where:{
                          ...singleWhere
                        },
                        
                        through:{
                          model:db.${c},
                          where:{
                            ...sharedWhere
                          },
                          
                        }
                      },
                      order:codSortSingle,
                      raw:true
                    })
                    let objeto={}
                    let res=[]
                    products=products.forEach(x=>{
                      objeto={}
                      let keys=Object.keys(x)
                      for(let k=0;k<keys.length;k++){
                        let lastSegmentPos=keys[k].lastIndexOf(".")
                        let lastSegmentText=keys[k].substring(lastSegmentPos+1)
                        console.log("lastsegkey",lastSegmentText,lastSegmentPos)
                        objeto[lastSegmentText]=x[keys[k]]
                      }
                      
                      objeto["id"]=x["${respCat.name}${!respCat.name.endsWith("s")?"s":""}.id"]
                      objeto.mtm${name}${respCat.name}Id=x["id"]
                      Object.keys(objeto).filter(z=>{
                        
                        if("mtm${respCat.name}${name}Id".startsWith(z))
                          objeto["mtm${respCat.name}${name}Id"]=objeto[z]
                    })
                    //in field server
                      if(objeto["mtm${respCat.name}${name}Id"]!=null)
                        res.push(objeto)
                    })
                    res=res.map(o=>({
                      ...o,
                      whereClauses:parent.whereClauses,
                      sortClauses:parent.sortClauses,
                      key:"mtm${respCat.name}${name}",
                      otherKey:"mtm${name}${respCat.name}"


                    }))
                    return res

                },`
                }
              }
            }

          }
        
          console.log("otomres",oneToManyResolver,manyToManyResolver)
          

          let content2=`
          import {gql} from 'apollo-server-express'

          export default gql\``
          console.log("vveerr2",indMtmFields,arrMtmFields)
          if(indMtmFields>0){
            arrMtmFields.forEach(i=>{
              content2+=i
            })
          }

            
          content2+=`type ${name}{
              
              ${x1}
              whereClauses:String
              sortClauses:String
            }

            type Query{
              ${name}:[${name}]
              
              
            }
            type Mutation{`
            let parts=name.split("_")
            let helpersFunctions=""
            if(cats1[category].manyToMany){
              helpersFunctions=`
              getonedatamtm${parts[0]}${parts[1]}(${x2}):datamtm${parts[0]}${parts[1]}
              getonedatamtm${parts[1]}${parts[0]}(${x2}):datamtm${parts[1]}${parts[0]}
              getdatamtm${parts[0]}${parts[1]}(${x2}):[datamtm${parts[0]}${parts[1]}]
              getdatamtm${parts[1]}${parts[0]}(${x2}):[datamtm${parts[1]}${parts[0]}]
              createdatamtm${parts[0]}${parts[1]}(${x2}):datamtm${parts[0]}${parts[1]}
              createdatamtm${parts[1]}${parts[0]}(${x2}):datamtm${parts[1]}${parts[0]}
              editdatamtm${parts[0]}${parts[1]}(${x2}):datamtm${parts[0]}${parts[1]}
              editdatamtm${parts[1]}${parts[0]}(${x2}):datamtm${parts[1]}${parts[0]}

              `
            }
            content2+=`${helpersFunctions}
            
              create${name}(
                ${x2}
                parentArg:String
                ):${name}
              
              
              getData${name}(whereClauses:String,sortClauses:String):[${name}]\n`
              if(cats1[category].manyToMany==false){
                content2+=`remove${name}(id:Int,parentArg:String,
                  hardDelete:Boolean,
                  otmCategoryIds:[String],
                  mtmCategoryIds:[String]
                  ):Boolean!\n`
              }else{
                const split=cats1[category].name.split("_")
                const fc=split[0]
                const sc=split[1]
                content2+=`remove${cats1[category].name}(mtm${fc}${sc}Id:Int,mtm${sc}${fc}Id:Int):Boolean\n`
            
              }

              content2+=`edit${name}(${x2}):${name}
              get${name}(id:Int):${name}
              
            }\`
          `

          let content3=`
            import {Op} from 'sequelize'
            import {codifyRuleMtm} from './../utils/whereClauses/index.mjs'
            import {codifySortRule} from './../utils/whereClauses/index.mjs'
            import {codifySortRuleMtm} from './../utils/whereClauses/index.mjs'
            import codifyRule from './../utils/whereClauses/index.mjs'
            export default{
          `
          arrMtmDataRes.forEach(i=>{
            content3+=i
          })
          if(arrMtmResolverFinal.length>0)
            content3+=arrMtmResolverFinal.join(",\n")+",\n"
          if(oneToManyResolver!=="" || manyToManyResolver!==""){
            content3+=`${name}:{
              ${oneToManyResolver}
              ${manyToManyResolver}
            },
            `
          }
              
       content3+=`Query:{
                ${name}:async(parent,args,{db})=>{
                  const products=await db.${name}.findAll()
                  return products     
                }
              },
              `
            

          let helperFunctionsResolvers=""
          parts=name.split("_")
          if(cats1[category].manyToMany){
            helperFunctionsResolvers=`
            getonedatamtm${parts[0]}${parts[1]}:async(parent,args,{db})=>{
              try{
                let product=await db.${name}.findAll({
                  where:{
                    mtm${parts[1]}${parts[0]}Id:args.mtm${parts[1]}${parts[0]}Id,
                    mtm${parts[0]}${parts[1]}Id:args.mtm${parts[0]}${parts[1]}Id
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.${parts[0]}.findAll({
                  where:{
                    id:args.mtm${parts[0]}${parts[1]}Id
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getonedatamtm${parts[1]}${parts[0]}:async(parent,args,{db})=>{
              try{
                let product=await db.${name}.findAll({
                  where:{
                    mtm${parts[1]}${parts[0]}Id:args.mtm${parts[1]}${parts[0]}Id,
                    mtm${parts[0]}${parts[1]}Id:args.mtm${parts[0]}${parts[1]}Id
                  },
                  raw:true
                })
                product=product[0]
                let resProd=await db.${parts[1]}.findAll({
                  where:{
                    id:args.mtm${parts[1]}${parts[0]}Id
                  },
                  raw:true
                })
                return {...resProd[0],...product}
              }catch(e){
                console.log("error",e)
              }
            },
            getdatamtm${parts[0]}${parts[1]}:async(parent,args,{db})=>{
              try{
                let products=await db.${name}.findAll({
                  where:{
                    mtm${parts[1]}${parts[0]}Id:args.mtm${parts[1]}${parts[0]}Id
                  },raw:true

                })
                let cids=products.map(c=>c.mtm${parts[0]}${parts[1]}Id)
                let respProds=await db.${parts[0]}.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtm${parts[0]}${parts[1]}Id)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            getdatamtm${parts[1]}${parts[0]}:async(parent,args,{db})=>{
              try{
                let products=await db.${name}.findAll({
                  where:{
                    mtm${parts[0]}${parts[1]}Id:args.mtm${parts[0]}${parts[1]}Id
                  },raw:true

                })
                let cids=products.map(c=>c.mtm${parts[1]}${parts[0]}Id)
                let respProds=await db.${parts[1]}.findAll({
                  where:{id:{[Op.in]:cids}},
                  raw:true
                })
                let final=products.map(r=>{
                  let p=respProds.filter(t=>t.id==r.mtm${parts[1]}${parts[0]}Id)[0]
                  return {...r,...p}
                })
                return final
              }catch(e){
                console.log("error",e)
              }
                

            },
            createdatamtm${parts[0]}${parts[1]}:async(parent,args,{db})=>{
              try{
                let siexiste=await db.${name}.findAll({where:{
                  mtm${parts[1]}${parts[0]}Id:args.mtm${parts[1]}${parts[0]}Id,
                  mtm${parts[0]}${parts[1]}Id:args.mtm${parts[0]}${parts[1]}Id

                },raw:true})
                let product
                if(siexiste.length==0){
                  product=await db.${name}.create(args)
                  product=product.dataValues
                }else{
                  product=siexiste[0]
                }
                
                
                let alumno=await db.${parts[0]}.findAll({
                  where:{
                    id:args.mtm${parts[0]}${parts[1]}Id
                  },
                  raw:true
                })
                let profesor=await db.${parts[1]}.findAll({
                  where:{
                    id:args.mtm${parts[1]}${parts[0]}Id
                  },
                  raw:true
                })
                console.log("resyovoy",product,alumno,profesor)
                return {...alumno[0],...product,key:"mtm${parts[0]}${parts[1]}",
              otherKey:"mtm${parts[1]}${parts[0]}"}
                
              }catch(e){
                console.log("error",e)
              }
            },
            createdatamtm${parts[1]}${parts[0]}:async(parent,args,{db})=>{
              try{
                let siexiste=await db.${name}.findAll({where:{
                  mtm${parts[1]}${parts[0]}Id:args.mtm${parts[1]}${parts[0]}Id,
                  mtm${parts[0]}${parts[1]}Id:args.mtm${parts[0]}${parts[1]}Id

                },raw:true})
                let product
                if(siexiste.length==0){
                  product=await db.${name}.create(args)
                  product=product.dataValues
                }else{
                  product=siexiste[0]
                }
                let alumno=await db.${parts[1]}.findAll({
                  where:{
                    id:args.mtm${parts[1]}${parts[0]}Id
                  },
                  raw:true
                })
                let profesor=await db.${parts[0]}.findAll({
                  where:{
                    id:args.mtm${parts[0]}${parts[1]}Id
                  },
                  raw:true
                })
                console.log("resyovoy",product,alumno,profesor)
                return {...alumno[0],...product,key:"mtm${parts[1]}${parts[0]}",
              otherKey:"mtm${parts[0]}${parts[1]}"}
                
              }catch(e){
                console.log("error",e)
              }
            },`

            let rc=await db.Fields.findAll({
              where:{
                category:cats1[category].id
              },
              raw:true
            })
            let ctd=rc.map(fu=>{
              if(fu.name!==`mtm${parts[0]}${parts[1]}Id` &&
              fu.name!==`mtm${parts[1]}${parts[0]}Id`){
                return `${fu.name}:args.${fu.name},`
              }
              return ""
            })
              

            
            helperFunctionsResolvers+=`editdatamtm${parts[0]}${parts[1]}:async(parent,args,{db})=>{
              let rec=await db.${name}.update({
                ${ctd.join("\n")}
              },
              {
                where:{
                  mtm${parts[0]}${parts[1]}Id:args.mtm${parts[0]}${parts[1]}Id,
                  mtm${parts[1]}${parts[0]}Id:args.mtm${parts[1]}${parts[0]}Id
                }
              })
              let r2=await db.${name}.findAll({
                where:{
                  mtm${parts[0]}${parts[1]}Id:args.mtm${parts[0]}${parts[1]}Id,
                  mtm${parts[1]}${parts[0]}Id:args.mtm${parts[1]}${parts[0]}Id
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.${parts[0]}.findAll({
                where:{id:args.mtm${parts[0]}${parts[1]}Id},
                raw:true
              })
              r1=r1[0]
              let r3=await db.${parts[1]}.findAll({
                where:{id:args.mtm${parts[1]}${parts[0]}Id},
                raw:true
              })
              r3=r3[0]


              return {
                  
                    ...r1,
                    ...r2,
                  
                  key:"mtm${parts[0]}${parts[1]}"
                }
              
            },
            editdatamtm${parts[1]}${parts[0]}:async(parent,args,{db})=>{
              let rec=await db.${name}.update({
                ${ctd.join("\n")}
              },
              {
                where:{
                  mtm${parts[0]}${parts[1]}Id:args.mtm${parts[0]}${parts[1]}Id,
                  mtm${parts[1]}${parts[0]}Id:args.mtm${parts[1]}${parts[0]}Id
                }
              })
              let r2=await db.${name}.findAll({
                where:{
                  mtm${parts[0]}${parts[1]}Id:args.mtm${parts[0]}${parts[1]}Id,
                  mtm${parts[1]}${parts[0]}Id:args.mtm${parts[1]}${parts[0]}Id
                },
                raw:true
              })
              r2=r2[0]
              
              let r1=await db.${parts[1]}.findAll({
                where:{id:args.mtm${parts[1]}${parts[0]}Id},
                raw:true
              })
              r1=r1[0]
              let r3=await db.${parts[0]}.findAll({
                where:{id:args.mtm${parts[0]}${parts[1]}Id},
                raw:true
              })
              r3=r3[0]

              return {
                    ...r1,
                    ...r2,
                  
                  key:"mtm${parts[1]}${parts[0]}"
                
              }
            },
            `
          }

            

              content3+=`Mutation:{`
              if(helperFunctionsResolvers!="")
                content3+=helperFunctionsResolvers
                              

                content3+=`create${name}:async(parent,args,{db})=>{`
                /*
                let product=null
                  let p=null
                  if(args.id==null){
                    product=await db.sbcarreras.create(args)
                    return product
                  }
                  else{
                    let np=args["parentArg"]
                    let np1=args[np]
                    console.log("argsyuyu",args,args["parentArg"],args.otmsbareassbcarrerasId,np1)

                    p=await db.sbcarreras.update({
                      [args["parentArg"]]:args[args["parentArg"]],
                      
                    },
                    {
                    where:{id:args.id}
                    }
                  )
                  }
                  if(p){
                    const nuevo=await db.sbcarreras.findByPk(args.id)
                    return nuevo
                  }
                  return null

                
                */
                Object.keys(fields).forEach(k=>{
                  if(fields[k].declaredType=="date"){
                    content3+=`if(new Date(args.${fields[k].name})=="Invalid Date")\n
                      args.${fields[k].name}=null
                    `
                  }
                   
                })

                content3+=`
                let product=null
                let p=null
                if(args.id==null){
                  product=await db.${name}.create(args)
                  return product
                }else{
                  p=await db.${name}.update({
                    [args["parentArg"]]:args[args["parentArg"]],
                    
                  },
                  {
                  where:{id:args.id}
                  })
                }
                if(p){
                  const nuevo=await db.${name}.findByPk(args.id)
                  return nuevo
                }
                return null
              },
               
                getData${name}:async(parent,args,{db})=>{
                  let nj={}
                  
                  if(args.whereClauses!=""){
                    nj=JSON.parse(args.whereClauses)
                  }
                  let condWhere={}
                  if(nj?.${name}?.["main"]!=undefined &&
                  nj?.${name}?.["main"]!="none")
                    condWhere=codifyRule(nj,${name})

                  let sj={}
                  if(args?.sortClauses!=undefined)
                    sj=JSON.parse(args.sortClauses)
                  let codSort=[]
                  if(sj!=undefined && sj?.["${name}"]!=undefined && sj?.["${name}"]?.[0]!="nosort")
                    codSort=codifySortRule(sj["${name}"])
                  let products=await db.${name}.findAll({
                    raw:true,
                    where:{...condWhere},
                    order:codSort
                  })
                  products=products.map(x=>({
                    ...x,whereClauses:args.whereClauses,sortClauses:args.sortClauses
                  }))
                  return products
                },`

                /*ejemploprototipo
                getDatasbarea:async(parent,args,{db})=>{
                  console.log("whereclausesi",args,args.whereClauses)
                  if(args.whereClauses!=""){
                    console.log("nj",args.whereClauses,JSON.parse(args.whereClauses))
                    let nj=JSON.parse(args.whereClauses)
                    if(nj?.["sbarea"]?.["main"]!=undefined && nj?.["sbarea"]?.["main"]!="none"){
                      console.log("nj",nj)
                      //let getRules=gr(args.rules)
                      //let products=await db.sbarea.findAll({raw:true,where:nj["sbarea"]})
                      let products=await db.sbarea.findAll({
                        where:{...codifyRule(JSON.parse(args.whereClauses),"sbarea")},
                        raw:true})
                      products=products.map(x=>{
                        return {...x,whereClauses:args.whereClauses}
                      })
                      console.log("productsar",products)
                      return products
                    }
                  }
                  
                  let products=await db.sbarea.findAll({raw:true})
                  products=products.map(x=>{
                    return {...x,whereClauses:args.whereClauses}
                  })
                  console.log("productsar",products)
                  return products
                  
                }
                */
                  if(cats1[category].manyToMany==false){
                    /*
                    console.log("argsmtmotm",args.mtmCategoryIds,args.otmCategoryIds)
                          for(let x=0;x<args.otmCategoryIds.length;x++){
                            console.log("versionpiu",`
                              db.${args.otmCategoryIds[x]}.update({
                                otmsbarea${args.otmCategoryIds[x]}Id:0
                              },{
                                where:{
                                  otmsbarea${args.otmCategoryIds[x]}Id:${args.id}
                                }
                              })
                            `)
                          }
                          let table=""
                          
                            
                          for(let x=0;x<args.mtmCategoryIds.length;x++){
                            if("sbarea">args.mtmCategoryIds[x])
                              table=`${args.mtmCategoryIds[x]}_sbarea`
                            else
                              table=`sbarea_${args.mtmCategoryIds[x]}`
                            
                            console.log("versionpiu",`
                              db.${table}.destroy(
                                where:{
                                  mtmsbarea${args.mtmCategoryIds[x]}Id:${args.id}
                                }
                              )
                            `)
                          }
                          const product=await db.sbarea.findByPk(args.id)
                          product.destroy()
                          return true
                    */
                    content3+=`remove${name}:async(parent,args,{db})=>{
                      let p
                      try{
                        if(args.hardDelete==true){
                          for(let x=0;x<args.otmCategoryIds.length;x++){
                            let ke=args.otmCategoryIds[x]
                            let fi="otm${name}"+ke+"Id"
                            console.log("resres",
                              "db."+ke+".update({"+fi+":0},{where:{"+fi+":"+args.id+"}})")
                            db[ke].update({[fi]:0},{where:{[fi]:args.id}})
                          }
                          let table=""
                          
                            
                          for(let x=0;x<args.mtmCategoryIds.length;x++){
                            if("${name}">args.mtmCategoryIds[x])
                              table=args.mtmCategoryIds[x]+"_"+"${name}"
                            else
                              table="${name}"+"_"+args.mtmCategoryIds[x]
                            
                            let mtmvar="mtm"+"${name}"+args.mtmCategoryIds[x]+"Id"
                            console.log("resres",
                              "db."+table+".destroy({where:{"+mtmvar+":"+args.id+"}})")
                            db[table].destroy({where:{[mtmvar]:args.id}})
                          }
                         const product=await db.sbarea.findByPk(args.id)
                          product.destroy()
                          return true

                        }else{
                          p=await db.${name}.update({
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
                    `
                  }else{
                    content3+=manyToManyDelete
                  }
                content3+=`get${name}:async(parent,args,{db})=>{
                  const resp=await db.${name}.findByPk(args.id)
                  return resp
                },
                edit${name}:async(parent,args,{db})=>{
              `
              if(cats1[category].manyToMany==false){  
                let noProcess=[]   
                content3+="let camposDate=[]\n"
                Object.keys(fields).forEach(k=>{
                  if(fields[k].declaredType=="date"){
                    content3+=`if(new Date(args.${fields[k].name})!=="Invalid Date")\n
                      camposDate={...camposDate,[${fields[k].name}]:args.${fields[k].name}}
                    else
                      camposDate={...camposDate,[${fields[k].name}]:null}`


                  }

                })
                let change=Object.keys(fields).map(k=>{
                  
                  //console.log("fieldskk",fields[k].name)
                  if(fields[k].declaredType!="date"){

                  
                    return `${fields[k].name}:args.${fields[k].name}`
                  }
                })
                
                console.log("change",change)
                change.unshift(`id:args["id"]`)
                change=change.join(",")
                content3+=`await db.${name}.update({
                        ${change},
                        ...camposDate
                      },
                      {
                      where:{id:args.id}
                      }
                    )
                  
                    const nuevo=await db.${name}.findByPk(args.id)
                    return nuevo

                  }
                }
              }`
              }else{
                let change=Object.keys(fields).map(k=>{
                  if(fields[k].declaredType=="date")
                    return `${fields[k].name}:new Date(args.${fields[k].name})`
                  return `${fields[k].name}:args.${fields[k].name}`
                })
                let keys=change.filter(n=>
                  n.startsWith("mtm")
                )
                //change.unshift(`id:args["id"]`)
                change=change.join(",\n")
                keys=keys.join(",\n")
                content3+=`await db.${name}.update({
                        ${change}
                      },
                      {
                        where:{
                          ${keys}
                        }
                      }
                    )
                  
                    let nuevo=await db.${name}.findAll({
                      where:{
                        ${keys}
                      },raw:true
                    })
                    nuevo=nuevo[0]
                    return nuevo

                  }
                }
              }`
              }

      
         try{
            WriteToFile(`./models/${name}`,content)
            WriteToFile(`./schema/${name}`,content2)
            WriteToFile(`./resolvers/${name}`,content3)
            //WriteToFile("./index",content1)
            db.TablesState.findAll()

          resultado=true
          }catch(e){
            console.log("e:",e)
            resultado=false
            break;
          }
        }
        }
        await db.TablesState.update({
          state:"OK"
        },{
          where:{id:{[Op.gt]:0}}
        })
        return resultado
      }  catch(e){
          console.log("e",e)
          return false
      }
     
    }  
  }

  
  }

    
