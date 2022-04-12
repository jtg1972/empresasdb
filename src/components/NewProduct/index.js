import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../redux/category/actions'
import Dialog from '../Dialog'
import DisplayFields from '../DisplayFields'
import FormButton from '../Forms/FormButton'

const addProductMutation=(category)=>{
  
  let args1=category.fields.map(f=>{
    if(f.declaredType=="number"){
      return `$${f.name}:Int`
    }else{
      return `$${f.name}:String`
    }
  })
  args1=args1.join(", ")

  let args2=category.fields.map(f=>{
    return `${f.name}:$${f.name}`
  })

  args2.join(", ")

  let campos=category.fields.map(f=>f.name)
  campos.unshift("id")  
  campos=campos.join("\n")
  
  const query=`mutation CreateProduct(${args1}){
    create${category.name}(${args2}){
      ${campos}
    }
  }`
  console.log("queryadd",query)
  return gql`${query}`
}

const mapToState=({categories})=>({
  currentCategory:categories.currentCategory
})

const NewProduct = ({
  open,
  toggleDialog
}) => {
  const [fields,setFields]=useState({})
  const {currentCategory}=useSelector(mapToState)
  const dispatch=useDispatch()
  const CREATE_PRODUCT_MUT=addProductMutation(currentCategory)
  const [addProduct2]=useMutation(CREATE_PRODUCT_MUT,{
    update:(cache,{data})=>{
      const nam=`create${currentCategory.name}`
      dispatch(addProduct({
        categoryName:currentCategory.name,
        product:data[nam]
      }))
    }
  })

  const buttonClick=()=>{
    console.log("fieldsadd",fields)
    addProduct2({
      variables:{
        ...fields
      }
    })
  }
  const dialogConfig={
    open:open,
    closeDialog:toggleDialog,
    headline:"Add Product of "+currentCategory.name
  }

  const displayFieldsConfig=()=>({
    structure:currentCategory.fields,
    fields,
    setFields
  })

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
