import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, setCategoryProducts } from '../../redux/category/actions'
import Dialog from '../Dialog'
import DisplayFields from '../DisplayFields'
import FormButton from '../Forms/FormButton'

/*const getQuerySearchOne=(cat)=>{
  const f=cat.fields.map(c=>{
    if(c.dataType=="relationship"){
      return `${c.name}{id}`
    }
    return c.name
  })
  f.unshift("id")
  const query=`mutation GET_SEARCH_ONE($id:Int){
    get${cat.name}(id:$id){
    ${f.join("\n")}
  }}`
  //console.log("querysearchone",query)
  return gql`${query}`
}*/
const getDummyMut=(cat)=>{
  let argsf=cat.fields
  let args1=[]
  let ya
  for(let f in argsf){
    if(argsf[f].declaredType=="number"){
        args1.push(`$${argsf[f].name}:Int`)
    }if(argsf[f].declaredType=="string" 
    || argsf[f].declaredType=="date"
    || argsf[f].dataType=="multipleValue"){
      args1.push(`$${argsf[f].name}:String`)
    }
  
  }
  args1=args1.join(", ")

  let args2=[]
  for(let f in argsf){
    if(argsf[f].declaredType=="number"){
    
        args2.push(`${argsf[f].name}:$${argsf[f].name}`)
      
      
    }else if(argsf[f].declaredType=="string" 
    || argsf[f].declaredType=="date"
    || argsf[f].dataType=="multipleValue"){
      args2.push(`${argsf[f].name}:$${argsf[f].name}`)
    }
  }

  args2.join(", ")

  let campos=[]
  for(let f in argsf){
    if(argsf[f].declaredType=="number"){
      
      campos.push(`${argsf[f].name}`)
      
    }else if(argsf[f].declaredType=="string" 
    || argsf[f].declaredType=="date"
    || argsf[f].dataType=="multipleValue")
    
      campos.push(argsf[f].name)
  }
  campos.unshift("id")
  const query=`mutation GetDummyMtm(${args1}){
    create${cat.name}(${args2}){
      ${campos}
    }
  }`
  console.log("querygroup",query)
  return gql`${query}`
}



const getdatamtmgroup=(category,categories,nameMut,crec)=>{
  let argsf=category.fields
  let args1=[]
  let ya
  for(let f in argsf){
    if(argsf[f].dataType=="queryCategory"){
      args1.push(`$${argsf[f].name}GlobalCatQuery:Int`)
      args1.push(`$${argsf[f].name}FinalCatQuery:Int`)
      args1.push(`$${argsf[f].name}ProductQuery:Int`)
      if(argsf[f].declaredType=="number")
        args1.push(`$${argsf[f].name}:Int`)


    }else if(argsf[f].declaredType=="number"){
      if(ya[argsf[f].name]!==true){
        args1.push(`$${argsf[f].name}:Int`)
      }
      
      
    }
    
    else if(argsf[f].declaredType=="string" 
    || argsf[f].declaredType=="date"
    || argsf[f].dataType=="multipleValue"){
      args1.push(`$${argsf[f].name}:String`)
    }
  
  }
  args1=args1.join(", ")

  let args2=[]
  for(let f in argsf){
    if(argsf[f].dataType=="queryCategory"){
      args2.push(`${argsf[f].name}GlobalCatQuery:$${argsf[f].name}GlobalCatQuery`)
      args2.push(`${argsf[f].name}FinalCatQuery:$${argsf[f].name}FinalCatQuery`)
      args2.push(`${argsf[f].name}ProductQuery:$${argsf[f].name}ProductQuery`)
      //if(mtm)
      if(argsf[f].declaredType=="number")
        args2.push(`${argsf[f].name}:$${argsf[f].name}`)

    }else if(argsf[f].declaredType=="number"){
      if(ya[argsf[f].name]!==true){
        args2.push(`${argsf[f].name}:$${argsf[f].name}`)
      }
      
    }
    else if(argsf[f].dataType!=="relationship"){
      args2.push(`${argsf[f].name}:$${argsf[f].name}`)
    }
  }

  args2.join(", ")

  let campos=[]
  for(let f in argsf){
    if(argsf[f].dataType=="relationship"){
      if(argsf[f].relationship=="onetomany"){
        let oc=categories.filter(c=>c.id==argsf[f].relationCategory)
        //console.log("oc",oc)
        let na=`otm${category.name}${oc[0].name}`
        
        campos.push(`${na}{id}`)
      
      }else if(argsf[f].relationship=="manytomany"){
        let oc=categories.filter(c=>c.id==argsf[f].relationCategory)
        console.log("ocojo",oc)
        let na=`mtm${oc[0].name}${category.name}`
        let otrosCampos=oc[0].fields.map(ocf=>{
          if(ocf.declaredType=="number" ||
          ocf.declaredType=="string" ||
          ocf.dataType=="multipleValue")
            return `${ocf.name}\n`
          else
            return ""
        })
        campos.push(`${na}{${otrosCampos}}`)
      
      }
    }else if(argsf[f].dataType=="queryCategory" && argsf[f].declaredType=="number"){
      campos.push(argsf[f].name)
      ya={[argsf[f].name]:true}
    }
    else if(argsf[f].dataType=="queryCategory" && argsf[f].declaredType!=="number"){
      campos.push(`${argsf[f].name}GlobalCatQuery`)
      campos.push(`${argsf[f].name}FinalCatQuery`)
      campos.push(`${argsf[f].name}ProductQuery`)
      
    }else if(argsf[f].declaredType=="number"){
      if(ya[argsf[f].name]!==true){
        campos.push(`${argsf[f].name}`)
      }
    }
    else
      campos.push(argsf[f].name)
  }
  crec.fields.forEach(cr=>{
    if(cr.dataType=="relationship"){
      if(cr.relationship=="onetomany"){
        let oc=categories.filter(c=>c.id==cr.relationCategory)
        //console.log("oc",oc)
        let na=`${cr.name}`
        
        campos.push(`${na}{id}`)
      
      }else if(cr.relationship=="manytomany"){
        let oc=categories.filter(c=>c.id==cr.relationCategory)[0]
        //console.log("oc",oc)
        let na=cr.name
        //let na=`mtm${oc[0].name}${category.name}`
        let ncent=oc.fields.map(o=>{
          if(o.dataType=="relationship"){
            if(o.relationship=="onetomany"){
              return `otm${o.name}{id}`
            }else if(o.relationship=="manytomany"){
              const ro=categories.filter(
                x=>x.id==o.relationCategory
              )[0]
              let nc=ro.fields.map(x=>{
                if(x.dataType=="relationship"){
                  
                    return ""
                  
                }else
                  return x.name
              })
              let ny=category.fields.map(u=>u.name)
              nc=[...nc,...ny]
              nc.push("id")
              nc.join("\n")
              return `${o.name}{${nc}}`
            }
          }else{
            return o.name
          }
        })
        let nmtm=category.fields.map(c=>c.name)
        ncent=[...ncent,...nmtm]
        ncent.push("id")
        ncent.join("\n")
        campos.push(`${na}{${ncent}}`)
      
      }
    }else if(cr.declaredType=="number"){
      campos.push(`${cr.name}`)
    }else if(cr.dataType=="queryCategory"){
      campos.push(`${cr.name}GlobalCatQuery`)
      campos.push(`${cr.name}FinalCatQuery`)
      campos.push(`${cr.name}ProductQuery`)
    }
    else
      campos.push(cr.name)
  })
  /*crec.fields.forEach(cr=>{
    if(cr.dataType=="relationship"){
      if(cr.relationship=="onetomany"){
        let oc=categories.filter(c=>c.id==cr.relationCategory)
        //console.log("oc",oc)
        let na=`${cr.name}`
        
        campos.push(`${na}{id}`)
      
      }else if(cr.relationship=="manytomany"){
        let oc=categories.filter(c=>c.id==cr.relationCategory)
        console.log("ocojo",oc)
        let na=`${cr.name}`
        let otrosCampos=oc[0].fields.map(ocf=>{
          if(ocf.declaredType=="number" ||
          ocf.declaredType=="string" ||
          ocf.dataType=="multipleValue")
            return `${ocf.name}\n`
          else
            return ""
        })
        otrosCampos.push("id")
        campos.push(`${na}{${otrosCampos.join("\n")}}`)
      
        
        
      }
    }else if(cr.declaredType=="number"){
      campos.push(`${cr.name}`)
    }else if(cr.dataType=="queryCategory"){
      campos.push(`${cr.name}GlobalCatQuery`)
      campos.push(`${cr.name}FinalCatQuery`)
      campos.push(`${cr.name}ProductQuery`)
    }
    else
      campos.push(cr.name)
  })*/
  campos.unshift("id")
  const query=`mutation GetGroupMtm(${args1}){
    ${nameMut}(${args2}){
      ${campos}
    }
  }`
  console.log("querygroup",query)
  return gql`${query}`
}

