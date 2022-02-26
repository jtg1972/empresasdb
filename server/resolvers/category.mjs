import { flushSync } from 'react-dom'
import {Op} from 'sequelize'
import fs from 'fs'
    

export default{
  Category:{
    bookmark:async(parent,args,{db})=>{
      const cats=await db.Category.findAll({
        where:{id:{[Op.in]:parent.parentCategories}
      },
        raw:true
      })
      let pc=[]
      const cats1=cats.map(c=>{
        pc=c.parentCategories.split(",")
        if(pc.length>0){
          pc=pc.map(x=>parseInt(x))
          pc.push(c.id)
        }else{
          pc=[0,c.id]
        }
        
        return {
          id:c.id,
          name:c.name,
          parentCategories:pc,
          parentCategory:c.parentCategory
        }
      })
      return cats1
    },
    fields:async(parent,args,{db})=>{
      let fVal=await db.Fields.findAll({
        where:{
          category:{[Op.in]:parent.parentCategories}
        },
        raw:true   
      }
      )
      return fVal
    }
  },
  Query:{
    categories:async(parent,args,{db})=>{
      const categories=await db.Category.findAll()
      let pc=[]
      const cats=categories.map(c=>{
        pc=c.dataValues.parentCategories.split(",")
        if(pc.length>0){
          pc=pc.map(x=>parseInt(x))
          pc.push(c.dataValues.id)
        }else{
          pc=[0,c.dataValues.id]
        }
        return {
          id:c.dataValues.id,
          name:c.dataValues.name,
          parentCategories:pc,
          parentCategory:c.dataValues.parentCategory
        }
      })
      return cats
    },
    selectCategory:async(parent,args,{db})=>{
      const cat=await db.Category.findByPk(args.id)
      let pcInt=[]
      if(cat.dataValues.parentCategories!==""){
        pcInt=cat.dataValues.parentCategories.split(",")
        pcInt=pcInt.map(p=>parseInt(p))
      }
      pcInt.push(cat.dataValues.id)
      return {...cat.dataValues,parentCategories:pcInt}
    }
  },
  Mutation:{
    createCategory:async(parent,args,{db})=>{
      let parentCategories=[]
      let stringParentCategories=""
      if(args.parentCategory!==0){
        const parentCategory=await db.Category.findByPk(args.parentCategory)
        if(parentCategory && parentCategory.parentCategories!==""){
          const pf=parentCategory.parentCategories.split(",")
          parentCategories=[...pf,args.parentCategory]
          stringParentCategories=parentCategories.join(",")
        }else{
          parentCategories=[args.parentCategory]
          stringParentCategories=`${args.parentCategory}`
        }
      }else{
        parentCategories=[0]
        stringParentCategories='0'
      }
      const category=await db.Category.create({
        name:args.name,
        parentCategories:stringParentCategories,
        parentCategory:args.parentCategory
      },{raw:true})
      return {...category.dataValues,parentCategories:[...parentCategories,category.dataValues.id]}
    },
    deleteCategory:async(parent,args,{db})=>{
      const category=await db.Category.findByPk(args.id)
      if(category==null)
        return false
      const sons=await db.Category.findAll({
        raw:true})
      for(let s in sons){
        let parents=sons[s].parentCategories
        let ps=parents.split(",")
        ps=ps.map(x=>parseInt(x))
        if(ps.includes(category.id)){
          return false
          
        }
      }
      await db.Fields.destroy({where:{category:category.id}})
      await category.destroy()
      fs.unlinkSync(`./models/${category.name}.mjs`)
      fs.unlinkSync(`./schema/${category.name}.mjs`)
      fs.unlinkSync(`./resolvers/${category.name}.mjs`)
      return true
      
    }
    
  }
}