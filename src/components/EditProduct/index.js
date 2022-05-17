import { gql, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editProduct } from '../../redux/category/actions'
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
      campos.push(args[f].name)
    }
  }
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
  currentCategory:categories.currentCategory
})

const EditProduct = ({
  open,
  toggleDialog,
  editFields,
  setEditFields,
  curCat,
  
}) => {
  console.log("editFieldseditprod",editFields)
  const dispatch=useDispatch()
  //const {currentCategory}=useSelector(mapToState)
  //console.log("curcattt",currentCategory)
  /*useEffect(()=>{
    console.log("editFeilds",editFields)
    fields=editFields
  },[])
  console.log("fieldsnuevo",fields)*/

  const MUTATION_EDIT_PRODUCT=mutationEditProduct(curCat)
  const[editProduct1]=useMutation(MUTATION_EDIT_PRODUCT,{
    update:(cache,{data})=>{
      dispatch(editProduct({
        product:editFields,
        categoryName:curCat.name
      }))
      
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
