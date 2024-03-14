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
import { ViewMainWhereCondition } from '../../components/ViewMainWhereCondition'
import { ViewCompositeFieldDialog } from '../../components/ViewCompositeFieldDialog'
import { FcAnswers } from 'react-icons/fc'
import { updateLocale } from 'moment'
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
    //console.log("vars22",vars)
    setVarsHeadWhereStatement(vars)
    setOpenWhereStatementStringDialog(!openWhereStatementStringDialog)
  }
  const [openWhereStatementNumberDialog,setOpenWhereStatementNumberDialog]=useState(false)
  const toggleOpenWhereStatementNumberDialog=(vars)=>{
    //console.log("vars22",vars)
    setVarsHeadWhereStatement(vars)
    setOpenWhereStatementNumberDialog(!openWhereStatementNumberDialog)
  }
  const [openWhereStatementHybridDialog,setOpenWhereStatementHybridDialog]=useState(false)
  const toggleOpenWhereStatementHybridDialog=(vars)=>{
    //console.log("vars22",vars)
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

  const[openViewMainWhereConditionDialog,setOpenViewMainWhereConditionDialog]=useState(false)
  const toggleOpenViewMainWhereConditionDialog=(vars)=>{

    
    setVarsHeadWhereStatement(vars)

    setOpenViewMainWhereConditionDialog(!openViewMainWhereConditionDialog)

  }
  const [openViewCompositeFieldDialog,setOpenViewCompositeFieldDialog]=useState(false)
  const toggleOpenViewCompositeFieldDialog=(vars)=>{
    setVarsHeadWhereStatement(vars)
    setOpenViewCompositeFieldDialog(!openViewCompositeFieldDialog)

  }
  let subTotals={}
  const [grandTotalsSt,setGrandTotalsSt]=useState({})
  const [comboDataSt,setComboDataSt]=useState({})
  //console.log("otmchoices",otmChoices)//,fieldsShown,firstCatNormalFields)
  useEffect(()=>{
    setShowFields(false)
    setFieldsShown([])
  },[currentCategory])
 let sonOtmChoices={}
 ////console.log("sonotm")
 let grandTotals={}
 ////console.log("grandTotals",grandTotalsSt)
  const clearOtmChoicesSons=(name,padre,choicesSonsvars)=>{
    const partialName=`otm${padre}`
    const lengthName=partialName.length
    let secname=name.substring(lengthName)
    let cc=`otm${secname}`
    ////console.log("cc",cc,name)
    sonOtmChoices={...sonOtmChoices,[name]:{normal:[],otm:[],otmdestiny:[],options:[],compositeFields:[]}}
    const sons=Object.keys(sonOtmChoices).
    filter(i=>i.startsWith(cc))
    ////console.log("current sons",name,sons,sonOtmChoices,cc)
    sons.forEach(y=>{
      sonOtmChoices={...sonOtmChoices,[y]:{otm:[],normal:[],options:[],otmdestiny:[],compositeFields:[]}}
      secname=`otm${secname}`
      let nv=y.substring(secname.length)
      ////console.log("nv",nv)
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
      ////console.log("otmchoices",otm,mainCat)
      ////console.log("arr",[...fieldsShown,name1])
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
      ////console.log("arr",fieldsShown.filter(x=>x!==name1))
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
                  //console.log("bit1",trackCatPath[l],ntm,`${x.name1}total`)
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
                //console.log("bit1",trackCatPath[l],ntm,`${x.name1}total`)
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
    ////console.log("name",name)
    const partialName=`otm${padre}`
    const lengthName=partialName.length
    const destCatName=name.slice(lengthName)
    const catDestiny=categories.filter(c=>c.name==destCatName)[0]
    //console.log("trackcatpath",trackCatPath)
    ////console.log("dcn",destCatName,catDestiny)
    
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
            ////console.log("res11",{...otmChoices,[name]:{...otmChoices[name],normal:[...otmChoices[name]["normal"],"1"]}})
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
            ////console.log("res11",{...otmChoices,[name]:{...otmChoices[name],normal:[...otmChoices[name]["normal"],"1"]}})
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
            ////console.log("res11",{...otmChoices,[name]:{...otmChoices[name],normal:[...otmChoices[name]["normal"],"1"]}})
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
      {(conditionsWhere[name]?.["main"]==undefined || typeof conditionsWhere[name]?.["main"]!=="object")?<p>none</p>:
      <p onClick={()=>toggleOpenViewMainWhereConditionDialog({categoryName:name,
        segment:conditionsWhere[name]?.["main"]?.["segment"],
        field:conditionsWhere[name]?.["main"]?.["field"]})}>{conditionsWhere[name]?.["main"]?.["rule"]}</p>
      }
     
      <a style={{textDecoration:"underline",display:"block"}}
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
        ////console.log("click",otmChoices[name]["normal"])
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
            <a style={{color:"yellow", marginRight:"10px"}}
            onClick={()=>{
              toggleOpenViewCompositeFieldDialog({specificOtmName:name,compositeFieldName:d.name1})
            }}>{d.name1}Number</a>
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
          <a style={{color:"yellow",marginRight:"10px"}}
             onClick={()=>{
               toggleOpenViewCompositeFieldDialog({specificOtmName:name,compositeFieldName:d.name1})
          }}>{d.name1}String</a>
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
        ////console.log("click")
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
    /*console.log("res222",busca,firstCatNormalFields[otm]?.normal.filter(x=>{
      if(x.name1==busca){
        //console.log("istwf",true)
        return true
      }
      //console.log("istwf",false)
      return false
    }).length>=1?true:false)*/
    return firstCatNormalFields[otm]?.normal.filter(x=>{
      if(x.name1==busca){
        //console.log("istwf",true)
        return true
      }
      //console.log("istwf",false)
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
  //console.log("bitac",nc,ns,field)
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
              {(nameOtm==""?isReadyToWhereFirst(`getData${currentCategory.name}`,c.name,false):
              isReadyToWhere(nameOtm,c.name,false)) && <a  
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
        <p onClick={()=>toggleOpenViewMainWhereConditionDialog({categoryName:`getData${currentCategory.name}`})}></p>
        {(conditionsWhere[`getData${currentCategory.name}`]?.["main"]==undefined || typeof conditionsWhere[`getData${currentCategory.name}`]?.["main"]!=="object")?<p>none</p>:
      <p onClick={()=>toggleOpenViewMainWhereConditionDialog({categoryName:`getData${currentCategory.name}`,
        segment:conditionsWhere[`getData${currentCategory.name}`]?.["main"]?.["segment"],
        field:conditionsWhere[`getData${currentCategory.name}`]?.["main"]?.["field"]})}>{conditionsWhere[`getData${currentCategory.name}`]?.["main"]?.["rule"]}</p>
      }
        
        {/*(conditionsWhere[`getData${currentCategory.name}`]?.["main"]==undefined ||
        typeof conditionsWhere[`getData${currentCategory.name}`]?.["main"]!=="object")?"none":
    conditionsWhere[`getData${currentCategory.name}`]?.["main"]?.["rule"]*/}
        
        
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
          ////console.log("click")
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
            
            <span style={{marginRight:"10px"}}
            onClick={()=>{
              toggleOpenViewCompositeFieldDialog({specificOtmName:`getData${currentCategory.name}`,compositeFieldName:d.name1})

            }}>{d.name1}Number</span>
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
            <a style={{color:"yellow"}}
            onClick={()=>{
              toggleOpenViewCompositeFieldDialog({specificOtmName:`getData${currentCategory.name}`,compositeFieldName:d.name1})
            }}>{d.name1}</a>
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
            ////console.log("click")
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
  ////console.log("eachroutes",each,routes)
  let lenEach=each.length
  let finalField=field
  Object.keys(routes).forEach(y=>{
    ////console.log("checar",[1,2,3].includes([1,3]))
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

const initializeVarsGld=(r,eachIndex)=>{
  if(doneLd[r[eachIndex]]==undefined)
    doneLd={
      ...doneLd,
      [r[eachIndex]]:{
        done:false,
        len:0,
        count:0,
        nodeDone:[]
      }
    }

  if(r && r[eachIndex]!==undefined){
    if(!grandTotals[r[eachIndex]]){
      grandTotals={
        ...grandTotals,
        [r[eachIndex]]:{
        }
      }
    }
  }
  if(!grandTotals[r[eachIndex]][`${r[eachIndex]}total`]){
    let nv=`${r[eachIndex]}total`
    grandTotals={
      ...grandTotals,
      [r[eachIndex]]:{
        ...grandTotals[r[eachIndex]],
        [nv]:{
        }
      }
    }
  }
  console.log("gtlog",grandTotals)
  if(!grandTotals[r[eachIndex]][`${r[eachIndex+1]}total`]){
    grandTotals={
      ...grandTotals,
      [r[eachIndex]]:{
        ...grandTotals[r[eachIndex]],
        [`${r[eachIndex+1]}total`]:{

        }  
      }
    }
  }

  console.log("uiop",grandTotals)

  let current
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
  return current

}

const getNumericVariablesSonCategories=(current,categoryfields)=>{
  let otherAccVars={}
  console.log("pwww",current,categoryfields)
  if(current!=="undefinedtotal"){
    categoryfields?.normal.forEach(l=>{
      if(l.type=="number")
       otherAccVars={...otherAccVars,[`${l.name1}total`]:0}
    })
    categoryfields?.compositeFields.forEach(l=>{
      if(l.type=="number")
       otherAccVars={...otherAccVars,[`${l.name1}total`]:0}
    })
  }
  return otherAccVars
}

const getTotalsOfSonNumericVariables=(oavTotals,data,routeStep,r,eachIndex)=>{
  let final=[]
  //if(Object.keys(oavTotals).length>0){
    console.log("step441",oavTotals,data,routeStep,r,eachIndex)
    data?.forEach(y=>{
      //if(verifyMeetWithConditionsBySegmentBaseLevel(r,eachIndex,y)){

        final=[...final,y.id]
        console.log("step44",final,oavTotals)
        Object.keys(oavTotals).forEach(p=>{
          const nn=p.substring(0,p.length-5)
          let oo=buscaCompField(compFieldsArray[routeStep],nn)
          if(oo!==false){
            if(oo.type=="number"){
              console.log("gcf",oavTotals,p,oavTotals[p],getCompFieldNumber(y,oo.structure))
              oavTotals[p]+=parseFloat(getCompFieldNumber(y,oo.structure,compFieldsArray[routeStep]))
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
        
      //}
    })
//}
  console.log("paroat",[oavTotals,final])
  return [oavTotals,final]
}

const getNormalFieldsOfEachIndex=(object,step,x)=>{
  let normalFields={}
  object?.normal?.forEach(oo=>{
    if(oo["name1"]!=="1" && oo["name1"]!=="2" && oo["name1"]!=="3"){
      normalFields={...normalFields,[oo["name1"]]:x[oo["name1"]]}
      if(doneLd[step].done==false){
        if(oo.type=="number"){
          if(grandTotals[step][`${step}total`][oo["name1"]]==undefined)
            grandTotals[step][`${step}total`]={...grandTotals[step][`${step}total`],[oo["name1"]]:0}
      
          let nc=0
          if(x[oo["name1"]]!==null)
            nc=x[oo["name1"]]
            
            
          grandTotals={
            ...grandTotals,
            [step]:{
              ...grandTotals[step],
              [`${step}total`]:{
                ...grandTotals[step][`${step}total`],
                [oo["name1"]]:grandTotals[step][`${step}total`][oo["name1"]]+nc
              }
            
            }
          }
        }
      }
    }
  })
  
  object?.otmdestiny?.forEach(oo=>{
    normalFields={...normalFields,[oo]:x[oo]}
  })
  object?.compositeFields?.forEach(l=>{
    if(l.type=="number"){
    
      if(grandTotals[step][`${step}total`][l["name1"]]==undefined)
        grandTotals[step][`${step}total`]={...grandTotals[step][`${step}total`],[l["name1"]]:0}
      
      normalFields={
        ...normalFields,
        [`${l["name1"]}`]:getCompFieldNumber(x,l.structure,compFieldsArray[step])
      }
      if(doneLd[step].done==false){
        if(l.type=="number"){
          let nc=0
          if(getCompFieldNumber(x,l.structure,compFieldsArray[step])!==null)
            nc=getCompFieldNumber(x,l.structure,compFieldsArray[step])
        
        
          
          grandTotals={
            ...grandTotals,
            [step]:{
              ...grandTotals[step],
              [`${step}total`]:{
                ...grandTotals[step][`${step}total`],
                [l["name1"]]:grandTotals[step][`${step}total`][l["name1"]]+nc
              }
            
            }
          }
        
        }else if(l.type=="string"){
          normalFields={...normalFields,[`${l["name1"]}`]:getCompFieldString(x,l.structure,compFieldsArray[step])}
        }
      }
    }
  })
  //if(indice==(doneLd[r[eachIndex]].len-1))
    //doneLd[r[eachIndex]].done=true

  normalFields={id:x["id"],...normalFields}
  return normalFields
}

const evaluateRule=(answers,operators)=>{
  let wholeAnswer=false
  console.log("evalrule",answers,operators)
  if(answers.length==operators.length){
    for(let x in operators){
      x=parseInt(x)
      if(operators[x]=="none")
        wholeAnswer=answers[0]
      else if(operators[x]=="not")
        wholeAnswer=!answers[x]
      else if(operators[x]=="and not")
        wholeAnswer=wholeAnswer && !answers[x]
      else if(operators[x]=="or not")
        wholeAnswer=wholeAnswer || !answers[x]
      else if(operators[x]=="or")
         wholeAnswer=wholeAnswer || answers[x]
      else if(operators[x]=="and")
        wholeAnswer=wholeAnswer && answers[x]

    }

  }
  return wholeAnswer
}

const checkRule=(rulex,x,sameCategorySegment,field,type)=>{
  let rule=rulex["rule"]
  let arrAnswers=[]
  let ops=[]
  console.log("paramsxx",rule,x,sameCategorySegment,field,type)
  if(true){

    if(rule.length>1){
      
      
      if(rule[1]=="wherePrevious"){
        let r=conditionsWhere[rule["category"]][r["segment"]][r["fieldName"]][rule[2]]
        ops=[...ops,rule[0]]
        arrAnswers=[...arrAnswers,checkRule(r,x,field,type)]
      }else if(type=="string"){ 
        for(let i in rule){
          
          
          if(i%3==0){
            let nk=parseInt(i)
            ops=[...ops,rule[nk]]
            console.log("entro aqui76",rule,rule[nk+1],nk+1,rule.length,i,x[field],x?.[field]?.toString()?.startsWith(rule[nk+2])) 

            if(rule[nk+1]=="starts with"){
              
              if(x?.[field]?.toString()?.startsWith(rule[nk+2]))
                arrAnswers=[...arrAnswers,true]
              else
                arrAnswers=[...arrAnswers,false]
              console.log("entrostart",field,x?.[field],arrAnswers)
            }else if(rule[nk]=="contains"){
              if(x[field].toString().includes(rule[nk+2]))
                arrAnswers=[...arrAnswers,true]
              else  
                arrAnswers=[...arrAnswers,false]
            }else if(rule[nk]=="ends with"){
              if(x?.[field].toString().endsWith(rule[nk+2]))
                  arrAnswers=[...arrAnswers,true]
                else
                  arrAnswers=[...arrAnswers,false]
            }else if(rule[nk]=="between"){
              if(x?.[field]?.toString().toUpperCase()>rule[nk+2].initial && x?.[field]?.toString()?.toUpperCase()<rule[nk+2].final)
                arrAnswers=[...arrAnswers,true]
              else
                arrAnswers=[...arrAnswers,false]
            }
          }  
        }
      }else if(type=="number"){
  
        for(let i in rule){
          if(i%3==0){
            let nk=parseInt(i)
            ops=[...ops,rule[nk]]
          
         
            if(rule[nk+1]==">"){
              if(x[field]>rule[nk+2])
                arrAnswers=[...arrAnswers,true]
              else 
                arrAnswers=[...arrAnswers,false]
            }else if(rule[nk+1]==">="){
              if(x[field]>=rule[nk+2])
                arrAnswers=[...arrAnswers,true]
              else 
                arrAnswers=[...arrAnswers,false]
            }else if(rule[nk+1]=="<"){
              if(x[field]<rule[nk+2])
                arrAnswers=[...arrAnswers,true]
              else 
                arrAnswers=[...arrAnswers,false]
            }else if(rule[nk+1]=="<="){
              if(x[field]<=rule[nk+2])
                arrAnswers=[...arrAnswers,true]
              else 
                arrAnswers=[...arrAnswers,false]
            }else if(rule[nk+1]=="="){
              if(x[field]==rule[nk+2])
                arrAnswers=[...arrAnswers,true]
              else 
                arrAnswers=[...arrAnswers,false]
            }else if(rule[nk+1]=="!="){
              if(x[field]!=rule[nk+2])
                arrAnswers=[...arrAnswers,true]
              else 
                arrAnswers=[...arrAnswers,false]
            }
          }
        }
      }   
    }
  }else if(field!=="hybrid"){
    console.log("res segmentotherthatmain")
  }

    return evaluateRule(arrAnswers,ops)
}

const checkRuleHybridFinal=(rulex,x)=>{
  let rule=rulex["rule"]
  let arrAnswers=[]
  let ops=[]
 // console.log("paramsxx",rule,x,sameCategorySegment,field,type)
  for(let i in rule){
    if(i%2==0){
      let nk=parseInt(i)
      ops=[...ops,rule[nk]]
      let data=rule[nk+1]
      let specificRule=conditionsWhere[data["category"]][data["segment"]][data["field"]][data["rule"]]
      let type=conditionsWhere[data["category"]][data["segment"]][data["field"]]["type"]
      let res
      if(type!=="hybrid")
        res=checkRule(specificRule,x,false,data["field"],type,data)
      else{
        res=checkRuleHybridFinal(specificRule,x,false,data["field"],type)
      }
      arrAnswers=[...arrAnswers,res]
    }
  }
  return evaluateRule(arrAnswers,ops)

}

const checkRuleHybrid=(rulex,x,index)=>{
  let rule=rulex["rule"]
  let arrAnswers=[]
  let ops=[]
 // console.log("paramsxx",rule,x,sameCategorySegment,field,type)
  for(let i in rule){
    if(i%2==0){
      let nk=parseInt(i)
      ops=[...ops,rule[nk]]
      let data=rule[nk+1]
      let specificRule=conditionsWhere[data["category"]][data["segment"]][data["field"]][data["rule"]]
      let type=conditionsWhere[data["category"]][data["segment"]][data["field"]]["type"]
      let res
      console.log("rulenk",rule[nk],conditionsWhere[data["category"]],x,x[data["segment"]][index])
      if(data["segment"]!=="hybrid")
        res=checkRule(specificRule,x[data["segment"]][index],false,data["field"],type,data)
      else{
        res=checkRuleHybrid(specificRule,x,index)
      }
      arrAnswers=[...arrAnswers,res]
    }
  }
  return evaluateRule(arrAnswers,ops)
}
const verifyMeetWithConditionsBySegmentBaseLevel2=(category,data)=>{
  console.log("datadetail",data,category)
  let u=conditionsWhere[category]?.["main"]
  //console.log("veri222",category,x)
  if(u!==undefined){
  let getMainRule=conditionsWhere[u["category"]][u["segment"]][u["field"]][u["rule"]]
  let type=conditionsWhere[u["category"]][u["segment"]][u["field"]]["type"]
  let datafield=conditionsWhere[u["category"]][u["segment"]][u["field"]]
  let res
  if(u["category"]==u["segment"]){
    if(u["rule"]=="none" || u["rule"]=="")
      return true
    else{
      Object.keys(data[category]).forEach(y=>{
        if(!checkRule(getMainRule,data[u["segment"]],u["category"]==u["segment"],u["field"],type,u)){
          Object.keys(data).forEach(l=>{
            delete data[l][y]
          })
          
      }})
    }
    
  }else if(u["category"]!==u["segment"] && u["segment"]!=="hybrid"){
    if(u["rule"]=="none" || u["rule"]=="")
      return true
    else{
    
      Object.keys(data[u["segment"]]).forEach(y=>{
        if(!checkRule(getMainRule,data[category][u["segment"]][y],false,u["field"],type,u)){
          Object.keys(data).forEach(l=>{
            delete data[l][y]
          })
        }
      })
    }
  }else if(u["segment"]=="hybrid"){
    Object.keys(data[u["category"]]).forEach(y=>{
      if(!checkRuleHybrid(getMainRule,data,y)){
        Object.keys(data).forEach(l=>{
          delete data[l][y]
        })
      }
    })
  }
    
}
}


const verifyMeetWithConditionsBySegmentBaseLeve1=(category,x)=>{
  let u=conditionsWhere?.[category]?.["main"]
  console.log("veri222",category,x,u)
  if(u!==undefined){
  let getMainRule=conditionsWhere[u["category"]][u["segment"]][u["field"]][u["rule"]]
  let type=conditionsWhere[u["category"]][u["segment"]][u["field"]]["type"]
  let datafield=conditionsWhere[u["category"]][u["segment"]][u["field"]]
  let res
  if(u=="none" || u==""){
    return true
  }else{
    if(u["category"]==u["segment"]){//en este caso involucra datos de la misma categoria de un solo campo
      res=checkRule(getMainRule,x,u["category"]==u["segment"],u["field"],type,u)
    
    }else if(u["segment"]=="hybrid"){ //en este caso involucra casos de diferentes variables de la misma categoria
      console.log("different to main segment")

      res=checkRuleHybridFinal(getMainRule,x,datafield,u["rule"])
    }else{//en este caso involucra variables de totales de las relaciones hijas
      res=checkRule(getMainRule,x,false,u["field"],type,u)
      
    }
  }
  
  console.log("resformal",x.id,res,x)
  return res

  }
  return true

}



const verifyMeetWithConditionsBySegmentBaseLevel=(r,eachIndex,x)=>{
  let u=conditionsWhere?.[r[eachIndex]]?.["main"]
  console.log("veri222",r[eachIndex])
  let getMainRule=conditionsWhere[u["category"]][u["segment"]][u["field"]][u["rule"]]
  let type=conditionsWhere[u["category"]][u["segment"]][u["field"]]["type"]
  let datafield=conditionsWhere[u["category"]][u["segment"]][u["field"]]
  let res
  if(u["category"]==u["segment"]){//en este caso involucra datos de la misma categoria de un solo campo
    res=checkRule(getMainRule,x,u["category"]==u["segment"],u["field"],type,u)
  }else if(u["segment"]=="hybrid"){ //en este caso involucra casos de diferentes variables de la misma categoria
    console.log("different to main segment")

    res=checkRuleHybrid(getMainRule,x,datafield,u["rule"])
  }else{//en este caso involucra variables de totales de las relaciones hijas
    res="pending"
    
  }
  
  console.log("resformal",x.id,res,x)
  return res



}

const getLevelData1=(eachStopData,r,eachIndex)=>{
  console.log("r eachindexgl",r, eachIndex,conditionsWhere)
  let current=initializeVarsGld(r,eachIndex)
  
  let newData=[]
  eachStopData.map((x,indice)=>{
    //console.log("xxxx",x)
    //if(verifyMeetWithConditionsBySegmentBaseLevel(r,eachIndex,x)==true || verifyMeetWithConditionsBySegmentBaseLevel(r,eachIndex,x)=="pending"){

      let ui=[...doneLd[r[eachIndex]].nodeDone]
      if([...ui].includes(x["id"]))
        doneLd={...doneLd,[r[eachIndex]]:{...doneLd[r[eachIndex]],count:doneLd[r[eachIndex]].count++,
        done:true}}
      else
      doneLd={...doneLd,[r[eachIndex]]:{...doneLd[r[eachIndex]],nodeDone:[...doneLd[r[eachIndex]]["nodeDone"],x["id"]],count:doneLd[r[eachIndex]].count++,
        done:false}}
      
      newData=x[r[eachIndex+1]]
      let oavTotals=getNumericVariablesSonCategories(current,otmChoices[r[eachIndex+1]])    
      console.log("ot55",oavTotals)
      let otherAccVars=[]
      console.log("curr",current)
      //if(current!=="undefinedtotal")
        otherAccVars=getTotalsOfSonNumericVariables(oavTotals,x[r[eachIndex+1]],r[eachIndex+1],r,eachIndex+1)
      /*else 
        otherAccVars=[{},[]]*/
      console.log("ot,oav",otherAccVars)
      totalRoutes={
        ...totalRoutes,
        [r[eachIndex]]:{
          ...totalRoutes[r[eachIndex]],
          [current]:{
            ...totalRoutes[r[eachIndex]][current],
            [x.id]:{
              normalData:{},
              total:0,
              keys:[],
              ...otherAccVars[0]
            }
          }
        }
      }
      let normalFields
      if(r[eachIndex]==`getData${currentCategory.name}`)
        normalFields=getNormalFieldsOfEachIndex(firstCatNormalFields[r[eachIndex]],r[eachIndex],x)
      else
        normalFields=getNormalFieldsOfEachIndex(otmChoices[r[eachIndex]],r[eachIndex],x)
    
      totalRoutes={
        ...totalRoutes,
        [r[eachIndex]]:{
          ...totalRoutes[r[eachIndex]],
          [current]:{
            ...totalRoutes[r[eachIndex]][current],
            [x.id]:{
              ...totalRoutes[r[eachIndex]][current][x.id],
              normalData:{...normalFields},
              total:otherAccVars[1].length,
                /*?[...Object.keys(otherAccVars[0])].length:
                totalRoutes[r[eachIndex]][current][x.id]["total"]+[...Object.keys(otherAccVars[0])].length,*/
              keys:otherAccVars[1].length!==0?otherAccVars[1]:[],
                
              ...otherAccVars[0]
            }
          }
            
        }
      }
      console.log("xxx",totalRoutes)
      if(eachIndex+1<r.length)
        getLevelData1(newData,r,eachIndex+1,true)
      
    //}  
      
    
  })
}





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

const anyHigherthan1=(routes,finalRoutes)=>{
  for(let i=0;i<finalRoutes.length;i++){
    if(routes[finalRoutes[i]].length>=2){
    
      return true
    }
  }
  return false
}
let resultado=[]

const getCatPadre=routes=>{
  let max=0
  let numRoute=-1
  for(let i=0;i<routes.length;i++){
    if(routes[i].length>=2 && routes[i].length>max){
      numRoute=i
      max=routes[i].length
    }

  }
  if(numRoute!==-1){
    console.log("rrr",routes[numRoute][routes[numRoute].length-2])
    return routes[numRoute][routes[numRoute].length-2]
  }
  else{  
    console.log("rrr","-1")
    return -1
  }
}

const findFather=(catPadre,route,legRoutes,j)=>{
  
  for(let i=0;i<route.length;i++){
    //console.log("findfather",catPadre,route[i],route[i]==catPadre)
    if(route[i]==catPadre){
      let res=legRoutes[j][i+1]
      console.log("findfather",catPadre,legRoutes,res,legRoutes[j][i+1],legRoutes[j][i+2])
      let u=`${legRoutes[j][i+2]}total`
      console.log("ufinal",u)
      let res1
      if(u!=undefined)
        res1=[res,u]
      else
        res1=[res,"final"]
      route.splice(route.length-1,1)
      return res1
    }
  }
  return -1
}

const calculateSons=(routes,catPadre,legRoutes)=>{
  let res=[]
  console.log("params routes catpadre",routes,catPadre,routes[0])
  for(let i=0;i<routes.length;i++){
    let r1=findFather(catPadre,routes[i],legRoutes,i)
    if(r1!=-1){
      
      res=[...res,...r1]
    }
  }
  return res
}

const findTheLowerLevelCategory1=(routes,res=[],legRoutes)=>{
  let catPadre=getCatPadre(routes)
  
  if(catPadre!==-1){
    let sons={}
    if(sons[catPadre]==undefined)
      sons[catPadre]=[]
    //sons[catPadre]=calculateSons(routes,catPadre)
    res=[...res,{[catPadre]:calculateSons(routes,catPadre,legRoutes)},...findTheLowerLevelCategory1(routes,res,legRoutes)]

    
    return res
  }else{

  console.log("ressons",res,routes)
  return res
  }
}

  /*a ver, bueno, si yo tengo las rutas finales siguientes:
  getdataclientes
  otmclientesfacturas
  otmfacturasdetallesfacturas

  y

  getdataclientes
  otmclientestelefonos

  tengo que empezar con la ruta que este mas grande
  que en este caso es otmfacturasdetallesfacturas, pero como esta es terminal tengo que empezar con la superior
  que es otmclientesfacturas, pero otmclientesfacturas pudiera, no en este caso, tener mas de un hijo, por lo 
  que tengo que hacer el proceso de update numericuppervalues para todas ellas que correspondan a 
  otmclientesfacturas

  este caso aplica a getdatclientes que tiene como hijos inmediatos a otmclientesfacturas y 
  otmclientestelefonos tengo que hacerlo para los dos

  y finalmente tengo que hacer un recorrido de la parte superior al nivel inferior con cada ruta para filtrar
  los registros de las  categorias hijos que unicamente correspondan con los registros del padre y asi
  finalmente y definitivamente tendremos el resultado querido y deseado por el sabio pueblo de mexico
  que como nosotros sabemos sabe mas de lo que debe pero menos de lo que quisiera saber
  
  entonces que chingados va a hacer esta funcion; bueno me voy con la rutafinal mas grande,
  y selecciono la ultima y la penultima que son otmclientesfacturas y otmfacturasdetallesfacturas y la añado a la variable final resultado,
  [{otmclientesfacturas:[otmdetallesfacturas]}], posteriormente busco en las demas rutas la correspondiente
  ruta padre que es otmclientesfactuas que no hay,

  despues elimino de la ruta con la que estoy trabajando el ultimo elemento, y hago el mismo proceso para
  lo que queda, osea selecciono la ruta final mas grande, y selecciono la ultima y penultima que son getdatclientes
  y tomclientesfacturas y la anado, y lo mismo sucede para getdataclientes y otmclientestelefonos

  [{otmclientesfacturas:[otmdetallesfacturas],getdatclientes:[otmclientesfacturas,otmclientestelefonos]}]
  
  Como resumen despues de tener esto comienzo el proceso de filtrado con el primer elemento del arreglo y 
  sus valores del arreglo 
  */

const updateUpperLevel=(routeIndex,son,routes,numericVariables,routeIndexBase)=>{
  //mainArray es la tabla de la relacion superior
  //routeIndex=routeIndex-1
  console.log("finalObj11",finalObject,routes[routeIndex],routes[routeIndex+1])
  if(routeIndex>=0){
  let mainArray=totalRoutes[routes[routeIndex]][`${routes[routeIndex+1]}total`]

  let sonIds=[]
  let nv
  if(routeIndex+1==routes.length-1){
    nv=finalObject[routes[routeIndex+1]][son]
    sonIds=Object.keys(nv)
  }
    
  else{
    if(typeof nv=="object"){
    nv=finalObject[routes[routeIndex+1]][son]
    sonIds=Object.keys(nv)
    }
  }
  console.log("nv44",nv,mainArray,sonIds,finalObject,routes[routeIndex],son)
    
  let dataPrev=totalRoutes[routes[routeIndex+1]][`${routes[routeIndex+2]}total`]
  let variables= {}

  if(finalObject[routes[routeIndex]]==undefined)
    finalObject={...finalObject,[routes[routeIndex]]:{}}
  if(finalObject[routes[routeIndex]][son]==undefined)
    finalObject={...finalObject,[routes[routeIndex]]:{...finalObject[routes[routeIndex]],
    [son]:{}}}

  console.log("espec",mainArray,sonIds,dataPrev)
  Object.keys(mainArray).forEach(l=>{
    let keys=mainArray?.[l]?.keys
    sonIds=sonIds.map(ii=>parseInt(ii))
    console.log("espec1",keys,sonIds,keys.some(y=>sonIds.includes(y)))
    if(keys.some(y=>sonIds.includes(y))){
      Object.keys(numericVariables).forEach(u=>{
        Object.keys(numericVariables).forEach(oo=>
          numericVariables[oo]=0
          )
        keys.forEach(w=>{
          if(nv[w])
          if(routeIndex==routes.length-2){
            numericVariables[u]+=nv[w][`${u.substring(0,u.length-5)}`]
          }else{
            numericVariables[u]+=nv[w][u]
          }
        })
        
      })
    }else{
      Object.keys(numericVariables).forEach(oo=>
        numericVariables[oo]=0
      )
    }
    finalObject={...finalObject,
      [routes[routeIndex]]:{
        ...finalObject[routes[routeIndex]],
        [son]:{...finalObject[routes[routeIndex]][son],
          [mainArray[l]["normalData"].id]:{
            ...mainArray[l]["normalData"],
            keys:keys,
            ...numericVariables
          }
        }
      }
    }
    
  }) 
  }
  /*Object.keys(finalObject[routes[routeIndex]][son]).forEach(l=>{
    if(l!=="keys"){
      if(!verifyMeetWithConditionsBySegmentBaseLevel(routes,routeIndex,finalObject[routes[routeIndex]][son][l]))
        delete finalObject[routes[routeIndex]][son][l]
    }
  })*/
}

const updateNumericVariablesUpperLevels=(mainArray,numericVariables,routeIndex,routeIndexm1,routes,parent,son,routeIndexBase)=>{
  //let currentLevel=totalRoutes[routes[routeIndexm1]][routes[routeIndex]]
 //let nkeys=currentLevel.keys
  console.log("ma890",mainArray)
  if(routeIndex==routes.length-1){
    Object.keys(mainArray).forEach(p=>{
      console.log("rep",mainArray[p].normalData,verifyMeetWithConditionsBySegmentBaseLevel(routes,routeIndex,mainArray[p].normalData))
      if(verifyMeetWithConditionsBySegmentBaseLevel(routes,routeIndex,mainArray[p].normalData)){
        finalObject={
          ...finalObject,
          [routes[routeIndex]]:{
            ...finalObject[routes[routeIndex]],
            [routes[routeIndex]]:{
              ...finalObject[routes[routeIndex]][routes[routeIndex]],
              [mainArray[p].normalData.id]:{...mainArray[p].normalData}
            }

            
          }
        }

      }
    })
  }
  
  
  for(let j=routeIndex-1;j>=0;j--)
    updateUpperLevel(j,son,routes,numericVariables,routeIndexBase)
  
  
}

const isLast=(cat)=>{
  if(totalRoutes[cat]?.["undefinedtotal"]==undefined){
    return false
  }
  return true
}

const getNumericFields=(cat)=>{
  let res={normal:[],compositeFields:[]}
  if(cat==`getData${currentCategory.name}`){
    firstCatNormalFields?.[cat]?.["normal"].forEach(x=>{
      if(x.type=="number")
        res["normal"].push(x.name1)
  
    })
    firstCatNormalFields?.[cat]?.["compositeFields"].forEach(x=>{
      if(x.type=="number")
        res["compositeFields"].push(x.name1)
    })
  }else{
    
    otmChoices?.[cat]?.["normal"].forEach(x=>{
      if(x.type=="number")
        res["normal"].push(x.name1)

    })
    otmChoices?.[cat]?.["compositeFields"].forEach(x=>{
      if(x.type=="number")
        res["compositeFields"].push(x.name1)
    })
  }
  console.log("numericvalues",cat,res)
  return res
}

const updateNumericFields=(key,cat,nf,obj,terminal,first)=>{
  console.log("unf",key,cat,nf,obj,terminal,finalObject)

  nf=getNumericFields(cat)
  //if(!isLast(key)){
    let k=Object.keys(obj)
    for(let i=0;i<k.length;i++){
      if(finalObject[key][cat][k[i]]==undefined){
        //if(verifyMeetWithConditionsBySegmentBaseLeve1(key,obj[k[i]].normalData)){
      
          finalObject[key][cat]={...finalObject[key][cat],[k[i]]:{...finalObject[key][cat][k[i]],/*...obj[k[i]].normalData,*/keys:obj[k[i]].keys/*[`${cat}keys`]:obj[k[i]].keys*/}}
      
    
          for(let x=0;x<nf.normal.length;x++){
            finalObject[key][cat][k[i]]={...finalObject[key][cat][k[i]],[`${nf.normal[x]}total`]:0}
           }
          for(let x=0;x<nf.compositeFields.length;x++){
            finalObject[key][cat][k[i]]={...finalObject[key][cat][k[i]],[`${nf.compositeFields[x]}total`]:0}
          }
        //}
      }
    }
    //getTotalsOfNumericVariables(finalObject[cat],finalObject[key][cat],cat)

  /*}else{

    let k=Object.keys(obj)
    for(let i=0;i<k.length;i++){
      if(finalObject[key][cat][k[i]]==undefined)
        finalObject[key][cat]={...finalObject[key][cat],[k[i]]:{...obj[k[i]].normalData}}
      
    
      for(let x=0;x<nf.normal.length;x++){
        finalObject[key][cat][k[i]]={...finalObject[key][cat][k[i]],[nf.normal[x]]:0}
      }
      for(let x=0;x<nf.compositeFields.length;x++){
        finalObject[key][cat][k[i]]={...finalObject[key][cat][k[i]],[nf.compositeFields[x]]:0}
      }
    }
  }*/
  //console.log("unf",key,cat,nf,obj,terminal,finalObject)

}

const initializeOtherFinalObjectVariables=(key,cat,obj,next,first)=>{
  
  if(finalObject[key]==undefined)
    finalObject={...finalObject,[key]:{}}
  if(finalObject[key][cat]==undefined)
    finalObject={...finalObject,[key]:{...finalObject[key],[cat]:{}}}
  let k=Object.keys(obj)
  let nf=getNumericFields(cat)  
  let temp=totalRoutes[cat][next]

  //if(!isLast(cat)){
    for(let i=0;i<k.length;i++){
      if(finalObject[key][cat][k[i]]==undefined){
        //if(verifyMeetWithConditionsBySegmentBaseLeve1(key,obj[k[i]].normalData)){
          finalObject[key][cat]={...finalObject[key][cat],[k[i]]:{...finalObject[key][cat][k[i]]/*,...obj[k[i]].normalData*/,keys:obj[k[i]].keys/*,[`keys${cat}`]:obj[k[i]].keys}*/}}
      
    
          for(let x=0;x<nf.normal.length;x++){
            finalObject[key][cat][k[i]]={...finalObject[key][cat][k[i]],[`${nf.normal[x]}total`]:0}
           }
          for(let x=0;x<nf.compositeFields.length;x++){
            finalObject[key][cat][k[i]]={...finalObject[key][cat][k[i]],[`${nf.compositeFields[x]}total`]:0}
          }
        //}
      }

    }
   //getTotalsOfNumericVariables(finalObject[cat],finalObject[key][cat],cat)
/*}else{
    for(let i=0;i<k.length;i++){
      if(finalObject[key][cat][k[i]]==undefined){
        if(finalObject[key][cat][k[i]]==undefined){
          if(verifyMeetWithConditionsBySegmentBaseLeve1(cat,obj[k[i]].normalData)){
      
      
            finalObject[key][cat]={...finalObject[key][cat],[k[i]]:{...obj[k[i]].normalData}}
      
    
            for(let x=0;x<nf.normal.length;x++){
              finalObject[key][cat][k[i]]={...finalObject[key][cat][k[i]],[nf.normal[x]]:0}
            }
            for(let x=0;x<nf.compositeFields.length;x++){
              finalObject[key][cat][k[i]]={...finalObject[key][cat][k[i]],[nf.compositeFields[x]]:0}
            }
          }
        }
      }
    }
  }*/  
  console.log("objobser34",obj,key,cat,isLast(cat),finalObject)

}


  

  
  
  


const updateNumericFieldsRoot=(key,cat,obj,next,first)=>{
  //nf son los campos numericos de la key
  //tenemos que recordar que obj son los campos de esa clave

  let nf=getNumericFields(key)
  
  let k=Object.keys(obj)
    for(let i=0;i<k.length;i++){
      if(finalObject[key][key]?.[k[i]]==undefined){
        //if(verifyMeetWithConditionsBySegmentBaseLeve1(key,obj[k[i]].normalData)){
          finalObject[key][key]={...finalObject[key][key],[k[i]]:{...finalObject[key][key][k[i]],...obj[k[i]].normalData/*keys:obj[k[i]].keys*/}}
      
    
         /*for(let x=0;x<nf.normal.length;x++){
            finalObject[key][key][k[i]]={...finalObject[key][key][k[i]],[`${nf.normal[x]}tota}
          }
        for(let x=0;x<nf.compositeFields.length;x++){
          finalObject[key][key][k[i]]={...finalObject[key][key][k[i]],[`${nf.compositeFields[x]}total`]:0}
        }*/
      //}
    }
    //getTotalsOfNumericVariables(finalObject[first][cat],finalObject[key][cat],cat,nf)

  }
    console.log("objobser",obj,key,finalObject)
}

const getTotalsOfNumericVariables=(a1,a2,cat,nf)=>{
  console.log("a1 a2",a1,a2)
//a1 es la categoria hija inmediata, y a2 es la categoria superior inmediata
  
  Object.keys(a1).forEach(p=>{
    
    //p son las claves de la categoria inferior
    let x=Object.keys(a1[p])

    //x son los ids de la categoria inferior
    for(let m1=0;m1<x.length;m1++){
      
      Object.keys(a2[p]).forEach(o=>{
        ////console.log("m1",a2[o].keys,x[m1],a2[o].keys.includes(parseInt(x[m1])))
        if(a2[p][o].keys.includes(parseInt(x[m1]))){
          let nf=getNumericFields(p)
          //console.log("m1",nf)
          //if(cat!=p){
            for(let j1=0;j1<nf.normal.length;j1++){
              
              console.log("m1",a2,o,a2[p],a2[p][o],a1,p,x[m1],nf["normal"][j1],`${nf["normal"][j1]}total`,isLast(p),a1[p],a1[p][x[m1]],a1[p][x[m1]][nf["normal"]],a1[p][x[m1]][nf["normal"][j1]],a1[p][x[m1]][`${nf["normal"][j1]}total`],a2[p][o][`${nf["normal"][j1]}total`])
              if(isLast(cat) || p==cat){
                let st=0
                console.log("prob",a1[p][x[m1]][nf["normal"][j1]],nf["normal"][j1])
                if(a1[p][x[m1]][nf["normal"][j1]]!=null && a1[p][x[m1]][nf["normal"][j1]]!=undefined){
                  st=a1[p][x[m1]][nf["normal"][j1]]
                }
                a2[p][o][`${nf["normal"][j1]}total`]+=st
              
              }else{
                let st=0
                console.log("prob",a1[p][x[m1]][`${nf["normal"][j1]}total`],nf["normal"][j1])
                if(a1[p][x[m1]][`${nf["normal"][j1]}total`]!=null && a1[p][x[m1]][`${nf["normal"][j1]}total`]!=undefined)
                  st=a1[p][x[m1]][`${nf["normal"][j1]}total`]
                a2[p][o][`${nf["normal"][j1]}total`]+=st
              }
            } 
            for(let j1=0;j1<nf.compositeFields.length;j1++){
              
              console.log("m1",a2,o,a2[p],a2[p][o],a1,p,x[m1],nf["compositeFields"][j1],`${nf["compositeFields"][j1]}total`,isLast(p),a1[p],a1[p][x[m1]],a1[p][x[m1]][nf["compositeFields"]],a1[p][x[m1]][nf["compositeFields"][j1]],a1[p][x[m1]][`${nf["compositeFields"][j1]}total`],a2[p][o][`${nf["compositeFields"][j1]}total`])
              
              if(isLast(cat) || cat==p){
                let st=0
                console.log("prob",a1[p][x[m1]][nf["compositeFields"][j1]],nf["compositeFields"][j1])
                if(a1[p][x[m1]][nf["compositeFields"][j1]]!=null && a1[p][x[m1]][nf["compositeFields"][j1]]!=undefined){
                  st=a1[p][x[m1]][nf["compositeFields"][j1]]
                }
                a2[p][o][`${nf["compositeFields"][j1]}total`]+=st
              
              }else{
                let st=0
                console.log("prob",a1[p][x[m1]][`${nf["compositeFields"][j1]}total`],nf["compositeFields"][j1])
                if(a1[p][x[m1]][`${nf["compositeFields"][j1]}total`]!=null && a1[p][x[m1]][`${nf["compositeFields"][j1]}total`]!=undefined)
                  st=a1[p][x[m1]][`${nf["compositeFields"][j1]}total`]
                a2[p][o][`${nf["compositeFields"][j1]}total`]+=st
              }
            }
          }/*else{
            for(let j1=0;j1<nf.normal.length;j1++){
              
              console.log("m1",a2,o,a2[p],a2[p][o],a1,p,x[m1],nf["normal"][j1],`${nf["normal"][j1]}total`,isLast(p),a1[p],a1[p][x[m1]],a1[p][x[m1]][nf["normal"]],a1[p][x[m1]][nf["normal"][j1]],a1[p][x[m1]][`${nf["normal"][j1]}total`],a2[p][o][`${nf["normal"][j1]}total`])
              let st=0
              console.log("prob",a1[p][x[m1]][`${nf["normal"][j1]}total`],nf["normal"][j1])
              if(a1[p][x[m1]][`${nf["normal"][j1]}total`]!=null && a1[p][x[m1]][`${nf["normal"][j1]}total`]!=undefined)
                st=a1[p][x[m1]][`${nf["normal"][j1]}total`]
              a2[p][o][`${nf["normal"][j1]}total`]+=st
            }
             
            for(let j1=0;j1<nf.compositeFields.length;j1++){
              
              console.log("m1",a2,o,a2[p],a2[p][o],a1,p,x[m1],nf["compositeFields"][j1],`${nf["compositeFields"][j1]}total`,isLast(p),a1[p],a1[p][x[m1]],a1[p][x[m1]][nf["compositeFields"]],a1[p][x[m1]][nf["compositeFields"][j1]],a1[p][x[m1]][`${nf["compositeFields"][j1]}total`],a2[p][o][`${nf["compositeFields"][j1]}total`])
              
            
                let st=0
                console.log("prob",a1[p][x[m1]][nf["compositeFields"][j1]],nf["compositeFields"][j1])
                if(a1[p][x[m1]][nf["compositeFields"][j1]]!=null && a1[p][x[m1]][nf["compositeFields"][j1]]!=undefined){
                  st=a1[p][x[m1]][nf["compositeFields"][j1]]
                }
                a2[p][o][`${nf["compositeFields"][j1]}total`]+=st
              
            }
          }*/ 
        //}
      })
    }
  
  })
  nf=getNumericFields(cat)

  /*Object.keys(a2).forEach(l=>{
    let m=Object.keys(a1)
    for(let n=0;n<m.length;n++){
      if(a2[l].keys.includes(parseInt(m[n]))){
        for(let j1=0;j1<nf.normal.length;j1++){
          if(isLast(cat))
            a2[l][nf["normal"][j1]]+=a1[m[n]][nf["normal"][j1]]
          else
            a2[l][nf["normal"][j1]]+=a1[m[n]][`${nf["normal"][j1]}total`]
        }

      }
    }
  })*/
  

}

const initializeFinalObjectVariables=(key,cat,next,first)=>{

  if(finalObject[key]==undefined)
    finalObject={...finalObject,[key]:{}}
  if(finalObject[key][cat]==undefined)
    finalObject={...finalObject,[key]:{...finalObject[key],[cat]:{}}}
  if(finalObject[key][key]==undefined)
    finalObject[key][key]={}
  
  
    let others=Object.keys(finalObject?.[cat]).forEach(l=>{
      //console.log("comprob",totalRoutes,l,totalRoutes[cat][l],totalRoutes[key][`${cat}total`])
      initializeOtherFinalObjectVariables(key,l,totalRoutes[key][`${cat}total`],cat,first)
      /*Object.keys(totalRoutes[cat].[l]).forEach(i=>{
      for(let u=0;u<i.length;u++){
      //let j=`${i[u]}total`
      
        initializeOtherFinalObjectVariables(key,l,totalRoutes[key][next],i[u])
      }
    })]*/
  })
  
}

const updateFinalObject=(data,key,cat,terminal,next,first)=>{

  //aqui si es una categoria terminal data son los ids de sus registros con sus valores que son sus datos
    //nf son sus campos numericos 
    //inicalizo las variables de la categoria y la clave a objetos nulos, junto con su categoria con su hijo
    //la misma categoria tambien con un objeto vacio en el caso de que no exista
    //inicializo a k como la primera llave de totalroutes[key]
    //inicalizo data1 que es equivalente a  totalRoutes[key][primera llave] que es equivalente a todos los
    //registros de totalRoutes[key] en el atributo normalData junto con sus llaves para sus hijos de 
    //la primera llave
    //ejecuto updatenumericfieldsroot(key,key,data1)
      //


  let nf=getNumericFields(cat)
  initializeFinalObjectVariables(key,cat,next,first)
  let data1,k
  if(!isLast(key)){
    //k=Object.keys(totalRoutes[key])[0]
    data1=totalRoutes[key][`${cat}total`]
    //console.log("keynotterminal",cat,next,data1,key,next,first)
    updateNumericFieldsRoot(key,cat,data1,next,first)
    updateNumericFields(key,cat,nf,data1,terminal,first)

  }

}

const updateTerminalFinalObject=(data,cat)=>{
  let res={}
  //console.log("alert1",data)
  if(finalObject[cat]==undefined){
    finalObject={...finalObject,[cat]:{[cat]:{}}}
    Object.keys(data).forEach(u=>{
      if(verifyMeetWithConditionsBySegmentBaseLeve1(cat,data[u].normalData))
        res={...res,[cat]:{...res[cat],[data[u].normalData.id]:{...data[u].normalData}}}
    })
    finalObject={...finalObject,[cat]:res}
    //console.log("fobjnew",finalObject)
  }

}

const getSegmentData=(key,cat,ultimo,next,first)=>{
  
  let data=[]
  //console.log("totalRoutes",totalRoutes,cat,totalRoutes[cat],next,first)
 
    if(isLast(cat)){
      data=totalRoutes[cat]["undefinedtotal"]
      console.log("dataend",data)
      updateTerminalFinalObject(data,cat)

    }else{
      let k=Object.keys(totalRoutes[cat])[0]
      data=totalRoutes[cat][next]

    }
    //console.log("datafinal",key,cat,isLast(cat),totalRoutes[key][`${cat}total`],next)
    if(!isLast(key))
      updateFinalObject(totalRoutes[key][`${cat}total`],key,cat,false,next,first)
    else
      console.log("ju")
      //updateFinalObject(totalRoutes[key]["undefinedtotal"],key,cat,true,next)
  

  //console.log("dataexc",data)
}

const getSegmentsData=(key,cats,j)=>{
  //console.log("catshere",cats,cats[0])
  for(let i=0;i<cats.length;i+=2){
    //if(i==cats.length-1)
      //getSegmentData(key,cats[cats.length-1],true)
    //else 
     //console.log("reviso",key,cats,cats[i],true,cats[i+1],cats[0])
    getSegmentData(key,cats[i],true,cats[i+1],cats[0])
  }
}

const getInverseTraverseSonTotalsWithConditionsWhereRoutes1=(routes,routeIndex,order)=>{
  let trueKey
  let cats
  //console.log("order",order)
  if(order.length==0){
    let data=totalRoutes[`getData${currentCategory.name}`]["undefinedtotal"]
    updateTerminalFinalObject(data,`getData${currentCategory.name}`)
  }else{
  for(let i=0;i<order.length;i++){
    trueKey=Object.keys(order[i])[0]
    
    cats=order[i][trueKey]
    getSegmentsData(trueKey,cats,i)
  }
  for(let i=0;i<order.length;i++){
    trueKey=Object.keys(order[i])[0]
    cats=order[i][trueKey]
    let cat
    for(let j=0;j<cats.length;j+=2){
      cat=cats[j]   
      console.log("prob111",cat,finalObject[cat],finalObject)
      //if(isLast(cat))
        getTotalsOfNumericVariables(finalObject[cat],finalObject[trueKey],cat)
  
    }
    verifyMeetWithConditionsBySegmentBaseLevel2(trueKey,finalObject[trueKey])

  }

  for(let i=order.length-1;i>=0;i--){
    trueKey=Object.keys(order[i])[0]
    cats=order[i][trueKey]
    for(let j=0;j<cats.length;j+=2)
      Object.keys(finalObject[trueKey][cats[j]]).forEach(p=>{
        let keysEach=finalObject[trueKey][cats[j]][p].keys
        
        for(let oo=0;oo<keysEach.length;oo++){
          if(finalObject[cats[j]][cats[j]][keysEach[oo]]!=undefined){
            finalObject[cats[j]][cats[j]][keysEach[oo]]={
              ...finalObject[cats[j]][cats[j]][keysEach[oo]],
              final:true
            }

          }
        }
      })
      
      
      
    
  }
  for(let i=0;i<order.length;i++){
    trueKey=Object.keys(order[i])[0]
    cats=order[i][trueKey]
    let cat
    for(let j=0;j<cats.length;j+=2){
      cat=cats[j]   
      console.log("prob111",cat,finalObject[cat],finalObject)
      Object.keys(finalObject[cat][cat]).forEach(y=>{
        if(finalObject[cat][cat][y]["final"]==undefined){
          Object.keys(finalObject[cat]).forEach(x=>{
            delete finalObject[cat][x][y]
          })
        }else
          delete finalObject[cat][cat][y]["final"]
      })
    }

  }  
  }
  console.log("fobj44",finalObject)


    
  
  //console.log("fobjectkey",finalObject)

  /*key=Object.keys(order[0])[0]
    cats=order[0][key]
    getSegmentsData(key,cats,0)
    //console.log("fobjectkey",finalObject)*/

}


const getInverseTraverseSonTotalsWithConditionsWhereRoutes=(routes,routeIndex)=>{
  let lenRoutes=routes.length
  let dataVar=routes[routeIndex]
  
  let r=`${dataVar}total`
  //console.log("p55",routes,routeIndex)
  let mainArray
  let parent,son
  if(routeIndex==routes.length-1){
    if(routeIndex-1==-1){
      parent=routes[routeIndex]
      son=routes[routeIndex]
      mainArray=totalRoutes[routes[0]]["undefinedtotal"]
    }else{
      parent=routes[routeIndex-1]
      son=`${routes[routeIndex]}`
      mainArray=totalRoutes[routes[routeIndex]][`undefinedtotal`]

    }
  }else{
    if(routeIndex-1==-1){

      parent=routes[routeIndex]
      son=routes[routeIndex]
      mainArray=totalRoutes[parent][`${son}total`]
    }else{
      parent=routes[routeIndex-1]
      son=routes[routeIndex]
      mainArray=totalRoutes[parent][`${son}total`]
    }
  }

  let u=conditionsWhere[routes[routeIndex]]["main"]
  ////console.log("veri222",r[eachIndex])
  let getMainRule=conditionsWhere[u["category"]][u["segment"]][u["field"]][u["rule"]]
  let type=conditionsWhere[u["category"]][u["segment"]][u["field"]]["type"]
  let datafield=conditionsWhere[u["category"]][u["segment"]][u["field"]]
  
  if(finalObject[parent]==undefined)
    finalObject={...finalObject,[parent]:{}}
  if(finalObject[parent][son]==undefined){
    finalObject={
      ...finalObject,[parent]:{
      
        ...finalObject[parent],
        [son]:[
          
        ]
      }
    }
  }
  if(finalObject[routes[routes.length-1]]==undefined)
    finalObject={...finalObject,[routes[routes.length-1]]:{}}
  if(finalObject[routes[routes.length-1]][routes[routes.length-1]]==undefined)
    finalObject={
      ...finalObject,[routes[routes.length-1]]:{
    
        ...finalObject[routes[routes.length-1]],
        [routes[routes.length-1]]:{
        
        }
      }
    }
  let numericVariables={}
  if(routeIndex==0){
    firstCatNormalFields[`getData${currentCategory.name}`].normal.forEach(o=>{
      if(o.type=="number"){
        numericVariables={...numericVariables,[`${o.name1}total`]:0}
      }
    })
    firstCatNormalFields[`getData${currentCategory.name}`].compositeFields.forEach(o=>{
      if(o.type=="number"){
        numericVariables={...numericVariables,[`${o.name1}total`]:0}
      }
    })

  }else{
    otmChoices[routes[routeIndex]].normal.forEach(o=>{
      if(o.type=="number"){
        numericVariables={...numericVariables,[`${o.name1}total`]:0}
      }
    })
    otmChoices[routes[routeIndex]].compositeFields.forEach(o=>{
      if(o.type=="number"){
        numericVariables={...numericVariables,[`${o.name1}total`]:0}
      }
    })
  }
  //console.log("ma3333",totalRoutes,parent,son,mainArray)
  updateNumericVariablesUpperLevels(mainArray,numericVariables,routeIndex,routeIndex-1,routes,parent,son,routeIndex)
  
  /*Object.keys(mainArray).forEach(y=>{
    let data=mainArray[y].normalData
    //if(verifyMeetWithConditionsBySegmentBaseLevel(routes,routeIndex,data)==true){
    finalObject={...finalObject,
      [parent]:{
          ...finalObject[parent],
          [son]:{
            ...finalObject[parent][son],
            [y]:{
              normalFields:data
            }
          }
        }
      }
      
    })*/
  
    //console.log("c")
    //aqui simplemente hago las reglas normales no hay variables totales porque estoy en el nivel inferior
  //en caso contrario
    //como en la variable total routes tengo los keys que son los hijos
    //obtengo las variables totales que estan en total routes y empiezo a navegar
    //sacando por cada registro sus variables totales y asignandoles el valor que les corresponda
    //hago un objeto de las variables del registro de los datos normales y compuestos y le
    //anado las variables totales
    //evaluo la regla y obtengo los que cumplan incluyendo las variables totales
    //aqui ojo, porque puedo estar en un nivel donde haya varios niveles inferiores por lo que se tiene
    //que hacer un for,este for es muy sencillo, porque ya tengo los totales de los nivles inferiores, por
    //lo que solamente se tienen que sumar
    //lo que puedo hacer para facilitar es concentrar todos los datos del reporte en un objeto total, de tal
    //manera que no sea un desmadre generar los reportes

  
   
}


const getData=(routes,otmName,totalRoutes,routeIndex,mainArray=[],begin=false,cor=[],routeIndexToFind=0)=>{

  let dataVar=routes[routeIndex+1]
  let nn=`${routes[routeIndexToFind+1]}total`
  let r=`${dataVar}total`
  //let mainArray=[]
  ////console.log("rmainArray",cor,r,begin)
  //if(r!==`undefinedtotal`){
  if(begin==true){
    mainArray=totalRoutes[routes[routeIndex]][r]
  }
  if(finalObject[otmName][nn]==undefined)
    finalObject={...finalObject,[otmName]:{...finalObject[otmName],[nn]:{items:{}}}}
  // //console.log("ver22",claves,totalRoutes[routes[routeIndex]][r])
////console.log("mainArray",mainArray)
  if(grandTotals[otmName][`${otmName}total`]==undefined){
    grandTotals={...grandTotals,[otmName]:{[`${otmName}total`]:{}}} 
  }
    
  /*if(grandTotals[otmName][otmName]==undefined)
    grandTotals={...grandTotals,[otmName]:{...grandTotals[otmName],[otmName]:{}}}*/
    
    //mainArray=Object.keys(totalRoutes[routes[routeIndex]][r]).forEach(x=>claves)
    ////console.log("mainArray",claves,mainArray,routes[routeIndex],r,routeIndex)
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
        ////console.log("rmainArray",cor,cor[u].normalData,r,begin)

      
        if(finalObject[otmName][nn]["items"]==undefined)
          finalObject[otmName][nn]["items"]={normalFields:{}}
        if(finalObject[otmName][nn]["items"][u]==undefined){
          //finalObject[otmName][nn]["items"][u]=0
          finalObject[otmName][nn]["items"][u]={total:0}
        }
        
        //Added code
        let otherAccVars={}
        ////console.log("cor11",cor,cor[0])
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
      ////console.log("cor45",cor[firstkey])

      Object.keys(cor[firstkey]).forEach(iu=>{
        ////console.log("cor11iu",iu)
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


      ////console.log("otheraccvars",otherAccVars)
      /*let final=[]
      let oavTotals=otherAccVars
      cor.forEach(y=>{
        let t=y.id
        final=[...final,t]
        Object.keys(otherAccVars).forEach(p=>{
          const nn=p.substring(0,p.length-5)

          //console.log("ppp",p,y[p],nn)
          if(typeof y[nn]=="number"){
            //console.log("ppp1",y[nn])
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
              ////console.log("prev", finalObject[otmName][nn]["items"][u][y],cor[u][y])
                }

            })
            //updateTotalRoutes(otmName,nn,otherAccVars,finalObject[otmName][nn]["items"][u])
            
          
        }else{
          ////console.log("cor11",mainArray,u,mainArray[u])
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
      
      ////console.log("datalog",otmName,totalRoutes,`${r}total`,mainArray)

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
      ////console.log("ikey",i,totalRoutes[routes[i]][`${routes[i+1]}total`])
      //getData(routes,otmName,totalRoutes,0,null,true,totalRoutes[routes[i]][`${routes[i+1]}total`],i)
      getData(routes,otmName,totalRoutes,routeIndex,null,true,totalRoutes[routes[i]][`${routes[i+1]}total`],i)
    }
    ////console.log("finalObject",finalObject)
    ////console.log("grandTotals1",grandTotals)
      /*if(Object.keys(mainArray).length>0){
        finalObject[otmName][r]=0
        for(let x in mainArray){
          finalObject[otmName][r]+=mainArray[x].total
        }

      }*/
    
  }


const printGtSegment=(data={},segment)=>{
  ////console.log("datagr",data)
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
      //console.log("verific",ks,`${ata[i]}total`)
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

const shallowCopy=(o) =>{
  let copy = {}
  for (let prop in o) {
    if (o.hasOwnProperty(prop)) {
      copy[prop] = o[prop]
    }
  }
  return copy
}

const getFinalRoutesArray=(finalRoutes,routes)=>{
  let res=[]
  for(let i=0;i<finalRoutes.length;i++){
    res.push(routes[finalRoutes[i]])
  }
  return res
}
const getDataReport=(routes,finalRoutes)=>{
  const root=`getData${currentCategory.name}`
  totalRoutes={}
  //for(let i=0;i<finalRoutes.length;i++){
    finalObject={}
    totalRoutes={}
  
  getLevelData1(categoryProducts[root],routes[finalRoutes[0]],0,true)
  //console.log("gt222",grandTotals)
  //console.log("routedetail",routes,finalRoutes)
   ////console.log("totalRoutes",totalRoutes,categoryProducts[root],finalRoutes)

  //}
  ////console.log("getLevelData",totalRoutes)
 
  
  //getLevelData(categoryProducts[root],routes[finalRoutes[0]],0) 
  let totalRoutesArray={}
  let done1=[]
  let allTablesArray=getAllTablesArray(finalRoutes,routes)
  //console.log("alltablesarray",allTablesArray)
  let newSubSet=[]
  let nr={}
    
    nr=shallowCopy(routes)
    //console.log("aprop",getFinalRoutesArray(finalRoutes,routes))
    let y=findTheLowerLevelCategory1(getFinalRoutesArray(finalRoutes,calculateRoutes([`getData${currentCategory.name}`])),[],getFinalRoutesArray(finalRoutes,calculateRoutes([`getData${currentCategory.name}`])))
    //console.log("definitive",routes,y)

    for(let i=0;i<finalRoutes.length;i++){
      getLevelData1(categoryProducts[root],routes[finalRoutes[i]],0,true)  
    }
    getInverseTraverseSonTotalsWithConditionsWhereRoutes1(routes,finalRoutes,y)
    Object.keys(finalObject).forEach(y=>{
      printFinalTableNew(y,finalObject[y])
    })
    //console.log("totalRoutes",totalRoutes)
  /*for(let i=0;i<finalRoutes.length;i++){
  //getAccumulated(routes[finalRoutes[0]],routes[finalRoutes[0]][0],0,false,totalRoutes)
    totalRoutes={}

    
    getLevelData1(categoryProducts[root],routes[finalRoutes[i]],0,true)
    //console.log("finalObject",finalObject,totalRoutes)
    
    //for(let x=0;x<routes[finalRoutes[i]].length-1;x++){
    /*for(let x=routes[finalRoutes[i]].length-1;x>=0;x--){
      getInverseTraverseSonTotalsWithConditionsWhereRoutes(routes[finalRoutes[i]],x,routes,finalRoutes)
        //getAccumulated(routes[finalRoutes[i]],routes[finalRoutes[i]][x],x,false,totalRoutes)
      if(!done1.includes(finalRoutes[i])){
          
        done1.push(finalRoutes[i])
        totalRoutesArray={...totalRoutesArray,[routes[finalRoutes[i]][routes[finalRoutes[i]].length-1]]:totalRoutes[routes[finalRoutes[i]][routes[finalRoutes[i]].length-1]]['undefinedtotal']}
      }

    }
    //console.log("finalObject",finalObject,totalRoutes)
  }*/
  /*bien empieza
  let done=[]
  let printTablesBool=[]
  ////console.log("totalRoutesArray",totalRoutesArray)
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
        ////console.log("check22",printTablesBool,routes[finalRoutes[i]][j])
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
  //console.log("grandTotals",grandTotals,finalObject)
  //let ui=printGrandTotals(comp,allTablesArray)
  beginPrintFinalTables(totalRoutesArray,allTablesArray)


  //printGrandTotals(comp)
  //return printTable(finalObject['getDataclientes'],'getDataclientes',`${routes[finalRoutes[0]][1]}total`)
  //printTable(totalRoutesArray,routes,finalRoutes)
  bien termina*/


}

const printMainHeaders=(data)=>{
  let subtitles={}
  let head={}
  Object.keys(data).forEach(a=>{
    if(head[a]==undefined)
      head[a]=[]
    head[a].push(<th>{a}</th>)
    let x=Object.keys(data[a])[0]
    subtitles[a]=[]
    Object.keys(x).forEach(y=>
      
      subtitles[a].push(<th>{y}</th>)
    )  
  })
  return <table>
    <thead>
      <tr>
        {Object.keys(head)

      </tr>
    </thead>
  </table>
}

const printFinalTableNew=(category,data)=>{
  let head=[]
  let subFields=[]
  
  Object.keys(data[a])[0]
    Obje
  })
  return <table>
    <tr>
    {head}
    </tr>
  </table>
}

const printFinalTable=(title,data,ui)=>{
  let fields=[]
  ////console.log("data555",data)
  let compF
  let cf
  ////console.log("firstcat",firstCatNormalFields)
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
  ////console.log("fields11",fields)
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
  ////console.log("object",object)
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
      //console.log("fulldata",fullData,fullData[index])
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
  ////console.log("primero1",primero)

  for(let i=0;i<keys.length;i++){
    let data=objectToPrint[`${keys[i]}`]
    
      
      if(keys[i]==primero){
        ////console.log("primero",primero)
        printReportSegment(objectToPrint[primero]["items"]["normalFields"],true,title)         

      }
      printReportSegment(data["items"],false,keys[i])

    

  }

  /*for(let i=0;i<finalRoutes.length;i++){
    let routeSteps=routes[finalRoutes[i]]
    //console.log("routesteps",routeSteps)
    let data=finalObject[routeSteps[i]]
    let headers=[]*/
    
    /*for(let j=1;j<routeSteps.length;j++){
      
      
        let subData=data[`${routeSteps[j]}total`]
        //console.log("subdata",data,subData)
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
  ////console.log("croutes",calculateRoutes([`getData${currentCategory.name}`]))
  
  const routes=calculateRoutes([`getData${currentCategory.name}`])
  ////console.log("routes111",routes)
  //routesfinal encuentra la ultima parada de cada una de las rutas
  ////console.log("routesfinal",routesFinal(routes))
  const finalRoutes=routesFinal(routes)
  grandTotals={}
  doneLd={}
  //console.log("importante routes finalRoutes",routes,finalRoutes)
  getDataReport({...routes},[...finalRoutes])
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
  //console.log("importa",parentNode,parentNodeName,firstCatNormalFields,data)
  return <>
    {displayReport(parentNodeName,parentNode,data)}
    {parentNode.otm.map((x,index)=>{
      let nd=[]
     return  nd=otmChoices[x]["otm"].map(l=>{
        //console.log("imp2",l,data[x][l])

        return beginReport(false,l,data[x])
      })
      
    })
      ////console.log("x555",x,data,data[x])
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
        ////console.log("Add new report")
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
    {openViewMainWhereConditionDialog && <ViewMainWhereCondition
      open={openViewMainWhereConditionDialog}
      toggleDialog={toggleOpenViewMainWhereConditionDialog}
      addConditionWhereArray={listOfViewConditions}
      conditionsWhere={conditionsWhere}
      {...varsHeadWhereStatement}

    />}

    {openViewCompositeFieldDialog && <ViewCompositeFieldDialog
      open={openViewCompositeFieldDialog}
      toggleDialog={toggleOpenViewCompositeFieldDialog}
      specificOtmName={specificOtmName}
      compositeField={compFieldsArray}
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