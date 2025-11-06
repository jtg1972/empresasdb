import { gql, useMutation } from '@apollo/client'
import { argsToArgsConfig } from 'graphql/type/definition'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getdatamtmgroup from '../../gql/getdatamtmgroup'
import getDummyMut from '../../gql/getDummyMut'
import getonedatamtm from '../../gql/getonedatamtm'
import mutationEditProduct from '../../gql/mutationEditProduct'
import mutationEditProductManyToMany from '../../gql/mutationEditProductManyToMany'
//import simpleUpdateState from '../../gql/updatestatemtm/EditProduct/simpleUpdateState'
import updateState from '../../gql/updatestatemtm/EditProduct/updateState'

import { resultPath } from '../../gql/updatestatemtm/utils/getPath'
import getIndexes from '../../gql/updatestatemtm/utils/getIndexes'

import { editProduct, setCategoryProducts } from '../../redux/category/actions'
import Dialog from '../Dialog'
import DisplayFields from '../DisplayFields'
import FormButton from '../Forms/FormButton'
import getIndexesInverse from '../../gql/updatestatemtm/utils/getIndexesInverse'
import {typesOtm} from '../../redux/otmupdate/types'
import types from '../../redux/mtmupdate/types'
/*const mutationEditProduct=(category)=>{
  let args=[]
  let args1=[]
  let argsf=category.fields
  for(let f in argsf){
    //console.log("ffff",f)
    if(argsf[f].declaredType=="number"){
      args.push(`$${argsf[f].name}:Int`)
    }else if(argsf[f].dataType=="queryCategory"){
      args.push(`$${argsf[f].name}GlobalCatQuery:Int`)
      args.push(`$${argsf[f].name}FinalCatQuery:Int`)
      args.push(`$${argsf[f].name}ProductQuery:Int`)
    }else if(argsf[f].declaredType=="string"){
      args.push(`$${argsf[f].name}:String`)
    }else if(argsf[f].declaredType=="date"){
      args.push(`$${argsf[f].name}:String`)
    
    }
  }
  args.unshift("$id:Int")
  args=args.join(", ")
  for(let f in argsf){
      if(argsf[f].dataType!=="relationship"){
        if(argsf[f].dataType=="queryCategory"){
          args1.push(`${argsf[f].name}GlobalCatQuery:$${argsf[f].name}GlobalCatQuery`)
          args1.push(`${argsf[f].name}FinalCatQuery:$${argsf[f].name}FinalCatQuery`)
          args1.push(`${argsf[f].name}ProductQuery:$${argsf[f].name}ProductQuery`)
        }else{
          args1.push(`${argsf[f].name}:$${argsf[f].name}`)
        }
      }
  }
  let campos=[]
  for(let f in argsf){
    if(argsf[f].dataType!=="relationship"){
      if(argsf[f].dataType=="queryCategory"){
        campos.push(`${argsf[f].name}GlobalCatQuery`)
        campos.push(`${argsf[f].name}FinalCatQuery`)
        campos.push(`${argsf[f].name}ProductQuery`)
      }else{
        campos.push(argsf[f].name)
      }
    }
  }
  //console.log("camposmi",campos)
  campos.unshift("id")
  campos=campos.join("\n")
  args1.unshift("id:$id")
  args1=args1.join(", ")
  let query=`
    mutation EditProducto(${args}){
      edit${category.name}(${args1}){
        ${campos}
      }
    }
  `
  console.log("querynormal",query)
  query=gql`${query}`
  return query
}

const mutationEditProductManyToMany=(category,keyFields)=>{
  let args=[]
  let args1=[]
  let argsf=category.fields
  for(let f in argsf){
    //console.log("ffff",f)
    if(argsf[f].declaredType=="number"){
      args.push(`$${argsf[f].name}:Int`)
    }else if(argsf[f].dataType=="queryCategory"){
      args.push(`$${argsf[f].name}GlobalCatQuery:Int`)
      args.push(`$${argsf[f].name}FinalCatQuery:Int`)
      args.push(`$${argsf[f].name}ProductQuery:Int`)
    }else if(argsf[f].declaredType=="string"){
      args.push(`$${argsf[f].name}:String`)
    }else if(argsf[f].declaredType=="date"){
      args.push(`$${argsf[f].name}:String`)
    
    }
  }
  //args.unshift("$id:Int")
  for(let k in keyFields){
    args.push(`$${k}:Int`)
  }
  
  args=args.join(", ")
  for(let f in argsf){
      if(argsf[f].dataType!=="relationship"){
        if(argsf[f].dataType=="queryCategory"){
          args1.push(`${argsf[f].name}GlobalCatQuery:$${argsf[f].name}GlobalCatQuery`)
          args1.push(`${argsf[f].name}FinalCatQuery:$${argsf[f].name}FinalCatQuery`)
          args1.push(`${argsf[f].name}ProductQuery:$${argsf[f].name}ProductQuery`)
        }else{
          args1.push(`${argsf[f].name}:$${argsf[f].name}`)
        }
      }
  }
  for(let k in keyFields){
    args1.push(`${k}:$${k}`)
  }
  let campos=[]
  for(let f in argsf){
    if(argsf[f].dataType!=="relationship"){
      if(argsf[f].dataType=="queryCategory"){
        campos.push(`${argsf[f].name}GlobalCatQuery`)
        campos.push(`${argsf[f].name}FinalCatQuery`)
        campos.push(`${argsf[f].name}ProductQuery`)
      }else{
        campos.push(argsf[f].name)
      }
    }
  }
  //console.log("camposmi",campos)
  //campos.unshift("id")
  campos=campos.join("\n")
  //args1.unshift("id:$id")
  args1=args1.join(", ")
  let query=`
    mutation EditProducto(${args}){
      edit${category.name}(${args1}){
        ${campos}
      }
    }
  `
  console.log("querymtm",query)
  query=gql`${query}`
  return query
}*/


