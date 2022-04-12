import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Dialog from '../Dialog'

const mapToState=({categories})=>({
  currentCategory:categories.currentCategory,
  categoryProducts:categories.categoryProducts
})

const AddFilter = ({
  open,
  toggleDialog
}) => {
  const [fields,setFields]=useState({})
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
  return (
    <Dialog
    {...dialogConfig}
    >
      
    </Dialog>
    
  )
}

export default AddFilter