const getonedatamtm=(category,categories,titleMutation,crec)=>{
  let argsf=category.fields
  let args1=[]
  let ya
  for(let f in argsf){
    if(argsf[f].dataType=="queryCategory"){
      args1.push(`$${argsf[f].name}GlobalCatQuery:Int`)
      args1.push(`$${argsf[f].name}FinalCatQuery:Int`)
      args1.push(`$${argsf[f].name}ProductQuery:Int`)
      if(argsf[f].declaredType=="number")
        args1.push(`$${argsf[f].name}:Int`)


    }else if(argsf[f].declaredType=="number"){
      if(ya[argsf[f].name]!==true){
        args1.push(`$${argsf[f].name}:Int`)
      }
      
      
    }
    
    else if(argsf[f].declaredType=="string" 
    || argsf[f].declaredType=="date"
    || argsf[f].dataType=="multipleValue"){
      args1.push(`$${argsf[f].name}:String`)
    }
  
  }
  args1=args1.join(", ")

  let args2=[]
  for(let f in argsf){
    if(argsf[f].dataType=="queryCategory"){
      args2.push(`${argsf[f].name}GlobalCatQuery:$${argsf[f].name}GlobalCatQuery`)
      args2.push(`${argsf[f].name}FinalCatQuery:$${argsf[f].name}FinalCatQuery`)
      args2.push(`${argsf[f].name}ProductQuery:$${argsf[f].name}ProductQuery`)
      //if(mtm)
      if(argsf[f].declaredType=="number")
        args2.push(`${argsf[f].name}:$${argsf[f].name}`)

    }else if(argsf[f].declaredType=="number"){
      if(ya[argsf[f].name]!==true){
        args2.push(`${argsf[f].name}:$${argsf[f].name}`)
      }
      
    }
    else if(argsf[f].dataType!=="relationship"){
      args2.push(`${argsf[f].name}:$${argsf[f].name}`)
    }
  }

  args2.join(", ")

  let campos=[]
  for(let f in argsf){
    if(argsf[f].dataType=="relationship"){
      if(argsf[f].relationship=="onetomany"){
        let oc=categories.filter(c=>c.id==argsf[f].relationCategory)
        //console.log("oc",oc)
        let na=`otm${category.name}${oc[0].name}`
        
        campos.push(`${na}{id}`)
      
      }else if(argsf[f].relationship=="manytomany"){
        let oc=categories.filter(c=>c.id==argsf[f].relationCategory)
        console.log("ocojo",oc)
        let na=`mtm${oc[0].name}${category.name}`
        let otrosCampos=oc[0].fields.map(ocf=>{
          if(ocf.declaredType=="number" ||
          ocf.declaredType=="string" ||
          ocf.dataType=="multipleValue")
            return `${ocf.name}\n`
          else
            return ""
        })
        campos.push(`${na}{${otrosCampos}}`)
      
      }
    }else if(argsf[f].dataType=="queryCategory" && argsf[f].declaredType=="number"){
      campos.push(argsf[f].name)
      ya={[argsf[f].name]:true}
    }
    else if(argsf[f].dataType=="queryCategory" && argsf[f].declaredType!=="number"){
      campos.push(`${argsf[f].name}GlobalCatQuery`)
      campos.push(`${argsf[f].name}FinalCatQuery`)
      campos.push(`${argsf[f].name}ProductQuery`)
      
    }else if(argsf[f].declaredType=="number"){
      if(ya[argsf[f].name]!==true){
        campos.push(`${argsf[f].name}`)
      }
    }
    else
      campos.push(argsf[f].name)
  }
  crec.fields.forEach(cr=>{
    if(cr.dataType=="relationship"){
      if(cr.relationship=="onetomany"){
        let oc=categories.filter(c=>c.id==cr.relationCategory)
        //console.log("oc",oc)
        let na=`${cr.name}`
        
        campos.push(`${na}{id}`)
      
      }else if(cr.relationship=="manytomany"){
        let oc=categories.filter(c=>c.id==cr.relationCategory)
        console.log("ocojo",oc)
        let na=`${cr.name}`
        let otrosCampos=oc[0].fields.map(ocf=>{
          if(ocf.declaredType=="number" ||
          ocf.declaredType=="string" ||
          ocf.dataType=="multipleValue")
            return `${ocf.name}\n`
          else
            return ""
        })
        otrosCampos.push("id")
        campos.push(`${na}{${otrosCampos.join("\n")}}`)
      
        
        
      }
    }else if(cr.declaredType=="number"){
      campos.push(`${cr.name}`)
    }else if(cr.dataType=="queryCategory"){
      campos.push(`${cr.name}GlobalCatQuery`)
      campos.push(`${cr.name}FinalCatQuery`)
      campos.push(`${cr.name}ProductQuery`)
    }
    else
      campos.push(cr.name)
  })
  
  campos.unshift("id")  
  
  campos=campos.join("\n")

  const query=`mutation CreateMTMProduct(${args1}){
    ${titleMutation}(${args2}){
      ${campos}
    }
  }`
  console.log("queryonemut",query)
  return gql`${query}`
}

