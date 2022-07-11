import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import {FcTreeStructure} from 'react-icons/fc'
import {IoIosRemoveCircleOutline} from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { combineReducers } from 'redux'
import { removeField, removeFieldNoCurrentCategory, removeMultipleFieldValue, setTableState } from '../../../../redux/category/actions'

const CATEGORIES1=gql`
  query Categories{
    categories{
      id
      name
      parentCategory
      parentCategories
      typeOfCategory
      bookmark{
        id
        name
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
        queryCategory

      }
    }
  }`

const REMOVE_FIELD=gql`mutation RemoveField($removeFieldId: Int!,
  $relationship:String,
  $relationCategory:Int,
  $mainCategoryName:String) {
  removeField(id: $removeFieldId,
    relationship:$relationship,
    relationCategory:$relationCategory,
    mainCategoryName:$mainCategoryName)
}`

const REMOVE_MULTIPLE_VALUE=gql`
mutation RemoveMultipleValue($removeMultipleValueId: Int!, $value: String!) {
  removeMultipleValue(id: $removeMultipleValueId, value: $value)
}
`

const EDIT_TABLE_STATE=gql`
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
const DisplayRow = ({
  f,
  toggleDialogStructure
}) => {
  let valueToDelete=""
  const {
    currentCategory,
    categories
  }=useSelector(mapToState)
  const dispatch=useDispatch()
  //console.log("f",f)
  
  const [editTableState]=useMutation(EDIT_TABLE_STATE)
  const [removeField1]=useMutation(REMOVE_FIELD,{
    
    update:(cache,{data})=>{
      const cats=cache.readQuery(
        {query:CATEGORIES1}
      )
      const resultado=data.removeField
      let newCats=[]
      //console.log("resultado,cats",resultado,cats.categories)
      if(resultado==true){
        

        newCats=cats.categories.map(c=>{
          
          if(c.parentCategories.includes(f.category)){
            if(c.typeOfCategory==0){
              editTableState({
                variables:{
                  category:c.id,
                  state:"NO_UPDATED"
                }
              })
              dispatch(setTableState({
                category:c.id,
                state:"NO_UPDATED"
              }))
            }
            return {...c,fields:c.fields.filter(g=>
              g.id!==f.id
            )}
            
          }else if(c.parentCategories.includes(f.relationCategory)){
            if(c.typeOfCategory==0){
              editTableState({
                variables:{
                  category:c.id,
                  state:"NO_UPDATED"
                }
              })
              dispatch(setTableState({
                category:c.id,
                state:"NO_UPDATED"
              }))
            }
            return {...c,fields:c.fields.filter(g=>
              g.name!==`${currentCategory.name}${c.name}Id`
            )}
            
          }else{
              return c
          }
        })
        cache.writeQuery({
          query:CATEGORIES1,
          data:{
            categories:newCats
          }
          
        })
        
        dispatch(removeField(f))
        
      }
    }
  })

  const [removeMultipleValue]=useMutation(REMOVE_MULTIPLE_VALUE,{
  
    update:(cache,{data})=>{
      const cats=cache.readQuery(
        {query:CATEGORIES1}
      )
      const resultado=data.removeMultipleValue
      if(resultado==true){
        let newCats=[]
        //console.log("resultado,",resultado)
      
        newCats=cats.categories.map(c=>{
      
          const newF=c.fields.map(j=>{
            if(j.id==f.id){
              const nv=[]
              for(let u in f.values){
                if(f["values"][u]!==valueToDelete){
                  nv.push(f["values"][u])
                }
                
              }
              return {...j,values:nv}
            }else{
              return j
            }
          })
          return {...c,fields:newF}
        })     
          
        
        cache.writeQuery({
          query:CATEGORIES1,
          data:{
            categories:newCats
          }
          
        })
        dispatch(removeMultipleFieldValue({
          category:currentCategory.id,
          fieldId:f.id,
          value:valueToDelete
        }))
        valueToDelete=""
      
      }
    }
  })
  const displayDataTypeTitle=()=>{
    if(f.dataType=="multipleValue")
      return "Multiple"
    else if(f.dataType=="singleValue")
      return "Single"
    else if(f.dataType=="relationship")
      return "Relationship"
    else if(f.dataType=="queryCategory")
      return "Category Query"
  }

  
  const displayTypes=(values)=>{
    let ret=[]
    let comp=[]
    //console.log("valuesss",values,Array.isArray(values),values.length,
    //Array.isArray(values) && values.length>0)
    if(Array.isArray(values) && values.length>0){
      for(let v in values){ 

        ret.push(
        <div>{values[v]}  
          {f.category==currentCategory.id && 
          <span onClick={()=>{
            
            console.log("valv",values[v])
            valueToDelete=values[v]
            removeMultipleValue({
              variables:{
                removeMultipleValueId:f.id,
                value:valueToDelete
              }
            })
          }}>
            &nbsp;X
          </span>
          }
          ,&nbsp;
        </div> )
      }
      comp.push(<div style={{display:"flex",flexWrap:"wrap"}}>{ret}</div>)
      return comp
    }
 
    return ""
  }

  const displayRelationshipType=()=>{
    //console.log("relationship",f.relationship)
    if(f.dataType=="relationship"){
      if(f.relationship=="onetoone"){
        return "One to One"
      }else if(f.relationship=="onetomany"){
        return "One to Many"
      }else if(f.relationship=="manytomany"){
        return "Many to Many"
      }
    }
    else if(f.relationship=="otmdestiny"){
      return "One to Many Destiny"
    }
  }

  const displayQueryCategory=()=>{
    if(f.dataType=="queryCategory")
      //console.log("fqc",f.queryCategory)
      if(f.queryCategory>0){
        const cat=categories.filter(x=>
          x.id==f.queryCategory  
        )[0]
        if(cat){
          return cat.name
        }else
          return "unknown"
      }
  }
  const displayTargetCategory=()=>{
    if(f.dataType=="relationship"){
      const c=categories.filter(x=>x.id==f.relationCategory)
      if(c){
        return c[0].name
      }
      return ""
    }
  }

  return (
    <tr>
      <td>{f.name}</td>
      <td>{f.declaredType}</td>
      <td>{displayDataTypeTitle()}</td>
      <td>{displayQueryCategory()}</td>
      <td>{displayRelationshipType()}</td>
      <td>{displayTargetCategory()}</td>
      <td>{Array.isArray(f.values) && f.values.length>0 
      &&
      displayTypes(f.values)
      }
      </td>
      <td>
      {f.dataType=="multipleValue" &&
      f.category==currentCategory.id 
      &&
      <span>
        <FcTreeStructure
        onClick={()=>{
          toggleDialogStructure(f.id,f.name)
          
        }}/>

      </span>
      }
      </td>
      <td>
        <span>
        {f.category==currentCategory.id 
        &&
        f.relationship!=="otmdestiny" 
        &&

          <IoIosRemoveCircleOutline
          onClick={()=>{
            let c
            removeField1({variables:{
              removeFieldId:f.id,
              relationship:f.relationship,
              relationCategory:f.relationCategory,
              mainCategoryName:currentCategory.name
            }})
          }}
          />
        }
        </span>
      </td>
    </tr>
  )
}

export default DisplayRow
