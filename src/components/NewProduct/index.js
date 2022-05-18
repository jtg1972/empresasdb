import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, setCategoryProducts } from '../../redux/category/actions'
import Dialog from '../Dialog'
import DisplayFields from '../DisplayFields'
import FormButton from '../Forms/FormButton'

const addProductMutation=(category,categories)=>{
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
    if(argsf[f].dataType=="relationship"){
      if(argsf[f].relationship=="onetomany"){
        let oc=categories.filter(c=>c.id==argsf[f].relationCategory)
        console.log("oc",oc)
        let na=`otm${category.name}${oc[0].name}`
        
        campos.push(`${na}{id}`)
      
      }
    }
    else
      campos.push(argsf[f].name)
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
  categoryProducts:categories.categoryProducts,
  categories:categories.categories
})

const NewProduct = ({
  open,
  toggleDialog,
  respCat,
  tableIndexes,
  partials,
  titulo
  
}) => {
  console.log("respcatnuevo",respCat)
  const [fields,setFields]=useState({})
  const {currentCategory,
  categoryProducts,
  categories}=useSelector(mapToState)
  const dispatch=useDispatch()
 
  const updateState=(prods,indexPartials=0,indexArray=0,nuevo)=>{
      
    indexPartials=parseInt(indexPartials)
      indexArray=parseInt(indexArray)
      let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
    
      console.log("tipartials",ti,partials)
      let cp 
      /*if(prods==undefined || prods==[]
        ||prods=={})
        return null*/
     
      
      if(!Array.isArray(prods)){
        cp={...prods}
        console.log("no arreglo")
        console.log("prods partlength partials",prods,partials.length,partials)
        let ui
        //console.log("pip",partials[indexPartials],cp[partials[indexPartials]])
        //console.log("params",cp[partials[indexPartials]],indexPartials+1,indexArray)
        console.log("se modifica campo",partials[indexPartials])
        //if((indexPartials+1)==partials.length){
        console.log("importante",partials[indexPartials],titulo)
        if(partials[indexPartials]==titulo){
          console.log("entro final")
          /*ui=cp[partials[indexPartials]].filter(x=>{
            console.log("xid deleteid",x.id,deleteId)
            return x.id!==deleteId
          })*/
          
          console.log("ui",partials[indexPartials],cp[partials[indexPartials]])
          return {
            ...cp,
            [partials[indexPartials]]:
            [...cp[partials[indexPartials]],nuevo]
          }
        }else{
          console.log("entro no final")
          return {...cp,[partials[indexPartials]]:updateState(cp[partials[indexPartials]],indexPartials+1,indexArray,nuevo)}
        }
      
      } else if(Array.isArray(prods)){
        cp=[...prods]
        console.log("arraglo",indexArray,ti.length)
        //console.log("deliddd",deleteId)
        console.log("prods",prods)
          console.log("partarr",cp[ti[indexArray]])
        console.log("paramsarr",cp[ti[indexArray]],indexPartials,indexArray+1,titulo)
                  
        
        return cp.map((y,index)=>{
          if(index==ti[indexArray]){
            return updateState(cp[ti[indexArray]],indexPartials,indexArray+1,nuevo)
          }
          return y
        })
      
      } 
  }
      
  
  const CREATE_PRODUCT_MUT=addProductMutation(respCat,categories)
  const [addProduct2]=useMutation(CREATE_PRODUCT_MUT,{
    update:(cache,{data})=>{
      const nam=`create${respCat.name}`
      const us=updateState(categoryProducts,0,0,data[nam])
      console.log("ust",us)
      dispatch(setCategoryProducts(us))
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
