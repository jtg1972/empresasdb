import { useMutation } from '@apollo/client'
import { CategoryScale } from 'chart.js'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMultipleFieldValue } from '../../../../../redux/category/actions'
import Dialog from '../../../../Dialog'
import FormInput from '../../../../Forms/FormInput'

const mapToState=({categories})=>({
  currentCategory:categories.currentCategory
})

const CATEGORIES1=gql`
  query Categories{
    categories{
      id
      name
      parentCategory
      typeOfCategory
      parentCategories
      bookmark{
        id
        name
        typeOfCategory
      }
      fields{
        id
        name
        dataType
        declaredType
        values
        category
      }
    }
  }
`

const ADD_MULTIPLE_VALUE_TO_FIELD=gql`
mutation AddValueToField($addValueToFieldId: Int!, $value: String!) {
  addValueToField(id: $addValueToFieldId, value: $value) {
    id
    name
    values
    category
  }
}
`

const AddMultipleValue = ({
  open,
  toggleDialog,
  fieldId,
  fieldName
}) => {
  const {currentCategory}=useSelector(mapToState)
  const [mvInstance,setMvInstance]=useState("")
  const dispatch=useDispatch()
  const [addMultipleValue]=useMutation(ADD_MULTIPLE_VALUE_TO_FIELD,{update:(cache,{data})=>{
    const cats=cache.readQuery(
      {query:CATEGORIES1}
    )
    const newFieldMultipleValue=data.addValueToField
    let newCategories=cats.categories.map(c=>{
      if(c.id!==currentCategory.id){
        return c
      }else{
        console.log("cfields",c.fields)
        
        if(c.fields!==undefined){
          const newR=c.fields.map(h=>{
            if(h.id!==fieldId){
              return h
            
            }else{
              const newh=[...h.values,newFieldMultipleValue]
              return {...h,values:newh}
            }
          })
          return {...c,fields:newR}
      
        }else{
          return {...c,fields:[newFieldMultipleValue]}
        }
      }

    })
    console.log("newcats",newCategories)
    cache.writeQuery({
      query:CATEGORIES1,
      data:{
        categories:newCategories
      }
      
    })
    dispatch(addMultipleFieldValue(newFieldMultipleValue))
  }}

  )
  const getCategoryName=()=>{
    if(currentCategory!==undefined){
      return currentCategory.name
    }else{

      return "Root"
    }
  }

  const addMultipleValueClick=()=>{
    console.log("fid",fieldId)
    console.log("val",mvInstance)
    addMultipleValue({
      variables:{
        addValueToFieldId:fieldId,
        value:mvInstance
      }
    })
  }

  const dialogConfig={
    headline:getCategoryName()+" - "+fieldName,
    open:open,
    closeDialog:toggleDialog

  }

  const formInputConfig={
    placeholder:"New instance of multiple value",
    value:mvInstance,
    onChange:e=>setMvInstance(e.target.value),
    onKeyUp:e=>{
      if(e.key=="Enter"){
        addMultipleValueClick()
      }
    }
  }
  return (
    <Dialog
    {...dialogConfig}>
      <FormInput
      {...formInputConfig}
      />
    </Dialog>
  )
}

export default AddMultipleValue
