import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilterResults } from '../../redux/category/actions'
import Dialog from '../Dialog'
import DisplayAllFieldsCriteria from './DisplayAllFieldsCriteria'
import FilterHeader from './FilterHeader'
import FormButton from '../Forms/FormButton'
const mapToState=({categories})=>({
  currentCategory:categories.currentCategory,
  categoryProducts:categories.categoryProducts
})

const AddFilter = ({
  open,
  toggleDialog,
  toggleFilter,
  setSearchProductsFilter,
  toggleSearchProductsFilter
}) => {
  const dispatch=useDispatch()
  const [values,setValues]=useState({})
  const [operator,setOperator]=useState("equal")
  const [order,setOrder]=useState("")
  const [isGreater,setIsGreater]=useState(false)

  const {
    currentCategory,
    categoryProducts
  }=useSelector(mapToState)

  const rawProductsArr=Object.values(categoryProducts)
  let recordsToFilter=[]
  let headers=[]
  for(let rp in rawProductsArr){
  
    if(rawProductsArr[rp][0]!==undefined){
      for(let x in rawProductsArr[rp][0]){
        headers.push(x)
      }
    }
    recordsToFilter=[...recordsToFilter,...rawProductsArr[rp]]
  }
  const h=new Set(headers)

  console.log("rawproducts,x",recordsToFilter,h)
  const dialogConfig={
    open,
    closeDialog:toggleDialog,
    headline:"Add Filter"
  }
  const displayAllFieldsCriteriaConfig={
    setValues,
    values,
    setOrder,
    operator,
    setOperator
  }

  const buttonConfig={
    onClick:()=>{
      setSearchProductsFilter(true)
      toggleFilter(h)
      dispatch(fetchFilterResults({data:recordsToFilter,conds:values}))
    }
  }
  return (
    <Dialog
    {...dialogConfig}
    >
      <FilterHeader 
      fields={currentCategory.fields}
      />
      <DisplayAllFieldsCriteria
      {...displayAllFieldsCriteriaConfig}/>

      <FormButton
      {...buttonConfig}>
        Filter Now
      </FormButton>
    </Dialog>
    
  )
}

export default AddFilter
