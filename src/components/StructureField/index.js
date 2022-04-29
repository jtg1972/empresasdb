import { checkFetcher, gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategoryField, setTableState } from '../../redux/category/actions'
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
      relationship
      relationCategory
    }
  }
}
`
const CREATE_FIELD=gql`
mutation CreateField(
  $name: String!, 
  $category: Int!, 
  $declaredType: String, 
  $dataType: String!,
  $relationship:String,
  $relationCategory:Int) {
  createField(name: $name, category: $category, declaredType: $declaredType, dataType: $dataType,
    relationship:$relationship,
    relationCategory:$relationCategory) {
    id
    name
    category
    dataType
    values
    declaredType
    relationship
    relationCategory
    
  }
}
`
const EDIT_CATEGORY_STATE=gql`
mutation EditTableState($category: Int!, $state: String!) {
  editTableState(category: $category, state: $state) {
    id
    category
    name
    state
  }
}
`

const mapToState=({categories})=>({
  currentCategory:categories.currentCategory,
  categories:categories.categories
})



const StructureField = ({
  open,
  toggleDialog
}) => {
  const {
    currentCategory,
    categories
  }
  =
  useSelector(mapToState)
  const [name,setName]=useState("")
  const [displayName,setDisplayName]=useState("")
  const [dataType,setDataType]=useState("")
  const [declaredType,setDeclaredType]=useState("")
  const [relationship,setRelationship]=useState("")
  const [relationTable,setRelationTable]=useState(-1)
  const dispatch=useDispatch()
  
  const [editTableState]=useMutation(EDIT_CATEGORY_STATE)
  
  const [createField]=useMutation(CREATE_FIELD,{
    update:(cache,{data})=>{
      const cats=cache.readQuery(
        {query:CATEGORIES1}
      )
      const newField=data.createField

      

      let newCategories=cats.categories.map(c=>{
        console.log("tyofcat",c.typeOfCategory)
        if(c.id!==data.createField.category){
          if(c.parentCategories.includes(data.createField.category)){
            if(c.typeOfCategory==0){
              editTableState({
                variables:{
                  category:c.id,
                  state:"NO_UPDATED"
                }
              })
              dispatch(setTableState(
                {
                  category:c.id,
                  state:"NO_UPDATED"
                }
              ))
            } 
                
            return {...c,fields:[...c.fields,newField]}
          }else{
        
            return c
          }
        }else{
          console.log("cfields",c.fields)
          if(c.typeOfCategory==0){
            editTableState({
              variables:{
                category:c.id,
                state:"NO_UPDATED"
              }
            })
            dispatch(setTableState(
              {
                category:c.id,
                state:"NO_UPDATED"
              }
            ))
          }
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
    if(dataType!=="relationship"){
      createField({
        variables:{
          name: name,
          category: currentCategory.id,
          declaredType: declaredType,
          dataType:dataType

        }
      })
    }else{
      console.log("argsesc",{
          name:name,
          category:currentCategory.id,
          dataType:dataType,
          relationship,
          relationCategory:relationTable
      })
      createField({
        variables:{
          name:name,
          category:currentCategory.id,
          dataType:dataType,
          relationship,
          relationCategory:relationTable
        }
      })
      const rc=categories.filter(t=>t.id==relationTable)[0]
      console.log("rc",rc)
      createField({
        variables:{
          name:`${currentCategory.name}Id`,
          category:rc.id,
          dataType:"singleValue",
          declaredType:"number",

        }
      })
    }
    
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
        <option value="relationship">Relationship</option>
      </select>

      {dataType=="singleValue" 
      && 
      <select {...selectConfigDeclaredType}>
        <option value="">Select the data type</option>
        <option value="string">String</option>
        <option value="number">Numeric</option>
        <option value="date">Date</option>
      </select>
      }
      {dataType=="relationship" &&
        <select onChange={e=>setRelationship(e.target.value)}>
          <option value="onetoone">One to one</option>
          <option value="onetomany">One to many</option>
          <option value="manytomany">Many to many</option>
        </select>
      }
      {dataType=="relationship" 
      && 
      (relationship=="onetomany"
      ||
      relationship=="manytomany") 
      &&
      <select 
      onChange={(e)=>setRelationTable(parseInt(e.target.value))}
      value={relationTable}>
        {categories.map(c=>{
          if(!c.parentCategories.includes(currentCategory.id)){
            return <option value={c.id}>
              {c.name}
            </option>
          }
        })}
      </select>
      }

      <FormButton {...buttonAddFieldConfig}>
        Add Field
      </FormButton>
    </Dialog>
  )
}

export default StructureField
