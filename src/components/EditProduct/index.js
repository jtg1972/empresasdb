import { gql, useMutation } from '@apollo/client'
import { argsToArgsConfig } from 'graphql/type/definition'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editProduct, setCategoryProducts } from '../../redux/category/actions'
import Dialog from '../Dialog'
import DisplayFields from '../DisplayFields'
import FormButton from '../Forms/FormButton'

const mutationEditProduct=(category)=>{
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
  //console.log("query",query)
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
  //console.log("editmtmquery",query)
  query=gql`${query}`
  return query
}


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
  indexInTable

  
}) => {
  //console.log("CURCAT",curCat)
  const{categoryProducts,currentCategory,categories}=useSelector(mapToState)
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
  const updateState=(prods,indexPartials=0,indexArray=0,tit,idKey=editFields.id,ef=editFields)=>{
    //console.log("otrotituloind",tit,ind) 
    indexPartials=parseInt(indexPartials)
      indexArray=parseInt(indexArray)
      let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
      //let ti=path
      //let partials=ind
      //console.log("tipartials",ti,partials)
      let cp 
      /*if(prods==undefined || prods==[]
        ||prods=={})
        return null*/
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
          /*ui=cp[partials[indexPartials]].filter(x=>{
            console.log("xid deleteid",x.id,deleteId)
            return x.id!==deleteId
          })*/
          
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
  const getIndexes=(title)=>{
    for(let p in path){
      //console.log("ti pathp",tableIndexes,path[p])
      let curInd
      curInd=tableIndexes[path[p]]
      ind.push(curInd)
      
    }
  
    //let nti={...tableIndexes}
    //console.log("eff2",editFields)
    /*for(let p in path){
      //console.log("ti pathp",tableIndexes,path[p])
      let curInd
      
      //console.log("tb",tituloBefore)
      if(title==otrotitulo && path[p]==otrotitulo){
        
        const n=`${title}Id`
        //console.log("eaquii",n)
        curInd=`-${editFields[n]}`
      }else if(path[p]==title){
        curInd=parseInt(indexInTable)
      }else{
        curInd=tableIndexes[path[p]]
      }
      ind.push(curInd)
      
    }*/
    //console.log("indfinal",ind)
  
  }

  const getIndexesInverse=(titleCat)=>{
    //console.log("curcatname",titulo.substr(3),titleCat.substr(7))
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
      ind.push(`-${editFields[pr]}`)
      const n=`${otrotitulo}Id`

      ind.push(`-${editFields[n]}`)
      if(path.length>2){
          const nn=`${titulo}Id`
          ind.push(`-${editFields[nn]}`)
        }
    }else{
      //console.log(false)
      const uy=`${otrotitulo}Id`
      ind.push(`-${editFields[uy]}`)
      let n=`${titulo}Id`
      ind.push(`-${editFields[n]}`)
      if(path.length>2){
        const nn=`${otrotitulo}Id`
        ind.push(`-${editFields[nn]}`)
      } 
    }
  
  }
  
  let indexSize=1
  
  const getPath=(fields,title)=>{
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

  }




    
    
    
  const [fieldsToDisplay,setFieldsToDisplay]=useState([])
   
     //console.log("curCat",curCat)
     useEffect(()=>{
       if(curCat!==undefined){
         setFieldsToDisplay(curCat?.fields?.filter(m=>{
            return !m.name.startsWith("mtm")
        }).map(x=>x.name))
    }
     },[curCat])
   
  let MUTATION_EDIT_PRODUCT=""
  if(!isManyToMany){
    MUTATION_EDIT_PRODUCT=mutationEditProduct(curCat)
  }else{
    MUTATION_EDIT_PRODUCT=mutationEditProductManyToMany(curCat,keyFields)
  } 
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
      /*dispatch(editProduct({
        product:editFields,
        categoryName:curCat.name
      }))*/
      
    }
  })
 
  const formButtonClick=()=>{
    //console.log("fields",editFields)
    if(!isManyToMany){
      
      editProduct1({
        variables:editFields
      })
    }else{
      const n=`${titulo}Id`
      //console.log("nuuu",n,indexInTable,titulo,keyFields)
      //setTableIndexes({...tableIndexes,[titulo]:indexInTable})
      editProduct1({
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