const mapToState=({categories})=>({
  currentCategory:categories.currentCategory,
  categoryProducts:categories.categoryProducts,
  categories:categories.categories
})

const EditProduct = ({
  open,
  toggleDialog,
  editFields,
  setEditFields,
  curCat,
  tableIndexes,
  partials,
  titulo,
  keyFields,
  isManyToMany,
  otrotitulo,
  
  setTableIndexes,
  indexInTable,
  updateCategories,
  updateCategoriesIds,
  parentFields,
  
}) => {
  //console.log("CURCAT",curCat)
  const{categoryProducts,currentCategory,categories}=useSelector(mapToState)
  const [addRecGlobal,setAddRecGlobal]=useState({})
  const [groupRecsGlobal,setGroupRecsGlobal]=useState([])

  
  //console.log("editFieldseditprod",editFields)
  //console.log("tituloh",titulo,otrotitulo)
  const dispatch=useDispatch()
  //const {currentCategory}=useSelector(mapToState)
  //console.log("curcattt",currentCategory)
  /*useEffect(()=>{
    console.log("editFeilds",editFields)
    fields=editFields
  },[])
  console.log("fieldsnuevo",fields)*/
  /*const updateState=(prods,indexPartials=0,indexArray=0,tit,idKey=editFields.id,ef=editFields)=>{
    //console.log("otrotituloind",tit,ind) 
    indexPartials=parseInt(indexPartials)
      indexArray=parseInt(indexArray)
      let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
      //let ti=path
      //let partials=ind
      //console.log("tipartials",ti,partials)
      let cp 
        partials=path
        ti=ind

     
      //console.log("editfieldsus",ef)
      if(!Array.isArray(prods)){
        cp={...prods}
        //console.log("no arreglo")
        //console.log("prods partlength partials",prods,partials.length,partials)
        let ui
        //console.log("pip",partials[indexPartials],cp[partials[indexPartials]])
        //console.log("params",cp[partials[indexPartials]],indexPartials+1,indexArray)
        //console.log("se modifica campo",partials[indexPartials])
        //if((indexPartials+1)==partials.length){
        //console.log("importante",partials[indexPartials],tit)
        if(partials[indexPartials]==tit){
          //console.log("entro final")
          
          //console.log("ui",partials[indexPartials],cp[partials[indexPartials]])
          let ni
          let nv
          if(tit!==titulo){
            ni=`${tit}Id`
            nv=editFields[ni]
            //console.log("ni",ni,nv)
          } else{
            nv=editFields["id"]
          }
          return {
            ...cp,
            [partials[indexPartials]]:
              cp[partials[indexPartials]].map(x=>{
                
                if(x.id==nv){// && x[otraClave]==l){//editFields.id){

                  //console.log("true ef",editFields,x)
                  let nef={}
                  for(let u in editFields){
                    if(fieldsToDisplay.includes(u)){
                      //console.log("cic1",u)
                      nef[u]=editFields[u]
                    }
                  }
                  return {...x,...nef}
                }else{
                      //console.log("false")
                  return x
                }
              }
            )
          }
        }else{
          //console.log("entro no final")
          return {...cp,[partials[indexPartials]]:updateState(cp[partials[indexPartials]],indexPartials+1,indexArray,tit,idKey,ef)}
        }
      
      } else if(Array.isArray(prods)){
        cp=[...prods]
        //console.log("arraglo",indexArray,ti.length,ti,ti[indexArray],cp)
        //console.log("deliddd",deleteId)
        //console.log("prods",prods)
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
        //console.log("new ti",ti,nv)
      
          //console.log("partarr",cp[ti[indexArray]])
        //console.log("paramsarr",cp[ti[indexArray]],indexPartials,indexArray+1,tit)
                  
        
        return cp.map((y,index)=>{
          if(index==ti[indexArray]){
            return updateState(cp[ti[indexArray]],indexPartials,indexArray+1,tit,idKey,ef)
          }
          return y
        })
      
      }
    
  }
  let ind
  let path

  /*const getIndexes=(title)=>{
    for(let p in path){
      //console.log("ti pathp",tableIndexes,path[p])
      let curInd
      curInd=tableIndexes[path[p]]
      ind.push(curInd)
      
    }
  
  }

  const getIndexesInverse=(editRecord,pivoteTable,otherPivoteTable)=>{
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
          ind.push(`-${editRecord[uy]}`)
          let n=`${otherPivoteTable}Id`
          ind.push(`-${editRecord[n]}`)
          ind.push(`-${editRecord[uy]}`)
        }
      }
    }
  }*/

 /*empieza getIndexesInverse antiguo
 const getIndexesInverse=(titleCat,fi)=>{
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
            const uy=`${otrotitulo}Id`
            ind.push(`-${editFields[uy]}`)
            let n=`${titulo}Id`
            ind.push(`-${editFields[n]}`)
        
            const nn=`${otrotitulo}Id`
            ind.push(`-${editFields[nn]}`)
      
        
          }else{
            //ind=ind.splice(0,ind.length-1)
            const pr=`${titulo}Id`
            ind.push(`-${editFields[pr]}`)
            const n=`${otrotitulo}Id`

            ind.push(`-${editFields[n]}`)
            
            //const nn=`${otrotitulo}Id`
            //ind.push(`-${fi[nn]}`)
            
          }
        }
      }
    }
  }
  termina getIndexesInverse antiguo*/

  //let indexSize=1
  
  /*const getPath=(fields,title)=>{
    //console.log("titlepath",title)
    if(title.startsWith('getData')){
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
        if(fields[f].name!==title){
          const relCatId=fields[f].relationCategory
          const curCat=categories.filter(x=>x.id==relCatId)[0]
          
          
          const r=getPath(curCat.fields.filter(x=>x.dataType=="relationship"),title)
          if(r==true)
              break
        }else{
          return true
        }
      }
    }else
      return

  }*/




    
    
    
  const [fieldsToDisplay,setFieldsToDisplay]=useState([])
   
     //console.log("curCat",curCat)
     useEffect(()=>{
       if(curCat!==undefined){
         setFieldsToDisplay(curCat?.fields?.filter(m=>{
            return !m.name.startsWith("mtm")
        }).map(x=>x.name))
      }
     },[curCat])

  let GET_ONE_DATA_MTM
  let GET_DATA_MTM_GROUP
  let pivoteTable,otherPivoteTable,tablaoriginal
  let pR,nRc,nn,relMtMC,nC
  let nameAliasOneMtm
  let nameGroupAlias
  let existe=false
  if(titulo.startsWith("mtm")){
    let sp=curCat.name.split("_")
    let n1=`${sp[0]}${sp[1]}`
    if(titulo==`mtm${n1}`){
      pR=categories.filter(x=>x.name==sp[1])[0]
      nRc=categories.filter(x=>x.name==sp[0])[0]
    }else{
      pR=categories.filter(x=>x.name==sp[0])[0]
      nRc=categories.filter(x=>x.name==sp[1])[0]
    }
    if(pR?.name<nRc?.name)
      nn=`${pR.name}_${nRc.name}`
    else
      nn=`${nRc.name}_${pR.name}`
    relMtMC=categories.filter(x=>x.name==nn)[0]
    nC=categories.filter(x=>x.name==nn)[0]
    
    //console.log("prnrc",pR,nRc)
    //const path=[`getData${currentCategory.name}`]
    //indexSize=1
    

    /*const p=resultPath(currentCategory.fields.filter(x=>
      x.dataType=="relationship"
    ),titulo,categories,path,true)
    if(p[p.length-2].startsWith("mtm")){
      pivoteTable=titulo
      otherPivoteTable=otrotitulo
      tablaoriginal=p[p.length-3]
    }else{
      pivoteTable=otrotitulo
      otherPivoteTable=titulo
      tablaoriginal=p[p.length-2]
    }
    
    nameAliasOneMtm=`getonedata${otherPivoteTable}`
    nameGroupAlias=`getdata${pivoteTable}`
    if(pivoteTable==titulo){
      GET_ONE_DATA_MTM=getonedatamtm(relMtMC,categories,nameAliasOneMtm,pR)
      GET_DATA_MTM_GROUP=getdatamtmgroup(relMtMC,categories,nameGroupAlias,nRc)
      
    }else{
      GET_ONE_DATA_MTM=getonedatamtm(relMtMC,categories,nameAliasOneMtm,nRc)
      GET_DATA_MTM_GROUP=getdatamtmgroup(relMtMC,categories,nameGroupAlias,pR)
      
    }
    
  }else{
    GET_ONE_DATA_MTM=getDummyMut(categories.filter(c=>c.name=="Alumnos")[0])
    GET_DATA_MTM_GROUP=getDummyMut(categories.filter(c=>c.name=="Alumnos")[0])
  }
   
  console.log("ismanytomany",isManyToMany)*/
  }
  let MUTATION_EDIT_PRODUCT=""
  let MUTATION_EDIT_PRODUCT_MTM=""
  
  if(!isManyToMany){
    MUTATION_EDIT_PRODUCT=mutationEditProduct(curCat,categories)
    MUTATION_EDIT_PRODUCT_MTM=getDummyMut(categories.filter(c=>c.name=="Alumnos")[0])
  }else{
    MUTATION_EDIT_PRODUCT=getDummyMut(categories.filter(c=>c.name=="Alumnos")[0])
    MUTATION_EDIT_PRODUCT_MTM=mutationEditProductManyToMany(curCat,keyFields,categories,`editdatamtm${titulo.substr(3)}`,nRc,pR)
  } 
  let nameVar1=""
  let nameVar2=""
  let valueVar1=0
  let valueVar2=0
  const updateClusters=(c1,i,reg)=>{
    nameVar1=Object.keys(keyFields)[0]
    nameVar2=Object.keys(keyFields)[1]
    valueVar1=keyFields[nameVar1]
    valueVar2=keyFields[nameVar2]
    console.log("keyfields22",keyFields,reg.original,reg.copy,`${reg.copy?.["key"]}Id`,
    reg.original[`${reg.copy?.["key"]}Id`],
    Object.keys(keyFields)[0],
    keyFields[nameVar1],
    keyFields
    )
    let id1=reg.original[`${reg.copy?.["key"]}Id`]
    let id2=reg.original[`${reg.original?.["key"]}Id`]
    /*dispatch({
      type:types.ADD_INDEXES_TO_MTMRECORD,
      payload:{
        mtm:titulo,
        id:valueVar1,//[copy[`${original.key}Id`],
        action:"EDIT",
        route:[],
        nameVar1,
        valueVar1,
        nameVar2,
        valueVar2,
        row:{
          original:reg.original,
          copy:reg.copy
        }
      }
    })
    console.log("ioioio",`${reg.original?.["key"]}Id`,reg.copy)
    dispatch({
      type:types.ADD_INDEXES_TO_MTMRECORD,
      payload:{
        mtm:`mtm${pR.name}${nRc.name}`,
        id:valueVar2,
        action:"EDIT",
        route:[],
        nameVar1,
        valueVar1,
        nameVar2,
        valueVar2,
        row:{
          original:reg.copy,
          copy:reg.original
        }
      }
    })*/
    /*let cp=categoryProducts
    let st=cp[c1[0]][i[0]]
    for(let u1=1;u1<c1.length;u1++){
      console.log("stverif",st,c1,i,c1[u1],nameVar1,nameVar2,valueVar1,valueVar2)
      if(st[c1[u1]]){
        if(i[u1]!=undefined) 
          st=st[c1[u1]][i[u1]]
        else{
          nameVar1=Object.keys(keyFields)[0]
          valueVar1=keyFields[nameVar1]
          nameVar2=Object.keys(keyFields)[1]
          valueVar2=keyFields[nameVar2]
          console.log("dispvars22",nameVar1,valueVar1,nameVar2,valueVar2)
          st[c1[u1]]=st[c1[u1]].map(x=>{
            if(x?.["original"][nameVar1]!=valueVar1 
            || x?.["original"][nameVar2]!=valueVar2)
              return x
            else 
              return reg

          })
        }
        
      }
    }
    console.log("entro clusters",c1,i)
    return cp*/
  
  
}

  /*const updateClusters=(tablaoriginal,pivoteTable,otherPivoteTable,dg,arg,ftadd,np)=>{
    let currentData={...categoryProducts}
    console.log("dg1",dg)
    for(let x in dg){
      console.log("curdate",currentData)
      let ni=getIndexesInverse(dg[x],pivoteTable,otherPivoteTable,np,tableIndexes)
      currentData=updateState(currentData,0,0,tablaoriginal,otherPivoteTable,pivoteTable,dg[x],arg,dg,ftadd,np,ni,titulo)
    }
    existe=false
    dispatch(setCategoryProducts(currentData))
  }*/
  
  /*const [getOneMtm]=useMutation(GET_ONE_DATA_MTM,{
    update:(cache,{data})=>{
      let pivoteTable,otherPivoteTable,tablaoriginal
      let path=[`getData${currentCategory.name}`]
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

  const [getGroupMtm]=useMutation(GET_DATA_MTM_GROUP,{
    update:(cache,{data})=>{
      setGroupRecsGlobal(()=>data[nameGroupAlias])
      getOneMtm({variables:keyFields})
    }
  })*/
  const rootCat=(tit)=>{
    let k=Object.keys(updateCategories)
    for(let i=0;i<k.length;i++){
      let resp=updateCategories[k[i]]
      
      for(let j=0;j<resp.length;j++){
        if(resp[j]==tit)
          return k[i]
      }
    }
    return null
  }

  const [editProduct2]=useMutation(MUTATION_EDIT_PRODUCT_MTM,{
    update:(cache,{data})=>{
      const name=`editdatamtm${titulo.substr(3)}`
     console.log("resu",data[name])
      let path=[`getData${currentCategory.name}`]
      let root=rootCat(titulo)
      console.log("ucs",root,titulo,curCat.name,updateCategories)
      let otherRoot=rootCat(otrotitulo)
      //updateCategories[root].forEach(i=>{
        // console.log("ucs",updateCategoriesIds,curCat.name,updateCategoriesIds[i],i)
        //console.log("paramsucs",i,updateCategoriesIds[i],data[name])
         dispatch({
           type:typesOtm.ADD_INDEXES_TO_OTMRECORD,
           payload:{
             category:titulo,
             id:"edit",
             fieldId:`${titulo}Id`,
             row:data[name],
             action:"EDIT",
             //childFields:parentFields?.[i]?.childFields
           }
         })
     //})
       //console.log("otherRoot",otherRoot,otrotitulo,data[name][otrotitulo])
      // updateCategories[otherRoot].forEach(i=>{
        // console.log("ucs",updateCategoriesIds,curCat.name,updateCategoriesIds[i],i)
        //console.log("paramsucs",i,updateCategoriesIds[i],data[name])
         dispatch({
           type:typesOtm.ADD_INDEXES_TO_OTMRECORD,
           payload:{
             category:otrotitulo,
             id:"edit",
             fieldId:`${titulo}Id`,
             row:{...data[name],id:data[name][`${otrotitulo}Id`]},
             action:"EDIT",
             //childFields:parentFields?.[i]?.parFields
           }
         })
       //})
      /*dispatch({
        type:typesOtm.ADD_INDEXES_TO_OTMRECORD,
        payload:{
          category:titulo,
          id:data[name][`${otrotitulo}Id`],
          fieldId:`${otrotitulo}Id`,
          row:data[name],
          action:"EDIT"
        }
      })
      dispatch({
        type:typesOtm.ADD_INDEXES_TO_OTMRECORD,
        payload:{
          category:otrotitulo,
          id:data[name][`${titulo}Id`],
          fieldId:`${titulo}Id`,
          row:{...data[name],id:data[name][`${otrotitulo}Id`]},
          action:"EDIT"
        }
      })*/

     /*const c=resultPath(currentCategory.fields.filter(x=>
        x.dataType=="relationship"),titulo,categories,
        path,true)
      const i=getIndexes(tableIndexes,c)
      console.log("path1",c,i)*/
      /*if(c[c.length-2].startsWith("mtm")){
        pivoteTable=titulo
        otherPivoteTable=otrotitulo
        tablaoriginal=c[c.length-3]
      }else{
        pivoteTable=otrotitulo
        otherPivoteTable=titulo
        tablaoriginal=c[c.length-2]
      }*/
      //path=[`getData${currentCategory.name}`]
      //indexSize=1
      /*const y=resultPath(currentCategory.fields.filter(x=>
        x.dataType=="relationship"),pivoteTable,
        categories,path,true)
      const i=getIndexesInverse(deleteRecord,pivoteTable,otherPivoteTable,y,tableIndexes)
      console.log("xxx",deleteRecord,y,i)*/

  //let r1=updateClusters(c,i,data[name])
      //esto si dispatch(setCategoryProducts(r1))

      //setAddRecGlobal(()=>data[name])
      //getGroupMtm({variables:keyFields})

    }
  })
  
  const simpleUpdateStateHere=(cp1,reg,titulo,c1,i)=>{
    let cp=cp1
    let st
    for(let po=0;po<c1.length;po++){
      if(po>=c1.length-1)
        i[po]=undefined
    }
   // console.log("poio",c1,i)
   // console.log("titio",titulo)
    if(titulo.startsWith("getData")){
      cp[titulo]=cp[titulo].map(x=>{
        console.log("xverio",x.id,reg.id)
        if(x.id==reg.id)
          return {...x,...reg}
        else
          return x
      })
    }else{
      st=cp[c1[0]][i[0]]
      for(let u1=1;u1<c1.length;u1++){
       // console.log("stverif",st,reg,c1,i,c1[u1])
        if(st[c1[u1]]){
          if(i[u1]!=undefined) 
            st=st[c1[u1]][i[u1]]
          else
            st[c1[u1]]=st[c1[u1]].map(x=>{
              if(x.id==reg.id)
                return {...x,...reg}
              else
                return x
            })
            
            
        }
      }
    }
    return cp
  }
  

  const [editProduct1]=useMutation(MUTATION_EDIT_PRODUCT,{
    update:(cache,{data})=>{
     //console.log("entro a mutationeditproductnotmtm")
     let name
  //   if(titulo.startsWith("otm"))
      name=`edit${curCat.name}`
    //else
    //name=`editdatamtm${titulo.substr(3)}`
    
      /*if(isManyToMany){
        setAddRecGlobal(()=>data[name])
        getGroupMtm({variables:keyFields})

      }else{*/
       // console.log("entro a mutationeditproductnotmtm")
        const path=[`getData${currentCategory.name}`]
   
        

        /*const p=resultPath(currentCategory.fields.filter(x=>
          x.dataType=="relationship"
        ),titulo,categories,path,true)*/
        //const i=getIndexes(tableIndexes,p)

        //const res=simpleUpdateStateHere(categoryProducts,data[name],titulo,p,i)
        //dispatch(setCategoryProducts(res))
      //}
      console.log("updacate",updateCategories)
      updateCategories[curCat.name].forEach(i=>{
       // console.log("ucs",updateCategoriesIds,curCat.name,updateCategoriesIds[i],i)
       console.log("paramsucs",i,data[name],parentFields?.[i],i.substring(7))
       //if(i.startsWith("getData"))
        //i=i.substring(7)
        dispatch({
          type:typesOtm.ADD_INDEXES_TO_OTMRECORD,
          payload:{
            category:i,
            id:"edit",
            fieldId:`${titulo}Id`,
            row:data[name],
            action:"EDIT",
            childFields:parentFields?.[i]?.childFields
          }
        })
      })
    }
  })

  /*empieza edit mutation antiguo
  const[editProduct1]=useMutation(MUTATION_EDIT_PRODUCT,{
    update:(cache,{data})=>{
      //console.log("entroaquiii")
      path=[`getData${currentCategory.name}`]
      indexSize=1
      getPath(currentCategory.fields.filter(x=>
        x.dataType=="relationship"),titulo)
      //console.log("path",path)
      ind=[]
      getIndexes(titulo)
      console.log("indicesprim",ind)
      let ni=updateState(categoryProducts,0,0,titulo)
      //console.log("nibien",ni)
      //console.log("imtm",isManyToMany)
      let nj
      let entromtm=false
      if(isManyToMany==true){
        entromtm=true
        path=[`getData${currentCategory.name}`]
        indexSize=1
        //console.log("otb,",otrotitulo)
        getPath(currentCategory.fields.filter(x=>
          x.dataType=="relationship"),otrotitulo)
        //console.log("path2",path)
        ind=[]
        //getIndexes(otrotitulo)
        ind=[]
        getIndexesInverse(`getData${currentCategory.name}`)
       console.log("indices2",ind)
        nj=updateState(ni,0,0,otrotitulo)
        //console.log("ni2",nj)
    
      }
      if(entromtm)
        dispatch(setCategoryProducts(nj))
      else 
        dispatch(setCategoryProducts(ni))
      
      
    }
  })
  termina edit mutation antiguo*/
 
  const formButtonClick=()=>{
   // console.log("fields1",editFields)
    if(!isManyToMany){
      console.log("fields1",editFields)

      editProduct1({
        variables:editFields
      })
    }else{
     // console.log("fields1",editFields)

      const n=`${titulo}Id`
      //console.log("nuuu",n,indexInTable,titulo,keyFields)
      //setTableIndexes({...tableIndexes,[titulo]:indexInTable})
      editProduct2({
        variables:{...editFields,...keyFields}
      })
    }
    
  }

  const dialogConfig={
    headline:"Edit Product",
    open,
    closeDialog:toggleDialog
  }

  const displayFieldsConfig={
    
    fields:editFields,
    setFields:setEditFields,
    structure:curCat.fields

  }

  const formButtonConfig={
    onClick:()=>formButtonClick()
  }

  return (
    <Dialog
    {...dialogConfig}>

      <DisplayFields
      {...displayFieldsConfig}
      />
      <FormButton
      {...formButtonConfig}
      >
        Edit Product
      </FormButton>

    </Dialog>
  )
}

export default EditProduct
