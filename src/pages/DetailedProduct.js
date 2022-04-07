import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router'
import {useQuery,gql} from '@apollo/client'
import BreadCrumb from '../components/BreadCrumb'
import { useDispatch, useSelector } from 'react-redux'
import { loadingTable, setCategories, setCurrentCategory, setCurrentCategoryId, setTablesState } from '../redux/category/actions'
import SearchSubcategories from '../components/SearchSubcategories'
import StructureField from '../components/StructureField'
import DisplayWholeCategoryFieldsTable from '../components/DisplayWholeCategoryFieldsTable'
import './styles.scss'
import AddMultipleValue from '../components/DisplayWholeCategoryFieldsTable/DisplayCategoryFieldsTable/DisplayRow/AddMultipleValue'
import DisplayWholeProductsTable from '../components/DisplayWholeProductsTable'
import DisplayTableStatus from '../components/DisplayTableStatus'
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

export const GET_TABLES_STATE=gql`
query TableStates {
  tableStates {
    id
    category
    name
    state
  }
}
`
const mapToState=({categories})=>({
  categories:categories.categories,
  loadingTable:categories.loadingTable,
  currentCategoryId:categories.currentCategoryId,
  tablesStateStatus:categories.tablesStateStatus
})

const DetailedProduct = () => {
  const dispatch=useDispatch()
  const {
    categories,
    loadingTable,
    currentCategoryId,
    tablesStateStatus
  }=useSelector(mapToState)    
  const [fieldId,setFieldId]=useState(0)
  const [fieldName,setFieldName]=useState("")
  const [openDialog,setOpenDialog]=useState(false)
  const toggleDialog=()=>setOpenDialog(!openDialog)
  const [openDialogField,setOpenDialogField]=useState(false)
  const toggleDialogField=(fieldId)=>{
    setFieldId(fieldId)
    setOpenDialogField(!openDialogField)
  }
  const [openMultipleValue,setOpenMultipleValue]=useState(false)
  const toggleMultipleValue=(id,fn)=>{
    setFieldId(id)
    setFieldName(fn)
    setOpenMultipleValue(!openMultipleValue)
  }
  const {loading,data,error}=useQuery(
    CATEGORIES1
  )
  const {loading:loading1,data:data1,error:error1}=useQuery(
    GET_TABLES_STATE
  )

    useEffect(()=>{
      //dispatch(setCurrentCategoryId(0))
      toggleDialog()
    },[])
  useEffect(
    () => {
      const onCompleted = data=>{
        console.log("dataaa",data)
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
  useEffect(
    () => {
      const onCompleted = data1=>{
        console.log("dataaats",data1)
        dispatch(setTablesState(data1.tableStates))
        //dispatch(setCurrentCategoryId(0))
        
      }
      const onError = error => {
        return (
          <div>{error}</div>
        )
      }
      if (onCompleted || onError) {
        if (onCompleted && !loading1 && !error1) {
          onCompleted(data1)
        } else if (onError && !loading1 && error1) {
          onError(error1)
        }
      }
    },
    [loading1, data1, error1]
  )
  if(loadingTable==true){
    return <p style={{color:"white",
  backgroundColor:"black"}}>LOADING</p>
  }
 
  return (loading?"Loading":
  error?"Error: "+error:(
    <div className="detailedProduct">
      <BreadCrumb 
 
        open={openDialog}
        toggleDialog={toggleDialog}
 
      />
      <SearchSubcategories
      open={openDialog}
      toggleDialog={toggleDialog}       
      />

      <StructureField
      open={openDialogField}
      toggleDialog={toggleDialogField}
      
      />

      <AddMultipleValue
        open={openMultipleValue}
        toggleDialog={toggleMultipleValue}
        fieldId={fieldId}
        fieldName={fieldName}
      />
      <DisplayWholeCategoryFieldsTable
      toggleDialogField={toggleDialogField}
      toggleDialogStructure={toggleMultipleValue}
      />
      {tablesStateStatus!=="OK" &&
        <DisplayTableStatus/>
      }

      {currentCategoryId!==0 &&
      tablesStateStatus=="OK" &&
      <DisplayWholeProductsTable/>}
    </div>
  ))
}


export default DetailedProduct
