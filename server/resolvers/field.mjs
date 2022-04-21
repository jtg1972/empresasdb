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
        await x.destroy()
        return true
      }else{
        return false
      }
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
      const cats1=await db.Category.findAll(
        {
          where:{
            id:{[Op.in]:[...args.categoryIds]}
          },
        raw:true
      })
      console.log("holamundo",args,cats1)
      try{
         console.log("args",args)
        
        let resultado=false
        for(let category in cats1){
          let name=cats1[category].name
          console.log("name",name)

          let cats=cats1[category].parentCategories.split(",")
          cats=cats.map(c=>parseInt(c))
          cats.push(cats1[category].id)
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
            }else if(f.declaredType=="date"){
              return `\t\t ${f.name}:DataTypes.DATEONLY`
            }
          })  
          const ffs=fields1.join(',\n')
          content=content+ffs+`},{sequelize})\n}}`
          content+=`\nexport default ${name}`
          
          let r=[]
          let x1="id:Int\n"
          let x2="id:Int,\n"
          for(let f in fields){
            if(fields[f]["declaredType"]=="string"){
              x1+=`${fields[f]["name"]}:String\n`
              x2+=`${fields[f]["name"]}:String,\n`
      
            }else if(fields[f]["declaredType"]=="number"){
              x1+=`${fields[f]["name"]}:Int\n`
              x2+=`${fields[f]["name"]}:Int,\n`
            }else if(fields[f]["declaredType"]=="date"){
              x1+=`${fields[f]["name"]}:String\n`
              x2+=`${fields[f]["name"]}:String,\n`
            }
          }
          let c=r.join("\n")
          let x=r.join(", ")
          const content2=`
          import {gql} from 'apollo-server-express'

          export default gql\`
            type ${name}{
              
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
              delete${name}(id:Int):Boolean!
              edit${name}(${x2}):${name}
              
            }\`
          `

          let content3=`
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
                  const products=await db.${name}.findAll({raw:true})
                  const fp=products.map(p=>{
                    for(let f in p){
                      if(typeof p[f]==='object'){
                        console.log("pf",p[f])
                        p[f]=JSON.stringify(p[f])
                        console.log("pfdesp",p[f])
                      }
                    }
                    return p
                  })
                  return fp
                },
                delete${name}:async(parent,args,{db})=>{
                  try{
                    const product=await db.${name}.findByPk(args.id)
                    product.destroy()
                    return true
                  }catch(e){
                    console.log("error",e)
                    return false
                  }
                },
                edit${name}:async(parent,args,{db})=>{
              `

              let change=Object.keys(fields).map(k=>{
                  if(fields[k].declaredType=="date")
                    return `${fields[k].name}:new Date(args["${fields[k].name}"])`
                  return `${fields[k].name}:args["${fields[k].name}"]`
                })
              change.unshift(`id:args["id"]`)
              change=change.join(",")
              content3+=`await db.${name}.update({
                      ${change}
                    },
                    {
                    where:{id:args.id}
                    }
                  )
                
                  const nuevo=await db.${name}.findByPk(args.id)
                  return nuevo

                }
              }
            }
          `

      
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