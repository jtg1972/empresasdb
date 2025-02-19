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
      manyToMany
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
        targets
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
  const [respCat1,setRespCat1]=useState({}) 
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
  const [keyFields,setKeyFields]=useState({})
  const [otrotitulo,setOtroTitulo]=useState("")
  const [indexInTable,setIndexInTable]=useState(-1)
  const toggleEditProduct=(editFields1,c1,ti,par,tit,kf,ot,iit)=>{
    setEditFields(editFields1)
    console.log("c1,",c1)
    setRespCat(c1)
    setTableIndexes(ti)
    setPartials(par)
    setTitulo(tit)
    if(kf!==undefined)
      setKeyFields(kf)
    setOtroTitulo(ot)
    setIndexInTable(iit)
  //setParentRelation(pr)
    setOpenEditProduct(!openEditProduct)
    
  }
  const [tableIndexes,setTableIndexes]=useState({})
  const [partials,setPartials]=useState([])
  const [openNewProduct,setOpenNewProduct]=useState("")
  const [titulo,setTitulo]=useState("")
  const [parentId,setParentId]=useState(-1)
  const [isManyToMany,setIsManyToMany]=useState(false)
  const [relationCategory,setRelationCategory]=useState(-1)
  const [parentRelation,setParentRelation]=useState(-1)
  const [parentCatId,setParentCatId]=useState(-1)
  const toggleNewProduct=(rc,ti,ps,tit,pid,iMtM,relCat,pr,pcid)=>{
    //console.log("parentcatIddetprod",pcid)
    setRespCat1(rc)
    setTableIndexes(ti)
    setPartials(ps)
    setTitulo(tit)
    setParentId(pid)
    setIsManyToMany(iMtM)
    setRelationCategory(relCat)
    setParentRelation(pr)
    setParentCatId(pcid)
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
        //console.log("dataaa",data)
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
        //console.log("dataaats",data1)
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

      {currentCategoryId!==0
      &&
      <StructureField
      open={openDialogField}
      toggleDialog={toggleDialogField}
      
      />}
      {openEditProduct &&
      currentCategoryId!==0 &&
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
      keyFields={keyFields}
      isManyToMany={Object.keys(keyFields).length>0}
      otrotitulo={otrotitulo}
      setTableIndexes={setTableIndexes}
      indexInTable={indexInTable}
      parentRelation={parentRelation}
      />}

      <AddMultipleValue
        open={openMultipleValue}
        toggleDialog={toggleMultipleValue}
        fieldId={fieldId}
        fieldName={fieldName}
      />

      {openNewProduct &&
      respCat1 
      &&
      respCat1?.fields?.length>0 
      && 
      tablesStateStatus=="OK"
      && <NewProduct
        open={openNewProduct}
        toggleDialog={toggleNewProduct}
        respCat={respCat1}
        tableIndexes={tableIndexes}
        partials={partials}
        titulo={titulo}
        parentId={parentId}
        isManyToMany={isManyToMany}
        relationCategory={relationCategory}
        parentRelation={parentRelation}
        parentCatId={parentCatId}
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