import gql from 'graphql-tag'
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb'
import FormButton from '../../components/Forms/FormButton'
import SearchSubcategories from '../../components/SearchSubcategories'
import './styles.scss'

const mapToState=({categories})=>({
  currentCategory:categories.currentCategory,
  categories:categories.categories
})

const Reports=()=>{
  const {currentCategory,categories}=useSelector(mapToState)
  const [openDialog,setOpenDialog]=useState(false)
  const toggleDialog=()=>{setOpenDialog(!openDialog)}
  const [showFields,setShowFields]=useState(false)
  const [fieldsShown,setFieldsShown]=useState([])
  const [otmChoices,setOtmChoices]=useState({})

  useEffect(()=>{
    setShowFields(false)
    setFieldsShown([])
  },[currentCategory])

  const checkReview=(e,name)=>{
    if(e.target.checked){
      console.log("arr",[...fieldsShown,name])
      setFieldsShown(x=>([...x,name]))
    }else{
      console.log("arr",fieldsShown.filter(x=>x!==name))
      setFieldsShown(x=>x.filter(r=>r!==name))
    }
  }
  const isChecked=(name)=>{
    if(fieldsShown.filter(x=>x==name).length==1)
      return true
    return false
  }

  const displayMenu=(name)=>{
    const partialName=`otm${currentCategory.name}`
    const lengthName=partialName.length
    const destCatName=name.slice(lengthName)
    const catDestiny=categories.filter(c=>c.name==destCatName)[0]
    console.log("dcn",destCatName,catDestiny)
    return (
    <div style={{marginLeft:"10px",width:"100%",marginBottom:"10px"}} >
      <div style={{display:"flex"}}><input type="checkbox" style={{marginRight:"10px"}}/><p>Number of Sons List</p></div>
      <div style={{display:"flex", flexDirection:"row",alignItems:"start"}}><input type="checkbox" style={{marginRight:"10px"}}/><p style={{flex:1}}>Total and Percentage of Parents Regarding Ranges of Total of Sons</p></div>
      <div style={{display:"flex",flexDirection:"row",alignItems:"start"}}><input type="checkbox" style={{marginRight:"10px"}}/><p>Total and Percentage of Parents Regarding Conditions of Son Atributes</p></div>
      {displayCurCategory(catDestiny,false,false)}
    </div>
    )
  }
const displayCurCategory=(cat,primero,space=true)=>{
  if(cat && showFields){  
    return (
    <div style={{marginLeft:space?"10px":"0px",width:primero?"50%":"100%"}}>
      {cat?.fields?.map(c=>{
        if(c.relationship=="onetomany"){
          return <>
            <input type="checkbox" 
            style={{marginRight:"5px", color:"white"}}
            onChange={(e)=>checkReview(e,c.name)}
            />
            <a style={{color:"green"}}>{c.name}</a>
            <br/>
            {isChecked(c.name) && displayMenu(c.name)}
          </>
        }
        return <>
        <input type="checkbox" 
        style={{marginLeft:"0px",marginRight:"5px",color:"white"}}
        onChange={(e)=>checkReview(e,c.name)}/>
          {c.name}
          <br/>
        </>
      })
      
      }
    </div>)
  }

}
  return <div>
    <BreadCrumb toggleDialog={toggleDialog}/>
    {openDialog && 
    <SearchSubcategories
      open={openDialog}
      toggleDialog={toggleDialog}/>}
    <FormButton
      onClick={()=>{
        setShowFields(true)
        console.log("Add new report")
      }}>
      Add New Report
    </FormButton>
    
    {showFields && displayCurCategory(currentCategory,true)}
  </div>
}

export default Reports