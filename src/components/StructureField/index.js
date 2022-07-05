import { checkFetcher, gql, useMutation } from '@apollo/client'
import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, addCategoryField, setCurrentCategory, setCurrentCategoryId, setTableState } from '../../redux/category/actions'
import Dialog from '../Dialog'
import FormButton from '../Forms/FormButton'
import FormInput from '../Forms/FormInput'
import AddQueryTargets from './AddQueryTargets'
import './styles.scss'
const CREATE_CATEGORY=gql`
mutation CreateCategory($name: String!, $parentCategory: Int,$typeOfCategory: Int) {
  createCategory(name: $name, parentCategory: $parentCategory, typeOfCategory: $typeOfCategory) {
    id
    name
    parentCategories
    parentCategory
    typeOfCategory
    manyToMany
    bookmark {
      name
      id
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
}`
const CREATE_NEW_CATEGORY_STATE=gql`
mutation CreateTableState($category: Int!, $name: String!, $state: String!) {
  createTableState(category: $category, name: $name, state: $state) {
    id
    category
    name
    state
  }
}
`


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
  $relationCategory:Int,
  $queryCategory:Int,
  $targets:String) {
  createField(name: $name, category: $category, declaredType: $declaredType, dataType: $dataType,
    relationship:$relationship,
    relationCategory:$relationCategory,
    queryCategory:$queryCategory,
    targets:$targets) {
    id
    name
    category
    dataType
    values
    declaredType
    relationship
    relationCategory
    queryCategory
    targets
    
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
  const [targets,setTargets]=useState([])
  const [name,setName]=useState("")
  const [displayName,setDisplayName]=useState("")
  const [dataType,setDataType]=useState("")
  const [declaredType,setDeclaredType]=useState("")
  const [relationship,setRelationship]=useState("")
  const [relationTable,setRelationTable]=useState(-1)
  const [queryCategory,setQueryCategory]=useState(-1)
  const [currentCategoryFields,setCurrentCategoryFields]=useState([])
  const dispatch=useDispatch()
  let categoryName=""
  let otherCatName=""
  let otherCatId
  let oc=currentCategory
  let rc={}
  useEffect(()=>{
    setCurrentCategoryFields(currentCategory?.fields?.filter(e=>
      ((e.declaredType=="string"
      || e.declaredType=="number"
      )&&
      e.relationship!=="otmdestiny")
    ))  
  },[currentCategory])
  
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

  const [createTableState]=useMutation(CREATE_NEW_CATEGORY_STATE,{
    update:(cache,{data})=>{
      dispatch(setTableState({
        id:data.createTableState.id,
        name:data.createTableState.name,
        category:data.createTableState.category,
        state:"NOT_CREATED"
      }))
    }
  })

  const [createCategory]=useMutation(CREATE_CATEGORY,{
    update:(cache,{data})=>{
      const cats=cache.readQuery(
        {query:CATEGORIES1}
      )
      const newCat=data.createCategory
      
      
    if(newCat.typeOfCategory==0){
      createTableState({
        variables:{
          category:newCat.id,
          name:newCat.name,
          state:"NOT_CREATED"
        }
      })
      let mapeo=oc.fields.map(x=>{
        //if(x.declaredType=="number" ||
        //x.declaredType=="string"){
         return `${x.name},${x.name}`
        //}
      })
      mapeo.push("id,id")
      mapeo=mapeo.join(",")
      console.log("mapeo1",mapeo)
      
      createField({
        variables:{
          name:`mtm${currentCategory.name}${otherCatName}Id`,
          category:newCat.id,
          dataType:"queryCategory",
          declaredType:"number",
          queryCategory:parseInt(currentCategory.id),
          targets:mapeo//relationship,
          //relationCategory:relationTable
        }
      })
      /*name:name,
      category:currentCategory.id,
      dataType,
      queryCategory:parseInt(queryCategory),
      targets:targets.join(",")*/
      mapeo=rc.fields.map(x=>{
        //if(x.declaredType=="number" ||
        //x.declaredType=="string"){
         return `${x.name},${x.name}`
        //}
      })
      mapeo.push("id,id")
      mapeo=mapeo.join(",")
      
      console.log("mapeo2",mapeo)
      
      createField({
        variables:{
          name:`mtm${otherCatName}${currentCategory.name}Id`,
          category:newCat.id,
          dataType:"queryCategory",
          declaredType:"number",
          queryCategory:parseInt(otherCatId),
          targets:mapeo
        }
      })
          
      
    }
      console.log("ncid",newCat,newCat.id)
      cache.writeQuery({
        query:CATEGORIES1,
        data:{
          categories:[...cats.categories,newCat]
        }
        
      })
      dispatch(addCategory(newCat))
      dispatch(setCurrentCategoryId(newCat.id))
    }})

  
  const onAddFieldClick=()=>{
    if(dataType=="queryCategory"){
      console.log("queryCategory",queryCategory)
      createField({
        variables:{
          name:name,
          category:currentCategory.id,
          dataType,
          queryCategory:parseInt(queryCategory),
          targets:targets.join(",")
        }
      })
    }else if(dataType!=="relationship"){
      createField({
        variables:{
          name: name,
          category: currentCategory.id,
          declaredType: declaredType,
          dataType:dataType

        }
      })
    }else if(dataType=="relationship"){
      rc=categories.filter(t=>t.id==relationTable)[0]

      if(relationship=="onetomany"){
        console.log("argsesc",{
            name:`otm${currentCategory.name}${rc.name}`,
            category:currentCategory.id,
            dataType:dataType,
            relationship,
            relationCategory:relationTable
        })
        
        createField({
          variables:{
            name:`otm${currentCategory.name}${rc.name}`,
            category:currentCategory.id,
            dataType:dataType,
            relationship,
            relationCategory:relationTable
          }
        })
        
        console.log("rc",rc)
        createField({
          variables:{
            name:`otm${currentCategory.name}${rc.name}Id`,
            category:rc.id,
            dataType:"singleValue",
            declaredType:"number",
            relationship:"otmdestiny"

          }
        })
      }else if(relationship=="manytomany"){

      

        otherCatName=rc.name
        console.log("oc rc",oc,rc)
        otherCatId=rc.id
        if(currentCategory.name<rc.name){
          categoryName=`${oc.name}_${rc.name}`
        }else{
          categoryName=`${rc.name}_${oc.name}`
        }
        createCategory({
          variables:{
            name:categoryName,
            parentCategory:0,
            typeOfCategory:0,
            manyToMany:true
          }
        })
        createField({
          variables:{
            name:`mtm${rc.name}${currentCategory.name}`,
            category:currentCategory.id,
            dataType:dataType,
            relationship,
            relationCategory:relationTable
          }
        })
        createField({
          variables:{
            name:`mtm${currentCategory.name}${rc.name}`,
            category:rc.id,
            dataType:dataType,
            relationship,
            relationCategory:currentCategory.id
          }
        })
        
      }
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

  const selectConfigQueryCategory={
    className:"noOutline",
    onChange:e=>setQueryCategory(e.target.value),
    value:queryCategory
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
      
      <select {...selectConfig}>
        <option value="">Select type of result</option>
        <option value="singleValue">Single Value</option>
        <option value="multipleValue">Multiple Value</option>
        <option value="relationship">Relationship</option>
        <option value="queryCategory">Query Category</option>
      </select>
      {dataType=="queryCategory"
      &&
    
      <select {...selectConfigQueryCategory}>
        {categories.map(c=>{
          if(c.id!==currentCategory.id)
            return <option value={c.id}>{c.name}</option>
          })
        }
      </select>
    
      }
      {queryCategory>0 
      &&
      <AddQueryTargets
      currentCategoryFields={currentCategoryFields}
      queryCategory={queryCategory}
      setCurrentCategoryFields={setCurrentCategoryFields}
      originalCategoryFields={currentCategory.fields.filter(e=>(
        (e.declaredType=="string"
        || e.declaredType=="number"
        )&&
        e.relationship!=="otmdestiny"))
      }
      targets={targets}
      setTargets={setTargets}/>
      }

      {dataType!=="relationship"
      &&
      <>
      <FormInput
      {...inputFieldNameConfig}
      />
      
      <FormInput
      {...inputDisplayNameConfig}
      />
      </>}

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
