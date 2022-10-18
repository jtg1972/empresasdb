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
  const[firstCatFields,setFirstCatFields]=useState([])
  console.log("otmchoices",otmChoices,fieldsShown,firstCatFields)
  useEffect(()=>{
    setShowFields(false)
    setFieldsShown([])
  },[currentCategory])
 let sonOtmChoices={}
 console.log("sonotm")
  const clearOtmChoicesSons=(name,padre,choicesSonsvars)=>{
    const partialName=`otm${padre}`
    const lengthName=partialName.length
    let secname=name.substring(lengthName)
    let cc=`otm${secname}`
    console.log("cc",cc,name)
    sonOtmChoices={...sonOtmChoices,[name]:{}}
    
    
    const sons=Object.keys(sonOtmChoices).
    filter(i=>i.startsWith(cc))
    console.log("current sons",name,sons,sonOtmChoices,cc)
    sons.forEach(y=>{
      sonOtmChoices={...sonOtmChoices,[y]:{}}
      secname=`otm${secname}`
      let nv=y.substring(secname.length)
      console.log("nv",nv)
      clearOtmChoicesSons(y,nv,sonOtmChoices)
    
    })
    

  }

  const checkReview=(e,name1,otm=false,padre,nameOtm,mainCat=false)=>{
    if(otm && !e.target.checked){
      //clearOtmChoicesSons(name,padre)
      sonOtmChoices=otmChoices
      clearOtmChoicesSons(name1,padre,{...otmChoices})
      setOtmChoices(sonOtmChoices)
    }
    if(e.target.checked){
    
      console.log("arr",[...fieldsShown,name1])
      if(otm==true)
        setFieldsShown(x=>([...x,name1]))
      if(mainCat)
        setFirstCatFields(o=>([...o,name1]))
      if(mainCat==false){
        if(otm){  
          const n=`otm${padre}`
          setOtmChoices(e=>({...e,[name1]:{}}))
        }else{
          setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],[name1]:true}}))
        }
      }else{
        setOtmChoices(e=>({...e,[name1]:true}))
      }
      
    }else{
      console.log("arr",fieldsShown.filter(x=>x!==name1))
      if(otm==true)
        setFieldsShown(x=>x.filter(r=>r!==name1))
      if(mainCat)
        setFirstCatFields(o=>o.filter(y=>y!==name1))

      if(mainCat==false){
        if(otm)
          setOtmChoices(e=>({...e,[name1]:{}}))
        else{
          setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],[name1]:false}}))
        }

      }else{
        setOtmChoices(e=>({...e,[name1]:false}))
      }
      

    }
  }
  const isChecked=(name)=>{
    if(fieldsShown.filter(x=>x==name).length==1)
      return true
    return false
  }

  const displayMenu=(name,padre)=>{
    console.log("name",name)
    const partialName=`otm${padre}`
    const lengthName=partialName.length
    const destCatName=name.slice(lengthName)
    const catDestiny=categories.filter(c=>c.name==destCatName)[0]
    console.log("dcn",destCatName,catDestiny)
    
    if(isChecked(name)){
      return (
    <div style={{marginLeft:"10px",width:"100%",marginBottom:"10px"}}>
      <div style={{display:"flex"}}>
        <input 
        type="checkbox" 
        style={{marginRight:"10px"}}
        onChange={(e)=>{
          if(e.target.checked){
            console.log("res11",{...otmChoices,[name]:{...otmChoices[name],"1":true}})
            setOtmChoices(e=>({...e,[name]:{...e[name],"1":true}}))
          }else{
            console.log("res11",{...otmChoices,[name]:{...otmChoices[name],"1":false}})
            setOtmChoices(e=>({...e,[name]:{...e[name],"1":false}}))
          }

        }}/>
     
        <p>Number of Sons List</p>
      </div>
      <div style={{display:"flex", flexDirection:"row",alignItems:"start"}}>
        <input 
        type="checkbox" 
        style={{marginRight:"10px"}}
        onChange={(e)=>{
          if(e.target.checked){
            console.log("res11",{...otmChoices,[name]:{...otmChoices[name],"2":true}})
            setOtmChoices(e=>({...e,[name]:{...e[name],"2":true}}))
          }else{

            console.log("res11",{...otmChoices,[name]:{...otmChoices[name],"2":false}})

            setOtmChoices(e=>({...e,[name]:{...e[name],"2":false}}))
          }
        }}/>
        <p style={{flex:1}}>Total and Percentage of Parents Regarding Ranges of Total of Sons</p>
      </div>
      <div style={{display:"flex",flexDirection:"row",alignItems:"start"}}>
        <input 
        type="checkbox" 
        style={{marginRight:"10px"}}
        onChange={(e)=>{
          if(e.target.checked){
            console.log("res11",{...otmChoices,[name]:{...otmChoices[name],"3":true}})
            setOtmChoices(i=>({...i,[name]:{...i[name],"3":true}}))
          }else{
            console.log("res11",{...otmChoices,[name]:{...otmChoices[name],"3":false}})

            setOtmChoices(i=>({...i,[name]:{...i[name],"3":false}}))
          }
        }}/>
        <p>Total and Percentage of Parents Regarding Conditions of Son Atributes</p>
      </div>
      {displayCurCategory(catDestiny,false,false,name)}
    </div>
    )
    }else{
      delete otmChoices[name]
    }
  }


const displayCurCategory=(cat,primero,space=true,nameOtm="",mainCat=false)=>{
  if(cat && showFields){  
    return (
    <div style={{marginLeft:space?"10px":"0px",width:primero?"50%":"100%"}}>
      {cat?.fields?.map(c=>{
        if(c.relationship=="onetomany"){
          return <>
            <input type="checkbox" 
            style={{marginRight:"5px", color:"white"}}
            onChange={(e)=>{
              if(nameOtm!=="" && e.target.checked==true)
                setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],[c.name]:true}}))
              else if(nameOtm!=="" && e.target.checked==false)
                setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],[c.name]:false}}))
              checkReview(e,c.name,true,cat.name,nameOtm,mainCat)
            }}
            />
            <a style={{color:"green"}}>{c.name}</a>
            <br/>
            {isChecked(c.name) && displayMenu(c.name,cat.name)}
          </>
        }
        return <>
        <input type="checkbox" 
        style={{marginLeft:"0px",marginRight:"5px",color:"white"}}
        onChange={(e)=>checkReview(e,c.name,false,cat.name,nameOtm,mainCat)}/>
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
    
    {showFields && displayCurCategory(currentCategory,true,true,"",true)}
  </div>
}

export default Reports