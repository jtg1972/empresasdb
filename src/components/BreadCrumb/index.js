import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCurrentCategory, setCurrentCategoryId } from '../../redux/category/actions'
import './styles.scss'
const mapToState=({categories})=>
({
  currentCategoryId:categories.currentCategoryId,
  category:categories.currentCategory

})

const BreadCrumb = ({
  
  toggleDialog,
  
}) => {
  const dispatch=useDispatch()
  const {currentCategoryId,category}=useSelector(mapToState)
  const history=useNavigate()
  console.log("bookmar",category)
  return (
    <div className="breadcrumb">
      <div className="pill"
        onClick={(e)=>{
          dispatch(setCurrentCategoryId(0))
          toggleDialog()
        }}>
          <span>Root</span>

          
        </div>
      {category?.bookmark?.map((cat,index)=>
        <div className="pill"
        key={index}
        onClick={(e)=>{
          dispatch(setCurrentCategoryId(cat.id))
          if(cat.typeOfCategory==1){
            toggleDialog()
          }
        }}>
          <span>{cat.name}</span>

          
        </div>)
      }
    </div>
  )
}

export default BreadCrumb
