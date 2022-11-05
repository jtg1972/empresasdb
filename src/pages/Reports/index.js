import gql from 'graphql-tag'
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb'
import FormButton from '../../components/Forms/FormButton'
import SearchSubcategories from '../../components/SearchSubcategories'
import './styles.scss'

const mapToState=({categories})=>({
  currentCategory:categories.currentCategory,
  categories:categories.categories,
  categoryProducts:categories.categoryProducts
})

const Reports=()=>{
  const {
    currentCategory,
    categories,
    categoryProducts
  }=useSelector(mapToState)
  const [openDialog,setOpenDialog]=useState(false)
  const toggleDialog=()=>{setOpenDialog(!openDialog)}
  const [showFields,setShowFields]=useState(false)
  const [fieldsShown,setFieldsShown]=useState([])
  const [otmChoices,setOtmChoices]=useState({})
  const[firstCatNormalFields,setFirstCatNormalFields]=useState([])
  const [reportShow,setReportShow]=useState(false)
  console.log("otmchoices",otmChoices,fieldsShown,firstCatNormalFields)
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
    sonOtmChoices={...sonOtmChoices,[name]:{normal:[],otm:[]}}
    const sons=Object.keys(sonOtmChoices).
    filter(i=>i.startsWith(cc))
    console.log("current sons",name,sons,sonOtmChoices,cc)
    sons.forEach(y=>{
      sonOtmChoices={...sonOtmChoices,[y]:{otm:[],normal:[]}}
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
      console.log("otmchoices",otm,mainCat)
      console.log("arr",[...fieldsShown,name1])
      if(otm==true)
        setFieldsShown(x=>([...x,name1]))
      if(mainCat){
        const n=`getData${padre}`
        let  nu={[n]:{otm:[],normal:[]}}
        if(firstCatNormalFields[n]==undefined)
          setFirstCatNormalFields(e=>({...e,...nu}))
        if(otm){
          setFirstCatNormalFields(o=>({...o,[n]:{...o[n],otm:[...o[n]["otm"],name1]}}))
          setOtmChoices(e=>({...e,[name1]:{otm:[],normal:[]}}))
        }else{
          setFirstCatNormalFields(o=>({...o,[n]:{...o[n],normal:[...o[n]["normal"],name1]}}))
        }
        //setFirstCatNormalFields(o=>([...o,name1]))
      }
      if(mainCat==false){
        if(otm){  
          
          
          setOtmChoices(e=>({...e,[name1]:{otm:[],normal:[]},[nameOtm]:{...e[nameOtm],otm:[...e[nameOtm]["otm"],name1]}}))
        
        }else{
          setOtmChoices(e=>({...e,/*[name1]:{otm:[],normal:[]},*/[nameOtm]:{...e[nameOtm],normal:[...e[nameOtm]["normal"],name1]}}))
        }
      }
      
    }else{
      console.log("arr",fieldsShown.filter(x=>x!==name1))
      if(otm==true)
        setFieldsShown(x=>x.filter(r=>r!==name1))
      if(mainCat){
        const n=`getData${padre}`
        if(otm){
          setFirstCatNormalFields(e=>{
            e={...e,[n]:{...e[n],otm:[...e[n]["otm"].filter(x=>x!==name1)]}}
            return e
          })
        }else{
          setFirstCatNormalFields(e=>{
            e={...e,[n]:{...e[n],normal:[...e[n]["normal"].filter(x=>x!==name1)]}}
            return e
          })
        }
        
      }
      if(mainCat==false){
        if(otm){  
          
          
          setOtmChoices(e=>({...e,[name1]:{normal:[],otm:[]},[nameOtm]:{...e[nameOtm],otm:[...e[nameOtm]["otm"].filter(u=>u!==name1)]}}))
        
        }else{
          setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],normal:[...e[nameOtm]["normal"].filter(u=>u!==name1)]}}))
        }
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
            
            setOtmChoices(e=>({...e,[name]:{...e[name],normal:[...e[name]["normal"],"1"]}}))
          }else{
            console.log("res11",{...otmChoices,[name]:{...otmChoices[name],normal:[...otmChoices[name]["normal"],"1"]}})
            setOtmChoices(e=>({...e,[name]:{...e[name],normal:[...e[name]["normal"].filter(
              x=>x!=="1")]}}))
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
            
            setOtmChoices(e=>({...e,[name]:{...e[name],normal:[...e[name]["normal"],"2"]}}))
          }else{
            console.log("res11",{...otmChoices,[name]:{...otmChoices[name],normal:[...otmChoices[name]["normal"],"1"]}})
            setOtmChoices(e=>({...e,[name]:{...e[name],normal:[...e[name]["normal"].filter(
              x=>x!=="2")]}}))
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
            
            setOtmChoices(e=>({...e,[name]:{...e[name],normal:[...e[name]["normal"],"3"]}}))
          }else{
            console.log("res11",{...otmChoices,[name]:{...otmChoices[name],normal:[...otmChoices[name]["normal"],"1"]}})
            setOtmChoices(e=>({...e,[name]:{...e[name],normal:[...e[name]["normal"].filter(
              x=>x!=="3")]}}))
          }
        }}/>
        <p>Total and Percentage of Parents Regarding Conditions of Son Atributes</p>
      </div>
      {displayCurCategory(catDestiny,false,false,name,false)}
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
      <p>HOla</p>
      {cat?.fields?.map(c=>{
        if(c.relationship=="onetomany"){
          return <>
            <input type="checkbox" 
            style={{marginRight:"5px", color:"white"}}
            onChange={(e)=>{
              /*if(nameOtm!=="" && e.target.checked==true)
                setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],[c.name]:true}}))
              else if(nameOtm!=="" && e.target.checked==false)
                setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],[c.name]:false}}))*/
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
const calculateInstancesNumber=(data,otmFieldName)=>{
  const total=data[otmFieldName].length
  return total
}

const beginReport=()=>{
  const parentNodeName=`getData${currentCategory.name}`
  const parentNode=firstCatNormalFields[parentNodeName]
  console.log("importa",parentNode,parentNodeName,firstCatNormalFields)
  return displayReport(parentNodeName,parentNode)



}
const displayReport=(parentNodeName,parentNode)=>{
  const singleFields=parentNode["normal"]
  const otmFields=parentNode["otm"]
  let data=categoryProducts[parentNodeName]
 /*return otmFields.map(x=>{
    const otmNameNode=otmChoices[x]
    if(otmNameNode["normal"].includes("1")){
      return displayReport1(parentNode,parentNodeName,singleFields,otmFields,data)
    }
  })*/
  return displayReport1(parentNode,parentNodeName,singleFields,otmFields,data)

  
}

const displayReport1=(parentNode,parentNodeName,singleFields,otmFields,data)=>{
  //const otmNameNode=otmChoices[otmName]
  //const dataParent=categoryProducts[parentNodeName]
  return (
  <>
    <p>Sons of {parentNodeName}</p>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          {singleFields.map(t=>{
            return <th>{t}</th>
          })}
          {otmFields.map(y=>
              <th>{y} Instances</th>  
            )}
          
        </tr>
      </thead>
      <tbody>
        {data.map(e=>{
          return <tr>
            <th>{e.id}</th>
            {singleFields.map(t=>{
            return <td>{e[t]}</td>
            })}
            {otmFields.map(y=>
              <th>{calculateInstancesNumber(e,y)}</th>  
            )}
            
          </tr>

        })}
        
      </tbody>
    </table>
    

  </>
  )
}
  return <div className="reports">
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
    
    {showFields 
    && 
    displayCurCategory(currentCategory,true,true,"",true)
    }
    <FormButton onClick={()=>setReportShow(true)}>Show Report</FormButton>

    {reportShow && beginReport()}
  </div>
}

export default Reports