import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import addMtmProductMutation from '../../gql/addMtmProductMutation'
import addProductMutation from '../../gql/addProductMutation'
import getdatamtmgroup from '../../gql/getdatamtmgroup'
import getDummyMut from '../../gql/getDummyMut'
import getonedatamtm from '../../gql/getonedatamtm'
import simpleUpdateState from '../../gql/updatestatemtm/NewProduct/simpleUpdateState'
import updateState from '../../gql/updatestatemtm/NewProduct/updateState'
import getIndexes from '../../gql/updatestatemtm/utils/getIndexes'
import getIndexesInverse from '../../gql/updatestatemtm/utils/getIndexesInverse'
import {resultPath} from '../../gql/updatestatemtm/utils/getPath'
import getPath from '../../gql/updatestatemtm/utils/getPath'
import { addProduct, setCategoryProducts } from '../../redux/category/actions'
import Dialog from '../Dialog'
import DisplayFields from '../DisplayFields'
import FormButton from '../Forms/FormButton'


/*const getDummyMut=(cat)=>{
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
    }else if(argsf[f].declaredType=="string" 
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
        let na=`otm${category.name}${oc[0].name}`
        campos.push(`${na}{id}`)
      }else if(argsf[f].relationship=="manytomany"){
        let oc=categories.filter(c=>c.id==argsf[f].relationCategory)
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
        let na=`${cr.name}`
        campos.push(`${na}{id}`)
      }else if(cr.relationship=="manytomany"){
        let oc=categories.filter(c=>c.id==cr.relationCategory)[0]
        let na=cr.name
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
    }else if(argsf[f].declaredType=="string" 
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
      if(argsf[f].declaredType=="number")
        args2.push(`${argsf[f].name}:$${argsf[f].name}`)
    }else if(argsf[f].declaredType=="number"){
      if(ya[argsf[f].name]!==true){
        args2.push(`${argsf[f].name}:$${argsf[f].name}`)
      }
    }else if(argsf[f].dataType!=="relationship"){
      args2.push(`${argsf[f].name}:$${argsf[f].name}`)
    }
  }
  args2.join(", ")
  let campos=[]
  for(let f in argsf){
    if(argsf[f].dataType=="relationship"){
      if(argsf[f].relationship=="onetomany"){
        let oc=categories.filter(c=>c.id==argsf[f].relationCategory)
        let na=`otm${category.name}${oc[0].name}`
        campos.push(`${na}{id}`)
      }else if(argsf[f].relationship=="manytomany"){
        let oc=categories.filter(c=>c.id==argsf[f].relationCategory)
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
        let na=`${cr.name}`
        campos.push(`${na}{id}`)
      }else if(cr.relationship=="manytomany"){
        let oc=categories.filter(c=>c.id==cr.relationCategory)
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
  return gql`${query}`
}

const addProductMutation=(category,categories,mtm)=>{
  let argsf=category.fields
  let args1=[]
  let ya={}
  for(let f in argsf){
    if(argsf[f].dataType=="queryCategory"){
      args1.push(`$${argsf[f].name}GlobalCatQuery:Int`)
      args1.push(`$${argsf[f].name}FinalCatQuery:Int`)
      args1.push(`$${argsf[f].name}ProductQuery:Int`)
      
    }else if(argsf[f].declaredType=="number"){
      //if(ya[argsf[f].name]!==undefined && ya[argsf[f].name]!==true){
        args1.push(`$${argsf[f].name}:Int`)
      //}
    }else if(argsf[f].declaredType=="string" 
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
      
    }else if(argsf[f].declaredType=="number"){
      
        args2.push(`${argsf[f].name}:$${argsf[f].name}`)
      
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
        let na=`otm${category.name}${oc[0].name}`
        campos.push(`${na}{id}`)
      }else if(argsf[f].relationship=="manytomany"){
        let oc=categories.filter(c=>c.id==argsf[f].relationCategory)
        let na=`mtm${oc[0].name}${category.name}`
        campos.push(`${na}{id}`)
      }
    }else if(argsf[f].dataType=="queryCategory"){
      campos.push(`${argsf[f].name}GlobalCatQuery`)
      campos.push(`${argsf[f].name}FinalCatQuery`)
      campos.push(`${argsf[f].name}ProductQuery`)      
      
    }else if(argsf[f].declaredType=="number"){
      
        campos.push(`${argsf[f].name}`)
      
    }else
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
  console.log("queryaddmut",query)
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
    }else if(argsf[f].declaredType=="string" 
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
        let na=`otm${category.name}${oc[0].name}`        
        campos.push(`${na}{id}`)      
      }else if(argsf[f].relationship=="manytomany"){
        let oc=categories.filter(c=>c.id==argsf[f].relationCategory)[0]
        let na=argsf[f].name
        let ncent=oc.fields(o=>o.name)
        let nmtm=category.fields(c=>c.name)
        ncent=[...ncent,...nmtm]
        ncent.push("id")
        ncent.join("\n")
        campos.push(`${na}{${ncent}}`)
      
      }
    }else if(argsf[f].dataType=="queryCategory" && argsf[f].declaredType!=="number"){
      campos.push(`${argsf[f].name}GlobalCatQuery`)
      campos.push(`${argsf[f].name}FinalCatQuery`)
      campos.push(`${argsf[f].name}ProductQuery`)
      ya={[argsf[f].name]:true}

    }else if(argsf[f].declaredType=="number"){
      if(ya[argsf[f].name]!==true){
        campos.push(`${argsf[f].name}`)
      }
    }else
      campos.push(argsf[f].name)
  }
  crec.fields.forEach(cr=>{
    if(cr.dataType=="relationship"){
      if(cr.relationship=="onetomany"){
        let oc=categories.filter(c=>c.id==cr.relationCategory)
        let na=`${cr.name}`
        campos.push(`${na}{id}`)
      }else if(cr.relationship=="manytomany"){
        let oc=categories.filter(c=>c.id==cr.relationCategory)[0]        
        let na=cr.name        
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
  return gql`${query}`
}*/


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
  const [editFields,setEditFields]=useState({})
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
      nRc=categories.filter(x=>x.id==relationCategory)[0]
      if(pR.name<nRc.name)
        nn=`${pR.name}_${nRc.name}`
      else
        nn=`${nRc.name}_${pR.name}`
      setOtroTitulo(`mtm${pR.name}${nRc.name}`)
      relMtMC=categories.filter(x=>x.name==nn)[0]
      nC=categories.filter(x=>x.name==nn)[0]
      setMtmStr(nC.fields)
    }else{
      const xfields=respCat.fields.filter(x=>
        x.relationship=="otmdestiny"
      )
      const nf={}
      xfields.forEach(f=>{
        nf[f.name]=parentId
      })
      setFields({...fields,...nf})
    }
  },[])

  /*const simpleUpdateState=(prods,indexPartials=0,indexArray=0,recToAdd,tit)=>{
    indexPartials=parseInt(indexPartials)
    indexArray=parseInt(indexArray)
    console.log("argsbien",recToAdd,tit)
    let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
    let cp 
    partials=path
    ti=ind    
    if(!Array.isArray(prods)){
      cp={...prods}
      let ui
      if(partials[indexPartials]==tit){
        return {...cp,
          [partials[indexPartials]]:[...cp[partials[indexPartials]],recToAdd]
        }
            
      }else{          
        return {...cp,[partials[indexPartials]]:simpleUpdateState(cp[partials[indexPartials]],indexPartials+1,indexArray,recToAdd,tit)}
      }
    }else if(Array.isArray(prods)){
      cp=[...prods]
      let nv
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
          return simpleUpdateState(cp[ti[indexArray]],indexPartials,indexArray+1,recToAdd,tit)
        }
        return y
      })
    }
  }*/

  /*const updateState=(prods,indexPartials=0,indexArray=0,to,pt,st,rec,addRecord,dg,firstTableRecord)=>{
    indexPartials=parseInt(indexPartials)
    indexArray=parseInt(indexArray)
    let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
    let cp 
    partials=path
    ti=ind    
    if(!Array.isArray(prods)){
      cp={...prods}
      let ui
      if(partials[indexPartials]==to){
        let ni
        let nv      
        nv=rec["id"]
        return {...cp,
          [partials[indexPartials]]:cp[partials[indexPartials]].map(x=>{              
            let n=`${pt}Id`// en el ejemplo mtmgruposalumnosid
            let m=`${st}Id`//en el ejemplo metmalumnosgruposid
            let newR={}
            if(x["id"]==rec[m]){
              if(rec[m]==addRecord[m] && rec[n]==addRecord[n]){
                if(titulo!==st){
                  if(existe==false){
                    newR={...x,[pt]:[...x[pt],{...addRecord}]}
                    existe=true
                  }else
                    newR=x
                }else if(titulo==st){                
                  newR={...x,[pt]:[...x[pt],{...firstTableRecord,[st]:dg}]}
                }              
              }else{                
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
        return {...cp,[partials[indexPartials]]:updateState(cp[partials[indexPartials]],indexPartials+1,indexArray,to,pt,st,rec,addRecord,dg,firstTableRecord)}
      }
    }else if(Array.isArray(prods)){
      cp=[...prods]
      let nv
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
  }*/

  let ind
  let path
  /*const getIndexesInverse=(addRecord,pivoteTable,otherPivoteTable)=>{
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
  }*/

 /*const getIndexes=()=>{
    for(let p in path){
      let curInd
      curInd=tableIndexes[path[p]]
      ind.push(curInd)
    }
    return ind
  }*/

  //let indexSize=1
  
  /*const getPath=(fields,tit)=>{
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
  }*/

  /*const checkHasSons=(prods,indexPartials=0,indexArray=0,tit)=>{
    indexPartials=parseInt(indexPartials)
    indexArray=parseInt(indexArray)
    let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
    let cp
    partials=path
    ti=ind
    if(!Array.isArray(prods)){
      cp={...prods}
      if(partials[indexPartials]==tit){
        return cp[partials[indexPartials]]
      }else{
        return checkHasSons(cp[partials[indexPartials]],indexPartials+1,indexArray,tit)

      }
    }else if(Array.isArray(prods)){
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
  }*/

  const updateClusters=(tablaoriginal,pivoteTable,otherPivoteTable,dg,arg,ftadd,np)=>{
    let currentData={...categoryProducts}
    for(let x in dg){
      ind=[]
      let ni=getIndexesInverse(dg[x],pivoteTable,otherPivoteTable,np,tableIndexes)
      currentData=updateState(currentData,0,0,tablaoriginal,otherPivoteTable,pivoteTable,dg[x],arg,dg,ftadd,np,ni,titulo)
    }
    existe=false
    dispatch(setCategoryProducts(currentData))
  }

  let CREATE_PRODUCT_MUT=""
  let CREATE_PRODUCT_MUTATION_MTM=""
  let nameGroupAlias
  
  pR=categories.filter(x=>x.id==parentRelation)[0]
  
  let GET_ONE_DATA_MTM
  let GET_DATA_MTM_GROUP
  let pivoteTable,otherPivoteTable,tablaoriginal
  
  if(titulo.startsWith("mtm")){
    path=[`getData${currentCategory.name}`]
    //indexSize=1
    const c=resultPath(currentCategory.fields.filter(x=>x.dataType=="relationship"),
    titulo,categories,path,true)
    console.log("c22",c)
    if(c[c.length-2].startsWith("mtm")){
      pivoteTable=titulo
      otherPivoteTable=otrotitulo
      tablaoriginal=path[path.length-3]
    }else{
      pivoteTable=otrotitulo
      otherPivoteTable=titulo
      tablaoriginal=path[path.length-2]
    }
    nRc=categories.filter(x=>x.id==relationCategory)[0]
    if(pR?.name<nRc?.name)
      nn=`${pR.name}_${nRc.name}`
    else
      nn=`${nRc.name}_${pR.name}`
    relMtMC=categories.filter(x=>x.name==nn)[0]
    nC=categories.filter(x=>x.name==nn)[0]
    if(pivoteTable==titulo){//estoy insertando en la segunda tabla muchos a muchos
      nameAlias=`createdatamtm${nRc.name}${pR.name}`
      nameAliasOneMtm=`getonedatamtm${otherPivoteTable.substr(3)}`
      nameGroupAlias=`getdatamtm${pivoteTable.substr(3)}`
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

  const [getGroupMtm]=useMutation(GET_DATA_MTM_GROUP,{
    update:(cache,{data})=>{
      setGroupRecsGlobal(()=>data[nameGroupAlias])
      getOneMtm({variables:fields})
    }
  })

  const [getOneMtm]=useMutation(GET_ONE_DATA_MTM,{
    update:(cache,{data})=>{
      let pivoteTable,otherPivoteTable,tablaoriginal
      path=[`getData${currentCategory.name}`]
      //indexSize=1
      const c1=resultPath(currentCategory.fields.filter(x=>x.dataType=="relationship"),
      titulo,categories,path,true)
      console.log("c1",c1)
      if(c1[c1.length-2].startsWith("mtm")){
        pivoteTable=titulo
        otherPivoteTable=otrotitulo
        tablaoriginal=c1[c1.length-3]
      }else{
        pivoteTable=otrotitulo
        otherPivoteTable=titulo
        tablaoriginal=c1[c1.length-2]
        
      }
      path=[`getData${currentCategory.name}`]
      //indexSize=1
      let np=resultPath(currentCategory.fields.filter(x=>x.dataType=="relationship"),
      pivoteTable,categories,path,true)
      console.log("npb",np)
      updateClusters(tablaoriginal,pivoteTable,otherPivoteTable,groupRecsGlobal,addRecGlobal,data[nameAliasOneMtm],np)
    }
  })  
  
  
  const [addProduct2]=useMutation(CREATE_PRODUCT_MUT,{
    update:(cache,{data})=>{
      console.log("data45",titulo)
      let nombre=`create${respCat.name}`
      path=[`getData${currentCategory.name}`]
      console.log("entro aquiii")
      const c=resultPath(currentCategory.fields.filter(x=>
        x.dataType=="relationship"),titulo,categories,path,true)  
      console.log("c33",c)
      const i=getIndexes(tableIndexes,c)
      const us=simpleUpdateState(categoryProducts,0,0,data[nombre],titulo,c,i)
      dispatch(setCategoryProducts(us))
    }
  })

  const [addProduct3]=useMutation(CREATE_PRODUCT_MUTATION_MTM,{
    update:(cache,{data})=>{
      setAddRecGlobal(()=>({...data[nameAlias]}))
      getGroupMtm({variables:{...fields}})
    }
  })
  
  const buttonClick=()=>{
    if(titulo.startsWith("mtm")){
      console.log("x1")
      addProduct3({
        variables:{
          ...fields
        }
      })
    }else{
      console.log("entro46")
      addProduct2({
        variables:{
          ...fields
        }
      })
    }
  }

  const dialogConfig={
    open:open,
    closeDialog:toggleDialog,
    headline:"Add Product of "+respCat.name
  }

  const displayFieldsConfig=()=>{
    if(!titulo.startsWith("mtm")) {   
      return {
        category:respCat,
        structure:respCat.fields,
        fields,
        setFields,
        parentId,
        isManyToMany,
        parentCatId
      }
    }else{
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
