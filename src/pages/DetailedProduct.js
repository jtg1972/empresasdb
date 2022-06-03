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
import EditProduct from '../components/EditProduct'
import NewProduct from '../components/NewProduct'
import AddFilter from '../components/AddFilter'
import DisplayFilterProductsTable from '../components/DisplayFilterProductsTable'
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
        relationship
        relationCategory
        queryCategory
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
  currentCategory:categories.currentCategory,
  loadingTable:categories.loadingTable,
  currentCategoryId:categories.currentCategoryId,
  tablesStateStatus:categories.tablesStateStatus
})

const DetailedProduct = () => {
  const dispatch=useDispatch()
  const {
    categories,
    currentCategory,
    loadingTable,
    currentCategoryId,
    tablesStateStatus
  }=useSelector(mapToState) 
  const [respCat,setRespCat]=useState({}) 
  const [titles,setTitles]=useState([])
  const [editFields,setEditFields]=useState({})  
  const [fieldId,setFieldId]=useState(0)
  const [fieldName,setFieldName]=useState("")
  const [searchProductsFilter,setSearchProductsFilter]=useState(false)
  const toggleSearchProductsFilter=(titles1)=>{
    setSearchProductsFilter(!searchProductsFilter)
  }
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

  const [openEditProduct,setOpenEditProduct]=useState(false)
  const toggleEditProduct=(editFields1,c1,ti,par,tit)=>{
    setEditFields(editFields1)
    setRespCat(c1)
    setTableIndexes(ti)
    setPartials(par)
    setTitulo(tit)
    setOpenEditProduct(!openEditProduct)
    
  }
  const [tableIndexes,setTableIndexes]=useState({})
  const [partials,setPartials]=useState([])
  const [openNewProduct,setOpenNewProduct]=useState("")
  const [titulo,setTitulo]=useState("")
  const [parentId,setParentId]=useState(-1)
  const toggleNewProduct=(rc,ti,ps,tit,pid)=>{
    setRespCat(rc)
    setTableIndexes(ti)
    setPartials(ps)
    setTitulo(tit)
    setParentId(pid)
    setOpenNewProduct(!openNewProduct)
    
  }
  const [openFilter,setOpenFilter]=useState(false)
  const toggleFilter=(titles1)=>{
    if(openFilter==true){
      setTitles(titles1)
    }
    setOpenFilter(!openFilter)
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
      {currentCategoryId!==0 &&
      currentCategory.fields.length>0 
      && tablesStateStatus=="OK" 
      && respCat
      &&
      <EditProduct
      open={openEditProduct}
      toggleDialog={toggleEditProduct}
      editFields={editFields}
      setEditFields={setEditFields}
      curCat={respCat}
      tableIndexes={tableIndexes}
      partials={partials}
      titulo={titulo}
      />}

      <AddMultipleValue
        open={openMultipleValue}
        toggleDialog={toggleMultipleValue}
        fieldId={fieldId}
        fieldName={fieldName}
      />

      {respCat 
      &&
      respCat?.fields?.length>0 
      && 
      tablesStateStatus=="OK"
      && <NewProduct
        open={openNewProduct}
        toggleDialog={toggleNewProduct}
        respCat={respCat}
        tableIndexes={tableIndexes}
        partials={partials}
        titulo={titulo}
        parentId={parentId}
      />
      }
      {/*currentCategoryId!==0 &&
      currentCategory.fields.length>0 &&
      tablesStateStatus=="OK" &&
      <AddFilter
      open={openFilter}
      toggleDialog={toggleFilter}
      searchProductsFilter={searchProductsFilter}
      setSearchProductsFilter={setSearchProductsFilter}
      toggleFilter={toggleFilter}
      />*/}
      <DisplayWholeCategoryFieldsTable
      toggleDialogField={toggleDialogField}
      toggleDialogStructure={toggleMultipleValue}
      />
      {tablesStateStatus!=="OK" &&
        <DisplayTableStatus/>
      }

      {currentCategoryId!==0 &&
      currentCategory.fields.length>0 &&
      tablesStateStatus=="OK" &&
      searchProductsFilter==false &&
      <DisplayWholeProductsTable
      toggleEditProduct={toggleEditProduct}
      toggleNewProduct={toggleNewProduct}
      toggleFilter={toggleFilter}
      searchProductsFilter={searchProductsFilter}
      />}

      {currentCategoryId!=0 &&
      currentCategory.fields.length>0 &&
      tablesStateStatus=="OK" &&
      searchProductsFilter &&
      <DisplayFilterProductsTable
      setSearchProductsFilter={setSearchProductsFilter}
      titles={titles}/>
      }
    </div>
  ))
}


export default DetailedProduct
