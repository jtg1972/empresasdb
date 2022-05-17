import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, setCategoryProducts } from '../../redux/category/actions'
import Dialog from '../Dialog'
import DisplayFields from '../DisplayFields'
import FormButton from '../Forms/FormButton'

const addProductMutation=(category)=>{
  let argsf=category.fields
  let args1=[]
  for(let f in argsf){
    if(argsf[f].declaredType=="number"){
      args1.push(`$${argsf[f].name}:Int`)
    }else if(argsf[f].declaredType=="string" 
    || argsf[f].declaredType=="date"
    || argsf[f].dataType=="multipleValue"){
      args1.push(`$${argsf[f].name}:String`)
    }
  }
  args1=args1.join(", ")

  let args2=[]
  for(let f in argsf){
    if(argsf[f].dataType!=="relationship"){
      args2.push(`${argsf[f].name}:$${argsf[f].name}`)
    }
  }
  
  args2.join(", ")

  let campos=[]
  for(let f in argsf){
    if(argsf[f].dataType!=="relationship"){
      campos.push(argsf[f].name)
    }
  }
  
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
  currentCategory:categories.currentCategory,
  categoryProducts:categories.categoryProducts
})

const NewProduct = ({
  open,
  toggleDialog,
  respCat,
  tableIndexes,
  partials
  
}) => {
  console.log("respcatnuevo",respCat)
  const [fields,setFields]=useState({})
  const {currentCategory,
  categoryProducts}=useSelector(mapToState)
  const dispatch=useDispatch()
 
  const updateState=(cp,indexPartials=0,indexArray=0,prod)=>{
    indexPartials=parseInt(indexPartials)
    indexArray=parseInt(indexArray)
    const ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
    console.log("tipartials",ti,partials)
    if(Object.keys(cp).length==0)
      return null
    if(!Array.isArray(cp)){
      console.log("no arreglo")
      if(indexPartials<partials.length){
      console.log("pip",partials[indexPartials],cp[partials[indexPartials]])
      console.log("params",cp[partials[indexPartials]],indexPartials+1,indexArray)  
      return {...cp,[partials[indexPartials]]:updateState(cp[partials[indexPartials]],indexPartials+1,indexArray)}
      }
      
      

    } else if(Array.isArray(cp)){
      console.log("arraglo",indexArray,ti.length)
    
      if(indexArray<ti.length){
        if(indexArray+1==ti.length){
          let uy=[
            ...cp,prod]
          return uy

        }
      
        console.log("partarr",cp[ti[indexArray]])
      console.log("paramsarr",cp[ti[indexArray]],indexPartials,indexArray+1)
      
      return updateState(cp[ti[indexArray]],indexPartials,indexArray+1)
      }
    
    } 
    
}

  const CREATE_PRODUCT_MUT=addProductMutation(respCat)
  const [addProduct2]=useMutation(CREATE_PRODUCT_MUT,{
    update:(cache,{data})=>{
      const nam=`create${respCat.name}`
      const us=updateState(categoryProducts,0,0,data[nam])
      console.log("ust",us)
      setCategoryProducts(us)
      /*dispatch(addProduct({
        categoryName:respCat.name,
        product:data[nam]
      }))*/
      
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
    headline:"Add Product of "+respCat.name
  }

  const displayFieldsConfig=()=>({
    structure:respCat.fields,
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