const addProductMutation=(category,categories,mtm)=>{
  let argsf=category.fields
  let args1=[]
  let ya
  for(let f in argsf){
    if(argsf[f].dataType=="queryCategory"){
      args1.push(`$${argsf[f].name}GlobalCatQuery:Int`)
      args1.push(`$${argsf[f].name}FinalCatQuery:Int`)
      args1.push(`$${argsf[f].name}ProductQuery:Int`)
      if(argsf[f].declaredType=="number")
        args1.push(`$${argsf[f].name}:Int`)


    }else if(argsf[f].declaredType=="number"){
      if(ya[argsf[f].name]!==true){
        args1.push(`$${argsf[f].name}:Int`)
      }
      
      
    }
    
    else if(argsf[f].declaredType=="string" 
    || argsf[f].declaredType=="date"
    || argsf[f].dataType=="multipleValue"){
      args1.push(`$${argsf[f].name}:String`)
    }
  }
  args1=args1.join(", ")
 
  let args2=[]
  for(let f in argsf){
    if(argsf[f].dataType=="queryCategory"){
      args2.push(`${argsf[f].name}GlobalCatQuery:$${argsf[f].name}GlobalCatQuery`)
      args2.push(`${argsf[f].name}FinalCatQuery:$${argsf[f].name}FinalCatQuery`)
      args2.push(`${argsf[f].name}ProductQuery:$${argsf[f].name}ProductQuery`)
      //if(mtm)
      if(argsf[f].declaredType=="number")
        args2.push(`${argsf[f].name}:$${argsf[f].name}`)

    }else if(argsf[f].declaredType=="number"){
      if(ya[argsf[f].name]!==true){
        args2.push(`${argsf[f].name}:$${argsf[f].name}`)
      }
      
    }
    else if(argsf[f].dataType!=="relationship"){
      args2.push(`${argsf[f].name}:$${argsf[f].name}`)
    }
  }
  
  args2.join(", ")

  let campos=[]
  for(let f in argsf){
    if(argsf[f].dataType=="relationship"){
      if(argsf[f].relationship=="onetomany"){
        let oc=categories.filter(c=>c.id==argsf[f].relationCategory)
        //console.log("oc",oc)
        let na=`otm${category.name}${oc[0].name}`
        
        campos.push(`${na}{id}`)
      
      }else if(argsf[f].relationship=="manytomany"){
        let oc=categories.filter(c=>c.id==argsf[f].relationCategory)
        //console.log("oc",oc)
        let na=`mtm${oc[0].name}${category.name}`
        
        campos.push(`${na}{id}`)
      
      }
    }else if(argsf[f].dataType=="queryCategory"){
      campos.push(`${argsf[f].name}GlobalCatQuery`)
      campos.push(`${argsf[f].name}FinalCatQuery`)
      campos.push(`${argsf[f].name}ProductQuery`)
      //if(mtm)
      if(argsf[f].declaredType=="number"){
        campos.push(`${argsf[f].name}`)
        ya={[argsf[f].name]:true}
      }
    }else if(argsf[f].declaredType=="number"){
      if(ya[argsf[f].name]!==true){
        campos.push(`${argsf[f].name}`)
      }
    }
    else
      campos.push(argsf[f].name)
  }
  if(!mtm){
    campos.unshift("id")  
  }
  campos=campos.join("\n")
  
  const query=`mutation CreateProduct(${args1}){
    create${category.name}(${args2}){
      ${campos}
    }
  }`
  console.log("queryadd",query)
  return gql`${query}`
}

