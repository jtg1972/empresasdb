import { gql, useMutation } from '@apollo/client'
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
    console.log("ffff",f)
    if(argsf[f].declaredType=="number"){
      args.push(`$${argsf[f].name}:Int`)
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
        args1.push(`${argsf[f].name}:$${argsf[f].name}`)
      }
  }
  let campos=[]
  for(let f in argsf){
    if(argsf[f].dataType!=="relationship"){
      campos.push(argsf[f].name)
    }
  }
  console.log("camposmi",campos)
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
  console.log("query",query)
  query=gql`${query}`
  return query
}

const mapToState=({categories})=>({
  currentCategory:categories.currentCategory,
  categoryProducts:categories.categoryProducts
})

const EditProduct = ({
  open,
  toggleDialog,
  editFields,
  setEditFields,
  curCat,
  tableIndexes,
  partials,
  titulo
  
}) => {
  const{categoryProducts}=useSelector(mapToState)
  console.log("editFieldseditprod",editFields)
  console.log("titulo",titulo)
  const dispatch=useDispatch()
  //const {currentCategory}=useSelector(mapToState)
  //console.log("curcattt",currentCategory)
  /*useEffect(()=>{
    console.log("editFeilds",editFields)
    fields=editFields
  },[])
  console.log("fieldsnuevo",fields)*/
  const updateState=(prods,indexPartials=0,indexArray=0)=>{
      
    indexPartials=parseInt(indexPartials)
      indexArray=parseInt(indexArray)
      let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
    
      console.log("tipartials",ti,partials)
      let cp 
      /*if(prods==undefined || prods==[]
        ||prods=={})
        return null*/
     
      console.log("editfieldsus",editFields)
      if(!Array.isArray(prods)){
        cp={...prods}
        console.log("no arreglo")
        console.log("prods partlength partials",prods,partials.length,partials)
        let ui
        //console.log("pip",partials[indexPartials],cp[partials[indexPartials]])
        //console.log("params",cp[partials[indexPartials]],indexPartials+1,indexArray)
        console.log("se modifica campo",partials[indexPartials])
        //if((indexPartials+1)==partials.length){
        console.log("importante",partials[indexPartials],titulo)
        if(partials[indexPartials]==titulo){
          console.log("entro final")
          /*ui=cp[partials[indexPartials]].filter(x=>{
            console.log("xid deleteid",x.id,deleteId)
            return x.id!==deleteId
          })*/
          
          console.log("ui",partials[indexPartials],cp[partials[indexPartials]])
          return {
            ...cp,
            [partials[indexPartials]]:
              cp[partials[indexPartials]].map(x=>{
                if(x.id==editFields.id){
                 console.log("true ef",editFields)
                 return editFields
                }else{
                  console.log("false")
                  return x
                }
              }
            )
          }
        }else{
          console.log("entro no final")
          return {...cp,[partials[indexPartials]]:updateState(cp[partials[indexPartials]],indexPartials+1,indexArray)}
        }
      
      } else if(Array.isArray(prods)){
        cp=[...prods]
        console.log("arraglo",indexArray,ti.length)
        //console.log("deliddd",deleteId)
        console.log("prods",prods)
          console.log("partarr",cp[ti[indexArray]])
        console.log("paramsarr",cp[ti[indexArray]],indexPartials,indexArray+1,titulo)
                  
        
        return cp.map((y,index)=>{
          if(index==ti[indexArray]){
            return updateState(cp[ti[indexArray]],indexPartials,indexArray+1)
          }
          return y
        })
      
      } 
  }
  
  const MUTATION_EDIT_PRODUCT=mutationEditProduct(curCat)
  const[editProduct1]=useMutation(MUTATION_EDIT_PRODUCT,{
    update:(cache,{data})=>{
      const ni=updateState(categoryProducts,0,0)
      console.log("ni",ni)
      dispatch(setCategoryProducts(ni))
      /*dispatch(editProduct({
        product:editFields,
        categoryName:curCat.name
      }))*/
      
    }
  })
 
  const formButtonClick=()=>{
    console.log("fields",editFields)
    editProduct1({
      variables:editFields
    })
    
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
