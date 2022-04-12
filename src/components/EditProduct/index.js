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
  args=category.fields.map(f=>{
    console.log("ffff",f)
    if(f.declaredType=="number"){
      return `$${f.name}:Int`
    }else if(f.declaredType=="string"){
      return `$${f.name}:String`
    }
  })
  args.unshift("$id:Int")
  args=args.join(", ")
  args1=category.fields.map(f=>{
    
      return `${f.name}:$${f.name}`
    
  })
  let campos=category.fields.map(c=>c.name)
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
  editFields
}) => {
  const dispatch=useDispatch()
  const {currentCategory}=useSelector(mapToState)
  const [fields,setFields]=useState({})
  console.log("curcattt",currentCategory)
  const MUTATION_EDIT_PRODUCT=mutationEditProduct(currentCategory)
  const[editProduct1]=useMutation(MUTATION_EDIT_PRODUCT,{
    update:(cache,{data})=>{
      dispatch(editProduct({
        product:fields,
        categoryName:currentCategory.name
      }))
    }
  })
  useEffect(()=>{
    console.log("editFeilds",editFields)
    setFields(editFields)
  },[editFields])

  const formButtonClick=()=>{
    console.log("fields",fields)
    editProduct1({
      variables:fields
    })
  }

  const dialogConfig={
    headline:"Edit Product",
    open,
    closeDialog:toggleDialog
  }

  const displayFieldsConfig={
    fields,
    setFields,
    structure:currentCategory.fields

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