const addMtmProductMutation=(category,categories,titleMutation,crec)=>{
  let argsf=category.fields
  let args1=[]
  let ya={}
  for(let f in argsf){
    if(argsf[f].dataType=="queryCategory"){
      args1.push(`$${argsf[f].name}GlobalCatQuery:Int`)
      args1.push(`$${argsf[f].name}FinalCatQuery:Int`)
      args1.push(`$${argsf[f].name}ProductQuery:Int`)
      if(argsf[f].declaredType=="number")
        args1.push(`$${argsf[f].name}:Int`)


    }else if(argsf[f].declaredType=="number"){
      if(ya[argsf[f].name]!==true){
        args1.push(`$${argsf[f].name}:Int`)
      }
      
      
    }
    
    else if(argsf[f].declaredType=="string" 
    || argsf[f].declaredType=="date"
    || argsf[f].dataType=="multipleValue"){
      args1.push(`$${argsf[f].name}:String`)
    }
  
  }
  args1=args1.join(", ")

  let args2=[]
  for(let f in argsf){
    if(argsf[f].dataType=="queryCategory"){
      args2.push(`${argsf[f].name}GlobalCatQuery:$${argsf[f].name}GlobalCatQuery`)
      args2.push(`${argsf[f].name}FinalCatQuery:$${argsf[f].name}FinalCatQuery`)
      args2.push(`${argsf[f].name}ProductQuery:$${argsf[f].name}ProductQuery`)
      //if(mtm)
      if(argsf[f].declaredType=="number"){
        
        if(ya[argsf[f].name]!==true){
          args2.push(`${argsf[f].name}:$${argsf[f].name}`)
        }
      }
    }else if(argsf[f].declaredType=="string" 
    || argsf[f].declaredType=="date"
    || argsf[f].dataType=="multipleValue"){
      
      args2.push(`${argsf[f].name}:$${argsf[f].name}`)
    }
    
  }

  args2.join(", ")

  let campos=[]
  for(let f in argsf){
    if(argsf[f].dataType=="relationship"){
      if(argsf[f].relationship=="onetomany"){
        let oc=categories.filter(c=>c.id==argsf[f].relationCategory)
        //console.log("oc",oc)
        let na=`otm${category.name}${oc[0].name}`
        
        campos.push(`${na}{id}`)
      
      }else if(argsf[f].relationship=="manytomany"){
        let oc=categories.filter(c=>c.id==argsf[f].relationCategory)[0]
        //console.log("oc",oc)
        let na=argsf[f].name
        let ncent=oc.fields(o=>o.name)
        let nmtm=category.fields(c=>c.name)
        ncent=[...ncent,...nmtm]
        ncent.push("id")
        ncent.join("\n")
        campos.push(`${na}{${ncent}}`)
      
      }
    }
    else if(argsf[f].dataType=="queryCategory" && argsf[f].declaredType!=="number"){
      campos.push(`${argsf[f].name}GlobalCatQuery`)
      campos.push(`${argsf[f].name}FinalCatQuery`)
      campos.push(`${argsf[f].name}ProductQuery`)
      ya={[argsf[f].name]:true}

    }else if(argsf[f].declaredType=="number"){
      if(ya[argsf[f].name]!==true){
        campos.push(`${argsf[f].name}`)
      }
    }
    else
      campos.push(argsf[f].name)
  }
  crec.fields.forEach(cr=>{
    if(cr.dataType=="relationship"){
      if(cr.relationship=="onetomany"){
        let oc=categories.filter(c=>c.id==cr.relationCategory)
        //console.log("oc",oc)
        let na=`${cr.name}`
        
        campos.push(`${na}{id}`)
      
      }else if(cr.relationship=="manytomany"){
        let oc=categories.filter(c=>c.id==cr.relationCategory)[0]
        //console.log("oc",oc)
        let na=cr.name
        //let na=`mtm${oc[0].name}${category.name}`
        let ncent=oc.fields.map(o=>{
          if(o.dataType=="relationship"){
            if(o.relationship=="onetomany"){
              return `otm${o.name}{id}`
            }else if(o.relationship=="manytomany"){
              const ro=categories.filter(
                x=>x.id==o.relationCategory
              )[0]
              let nc=ro.fields.map(x=>{
                if(x.dataType=="relationship"){
                  
                    return ""
                  
                }else
                  return x.name
              })
              let ny=category.fields.map(u=>u.name)
              nc=[...nc,...ny]
              nc.push("id")
              nc.join("\n")
              return `${o.name}{${nc}}`
            }
          }else{
            return o.name
          }
        })
        let nmtm=category.fields.map(c=>c.name)
        ncent=[...ncent,...nmtm]
        ncent.push("id")
        ncent.join("\n")
        campos.push(`${na}{${ncent}}`)
      
      }
    }else if(cr.declaredType=="number"){
      campos.push(`${cr.name}`)
    }else if(cr.dataType=="queryCategory"){
      campos.push(`${cr.name}GlobalCatQuery`)
      campos.push(`${cr.name}FinalCatQuery`)
      campos.push(`${cr.name}ProductQuery`)
    }
    else
      campos.push(cr.name)
  })
  
  campos.unshift("id")  
  
  campos=campos.join("\n")

  const query=`mutation CreateMTMProduct(${args1}){
    ${titleMutation}(${args2}){
      ${campos}
    }
  }`
  console.log("queryaddmut",query)
  return gql`${query}`
}


const mapToState=({categories})=>({
  currentCategory:categories.currentCategory,
  categoryProducts:categories.categoryProducts,
  categories:categories.categories
})

