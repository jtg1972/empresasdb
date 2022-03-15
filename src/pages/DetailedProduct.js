import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router'
import {useQuery,gql} from '@apollo/client'
import BreadCrumb from '../components/BreadCrumb'
import { useDispatch, useSelector } from 'react-redux'
import { setCategories, setCurrentCategory, setCurrentCategoryId } from '../redux/category/actions'
import SearchSubcategories from '../components/SearchSubcategories'
const SELECT_CATEGORY=gql`
  query selectCategory($id:Int!){
    selectCategory(id:$id){
      id
      name
      bookmark{
        id
        name
      }
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
      bookmark{
        id
        name
        typeOfCategory
      }
    }
  }
`    
const mapToState=({categories})=>({
  categories:categories.categories,
  
})

const DetailedProduct = () => {
  const dispatch=useDispatch()
  const {
    categories
  }=useSelector(mapToState)
  const [openDialog,setOpenDialog]=useState(false)
  const toggleDialog=()=>setOpenDialog(!openDialog)

  const {loading,data,error}=useQuery(
    CATEGORIES1
  )

    useEffect(()=>{
      //dispatch(setCurrentCategoryId(0))
      toggleDialog()
    },[])
  useEffect(
    () => {
      const onCompleted = data=>{
        dispatch(setCategories(data.categories))
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
 
  return (loading?"Loading":
  error?"Error: "+error:(
    <div>
      <BreadCrumb 
 
        open={openDialog}
        toggleDialog={toggleDialog}
 
      />
      <SearchSubcategories
        open={openDialog}
        toggleDialog={toggleDialog}
      
        
      />
    </div>
  ))
}


export default DetailedProduct
