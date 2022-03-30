import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'

const getQueryFromCategory=(category)=>{
  console.log("cat",category)
  const fields=category.fields.map((f,index)=>{
    //console.log("f",f)
      return f.name
    
  })
  console.log("query",`
  query ${category.name[0].toUpperCase()}${category.name.substr(1)}{
  \t${category.name}{
  \t\t${fields.join("\n\t\t")}  
  \t}
  }
`)
  return gql`
    query ${category.name[0].toUpperCase()}${category.name.substr(1)}{
      \t${category.name}{
      \t\t${fields.join("\n\t\t")}  
      \t}
    }
  `
}

const mapToState=({categories})=>({
  currentCategory:categories.currentCategory
})

const DisplayWholeProductsTable = () => {
  const {currentCategory}=useSelector(mapToState)
  let GET_PRODUCTS_FROM_CATEGORY=""
  if(currentCategory!==undefined && Object.keys(currentCategory).length>0){
    GET_PRODUCTS_FROM_CATEGORY=getQueryFromCategory(currentCategory)
  }
  const {loading,data,error}=useQuery(
    GET_PRODUCTS_FROM_CATEGORY
  )
  useEffect(
    () => {
      const onCompleted = data=>{
        console.log("dataaa",data)
        //dispatch(setCategories(data.categories))
        //dispatch(setCurrentCategoryId(0))
        
      }
      const onError = error => {
        return (
          <div>{error}</div>
        )
      }
      if (onCompleted || onError) {
        if (onCompleted && !loading && !error) {
          onCompleted(data)
        } else if (onError && !loading && error) {
          onError(error)
        }
      }
    },
    [loading, data, error]
  )
 
  return (
    <div>
      
    </div>
  )
}

export default DisplayWholeProductsTable