const NewProduct = ({
  open,
  toggleDialog,
  respCat,
  tableIndexes,
  partials,
  titulo,
  parentId,
  isManyToMany,
  relationCategory,
  parentRelation,
  parentCatId
  
}) => {
  console.log("pr1",parentRelation)
  const [editFields,setEditFields]=useState({})
  console.log("title12",titulo)
  //console.log("respcatnuevo",respCat)
  //console.log("parentcatid newproduct",parentCatId)
  const [fields,setFields]=useState({})
  const {currentCategory,
  categoryProducts,
  categories}=useSelector(mapToState)
  const dispatch=useDispatch()
  let nC,nRc,pR,nn,relMtMC,nameAlias,nameAliasOneMtm
  let existe=false
  const [mtmStr,setMtmStr]=useState([])
  const [resto,setResto]=useState({})
  const [otrotitulo,setOtroTitulo]=useState("")
  const [addRecGlobal,setAddRecGlobal]=useState({})
  const [groupRecsGlobal,setGroupRecsGlobal]=useState([])

  useEffect(()=>{
    
    
    if(titulo.startsWith("mtm")){
      pR=categories.filter(x=>x.id==parentRelation)[0]
      console.log("PR",pR)
      nRc=categories.filter(x=>x.id==relationCategory)[0]
    
      //nameAlias=`createdatamtm${nRc.name}${pR.name}`
      console.log("namealias",nameAlias)
      if(pR.name<nRc.name)
        nn=`${pR.name}_${nRc.name}`
      else
        nn=`${nRc.name}_${pR.name}`
      setOtroTitulo(`mtm${pR.name}${nRc.name}`)
      console.log("otrot",otrotitulo)
      relMtMC=categories.filter(x=>x.name==nn)[0]
      console.log("nn",nn)
      nC=categories.filter(x=>x.name==nn)[0]
      console.log("Nccc",nC.fields)
      setMtmStr(nC.fields)
      //setFields(nC.fields)
    }else{

      const xfields=respCat.fields.filter(x=>
        x.relationship=="otmdestiny"
      )
      const nf={}
      xfields.forEach(f=>{
        nf[f.name]=parentId
      })
      //console.log("nf",nf)
      setFields({...fields,...nf})
    }
  },[])

  const updateState=(prods,indexPartials=0,indexArray=0,to,pt,st,rec,addRecord,dg,firstTableRecord)=>{
    console.log("entro  aqui",to,pt,st,firstTableRecord,dg,addRecord)  
    indexPartials=parseInt(indexPartials)
    indexArray=parseInt(indexArray)
    let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
    
    //  console.log("tipartials",ti,partials)
    let cp 
        
    partials=path
    ti=ind

      
    if(!Array.isArray(prods)){
      cp={...prods}
      //console.log("no arreglo")
      //console.log("prods partlength partials",prods,partials.length,partials)
      let ui
      //console.log("pip",partials[indexPartials],cp[partials[indexPartials]])
      //console.log("params",cp[partials[indexPartials]],indexPartials+1,indexArray)
      //console.log("se modifica campo",partials[indexPartials])
      //if((indexPartials+1)==partials.length){
      //console.log("importante",partials[indexPartials],titulo)
      if(partials[indexPartials]==to){
        let ni
        let nv
        console.log("to",to)
            
        nv=rec["id"]
            

          //console.log("ui",partials[indexPartials],cp[partials[indexPartials]])
        return {...cp,
          [partials[indexPartials]]:cp[partials[indexPartials]].map(x=>{
              //console.log("xid deleteid",x.id,deleteId,x.id!==deleteId)
            let n=`${pt}Id`// en el ejemplo mtmgruposalumnosid
            let m=`${st}Id`//en el ejemplo metmalumnosgruposid
            console.log("nm",n,m)
            let newR={},newSr

            if(x["id"]==rec[m]){
              console.log("idar",x["id"],rec[m])
              if(rec[m]==addRecord[m] && rec[n]==addRecord[n]){
                if(titulo!==st){
                  if(existe==false){
                    console.log("entro1",addRecord[m],addRecord[n],addRecord,x[pt])
                    newR={...x,[pt]:[...x[pt],{...addRecord}]}
                    console.log("newr1",newR)
                    existe=true
                  }else
                    newR=x
                }else if(titulo==st){
                  console.log("entro2",addRecord[m],addRecord[n])
                  newR={...x,[pt]:[...x[pt],{...firstTableRecord,[st]:dg}]}
                }
              
              }else{
                
                console.log("dg44")
                newR={...x,[pt]:x[pt].map(y=>{
                  if(y[n]==rec[n])
                    return {...y,[st]:dg}
                  else
                    return y
                })}
                
              }
              return newR
            }else
              return x
          })
        }
        

      }else{
          //console.log("entro no final")
        return {...cp,[partials[indexPartials]]:updateState(cp[partials[indexPartials]],indexPartials+1,indexArray,to,pt,st,rec,addRecord,dg,firstTableRecord)}
      }
      
    } else if(Array.isArray(prods)){
      cp=[...prods]
      //console.log("arraglo",indexArray,ti.length)
      //console.log("deliddd",deleteId)
      //console.log("prods",prods)
        //console.log("partarr",cp[ti[indexArray]])
      //console.log("paramsarr",cp[ti[indexArray]],indexPartials,indexArray+1,titulo)
      let nv
      let nia
      //console.log("jorgevio",ti[indexArray])
      if(ti[indexArray].toString().startsWith("-")){
        nv=parseInt(ti[indexArray].substr(1))
        cp.forEach((x,indx)=>{
          if(x.id==nv){
            ti[indexArray]=indx
          }
        })    
      }      
      
      return cp.map((y,index)=>{
        if(index==ti[indexArray]){
          return updateState(cp[ti[indexArray]],indexPartials,indexArray+1,to,pt,st,rec,addRecord,dg,firstTableRecord)
        }
        return y
      })
    
      
    } 
      
  }

  /*updatestate original
  const updateState=(prods,indexPartials=0,indexArray=0,nuevo,tit,dg)=>{
    console.log("dgup",dg) 
    indexPartials=parseInt(indexPartials)
      indexArray=parseInt(indexArray)
      let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
    console.log("prodsus",prods)
      //console.log("tipartials",ti,partials)
      let cp 
        partials=path
        ti=ind

      
      if(!Array.isArray(prods)){
        cp={...prods}
        //console.log("no arreglo")
        //console.log("prods partlength partials",prods,partials.length,partials)
        let ui
        //console.log("pip",partials[indexPartials],cp[partials[indexPartials]])
        //console.log("params",cp[partials[indexPartials]],indexPartials+1,indexArray)
        //console.log("se modifica campo",partials[indexPartials])
        //if((indexPartials+1)==partials.length){
        //console.log("importante",partials[indexPartials],titulo)
        if(partials[indexPartials]==tit){
          //console.log("entro final")
          
          console.log("partials[indexPartials]",cp[partials[indexPartials]])
          
          //console.log("ui",partials[indexPartials],cp[partials[indexPartials]],resto)
          if(dg==undefined){
            return {
              ...cp,
              [partials[indexPartials]]:
              [...cp[partials[indexPartials]],{...nuevo}]
            }
          }else{
            console.log("entroclave",dg)
            return {
              ...cp,
              [partials[indexPartials]]:[...dg]
            }
          }       
        }else{
          //console.log("entro no final")
          return {...cp,[partials[indexPartials]]:updateState(cp[partials[indexPartials]],indexPartials+1,indexArray,nuevo,tit,dg)}
        }
      
      } else if(Array.isArray(prods)){
        cp=[...prods]
        //console.log("arraglo",indexArray,ti.length)
        //console.log("deliddd",deleteId)
        //console.log("prods",prods)
          //console.log("partarr",cp[ti[indexArray]])
        //console.log("paramsarr",cp[ti[indexArray]],indexPartials,indexArray+1,titulo)
        let nv
        let nia
        //console.log("jorgevio",ti[indexArray])
        if(ti[indexArray].toString().startsWith("-")){
          nv=parseInt(ti[indexArray].substr(1))
          cp.forEach((x,ind)=>{
            if(x.id==nv){
              ti[indexArray]=ind
            }
        })
        }         
        
        return cp.map((y,index)=>{
          if(index==ti[indexArray]){
            return updateState(cp[ti[indexArray]],indexPartials,indexArray+1,nuevo,tit,dg)
          }
          return y
        })
      
      } 
  } termina updatestate orignal*/

  let ind
  let path
  const getIndexesInverse=(addRecord,pivoteTable,otherPivoteTable)=>{
    console.log("add3",addRecord)
    for(let p in path){
      if(path[p]!==pivoteTable){
        let curInd
        curInd=tableIndexes[path[p]]
        ind.push(curInd)
      }else{
        if(path[p].startsWith("mtm")){
          ind=ind.splice(0,ind.length-1)
          ind=ind.splice(0,ind.length-2)
          const uy=`${pivoteTable}Id`
          ind.push(`-${addRecord[uy]}`)
          let n=`${otherPivoteTable}Id`
          ind.push(`-${addRecord[n]}`)
          ind.push(`-${addRecord[uy]}`)

        }
      }
    }
  }

  /*const getIndexesInverse=(titleCat,fi)=>{
    console.log("fiartificial",fi)
    for(let p in path){
      //console.log("ti pathp",tableIndexes,path[p])
      if(path[p]!==otrotitulo){
        let curInd
        curInd=tableIndexes[path[p]]
        ind.push(curInd)
      }else{
        if(path[p].startsWith("mtm")){
          ind=ind.splice(0,ind.length-1)
          console.log("pathp PATHP-1",path[p],path[p-1])
          if(path[p-1].startsWith("mtm")){
            ind=ind.splice(0,ind.length-1)
            const pr=`${otrotitulo}Id`
            ind.push(`-${fi[pr]}`)
            const n=`${titulo}Id`

            ind.push(`-${fi[n]}`)
          
              const nn=`${otrotitulo}Id`
              ind.push(`-${fi[nn]}`)
          
        
          }else{
            //ind=ind.splice(0,ind.length-1)
            const uy=`${titulo}Id`
            ind.push(`-${fi[uy]}`)
            let n=`${otrotitulo}Id`
            ind.push(`-${fi[n]}`)
            
            //const nn=`${otrotitulo}Id`
            //ind.push(`-${fi[nn]}`)
            
          }
        }
      }
    }
  }termina getindexesinverse original */

    /*console.log("curcatname",titulo.substr(3),titleCat.substr(7))
    let r=false
    ind=[]
    if(titulo.substr(3).startsWith(titleCat.substr(7))){
      r=true
    }
    else{
      r=false
    }
    //console.log("paramms",curCat.name,titleCat.substr(7))
    //console.log("titulo,otrotitulo",titulo,otrotitulo)
    if(r){
      console.log(true)
      const pr=`${titulo}Id`
      ind.push(`-${fi[pr]}`)
      const n=`${otrotitulo}Id`

      ind.push(`-${editFields[n]}`)
      if(path.length>2){
          const nn=`${titulo}Id`
          ind.push(`-${fi[nn]}`)
        }
    }else{
      //console.log(false)
      const uy=`${otrotitulo}Id`
      ind.push(`-${fi[uy]}`)
      let n=`${titulo}Id`
      ind.push(`-${fi[n]}`)
      if(path.length>2){
        const nn=`${otrotitulo}Id`
        ind.push(`-${fi[nn]}`)
      } 
    }
  
  }*/

 const getIndexes=()=>{
    
    for(let p in path){
      //console.log("ti pathp",tableIndexes,path[p])
      let curInd
      curInd=tableIndexes[path[p]]
      ind.push(curInd)
      
    }
    return ind
  }
  let indexSize=1
  

  const getPath=(fields,tit)=>{
    
    if(tit.startsWith('getData')){
      return path
    }
    let keys=Object.keys(fields)
    if(keys?.length>0){
      indexSize++
      let ni=indexSize
      for(let f in keys){
        if(path.length>=ni){
          path.splice(ni-1)
        }
        path.push(fields[f].name)
        if(fields[f].name!==tit){
          const relCatId=fields[f].relationCategory
          const curCat=categories.filter(x=>x.id==relCatId)[0]
          
          
          const r=getPath(curCat.fields.filter(x=>x.dataType=="relationship"),tit)
          if(r==true)
              break
        }else{
          return true
        }
      }
    }else
      return

  }

  const checkHasSons=(prods,indexPartials=0,indexArray=0,tit)=>{
    console.log("in2",prods)
    indexPartials=parseInt(indexPartials)
    indexArray=parseInt(indexArray)
    let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
    let cp
    partials=path
    ti=ind
    if(!Array.isArray(prods)){
      cp={...prods}
      console.log("in312",partials[indexPartials],cp[partials[indexPartials]],tit)

      if(partials[indexPartials]==tit){
        console.log("mat1")
        return cp[partials[indexPartials]]
      }else{
        return checkHasSons(cp[partials[indexPartials]],indexPartials+1,indexArray,tit)

      }

    }else if(Array.isArray(prods)){
      console.log("in4")
       cp=[...prods]
       let nv
       if(ti[indexArray].toString().startsWith("-")){
         nv=parseInt(ti[indexArray].substr(1))
         cp.forEach((x,indx)=>{
           if(x.id==nv)
            ti[indexArray]=indx
         })
       }
    
      return checkHasSons(cp[ti[indexArray]],indexPartials,indexArray+1,tit)
    }

  }
  const updateClusters=(tablaoriginal,pivoteTable,otherPivoteTable,dg,arg,ftadd)=>{
    //const recs=checkHasSons(categoryProducts,0,0,pivoteTable)
    console.log("chs",dg)
    let currentData={...categoryProducts}
    for(let x in dg){
      ind=[]
      getIndexesInverse(dg[x],pivoteTable,otherPivoteTable)
      console.log("adm",dg[x],ind,arg)
      currentData=updateState(currentData,0,0,tablaoriginal,otherPivoteTable,pivoteTable,dg[x],arg,dg,ftadd)
    }
    existe=false
    dispatch(setCategoryProducts(currentData))

  }


  let CREATE_PRODUCT_MUT=""
  let CREATE_PRODUCT_MUTATION_MTM=""
  let nameGroupAlias
  console.log("titulo",titulo,parentRelation)
  
    pR=categories.filter(x=>x.id==parentRelation)[0]
    /*if(titulo.startsWith("mtm")){
        nRc=categories.filter(x=>x.id==relationCategory)[0]
        console.log("pr nRc",pR,nRc,parentRelation,relationCategory)
        //GET_SEARCH_ONE=getQuerySearchOne(nRc)
        if(pR?.name<nRc?.name)
          nn=`${pR.name}_${nRc.name}`
        else
          nn=`${nRc.name}_${pR.name}`
        relMtMC=categories.filter(x=>x.name==nn)[0]
        //console.log("nn",nn)
        nC=categories.filter(x=>x.name==nn)[0]
        console.log("Nccc",nC.fields)
        nameAlias=`createdatamtm${nRc.name}${pR.name}`
        nameAliasOneMtm=`getonedatamtm${otherPivoteTable.substr(3)}`
        nameGroupAlias=`getdatamtm${pivoteTable.substr(3)}`
        console.log("na naomtm nga",nameAlias,nameAliasOneMtm,nameGroupAlias)
      CREATE_PRODUCT_MUTATION_MTM=addMtmProductMutation(relMtMC,categories,nameAlias,nRc)

    }else{
      //GET_SEARCH_ONE=getQuerySearchOne(respCat)
      console.log("entroaqui",respCat)
      CREATE_PRODUCT_MUT=addProductMutation(respCat,categories,false)
      
    }*/
  
  /*const [getSearchOne]=useMutation(GET_SEARCH_ONE,{
    update:(cache,{data})=>{
      const nam=`get${nRc.name}`
      //console.log("resdata",data,nRc.name,data[nam])
      path=[`getData${currentCategory.name}`]
        indexSize=1
        console.log("tituloeasdf",titulo)
        getPath(currentCategory.fields.filter(x=>
          x.dataType=="relationship"),titulo)
        console.log("path",path)
        ind=[]
        getIndexes()
        

        //console.log("resto",resto)
        //console.log("datanamecomp",data[nam],resto,{...data[nam],...resto})
        const us=updateState(categoryProducts,0,0,{...data[nam],...resto},titulo)
        //console.log("ust",us)
        dispatch(setCategoryProducts(us))
    }
  })*/
  console.log("namegroupalias",nameGroupAlias)
  let GET_ONE_DATA_MTM
  let GET_DATA_MTM_GROUP
  let pivoteTable,otherPivoteTable,tablaoriginal
  if(titulo.startsWith("mtm")){
    
    path=[`getData${currentCategory.name}`]
    indexSize=1
    getPath(currentCategory.fields.filter(x=>x.dataType=="relationship"),
    titulo)
    if(path[path.length-2].startsWith("mtm")){
      pivoteTable=titulo
      otherPivoteTable=otrotitulo
      tablaoriginal=path[path.length-3]
    }else{
      pivoteTable=otrotitulo
      otherPivoteTable=titulo
      tablaoriginal=path[path.length-2]
      
    }
    //nameGroupAlias=`getdatamtm${pivoteTable}${otherPivoteTable}`
    console.log("rmtm",relMtMC)
   /*nameAlias=`createdatamtm${nRc.name}${pR.name}`
    nameAliasOneMtm=`getonedatamtm${pR.name}${nRc.name}`
    nameGroupAlias=`getdatamtm${nRc.name}${pR.name}`*/
    nRc=categories.filter(x=>x.id==relationCategory)[0]
        console.log("pr nRc",pR,nRc,parentRelation,relationCategory)
        //GET_SEARCH_ONE=getQuerySearchOne(nRc)
        if(pR?.name<nRc?.name)
          nn=`${pR.name}_${nRc.name}`
        else
          nn=`${nRc.name}_${pR.name}`
        relMtMC=categories.filter(x=>x.name==nn)[0]
        //console.log("nn",nn)
        nC=categories.filter(x=>x.name==nn)[0]
        console.log("Nccc",nC.fields)
      const uno=`mtm${nRc.name}${pR.name}`
      const dos=`mtm${pR.name}${nRc.name}`
      if(pivoteTable==titulo){//estoy insertando en la segunda tabla muchos a muchos
        nameAlias=`createdatamtm${nRc.name}${pR.name}`
        nameAliasOneMtm=`getonedatamtm${otherPivoteTable.substr(3)}`
        nameGroupAlias=`getdatamtm${pivoteTable.substr(3)}`
        console.log("na naomtm nga",nameAlias,nameAliasOneMtm,nameGroupAlias)
        CREATE_PRODUCT_MUTATION_MTM=addMtmProductMutation(relMtMC,categories,nameAlias,nRc)

        GET_ONE_DATA_MTM=getonedatamtm(relMtMC,categories,nameAliasOneMtm,pR)
        GET_DATA_MTM_GROUP=getdatamtmgroup(relMtMC,categories,nameGroupAlias,nRc)
        
      }else if(pivoteTable==otrotitulo){//estoy insertando en la primera table mam
        nameAlias=`createdatamtm${nRc.name}${pR.name}`
        nameAliasOneMtm=`getonedatamtm${otherPivoteTable.substr(3)}`
        nameGroupAlias=`getdatamtm${pivoteTable.substr(3)}`
        console.log("na naomtm nga",nameAlias,nameAliasOneMtm,nameGroupAlias,pR,nRc)
        CREATE_PRODUCT_MUTATION_MTM=addMtmProductMutation(relMtMC,categories,nameAlias,nRc)

        GET_ONE_DATA_MTM=getonedatamtm(relMtMC,categories,nameAliasOneMtm,nRc)
        GET_DATA_MTM_GROUP=getdatamtmgroup(relMtMC,categories,nameGroupAlias,pR)
        
      }
    CREATE_PRODUCT_MUT=getDummyMut(categories.filter(c=>c.name=="Alumnos")[0])
  }else{
    CREATE_PRODUCT_MUT=addProductMutation(respCat,categories,false)
    GET_ONE_DATA_MTM=getDummyMut(categories.filter(c=>c.name=="Alumnos")[0])
    GET_DATA_MTM_GROUP=getDummyMut(categories.filter(c=>c.name=="Alumnos")[0])
    CREATE_PRODUCT_MUTATION_MTM=getDummyMut(categories.filter(c=>c.name=="Alumnos")[0])
  }

  //const [dataGroup,setDataGroup]=useState([])
  const [getGroupMtm]=useMutation(GET_DATA_MTM_GROUP,{
    update:(cache,{data})=>{
      console.log("dtnesp",nameGroupAlias,data[nameGroupAlias],addRecGlobal)
      setGroupRecsGlobal(()=>data[nameGroupAlias])
      getOneMtm({variables:fields})
      
      /*const dnga=data[nameGroupAlias]
      let pivoteTable,otherPivoteTable,tablaoriginal
      path=[`getData${currentCategory.name}`]
      indexSize=1
      getPath(currentCategory.fields.filter(x=>x.dataType=="relationship"),
      titulo)
      if(path[path.length-2].startsWith("mtm")){
        pivoteTable=titulo
        otherPivoteTable=otrotitulo
        tablaoriginal=path[path.length-3]
      }else{
        pivoteTable=otrotitulo
        otherPivoteTable=titulo
        tablaoriginal=path[path.length-2]
        
      }
      path=[`getData${currentCategory.name}`]
      indexSize=1
      getPath(currentCategory.fields.filter(x=>x.dataType=="relationship"),
      pivoteTable)
      //nameGroupAlias=`getdatamtm${pivoteTable}${otherPivoteTable}`
      
      updateClusters(tablaoriginal,pivoteTable,otherPivoteTable,dnga,addRecGlobal)

      /*getOneMtm({variables:{
        ...fields
      }})*/
      
      

    }
  })
  const [getOneMtm]=useMutation(GET_ONE_DATA_MTM,{
    update:(cache,{data})=>{
      let pivoteTable,otherPivoteTable,tablaoriginal
      path=[`getData${currentCategory.name}`]
      indexSize=1
      getPath(currentCategory.fields.filter(x=>x.dataType=="relationship"),
      titulo)
      if(path[path.length-2].startsWith("mtm")){
        pivoteTable=titulo
        otherPivoteTable=otrotitulo
        tablaoriginal=path[path.length-3]
      }else{
        pivoteTable=otrotitulo
        otherPivoteTable=titulo
        tablaoriginal=path[path.length-2]
        
      }
      path=[`getData${currentCategory.name}`]
      indexSize=1
      getPath(currentCategory.fields.filter(x=>x.dataType=="relationship"),
      pivoteTable)
      //nameGroupAlias=`getdatamtm${pivoteTable}${otherPivoteTable}`
      console.log("namealiasone",nameAliasOneMtm,data[nameAliasOneMtm])
      updateClusters(tablaoriginal,pivoteTable,otherPivoteTable,groupRecsGlobal,addRecGlobal,data[nameAliasOneMtm])
  
        
      
        
      
    }
  })  
  let us
  const [resultadoPrimero,setResultadoPrimero]=useState({})
  const [addProduct2]=useMutation(CREATE_PRODUCT_MUT,{
      update:(cache,{data})=>{
        let nombre=`create${currentCategory.name}`
        path=[`getData${currentCategory.name}`]
        indexSize=1
        console.log("tituloeasdf",titulo)
        getPath(currentCategory.fields.filter(x=>
          x.dataType=="relationship"),titulo)
        console.log("path",path)
        ind=[]
        getIndexes()
        
        
        //console.log("resto",resto)
        //console.log("datanamecomp",data[nam],resto,{...data[nam],...resto})
        const us=updateState(categoryProducts,0,0,data[nombre],titulo)
        dispatch(setCategoryProducts(us))
        
      }
  })

  const [addProduct3]=useMutation(CREATE_PRODUCT_MUTATION_MTM,{
    update:(cache,{data})=>{
      console.log("ENTRO44",data,nameAlias,data[nameAlias])
      //setDataGroup([])
      
      let nombre=nameAlias
      /*let pivoteTable,otherPivoteTable,tablaoriginal
      path=[`getData${currentCategory.name}`]
      indexSize=1
      getPath(currentCategory.fields.filter(x=>x.dataType=="relationship"),
      titulo)
      if(path[path.length-2].startsWith("mtm")){
        pivoteTable=titulo
        otherPivoteTable=otrotitulo
        tablaoriginal=path[path.length-3]
      }else{
        pivoteTable=otrotitulo
        otherPivoteTable=titulo
        tablaoriginal=path[path.length-2]
        
      }
      nameGroupAlias=`getdatamtm${pivoteTable}${otherPivoteTable}`*/
      setAddRecGlobal(()=>({...data[nameAlias]}))
      //console.log("addRecGlobal",addRecGlobal)
      getGroupMtm({variables:{...fields}})

      /*path=[`getData${currentCategory.name}`]
      indexSize=1
      getPath(currentCategory.fields.filter(x=>x.dataType=="relationship"),
      pivoteTable)
      console.log("path2",data[nameAlias],pivoteTable,otherPivoteTable,tablaoriginal)
      ind=[]
      getIndexesInverse(data[nameAlias],pivoteTable,otherPivoteTable)
      console.log("ind2",ind)
      updateClusters(tablaoriginal,pivoteTable,otherPivoteTable,data[nameAlias])*/

    }
  })
  /*
  empieza original addproduct3
  const [addProduct3]=useMutation(CREATE_PRODUCT_MUTATION_MTM,{
    update:(cache,{data})=>{
      //const nam=`create${relMtMC.name}`
      setDataGroup([])
      console.log("ISMANYTOMANY",isManyToMany)
      let nombre
      
      nombre=nameAlias
      
      
      //const nameVar=`mtm${nRc.name}${pR.name}Id`
      //setResto(data[nameAlias])
      console.log("res1entro")
      //setEditFields(data[nameAlias])
      //getSearchOne({variables:{id:data[nam][nameVar]}})
      //setResultadoPrimero(data[nameAlias])
      
      path=[`getData${currentCategory.name}`]
      indexSize=1
      console.log("tituloeasdf",titulo)
      getPath(currentCategory.fields.filter(x=>
        x.dataType=="relationship"),titulo)
      console.log("path",path)
      ind=[]
      getIndexes()
      
      
      //console.log("resto",resto)
      //console.log("datanamecomp",data[nam],resto,{...data[nam],...resto})
      setResto(updateState(categoryProducts,0,0,data[nombre],titulo))
      console.log("var2",{...data[nameAlias]})
      getGroupMtm({variables:{...fields}})
      //console.log("ust",us)
      
    }
    
  })termina orignal addproduct3*/

  

  const buttonClick=()=>{
    console.log("fieldsadd",fields)
    //if(!isManyToMany){
      if(titulo.startsWith("mtm")){
        console.log("x1")
        addProduct3({
          variables:{
            ...fields
          }
        })
      }else{
        console.log("x2")
        addProduct2({
          variables:{
            ...fields
          }
        })
      }
    /*}else{
      addProduct3({
        variables:{
          ...fields,
          
        }
      })
    }*/
  
  }
  const dialogConfig={
    open:open,
    closeDialog:toggleDialog,
    headline:"Add Product of "+respCat.name
  }

  const displayFieldsConfig=()=>{
    if(!titulo.startsWith("mtm")) { 
      console.log("no es mtm")
    
      return {
        category:respCat,
        structure:respCat.fields,
        fields,
        setFields,
        parentId,
        isManyToMany,
        parentCatId
        
      }
    }
    else{
      console.log("es mtm")
      return {
        category:nC,
        structure:mtmStr,
        fields,
        setFields,
        parentId,
        isManyToMany,
        parentCatId,
        categoryNameRelDestiny:respCat.name
      }
    }
  }

  const formButtonConfig={
    onClick:()=>buttonClick()
  }

  return (
    <Dialog 
    {...dialogConfig}>
      
      <DisplayFields
        {...displayFieldsConfig()}    
      />
      
      <FormButton 
      {...formButtonConfig}>
        Create Product
      </FormButton>
    </Dialog>
    )
  }

export default NewProduct
