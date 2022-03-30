import { checkFetcher, gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategoryField } from '../../redux/category/actions'
import Dialog from '../Dialog'
import FormButton from '../Forms/FormButton'
import FormInput from '../Forms/FormInput'
import './styles.scss'
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
const CREATE_FIELD=gql`
mutation CreateField($name: String!, $category: Int!, $declaredType: String!, $dataType: String!) {
  createField(name: $name, category: $category, declaredType: $declaredType, dataType: $dataType) {
    id
    name
    category
    dataType
    values
    declaredType
  }
}
`

const mapToState=({categories})=>({
  currentCategory:categories.currentCategory
})



const StructureField = ({
  open,
  toggleDialog
}) => {
  const {currentCategory}=useSelector(mapToState)
  const [name,setName]=useState("")
  const [displayName,setDisplayName]=useState("")
  const [dataType,setDataType]=useState("")
  const [declaredType,setDeclaredType]=useState("")
  const dispatch=useDispatch()
  const [createField]=useMutation(CREATE_FIELD,{
    update:(cache,{data})=>{
      const cats=cache.readQuery(
        {query:CATEGORIES1}
      )
      const newField=data.createField
      let newCategories=cats.categories.map(c=>{
        if(c.id!==data.createField.category){
          if(c.parentCategories.includes(data.createField.category)){
            return {...c,fields:[...c.fields,newField]}
          }else{
        
            return c
          }
        }else{
          console.log("cfields",c.fields)
          if(c.fields!==undefined){
            return {...c,fields:[...c.fields,newField]}
        
          }else{
            return {...c,fields:[newField]}
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
      dispatch(addCategoryField(newField))
    }})

  console.log("opendi",open)
  const onAddFieldClick=()=>{

    createField({
      variables:{
        name: name,
        category: currentCategory.id,
        declaredType: declaredType,
        dataType:dataType

      }
    })
    
  }
  const categoryTitle=()=>{
    if(currentCategory!==undefined)
      return currentCategory.name
    else  
      return "Root"
  }

  const dialogConfig={
    open:open,
    closeDialog:()=>toggleDialog(),
    headline:"Add field to "+categoryTitle()
  }

  const inputFieldNameConfig={
    onChange:e=>setName(e.target.value),
    value:name,
    placeholder:"Field Name"
  }

  const inputDisplayNameConfig={
    placeholder:"Displayed Name",
    onChange:e=>setDisplayName(e.target.value),
    value:displayName
  }

  const selectConfig={
    className:"noOutline",
    onChange:e=>setDataType(e.target.value),
    value:dataType
  }

  const selectConfigDeclaredType={
    className:"noOutline",
    onChange:e=>setDeclaredType(e.target.value),
    value:declaredType
  }
  const buttonAddFieldConfig={
    className:"marginTop10",
    onClick:()=>onAddFieldClick()
  }

  return (
    <Dialog
    {...dialogConfig}>
      
      <FormInput
      {...inputFieldNameConfig}
      />
      
      <FormInput
      {...inputDisplayNameConfig}
      />

      <select {...selectConfig}>
        <option value="">Select type of result</option>
        <option value="singleValue">Single Value</option>
        <option value="multipleValue">Multiple Value</option>
      </select>

      <select {...selectConfigDeclaredType}>
        <option value="">Select the data type</option>
        <option value="string">String</option>
        <option value="number">Numeric</option>
        <option value="date">Date</option>
      </select>

      <FormButton {...buttonAddFieldConfig}>
        Add Field
      </FormButton>
    </Dialog>
  )
}

export default StructureField
