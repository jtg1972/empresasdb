import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router'
import { addCategory, searchCategories, setCategories, setCurrentCategory, setCurrentCategoryId, setCurrentSons } from '../../redux/category/actions'
import Dialog from '../Dialog'
import FormInput from '../Forms/FormInput'
import FormButton from '../Forms/FormButton'
import DisplaySubcategoriesCombo from './DisplaySubcategoriesCombo'
import './styles.scss'
const CREATE_CATEGORY=gql`
mutation CreateCategory($name: String!, $parentCategory: Int,$typeOfCategory: Int) {
  createCategory(name: $name, parentCategory: $parentCategory, typeOfCategory: $typeOfCategory) {
    id
    name
    parentCategories
    parentCategory
    typeOfCategory
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
    }
  }
}
`
const mapToState=({categories})=>({
  currentCategory:categories.currentCategory,
  currentSons:categories.currentSons,
  categories:categories.categories,
  currentCategoryId:categories.currentCategoryId,
  scategories:categories.searchCategories
})
const SearchSubcategories = ({
  
  open,
  toggleDialog,
  
  
}) => {
  const dispatch=useDispatch()
  const {
    currentCategory,
    currentSons,
    currentCategoryId,
    scategories
  } =useSelector(mapToState)
  const [search,setSearch]=useState("")
  const [isSearching,setIsSearching]=useState(false)
  const [newCategory,setNewCategory]=useState("")
  const [createCategory]=useMutation(CREATE_CATEGORY,{
    update:(cache,{data})=>{
      const cats=cache.readQuery(
        {query:CATEGORIES1}
      )
      const newCat=data.createCategory
      console.log("ncid",newCat,newCat.id)
      cache.writeQuery({
        query:CATEGORIES1,
        data:{
          categories:[...cats.categories,newCat]
        }
        
      })
      dispatch(addCategory(newCat))
      //dispatch(setCurrentCategoryId(newCat.id))
    }})
  
  const insertCategory=(type)=>{
    console.log("type",type)
    createCategory({
      variables:{
        name:newCategory,
        parentCategory:parseInt(currentCategoryId),
        typeOfCategory:type
      }
    })
  }
  const inputSearchCategoriesConfig={
    onChange:e=>{
      setSearch(e.target.value)
    },
    placeholder:"Search subcategory",
    value:search
  }

  const buttonSearchCategoryConfig={
    onClick:()=>{
      setIsSearching(true)
      dispatch(searchCategories(search))
    }
  }

  const comboDisplaySubcategoriesNotSearch={
    subCategories:currentSons,
    setIsSearching:setIsSearching,
    toggleDialog:toggleDialog
  }

  const comboDisplaySubcategoriesSearch={
    subCategories:scategories,
    setIsSearching:setIsSearching,
    toggleDialog:toggleDialog

  }

  const categoryTitle=()=>{
    if(currentCategory!==undefined)
      return currentCategory.name
    else
      return "Root"
  }

  
  return (
    open
    ?
    <Dialog
    headline={`Category ${categoryTitle()}`}
    open={open}
    closeDialog={toggleDialog}>
      
      <FormInput
      {...inputSearchCategoriesConfig}
      />

      <FormButton
        {...buttonSearchCategoryConfig}    
      >Search</FormButton>

      {!isSearching
      ?
      <DisplaySubcategoriesCombo
        {...comboDisplaySubcategoriesNotSearch}
      />
      :
      <DisplaySubcategoriesCombo
        {...comboDisplaySubcategoriesSearch}
      />
      }

      <FormInput
        type="input"
        placeholder="Insert No Product Category"
        style={{width:"100%"}}
        onChange={e=>setNewCategory(e.target.value)}
        onKeyUp={(e)=>{
          if(e.key=="Enter"){
            insertCategory(1)

          }
        }}
      />
      <FormInput
        type="input"
        placeholder="Insert Product Category"
        style={{width:"100%"}}
        onChange={e=>setNewCategory(e.target.value)}
        onKeyUp={(e)=>{
          if(e.key=="Enter"){
            insertCategory(0)

          }
        }}
      />
      
    </Dialog>:null
  )
}

export default SearchSubcategories
/*{currentSons.length>0 && <select
        
  onChange={(c)=>{
    
    console.log("ctv",c.target.value)
    dispatch(setCurrentCategoryId(parseInt(c.target.value)))
  }
  }
>
  <option value="0">All Categories</option>
  {currentSons.map(e=>
    <option value={e.id}>{e.name}</option>  
  )}
</select>}*/
