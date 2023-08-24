import { getVariableValues } from 'graphql'
import gql from 'graphql-tag'
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import AddOtmIdFields from '../../AddOtmIdFields'
import { AddCompositeField } from '../../components/AddCompositeField'
import BreadCrumb from '../../components/BreadCrumb'
import FormButton from '../../components/Forms/FormButton'
import SearchSubcategories from '../../components/SearchSubcategories'
import { WhereStatementStringDialog } from '../../components/WhereStatementStringDialog'
import { WhereStatementNumberDialog } from '../../components/WhereStatementNumberDialog'
import './styles.scss'
import { WhereStatementHybridDialog } from '../../components/WhereStatementHybridDialog'
import { WhereSelectMainDialog } from '../../components/WhereSelectMainDialog'
import { ViewWhereStatementNumberDialog } from '../../components/ViewWhereStatementNumberDialog'
import { ViewWhereStatementStringDialog } from '../../components/ViewWhereStatementStringDialog'
import { ViewWhereStatementHybridDialog } from '../../components/VIewWhereStatementHybridDialog'
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
  const[specificOtmName,setSpecificOtmName]=useState("")
  const [openCompositeFieldDialog,setOpenCompositeFieldDialog]=useState(false)
  const toggleCompositeFieldDialog=(name)=>{
    setSpecificOtmName(name)
    setOpenCompositeFieldDialog(!openCompositeFieldDialog)
  }
  const [varsHeadWhereStatement,setVarsHeadWhereStatement]=useState({})
  const [openWhereStatementStringDialog,setOpenWhereStatementStringDialog]=useState(false)
  const toggleOpenWhereStatementStringDialog=(vars)=>{
    console.log("vars22",vars)
    setVarsHeadWhereStatement(vars)
    setOpenWhereStatementStringDialog(!openWhereStatementStringDialog)
  }
  const [openWhereStatementNumberDialog,setOpenWhereStatementNumberDialog]=useState(false)
  const toggleOpenWhereStatementNumberDialog=(vars)=>{
    console.log("vars22",vars)
    setVarsHeadWhereStatement(vars)
    setOpenWhereStatementNumberDialog(!openWhereStatementNumberDialog)
  }
  const [openWhereStatementHybridDialog,setOpenWhereStatementHybridDialog]=useState(false)
  const toggleOpenWhereStatementHybridDialog=(vars)=>{
    console.log("vars22",vars)
    setVarsHeadWhereStatement(vars)
    setOpenWhereStatementHybridDialog(!openWhereStatementHybridDialog)
  }
  const [openWhereSelectMain,setOpenWhereSelectMain]=useState(false)
  const toggleOpenWhereSelectMain=(vars)=>{
    setVarsHeadWhereStatement(vars)
    setOpenWhereSelectMain(!openWhereSelectMain)
  }
  const [openOtmIdFieldsDialog,setOpenOtmIdFields]=useState(false)
  const toggleOtmIdFieldsDialog=()=>setOpenOtmIdFields(!openOtmIdFieldsDialog)
  const [otmCategoryFields,setOtmCategoryFields]=useState([])
  const [allFieldsByOtm,setAllFieldsByOtm]=useState({})
  const [compFieldsArray,setCompFieldsArray]=useState([])
  const[allCompFieldsCluster,setAllCompFieldsCluster]=useState([])
  const[conditionsWhere,setConditionsWhere]=useState({})

  const [listOfViewConditions,setListOfViewConditions]=useState([])

  const[openViewWhereStatementNumberDialog,setOpenViewWhereStatementNumberDialog]=useState(false)
  const toggleOpenViewWhereStatementNumberDialog=(values,vars)=>{
    setListOfViewConditions(values)
    setVarsHeadWhereStatement(vars)

    setOpenViewWhereStatementNumberDialog(!openViewWhereStatementNumberDialog)

  }

  const[openViewWhereStatementStringDialog,setOpenViewWhereStatementStringDialog]=useState(false)
  const toggleOpenViewWhereStatementStringDialog=(values,vars)=>{
    setListOfViewConditions(values)
    setVarsHeadWhereStatement(vars)

    setOpenViewWhereStatementStringDialog(!openViewWhereStatementStringDialog)

  }
  const[openViewWhereStatementHybridDialog,setOpenViewWhereStatementHybridDialog]=useState(false)
  const toggleOpenViewWhereStatementHybridDialog=(values,vars)=>{

    setListOfViewConditions(values)
    setVarsHeadWhereStatement(vars)

    setOpenViewWhereStatementHybridDialog(!openViewWhereStatementHybridDialog)

  }

  let subTotals={}
  const [grandTotalsSt,setGrandTotalsSt]=useState({})
  const [comboDataSt,setComboDataSt]=useState({})
  console.log("otmchoices",otmChoices)//,fieldsShown,firstCatNormalFields)
  useEffect(()=>{
    setShowFields(false)
    setFieldsShown([])
  },[currentCategory])
 let sonOtmChoices={}
 //console.log("sonotm")
 let grandTotals={}
 //console.log("grandTotals",grandTotalsSt)
  const clearOtmChoicesSons=(name,padre,choicesSonsvars)=>{
    const partialName=`otm${padre}`
    const lengthName=partialName.length
    let secname=name.substring(lengthName)
    let cc=`otm${secname}`
    //console.log("cc",cc,name)
    sonOtmChoices={...sonOtmChoices,[name]:{normal:[],otm:[],otmdestiny:[],options:[],compositeFields:[]}}
    const sons=Object.keys(sonOtmChoices).
    filter(i=>i.startsWith(cc))
    //console.log("current sons",name,sons,sonOtmChoices,cc)
    sons.forEach(y=>{
      sonOtmChoices={...sonOtmChoices,[y]:{otm:[],normal:[],options:[],otmdestiny:[],compositeFields:[]}}
      secname=`otm${secname}`
      let nv=y.substring(secname.length)
      //console.log("nv",nv)
      clearOtmChoicesSons(y,nv,sonOtmChoices)
    
    })
    

  }

  const checkReview=(e,name1,otm=false,padre,nameOtm,mainCat=false,declaredType,otmdestiny="",cf=false,dcf={})=>{
    if(otm && !e.target.checked){
      //clearOtmChoicesSons(name,padre)
      sonOtmChoices=otmChoices
      clearOtmChoicesSons(name1,padre,{...otmChoices})
      setOtmChoices(sonOtmChoices)
    }
    if(e.target.checked){
      //console.log("otmchoices",otm,mainCat)
      //console.log("arr",[...fieldsShown,name1])
      if(otm==true)
        setFieldsShown(x=>([...x,name1]))
      if(mainCat){
        setAllCompFieldsCluster(compFieldsArray[`getData${currentCategory.name}`])

        const n=`getData${padre}`
        let  nu={[n]:{otm:[],normal:[],options:[],otmdestiny:[],compositeFields:[]}}
        if(firstCatNormalFields[n]==undefined)
          setFirstCatNormalFields(e=>({...e,...nu}))
        if(otm){
          setFirstCatNormalFields(o=>({...o,[n]:{...o[n],otm:[...o[n]["otm"],name1]}}))
          setOtmChoices(e=>({...e,[name1]:{otm:[],normal:[],options:[],otmdestiny:[],compositeFields:[]}}))
        }else if(otmdestiny=="otmdestiny"){
          setFirstCatNormalFields(o=>({...o,[n]:{...o[n],otmdestiny:[...o[n]["otmdestiny"],name1]}}))


          setOtmChoices(e=>({...e,[name1]:{otm:[],normal:[],options:[],otmdestiny:[],compositeFields:[]}}))
        }else if(cf==true){
          setFirstCatNormalFields(o=>({...o,[n]:{...o[n],compositeFields:[...o[n]["compositeFields"],dcf]}}))
        }
        else{
          //setFirstCatNormalFields(o=>({...o,[n]:{...o[n],normal:[...o[n]["normal"],name1]}}))
          setFirstCatNormalFields(o=>({...o,[n]:{...o[n],normal:[...o[n]["normal"],{type:declaredType,name1}]}}))
        }
      }
      if(mainCat==false){
        setAllCompFieldsCluster(compFieldsArray[nameOtm])

        if(otm){  
          
          
          setOtmChoices(e=>({...e,[name1]:{otm:[],normal:[],options:[],otmdestiny:[],compositeFields:[]},[nameOtm]:{...e[nameOtm],otm:[...e[nameOtm]["otm"],name1]}}))
        
        }else if(otmdestiny=="otmdestiny"){
          setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],otmdestiny:[...e[nameOtm]["otmdestiny"],name1]}}))
        }else if(cf==true){
          setOtmChoices(o=>({...o,[nameOtm]:{...o[nameOtm],compositeFields:[...o[nameOtm]["compositeFields"],dcf]}}))
        }else{
          setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],normal:[...e[nameOtm]["normal"],{name1,type:declaredType}]}}))
        }
      }
      
    }else{
      //console.log("arr",fieldsShown.filter(x=>x!==name1))
      if(otm==true)
        setFieldsShown(x=>x.filter(r=>r!==name1))
      if(mainCat){
        const n=`getData${padre}`
        if(otm){
          setFirstCatNormalFields(e=>{
            e={...e,[n]:{...e[n],otm:[...e[n]["otm"].filter(x=>x!==name1)]}}
            return e
          })
        }else if(otmdestiny=="otmdestiny"){
          setFirstCatNormalFields(e=>{
            e={...e,[n]:{...e[n],otmdestiny:[...e[n]["otmdestiny"].filter(x=>x.name1!==name1)]}}
            return e
          })
        }else if(cf==true){
          setFirstCatNormalFields(e=>{
            e={...e,[n]:{...e[n],compositeFields:[...e[n]["compositeFields"].filter(x=>x.name1!==name1)]}}
            return e
          })
        }else{
          setFirstCatNormalFields(e=>{
            e={...e,[n]:{...e[n],normal:[...e[n]["normal"].filter(x=>x.name1!==name1)]}}
            return e
          })
        }
        
      }
      if(mainCat==false){
        if(otm){  
          
          
          setOtmChoices(e=>({...e,[name1]:{normal:[],otm:[],otmdestiny:[]},[nameOtm]:{...e[nameOtm],otm:[...e[nameOtm]["otm"].filter(u=>u!==name1)]}}))
        
        }else if(otmdestiny=="otmdestiny"){
          setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],otmdestiny:[...e[nameOtm]["otmdestiny"].filter(u=>u.name1!==name1)]}}))
        }else if(cf==true){
          setOtmChoices(e=>{
            e={...e,[nameOtm]:{...e[nameOtm],compositeFields:[...e[nameOtm]["compositeFields"].filter(x=>x.name1!==name1)]}}
            return e
          })
        }else{
          setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],normal:[...e[nameOtm]["normal"].filter(u=>u.name1!==name1)]}}))
        }
      }

      
      

    }
  }
  const isChecked=(name)=>{
    if(fieldsShown.filter(x=>x==name).length==1)
      return true
    return false
  }

  const displayAncestorsCats=(trackCatPath,ntm="")=>{
    let output=[]
    
    for(let l in trackCatPath){
      if(l<trackCatPath.length-1){
        output.push(<div>
          <p style={{color:"orange"}}>{trackCatPath[l]}</p>
          {otmChoices[trackCatPath[trackCatPath.length-1]]?.normal.map(x=>{
            if(x.type=="number")
              return <p><span style={{marginRight:"10px"}}>{x.name1}total</span><a  
              style={{textDecoration:"underline"}} onClick={
                (e)=>{
                  e.preventDefault()
                  console.log("bit1",trackCatPath[l],ntm,`${x.name1}total`)
                  toggleOpenWhereStatementNumberDialog({
                    categoryName:trackCatPath[l],
                    fieldName:`${x.name1}total`,
                    segment:ntm
                  })
                }
              }>xAdd where condition</a>
              <p>{displayWhereClauses(trackCatPath[l],`${x.name1}total`,ntm)}</p>
              </p>
          
          })}
          
          {otmChoices[trackCatPath[trackCatPath.length-1]]?.compositeFields.map(x=>{
            if(x.type=="number")
            return <p><span style={{marginRight:"10px"}}>{x.name1}total</span><a  
            style={{textDecoration:"underline"}} onClick={
              (e)=>{
                e.preventDefault()
                console.log("bit1",trackCatPath[l],ntm,`${x.name1}total`)
                toggleOpenWhereStatementNumberDialog({
                categoryName:trackCatPath[l],
                fieldName:`${x.name1}total`,
                segment:ntm
              })
            }}>xAdd where condition</a>
            <p>{displayWhereClauses(trackCatPath[l],`${x.name1}total`,ntm)}</p>
            </p>
            
          })}
          
        </div>)

      }
        
    }
    return output
  }

  const displayMenu=(name,padre,trackCatPath)=>{
    //console.log("name",name)
    const partialName=`otm${padre}`
    const lengthName=partialName.length
    const destCatName=name.slice(lengthName)
    const catDestiny=categories.filter(c=>c.name==destCatName)[0]
    console.log("trackcatpath",trackCatPath)
    //console.log("dcn",destCatName,catDestiny)
    
    if(isChecked(name)){
      return (
    <div style={{marginLeft:"10px",width:"100%",marginBottom:"10px"}}>
      <div style={{display:"flex"}}>
        <input 
        type="checkbox" 
        style={{marginRight:"10px"}}
        onChange={(e)=>{
          if(e.target.checked){
            
            setOtmChoices(e=>({...e,[name]:{...e[name],options:[...e[name]["options"],"1"]}}))
          }else{
            //console.log("res11",{...otmChoices,[name]:{...otmChoices[name],normal:[...otmChoices[name]["normal"],"1"]}})
            setOtmChoices(e=>({...e,[name]:{...e[name],normal:[...e[name]["options"].filter(
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
            
            setOtmChoices(e=>({...e,[name]:{...e[name],normal:[...e[name]["options"],"2"]}}))
          }else{
            //console.log("res11",{...otmChoices,[name]:{...otmChoices[name],normal:[...otmChoices[name]["normal"],"1"]}})
            setOtmChoices(e=>({...e,[name]:{...e[name],normal:[...e[name]["options"].filter(
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
            
            setOtmChoices(e=>({...e,[name]:{...e[name],normal:[...e[name]["options"],"3"]}}))
          }else{
            //console.log("res11",{...otmChoices,[name]:{...otmChoices[name],normal:[...otmChoices[name]["normal"],"1"]}})
            setOtmChoices(e=>({...e,[name]:{...e[name],normal:[...e[name]["options"].filter(
              x=>x!=="3")]}}))
          }
        }}/>
        <p>Total and Percentage of Parents Regarding Conditions of Son Atributes</p>
      </div>
      <a style={{textDecoration:"underline"}}
      onClick={e=>{
        e.preventDefault()
        toggleOpenWhereSelectMain({
          categoryName:name
        }
        )
        }
      }
      >Add main where condition</a><br/>
      <a style={{textDecoration:"underline"}}
      onClick={e=>{
        e.preventDefault()
        toggleOpenWhereStatementHybridDialog({
          fieldName:"hybrid",
          categoryName:name,
          segment:"hybrid"
        })
      }
      }>Add multiple field where condition</a>
      {displayWhereClauses(name,"hybrid","hybrid")}
      {displayCurCategory(catDestiny,false,false,name,false,trackCatPath)}
      <FormButton style={{
        textAlign:"left",
        textDecoration:"underline",
        marginLeft:0,
        paddingLeft:0
      }} onClick={()=>{
        //console.log("click",otmChoices[name]["normal"])
        setOtmCategoryFields(pivote[name])
        toggleCompositeFieldDialog(name)
      }}>Add composite field</FormButton>
      {compFieldsArray[name]?.map(d=>{
          return <>
          {d.type=="number" && <p>

          
          <input type="checkbox" 
            style={{marginRight:"5px", color:"white"}}
            onChange={(e)=>{
              //const checkReview=(e,name1,otm=false,padre,nameOtm,mainCat=false,declaredType,otmdestiny="",cf=false)=>{

              checkReview(e,d.name1,false,"",name,false,true,"",true,d)
            }}
            />
            <a style={{color:"yellow", marginRight:"10px"}}>{d.name1}Number</a>
            {isReadyToWhere(name,d.name1,true) && <a  
            style={{textDecoration:"underline"}} onClick={
              (e)=>{
                e.preventDefault()
                toggleOpenWhereStatementNumberDialog({
                  fieldName:d.name1,
                  categoryName:name,
                  segment:name
                })
              }
            }>Add where condition</a>
            }
            x
            {displayWhereClauses(name,d.name1)}
            </p>
            
            
            
        }
        {d.type=="string" && <p>

          
        <input type="checkbox" 
          style={{marginRight:"5px", color:"white"}}
          onChange={(e)=>{
            //const checkReview=(e,name1,otm=false,padre,nameOtm,mainCat=false,declaredType,otmdestiny="",cf=false)=>{

            checkReview(e,d.name1,false,"",name,false,true,"",true,d)
          }}
          />
          <a style={{color:"yellow",marginRight:"10px"}}>{d.name1}String</a>
          {isReadyToWhere(name,d.name1,true) && <a  
            style={{textDecoration:"underline"}} onClick={
              (e)=>{
                e.preventDefault()
                
                toggleOpenWhereStatementStringDialog({categoryName:name,
                fieldName:d.name1,
                segment:name})
              }
            }>Add where condition</a>
          }
          x
          {displayWhereClauses(name,d.name1)}
          </p>
          
}</>})}
      <FormButton style={{
        textAlign:"left",
        textDecoration:"underline",
        marginLeft:0,
        paddingLeft:0
      }} onClick={()=>{
        //console.log("click")
        setOtmCategoryFields(pivote[name])

        toggleOtmIdFieldsDialog()
      }}>Add field to identify parent in child relationships</FormButton>
    </div>
    )
    }else{
      delete otmChoices[name]
    }
  }

let pivote={}

const isReadyToWhere=(otm,busca,comp=false)=>{
  let res=[]
  if(comp==false)
    return otmChoices[otm]?.normal.filter(x=>{
      if(x.name1==busca)
        return true
      return false
    }).length>=1?true:false
  else if (comp==true){
    return otmChoices[otm]?.compositeFields.filter(x=>{
      if(x.name1==busca)
        return true
      return false
    }).length>=1?true:false
  }
}
const isReadyToWhereFirst=(otm,busca,comp=false)=>{
  let res=[]
  if(comp==false){
    console.log("res222",busca,firstCatNormalFields[otm]?.normal.filter(x=>{
      if(x.name1==busca){
        console.log("istwf",true)
        return true
      }
      console.log("istwf",false)
      return false
    }).length>=1?true:false)
    return firstCatNormalFields[otm]?.normal.filter(x=>{
      if(x.name1==busca){
        console.log("istwf",true)
        return true
      }
      console.log("istwf",false)
      return false
    }).length>=1?true:false

  }else if (comp==true){
    return firstCatNormalFields[otm]?.compositeFields.filter(x=>{
      if(x.name1==busca)
        return true
      return false
    }).length>=1?true:false
  }
}

const displayWhereClauses=(cat,field,seg="")=>{
  
  let nc
  let ns
  nc=cat==""?`getData${currentCategory.name}`:cat
  ns=seg==""?nc:seg
  let cls=""
  console.log("bitac",nc,ns,field)
  if(ns=="hybrid"){
    if(conditionsWhere[nc]?.["hybrid"]?.["hybrid"]!==undefined){
      cls=Object.keys(conditionsWhere[nc]?.["hybrid"]?.["hybrid"]).map(x=>{
        if(x!=="categoryName" && x!=="fieldName" && x!=="segment" && x!=="type"){
          if(conditionsWhere[nc]?.["hybrid"]?.["hybrid"]?.["type"]=="hybrid")
            return <p style={{color:"yellow"}}
            onClick={()=>toggleOpenViewWhereStatementHybridDialog(conditionsWhere[nc]?.["hybrid"]?.["hybrid"]?.[x]?.["rule"],
            {
              fieldName:"hybrid",
              categoryName:nc,
              segment:"hybrid"
            })}>{x}</p>
          
        }
      
      })
    }
    return cls
  }
  //if(cat!==""){
    if(conditionsWhere[nc]?.[ns]?.[field]!==undefined){
      cls=Object.keys(conditionsWhere[nc]?.[ns]?.[field]).map(x=>{
        if(x!=="categoryName" && x!=="fieldName" && x!=="segment" && x!=="type"){
          if(conditionsWhere[nc]?.[ns]?.[field]?.["type"]=="number")
            return <p style={{color:"yellow"}}
            onClick={()=>toggleOpenViewWhereStatementNumberDialog(conditionsWhere[nc]?.[ns]?.[field]?.[x]?.["rule"],{
              fieldName:field,
              categoryName:nc,
              segment:ns
            })}>{x}</p>
          else if(conditionsWhere[nc]?.[ns]?.[field]?.["type"]=="string")
            return <p style={{color:"yellow"}}
              onClick={()=>toggleOpenViewWhereStatementStringDialog(conditionsWhere[nc]?.[ns]?.[field]?.[x]?.["rule"],{
                fieldName:field,
                categoryName:nc,
                segment:ns
              })}>{x}</p>
        }
      })
    return cls
    }
  /*}else{
    if(conditionsWhere[nc]?.[ns]?.[field]!==undefined)
      cls=Object.keys(conditionsWhere[nc]?.[ns]?.[field]).map(x=>{
        if(x!=="categoryName" && x!=="fieldName" && x!=="segment" && x!=="type"){
          return <p style={{color:"yellow"}}>{x}</p>
        }
      })
    return cls
  }*/

}

const displayCurCategory=(cat,primero,space=true,nameOtm="",mainCat=false,trackCatPath)=>{
  let fieldsSingle=[]
  
  if(pivote[`getData${currentCategory.name}`]==undefined)
    pivote={...pivote,[`getData${currentCategory.name}`]:[]}
  if(pivote[nameOtm]==undefined)
     pivote={...pivote,[nameOtm]:[]}
  
  if(cat && showFields){  
    return (
    <div style={{marginLeft:space?"10px":"0px",width:primero?"50%":"100%"}}>
      <p>HOla</p>
      {fieldsSingle=cat?.fields?.map(c=>{
        if(c.relationship=="onetomany"){
          return <>
            <input type="checkbox" 
            style={{marginRight:"5px", color:"white"}}
            onChange={(e)=>{
              checkReview(e,c.name,true,cat.name,nameOtm,mainCat)
            }}
            />
            <a style={{color:"green"}}>{c.name}</a>
            <br/>
            {isChecked(c.name) && displayMenu(c.name,cat.name,[...trackCatPath,c.name])}
          </>
        }
        if(nameOtm!=="")
          pivote={
            ...pivote,[nameOtm]:[...pivote[nameOtm],{name1:c.name,type:c.declaredType}]
          }
        else
          pivote={
          ...pivote,[`getData${currentCategory.name}`]:[...pivote[`getData${currentCategory.name}`],{name1:c.name,type:c.declaredType}]
          }
       
        //setAllFieldsByOtm(pivote)

          return <>
          
            {c.declaredType=="number" &&
            <p style={{marginBottom:"0px"}}>
              <input type="checkbox" 
          style={{marginLeft:"0px",marginRight:"5px",color:"white"}}
          onChange={(e)=>checkReview(e,c.name,false,cat.name,nameOtm,mainCat,c.declaredType,c.relationship)}/>
          
              <span style={{marginRight:"10px"}}>{c.name}Number</span>
              {nameOtm==""?isReadyToWhereFirst(`getData${currentCategory.name}`,c.name,false):
              isReadyToWhere(nameOtm,c.name,false) && <a  
            style={{textDecoration:"underline"}} onClick={
              (e)=>{
                e.preventDefault()
                if(nameOtm==""){
                    toggleOpenWhereStatementNumberDialog({
                      categoryName:`getData${currentCategory.name}`,
                      fieldName:c.name,
                      segment:`getData${currentCategory.name}`,
                    })
              
                }else{
                  toggleOpenWhereStatementNumberDialog({
                    categoryName:nameOtm,
                    fieldName:c.name,
                    segment:nameOtm
                  })
                }
              }
            }>Add where condition</a>}

            {c.name!==`${nameOtm}Id` && displayWhereClauses(nameOtm,c.name)}
            </p>
          }
          {c.declaredType=="string" &&
            <p style={{marginBottom:"0px"}}>
              <input type="checkbox" 
              style={{marginLeft:"0px",marginRight:"5px",color:"white"}}
               onChange={(e)=>checkReview(e,c.name,false,cat.name,nameOtm,mainCat,c.declaredType,c.relationship)}/>
          
              <span style={{marginRight:"10px"}}>{c.name}String</span>
              {(nameOtm==""?isReadyToWhereFirst(`getData${currentCategory.name}`,c.name,false):
              isReadyToWhere(nameOtm,c.name,false)) &&
              <a 
              style={{textDecoration:"underline",color:"white"}} onClick={
              (e)=>{
                e.preventDefault()
                if(nameOtm==""){
                    toggleOpenWhereStatementStringDialog({
                      categoryName:`getData${currentCategory.name}`,
                      fieldName:c.name,
                      segment:`getData${currentCategory.name}`
                    })
              
                }else{
                  toggleOpenWhereStatementStringDialog({
                    categoryName:nameOtm,
                    fieldName:c.name,
                    segment:nameOtm
                  })
                }
              }}>Add where condition</a>
              
              }
              {c.name!==`${nameOtm}Id` && displayWhereClauses(nameOtm,c.name)}
              
            
          
            
            
          </p>
          }
          </>

      })}
      {displayAncestorsCats(trackCatPath,nameOtm,cat.name)}

      {primero && fieldsSingle && <div>
        <a style={{textDecoration:"underline"}}
        onClick={e=>{
          e.preventDefault()
          toggleOpenWhereSelectMain({
            categoryName:`getData${currentCategory.name}`,
            fieldName:"hybrid",
            segment:"hybrid"
          })
          
          }
        }>Add main where condition</a><br/>
        <a style={{textDecoration:"underline"}}
        onClick={e=>{
          e.preventDefault()
          toggleOpenWhereStatementHybridDialog({
            categoryName:`getData${currentCategory.name}`,
            fieldName:"hybrid",
            segment:"hybrid"
          })
          }
        }
        >Add multiple field where condition</a>
      </div>}
      {displayWhereClauses(`getData${currentCategory.name}`,"hybrid","hybrid")}
      {primero && fieldsSingle && (<><FormButton style={{
          textAlign:"left",
          textDecoration:"underline",
          marginLeft:0,
          paddingLeft:0
        }} onClick={()=>{
          setOtmCategoryFields(pivote[`getData${currentCategory.name}`])
          toggleCompositeFieldDialog(`getData${currentCategory.name}`)
          //console.log("click")
        }}>Add composite field</FormButton>
        {compFieldsArray[`getData${currentCategory.name}`]?.map(d=>{
          //const displayCurCategory=(cat,primero,space=true,nameOtm="",mainCat=false)=>{

          return <>
          {d.type=="number" &&
          <p>
          <input type="checkbox" 
            style={{marginRight:"5px", color:"white"}}
            onChange={(e)=>{
                //const checkReview=(e,name1,otm=false,padre,nameOtm,mainCat=false,declaredType,otmdestiny="",cf=false)=>{

              
              checkReview(e,d.name1,false,cat.name,"",true,false,"",true,d)
            }}
            />
            
            <span style={{marginRight:"10px"}}>{d.name1}Number</span>
            {isReadyToWhereFirst(`getData${currentCategory.name}`,d.name1,true) &&
            <>
            <a  
            style={{textDecoration:"underline"}} onClick={
              (e)=>{
                e.preventDefault()
                toggleOpenWhereStatementNumberDialog({
                  categoryName:`getData${currentCategory.name}`,
                  fieldName:d.name1,
                  segment:`getData${currentCategory.name}`
                })
              }
            }>Add where condition</a>
            {displayWhereClauses(`getData${currentCategory.name}`,d.name1)}
            </>
            }
            
            
            </p>}
            {d.type=="string" &&
          <p>
          <input type="checkbox" 
            style={{marginRight:"5px", color:"white"}}
            onChange={(e)=>{
                //const checkReview=(e,name1,otm=false,padre,nameOtm,mainCat=false,declaredType,otmdestiny="",cf=false)=>{

              
              checkReview(e,d.name1,false,cat.name,"",true,false,"",true,d)
            }}
            />
            <a style={{color:"yellow"}}>{d.name1}</a>
            {/*<span style={{marginRight:"10px"}}>{d.name1}String22</span>*/}
            {isReadyToWhereFirst(`getData${currentCategory.name}`,d.name1,true) && <>
            &nbsp;
            <a  
            style={{textDecoration:"underline"}} onClick={
              (e)=>{
                e.preventDefault()
                toggleOpenWhereStatementStringDialog({
                  categoryName:`getData${currentCategory.name}`,
                  fieldName:d.name1,
                  segment:`getData${currentCategory.name}`
                })
                
              }
            }>Add where condition</a>
            
            </>
            }
            
            {displayWhereClauses(`getData${currentCategory.name}`,d.name1)}
            
            </p>}

          </>

        })}
        {pivote[`getData${currentCategory.name}`]?.map(d=>{
          <p>{d.name1}</p>
        })}
        <FormButton style={{
          textAlign:"left",
          textDecoration:"underline",
          marginLeft:0,
          paddingLeft:0
        }} onClick={()=>{
            //console.log("click")
            setOtmCategoryFields(pivote[`getData${currentCategory.name}`])
            toggleOtmIdFieldsDialog()
        }}>Add field to identify parent in child relationships</FormButton>
          </>)
      

      }
      
    </div>)
  }
  

}
const calculateInstancesNumber=(data,otmFieldName)=>{
  const total=data[otmFieldName].length
  return total
}


const calculateGrandRoutes=(grandsRoute,nameCluster)=>{
  let routes={}
  let sons=otmChoices[nameCluster]["otm"].map(l=>{
    routes[l]=[...grandsRoute,l]
    routes={...routes,...calculateGrandRoutes(routes[l],l)}
    
  })
  return routes

}

const calculateRoutes=(parentsRoute)=>{
 let parentNodeName=`getData${currentCategory.name}`
  let data=categoryProducts[parentNodeName]
  let routes={}
  if(firstCatNormalFields[parentNodeName]["otm"].length>0){
    let sons=firstCatNormalFields[parentNodeName]["otm"].map(l=>{
      routes[l]=[...parentsRoute,l]
      routes={...routes,...calculateGrandRoutes(routes[l],l)}
      
    })
  }else
   return {[parentNodeName]:[parentNodeName]}
  return routes


}

const calculateAmountNotBegin=(routeKey,otmField)=>{
  otmChoices[otmField]["otm"].map(o=>{

  })
}
//findfinal(each,routes,x) each es un arreglo de cada una de las llaves de rutas,
//x es cada llave
//comienza con un ciclo por cada una de las llaves de rutas
//si cada elemento de routes[y] incluya cada elemento en each y la longitud de 
//routes[y] es mayor que la longitud de each
//leneach=routes[y].length,finalfield=y, y se vuelve a llamar findfinal
const findFinal=(each,routes,field)=>{
  //console.log("eachroutes",each,routes)
  let lenEach=each.length
  let finalField=field
  Object.keys(routes).forEach(y=>{
    //console.log("checar",[1,2,3].includes([1,3]))
    if(each.every(x=>routes[y].includes(x))
  
       && routes[y].length>lenEach){
      lenEach=routes[y].length
      finalField=y
      findFinal([...each,y],routes,y)
    }
    
  })
  return finalField
  
}
//que carajos hace esta funcion?
//empieza con cada llave de las rutas, y lo asigna a la
//variable i findfinal(each,routes,x) each es un arreglo de cada una de las llaves de rutas


//que carajos hace findfinal
const routesFinal=(routes)=>{
  let definitiveRoutes=[]
  //const first=`getData${currentCategory.name}`
  Object.keys(routes).forEach(x=>{
    let each=[...routes[x]]
    const i=findFinal(each,routes,x)
    if(!definitiveRoutes.includes(i))
      definitiveRoutes.push(i)
  })
  return definitiveRoutes
}

/*const calculateAmountsBegins=(routes)=>{
  const begin=`getData${currentCategory.name}`
 let parentNode=firstCatNormalFields[begin]["otm"].map(x=>{
    let r=routes[x]
    if(r){
      Object.keys(routes).forEach(y=>{
        routes[y].forEach((i,index)=>{
          if(routes[y][index]==x && routes[y].length-1!==index){
            let o=routes[y][length-1]
            calculateAmountNotBegin(y,o)
          }
        })

      })
    }
  })

}*/

const getCompFieldString=(row,structure,compF)=>{
  //console.log("structure22",structure,compF)
  let finalString=""
  structure.forEach((x,index)=>{
    if(index%2==0){
      if(row[structure[index+1]]!==null){
        if(x=="none"){
          let did=false
          let c=buscaCompField(compF,structure[index+1])
          if(c!==false){
            if(c.type=="string")
              finalString+=getCompFieldString(row,c.structure,compF)
            else if(c.type=="number")
              finalString+=`${getCompFieldNumber(row,c.structure,compF)}`.toString()
            did=true
            
          }
          if(did==false)
            finalString+=`${row[structure[index+1]]}`+" "
        }else if(x=="concat"){
          let did=false
          let c=buscaCompField(compF,structure[index+1])
          if(c!==false){
            if(c.type=="string")
              finalString+=getCompFieldString(row,c.structure,compF)
            else if(c.type=="number")
              finalString+=`${getCompFieldNumber(row,c.structure,compF)}`.toString()
            did=true

            
          }
          if(did==false)
          
            finalString+=`${row[structure[index+1]]}`+" "
        }else if(x=="add text"){
          
          finalString+=`${structure[index+1].value}`+" "
          
          //finalString+=`${structure[index+1]}`+" "
        }else if(typeof structure[index+1]=="object"){
          if(structure[index+1].op=="substring"){
            let z=structure[index+1]
            
            let y=`${row[structure[index+1].field]}`
            if(y!=="null")
              finalString+=y.substring(
                z.start,z.chars)+" "
            
          }
        }
      }
    }
  })
  return finalString
}

const getCompFieldNumber=(row,structure,compF)=>{
  let subtotal=0
  //console.log("compnum",row,structure)
  let did=false
  structure.forEach((x,index)=>{
    if(index%2==0){
      if(x=="none"){
        let c=buscaCompField(compF,structure[index+1])
          if(c!==false){
            subtotal+=parseFloat(getCompFieldNumber(row,c.structure,compF).toFixed(2))
            subtotal=parseFloat(subtotal.toFixed(2))
              did=true
            
          }
          if(did==false)
            subtotal+=row[structure[index+1]]
        
      }else if(x=="add text"){
        //console.log("j23",structure[index+1],subtotal+structure[index+1].value)
        subtotal+=parseFloat((structure[index+1].value).toFixed(2))
        subtotal=parseFloat(subtotal.toFixed(2))

      }
      else{
        let temp=0
        //console.log("estruc",row,structure,subtotal,index,row[structure[index+1]])
        let c=buscaCompField(compF,structure[index+1])
          if(c!==false){
            temp=parseFloat(getCompFieldNumber(row,c.structure,compF).toFixed(2))

              did=true
            
          }else{
            if(typeof row[structure[index+1]]=="number")
            
              temp=parseFloat(row[structure[index+1]].toFixed(2))
            else  
              temp=0
          }
        
        //if(row[structure[index+1]]!==null){
          if(x=="+")
            subtotal=subtotal+temp
          if(x=="-")
            subtotal=subtotal-temp
          if(x=="/")
            subtotal=subtotal/temp
          if(x=="*")
            subtotal=subtotal*temp
          subtotal=parseFloat(subtotal.toFixed(2))

          //console.log("estruc",row,structure,subtotal,index,row[structure[index+1]])

        //}
      }
    }
   
  })
  //console.log("res68",row.id,subtotal)
  if(typeof subtotal=="number")
    return parseFloat(subtotal.toFixed(2))
  else 
    return 0
}

let totalRoutes={}
let doneLd={}
const getLevelData=(eachStopData,finalRoutes,eachIndex)=>{
  //console.log("ead",eachStopData)
  let r=finalRoutes
  let current
  
  if(doneLd[r[eachIndex]]==undefined)
    doneLd={...doneLd,[r[eachIndex]]:{done:false,len:0,count:0,nodeDone:[]}}
  
  if(r && r[eachIndex]!==undefined){
    if(!grandTotals[r[eachIndex]]){
      grandTotals={...grandTotals,
        [r[eachIndex]]:{
          
        }
        
      }
    }
  }
  if(!grandTotals[r[eachIndex]][`${r[eachIndex]}total`]){
    let nv=`${r[eachIndex]}total`
    grandTotals={...grandTotals,[r[eachIndex]]:{...grandTotals[r[eachIndex]],[nv]:{}}}
    console.log("gtlog",grandTotals)
  }

  
  
  if(!grandTotals[r[eachIndex]][`${r[eachIndex+1]}total`]){
    grandTotals={...grandTotals,
      [r[eachIndex]]:{
        ...grandTotals[r[eachIndex]],
        [`${r[eachIndex+1]}total`]:{}  
      }
      
    }
  }
  console.log("uiop",grandTotals)
  

  if(r && r[eachIndex+1]!==undefined){
    current=`${r[eachIndex+1]}total`
  }else
    current='undefinedtotal'


  let definitiveCurrent=current
  if(current=="undefinedtotal")
    definitiveCurrent="final"
  
  //let previous=`${r[eachIndex-1]}total`
 
  //console.log("eachstopdataundefined1",eachStopData)
  if(r && totalRoutes[r[eachIndex]]==undefined)
    totalRoutes={...totalRoutes,[r[eachIndex]]:{}}
  

  //if(current!=='undefinedtotal'){
    let uu={}
    if(r && totalRoutes[r[eachIndex]][current]!==undefined)
      uu={...totalRoutes[r[eachIndex]][current]}
  //if(totalRoutes[r[eachIndex]]==undefined){
    totalRoutes={
      ...totalRoutes,
      [r[eachIndex]]:{
        ...totalRoutes[r[eachIndex]],
        [current]:{
          ...uu
        }
      }
    }
  
    
  //if(eachIndex!==r.length){
    let newData
    const lenCluster=eachStopData.length

    doneLd={...doneLd,[r[eachIndex]]:{...doneLd[r[eachIndex]],len:lenCluster}}

    eachStopData.map((x,indice)=>{
      //console.log("xxxx",x)
      newData=x[r[eachIndex+1]]
      let ui=[...doneLd[r[eachIndex]].nodeDone]
      if([...ui].includes(x["id"]))
        doneLd={...doneLd,[r[eachIndex]]:{...doneLd[r[eachIndex]],count:doneLd[r[eachIndex]].count++,
        done:true}}
      else
      doneLd={...doneLd,[r[eachIndex]]:{...doneLd[r[eachIndex]],nodeDone:[...doneLd[r[eachIndex]]["nodeDone"],x["id"]],count:doneLd[r[eachIndex]].count++,
        done:false}}
          
      
      //console.log("trigger",r,x,r[eachIndex-1],newData)
      let eachId=r[eachIndex].substring(0,r[eachIndex].length)
      //console.log("eachId",`${eachId}Id`)
      const len=newData?.length
      //console.log("newData",x[r[eachIndex]],r[eachIndex+1])

      
      

      //added code
      let otherAccVars={}
      let otherAccCompositeVars={}
        
      if(current!=="undefinedtotal"){
        let doneGt1=false
        otmChoices[r[eachIndex+1]]?.normal.forEach(l=>{
        //if(l!=="1" && l!=="2" && l!=="3"){
          if(l.type=="number"){
            
            otherAccVars={...otherAccVars,[`${l["name1"]}total`]:0}
            
          }
        })
        doneGt1=false
        let doneGt2=false
        otmChoices[r[eachIndex+1]]?.compositeFields.forEach(l=>{
          if(l.type=="number"){
            otherAccVars={...otherAccVars,[`${l["name1"]}total`]:0}
            
            
          }
        })
        doneGt2=false
        
      }else{//undefinedtotal
        //console.log("alerta")
        let doneGt3=false
        let doneGt1=false
          
        doneGt1=false

        otmChoices[r[eachIndex]]?.compositeFields.forEach(l=>{
          if(l.type=="number"){
            otherAccVars={...otherAccVars,[`${l["name1"]}`]:0}
            
            
          }
        })
        doneGt3=false

        //console.log("alerta1",otherAccVars)
      }
        

        
      
      //}
      let final=[]
      let oavTotals=otherAccVars
      //console.log("oavtotals1",oavTotals)//Object.keys(x[r[eachIndex+1]][0]))
      if(current!=="undefinedtotal"){
        x[r[eachIndex+1]]?.forEach(y=>{
          let t=y.id
          final=[...final,t]
          Object.keys(otherAccVars).forEach(p=>{
            const nn=p.substring(0,p.length-5)

            //console.log("ppp",p,y[p],nn)
            //if(typeof y[nn]=="number"){
              //console.log("ppp1",y[nn])
              let oo=buscaCompField(compFieldsArray[r[eachIndex+1]],nn)
              if(oo!==false){

                //let otmc=otmChoices[r[eachIndex+1]]?.compositeFields
                //let l=otmc[p]
                if(oo.type=="number"){
                  console.log("gcf",oavTotals,p,oavTotals[p],getCompFieldNumber(y,oo.structure))
                  oavTotals[p]+=parseFloat(getCompFieldNumber(y,oo.structure,compFieldsArray[r[eachIndex+1]]))
                  oavTotals[p]=parseFloat(oavTotals[p].toFixed(2))
                }
              }else{
                console.log("fijo y nn y[nn] oavtotals p oavtotalsp",y,nn,y[nn],oavTotals,p,oavTotals[p])
                if(y[nn]!==null){
                  oavTotals[p]+=parseFloat(y[nn].toFixed(2))
                  oavTotals[p]=parseFloat(oavTotals[p].toFixed(2))
                }
              }
            //}
          })
        
            
          
        
     
        
      })
    }else{//undefinedtotal
      //console.log("adventure",x)
      
        let t=x.id
        final=[...final,t]
        /*Object.keys(otherAccVars).forEach(p=>{
          //const nn=p.substring(0,p.length-5)

          //console.log("ppp",p,y[p],nn)
          //if(typeof y[nn]=="number"){
            //console.log("ppp1",y[nn])
            let oo=buscaCompField(allCompFieldsCluster,p)
            if(oo!==false){

              //let otmc=otmChoices[r[eachIndex+1]]?.compositeFields
              //let l=otmc[p]
              if(oo.type=="number"){
                //console.log("gcf",getCompFieldNumber(x,oo.structure))
                oavTotals[p]+=parseFloat(getCompFieldNumber(x,oo.structure,compFieldsArray[r[eachIndex]]).toFixed(2))
                oavTotals[p]=parseFloat(oavTotals[p].toFixed(2))
              }
            }else{
              if(x[p]!==null){
                console.log("x p x[p]",x,p,x[p])
                oavTotals[p]+=parseFloat(x[p].toFixed(2))
                oavTotals[p]=parseFloat(oavTotals[p].toFixed(2))
              }
            }
          //}
        })*/
      
          
        
      
   
      
    
    }

      
    totalRoutes={
      ...totalRoutes,
      [r[eachIndex]]:{
        ...totalRoutes[r[eachIndex]],
        [current]:{...totalRoutes[r[eachIndex]][current],
          
          [x.id]:{
          normalData:{},
          total:0,
          keys:[],
          ...otherAccVars
        }}
      }
    }
    let normalFields={}
    
    if(r[eachIndex]==`getData${currentCategory.name}`){
      firstCatNormalFields[r[eachIndex]]?.normal.forEach(oo=>{
        if(oo["name1"]!=="1" && oo["name1"]!=="2" && oo["name1"]!=="3"){
          normalFields={...normalFields,[oo["name1"]]:x[oo["name1"]]}
          if(doneLd[r[eachIndex]].done==false){
            if(oo.type=="number"){
              if(grandTotals[r[eachIndex]][`${r[eachIndex]}total`][oo["name1"]]==undefined){
                let nc=0
                if(x[oo["name1"]]!==null)
                  nc=x[oo["name1"]]
                
                
                grandTotals={
                  ...grandTotals,
                  [r[eachIndex]]:{
                    ...grandTotals[r[eachIndex]],[`${r[eachIndex]}total`]:{
                      ...grandTotals[r[eachIndex]][`${r[eachIndex]}total`],
                      [oo["name1"]]:nc
                    }
                
                  }
                }

              }else{
                let nuevoTotal=grandTotals[r[eachIndex]][`${r[eachIndex]}total`][oo["name1"]]+x[oo["name1"]]
                grandTotals={
                  ...grandTotals,
                  [r[eachIndex]]:{
                    ...grandTotals[r[eachIndex]],[`${r[eachIndex]}total`]:{
                      ...grandTotals[r[eachIndex]][`${r[eachIndex]}total`],
                      [oo["name1"]]:nuevoTotal
                    }
                
                  }
                }
                
              }
            }
          }
        }
        })
      
        firstCatNormalFields[r[eachIndex]]?.otmdestiny.forEach(oo=>{
        
          normalFields={...normalFields,[oo]:x[oo]}
      })
      firstCatNormalFields[r[eachIndex]]?.compositeFields.forEach(l=>{
        if(l.type=="number"){
        
        
          normalFields={...normalFields,[`${l["name1"]}`]:getCompFieldNumber(x,l.structure,compFieldsArray[`getData${currentCategory.name}`])}
          if(doneLd[r[eachIndex]].done==false){

          if(l.type=="number"){
            let nc=0
            if(getCompFieldNumber(x,l.structure,compFieldsArray[r[eachIndex]])!==null)
              nc=getCompFieldNumber(x,l.structure,compFieldsArray[r[eachIndex]])
            
            
              if(grandTotals[r[eachIndex]][`${r[eachIndex]}total`][l["name1"]]==undefined){
                grandTotals={
                  ...grandTotals,
                  [r[eachIndex]]:{
                    ...grandTotals[r[eachIndex]],[`${r[eachIndex]}total`]:{
                      ...grandTotals[r[eachIndex]][`${r[eachIndex]}total`],
                      [l["name1"]]:nc
                    }
                
                  }
                }
                /*grandTotals[r[eachIndex]][r[eachIndex]]={
                  ...grandTotals[r[eachIndex]][r[eachIndex]],
                  [l["name1"]]:0
                }*/
              }else{
                let ni=eachIndex-1
                if(ni==-1)
                  ni=0
                  let nc=0
                if(getCompFieldNumber(x,l.structure,compFieldsArray[r[eachIndex]])!==null)
                  nc=getCompFieldNumber(x,l.structure,compFieldsArray[r[eachIndex]])
                
              //if(doneLd[r[n1]].done==false){
              let nuevoTotal=grandTotals[r[eachIndex]][`${r[eachIndex]}total`][l["name1"]]+nc
                //if(doneLd[r[n1]].done==false){
                  
                  grandTotals={
                    ...grandTotals,
                    [r[eachIndex]]:{
                      ...grandTotals[r[eachIndex]],[`${r[eachIndex]}total`]:{
                        ...grandTotals[r[eachIndex]][`${r[eachIndex]}total`],
                        [l["name1"]]:nuevoTotal
                      }
                  
                    }
                  }
                  /*grandTotals[r[eachIndex]][r[eachIndex]]={
                    ...grandTotals[r[eachIndex]][r[eachIndex]],
                    [l["name1"]]:nuevoTotal
                  }*/
                //}
              }
              
            
          }
        }
        }else if(l.type=="string"){
          normalFields={...normalFields,[`${l["name1"]}`]:getCompFieldString(x,l.structure,compFieldsArray[`getData${currentCategory.name}`])}
        }
      })
      //if(indice==(doneLd[r[eachIndex]].len-1))
        //doneLd[r[eachIndex]].done=true

      normalFields={id:x["id"],...normalFields}
    }else{//diferente a principal
      otmChoices[r[eachIndex]]?.normal.forEach(oo=>{
        //if(oo!=="1" && oo!=="2" && oo!=="3")
        //if(oo.type=="number")
          normalFields={...normalFields,[oo["name1"]]:x[oo["name1"]]}
          if(doneLd[r[eachIndex]].done==false){

          if(oo.type=="number"){
            let ni=eachIndex-1
            if(ni==-1)
            ni=0
            
              console.log("fijo22",grandTotals[r[eachIndex]][`${r[eachIndex]}total`][oo["name1"]],r[eachIndex],oo["name1"],x["id"],x[oo["name1"]])
              if(grandTotals[r[eachIndex]][`${r[eachIndex]}total`][oo["name1"]]==undefined){
                let nc=0
                if(x[oo["name1"]]!==null)
                  nc=x[oo["name1"]]
                grandTotals={
                  ...grandTotals,
                  [r[eachIndex]]:{
                    ...grandTotals[r[eachIndex]],[`${r[eachIndex]}total`]:{
                      ...grandTotals[r[eachIndex]][`${r[eachIndex]}total`],
                      [oo["name1"]]:nc
                    }
                
                  }
                }
                /*grandTotals[r[eachIndex]][r[eachIndex]]={
                  ...grandTotals[r[eachIndex]][r[eachIndex]],
                  [oo["name1"]]:0
                }*/
              }else{
                let nc=0
                if(x[oo["name1"]]!==null)
                  nc=x[oo["name1"]]
                let nuevoTotal=grandTotals[r[eachIndex]][`${r[eachIndex]}total`][oo["name1"]]+nc
                console.log("nuevototal",nuevoTotal)
                grandTotals={
                  ...grandTotals,
                  [r[eachIndex]]:{
                    ...grandTotals[r[eachIndex]],[`${r[eachIndex]}total`]:{
                      ...grandTotals[r[eachIndex]][`${r[eachIndex]}total`],
                      [oo["name1"]]:nuevoTotal
                    }
                
                  }
                }
                /*grandTotals[r[eachIndex]][r[eachIndex]]={
                  ...grandTotals[r[eachIndex]][r[eachIndex]],
                  [oo["name1"]]:nuevoTotal
                }*/
              }
            
          }
        }  
      })
      otmChoices[r[eachIndex]]?.otmdestiny.forEach(oo=>{
        //if(oo!=="1" && oo!=="2" && oo!=="3")
        //if(oo.type=="number")
          normalFields={...normalFields,[oo]:x[oo]}
      })
      otmChoices[r[eachIndex]]?.compositeFields.forEach(l=>{
        if(l.type=="number"){
        
          //console.log("x l.struc compfiearr[rindex]",x,l.structure,compFieldsArray[r[eachIndex]],getCompFieldNumber(x,l.structure,compFieldsArray[r[eachIndex]]))
          normalFields={...normalFields,[`${l["name1"]}`]:getCompFieldNumber(x,l.structure,compFieldsArray[r[eachIndex]])}
          if(doneLd[r[eachIndex]].done==false){
            let nc=0
            if(getCompFieldNumber(x,l.structure,compFieldsArray[r[eachIndex]])!==null)
              nc=getCompFieldNumber(x,l.structure,compFieldsArray[r[eachIndex]])
            
            if(grandTotals[r[eachIndex]][`${r[eachIndex]}total`][l["name1"]]==undefined){
              grandTotals={
                ...grandTotals,
                [r[eachIndex]]:{
                  ...grandTotals[r[eachIndex]],[`${r[eachIndex]}total`]:{
                    ...grandTotals[r[eachIndex]][`${r[eachIndex]}total`],
                    [l["name1"]]:nc
                  }
              
                }
              }  
              /*grandTotals[r[eachIndex]][r[eachIndex]]={
                ...grandTotals[r[eachIndex]][r[eachIndex]],
                [l["name1"]]:0
              }*/
            }else{
              let ni=eachIndex-1
              if(ni==-1)
                ni=0
                let nc=0
                if(getCompFieldNumber(x,l.structure,compFieldsArray[r[eachIndex]])!==null)
                  nc=getCompFieldNumber(x,l.structure,compFieldsArray[r[eachIndex]])
                
              //if(doneLd[r[n1]].done==false){
              let nuevoTotal=grandTotals[r[eachIndex]][`${r[eachIndex]}total`][l["name1"]]+nc
              /*grandTotals[r[eachIndex]][r[eachIndex]]={
                ...grandTotals[r[eachIndex]][r[eachIndex]],
                [l["name1"]]:nuevoTotal
              }*/
              grandTotals={
                ...grandTotals,
                [r[eachIndex]]:{
                  ...grandTotals[r[eachIndex]],[`${r[eachIndex]}total`]:{
                    ...grandTotals[r[eachIndex]][`${r[eachIndex]}total`],
                    [l["name1"]]:nuevoTotal
                  }
              
                }
              }
                
              //}
            }
          }
        
          
        }else
          if(l.type=="string"){
          normalFields={...normalFields,[`${l["name1"]}`]:getCompFieldString(x,l.structure,compFieldsArray[r[eachIndex]])}
        }
      })
      //if(indice==(doneLd[r[eachIndex]].length-1))
        //doneLd[r[eachIndex]].done=true

      normalFields={id:x["id"],...normalFields}
    }
    console.log("vertigo",doneLd)
      //console.log("normalfields",normalFields)
      //console.log("firstCatnormal",firstCatNormalFields)
      //console.log("nd2xid",x[r[eachIndex]],x[r[eachIndex+1]],final,x.id,eachStopData)
      //console.log("parcial",len,totalRoutes,totalRoutes[r[eachIndex]][current],
      //totalRoutes[r[eachIndex-1]][current],finalRoutes,x.id,len,r[eachIndex],r[eachIndex-1])
    if(current!=="undefinedtotal"){
      totalRoutes={
        ...totalRoutes,
        [r[eachIndex]]:{
          ...totalRoutes[r[eachIndex]],
          [current]:{
            ...totalRoutes[r[eachIndex]][current],
            
            [x.id]:
            {

              ...totalRoutes[r[eachIndex]][current][x.id],
              normalData:{...normalFields},
              total:totalRoutes[r[eachIndex]][current][x.id]["total"]==undefined
              ?len:
              totalRoutes[r[eachIndex]][current][x.id]["total"]+len,
              keys:final.length!==0?final:[],
              
              ...oavTotals
            }
          }
          
        }
      }
    }else{
      //console.log("oavTotals22",oavTotals)
      totalRoutes={
        ...totalRoutes,
        [r[eachIndex]]:{
          ...totalRoutes[r[eachIndex]],
          [current]:{
            ...totalRoutes[r[eachIndex]][current],
            
            [x.id]:
            {

              ...totalRoutes[r[eachIndex]][current][x.id],
              normalData:{...normalFields},
              total:totalRoutes[r[eachIndex]][current][x.id]["total"]==undefined
              ?len:
              totalRoutes[r[eachIndex]][current][x.id]["total"]+len,
              keys:final.length!==0?final:[],
              ...oavTotals
              
            }
          }
          
          
        }
      }
      //console.log("tr22",totalRoutes)
    }
    //setGrandTotalsSt(grandTotals)
    /*let ui=new Set([...r[eachIndex].nodeDone,x["id"]])
    let mi=doneLd[r[eachIndex]].count++
    doneLd={...doneLd,[r[eachIndex]]:{...doneLd[r[eachIndex]],nodeDone:ui,count:doneLd[r[eachIndex]].count++,
    done:}*/
    console.log("doneld",doneLd)
      if(eachIndex+1<r.length)
      getLevelData(newData,finalRoutes,eachIndex+1,true)

      
    })
    
  
  }

  
  //}
//}  

const buscaCompField=(compositeRows,busca)=>{
  for(let x in compositeRows){
    if(compositeRows[x].name1==busca)
      return compositeRows[x]
  }
  return false
}
/*const getLevelsData=(route,nameRoute)=>{
  console.log("leveldata",route,nameRoute)
  for(let i=route.length-1;
    i>=0;
    i--){
      getLevelData(categoryProducts[])
    }
}*/

let finalObject={}

const calculateKeys=(finalObjectName,routeIndexToFind,routeIndex,routes,keys,totalRoutes,r,u,otmName,otherAccVars)=>{
  let trr=totalRoutes[routes[routeIndex]][`${routes[routeIndex+1]}total`]
  //console.log("trr",trr)
  let otherfinalvars={}
    keys.forEach(k=>{
    if(routeIndexToFind==routeIndex){
      //console.log("trr1",k,trr,otherAccVars,finalObject[otmName][r]["items"][u])
      Object.keys(otherAccVars).forEach(i=>{
        /*let o=otmChoices[routes[routeIndex+1]].compositeFields
        if(i in o){
          otherfinalvars[i]=finalObject[otmName][r]["items"][u][i]+getCompFieldNumber(trr[k],o[i].structure)
        }else*/
        //console.log("revisai",i)
        let val=0
        
        if(trr[k][i]!==null){
          //console.log("trr",trr[k][i])
          let ooi=trr[k][i]
          val=parseFloat(ooi)
        }

        /*if(i=="j1total")
          console.log("revisa",u,otmName,r,u,i,finalObject[otmName][r]["items"][u][i],trr[k][i],routes[routeIndex],`${routes[routeIndex+1]}total`,trr,k,i,val)*/
        let oop=0
        if(finalObject[otmName][r]["items"][u][i]==undefined){

          finalObject[otmName][r]["items"][u]={...finalObject[otmName][r]["items"][u],[i]:0}
        } 
        if(grandTotals[otmName][`${r}`][i]==undefined)
        /*grandTotals={
          ...grandTotals,
          [otmName]:{
            ...grandTotals[otmName],[r]:{
              ...grandTotals[otmName][r],
              [i]:0
            }
        
          }
        }*/
          grandTotals[otmName][`${r}total`]={...grandTotals[otmName][`${r}`],[i]:0}

        oop=finalObject[otmName][r]["items"][u][i]+val
        
        otherfinalvars[i]=parseFloat(oop.toFixed(2))
        grandTotals={
          ...grandTotals,
          [otmName]:{
            ...grandTotals[otmName],[`${r}`]:{
              ...grandTotals[otmName][`${r}`],
              [i]:grandTotals[otmName][`${r}`][i]+val
            }
        
          }
        }


        //grandTotals[otmName][r][i]+=val
        grandTotals[otmName][`${r}`][i]=parseFloat(grandTotals[otmName][`${r}`][i].toFixed(2))
      })
    
      finalObject={
        ...finalObject,[otmName]:{
          ...finalObject[otmName],[r]:{
            ...finalObject[otmName][r],items:{
              ...finalObject[otmName][r]["items"],
              [u]:{...finalObject[otmName][r]["items"][u],
              total:finalObject[otmName][r]["items"][u]["total"]+trr[k]["total"],
              ...otherfinalvars
            }
            }
          }
        }
      }
    }else{

      calculateKeys(finalObjectName,routeIndexToFind,routeIndex+1,routes,
        totalRoutes[routes[routeIndex-1]][`${routes[routeIndex]}total`][k].keys
        ,totalRoutes,r,u,otmName,otherAccVars)
    }


  })

}

const getData=(routes,otmName,totalRoutes,routeIndex,mainArray=[],begin=false,cor=[],routeIndexToFind=0)=>{

  let dataVar=routes[routeIndex+1]
  let nn=`${routes[routeIndexToFind+1]}total`
  let r=`${dataVar}total`
  //let mainArray=[]
  //console.log("rmainArray",cor,r,begin)
  //if(r!==`undefinedtotal`){
  if(begin==true){
    mainArray=totalRoutes[routes[routeIndex]][r]
  }
  if(finalObject[otmName][nn]==undefined)
    finalObject={...finalObject,[otmName]:{...finalObject[otmName],[nn]:{items:{}}}}
  // console.log("ver22",claves,totalRoutes[routes[routeIndex]][r])
//console.log("mainArray",mainArray)
  if(grandTotals[otmName][`${otmName}total`]==undefined){
    grandTotals={...grandTotals,[otmName]:{[`${otmName}total`]:{}}} 
  }
    
  /*if(grandTotals[otmName][otmName]==undefined)
    grandTotals={...grandTotals,[otmName]:{...grandTotals[otmName],[otmName]:{}}}*/
    
    //mainArray=Object.keys(totalRoutes[routes[routeIndex]][r]).forEach(x=>claves)
    //console.log("mainArray",claves,mainArray,routes[routeIndex],r,routeIndex)
  //}
  
  if(mainArray){
    if(Object.keys(mainArray).length>0){
      if(finalObject[otmName]==undefined){
        finalObject[otmName]={}
      }
      if(grandTotals[otmName]==undefined){
        grandTotals={...grandTotals,[otmName]:{}}
      }

    
      
      Object.keys(mainArray).forEach(u=>{
        if(finalObject[otmName][nn]==undefined){
          finalObject[otmName]={
            [nn]:{}
            
          }
        }
        if(grandTotals[otmName][`${nn}`]==undefined){
          grandTotals={...grandTotals,
            [otmName]:{
              ...grandTotals[otmName],[`${nn}`]:{}

             }
          }
        }
        //console.log("rmainArray",cor,cor[u].normalData,r,begin)

      
        if(finalObject[otmName][nn]["items"]==undefined)
          finalObject[otmName][nn]["items"]={normalFields:{}}
        if(finalObject[otmName][nn]["items"][u]==undefined){
          //finalObject[otmName][nn]["items"][u]=0
          finalObject[otmName][nn]["items"][u]={total:0}
        }
        
        //Added code
        let otherAccVars={}
        //console.log("cor11",cor,cor[0])
        const objlen=Object.keys(cor).length
        let firstkey
        if(objlen>0){
          firstkey=Object.keys(cor)[0]
        
      /*added code 1
      let commonData
      finalObject[otmName][nn]["normalData"]={}
      otmChoices[r[eachIndex+1]]?.normal?.forEach(l=>{
        if(l!=="1" && l!=="2" && l!=="3"){
          //otherAccVars={...otherAccVars,[`${l}total`]:0}
          finalObject[otmName][nn]["items"][u]["normalData"][l]=mainArray[u][l]
        }
      })


      end added code 2*/
      //console.log("cor45",cor[firstkey])

      Object.keys(cor[firstkey]).forEach(iu=>{
        //console.log("cor11iu",iu)
        if(iu!=="keys" && iu!=="total"){
          const n=`${iu}`
          if(finalObject[otmName][nn]["items"][u][n]==undefined)
            finalObject[otmName][nn]["items"][u][n]=0
          if(grandTotals[otmName][`${nn}`][n]==undefined)
            grandTotals={...grandTotals,
              [otmName]:{
                ...grandTotals[otmName],
                [`${nn}`]:{
                  ...grandTotals[otmName][`${nn}`],
                  [n]:0
                }
              }
            } 
             // grandTotals[otmName][nn][n]=0
          otherAccVars={...otherAccVars,[n]:0}
          
        }
      })
      }

      //tengo que poner los compuestos para inicializarlo


      //console.log("otheraccvars",otherAccVars)
      /*let final=[]
      let oavTotals=otherAccVars
      cor.forEach(y=>{
        let t=y.id
        final=[...final,t]
        Object.keys(otherAccVars).forEach(p=>{
          const nn=p.substring(0,p.length-5)

          console.log("ppp",p,y[p],nn)
          if(typeof y[nn]=="number"){
            console.log("ppp1",y[nn])
            oavTotals[p]+=y[nn]
          }
        })
        
      })*/
      //ends added code

        if(routeIndex==routeIndexToFind){
            finalObject[otmName][nn]["items"][u]["total"]+=cor[u]["total"]
            finalObject[otmName][nn]["items"]["normalFields"][u]=cor[u]["normalData"]
            Object.keys(otherAccVars).forEach(y=>{
              //if(finalObject[otmName][nn]["items"][u][y]!==undefined){
                /*if(y in otmChoices[routes[routeIndex+1]].compositeFields){
                  finalObject[otmName][nn]["items"][u][y]+=getCompFieldNumber(u,otmChoices[routes[routeIndex+1]]["compositeFields"][0].structure)
                }else */
                if(cor[u][y]!==undefined){
                  otherAccVars[y]+=cor[u][y]

                finalObject[otmName][nn]["items"][u][y]+=cor[u][y]
                grandTotals={...grandTotals,[otmName]:{
                  ...grandTotals[otmName],
                  [`${nn}`]:{
                    ...grandTotals[otmName][`${nn}`],
                    [y]:grandTotals[otmName][`${nn}`][y]+cor[u][y]
                  }
                }
              }
                //grandTotals[otmName][nn][y]+=cor[u][y]
              
              //else 
               //finalObject[otmName][nn]["items"][u][y]=0*/
              //console.log("prev", finalObject[otmName][nn]["items"][u][y],cor[u][y])
                }

            })
            
          
        }else{
          //console.log("cor11",mainArray,u,mainArray[u])
          let keys=mainArray[u]["keys"]
          let finalObjectName=finalObject[otmName][nn]["items"][u]
          calculateKeys(finalObjectName,routeIndexToFind,routeIndex+1,routes,keys,totalRoutes,nn,u,otmName,otherAccVars)
        }
      })  
      
      
      
    
      
    }
  
  
}
}

/*const calculateGrandTotals=()=>{
  Object.keys(finalObject).forEach((x,ind)=>{
    if(ind==0){
      let public=finalObject[x]
      let key=Object.keys(public)[0]
      let data=public[key].normalFields
      
    }
  })
}
*/

const getAccumulated=(routes,
  otmName,routeIndex,begin=false,totalRoutes)=>{
    let total=0
    //if(otmName==routes[routeIndex]){
      let r=routes[routeIndex+1]
      let mainArray=totalRoutes[otmName][`${r}total`]?totalRoutes[routes[routeIndex]][`${r}total`]:[]
      
      //console.log("datalog",otmName,totalRoutes,`${r}total`,mainArray)

      let nuevoTotalVar=`${r}total`
      let totalObject=Object.keys(totalRoutes[routes[routeIndex]][nuevoTotalVar]).length
      finalObject={
        ...finalObject,
        [otmName]:{...finalObject[otmName],
          [`${r}total`]:{granTotal:totalObject}}
      }
      //if(routeIndex+1!==routes.length-1)
        //getAccumulated(routes,otmName,routeIndex+1,false,totalRoutes,true)
    /*}else{

      
    }*/
    for(let i=routeIndex;i<routes.length-1;i++){
      //console.log("ikey",i,totalRoutes[routes[i]][`${routes[i+1]}total`])
      //getData(routes,otmName,totalRoutes,0,null,true,totalRoutes[routes[i]][`${routes[i+1]}total`],i)
      getData(routes,otmName,totalRoutes,routeIndex,null,true,totalRoutes[routes[i]][`${routes[i+1]}total`],i)
    }
    //console.log("finalObject",finalObject)
    //console.log("grandTotals1",grandTotals)
      /*if(Object.keys(mainArray).length>0){
        finalObject[otmName][r]=0
        for(let x in mainArray){
          finalObject[otmName][r]+=mainArray[x].total
        }

      }*/
    
  }


const printGtSegment=(data={},segment)=>{
  //console.log("datagr",data)
  if(Object.keys(data).filter(x=>x!=="normalData").length!==0)
  return <div style={{width:"32%",marginRight:"10px",marginBottom:"15px"}}>
  {Object.keys(data).length>0?<>
  <p>{segment}</p>
  <table style={{width:"100%"}}>
    <thead>
      <tr style={{border:"2px solid black"}}>
        <th>Field</th>
        <th>Grand Total</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(data).map(k=>{
        if(k!=="normalData")
        return <tr style={{border:"1px solid white"}}>
          <td>{k}</td>
          <td>{data[k]}</td>
        </tr>
      })}
    </tbody>
  </table>
  
  </>:""}
  </div>
  else
    return null
}

const printGrandTotals=(segment,ata)=>{
  let block=[]
  const l=grandTotals[segment]
  const ks=Object.keys(l)
  const primero=l[segment]
  //block.push(printGtSegment(primero,segment,ata))
  let cont=false
  for(let i in ata){
    if(ata[i]==segment || cont==true){

      let data=grandTotals[segment][`${ata[i]}total`]
      console.log("verific",ks,`${ata[i]}total`)
      if(ks.includes(`${ata[i]}total`)){
        cont=true
        let bl=printGtSegment(data,ata[i],ata)
        if(bl!==null)
          block.push(bl)
      }
    }

  }

  return block.length>0?<div>
    <p>Grand Totals</p>
    <div style={{display:"flex",width:"100vw",justifyContent:"start",flexWrap:"wrap"}}>
    
      {block}
    </div>
  </div>:""
}

const getAllTablesArray=(fr,r)=>{
  let ret=[]
  
  for(let i in fr){
    let arr=r[fr[i]]
    for(let j in arr){
      if(!ret.includes(arr[j])){
        ret=[...ret,arr[j]]
      }
    }
  }
  return ret
}

let reporte=""
let eachHeader
let dataEach=[]
let fullbody=[]

let titleSeg=[]
let outsideTable=[]
let enc=[]

const getDataReport=(routes,finalRoutes)=>{
  const root=`getData${currentCategory.name}`
  totalRoutes={}
  //for(let i=0;i<finalRoutes.length;i++){

   getLevelData(categoryProducts[root],routes[finalRoutes[0]],0,true)
   console.log("gt222",grandTotals)
   //console.log("totalRoutes",totalRoutes,categoryProducts[root],finalRoutes)

  //}
  //console.log("getLevelData",totalRoutes)
  finalObject={}
  totalRoutes={}

  //getLevelData(categoryProducts[root],routes[finalRoutes[0]],0) 
  let totalRoutesArray={}
  let done1=[]
  let allTablesArray=getAllTablesArray(finalRoutes,routes)
  console.log("alltablesarray",allTablesArray)
  
  for(let i=0;i<finalRoutes.length;i++){
  //getAccumulated(routes[finalRoutes[0]],routes[finalRoutes[0]][0],0,false,totalRoutes)
  totalRoutes={}

  
  getLevelData(categoryProducts[root],routes[finalRoutes[i]],0,true)
    for(let x=0;x<routes[finalRoutes[i]].length-1;x++){
      getAccumulated(routes[finalRoutes[i]],routes[finalRoutes[i]][x],x,false,totalRoutes)
      if(!done1.includes(finalRoutes[i])){
        
        done1.push(finalRoutes[i])
        totalRoutesArray={...totalRoutesArray,[routes[finalRoutes[i]][routes[finalRoutes[i]].length-1]]:totalRoutes[routes[finalRoutes[i]][routes[finalRoutes[i]].length-1]]['undefinedtotal']}
      }

  }
  //console.log("finalObject",finalObject)
  }
  let done=[]
  let printTablesBool=[]
  //console.log("totalRoutesArray",totalRoutesArray)
  let comp=""
  for(let i=0;i<finalRoutes.length;i++){
    for(let j=0;j<routes[finalRoutes[i]].length;j++){
      
      reporte=""
      eachHeader=[]
      dataEach=[]
      fullbody=[]

      titleSeg=[]
      outsideTable=[]
      enc=[]
     
      if(j!==routes[finalRoutes[i]].length-1){
        //console.log("check22",printTablesBool,routes[finalRoutes[i]][j])
        if(!printTablesBool.includes(routes[finalRoutes[i]][j])){
          let ui=printGrandTotals(routes[finalRoutes[i]][j],allTablesArray)

          printTable(finalObject[routes[finalRoutes[i]][j]],routes[finalRoutes[i]][j],`${routes[finalRoutes[i]][j+1]}total`,ui)
          
          printTablesBool.push(routes[finalRoutes[i]][j])
        }
        
      }else{
        comp=routes[finalRoutes[i]][j]
      }
    } 

  }
  if(Object.keys(totalRoutesArray).length==0){
    totalRoutesArray={[routes[finalRoutes[0]][routes[finalRoutes[0]].length-1]]:totalRoutes[routes[finalRoutes[0]][routes[finalRoutes[0]].length-1]]['undefinedtotal']}
    

  }
  console.log("grandTotals",grandTotals)
  //let ui=printGrandTotals(comp,allTablesArray)
  beginPrintFinalTables(totalRoutesArray,allTablesArray)


  //printGrandTotals(comp)
  //return printTable(finalObject['getDataclientes'],'getDataclientes',`${routes[finalRoutes[0]][1]}total`)
  //printTable(totalRoutesArray,routes,finalRoutes)
}

const printFinalTable=(title,data,ui)=>{
  let fields=[]
  //console.log("data555",data)
  let compF
  let cf
  //console.log("firstcat",firstCatNormalFields)
  if(title!==`getData${currentCategory.name}`){
    fields=otmChoices[title]["normal"].map(x=>x["name1"])
    fields=[...fields,...otmChoices[title]["otmdestiny"]]
    compF=otmChoices[title]["compositeFields"]
    cf=compF.map(x=>x["name1"])
    fields=[...fields,...cf]
  }else{
    fields=firstCatNormalFields[title]["normal"].map(x=>x["name1"])
    compF=firstCatNormalFields[title]["compositeFields"]
    let cf=compF.map(x=>{
      
      
      return x["name1"]
    })
    fields=[...fields,...cf]
  }
  
  let head=[]
  let rowCols=[]
  let rows=[]
  //console.log("fields11",fields)
  Object.keys(data).forEach((x,index)=>{
    let specifics=data[x].normalData
    rowCols=[]
    fields.forEach((f,i)=>{
      
      if(f!=="1" && f!=="2" && f!=="3"){
        if(index==0){
          head.push(<th style={{borderRight:"1px solid white"}}>{f}</th>)
        }
        let bcm=buscaCompField(compF,f)
          if(bcm!==false &&
            bcm.type=="number")
            rowCols.push(<td style={{borderRight:"1px solid white"}}>{specifics[f]}</td>)
          else
            rowCols.push(<td style={{borderRight:"1px solid white"}}>{specifics[f]}</td>)
      }
    })
    rowCols.unshift(<td style={{borderRight:"1px solid white"}}>{specifics["id"]}</td>)
    if(index==0)
      head.unshift(<th style={{borderRight:"1px solid white"}}>Id</th>)
    rows.push(<tr style={{border:"1px solid white"}}>{rowCols}</tr>)
  })
  let tableResult=
  <table style={{marginBottom:"20px"}}>
    <thead>
      <tr style={{backgroundColor:"white",color:"black"}}>
        <th style={{backgroundColor:"white",color:"black"}}>{title}</th>
      </tr>
    </thead>
    <tbody>
      <table style={{border:"1px solid white",width:"100%"}}>
        <thead>
          <tr style={{width:"100%"}}>
            {head}
          </tr>
        </thead>
        <tbody style={{border:"1px solid white"}}>
          {rows}
        </tbody>
      </table>
    </tbody>
  </table>
  totalTables.push(tableResult)
  totalTables.push(ui)
}

const beginPrintFinalTables=(totalRoutesArray,ata)=>{
  Object.keys(totalRoutesArray).forEach(key=>{
    let ui=printGrandTotals(key,ata)
    printFinalTable(key,totalRoutesArray[key],ui)
  })
}


const getValues=(o)=>{
  let de=[]
  let re=[]
  let er=[]
  Object.keys(o).forEach((y,index)=>{
        
    if(y!=="normalFields" && y!=="normalData"){
      de.push(<td style={{margin:0,overflowX:"scroll",whiteSpace:"nowrap"}} className="notlastborder">{o[y]}</td>)
    }
  
  })
  //re.push(<td>{er}</td>)
  return de
}
let headerEach=[]

const printReportSegment=(object,primero,segmentTitle)=>{
  
  //let dataEach=[]
  //console.log("object",object)
  let fullheader=[]
  
  //let eachHeader
  let eachRow=[]
  let titya=false
  let eachSeg=[]
  let fullData=[]  
  Object.keys(object).map((u,index)=>{
    if(u!=="normalFields" && u!=="normalData"){
      if(titya==false){
        let inicio=false
        Object.keys(object[u]).forEach(y=>{
          if(y!=="normalFields" && y!=="normalData"){
            headerEach.push(<th>{y}</th>)
            eachSeg.push(<th className="notlastborder" style={{width:"100%"}}>{y}</th>)
          }
          
        })
        
          
        
      
        
        titya=true
      }
    
  
    eachRow=getValues(object[u])
    
      
      
      fullData.push(<tr>{eachRow}</tr>)

    /*else{
      console.log("fulldata",fullData,fullData[index])
      fullData=fullData.map((i,index1)=>{
        if(index1==index)
          return [...i,...eachRow]
        return i
      })
      
        
    }*/
    

  
    
      
    
  }
  })
  
  enc.push(<th style={{textAlign:"center",marginLeft:"5px",marginRight:"5px",padding:"5px",
  /*borderRight:"1px solid black",*/ borderColor:"black",background:"white",color:"black"}}
  >{segmentTitle}</th>)
  outsideTable.push(
    
      <table style={{margin:0,boxSizing:"borderBox",width:"100%"}} >
        <thead><tr style={{textAlign:"center",margin:0,padding:0,borderTop:"1px solid white",borderBottom:"1px solid white",width:"100%"}} className="nlb1">{eachSeg}</tr></thead>
        <tbody style={{margin:0,padding:0}}>
          {fullData.map(x=>{
            return x
          })}
        </tbody>
      </table>
   )
  /*outsideTable.push(
    <th style={{textAlign:"center"}}>{segmentTitle}
      <table style={{margin:0,padding:0}}>
        <thead><tr style={{textAlign:"center"}}>{eachSeg}</tr></thead>
        <tbody style={{background:"brown",margin:0,padding:0}}>{fullData}</tbody>
      </table>
    </th>)*/
  
  /*fullData.push(eachRow)
  reporte=<>{reporte}<table>
    {eachHeader}
    {fullData}
  </table>
  </>*/
}

//const printTable=(totalRoutesArray,routes,finalRoutes)=>{
  
let totalTables=[]
const printTable=(objectToPrint,title,primero,grandTotals)=>{
  reporte=""
  outsideTable=[]
  let keys=Object.keys(objectToPrint)
  //console.log("primero1",primero)

  for(let i=0;i<keys.length;i++){
    let data=objectToPrint[`${keys[i]}`]
    
      
      if(keys[i]==primero){
        //console.log("primero",primero)
        printReportSegment(objectToPrint[primero]["items"]["normalFields"],true,title)         

      }
      printReportSegment(data["items"],false,keys[i])

    

  }

  /*for(let i=0;i<finalRoutes.length;i++){
    let routeSteps=routes[finalRoutes[i]]
    console.log("routesteps",routeSteps)
    let data=finalObject[routeSteps[i]]
    let headers=[]*/
    
    /*for(let j=1;j<routeSteps.length;j++){
      
      
        let subData=data[`${routeSteps[j]}total`]
        console.log("subdata",data,subData)
        if(j==1){
          if(subData["items"]?.normalFields!==undefined){
            printReportSegment(subData["items"]["normalFields"],true,routeSteps[0]) 
          }
        }
        
          printReportSegment(subData["items"],false,routeSteps[j])
        
      
    }*/
    reporte=<table style={{boxSizing:"borderBox",borderLeft:"1px solid white",borderBottom:"1px solid white",borderTop:"1px solid white",borderRight:"none",marginBottom:"20px"}}>
      <thead>
        <tr style={{margin:0,padding:0,textAlign:"center",
      }} className="nlb">
          {enc}
        </tr>
      
      </thead>
      <tbody style={{margin:0,padding:0}}>
        <tr style={{margin:0,padding:0}}>
      {outsideTable.map(y=><td style={{margin:0,padding:0}}>{y}</td>)}
      </tr>
      </tbody>
      
    </table>
    
    /*<table>
      <thead>
        <tr>
      {headerEach.map((o,ind)=>{
        return(
          <>
            {titleSeg[ind]}
            {o.map((x,ind)=>{
              if(ind==0){
                return <div>
                  <p>{titleSeg[ind]}</p>{x}
                  </div>
              return x
              }
            })}
          </>
          
      
        )
      })}
      </tr>
      </thead>
      <tbody>
        
        {fullData.map(x=>{
          return <tr>{x}</tr>
        })}
      </tbody></table>*/
    
  totalTables.push(reporte)
  totalTables.push(grandTotals)
  
}

const beginReport=(primero=false,name1,d1)=>{
  //console.log("croutes",calculateRoutes([`getData${currentCategory.name}`]))
  
  let routes=calculateRoutes([`getData${currentCategory.name}`])
  //console.log("routes111",routes)
  //routesfinal encuentra la ultima parada de cada una de las rutas
  //console.log("routesfinal",routesFinal(routes))
  let finalRoutes=routesFinal(routes)
  grandTotals={}
  doneLd={}
  //console.log("finalRoutes",finalRoutes)
  getDataReport(routes,finalRoutes)
  //calculateAmountsBegins(routes)

  /*let parentNodeName,parentNode
  let data=[]
  if(primero){
    parentNode=firstCatNormalFields[parentNodeName]
    data=categoryProducts[parentNodeName]
  }else{
    parentNodeName=name1
    parentNode=otmChoices[parentNodeName]
    data=d1
  }
  console.log("importa",parentNode,parentNodeName,firstCatNormalFields,data)
  return <>
    {displayReport(parentNodeName,parentNode,data)}
    {parentNode.otm.map((x,index)=>{
      let nd=[]
     return  nd=otmChoices[x]["otm"].map(l=>{
        console.log("imp2",l,data[x][l])

        return beginReport(false,l,data[x])
      })
      
    })
      //console.log("x555",x,data,data[x])
    }

  </>*/
    

}
const displayReport=(parentNodeName,parentNode,data)=>{
  const singleFields=parentNode["normal"]
  const otmFields=parentNode["otm"]
  //let data=categoryProducts[parentNodeName]
 
  return displayReport1(parentNode,parentNodeName,singleFields,otmFields,data)

  
}

const displayReport1=(parentNode,parentNodeName,singleFields,otmFields,data)=>{
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
          {otmFields.map(y=>{
            if(otmChoices[y]["normal"].includes("1"))
              return <th>{y} Instances</th>  
            return ""
          }
            
            )}
          
        </tr>
      </thead>
      <tbody>
        {data.map(e=>{
          return <tr>
            <td>{e.id}</td>
            {singleFields.map(t=>{
            return <td>{e[t]}</td>
            })}
            {otmFields.map(y=>{
              if(otmChoices[y]["normal"].includes("1"))
                return <td>{calculateInstancesNumber(e,y)}</td>  
              return ""
         
            })}
            
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
        //console.log("Add new report")
      }}>
      Add New Report
    </FormButton>
    <AddCompositeField
      open={openCompositeFieldDialog}
      toggleDialog={toggleCompositeFieldDialog}
      otmCategoryFields={otmCategoryFields}
      setOtmChoices={setOtmCategoryFields}
      otmChoices={otmCategoryFields}
      specificOtmName={specificOtmName}
      compFieldsArray={compFieldsArray}
      setCompFieldsArray={setCompFieldsArray}
    />
    <AddOtmIdFields
      open={openOtmIdFieldsDialog}
      toggleDialog={toggleOtmIdFieldsDialog}
      otmCategoryFields={otmCategoryFields}
    />
    <WhereStatementStringDialog
      open={openWhereStatementStringDialog}
      toggleDialog={toggleOpenWhereStatementStringDialog}
      conditionsWhere={conditionsWhere}
      setConditionsWhere={setConditionsWhere}
      comboDataSt={comboDataSt}
      setComboDataSt={setComboDataSt}
      {...varsHeadWhereStatement}
    />
    <WhereStatementNumberDialog
      open={openWhereStatementNumberDialog}
      toggleDialog={toggleOpenWhereStatementNumberDialog}
      conditionsWhere={conditionsWhere}
      setConditionsWhere={setConditionsWhere}
      comboDataSt={comboDataSt}
      setComboDataSt={setComboDataSt}
      {...varsHeadWhereStatement}
    />
    <WhereStatementHybridDialog
      open={openWhereStatementHybridDialog}
      toggleDialog={toggleOpenWhereStatementHybridDialog}
      conditionsWhere={conditionsWhere}
      setConditionsWhere={setConditionsWhere}
      comboDataSt={comboDataSt}
      setComboDataSt={setComboDataSt}
      {...varsHeadWhereStatement}
    />

    <WhereSelectMainDialog
      open={openWhereSelectMain}
      toggleDialog={toggleOpenWhereSelectMain}
      conditionsWhere={conditionsWhere}
      setConditionsWhere={setConditionsWhere}
      {...varsHeadWhereStatement}
    
    />
    {openViewWhereStatementNumberDialog && <ViewWhereStatementNumberDialog
      open={openViewWhereStatementNumberDialog}
      toggleDialog={toggleOpenViewWhereStatementNumberDialog}
      addConditionWhereArray={listOfViewConditions}
      {...varsHeadWhereStatement}

    />}
    {openViewWhereStatementStringDialog && <ViewWhereStatementStringDialog
      open={openViewWhereStatementStringDialog}
      toggleDialog={toggleOpenViewWhereStatementStringDialog}
      addConditionWhereArray={listOfViewConditions}
      {...varsHeadWhereStatement}

    />}
    {openViewWhereStatementHybridDialog && <ViewWhereStatementHybridDialog
      open={openViewWhereStatementHybridDialog}
      toggleDialog={toggleOpenViewWhereStatementHybridDialog}
      addConditionWhereArray={listOfViewConditions}
      {...varsHeadWhereStatement}

    />}


    
    {showFields 
    && 
    displayCurCategory(currentCategory,true,true,"",true,[`getData${currentCategory.name}`])
    }
    <FormButton onClick={()=>setReportShow(true)}>Show Report</FormButton>

    {reportShow && beginReport(true,"")}
    {totalTables}
  </div>
}

export default Reports