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
import { WhereStatementDateDialog } from '../../components/WhereStatementDateDialog'
import './styles.scss'
import { WhereStatementHybridDialog } from '../../components/WhereStatementHybridDialog'
import { WhereSelectMainDialog } from '../../components/WhereSelectMainDialog'
import { ViewWhereStatementNumberDialog } from '../../components/ViewWhereStatementNumberDialog'
import { ViewWhereStatementDateDialog } from '../../components/ViewWhereStatementDateDialog'
import { ViewWhereStatementStringDialog } from '../../components/ViewWhereStatementStringDialog'
import { ViewWhereStatementHybridDialog } from '../../components/VIewWhereStatementHybridDialog'
import { ViewMainWhereCondition } from '../../components/ViewMainWhereCondition'
import { ViewCompositeFieldDialog } from '../../components/ViewCompositeFieldDialog'
import { SubsetDialog } from '../../components/SubsetDialog'
import { SortCriteriaDialog } from '../../components/SortCriteriaDialog'
import { FcAnswers, FcNightLandscape } from 'react-icons/fc'
import { updateLocale } from 'moment'
import { VariablesAreInputTypesRule } from 'graphql'
import { isInlineFragment, resultKeyNameFromField } from '@apollo/client/utilities'
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom'
import e from 'cors'
import { GetSubsetsAllTables } from '../../components/GetSubSetsAllTables'
import { GetSubsetsContribution } from '../../components/GetSubsetsContributions'
import { getSubsetsData } from '../../components/GetSubSetsAllTables/getSubsetsData'
import { getSubsetsCont } from '../../components/GetSubsetsContributions/getSubsetsCont'
import { SubsetContributionsTable } from '../../components/SubsetsContributionsTable'
import { argsToArgsConfig } from 'graphql/type/definition'
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
  const [varOrderHeadCriteria,setVarOrderHeadCriteria]=useState({})
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

  const [openWhereStatementDateDialog,setOpenWhereStatementDateDialog]=useState(false)
  const toggleOpenWhereStatementDateDialog=(vars)=>{
    setVarsHeadWhereStatement(vars)
    setOpenWhereStatementDateDialog(!openWhereStatementDateDialog)

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
  const [identifierCategoryName,setIdentifierCategoryName]=useState("")
  const [openOtmIdFieldsDialog,setOpenOtmIdFields]=useState(false)
  const toggleOtmIdFieldsDialog=(categoryName)=>{
    setIdentifierCategoryName(categoryName)
    setOpenOtmIdFields(!openOtmIdFieldsDialog)
  }
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

  const[openViewWhereStatementDateDialog,setOpenViewWhereStatementDateDialog]=useState(false)
  const toggleOpenViewWhereStatementDateDialog=(values,vars)=>{
    setListOfViewConditions(values)
    setVarsHeadWhereStatement(vars)

    setOpenViewWhereStatementDateDialog(!openViewWhereStatementDateDialog)

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

  const [openSortCriteriaDialog,setOpenSortCriteriaDialog]=useState(false)
  const [sortRules,setSortRules]=useState({})
  
  const toggleOpenSortCriteriaDialog=(vars)=>{
    setVarOrderHeadCriteria(vars)
    setOpenSortCriteriaDialog(!openSortCriteriaDialog)
  }

  const [openSubsetDialog,setOpenSubsetDialog]=useState(false)
  const toggleOpenSubsetDialog=(values,vars)=>{
    setListOfViewConditions(values)
    setVarsHeadWhereStatement(vars)
    setOpenSubsetDialog(!openSubsetDialog)
  }

  const [subsets,setSubsets]=useState({})
  let subTotals={}
  const [grandTotalsSt,setGrandTotalsSt]=useState({})
  const [comboDataSt,setComboDataSt]=useState({})

  const [otmChoicesStatistics,setOtmChoicesStatistics]=useState({})
  let partialOtmChoicesStatistics={}

  const [otmChoicesOrder,setOtmChoicesOrder]=useState({})
  //console.log("otmchoices",otmChoices)//,fieldsShown,firstCatNormalFields)
  const [parentIdentifiers,setParentIdentifiers]=useState({})
  const [finalObjectToSubsets,setFinalObjectToSubsets]=useState({})
  const [subsetsData,setSubsetsData]=useState({})
  const [mtmChoices,setMtmChoices]=useState({})
  let parentCategories={}
  let displayedMtm=[]
  //const [parentCategories,setParentCategories]=useState({})
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

  const clearMtmChoicesSons=(name,padre,sonMtmChoices)=>{
    sonMtmChoices={...sonMtmChoices,[name]:{normal:[],compositeFields:[]}}
    return sonMtmChoices
  }

  const checkReviewMtmData=(e,name1,otm=false,padre,nameMtm,mainCat=false,declaredType,otmdestiny="",cf=false,dcf={},father,son,dataType)=>{
    if(e.target.checked==true){
      
      if(cf==true){
        setMtmChoices(j=>{
          console.log("mtmdata",{...j,[nameMtm]:{...j[nameMtm],father,son,compositeFields:[...j[nameMtm]["compositeFields"],dcf]}})
          return {...j,[nameMtm]:{...j[nameMtm],father,son,compositeFields:[...j[nameMtm]["compositeFields"],dcf]}}
        })
      }else 
        setMtmChoices(j=>{
          console.log("mtmdata",{...j,[nameMtm]:{...j[nameMtm],father,son,normal:[...j[nameMtm]["normal"],{name1,type:declaredType}]}})
          return ({...j,[nameMtm]:{...j[nameMtm],father,son,normal:[...j[nameMtm]["normal"],{name1,type:declaredType,dataType}]}})
        })
    }else{
      if(cf==true)
        setMtmChoices(j=>{
          console.log("mtmdata",{...j,[nameMtm]:{...j[nameMtm],father,son,compositeFields:[...j[nameMtm]["compositeFields"].filter(x=>x.name1!=name1)]}})
          return ({...j,[nameMtm]:{...j[nameMtm],father,soncompositeFields:[...j[nameMtm]["compositeFields"].filter(x=>x.name1!=name1)]}})
        })
      else
        setMtmChoices(e=>({...e,[nameMtm]:{...e[nameMtm],father,son,normal:[...e[nameMtm]["normal"].filter(u=>u.name1!==name1)]}}))
    }
  }



  const checkReview=(e,name1,otm=false,padre,nameOtm,mainCat=false,declaredType,otmdestiny="",cf=false,dcf={},isMtm=false)=>{
    let pc=parentCategories[name1]
    if(parentIdentifiers?.[pc]?.["fieldCompOrNormalType"]=="normal" ||
    parentIdentifiers?.[pc]?.["fieldCompOrNormalType"]=="composite")
      console.log("parentresult",parentIdentifiers?.[pc]?.["fieldCompOrNormalType"],
      parentIdentifiers?.[pc]?.["field"],
      parentIdentifiers?.[pc]?.["type"])
    if(otm && !e.target.checked){
      //clearOtmChoicesSons(name,padre)
      sonOtmChoices=otmChoices
      clearOtmChoicesSons(name1,padre,{...otmChoices})
      setOtmChoices(sonOtmChoices)
    }
    let sonMtmChoices
    if(isMtm && !e.target.checked){
      sonMtmChoices=mtmChoices
      clearMtmChoicesSons(name1,padre,{...sonMtmChoices})
      setMtmChoices(sonMtmChoices)
    }
    if(e.target.checked){
      ////console.log("otmchoices",otm,mainCat)
      ////console.log("arr",[...fieldsShown,name1])
      if(otm==true || isMtm==true)
        setFieldsShown(x=>([...x,name1]))
      if(mainCat){
        setAllCompFieldsCluster(compFieldsArray[`getData${currentCategory.name}`])

        const n=`getData${padre}`
        let  nu={[n]:{otm:[],mtm:[],normal:[],options:[],otmdestiny:[],compositeFields:[]}}
        if(firstCatNormalFields[n]==undefined)
          setFirstCatNormalFields(e=>({...e,...nu}))
        if(otm){
          setFirstCatNormalFields(o=>({...o,[n]:{...o[n],otm:[...o[n]["otm"],name1]}}))
          setOtmChoices(e=>({...e,[name1]:{otm:[],normal:[],options:[],otmdestiny:[],compositeFields:[],mtm:[]}}))
        }else if(otmdestiny=="otmdestiny"){
          setFirstCatNormalFields(o=>({...o,[n]:{...o[n],otmdestiny:[...o[n]["otmdestiny"],name1]}}))


          setOtmChoices(e=>({...e,[name1]:{otm:[],normal:[],options:[],otmdestiny:[],compositeFields:[],mtm:[]}}))
        }else if(cf==true){
          setFirstCatNormalFields(o=>({...o,[n]:{...o[n],compositeFields:[...o[n]["compositeFields"],dcf]}}))
        }else if(isMtm==true){
          setFirstCatNormalFields(o=>{
            console.log("verstatefcnm",{...o,[n]:{...o[n],mtm:[...o[n]["mtm"],name1]}})
            return ({...o,[n]:{...o[n],mtm:[...o[n]["mtm"],name1]}})
          })
          setMtmChoices(e=>{
            console.log("verestate",{...e,[name1]:{normal:[],compositeFields:[]}})
            return ({...e,[name1]:{normal:[],compositeFields:[]}})
          })
        }
        else{
          //setFirstCatNormalFields(o=>({...o,[n]:{...o[n],normal:[...o[n]["normal"],name1]}}))
          setFirstCatNormalFields(o=>({...o,[n]:{...o[n],normal:[...o[n]["normal"],{type:declaredType,name1}]}}))
        }
        console.log("")
      }
      if(mainCat==false){
        setAllCompFieldsCluster(compFieldsArray[nameOtm])

        if(otm){  
          
          
          setOtmChoices(e=>({...e,[name1]:{otm:[],mtm:[],normal:[],options:[],otmdestiny:[],compositeFields:[]},[nameOtm]:{...e[nameOtm],otm:[...e[nameOtm]["otm"],name1]}}))
        
        }else if(otmdestiny=="otmdestiny"){
          setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],otmdestiny:[...e[nameOtm]["otmdestiny"],name1]}}))
        }else if(cf==true){
          setOtmChoices(o=>({...o,[nameOtm]:{...o[nameOtm],compositeFields:[...o[nameOtm]["compositeFields"],dcf]}}))
        }else if(isMtm){
          setOtmChoices(o=>{
            console.log("verstatefcnm",{...o,[nameOtm]:{...o[nameOtm],mtm:[...o[nameOtm]["mtm"],name1]}})
            return ({...o,[nameOtm]:{...o[nameOtm],mtm:[...o[nameOtm]["mtm"],name1]}})
          })
          setMtmChoices(e=>({...e,[name1]:{normal:[],compositeFields:[]}}))
        }
        
        else{
          
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
        }else if(isMtm){
          setFirstCatNormalFields(e=>{
            e={...e,[n]:{...e[n],mtm:[...e[n]["mtm"].filter(x=>x!==name1)]}}
            return e
          })
        }
        else{
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
        }else if(isMtm){  
          
          
          setOtmChoices(e=>({...e,[name1]:{normal:[],otm:[],otmdestiny:[]},[nameOtm]:{...e[nameOtm],mtm:[...e[nameOtm]["mtm"].filter(u=>u!==name1)]}}))
        
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

  const initializeVariablesStatistics=()=>{
    let pv={}
    let values=["percentage","media","median","minimum","maximum"]
    for(let v=0;v<values.length;v++){
      if(pv[values[v]]==undefined){
        pv[values[v]]=false
      }
    }
    return pv
  

  }
  const onCheckStatisticGeneralVariable=(ar,vari,stat,value,sp,p)=>{
    let spf={
  
    }
    let sps={}
    spf=otmChoicesStatistics
    if(otmChoicesStatistics?.[sp]==undefined)
      spf={...spf,[sp]:{}}
    else
      spf={...spf,[sp]:{...otmChoicesStatistics[sp]}}
    if(otmChoicesStatistics?.[sp]?.[p]==undefined)
      spf={...spf,[sp]:{...spf[sp],[p]:{}}}
    else
      spf={...spf,[sp]:{...spf[sp],[p]:{...otmChoicesStatistics[sp][p]}}}
    
    spf={...spf,[sp]:{...spf[sp],[p]:{...spf[sp][p],[vari]:{[`${p}TotalCount`]:value}}}}
     
    let res=spf
    console.log("resggg",res)

    setOtmChoicesStatistics(spf)
  }

  const onCheckStatisticVariable=(ar,vari,stat,value,sp,p)=>{
    let arr=[]
    let spf={
  
    }
    let sps={}
    spf=otmChoicesStatistics
    if(otmChoicesStatistics?.[sp]==undefined)
      spf={...spf,[sp]:{}}
    else
      spf={...spf,[sp]:{...otmChoicesStatistics[sp]}}
    if(otmChoicesStatistics?.[sp]?.[p]==undefined)
      spf={...spf,[sp]:{...spf[sp],[p]:{}}}
    else
      spf={...spf,[sp]:{...spf[sp],[p]:{...otmChoicesStatistics[sp][p]}}}
    if(otmChoicesStatistics[sp]?.[p]?.[vari]==undefined){
      spf={...spf,[sp]:{...spf[sp],[p]:{...spf[sp][p],[vari]:{...initializeVariablesStatistics(),[stat]:value}}}}
    }
    else
      spf={...spf,[sp]:{...spf[sp],[p]:{...spf[sp][p],[vari]:{...otmChoicesStatistics[sp][p][vari],[stat]:value}}}}
     
    let res=spf
    console.log("resggg",res)

    setOtmChoicesStatistics(spf)
      /*let res=({
        ...o,
        ...sps,
          [p]:{
            ...sps,
            [vari]:{
              ...arr,
              [stat]:value
            }
          }
        }
      })*/
      return res
    
    
    

  }

  const doWorkSort=(val,name1,category,segment,type)=>{
    let nOtmChoicesOrder=otmChoicesOrder
    if(val==true)
      if(nOtmChoicesOrder?.[category]?.[segment]?.filter(x=>x.name==name1).length>0)
        return
    if(val==false)
      if(nOtmChoicesOrder?.[category]?.[segment]?.filter(x=>x.name==name1).length==0)
        return
    if(nOtmChoicesOrder?.[category]==undefined)
      nOtmChoicesOrder[category]={}
    if(nOtmChoicesOrder?.[category]?.[segment]==undefined)
      nOtmChoicesOrder[category]={...nOtmChoicesOrder[category],[segment]:[]}
    console.log("yuyu",val)
    if(val==true){
      nOtmChoicesOrder[category][segment]=[
        ...nOtmChoicesOrder[category][segment],
        {name:name1,type:type}
      ]
    }else if(val==false){
      console.log("yaya",val,name1,nOtmChoicesOrder[category][segment],nOtmChoicesOrder[category][segment].filter(x=>x.name==name1?false:true))
      nOtmChoicesOrder[category][segment]=nOtmChoicesOrder[category][segment].filter(x=>x.name==name1?false:true)
    }
      
    console.log("choicesorder",nOtmChoicesOrder)
    setOtmChoicesOrder(nOtmChoicesOrder)
  }
  
  const displayOrderSelect=(name,category,segment)=>{
    return <select 
              style={{color:"white",backgroundColor:"transparent",border:"none",outline:"none",width:"150px",paddingLeft:0}} 
              name={name}>
                <option value="none"> No order</option>
                <option value="asc" > Ascending Order</option>
                <option value="desc"> Descending order</option>
                
            </select>
  }
  
  const displayAncestorsCats=(trackCatPath,ntm="")=>{
    console.log("trackCatPath",trackCatPath)
    let output=[]
    let ns=otmChoicesOrder
    
    
    for(let l in trackCatPath){
      let correctOtmMtm
      if(otmChoices[trackCatPath[trackCatPath.length-1]])
        correctOtmMtm=otmChoices[trackCatPath[trackCatPath.length-1]]
      else
        correctOtmMtm=mtmChoices[trackCatPath[trackCatPath.length-1]]

      if(l<trackCatPath.length-1){
        if(partialOtmChoicesStatistics[trackCatPath[l]]==undefined)
          partialOtmChoicesStatistics={...partialOtmChoicesStatistics,[trackCatPath[l]]:{}}
        if(partialOtmChoicesStatistics[trackCatPath[l]][trackCatPath[trackCatPath.length-1]]==undefined)
          partialOtmChoicesStatistics[trackCatPath[l]]={...partialOtmChoicesStatistics[trackCatPath[l]],[trackCatPath[trackCatPath.length-1]]:{}}  
        let part=partialOtmChoicesStatistics[trackCatPath[l]][trackCatPath[trackCatPath.length-1]]
        //nitializeVariablesStatistics(partialOtmChoicesStatistics[trackCatPath[l]][trackCatPath[trackCatPath.length-1]])
        output.push(<div>
          <p style={{color:"orange"}}>{trackCatPath[l]}</p>
          <input type="checkbox" 
              onChange={e=>{
                console.log("ever",e)
                doWorkSort(e.target.checked,`${ntm}TotalCount`,trackCatPath[l],ntm,"number")
                if(e.target.checked==true){
                  onCheckStatisticGeneralVariable(part,`general`,"totalCount",true,trackCatPath[l],trackCatPath[trackCatPath.length-1])
                  
                }
                else{
                  onCheckStatisticGeneralVariable(part,`general`,"totalCount",false,trackCatPath[l],trackCatPath[trackCatPath.length-1])
                }
                console.log("everi",otmChoicesStatistics)

              }}/> Total Count <a  
              style={{textDecoration:"underline"}} onClick={
                (e)=>{
                  e.preventDefault()
                  console.log("bit1",trackCatPath[l],ntm,`${ntm}TotalCount`)
                  toggleOpenWhereStatementNumberDialog({
                    categoryName:trackCatPath[l],
                    fieldName:`${ntm}TotalCount`,
                    segment:ntm
                  })
                }
              }>xAdd where condition</a>
              {displayWhereClauses(trackCatPath[l],`${ntm}TotalCount`,ntm)}
              
            
              
              
          {/*otmChoices[trackCatPath[trackCatPath.length-1]]*/
          correctOtmMtm?.normal.map(x=>{

            if(x.type=="number" && x.dataType!="queryCategory"){
              
              return <div><span style={{marginRight:"10px"}}>{x.name1}total</span>
             
             <br/><input type="checkbox" 
              onChange={e=>{
                console.log("ever",e)
                doWorkSort(e.target.checked,`${x.name1}total`,trackCatPath[l],ntm,"number")
                
                console.log("everi",otmChoicesStatistics)

              }}/> {x.name1}total <a  
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
            {displayWhereClauses(trackCatPath[l],`${x.name1}total`,ntm)}
         
              <br/><input type="checkbox" 
              onChange={e=>{
                console.log("ever",e)
                doWorkSort(e.target.checked,`%${x.name1}`,trackCatPath[l],ntm)
                if(e.target.checked==true)
                  onCheckStatisticVariable(part,x.name1,"percentage",true,trackCatPath[l],trackCatPath[trackCatPath.length-1],"number")
                else
                  onCheckStatisticVariable(part,x.name1,"percentage",false,trackCatPath[l],trackCatPath[trackCatPath.length-1],"number")
                
                console.log("everi",otmChoicesStatistics)

              }}/> Percentage 
         


              <br/><input type="checkbox"
              onChange={e=>{
                console.log("ever",e)
                doWorkSort(e.target.checked,`${x.name1}Media`,trackCatPath[l],ntm,"number")

                if(e.target.checked==true)
                  onCheckStatisticVariable(part,x.name1,"media",true,trackCatPath[l],trackCatPath[trackCatPath.length-1],"number")
                else
                  onCheckStatisticVariable(part,x.name1,"media",false,trackCatPath[l],trackCatPath[trackCatPath.length-1],"number")
                
                console.log("everi",otmChoicesStatistics) 
               
              }}/> Media <a  
              style={{textDecoration:"underline"}} onClick={
                (e)=>{
                  e.preventDefault()
                  console.log("bit1",trackCatPath[l],ntm,`${x.name1}Media`)
                  toggleOpenWhereStatementNumberDialog({
                    categoryName:trackCatPath[l],
                    fieldName:`${x.name1}Media`,
                    segment:ntm
                  })
                }
              }>xAdd where condition</a>
              <br/>{displayWhereClauses(trackCatPath[l],`${x.name1}Media`,ntm,"number")}
              
              <input type="checkbox"
              onChange={e=>{
                console.log("ever",e)
                doWorkSort(e.target.checked,`${x.name1}Median`,trackCatPath[l],ntm,"number")

                if(e.target.checked==true)
                  onCheckStatisticVariable(part,x.name1,"median",true,trackCatPath[l],trackCatPath[trackCatPath.length-1],"number")
                else
                  onCheckStatisticVariable(part,x.name1,"median",false,trackCatPath[l],trackCatPath[trackCatPath.length-1],"number")
                
                console.log("everi",otmChoicesStatistics) 
              }}/> Median <a  
              style={{textDecoration:"underline"}} onClick={
                (e)=>{
                  e.preventDefault()
                  console.log("bit1",trackCatPath[l],ntm,`${x.name1}Median`,"number")
                  toggleOpenWhereStatementNumberDialog({
                    categoryName:trackCatPath[l],
                    fieldName:`${x.name1}Median`,
                    segment:ntm
                  })
                }
              }>xAdd where condition</a>
              <br/>{displayWhereClauses(trackCatPath[l],`${x.name1}Median`,ntm)}
              <input type="checkbox"
              onChange={e=>{
                console.log("ever",e)
                doWorkSort(e.target.checked,`${x.name1}Acummulatedminimum`,trackCatPath[l],ntm,"number")

                if(e.target.checked==true)
                  onCheckStatisticVariable(part,x.name1,"minimum",true,trackCatPath[l],trackCatPath[trackCatPath.length-1],"number")
                else
                  onCheckStatisticVariable(part,x.name1,"minimum",false,trackCatPath[l],trackCatPath[trackCatPath.length-1],"number")
                
                console.log("everi",otmChoicesStatistics) 
              }}/> Minimum <a  
              style={{textDecoration:"underline"}} onClick={
                (e)=>{
                  e.preventDefault()
                  console.log("bit1",trackCatPath[l],ntm,`${x.name1}Acummulatedminimum`)
                  toggleOpenWhereStatementNumberDialog({
                    categoryName:trackCatPath[l],
                    fieldName:`${x.name1}Acummulatedminimum`,
                    segment:ntm
                  })
                }
              }>xAdd where condition</a> 
              {displayWhereClauses(trackCatPath[l],`${x.name1}Acummulatedminimum`,ntm)}
              <br/><input type="checkbox"
              onChange={e=>{
                console.log("ever",e)
                doWorkSort(e.target.checked,`${x.name1}Acummulatedmaximum`,trackCatPath[l],ntm,"number")

                if(e.target.checked==true)
                  onCheckStatisticVariable(part,x.name1,"maximum",true,trackCatPath[l],trackCatPath[trackCatPath.length-1])
                else
                  onCheckStatisticVariable(part,x.name1,"maximum",false,trackCatPath[l],trackCatPath[trackCatPath.length-1])
                
                console.log("everi",otmChoicesStatistics) 
              }}/> Maximum <a  
              style={{textDecoration:"underline"}} onClick={
                (e)=>{
                  e.preventDefault()
                  console.log("bit1",trackCatPath[l],ntm,`${x.name1}Maximum`)
                  toggleOpenWhereStatementNumberDialog({
                    categoryName:trackCatPath[l],
                    fieldName:`${x.name1}Acummulatedmaximum`,
                    segment:ntm
                  })
                }
              }>xAdd where condition</a><br/>
              {displayWhereClauses(trackCatPath[l],`${x.name1}Acummulatedaximum`,ntm)}
              
              {/*<a  
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
            {displayWhereClauses(trackCatPath[l],`${x.name1}total`,ntm)}*/}
              </div>
          
      }})}
          
          {/*otmChoices[trackCatPath[trackCatPath.length-1]]?*/
          correctOtmMtm.compositeFields.map(x=>{
            if(x.type=="number"){
              

            return <div><span style={{marginRight:"10px"}}>{x.name1}total</span>
              {/*<span style={{marginRight:"10px"}}>{x.name1}total</span>
            <br/><input type="checkbox" 
              onChange={e=>{
                console.log("ever",e)
                if(e.target.checked==true)
                  onCheckStatisticVariable(part,x.name1,"totalCount",true,trackCatPath[l],trackCatPath[trackCatPath.length-1])
                else
                  onCheckStatisticVariable(part,x.name1,"totalCount",false,trackCatPath[l],trackCatPath[trackCatPath.length-1])
                
                console.log("everi",otmChoicesStatistics)

              }}/> Total Count <a  
              style={{textDecoration:"underline"}} onClick={
                (e)=>{
                  e.preventDefault()
                  console.log("bit1",trackCatPath[l],ntm,`${x.name1}Maximum`)
                  toggleOpenWhereStatementNumberDialog({
                    categoryName:trackCatPath[l],
                    fieldName:`${x.name1}Maximum`,
                    segment:ntm
                  })
                }
              }>xAdd where condition</a>
            <p>{displayWhereClauses(trackCatPath[l],`${x.name1}Maximum`,ntm)}</p>*/}    
            <br/><input type="checkbox" 
              onChange={e=>{
                console.log("ever",e)
                doWorkSort(e.target.checked,`${x.name1}total`,trackCatPath[l],ntm,"number")
                
                console.log("everi",otmChoicesStatistics)

              }}/> {x.name1}total <a  
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
              {displayWhereClauses(trackCatPath[l],`${x.name1}total`,ntm)}
              
         
            <input type="checkbox"
            onChange={e=>{
              console.log("ever",e)
              doWorkSort(e.target.checked,`%${x.name1}`,trackCatPath[l],ntm,"number")

              if(e.target.checked==true)
                onCheckStatisticVariable(part,x.name1,"percentage",true,trackCatPath[l],trackCatPath[trackCatPath.length-1])
              else
                onCheckStatisticVariable(part,x.name1,"percentage",false,trackCatPath[l],trackCatPath[trackCatPath.length-1])
              
              console.log("everi",otmChoicesStatistics) 
            }}
            /> Percentage 
            <br/><input type="checkbox"
            onChange={e=>{
              console.log("ever",e)
              doWorkSort(e.target.checked,`${x.name1}Media`,trackCatPath[l],ntm,"number")

              if(e.target.checked==true)
                onCheckStatisticVariable(part,x.name1,"media",true,trackCatPath[l],trackCatPath[trackCatPath.length-1])
              else
                onCheckStatisticVariable(part,x.name1,"media",false,trackCatPath[l],trackCatPath[trackCatPath.length-1])
              
              console.log("everi",otmChoicesStatistics) 
            }}/> Media <a  
            style={{textDecoration:"underline"}} onClick={
              (e)=>{
                e.preventDefault()
                console.log("bit1",trackCatPath[l],ntm,`${x.name1}Media`)
                toggleOpenWhereStatementNumberDialog({
                  categoryName:trackCatPath[l],
                  fieldName:`${x.name1}Media`,
                  segment:ntm
                })
              }
            }>xAdd where condition</a><br/>
            {displayWhereClauses(trackCatPath[l],`${x.name1}Media`,ntm)}
            <input type="checkbox"
            onChange={e=>{
              console.log("ever",e)
              doWorkSort(e.target.checked,`${x.name1}Median`,trackCatPath[l],ntm,"number")

              if(e.target.checked==true)
                onCheckStatisticVariable(part,x.name1,"median",true,trackCatPath[l],trackCatPath[trackCatPath.length-1])
              else
                onCheckStatisticVariable(part,x.name1,"median",false,trackCatPath[l],trackCatPath[trackCatPath.length-1])
              
              console.log("everi",otmChoicesStatistics) 
            }}/> Median <a  
            style={{textDecoration:"underline"}} onClick={
              (e)=>{
                e.preventDefault()
                console.log("bit1",trackCatPath[l],ntm,`${x.name1}Median`)
                toggleOpenWhereStatementNumberDialog({
                  categoryName:trackCatPath[l],
                  fieldName:`${x.name1}Median`,
                  segment:ntm
                })
              }
            }>xAdd where condition</a>
            {displayWhereClauses(trackCatPath[l],`${x.name1}Median`,ntm)}
            <br/><input type="checkbox"
            onChange={e=>{
              console.log("ever",e)
              doWorkSort(e.target.checked,`${x.name1}Acummulatedminimum`,trackCatPath[l],ntm,"number")

              if(e.target.checked==true)
                onCheckStatisticVariable(part,x.name1,"minimum",true,trackCatPath[l],trackCatPath[trackCatPath.length-1])
              else
                onCheckStatisticVariable(part,x.name1,"minimum",false,trackCatPath[l],trackCatPath[trackCatPath.length-1])
              
              console.log("everi",otmChoicesStatistics) 
            }}/> Minimum <a  
            style={{textDecoration:"underline"}} onClick={
              (e)=>{
                e.preventDefault()
                console.log("bit1",trackCatPath[l],ntm,`${x.name1}Minimum`)
                toggleOpenWhereStatementNumberDialog({
                  categoryName:trackCatPath[l],
                  fieldName:`${x.name1}Acummulatedminimum`,
                  segment:ntm
                })
              }
            }>xAdd where condition</a>
            {displayWhereClauses(trackCatPath[l],`${x.name1}Acummulatedminimum`,ntm)}
            <br/><input type="checkbox"
            onChange={e=>{
              console.log("ever",e)
              doWorkSort(e.target.checked,`${x.name1}Acummulatedmaximum`,trackCatPath[l],ntm,"number")

              if(e.target.checked==true)
                onCheckStatisticVariable(part,x.name1,"maximum",true,trackCatPath[l],trackCatPath[trackCatPath.length-1])
              else
                onCheckStatisticVariable(part,x.name1,"maximum",false,trackCatPath[l],trackCatPath[trackCatPath.length-1])
              
              console.log("everi",otmChoicesStatistics) 
            }}
            /> Maximum <a  
            style={{textDecoration:"underline"}} onClick={
              (e)=>{
                e.preventDefault()
                console.log("bit1",trackCatPath[l],ntm,`${x.name1}Maximum`)
                toggleOpenWhereStatementNumberDialog({
                  categoryName:trackCatPath[l],
                  fieldName:`${x.name1}Acummulatedmaximum`,
                  segment:ntm
                })
              }
            }>xAdd where condition</a>
            {displayWhereClauses(trackCatPath[l],`${x.name1}Acummulatedmaximum`,ntm)}            
            <br/>{/*<a  
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
          {displayWhereClauses(trackCatPath[l],`${x.name1}total`,ntm)}*/}
            </div>
            
      }})}
          
        </div>)

      }
        
    }
    return output
  }

  const displayParentIdentifier=(category,segment,field,type)=>{
    console.log("category,segment",field,type,segment,category)
    doWorkSort(true,field,category,segment,type)
    return <>
      <p>{field}</p>
      
      {type=="string" &&
        <a style={{textDecoration:"underline"}} 
          onClick={
            (e)=>{
              e.preventDefault()
              console.log("verver",{categoryName:category,
                fieldName:field,
                segment:segment
              })  
              toggleOpenWhereStatementStringDialog({categoryName:category,
                fieldName:field,
                segment:segment
              })
            }
          }>Add where condition
        </a>
      }
      {type=="number" &&
        <a style={{textDecoration:"underline"}} 
          onClick={
            (e)=>{
              e.preventDefault()
              console.log("verver",{categoryName:category,
                fieldName:field,
                segment:segment
              })
              toggleOpenWhereStatementNumberDialog({
                fieldName:field,
                categoryName:category,
                segment:segment
              })
            }
          }>Add where condition
        </a>
      }
      {displayWhereClauses(segment,field)}
        
    </>
  }
  const displayParentIdentifierNull=(category,segment,field,type)=>{
    doWorkSort(false,"parentIdentifier",segment,segment,type) 
    return null

  }
  
  const displayMenuMtm=(field,cat,nameOtm,mainCat,trackCatPath)=>{
    let res=cat.fields.filter(x=>x.name==field)[0]
    let otmSide=categories.filter(x=>x.id==res.relationCategory)[0]
    let tableName
    //console.log("field cat",field,cat,cat.name,cat.fields.filter(x=>x.name==field),fields)
    if(cat.name>otmSide.name)
      tableName=`${otmSide.name}_${cat.name}`
    else
      tableName=`${cat.name}_${otmSide.name}`

    let otmSideFields=otmSide.fields.filter(x=>{
      if(x.declaredType=="string" || x.declaredType=="number")
        return true
    })
    let son=`mtm${otmSide.name}${cat.name}Id`
    let father=`mtm${cat.name}${otmSide.name}Id`
    if(pivote==undefined)
      pivote={}
    if(pivote[field]==undefined)
      pivote={...pivote,[field]:[]}
    let fields=[...otmSideFields]
    let mtmData=categories.filter(x=>x.name==tableName)[0].fields
    fields=[...fields,...mtmData]
    console.log("field cat",field,cat,cat.name,cat.fields.filter(x=>x.name==field),fields)
    console.log("tcp",trackCatPath)
    return <div style={{margin:"0",marginLeft:"10px"}}>
      {fields.map(c=>{
        if(c.declaredType=="number" || c.declaredType=="date" ||
        c.declaredType=="string")
          pivote={...pivote,[field]:[...pivote[field],{name1:c.name,type:c.declaredType}]}
      return (c.declaredType=="date" &&
        <p>
          <input type="checkbox" 
          style={{marginLeft:"0px",marginRight:"5px",color:"white"}}
          onChange={(e)=>{
  
              doWorkSort(e.target.checked,c.name,field,field,"number")
  

            checkReviewMtmData(e,c.name,false,cat.name,field/*nameOtm*/,mainCat,c.declaredType,c.relationship,true,null,father,son,c.dataType)
          }}/>
    
          <span style={{marginRight:"10px"}}>{c.name}Date</span>
        
          {/*(nameOtm==""?isReadyToWhereFirst(`getData${currentCategory.name}`,c.name,false):
          isReadyToWhere(nameOtm,c.name,false)) &&*/ 
          isReadyToWhereMtm(field,c.name,false) &&
          <a  
          style={{textDecoration:"underline"}} 
          onClick={(e)=>{
            e.preventDefault()
            /*if(nameOtm==""){
              toggleOpenWhereStatementDateDialog({
                categoryName:`getData${currentCategory.name}`,
                fieldName:c.name,
                segment:`getData${currentCategory.name}`,
              })
        
            }else{*/
              toggleOpenWhereStatementDateDialog({
                categoryName:field,
                fieldName:c.name,
                segment:field
              })
            //}
          }}>Add where condition
          </a>
          }

          {c.name!==`${nameOtm}Id` && displayWhereClauses(nameOtm,c.name)} 
        </p>) || (c.declaredType=="number" &&
      <p style={{marginBottom:"0px"}}>
        <input type="checkbox" 
    style={{marginLeft:"0px",marginRight:"5px",color:"white"}}
    onChange={(e)=>{
      
        doWorkSort(e.target.checked,c.name,field,field,"number")


      checkReviewMtmData(e,c.name,false,cat.name,field/*nameOtm*/,mainCat,c.declaredType,c.relationship,null,null,father,son,c.dataType)
    }}/>
    
        <span style={{marginRight:"10px"}}>{c.name}Number</span>
        
        {/*(nameOtm==""?isReadyToWhereFirst(`getData${currentCategory.name}`,c.name,false):
        isReadyToWhere(nameOtm,c.name,false)) && */
        isReadyToWhereMtm(field,c.name,false) && <a  
      style={{textDecoration:"underline"}} onClick={
        (e)=>{
          e.preventDefault()
          /*if(nameOtm==""){
              toggleOpenWhereStatementNumberDialog({
                categoryName:field,//`getData${currentCategory.name}`,
                fieldName:c.name,
                segment:field//</p>`getData${currentCategory.name}`,
              })
        
          }else{*/
            toggleOpenWhereStatementNumberDialog({
              categoryName:field,//nameOtm,
              fieldName:c.name,
              segment:field//nameOtm
            })
          //}
        }
      }>Add where condition</a>}

      {c.name!==`${nameOtm}Id` && displayWhereClauses(nameOtm,c.name)}
      </p>
    ) || (c.declaredType=="string" &&
      <p style={{marginBottom:"0px"}}>
        <input type="checkbox" 
        style={{marginLeft:"0px",marginRight:"5px",color:"white"}}
         onChange={(e)=>{
          if(nameOtm=="")
            doWorkSort(e.target.checked,c.name,`getData${currentCategory.name}`,`getData${currentCategory.name}`,"string")
          else
            doWorkSort(e.target.checked,c.name,nameOtm,nameOtm,"string")
          checkReviewMtmData(e,c.name,false,cat.name,field/*nameOtm*/,mainCat,c.declaredType,c.relationship,null,null,father,son,c.dataType)
          }}/>
    
        <span style={{marginRight:"10px"}}>{c.name}String</span>
        {isReadyToWhereMtm(field,c.name,false) &&
        <a 
        style={{textDecoration:"underline",color:"white"}} onClick={
        (e)=>{
          e.preventDefault()
          if(nameOtm==""){
              toggleOpenWhereStatementStringDialog({
                categoryName:field,//`getData${currentCategory.name}`,
                fieldName:c.name,
                segment:field//`getData${currentCategory.name}`
              })
        
          }else{
            toggleOpenWhereStatementStringDialog({
              categoryName:field,//nameOtm,
              fieldName:c.name,
              segment:field//nameOtm
            })
          }
        }}>Add where condition</a>}<br/>
        
        
        {c.name!==`${nameOtm}Id` && displayWhereClauses(nameOtm,c.name)}
        </p>
    )
    
    })}
    
    {displayAncestorsCats(trackCatPath,field,field)}
    
        <a style={{textDecoration:"underline"}}
        onClick={e=>{
          e.preventDefault()
          toggleOpenWhereSelectMain({
            categoryName:field,
            fieldName:"hybrid",
            segment:"hybrid"
          })
          
          }
        }>Add main where condition</a><br/>
        <p onClick={()=>toggleOpenViewMainWhereConditionDialog({categoryName:field})}></p>
        {(conditionsWhere[field]?.["main"]==undefined || typeof conditionsWhere[field]?.["main"]!=="object")?<p>none</p>:
      <p onClick={()=>toggleOpenViewMainWhereConditionDialog({categoryName:field,
        segment:conditionsWhere[field]?.["main"]?.["segment"],
        field:conditionsWhere[field]?.["main"]?.["field"]})}>{conditionsWhere[field]?.["main"]?.["rule"]}</p>}
        <a style={{textDecoration:"underline"}}
        onClick={e=>{
          e.preventDefault()
          toggleOpenWhereStatementHybridDialog({
            categoryName:field,
            fieldName:"hybrid",
            segment:"hybrid"
          })
          }
        }
        >Add multiple field where condition</a>
        {displayWhereClauses(field,"hybrid","hybrid")}
        <a style={{textDecoration:"underline",display:"inline"}}
        onClick={e=>{
          e.preventDefault()
          toggleOpenSortCriteriaDialog({categoryName:field,otmChoicesSort:otmChoicesOrder[field],sortRules:sortRules,setSortRules:setSortRules})
        }}>Add Order Criteria</a>

<FormButton style={{
        textAlign:"left",
        textDecoration:"underline",
        marginLeft:0,
        paddingLeft:0
      }} onClick={()=>{
        ////console.log("click",otmChoices[name]["normal"])
        setOtmCategoryFields(pivote[field])
        toggleCompositeFieldDialog(field)
      }}>Add composite field</FormButton>
      {compFieldsArray[field]?.map(d=>{
          return <>
          {d.type=="date" && /*<p>
              <input type="checkbox"/> {d.name1}
            </p>*/
            <p><input type="checkbox" 
            style={{marginRight:"5px", color:"white"}}
            onChange={(e)=>{
              //const checkReview=(e,name1,otm=false,padre,nameOtm,mainCat=false,declaredType,otmdestiny="",cf=false)=>{
              doWorkSort(e.target.checked,d.name1,field,field,"number")

              checkReviewMtmData(e,d.name1,false,"",field,false,true,"",true,d,father,son,d.dataType)
            }}
            />
            <a style={{color:"yellow", marginRight:"10px"}}
            onClick={()=>{
              toggleOpenViewCompositeFieldDialog({specificOtmName:field,compositeFieldName:d.name1})
            }}>{d.name1}Number</a>
            {isReadyToWhereMtm(field,d.name1,true) && <a  
            style={{textDecoration:"underline"}} onClick={
              (e)=>{
                e.preventDefault()
                toggleOpenWhereStatementDateDialog({
                  fieldName:d.name1,
                  categoryName:field,
                  segment:field
                })
              }
            }>Add where condition</a>
            }
            x
            {displayWhereClauses(field,d.name1)}
            </p>
            
            
          
          }

          {d.type=="number" && <p>

          
          <input type="checkbox" 
            style={{marginRight:"5px", color:"white"}}
            onChange={(e)=>{
              //const checkReview=(e,name1,otm=false,padre,nameOtm,mainCat=false,declaredType,otmdestiny="",cf=false)=>{
              doWorkSort(e.target.checked,d.name1,field,field,"number")

              checkReviewMtmData(e,d.name1,false,"",field,false,true,"",true,d,father,son,displayCategoryHeaders.dataType)
            }}
            />
            <a style={{color:"yellow", marginRight:"10px"}}
            onClick={()=>{
              toggleOpenViewCompositeFieldDialog({specificOtmName:field,compositeFieldName:d.name1})
            }}>{d.name1}Number</a>
            {isReadyToWhereMtm(field,d.name1,true) && <a  
            style={{textDecoration:"underline"}} onClick={
              (e)=>{
                e.preventDefault()
                toggleOpenWhereStatementNumberDialog({
                  fieldName:d.name1,
                  categoryName:field,
                  segment:field
                })
              }
            }>Add where condition</a>
            }
            x
            {displayWhereClauses(field,d.name1)}
            </p>
            
            
            
        }
        
        {d.type=="string" && <p>

          
        <input type="checkbox" 
          style={{marginRight:"5px", color:"white"}}
          onChange={(e)=>{
            //const checkReview=(e,name1,otm=false,padre,nameOtm,mainCat=false,declaredType,otmdestiny="",cf=false)=>{
            doWorkSort(e.target.checked,d.name1,field,field,"string")

            checkReviewMtmData(e,d.name1,false,"",field,false,true,"",true,d,father,son,d.dataType)
          }}
          />
          <a style={{color:"yellow",marginRight:"10px"}}
             onClick={()=>{
               toggleOpenViewCompositeFieldDialog({specificOtmName:field,compositeFieldName:d.name1})
          }}>{d.name1}String</a>
          {isReadyToWhere(field,d.name1,true) && <a  
            style={{textDecoration:"underline"}} onClick={
              (e)=>{
                e.preventDefault()
                
                toggleOpenWhereStatementStringDialog({categoryName:field,
                fieldName:d.name1,
                segment:field})
              }
            }>Add where condition</a>
          }
          x
          {displayWhereClauses(field,d.name1)}
          </p>
          
}</>})}
    
      
      
    
    </div>

    

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
     
      <a style={{textDecoration:"underline",display:"inline"}}
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
      <a style={{textDecoration:"underline",display:"inline"}}
        onClick={e=>{
          e.preventDefault()
          toggleOpenSortCriteriaDialog({categoryName:name,otmChoicesSort:otmChoicesOrder[name],sortRules:sortRules,setSortRules:setSortRules})
        }}>Add Order Criteria</a>
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
          {d.type=="date" && <p>
              <input type="checkbox"/> {d.name1}
            </p>
          }

          {d.type=="number" && <p>

          
          <input type="checkbox" 
            style={{marginRight:"5px", color:"white"}}
            onChange={(e)=>{
              //const checkReview=(e,name1,otm=false,padre,nameOtm,mainCat=false,declaredType,otmdestiny="",cf=false)=>{
              doWorkSort(e.target.checked,d.name1,name,name,"number")

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
            doWorkSort(e.target.checked,d.name1,name,name,"string")

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
{(parentIdentifiers?.[parentCategories?.[name]]?.["fieldCompOrNormalType"]=="normal" || 
        parentIdentifiers?.[parentCategories?.[name]]?.["fieldCompOrNormalType"]=="composite") &&
      displayParentIdentifier(name,name,"parentIdentifier",
parentIdentifiers?.[parentCategories?.[name]]?.["type"])}
{parentIdentifiers?.[parentCategories?.[name]]?.["fieldCompOrNormalType"]=="none" &&
displayParentIdentifierNull(name,name,"parentIdentifier",
parentIdentifiers?.[parentCategories?.[name]]?.["type"])}
  
      <FormButton style={{
        textAlign:"left",
        textDecoration:"underline",
        marginLeft:0,
        paddingLeft:0
      }} onClick={()=>{
        ////console.log("click")
        setOtmCategoryFields(pivote[name])

        toggleOtmIdFieldsDialog(name)
      }}>Add field to identify parent in child relationships</FormButton>
    </div>
    )
    }else{
      delete otmChoices[name]
    }
  }

let pivote={}

const isReadyToWhereMtm=(otm,busca,comp=false)=>{
  let res=[]
  if(comp==false)
    return mtmChoices[otm]?.normal.filter(x=>{
      if(x.name1==busca)
        return true
      return false
    }).length>=1?true:false
  else if (comp==true){
    return mtmChoices[otm]?.compositeFields.filter(x=>{
      if(x.name1==busca)
        return true
      return false
    }).length>=1?true:false
  }
}

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

const getSubsetColor=(whereHeader)=>{
  let ssvar=subsets
  if(ssvar?.[whereHeader["categoryName"]]!==undefined){
  let p=Object.keys(ssvar?.[whereHeader["categoryName"]])
  for(let o=0;o<p.length;o++){
    let c=ssvar?.[whereHeader["categoryName"]][p[o]]
    if(c["categoryName"]==whereHeader["categoryName"] &&
      c["segment"]==whereHeader["segment"] &&
      c["fieldName"]==whereHeader["fieldName"] &&
      c["ruleName"]==whereHeader["rule"]){
      return c["color"]
    }
  }
  }
  return null
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
          
          if(conditionsWhere[nc]?.["hybrid"]?.["hybrid"]?.["type"]=="hybrid"){
            let ssColor=getSubsetColor({
              fieldName:"hybrid",
              categoryName:nc,
              segment:"hybrid",
              rule:x
            })
            return <p><p style={{color:"yellow",display:"inline-block"}}
            onClick={()=>toggleOpenViewWhereStatementHybridDialog(conditionsWhere[nc]?.["hybrid"]?.["hybrid"]?.[x]?.["rule"],
            {
              fieldName:"hybrid",
              categoryName:nc,
              segment:"hybrid",
              
            })}>{x}</p>
            <span>&nbsp;</span>
            <span 
            onClick={()=>toggleOpenSubsetDialog(conditionsWhere[nc]?.["hybrid"]?.["hybrid"]?.[x]?.["rule"],
            {
              fieldName:"hybrid",
              categoryName:nc,
              segment:"hybrid",
              rule:x
            })}
            style={{textDecoration:"underline"}}>
              {ssColor==null?"Create subset":"Editar subset"}</span>
              {ssColor!==null && <span style={{display:"inline-block",marginLeft:"5px",verticalAlign:"middle",width:"50px",height:"10px",background:ssColor,color:ssColor,border:"1px solid white"}}>&nbsp;</span>}
            </p>
          }
        }
      
      })
    }
    
    return cls.length>0?<p>{cls}</p>:<br/>
  }
  //if(cat!==""){
    if(conditionsWhere[nc]?.[ns]?.[field]!==undefined){
      cls=Object.keys(conditionsWhere[nc]?.[ns]?.[field]).map(x=>{
        if(x!=="categoryName" && x!=="fieldName" && x!=="segment" && x!=="type"){
          if(conditionsWhere[nc]?.[ns]?.[field]?.["type"]=="number"){
            let ssColor=getSubsetColor({
              fieldName:field,
              categoryName:nc,
              segment:ns,
              rule:x
            })
            return <p><p style={{color:"yellow",display:"inline-block"}}
            onClick={()=>toggleOpenViewWhereStatementNumberDialog(conditionsWhere[nc]?.[ns]?.[field]?.[x]?.["rule"],{
              fieldName:field,
              categoryName:nc,
              segment:ns
            })}>{x}</p>
            <span>&nbsp;</span>
            <span 
            onClick={()=>toggleOpenSubsetDialog(conditionsWhere[nc]?.[ns]?.[field]?.[x]?.["rule"],{
              fieldName:field,
              categoryName:nc,
              segment:ns,
              rule:x
            })}
            style={{textDecoration:"underline"}}>
            {ssColor==null?"Create subset":"Editar subset"}</span>
            {ssColor!==null && <span style={{display:"inline-block",marginLeft:"5px",verticalAlign:"middle",width:"50px",height:"10px",background:ssColor,color:ssColor,border:"1px solid white"}}>&nbsp;</span>}
           </p>
          }else if(conditionsWhere[nc]?.[ns]?.[field]?.["type"]=="string"){
            let ssColor=getSubsetColor({
              fieldName:field,
              categoryName:nc,
              segment:ns,
              rule:x
            })
            return <p><p style={{color:"yellow",display:"inline-block"}}
              onClick={()=>toggleOpenViewWhereStatementStringDialog(conditionsWhere[nc]?.[ns]?.[field]?.[x]?.["rule"],{
                fieldName:field,
                categoryName:nc,
                segment:ns
              })}>{x}</p>
              <span>&nbsp;</span>
              <span 
              onClick={()=>toggleOpenSubsetDialog(conditionsWhere[nc]?.[ns]?.[field]?.[x]?.["rule"],{
                fieldName:field,
                categoryName:nc,
                segment:ns,
                rule:x
              })}
              style={{textDecoration:"underline"}}>{
                ssColor==null?"Create subset":"Editar subset"}</span>
              {ssColor!==null && <span style={{display:"inline-block",marginLeft:"5px",verticalAlign:"middle",width:"50px",height:"10px",background:ssColor,color:ssColor,border:"1px solid white"}}>&nbsp;</span>}
              </p>
          }else if(conditionsWhere[nc]?.[ns]?.[field]?.["type"]=="date"){
            let ssColor=getSubsetColor({
              fieldName:field,
              categoryName:nc,
              segment:ns,
              rule:x
            })
            return <p><p style={{color:"yellow",display:"inline-block"}}
              onClick={()=>toggleOpenViewWhereStatementDateDialog(conditionsWhere[nc]?.[ns]?.[field]?.[x]?.["rule"],{
                fieldName:field,
                categoryName:nc,
                segment:ns
                })}>{x}</p>
                <span>&nbsp;</span>
                <span
                style={{textDecoration:"underline"}}
                onClick={()=>toggleOpenSubsetDialog(conditionsWhere[nc]?.[ns]?.[field]?.[x]?.["rule"],{
                  fieldName:field,
                  categoryName:nc,
                  segment:ns,
                  rule:x
                })}
                >{ssColor==null?"Create subset":"Editar subset"}</span>
                {ssColor!==null && <span style={{display:"inline-block",marginLeft:"5px",verticalAlign:"middle",width:"50px",height:"10px",background:ssColor,color:ssColor,border:"1px solid white"}}>&nbsp;</span>}
              </p>
          }
        }
      })
    return cls.length>0?<div>{cls}</div>:<br/>
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
  let pc=""
  
  if(nameOtm==""){
    pc=`getData${currentCategory.name}`
  }else{
    pc=nameOtm
  }
  if(pivote[`getData${currentCategory.name}`]==undefined)
    pivote={...pivote,[`getData${currentCategory.name}`]:[]}
  if(pivote[nameOtm]==undefined)
     pivote={...pivote,[nameOtm]:[]}
  console.log("Catmessage",cat.name,nameOtm,mainCat,parentCategories,parentCategories?.[nameOtm])
  if(cat && showFields){  
    return (
    <div style={{marginLeft:space?"10px":"0px",width:primero?"50%":"100%"}}>
      <p>HOla</p>
      {fieldsSingle=cat?.fields?.map(c=>{
        if(c.relationship=="onetomany"){
          if(parentCategories[c.name]==undefined)
            parentCategories={...parentCategories,[`${c.name}`]:pc}
          console.log("pc22",parentCategories)
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
        }else if(c.relationship=="manytomany"){
          let nameTableMtm=""

          if(parentCategories[c.name]==undefined)
            parentCategories={...parentCategories,[`${c.name}`]:pc}
          console.log("pc22",parentCategories)
          return <>
            <input type="checkbox" 
            style={{marginRight:"5px", color:"white"}}
            onChange={(e)=>{
              //e,name1,otm=false,padre,nameOtm,mainCat=false,declaredType,otmdestiny="",cf=false,dcf={},isMtm=false
              checkReview(e,c.name,false,cat.name,nameOtm,mainCat,"","",false,{},true)
            }}
            />
            <a style={{color:"green"}}>{c.name}</a>
            <br/>
            {isChecked(c.name) && displayMenuMtm(c.name,cat,c.name /*nameOtm*/,mainCat,[...trackCatPath,c.name])}
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
            {c.declaredType=="date" &&
              <p>
                <input type="checkbox" 
                style={{marginLeft:"0px",marginRight:"5px",color:"white"}}
                onChange={(e)=>{
                  if(nameOtm=="")
                    doWorkSort(e.target.checked,c.name,`getData${currentCategory.name}`,`getData${currentCategory.name}`,"number")
                  else 
                    doWorkSort(e.target.checked,c.name,nameOtm,nameOtm,"number")


                  checkReview(e,c.name,false,cat.name,nameOtm,mainCat,c.declaredType,c.relationship)
                }}/>
          
                <span style={{marginRight:"10px"}}>{c.name}Date</span>
              
                {(nameOtm==""?isReadyToWhereFirst(`getData${currentCategory.name}`,c.name,false):
                isReadyToWhere(nameOtm,c.name,false)) && 
                <a  
                style={{textDecoration:"underline"}} 
                onClick={(e)=>{
                  e.preventDefault()
                  if(nameOtm==""){
                    toggleOpenWhereStatementDateDialog({
                      categoryName:`getData${currentCategory.name}`,
                      fieldName:c.name,
                      segment:`getData${currentCategory.name}`,
                    })
              
                  }else{
                    toggleOpenWhereStatementDateDialog({
                      categoryName:nameOtm,
                      fieldName:c.name,
                      segment:nameOtm
                    })
                  }
                }}>Add where condition
                </a>
                }

                {c.name!==`${nameOtm}Id` && displayWhereClauses(nameOtm,c.name)} 
              </p>
            }
            {c.declaredType=="number" &&
            <p style={{marginBottom:"0px"}}>
              <input type="checkbox" 
          style={{marginLeft:"0px",marginRight:"5px",color:"white"}}
          onChange={(e)=>{
            if(nameOtm=="")
              doWorkSort(e.target.checked,c.name,`getData${currentCategory.name}`,`getData${currentCategory.name}`,"number")
            else 
              doWorkSort(e.target.checked,c.name,nameOtm,nameOtm,"number")


            checkReview(e,c.name,false,cat.name,nameOtm,mainCat,c.declaredType,c.relationship)
          }}/>
          
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
               onChange={(e)=>{
                if(nameOtm=="")
                  doWorkSort(e.target.checked,c.name,`getData${currentCategory.name}`,`getData${currentCategory.name}`,"string")
                else
                  doWorkSort(e.target.checked,c.name,nameOtm,nameOtm,"string")
                checkReview(e,c.name,false,cat.name,nameOtm,mainCat,c.declaredType,c.relationship)
                }}/>
          
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
        {displayWhereClauses(`getData${currentCategory.name}`,"hybrid","hybrid")}

      </div>}
      {primero && <a style={{textDecoration:"underline",display:"inline"}}
        onClick={e=>{
          e.preventDefault()
          toggleOpenSortCriteriaDialog({categoryName:`getData${currentCategory.name}`,otmChoicesSort:otmChoicesOrder[`getData${currentCategory.name}`],sortRules:sortRules,setSortRules:setSortRules})
        }}>Add Order Criteriafirst</a>}
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

              doWorkSort(e.target.checked,d.name1,`getData${currentCategory.name}`,`getData${currentCategory.name}`,"number")

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

                  doWorkSort(e.target.checked,d.name1,`getData${currentCategory.name}`,`getData${currentCategory.name}`,"string")

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
            //setOtmCategoryFields(pivote[`getData${currentCategory.name}`])
            toggleOtmIdFieldsDialog(`getData${currentCategory.name}`)
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
  console.log("otmcho11",otmChoices[nameCluster])
  otmChoices?.[nameCluster]?.["mtm"]?.map(l=>{
    console.log("lll",l)
    routes[l]=[...grandsRoute,l]
   
    
    
  })


  return routes

}

const calculateRoutes=(parentsRoute)=>{
 let parentNodeName=`getData${currentCategory.name}`
  let data=categoryProducts[parentNodeName]
  let routes={}
  let otmMtm=[]

  if(firstCatNormalFields[parentNodeName]["otm"].length>0){
    let sons=firstCatNormalFields[parentNodeName]["otm"].map(l=>{
      routes[l]=[...parentsRoute,l]
      routes={...routes,...calculateGrandRoutes(routes[l],l)}
      
    })
  } 
    console.log("hui",firstCatNormalFields[parentNodeName]["mtm"])

    if(firstCatNormalFields?.[parentNodeName]?.["mtm"]?.length>0){
    
      let sonsMtm=firstCatNormalFields[parentNodeName]["mtm"].map(l=>{
        routes[l]=[...parentsRoute,l]
      })
    }
  
  if(firstCatNormalFields[parentNodeName]["otm"].length==0 && firstCatNormalFields[parentNodeName]["mtm"].length==0)
   return {[parentNodeName]:[parentNodeName]}
    
   console.log("hui",routes)
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
        if(r[eachIndex].startsWith("otm"))
          final=[...final,y.id]
        else
          final=[...final,`${y["original"][mtmChoices[r[eachIndex]]["son"]]}-${y["original"][mtmChoices[r[eachIndex]]["father"]]}`]
        console.log("step44",r[eachIndex],final,oavTotals)
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
  console.log("objectstep",object,step,x)
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
        
        }/*else if(l.type=="string"){
          normalFields={...normalFields,[`${l["name1"]}`]:getCompFieldString(x,l.structure,compFieldsArray[step])}
        }*/
      }
    }else if(l.type=="string"){
      normalFields={...normalFields,[`${l["name1"]}`]:getCompFieldString(x,l.structure,compFieldsArray[step])}
    }
  })
  //if(indice==(doneLd[r[eachIndex]].len-1))
    //doneLd[r[eachIndex]].done=true
  let newId
  if(step.startsWith("otm") || step.startsWith("getData"))
    normalFields={id:x["id"],...normalFields}
  else if(step.startsWith("mtm")){
    newId=`${x[mtmChoices[step]["son"]]}-${x[mtmChoices[step]["father"]]}`
    normalFields={id:newId,...normalFields}
  }
  console.log("stepio",step,newId)
  
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
      }else if(type=="date"){
        for(let i in rule){
          if(i%3==0){
            let nk=parseInt(i)
            ops=[...ops,rule[nk]]
          
            let v1=""
            if(x[field]!==null)
              v1=new Date(parseInt(x[field]))
            let r1=rule[nk+2]
            if(v1==""){
              arrAnswers=[...arrAnswers,false]
            }else{
              console.log("dateprev",v1,r1)
              if(rule[nk+1]==">"){
                if(v1>r1)
                  arrAnswers=[...arrAnswers,true]
                else 
                  arrAnswers=[...arrAnswers,false]
              }else if(rule[nk+1]==">="){
                if(v1>=r1)
                  arrAnswers=[...arrAnswers,true]
                else 
                  arrAnswers=[...arrAnswers,false]
              }else if(rule[nk+1]=="<"){
                if(v1<r1)
                  arrAnswers=[...arrAnswers,true]
                else 
                  arrAnswers=[...arrAnswers,false]
              }else if(rule[nk+1]=="<="){
                if(v1<=r1)
                  arrAnswers=[...arrAnswers,true]
                else 
                  arrAnswers=[...arrAnswers,false]
              }else if(rule[nk+1]=="="){
                if(v1==r1)
                  arrAnswers=[...arrAnswers,true]
                else 
                  arrAnswers=[...arrAnswers,false]
              }else if(rule[nk+1]=="!="){
                if(v1!=r1)
                  arrAnswers=[...arrAnswers,true]
                else 
                  arrAnswers=[...arrAnswers,false]
              }
            }
          }
        }
      }   
    }
  }else if(field!=="hybrid"){
    console.log("res segmentotherthatmain")
  }
  console.log("evrule",evaluateRule(arrAnswers,ops),x,field)
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
        if(!checkRule(getMainRule,data[u["segment"]][y],u["category"]==u["segment"],u["field"],type,u,y)){
          Object.keys(data).forEach(l=>{
            delete data[l][y]
          })
        } 
      })
    }
    
  }else if(u["category"]!==u["segment"] && u["segment"]!=="hybrid"){
    if(u["rule"]=="none" || u["rule"]=="")
      return true
    else{
    
      Object.keys(data[u["segment"]]).forEach(y=>{
        if(!checkRule(getMainRule,data[u["segment"]][y],false,u["field"],type,u)){
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
    
}/*else{
  Object.keys(data[category]).forEach(y=>{
      data[category][y][`${category}TotalCount`]=
      
  })
}*/
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
  console.log("r eachindexgl BIEN",r, eachIndex,conditionsWhere)
  let current=initializeVarsGld(r,eachIndex)
  let fieldId=""
  let newData=[]
  let parentIdField=parentIdentifiers?.[r[eachIndex-1]]?.["field"]
  console.log("parentidfield",parentIdField,r[eachIndex])
  const parentIdNormalOrCompositeType=parentIdentifiers?.[r[eachIndex]]?.["fieldCompOrNormalType"]
  if(eachIndex>0){
    if(parentCategories[r[eachIndex]]==undefined){
      console.log("parentCategories",{...parentCategories,[r[eachIndex]]:r[eachIndex-1]})

      parentCategories={...parentCategories,[r[eachIndex]]:r[eachIndex-1]}
    }
  
  }

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
      let normalFields
      if(r[eachIndex]==`getData${currentCategory.name}`)
        normalFields=getNormalFieldsOfEachIndex(firstCatNormalFields[r[eachIndex]],r[eachIndex],x)
      else if(r[eachIndex].startsWith("mtm"))
        normalFields=getNormalFieldsOfEachIndex(mtmChoices[r[eachIndex]],r[eachIndex],x["original"])
      else
        normalFields=getNormalFieldsOfEachIndex(otmChoices[r[eachIndex]],r[eachIndex],x)
      let nId
      if(r[eachIndex].startsWith("otm") || r[eachIndex].startsWith("getData"))
        nId=x.id
      else if(r[eachIndex].startsWith("mtm"))
        nId=normalFields["id"]
      if(eachIndex==0){
        totalRoutes={
          ...totalRoutes,
          [r[eachIndex]]:{
            ...totalRoutes[r[eachIndex]],
            [current]:{
              ...totalRoutes[r[eachIndex]][current],
              [nId]:{
                normalData:{},
                total:0,
                keys:[],
                
                ...otherAccVars[0]
              }
            }
          }
        }
      }else{
        totalRoutes={
          ...totalRoutes,
          [r[eachIndex]]:{
            ...totalRoutes[r[eachIndex]],
            [current]:{
              ...totalRoutes[r[eachIndex]][current],
              [nId]:{
                normalData:{},
                total:0,
                keys:[],
                parentIdentifier:"",
                parentCategory:"",
                ...otherAccVars[0]
              }
            }
          }
        }
      }
      
      /*let normalFields
      if(r[eachIndex]==`getData${currentCategory.name}`)
        normalFields=getNormalFieldsOfEachIndex(firstCatNormalFields[r[eachIndex]],r[eachIndex],x)
      else if(r[eachIndex].startsWith("mtm"))
        normalFields=getNormalFieldsOfEachIndex(mtmChoices[r[eachIndex]],r[eachIndex],x)
      else
        normalFields=getNormalFieldsOfEachIndex(otmChoices[r[eachIndex]],r[eachIndex],x)
      let nId
      if(r[eachIndex].startsWith("otm") || r[eachIndex].startsWith("getData"))
        nId=x.id
      else if(r[eachIndex].startsWith("mtm"))
        nId=normalFields["id"]*/

      if(eachIndex==0){
        totalRoutes={
          ...totalRoutes,
          [r[eachIndex]]:{
            ...totalRoutes[r[eachIndex]],
            [current]:{
              ...totalRoutes[r[eachIndex]][current],
              [nId]:{
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
      }else{
        fieldId=normalFields[`${r[eachIndex]}Id`]
        console.log("checkver",r[eachIndex-1],r[eachIndex],fieldId,parentIdField,totalRoutes)
        totalRoutes={
          ...totalRoutes,
          [r[eachIndex]]:{
            ...totalRoutes[r[eachIndex]],
            [current]:{
              ...totalRoutes[r[eachIndex]][current],
              [nId]:{
                ...totalRoutes[r[eachIndex]][current][x.id],
                normalData:{...normalFields,
                  parentIdentifier:totalRoutes[r[eachIndex-1]][`${r[eachIndex]}total`]?.[fieldId]?.["normalData"]?.[parentIdField],
                  //parentCategory:r[eachIndex-1]
                },
                total:otherAccVars[1].length,
                  /*?[...Object.keys(otherAccVars[0])].length:
                  totalRoutes[r[eachIndex]][current][x.id]["total"]+[...Object.keys(otherAccVars[0])].length,*/
                keys:otherAccVars[1].length!==0?otherAccVars[1]:[],
                //parentIdentifier:totalRoutes[r[eachIndex-1]][`${r[eachIndex]}total`]?.[fieldId]?.["normalData"]?.[parentIdField],
                ...otherAccVars[0]
              }
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
  console.log("routespadre",routes)
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
  console.log("legroutes99",...legRoutes)
  for(let i=0;i<route.length;i++){
    //console.log("findfather",catPadre,route[i],route[i]==catPadre)
    if(route[i]==catPadre){
      let res=originalRoutes[j][i+1]
      console.log("findfather4",catPadre,legRoutes,res,legRoutes[j][i+1],legRoutes[j][i+2])
      let u=`${originalRoutes[j][i+2]}total`
      console.log("ufinal",u)
      let res1
      if(res!=undefined){
         res1=[res,u]
         if(catPadre.startsWith("get")){
           console.log("catpadre88",catPadre,legRoutes[j],res)
         }
         route.splice(route.length-1,1)
         return res1
      }else
        return -1
        //res1=[res,"final"]
      //route.splice(route.length-1,1)
      //return res1
    }
  }
  return -1
}

const calculateSons=(routes,catPadre,legRoutes)=>{
  let res=[]
  //console.log("params routes catpadre",...routes,"esp",catPadre,"esp",...legRoutes)
  for(let i=0;i<routes.length;i++){
    let r1=findFather(catPadre,goodRoutes[i],originalRoutes,i)
    if(r1!=-1){
      
      res=[...res,...r1]
      //console.log("catPadrepor",catPadre,[...routes[i]],res)
    }
  }
  console.log("params1",catPadre,res)
  return res
}
let goodRoutes=[]
let originalRoutes=[]

const deleteEqualRoutes=(/*routes,lr*/)=>{
  //console.log("prevroutes",...routes,"esp",...lr)
  let borrar=[]
  //goodRoutes=[]
  //originalRoutes=[]
  //if(routes.length>1){
    let routes=goodRoutes
    let lr=originalRoutes
  for(let i=0;i<routes.length;i++){
    let cur=i
      if(!borrar.includes(i)){
      for(let j=0;j<routes.length;j++){
        console.log("borrar1",borrar,routes[j],borrar.includes(j))
        console.log("keycode",cur,j,j==cur,borrar,j,borrar.includes(j))
        //if(borrar.includes(j)==false){
          
          if(j==cur){
            console.log("keycode111")
            continue
          }else{
            for(let o=0;o<routes[cur].length;o++){
              
            
              if(routes[cur][o]==routes?.[j]?.[o] && o==routes[cur].length-1){
              
                console.log("deleteclave",...routes[j])
                borrar.push(j)

              }else{
                if(routes[cur][o]!=routes?.[j]?.[o]){
                  console.log("routesespec",routes[j])
                  
              
                  
                  break;

                }else{
                  continue
                }
              }  
            }

            
          
          }
        //}
      }
    }
    }
  
  let newRoutes=[]
 //console.log("borrarverif",Object.keys(routes),...routes,Object.keys(lr),...lr,borrar)
  let newLR=[]
  //if(borrar.length>0){
  for(let nai=0;nai<routes.length;nai++){
    console.log("borrarespec",borrar,nai,borrar.includes(nai),routes[nai])
    if(borrar.includes(nai)==false){
      newRoutes.push(routes[nai])
      
      //console.log("equip",newRoutes,newLR)
    }
    if(borrar.includes(nai)==false){
    newLR.push(lr[nai])
    }
      
  }
  goodRoutes=newRoutes
  originalRoutes=newLR
  //}
  //console.log("newroutes",...routes,"esp",...lr)

  return goodRoutes
  //}
}

const findTheLowerLevelCategory1=(routes,res=[],legRoutes)=>{
  console.log("deroutes1",...routes)
  goodRoutes=routes
  originalRoutes=legRoutes
  routes=deleteEqualRoutes(routes,legRoutes)
  console.log("deroutes",...routes)
  let catPadre=getCatPadre(goodRoutes)
  console.log("ftllc",...routes,catPadre,res)
  if(catPadre!=-1){
    let sons={}
    if(sons[catPadre]==undefined)
      sons[catPadre]=[]
    //sons[catPadre]=calculateSons(routes,catPadre)
    if(!catPadre.startsWith("getData")){
      console.log("calcsons")
      
    res=[...res,{[catPadre]:calculateSons(goodRoutes,catPadre,originalRoutes)},...findTheLowerLevelCategory1(goodRoutes,res,originalRoutes)]
    }else{

     //if(catPadre.startsWith("get"))
      //console.log("yu88",...routes)
    res=[...res,{[catPadre]:calculateSons(goodRoutes,catPadre,originalRoutes)},...findTheLowerLevelCategory1(goodRoutes,res,originalRoutes)]
    }
    //console.log("res555",...res,catPadre,...routes)
    return res
  }else{

  //console.log("ressons",...res,...routes)
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

  }else if(cat.startsWith("mtm")){
    mtmChoices?.[cat]?.["normal"].forEach(x=>{
      console.log("veryu",x.dataType,x.type)
      if(x.type=="number" && x.dataType!="queryCategory")
        res["normal"].push(x.name1)

    })
    console.log("resnormal",res["normal"])
    mtmChoices?.[cat]?.["compositeFields"].forEach(x=>{
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
      
          if(nf.normal.length>0)
          for(let x=0;x<nf.normal.length;x++){
            finalObject[key][cat][k[i]]={...finalObject[key][cat][k[i]],[`${nf.normal[x]}total`]:0}
           }
           if(nf.compositeFields.length>0)
          for(let x=0;x<nf.compositeFields.length;x++){
            finalObject[key][cat][k[i]]={...finalObject[key][cat][k[i]],[`${nf.compositeFields[x]}total`]:0}
          }
          finalObject[key][cat][k[i]]={...finalObject[key][cat][k[i]],[`${cat}TotalCount`]:0}
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
  console.log("iofobv",obj)
  if(finalObject[key]==undefined)
    finalObject={...finalObject,[key]:{}}
  if(finalObject[key][cat]==undefined)
    finalObject={...finalObject,[key]:{...finalObject[key],[cat]:{}}}
  let k=Object.keys(obj)
  let nf=getNumericFields(cat)  
  let temp=totalRoutes[cat][next]

  //if(!isLast(cat)){
    for(let i=0;i<k.length;i++){
      if(finalObject[key][cat][k[i]]==undefined)
        //if(verifyMeetWithConditionsBySegmentBaseLeve1(key,obj[k[i]].normalData)){
          finalObject[key][cat]={...finalObject[key][cat],[k[i]]:{...finalObject[key][cat][k[i]]/*,...obj[k[i]].normalData*/,keys:obj[k[i]].keys/*,[`keys${cat}`]:obj[k[i]].keys}*/}}
        console.log("alyu",finalObject[key][cat])
            if(nf.normal.length>0)
            for(let x=0;x<nf.normal.length;x++){
          
                finalObject[key][cat][k[i]]={...finalObject[key][cat][k[i]],[`${nf.normal[x]}total`]:0}
            }
            if(nf.compositeFields.length>0)
            for(let x=0;x<nf.compositeFields.length;x++){
              
              finalObject[key][cat][k[i]]={...finalObject[key][cat][k[i]],[`${nf.compositeFields[x]}total`]:0}
            }
          finalObject[key][cat][k[i]]={...finalObject[key][cat][k[i]],[`${cat}TotalCount`]:0}

        //}
      

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
          finalObject[key][key]={...finalObject[key][key],[k[i]]:{...finalObject[key][key][k[i]],...obj[k[i]].normalData,keys:obj[k[i]].keys}}
      
    
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

let accumulatedValues={}
let realGrandTotals={}

//getTotalsOfNumericVariables(finalObject[cat],finalObject[trueKey],cat)
const getTotalsOfNumericVariables=(a1,a2,cat,mainKey)=>{
  if(realGrandTotals[mainKey]==undefined)
    realGrandTotals[mainKey]={}
  if(realGrandTotals[mainKey][cat]==undefined)
    realGrandTotals[mainKey][cat]={}
  console.log("a1 a2",a1,a2,cat,mainKey)
  /*if(accumulatedValues[trueKey]==undefined)
    accumulatedValues[cat]={}*/

//a1 es la categoria hija inmediata, y a2 es la categoria superior inmediata
  let doneMain=[]
  Object.keys(a1).forEach(p=>{
    
    //p son las claves de la categoria inferior
    let x=Object.keys(a1[p])
    /*if(accumulatedValues[p]==undefined)
      accumulatedValues[p]={}*/
    //x son los ids de la categoria inferior
    
    
    for(let m1=0;m1<x.length;m1++){
      
      Object.keys(a2[p]).forEach(o=>{
        ////console.log("m1",a2[o].keys,x[m1],a2[o].keys.includes(parseInt(x[m1])))
        let cond
        let keyTransform=x[m1]
        if(!Number.isInteger(x[m1])){
          keyTransform=x[m1]
          cond=a2[p][o].keys.map(x=>x.toString()).includes(keyTransform)
          console.log("ppppmtm",typeof x[m1],p,a2[p][o].keys,keyTransform,cond,a1[p],a2[p][o].keys.includes(keyTransform))

        }else{
          keyTransform=x[m1]
          cond=a2[p][o].keys.includes(keyTransform)
        }
        console.log("a2orig",a2[p][o].keys,x[m1],p,cond)
        if(cond==true){//a2[p][o].keys.includes(x[m1])){//parseInt(x[m1]))){
          /*if(accumulatedValues[p][o]==undefined)
            accumulatedValues[p][o]={}*/
          /*if(mainKey==`getData${currentCategory.name}` && ![...doneMain].includes(o)){
            doneMain=[...doneMain,o]
            if(realGrandTotals[mainKey]==undefined)
              realGrandTotals={...realGrandTotals,[mainKey]:{}}
            if(realGrandTotals[mainKey][mainKey]==undefined)
              realGrandTotals[mainKey]={...realGrandTotals[mainKey],[mainKey]:{}}
              let st
            firstCatNormalFields[`getData${currentCategory.name}`].normal.forEach(x=>{
              if(x.type=="number"){
                if(realGrandTotals[mainKey][mainKey]?.[`${x.name1}total`]==undefined)
                  realGrandTotals[mainKey][mainKey][`${x.name1}total`]=0
                st=a2[`getData${currentCategory.name}`][o][x.name1]
                realGrandTotals[mainKey][mainKey][`${x.name1}total`]+=st
              }
                
            })
            firstCatNormalFields[`getData${currentCategory.name}`].compositeFields.forEach(x=>{
              if(x.type=="number"){
                if(realGrandTotals[mainKey][mainKey]?.[`${x.name1}total`]==undefined)
                  realGrandTotals[mainKey][mainKey][`${x.name1}total`]=0
                st=a2[`getData${currentCategory.name}`][o][x.name1]
                console.log("st10000",st,a2,p,o,a2[p][o])
                realGrandTotals[mainKey][mainKey][`${x.name1}total`]+=st
              }  
            })
            
          }*/

          
          let nf=getNumericFields(p)
          //console.log("m1",nf)
          //if(cat!=p){
            if(nf.normal.length>0){
            for(let j1=0;j1<nf.normal.length;j1++){
              /*if(accumulatedValues[p][o][nf["normal"][j1]]==undefined)
                accumulated[cat][p][o][nf["normal"][j1]]=[]*/
              console.log("m1",a2,o,a2[p],a2[p][o],a1,p,x[m1],nf["normal"][j1],`${nf["normal"][j1]}total`,isLast(p),a1[p],a1[p][x[m1]],a1[p][x[m1]][nf["normal"]],a1[p][x[m1]][nf["normal"][j1]],a1[p][x[m1]][`${nf["normal"][j1]}total`],a2[p][o][`${nf["normal"][j1]}total`])
              if(isLast(cat) || p==cat){
              
                let st=0
                console.log("prob",a1[p][keyTransform][nf["normal"][j1]],nf["normal"][j1])
                if(a1[p][keyTransform][nf["normal"][j1]]!=null && a1[p][keyTransform][nf["normal"][j1]]!=undefined){
                  st=a1[p][keyTransform][nf["normal"][j1]]
                }
                a2[p][o][`${nf["normal"][j1]}total`]+=st
                if(a2[p][o][`${nf["normal"][j1]}Acummulated`]==undefined || a2[p][o][`${nf["normal"][j1]}Acummulated`]==null)
                  a2[p][o][`${nf["normal"][j1]}Acummulated`]=[]
                a2[p][o][`${nf["normal"][j1]}Acummulated`].push(st)
                /*if(realGrandTotals[mainKey][p]==undefined)
                  realGrandTotals[mainKey][p]={}
                  if(realGrandTotals[p]==undefined)
                  realGrandTotals={...realGrandTotals,[p]:{}}
                
                if(realGrandTotals[p][p]==undefined)
                  realGrandTotals[p][p]={}
                
                
                if(realGrandTotals[mainKey][p]?.[`${nf["normal"][j1]}total`]==undefined)
                  realGrandTotals[mainKey][p][`${nf["normal"][j1]}total`]=0
                if(realGrandTotals[p][p]?.[`${nf["normal"][j1]}total`]==undefined)
                  realGrandTotals[p][p][`${nf["normal"][j1]}total`]=0
                
                realGrandTotals[mainKey][p]={...realGrandTotals[mainKey][p],[`${nf["normal"][j1]}total`]:realGrandTotals[mainKey][p][`${nf["normal"][j1]}total`]+st}
                realGrandTotals[p][p]={...realGrandTotals[p][p],[`${nf["normal"][j1]}total`]:realGrandTotals[p][p][`${nf["normal"][j1]}total`]+st}*/
              
              }else{
                let st=0
                console.log("prob",a1[p][keyTransform][`${nf["normal"][j1]}total`],nf["normal"][j1])
                
                /*if(a1[p][keyTransform][`${nf["normal"][j1]}total`]!=null && a1[p][keyTransform][`${nf["normal"][j1]}total`]!=undefined){
                  if(p.startsWith("otm"))
                    st=a1[p][keyTransform][`${nf["normal"][j1]}total`]
                  else{
                    if(a1[p][keyTransform][`${nf["normal"][j1]}total`]==undefined)
                      st=a1[p][keyTransform][`${nf["normal"][j1]}`]
                    else
                      st=a1[p][keyTransform][`${nf["normal"][j1]}total`]
                  }
                }*/
                st=a1[p][keyTransform][`${nf["normal"][j1]}total`]
                a2[p][o][`${nf["normal"][j1]}total`]+=st
                if(a2[p][o][`${nf["normal"][j1]}Acummulated`]==undefined || a2[p][o][`${nf["normal"][j1]}Acummulated`]==null)
                  a2[p][o][`${nf["normal"][j1]}Acummulated`]=[]
                if(a1[p][keyTransform][`${nf["normal"][j1]}Acummulated`]==undefined || a1[p][keyTransform][`${nf["normal"][j1]}Acummulated`]==null)
                  a1[p][keyTransform][`${nf["normal"][j1]}Acummulated`]=[]
                /*if(realGrandTotals[mainKey][p]==undefined)
                  realGrandTotals[mainKey][p]={}
               
                if(realGrandTotals[mainKey][p]?.[`${nf["normal"][j1]}total`]==undefined)
                  realGrandTotals[mainKey][p][`${nf["normal"][j1]}total`]=0
                realGrandTotals[mainKey][p]={...realGrandTotals[mainKey][p],[`${nf["normal"][j1]}total`]:realGrandTotals[mainKey][p][`${nf["normal"][j1]}total`]+st}*/
                
                a2[p][o][`${nf["normal"][j1]}Acummulated`]=[
                  ...a2[p][o][`${nf["normal"][j1]}Acummulated`],
                  ...a1[p][x[m1]][`${nf["normal"][j1]}Acummulated`]
                
                ]
                if(a2[p][o][`${nf["normal"][j1]}AcummulatedSonBy${cat}`]==undefined || a2[p][o][`${nf["normal"][j1]}AcummulatedSonBy${cat}`]==null)
                  a2[p][o][`${nf["normal"][j1]}AcummulatedSonBy${cat}`]=[]
                if(a1[p][x[m1]][`${nf["normal"][j1]}Acummulated`]==undefined || a1[p][x[m1]][`${nf["normal"][j1]}Acummulated`]==null)
                  a1[p][x[m1]][`${nf["normal"][j1]}Acummulated`]=[]
                
                a2[p][o][`${nf["normal"][j1]}AcummulatedSonBy${cat}`].push(st)


              }

            }
            }
            console.log("nfcomp",nf.compositeFields)
            if(nf.compositeFields.length>0){ 
            for(let j1=0;j1<nf.compositeFields.length;j1++){
              
              console.log("m1",a2,o,a2[p],a2[p][o],a1,p,x[m1],nf["compositeFields"][j1],`${nf["compositeFields"][j1]}total`,isLast(p),a1[p],a1[p][x[m1]],a1[p][x[m1]][nf["compositeFields"]],a1[p][x[m1]][nf["compositeFields"][j1]],a1[p][x[m1]][`${nf["compositeFields"][j1]}total`],a2[p][o][`${nf["compositeFields"][j1]}total`])
              console.log("catprim",cat,p)
              if((isLast(cat) || cat==p)){
              
                let st=0
                console.log("prob",a1[p][keyTransform][nf["compositeFields"][j1]],nf["compositeFields"][j1])
                /*if((a1[p][x[m1]][nf["compositeFields"][j1]]!=null && a1[p][keyTransform][nf["compositeFields"][j1]]!=undefined) ||
                (a1[p][x[m1]][`${nf["compositeFields"][j1]}total`]!=null && a1[p][keyTransform][`${nf["compositeFields"][j1]}total`]!=undefined)){
                  if(p.startsWith("otm"))
                    st=a1[p][keyTransform][`${nf["compositeFields"][j1]}total`]
                  else{
                    
                    if(a1[p][keyTransform][`${nf["compositeFields"][j1]}total`]==undefined)
                      st=a1[p][keyTransform][`${nf["compositeFields"][j1]}`]
                    else
                      st=a1[p][keyTransform][`${nf["compositeFields"][j1]}total`]
                  }
                  
                  console.log("st77",st)
                }*/
                st=a1[p][keyTransform][`${nf["compositeFields"][j1]}`]

                  
                  
                a2[p][o][`${nf["compositeFields"][j1]}total`]+=st
                console.log("paramsioio",p,o,keyTransform,a2[p][o][`${nf["compositeFields"][j1]}total`])
                console.log("suma",a2[p][o][`${nf["compositeFields"][j1]}total`])
                if(a2[p][o][`${nf["compositeFields"][j1]}Acummulated`]==undefined || a2[p][o][`${nf["compositeFields"][j1]}Acummulated`]==null)
                  a2[p][o][`${nf["compositeFields"][j1]}Acummulated`]=[]
                a2[p][o][`${nf["compositeFields"][j1]}Acummulated`].push(st)
                /*if(realGrandTotals[mainKey][p]==undefined)
                  realGrandTotals[mainKey][p]={}
                if(realGrandTotals[p]==undefined)
                  realGrandTotals={...realGrandTotals,[p]:{}}
                if(realGrandTotals[p][p]==undefined)
                  realGrandTotals[p][p]={}
            
                if(realGrandTotals[mainKey][p]?.[`${nf["compositeFields"][j1]}total`]==undefined)
                  realGrandTotals[mainKey][p][`${nf["compositeFields"][j1]}total`]=0
                if(realGrandTotals[p][p]?.[`${nf["compositeFields"][j1]}total`]==undefined)
                  realGrandTotals[p][p][`${nf["compositeFields"][j1]}total`]=0
                
                realGrandTotals[mainKey][p]={...realGrandTotals[mainKey][p],[`${nf["compositeFields"][j1]}total`]:realGrandTotals[mainKey][p][`${nf["compositeFields"][j1]}total`]+st}
                realGrandTotals[p][p]={...realGrandTotals[p][p],[`${nf["compositeFields"][j1]}total`]:realGrandTotals[p][p][`${nf["compositeFields"][j1]}total`]+st}*/

              }else{
                console.log("jorgejorgetoro")
                let st=0
                console.log("prob",a1[p][keyTransform][`${nf["compositeFields"][j1]}total`],nf["compositeFields"][j1])
                
                /*if((a1[p][keyTransform][`${nf["compositeFields"][j1]}total`]!=null && a1[p][keyTransform][`${nf["compositeFields"][j1]}total`]!=undefined) ||
                (a1[p][keyTransform][`${nf["compositeFields"][j1]}`]!=null && a1[p][keyTransform][`${nf["compositeFields"][j1]}`]!=undefined)){
                  if(p.startsWith("otm"))
                    st=a1[p][keyTransform][`${nf["compositeFields"][j1]}total`]
                  else{
                    if(a1[p][keyTransform][`${nf["compositeFields"][j1]}total`]==undefined)
                      st=a1[p][keyTransform][`${nf["compositeFields"][j1]}`]
                    else
                      st=a1[p][keyTransform][`${nf["compositeFields"][j1]}total`]
                  }
                  console.log("st77",st)
                }*/
                console.log("paramsioio",p,o,x[keyTransform],a2[p][o][`${nf["compositeFields"][j1]}total`])

                st=a1[p][keyTransform][`${nf["compositeFields"][j1]}total`]
                console.log("entroaqui88",a1)
                a2[p][o][`${nf["compositeFields"][j1]}total`]+=st
                console.log("suma",a2[p][o][`${nf["compositeFields"][j1]}total`])
                /*if(realGrandTotals[mainKey][p]==undefined)
                realGrandTotals[mainKey][p]={}
             
                if(realGrandTotals[mainKey][p]?.[`${nf["compositeFields"][j1]}total`]==undefined)
                  realGrandTotals[mainKey][p][`${nf["compositeFields"][j1]}total`]=0
                
                realGrandTotals[mainKey][p]={...realGrandTotals[mainKey][p],[`${nf["compositeFields"][j1]}total`]:realGrandTotals[mainKey][p][`${nf["compositeFields"][j1]}total`]+st}*/
                if(a1[p][keyTransform][`${nf["compositeFields"][j1]}Acummulated`]==undefined || a1[p][x[m1]][`${nf["compositeFields"][j1]}Acummulated`]==null)
                  a1[p][keyTransform][`${nf["compositeFields"][j1]}Acummulated`]=[]

                if(a2[p][o][`${nf["compositeFields"][j1]}Acummulated`]==undefined || a2[p][o][`${nf["compositeFields"][j1]}Acummulated`]==null)
                  a2[p][o][`${nf["compositeFields"][j1]}Acummulated`]=[]
                
                a2[p][o][`${nf["compositeFields"][j1]}Acummulated`]=[
                  ...a2[p][o][`${nf["compositeFields"][j1]}Acummulated`],
                  ...a1[p][x[m1]][`${nf["compositeFields"][j1]}Acummulated`]
                ]

                if(a2[p][o][`${nf["compositeFields"][j1]}AcummulatedSonBy${cat}`]==undefined || a2[p][o][`${nf["normal"][j1]}AcummulatedSonBy${cat}`]==null)
                  a2[p][o][`${nf["compositeFields"][j1]}AcummulatedSonBy${cat}`]=[]
                if(a1[p][x[m1]][`${nf["compositeFields"][j1]}Acummulated`]==undefined || a1[p][x[m1]][`${nf["normal"][j1]}Acummulated`]==null)
                  a1[p][x[m1]][`${nf["compositeFields"][j1]}Acummulated`]=[]
                
                a2[p][o][`${nf["compositeFields"][j1]}AcummulatedSonBy${cat}`].push(st)


              }
            }
            }
            if(isLast(cat) || p==cat){
              a2[p][o][`${p}TotalCount`]++
            }else
              a2[p][o][`${p}TotalCount`]+=a1[p][x[m1]][`${p}TotalCount`]
          }
          /*else{
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
    //doneMain=[...doneMain,o]

  
  })
  let nf=getNumericFields(cat)
  
  
      
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
let realGrandTotals1={}
const getCategoriesGrandTotals=(category)=>{

  if(realGrandTotals1[category]==undefined)
    realGrandTotals1[category]={}

  Object.keys(finalObject[category]).forEach(y=>{
    let nf=getNumericFields(y)

  

    if(realGrandTotals1[category]?.[y]==undefined)
      realGrandTotals1[category][y]={}

                  
    Object.keys(finalObject[category][y]).forEach(u=>{
      for(let j1=0;j1<nf.normal.length;j1++){
        if(realGrandTotals1[category][y]?.[`${nf["normal"][j1]}total`]==undefined)
          realGrandTotals1[category][y][`${nf["normal"][j1]}total`]=0
        let st=0
        if(category==y)
          st=finalObject[category][y][u][nf.normal[j1]]
        else
          st=finalObject[category][y][u][`${nf.normal[j1]}total`]

        realGrandTotals1[category][y]={...realGrandTotals1[category][y],[`${nf["normal"][j1]}total`]:realGrandTotals1[category][y][`${nf["normal"][j1]}total`]+st}
      }
      for(let j1=0;j1<nf.compositeFields.length;j1++){
        if(realGrandTotals1[category][y]?.[`${nf["compositeFields"][j1]}total`]==undefined)
          realGrandTotals1[category][y][`${nf["compositeFields"][j1]}total`]=0
        let st=0
        if(category==y)
          st=finalObject[category][y][u][nf.compositeFields[j1]]            
        else
          st=finalObject[category][y][u][`${nf.compositeFields[j1]}total`]
        realGrandTotals1[category][y]={...realGrandTotals1[category][y],[`${nf["compositeFields"][j1]}total`]:realGrandTotals1[category][y][`${nf["compositeFields"][j1]}total`]+st}
      }

    })
    Object.keys(finalObject[category][y]).forEach(u=>{
      if(realGrandTotals1[category][y]?.[`${y}TotalCount`]==undefined)
        realGrandTotals1[category][y][`${y}TotalCount`]=0
      if(realGrandTotals1[category][y]?.[`${y}TotalCountArray`]==undefined)
        realGrandTotals1[category][y][`${y}TotalCountArray`]=[]
      
      realGrandTotals1[category][y][`${y}TotalCount`]=realGrandTotals1[category][y][`${y}TotalCount`]+finalObject[category][y][u][`${y}TotalCount`]
      realGrandTotals1[category][y][`${y}TotalCountArray`].push(finalObject[category][y][u][`${y}TotalCount`])


    })
    realGrandTotals1?.[category]?.[y]?.[`${y}TotalCountArray`]?.sort((a,b)=>a-b)

  })
}

const initializeFinalObjectVariables=(key,cat,next,first)=>{

  if(finalObject[key]==undefined)
    finalObject={...finalObject,[key]:{}}
  if(finalObject[key][cat]==undefined)
    finalObject={...finalObject,[key]:{...finalObject[key],[cat]:{}}}
  if(finalObject[key][key]==undefined)
    finalObject[key][key]={}
  
  
    let others=Object.keys(finalObject?.[cat]).forEach(l=>{
      console.log("comprob",totalRoutes,l,totalRoutes[cat][l],totalRoutes[key][`${cat}total`])
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
    console.log("keynotterminal",cat,next,data1,key,next,first)
    updateNumericFieldsRoot(key,cat,data1,next,first)
    updateNumericFields(key,cat,nf,data1,terminal,first)

  }

}

const updateTerminalFinalObject=(data,cat)=>{
  let res={}
  console.log("alert1",data)
  if(finalObject[cat]==undefined)
    finalObject={...finalObject,[cat]:{[cat]:{}}}
  Object.keys(data).forEach(u=>{
    console.log("alert22",verifyMeetWithConditionsBySegmentBaseLeve1(cat,data[u].normalData))
    if(verifyMeetWithConditionsBySegmentBaseLeve1(cat,data[u].normalData)){
      res={[cat]:{...res[cat],[data[u].normalData.id]:{...data[u].normalData}}}
      console.log("res444",res)
    }
  })
  finalObject={...finalObject,[cat]:res}
  console.log("fobjnew",finalObject)
  

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

const calculateMedia=(data,field,arrayName,variableName)=>{
  let cero=0
  Object.keys(data).forEach(y=>{
    if(data[y]?.[variableName]==undefined)
      data[y][variableName]=cero
    }
  )
  Object.keys(data).forEach(y=>{
    let values=data[y]?.[arrayName]
    console.log("arraynamemedia",arrayName,values)
    let media=0
    if(values!=undefined && values?.length>0){
      values.forEach(x=>media+=x)
      media=media/values.length
      //if(data[y][variableName]==undefined)
        data[y][variableName]=media
    }else
      data[y][variableName]=0
    
  })
 
}
const problem=(data,field,arrayName,variableName)=>{
  let sortedValues
  let median
  let cero=0
  Object.keys(data).forEach(y=>{
    if(data[y]?.[variableName]==undefined)
      data[y][variableName]=cero.toFixed(2)
    }
  )
  Object.keys(data).forEach(y=>{
    sortedValues=data[y]?.[arrayName]
    console.log("arraynamemedia",arrayName,sortedValues)

    median=0
    if(sortedValues!=undefined && sortedValues?.length>0){
      sortedValues.sort((a,b)=>a-b)
      console.log("sortedValues",sortedValues)
      let length=sortedValues.length
      if(length%2==1){
        median=sortedValues[Math.floor(length/2)]
      }else{
        median=(sortedValues[(length/2)-1]+sortedValues[(length/2)])/2
      }
      //if(data[y][variableName]==undefined)
        data[y][variableName]=median
        data[y][`${arrayName}minimum`]=sortedValues[0]
        data[y][`${arrayName}maximum`]=sortedValues[sortedValues.length-1]
    }else{
        data[y][variableName]=0
        data[y][`${arrayName}minimum`]=0
        data[y][`${arrayName}maximum`]=0
    }
    
  })
  
  
}

const findInOrderObject=(cat,order)=>{
  for(let i=0;i<order.length;i++){
    let key=Object.keys(order[i])[0]
    if(key==cat)
      return i
    
  }
  return -1
}

const getStatisticsRecursive=(data,cat,order,pp)=>{
  console.log("recursive",pp)
  let catInInf
  let k=findInOrderObject(cat,order)
        console.log("kk",k)
        if(k!==-1){
          
          for(let index=0;index<order[k]?.[cat].length;index++){
            let u=order[k]?.[cat]?.[index]
          
         
          
            if(index%2==0){
              //catInInf=u
              //let i=findInOrderObject(catInInf,order)
              //if(i!==-1){
                //console.log("kki",i,cat,catInInf)
                //order[i]?.[catInInf].forEach((g,ind)=>{
                  //if(ind%2==0){
                    //if(g!==`getData${currentCategory.name}`){
                      //console.log("ggg",g,otmChoices[g])
                      otmChoices[u].normal.forEach(x=>{
                        console.log("tttt",data[u],x.name1,`${x.name1}AcummulatedSonBy${pp}`,`${x.name1}By${pp}Media`,`${x.name1}AcummulatedSonBy${pp}`,`${x.name1}By${pp}Median`)
        
                        if(x.type=="number"){
                          console.log("tttt",data[u],x.name1,`${x.name1}AcummulatedSonBy${pp}`,`${x.name1}By${pp}Media`,`${x.name1}AcummulatedSonBy${pp}`,`${x.name1}By${pp}Median`)
                          calculateMedia(data[u],x.name1,`${x.name1}AcummulatedSonBy${pp}`,`${x.name1}By${pp}Media`)
                          problem(data[u],x.name1,`${x.name1}AcummulatedSonBy${pp}`,`${x.name1}By${pp}Median`)
                        }
                      })
                      otmChoices[u].compositeFields.forEach(x=>{
                        console.log("tttt",data[u],x.name1,`${x.name1}AcummulatedSonBy${pp}`,`${x.name1}By${pp}Media`,`${x.name1}AcummulatedSonBy${pp}`,`${x.name1}By${pp}Median`)
        
                        if(x.type=="number"){
                          console.log("tttt",data[u],x.name1,`${x.name1}AcummulatedSonBy${pp}`,`${x.name1}By${pp}Media`,`${x.name1}AcummulatedSonBy${pp}`,`${x.name1}By${pp}Median`)
                          calculateMedia(data[u],x.name1,`${x.name1}AcummulatedSonBy${pp}`,`${x.name1}By${pp}Media`)
                          problem(data[u],x.name1,`${x.name1}AcummulatedSonBy${pp}`,`${x.name1}By${pp}Median`)
                        }
                      })
                      //esto estaba sin commentgetStatisticsRecursive(data,u,order,pp)
                    //}

                  //} 
                //})
              }

            

          }
        }
}

const getStatistics=(data,cat,order)=>{
  let arr
  Object.keys(data).forEach(y=>{
    if(y!==cat){
      if(y!==`getData${currentCategory.name}`){
      if(y.startsWith("otm")){
        arr=otmChoices[y]
      }else if(y.startsWith("mtm"))
        arr=mtmChoices[y]
        arr.normal.forEach(x=>{
          if(x.type=="number"){
            console.log("tttt",data[y],x.name1)
            calculateMedia(data[y],x.name1,`${x.name1}Acummulated`,`${x.name1}Media`)
            problem(data[y],x.name1,`${x.name1}Acummulated`,`${x.name1}Median`)
          }
        })
        arr.compositeFields.forEach(x=>{
          if(x.type=="number"){
            console.log("tttt",data[y],x.name1)
            calculateMedia(data[y],x.name1,`${x.name1}Acummulated`,`${x.name1}Media`)
            problem(data[y],x.name1,`${x.name1}Acummulated`,`${x.name1}Median`)
          }
        })
      }
    }
  })
        let k=findInOrderObject(cat,order)
        console.log("kk",k,order)
        if(k!==-1){
          
          /*
          aqui order es
          [
            {otmfacturasdetallesfacturas:[otmdetallesfacturadetprod]},
            {otmclientesfacturas:[otmfacturasdetallesfacturas]},
            {getdataclientes:[otmclientesfacturas,otmclientestelefonos]}
          ]
          */
          let catInInf
          for(let ind=0;ind<order[k]?.[cat].length;ind++){
            let u=order[k]?.[cat]?.[ind]
          
          
          
            if(ind%2==0){
              let i=findInOrderObject(u,order)
              if(i!==-1){
                console.log("kki",i,cat,u)
                catInInf=u
                order[i]?.[catInInf].forEach((g,index)=>{
                  if(index%2==0){
                    if(g!==`getData${currentCategory.name}`){
                      if(g.startsWith("otm")){
                        arr=otmChoices[g]
                      }else if(g.startsWith("mtm"))
                        arr=mtmChoices[g]
                      
                      console.log("ggg",g)
                      arr.normal.forEach(x=>{
                        console.log("tttt",catInInf,data[g],x.name1,`${x.name1}AcummulatedSonBy${catInInf}`,`${x.name1}By${catInInf}Media`,`${x.name1}AcummulatedSonBy${catInInf}`,`${x.name1}By${catInInf}Median`)
        
                        if(x.type=="number"){
                          console.log("tttt",catInInf,data[g],x.name1,`${x.name1}AcummulatedSonBy${catInInf}`,`${x.name1}By${catInInf}Media`,`${x.name1}AcummulatedSonBy${catInInf}`,`${x.name1}By${catInInf}Median`)
                          calculateMedia(data[g],x.name1,`${x.name1}AcummulatedSonBy${catInInf}`,`${x.name1}By${catInInf}Media`)
                          problem(data[g],x.name1,`${x.name1}AcummulatedSonBy${catInInf}`,`${x.name1}By${catInInf}Median`)
                        }
                      })
                      arr.compositeFields.forEach(x=>{
                        console.log("tttt",catInInf,data[g],x.name1,`${x.name1}AcummulatedSonBy${catInInf}`,`${x.name1}By${catInInf}Media`,`${x.name1}AcummulatedSonBy${catInInf}`,`${x.name1}By${catInInf}Median`)
        
                        if(x.type=="number"){
                          console.log("tttt",catInInf,data[g],x.name1,`${x.name1}AcummulatedSonBy${catInInf}`,`${x.name1}By${catInInf}Media`,`${x.name1}AcummulatedSonBy${catInInf}`,`${x.name1}By${catInInf}Median`)
                          calculateMedia(data[g],x.name1,`${x.name1}AcummulatedSonBy${catInInf}`,`${x.name1}By${catInInf}Media`)
                          problem(data[g],x.name1,`${x.name1}AcummulatedSonBy${catInInf}`,`${x.name1}By${catInInf}Median`)
                        }
                      })
                      // estaba sin comment getStatisticsRecursive(data,g,order,catInInf)
                    }

                  } 
                })
              }

            }

          }
        }
      
  

}


const calculateMediaAndMediansOfRecords=(category)=>{
  Object.keys(realGrandTotals1[category]).forEach(y=>{
    Object.keys(finalObject[category][y]).forEach(u=>{
      if(category==`getData${currentCategory.name}`){
        if(y==`getData${currentCategory.name}`){
          
          firstCatNormalFields[y].normal.forEach(i=>{
            let total=0
            let sortedValues
            let median=0
            if(i.type=="number"){
              total=0
              sortedValues=realGrandTotals1[category][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues.forEach(i=>total=total+i)
              realGrandTotals1[category][y][`${i.name1}Media`]=(total/sortedValues.length)
              

              if(sortedValues.length%2==1){
                median=(sortedValues[Math.floor(sortedValues.length/2)])
              }else{
                median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
              }
              realGrandTotals1[category][y][`${i.name1}Median`]=median

            }    
          })
          firstCatNormalFields[y].compositeFields.forEach(i=>{
            let total=0
            let sortedValues
            let median=0
            
            if(i.type=="number"){
              total=0
              sortedValues=realGrandTotals1[category][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues.forEach(i=>total=total+i)
              realGrandTotals1[category][y][`${i.name1}Media`]=(total/sortedValues.length)
              

              if(sortedValues.length%2==1){
                median=(sortedValues[Math.floor(sortedValues.length/2)])
              }else{
                median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
              }
              realGrandTotals1[category][y][`${i.name1}Median`]=median

            }
          })
            
        }else{
          let total=0
          
          let median=0
          let arr
       
          if(y.startsWith("otm")){
            arr=otmChoices[y]
          }else if(y.startsWith("mtm"))
            arr=mtmChoices[y]
        
          arr.normal.forEach(i=>{
            if(i.type=="number"){
              total=0
              let sortedValues=realGrandTotals1[category][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              }) 
              sortedValues.forEach(i=>total=total+i)
              realGrandTotals1[category][y][`${i.name1}Media`]=(total/sortedValues.length)
              

              if(sortedValues.length%2==1){
                median=(sortedValues[Math.floor(sortedValues.length/2)])
              }else{
                median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
              }
              realGrandTotals1[category][y][`${i.name1}Median`]=median

            }
          })
          arr.compositeFields.forEach(i=>{
            if(i.type=="number"){
            
              let total=0
              let sortedValues=realGrandTotals1[category][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              let median=0
              sortedValues.forEach(i=>total=total+i)
              realGrandTotals1[category][y][`${i.name1}Media`]=(total/sortedValues.length)
              

              if(sortedValues.length%2==1){
                median=(sortedValues[Math.floor(sortedValues.length/2)])
              }else{
                median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
              }
              realGrandTotals1[category][y][`${i.name1}Median`]=median

            }
            
          })
        }
      }else{
        if(category==y){
          let arr
        
          if(y.startsWith("otm")){
            arr=otmChoices[y]
          }else if(y.startsWith("mtm"))
            arr=mtmChoices[y]
        
          arr.normal.forEach(i=>{
            if(i.type=="number"){
              let total=0
              let median=0
              let sortedValues=realGrandTotals1[category][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues.forEach(i=>total=total+i)
              realGrandTotals1[category][y][`${i.name1}Media`]=(total/sortedValues.length)
              

              if(sortedValues.length%2==1){
                median=(sortedValues[Math.floor(sortedValues.length/2)])
              }else{
                median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
              }
              realGrandTotals1[category][y][`${i.name1}Median`]=median

            }
          })
          arr.compositeFields.forEach(i=>{
            if(i.type=="number"){
              let total=0
              let sortedValues=realGrandTotals1[category][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              let median=0
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues.forEach(i=>total=total+i)
              realGrandTotals1[category][y][`${i.name1}Media`]=(total/sortedValues.length)
              

              if(sortedValues.length%2==1){
                median=(sortedValues[Math.floor(sortedValues.length/2)])
              }else{
                median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
              }
              realGrandTotals1[category][y][`${i.name1}Median`]=median

            }
          })
        }else{
          let arr
        
          if(y.startsWith("otm")){
            arr=otmChoices[y]
          }else if(y.startsWith("mtm"))
            arr=mtmChoices[y]
        
          arr.normal.forEach(i=>{
            if(i.type=="number"){
              let total=0
              let median=0
              let sortedValues=realGrandTotals1[category][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues.forEach(i=>total=total+i)
              realGrandTotals1[category][y][`${i.name1}Media`]=(total/sortedValues.length)
              

              if(sortedValues.length%2==1){
                median=(sortedValues[Math.floor(sortedValues.length/2)])
              }else{
                median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
              }
              realGrandTotals1[category][y][`${i.name1}Median`]=median

            }
          })
          arr.compositeFields.forEach(i=>{
            if(i.type=="number"){
              let total=0
              let median=0
              let sortedValues=realGrandTotals1[category][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues.forEach(i=>total=total+i)
              realGrandTotals1[category][y][`${i.name1}Media`]=(total/sortedValues.length)
              

              if(sortedValues.length%2==1){
                median=(sortedValues[Math.floor(sortedValues.length/2)])
              }else{
                median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
              }
              realGrandTotals1[category][y][`${i.name1}Median`]=median

            }
          })
        }
      }
    })
  })
}
let tableTotalRecords={}
const calculatePercentageOverGrandTotal=(category)=>{
  if(tableTotalRecords[category]==undefined)
    tableTotalRecords[category]=0
  Object.keys(realGrandTotals1[category]).forEach((y,p)=>{
    if(p==0)
      tableTotalRecords[category]=Object.keys(finalObject[category][y]).length
    Object.keys(finalObject[category][y]).forEach(u=>{
      if(category==`getData${currentCategory.name}`){
        if(y==`getData${currentCategory.name}`){
          
          firstCatNormalFields[y].normal.forEach(i=>{
            if(i.type=="number"){
              finalObject[category][y][u][`%${i.name1}`]=(finalObject?.[category]?.[y]?.[u]?.[i.name1]!=undefined && realGrandTotals1[category][y][`${i.name1}total`]>0)?(finalObject[category][y][u][i.name1]/realGrandTotals1[category][y][`${i.name1}total`])*100:0
              if(realGrandTotals1[category][y][`${i.name1}AccumulatedArray`]==undefined)
                realGrandTotals1[category][y][`${i.name1}AccumulatedArray`]=[]
              realGrandTotals1[category][y][`${i.name1}AccumulatedArray`].push(finalObject[category][y][u][i.name1])
            }    
          })
          firstCatNormalFields[y].compositeFields.forEach(i=>{
            if(i.type=="number"){
              finalObject[category][y][u][`%${i.name1}`]=(finalObject?.[category]?.[y]?.[u]?.[i.name1]!=undefined && realGrandTotals1[category][y][`${i.name1}total`]>0)?(finalObject[category][y][u][i.name1]/realGrandTotals1[category][y][`${i.name1}total`])*100:0
              if(realGrandTotals1[category][y][`${i.name1}AccumulatedArray`]==undefined)
                realGrandTotals1[category][y][`${i.name1}AccumulatedArray`]=[]
              realGrandTotals1[category][y][`${i.name1}AccumulatedArray`].push(finalObject[category][y][u][i.name1])
            }
          })
        }else{
          let arr
          if(y.startsWith("otm"))
            arr=otmChoices[y]
          else if(y.startsWith("mtm"))
            arr=mtmChoices[y]
          arr.normal.forEach(i=>{
            if(i.type=="number"){
              finalObject[category][y][u][`%${i.name1}`]=(finalObject?.[category]?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][y][`${i.name1}total`]>0)?(finalObject[category][y][u][`${i.name1}total`]/realGrandTotals1[category][y][`${i.name1}total`])*100:0
              //((finalObject[category][y][u][`${i.name1}total`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
              if(realGrandTotals1[category][y][`${i.name1}AccumulatedArray`]==undefined)
                realGrandTotals1[category][y][`${i.name1}AccumulatedArray`]=[]
              realGrandTotals1[category][y][`${i.name1}AccumulatedArray`].push(finalObject[category][y][u][`${i.name1}total`])
            }
          })
          arr.compositeFields.forEach(i=>{
            if(i.type=="number"){
              finalObject[category][y][u][`%${i.name1}`]=(finalObject?.[category]?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][y][`${i.name1}total`]>0)?(finalObject[category][y][u][`${i.name1}total`]/realGrandTotals1[category][y][`${i.name1}total`])*100:0
              //((finalObject[category][y][u][`${i.name1}total`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
              if(realGrandTotals1[category][y][`${i.name1}AccumulatedArray`]==undefined)
                realGrandTotals1[category][y][`${i.name1}AccumulatedArray`]=[]
              realGrandTotals1[category][y][`${i.name1}AccumulatedArray`].push(finalObject[category][y][u][`${i.name1}total`])
            }
          })
        }
      }else{
        let arr
        if(category==y){
          if(y.startsWith("otm")){
            arr=otmChoices[y]
          }else if(y.startsWith("mtm"))
            arr=mtmChoices[y]
          
          arr.normal.forEach(i=>{
            if(i.type=="number"){
              finalObject[category][y][u][`%${i.name1}`]=(finalObject?.[category]?.[y]?.[u]?.[i.name1]!=undefined && realGrandTotals1[category][y][`${i.name1}total`]>0)?(finalObject[category][y][u][i.name1]/realGrandTotals1[category][y][`${i.name1}total`])*100:0
              //((finalObject[category][y][u][`${i.name1}`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
              if(realGrandTotals1[category][y][`${i.name1}AccumulatedArray`]==undefined)
                realGrandTotals1[category][y][`${i.name1}AccumulatedArray`]=[]
              realGrandTotals1[category][y][`${i.name1}AccumulatedArray`].push(finalObject[category][y][u][i.name1])
            }
          })
          arr.compositeFields.forEach(i=>{
            if(i.type=="number"){
              finalObject[category][y][u][`%${i.name1}`]=(finalObject?.[category]?.[y]?.[u]?.[i.name1]!=undefined && realGrandTotals1[category][y][`${i.name1}total`]>0)?(finalObject[category][y][u][i.name1]/realGrandTotals1[category][y][`${i.name1}total`])*100:0
              //((finalObject[category][y][u][`${i.name1}`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
              if(realGrandTotals1[category][y][`${i.name1}AccumulatedArray`]==undefined)
              realGrandTotals1[category][y][`${i.name1}AccumulatedArray`]=[]
            realGrandTotals1[category][y][`${i.name1}AccumulatedArray`].push(finalObject[category][y][u][i.name1])
            }
          })
        }else{
          let arr
        
          if(y.startsWith("otm")){
            arr=otmChoices[y]
          }else if(y.startsWith("mtm"))
            arr=mtmChoices[y]
        
          arr.normal.forEach(i=>{
            if(i.type=="number"){
              finalObject[category][y][u][`%${i.name1}`]=(finalObject?.[category]?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][y][`${i.name1}total`]>0)?(finalObject[category][y][u][`${i.name1}total`]/realGrandTotals1[category][y][`${i.name1}total`])*100:0
              //((finalObject[category][y][u][`${i.name1}total`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
              if(realGrandTotals1[category][y][`${i.name1}AccumulatedArray`]==undefined)
                realGrandTotals1[category][y][`${i.name1}AccumulatedArray`]=[]
              realGrandTotals1[category][y][`${i.name1}AccumulatedArray`].push(finalObject[category][y][u][`${i.name1}total`])
            }
          })
          arr.compositeFields.forEach(i=>{
            if(i.type=="number"){
              finalObject[category][y][u][`%${i.name1}`]=(finalObject?.[category]?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][y][`${i.name1}total`]>0)?(finalObject[category][y][u][`${i.name1}total`]/realGrandTotals1[category][y][`${i.name1}total`])*100:0
              //((finalObject[category][y][u][`${i.name1}total`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
              if(realGrandTotals1[category][y][`${i.name1}AccumulatedArray`]==undefined)
                realGrandTotals1[category][y][`${i.name1}AccumulatedArray`]=[]
              realGrandTotals1[category][y][`${i.name1}AccumulatedArray`].push(finalObject[category][y][u][`${i.name1}total`])
            }
          })
        }
        

      }
    })

  })
  
}

const getInverseTraverseSonTotalsWithConditionsWhereRoutes1=(routes,routeIndex,order)=>{
  let trueKey
  let cats
  console.log("orderfinal",order)
  if(order.length==0){
    let data=totalRoutes[`getData${currentCategory.name}`]["undefinedtotal"]
    updateTerminalFinalObject(data,`getData${currentCategory.name}`)
  }else{
  for(let i=0;i<order.length;i++){
    trueKey=Object.keys(order[i])[0]
    
    cats=order[i][trueKey]
    getSegmentsData(trueKey,cats,i)
  }
  console.log("parcial2222",finalObject)

  /*aqui tengo que encontrar la forma de descubrir si tiene bloques secundarios
  que no sea categorias finalesç
  como le hago, bueno tengo order que es
    otmclientesfacturas:otmdetallesfacturas
    getdataclientes:otmclientesfacturas,otmclientestelefonos
    cuando llegue a get datacleintes leo su arreglo que son dos hijos inmediatos
    ,pero otmclientesfacturas tiene un hijo inmediatio que son otmdetallesfacturas,
    donde se tienen que sacar los acumulados de un hijo no final (otmclientesfacturas)
    para getdataclientes
    cual debe ser el proceso, bueno me voy a las llaves de order
    que son otmclientesfacturas y getdataclientes
    el siguiente paso es analizar si otmclientesfacturas tiene un hijo no final,si es asi
    consigo la variable bybloque y hago las estadisticas
    en este caso otmclientesfacturas tiene solo un hijo final por lo que no se 
    sacan estadisticas
    pero en el caso de getdataclientes tiene dos hijos que son otmclientesfacturas
    y otmclientestelefonos
    me voy a otmclientesfacturas que es un hijo no final, por lo que saco sus estadisticas
    por bloque
    vamos a implantarlo
  */
 realGrandTotals={}
 realGrandTotals1={}
 console.log("orderver",order)
  for(let i=0;i<order.length;i++){
    trueKey=Object.keys(order[i])[0]
    cats=order[i][trueKey]
    //getRootCategoriesGrandTotals(trueKey)
    let cat
    for(let j=0;j<cats.length;j+=2){
      cat=cats[j]   
      console.log("prob111",cat,trueKey,finalObject[cat],finalObject[trueKey])
      //if(isLast(cat))
        getTotalsOfNumericVariables(finalObject[cat],finalObject[trueKey],cat,trueKey)
        //if(isLast(cat))
          //getRootCategoriesGrandTotals(cat)
        
  
    }
    getStatistics(finalObject[trueKey],trueKey,order)
    
    verifyMeetWithConditionsBySegmentBaseLevel2(trueKey,finalObject[trueKey])

  }

  for(let i=order.length-1;i>=0;i--){
    trueKey=Object.keys(order[i])[0]
    cats=order[i][trueKey]
    for(let j=0;j<cats.length;j+=2){
      Object.keys(finalObject[trueKey][cats[j]]).forEach(p=>{
        let keysEach=finalObject[trueKey][cats[j]][p].keys//finalObject[trueKey][cats[j]][p].keys
        console.log("truekey catsj p keys",trueKey,cats[j],p,finalObject[trueKey][cats[j]])
        for(let oo=0;oo<keysEach.length;oo++){
          //console.log("secondtruekey",finalObject[cats[j]][cats[j]][keysEach[oo]],finalObject[cats[j]][cats[j]],keysEach[oo])
          console.log("enttroyy")
          if(finalObject?.[cats[j]]?.[cats[j]]?.[keysEach[oo]]!=undefined){
            //console.log("entroyy",keysEach[oo],finalObject[cats[j]][cats[j]][keysEach[oo]])
            finalObject[cats[j]][cats[j]][keysEach[oo]]={
              ...finalObject[cats[j]][cats[j]][keysEach[oo]],
              final:true
            }


          }
        }
      })
      if(finalObject?.[cats[j]]?.[cats[j]]!==undefined){
      Object.keys(finalObject[cats[j]][cats[j]]).forEach(y=>{
        if(finalObject[cats[j]][cats[j]][y]["final"]==undefined){
          Object.keys(finalObject[cats[j]]).forEach(x=>{
            delete finalObject[cats[j]][x][y]
          })
        }else{
          
        
          delete finalObject[cats[j]][cats[j]][y]["final"]
        }
      })
      }
    }
  }
      
      
      
    
  
  console.log("finalobjectfinalui",finalObject)
  /*for(let i=0;i<order.length;i++){
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
        }else{
          
        
          delete finalObject[cat][cat][y]["final"]
        }
      })
    }
 
  }*/
  
   

} 
tableTotalRecords={}
Object.keys(finalObject).forEach(y=>{
  getCategoriesGrandTotals(y)
  calculatePercentageOverGrandTotal(y)
  calculateMediaAndMediansOfRecords(y)
})
  console.log("fobj44",finalObject,realGrandTotals1)


    
  
  //console.log("fobjectkey",finalObject)


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

const buscaOrderJ=(tofind,order)=>{
  let key
  for(let j=0;j<order.length;j++){
    key=Object.keys(order[j])[0]

    if(key==tofind)
      return order[j][key]
  }
  return -1    


}

const getSubOrderTables=(tables,key,sontables,segments={},order)=>{
  if(segments[key]==undefined){
    segments[key]=[key]
  }
  //segments[key].push(key)
  for(let j=0;j<sontables.length;j+=2){
    tables.push(sontables[j])
    if(segments[key]==undefined)
      segments[key]=[]
    
    if(buscaOrderJ(sontables[j],order)!==-1){
      getSubOrderTables(tables,sontables[j],buscaOrderJ(sontables[j],order),segments,order)
      segments[key]=[...segments[key],...segments[sontables[j]]]
    }else{ 
      segments[key].push(sontables[j])
      segments[sontables[j]]=[sontables[j]]
    }
  }
}
const getOrderToPrintTables=(order)=>{
  let key
  let tables=[]
  let segments={}
  //for(let j=order.length-1;j>=0;j-=1){
    key=Object.keys(order[order.length-1])[0]
    tables.push(key)
    getSubOrderTables(tables,key,order[order.length-1][key],segments,order)
    console.log("ResultadoOrder",tables,segments)
    return [tables,segments]
  //}
}

const groupOrderBlock=(data,segment,field,cs,ft)=>{
  let group=[]
  let current
  let indexGroup=0
  data.forEach((r,index)=>{
    console.log("rrver",r,segment,field)
    if(index==0){
      if(ft=="number")
        current=r[segment][field]
      else if(ft=="string"){
        if(cs=="y"){
          current=r[segment][field]
        
        }else if(cs=="n"){
          if(r?.[segment]?.[field]!==null)
            current=`${r[segment][field]}`.toUpperCase()
        }
      }
    }
    if(ft=="number" || cs=="y"){
      if(r?.[segment]?.[field]==current){
        if(group?.[indexGroup]==undefined)
          group.push([])
        group[indexGroup].push(r)
      }else{
        indexGroup++
        current=r?.[segment]?.[field]
        if(group?.[indexGroup]==undefined)
          group.push([])
        group[indexGroup].push(r)
      }
    }else if(cs=="n"){
      let ui=r[segment][field]
      
      if((r?.[segment]?.[field])?.toUpperCase()==current){
        if(group?.[indexGroup]==undefined)
          group.push([])
        group[indexGroup].push(r)
      }else{
        indexGroup++
        if(r?.[segment]?.[field]!==null)
          current=`${r[segment][field]}`.toUpperCase()


        if(group?.[indexGroup]==undefined)
          group.push([])
        console.log("groupindex",group,indexGroup,current)
        group[indexGroup].push(r)
      }
    }
      
  })
  console.log("resordergroup",group)
  return group

}

const getTypeOfCriteria=(category,segment,field)=>{
  console.log("paramstype",category,segment,field)
  if(category==segment){
    if(category==`getData${currentCategory.name}`){
      let res=firstCatNormalFields[`getData${currentCategory.name}`].normal.filter(x=>x.name1==field)
      if(res.length>=1){
        console.log("typecriteria",res[0].type)
        return res[0].type
      }
      else{
        res=firstCatNormalFields[`getData${currentCategory.name}`].compositeFields.filter(x=>x.name1==field)
        if(res.length>=1){
          console.log("typecriteria",res[0].type)
          return res[0].type
        }
      }
    }else{
      let res=otmChoices[category].normal.filter(x=>x.name1==field)
      if(res.length>=1){
        console.log("typecriteria",res[0].type)
        return res[0].type
      }
      else{
        res=otmChoices[category].compositeFields.filter(x=>x.name1==field)
        if(res.length>=1){
          console.log("typecriteria",res[0].type)
          return res[0].type
        }
      }
    }

  }else{//different category and segment
    let originalField=field.substring(0,field.length-5)
    let res=otmChoices?.[segment]?.normal?.filter(x=>x.name1==originalField)
      if(res.lenght>=1){
        console.log("typecriteria",res[0].type)
        return res[0].type
      }
      else{
        res=otmChoices?.[segment]?.compositeFields.filter(x=>x.name1==originalField)
        if(res.length>=1){
          console.log("typecriteria",res[0].type)
          return res[0].type
        }
      }


  }
  return "number"
}
const getAAndBValues=(value1,value2,criteria)=>{
  console.log("valuesoriginal",value1,value2)
  if(criteria.fieldType=="number"){
    return [value1,value2]
    //console.log("valuesab",valueA,valueB)
  }else if(criteria.fieldType=="string"){
    if(criteria.caseSensitive=="y"){
      if(value1!=null)
        value1=value1
      else
        value1=""
      if(value2!=null)
        value2=value2
      else
        value2=""
    }else if(criteria.caseSensitive=="n"){
      if(value1!=null)
        value1=value1.toUpperCase()
      else
        value1=""
      if(value2!=null)
        value2=value2.toUpperCase()
      else
        value2=""

    }
    console.log("valuesab",value1,value2)
    return [value1,value2]
      
      
    //valueB=b[criteria.segment][criteria.field].toUpperCase
    
  }else if(criteria.fieldType=="date"){
    if(value1==null){
      value1=null
    }else{
      value1=new Date(parseInt(value1))
    }
    if(value2==null){
      value2=null
    }else{
      value2=new Date(parseInt(value2))
    }
    return [value1,value2]
  }
}

const orderBlock=(data,criteria,category)=>{
  let res
  //let type=getTypeOfCriteria(category,criteria.segment,criteria.field)
  
  if(criteria!==undefined){
    res=data.sort((a,b)=>{
      let valueA
      let valueB
      let values=getAAndBValues(a[criteria.segment][criteria.field],b[criteria.segment][criteria.field],criteria)
      valueA=values[0]
      valueB=values[1]
      
      if(criteria.typeOrder=="asc")
        

        if(valueA>valueB)
          return 1
        else
          return -1
      else  
        if(valueA>valueB)
          return -1
        else
          return 1

    })
    console.log("resorderblock",res)
    return res
  }else{
    console.log("resorderblock",data)
    return data
  }
  

}
let finalRecursive=[]

const sortRecursive=(indiceCriteria,sortCriteria,groups,category)=>{
  let u=[]
  let g=[]

  console.log("indicecriteria",groups,indiceCriteria,sortCriteria.length,sortCriteria[indiceCriteria])
  if(indiceCriteria==sortCriteria.length){
    console.log("comienza")
    groups.forEach(x=>{
      console.log("comienzax",x)
      x.forEach(y=>{
        finalRecursive.push(y)
      })
    })
    console.log("finalRescursive",finalRecursive)
    return 
  }
  for(let ng=0;ng<groups.length;ng++){
    
    u=orderBlock(groups[ng],sortCriteria[indiceCriteria],category)
    g=groupOrderBlock(u,sortCriteria[indiceCriteria].segment,sortCriteria[indiceCriteria].field,sortCriteria[indiceCriteria].caseSensitive,sortCriteria[indiceCriteria].fieldType)
    //if(g.length>1)
      sortRecursive(indiceCriteria+1,sortCriteria,g,category)
    
  }
  
}

const sortToGetFinalTable=(data,sortCriteria,category)=>{
  let res=[]
  let par
  let orderData
  let cambio
  console.log("datalength",data,data.length)
  finalRecursive=[]

  if(sortCriteria?.[0]!==undefined){
    let u=orderBlock(data,sortCriteria[0],category)
    let g=groupOrderBlock(u,sortCriteria[0].segment,sortCriteria[0].field,sortCriteria[0].caseSensitive,sortCriteria[0].fieldType)
    let indiceCriteria=1
   //if(g.length>2)
    sortRecursive(indiceCriteria,sortCriteria,g,category)
  }
  else{
    finalRecursive=data
  }
  return finalRecursive
  

}
  /*orderData=data.sort((a,b)=>{
    res=[]
    //return a["getDataclientes"].name>b["getDataclientes"].name?1:-1
    sortCriteria?.forEach(y=>{
      console.log("paramssort",a[y.segment][y.field],b[y.segment][y.field])
      if(y.typeOrder=="asc")
        if(a[y.segment][y.field]>b[y.segment][y.field])
          res.push(false)
        else if(a[y.segment][y.field]<b[y.segment][y.field])
          res.push(true)
      else
        if(a[y.segment][y.field]<b[y.segment][y.field])
          res.push(false)
        else 
          res.push(true)

    })
    if(res.includes(true))
      return -1
    else return 1
  })
    console.log("datasort",orderData)
    return orderData
}*/
    /*if(res.length>0){
      par=res[0]
      let r
      //console.log("par",res)
      if(res.length==1){
        if(sortCriteria[0].typeOrder=="asc")
          return res[0]==true?1:-1
        else  
          return res[0]==false?1:-1
      }*/
      
      /*cambio=false
      let iguales=[]
      for(let i=0;i<res.length;i++){
        console.log("paramssort1 iguales",i,iguales,r)
        if(sortCriteria[i].typeOrder=="asc"){
          if(res[i]==true)
            return 1
          else if(res[i]=="igual")
            return 0
          else
            return -1
        }else{  
          if(res[i]==true)
            return -1
          else if(res[i]=="igual")
            return 0
          else
            return 1
        }
        /*if(sortCriteria[i].typeOrder=="asc"){
          if(res[i]==true){
            if(iguales.length==i)
              r=1
            else
              r=-1
          }else if(res[i]=="igual"){
            r=0
            iguales.push("igual")
          }else if(res[i]==false){
            if(iguales.length==i)
              r=-1
            else
              r=1

          }
        }else{
          if(res[i]==true){
            if(iguales.length==i)
              r=-1
            else
              r=1
          }else if(res[i]=="igual"){
            r=0
            iguales.push("igual")
          }else if(res[i]==false){
            if(iguales.length==i)
              r=1
            else
              r=-1

          }
        }*/

        /*if(sortCriteria[i-1].typeOrder=="asc"){
          if(res[i-1]==true || res[i-1]=="igual" && (cambio==true || i-1==0)){
            cambio=true
            r=1
            if(sortCriteria[i].typeOrder=="asc"){      
              if(res[i]==true && (cambio==true || i-1==0)){
                r=1 
                cambio=true
              }
              else if(res[i]=="igual" && (cambio==true || i-1==0)){
               
                r=1
                cambio=true
              }
              else{
                r=-1
                
                //cambio=false
              }
            }else if(sortCriteria[i].typeOrder=="desc"){      
              if(res[i]==true  || res[i]=="igual"){
                r=-1 
                break
              }
              else if(res[i]=="igual" && (cambio==true || i-1==0)){
               
                r=1
                cambio=true
              }
              else if(cambio==true || i-1==0){
                r=1
                cambio=true
                
                
                //cambio=false
              }
            }
          }else{
            break
          } 
        }else if(sortCriteria[i-1].typeOrder=="desc"){
          if(res[i-1]==false || res[i-1]=="igual" && (cambio==true || i-1==0)){
            cambio=true
            if(sortCriteria[i].typeOrder=="asc"){      
              if(res[i]==true && (cambio==true || i-1==0)){
                r=1 
                cambio=true
              }
              else if(res[i]=="igual" && (cambio==true || i-1==0)){
               
                r=1
                cambio=true
              }
              else{
                r=-1
              
                //cambio=false
              }
            }else if(sortCriteria[i].typeOrder=="desc"){      
              if(res[i]==false  || res[i]=="igual" && (cambio==true || i-1==0)){
                cambio=true
              }
              else if(res[i]=="igual" && (cambio==true || i-1==0)){
               
                r=1
                cambio=true
              }
              else if(cambio==true || i-1==0){
                console.log("")
                
                //cambio=false
              }
            }
          }else{
            break
          }
        }
      }

          
           
        
      console.log("par",r)
      return r
      /*r=true
      for(let oo=0;oo<cambio.length;oo++)
        if(cambio[oo]==false)
          r=false
      return r
      //return par==true?1:par==false?-1:0
      //else 
      //return b-a
    }
    return 0
    
  })*/

const getTableToDisplay=(data,cat)=>{
  let res={}
  if(res[cat]==undefined)
    res={[cat]:{}}
  Object.keys(data).forEach((y,ind)=>{
    Object.keys(data[y]).forEach((e,index)=>{
      if(res[cat][e]==undefined)
        res[cat]={...res[cat],[e]:[]}
      if(ind==0)
        for(let o=0;o<data.length;o++){
          res[cat][e].push({})
         }
      res[cat][e][ind]=data[y][e]

    })
  })
  console.log("display",res)
  return res
}

const getTableToSort=(data)=>{
  let newResult=[]
  console.log("entrodatadata")
  let ya=false
  Object.keys(data)?.forEach(i=>{
    Object.keys(data[i])?.forEach((u,index)=>{
      if(index==0 && ya==false){
        Object.keys(data[i])?.forEach((u,index)=>{
          newResult.push({}) 
        })
        ya=true
      }

      if(newResult[index]?.[i]==undefined)
        newResult[index][i]=data[i][u]

    })
  })
  
  console.log("newResult",newResult)
  return newResult
}
let llorder=null
const getSubsetsBlock=(order,y)=>{
  
  return <GetSubsetsAllTables
  finalObject={finalObject}
  subsets={subsets}
  conditionsWhere={conditionsWhere}
  subsetsData={y}
  setSubsetsData={setSubsetsData}
  order={order}
  firstCatNormalFields={firstCatNormalFields}
  otmChoices={otmChoices}
  parentCategories={parentCategories}
  parentIdentifiers={parentIdentifiers}
  otmChoicesStatistics={otmChoicesStatistics}
  />
}
const getDataReportTest=(routes,finalRoutes)=>{
  const root=`getData${currentCategory.name}`
  totalRoutes={}
  //for(let i=0;i<finalRoutes.length;i++){
    finalObject={}
    totalRoutes={}
  
    
    console.log("calcroutes",finalRoutes,calculateRoutes([`getData${currentCategory.name}`]),getFinalRoutesArray(finalRoutes,calculateRoutes([`getData${currentCategory.name}`])))
    
    for(let i=0;i<finalRoutes.length;i++){
      getLevelData1(categoryProducts[root],routes[finalRoutes[i]],0,true)  
    }
    let y=findTheLowerLevelCategory1(getFinalRoutesArray(finalRoutes,calculateRoutes([`getData${currentCategory.name}`])),[],getFinalRoutesArray(finalRoutes,calculateRoutes([`getData${currentCategory.name}`])))

    console.log("yfinal",y)
    getInverseTraverseSonTotalsWithConditionsWhereRoutes1(routes,finalRoutes,y)
    let order=getOrderToPrintTables(y)
    console.log("ordertoprinttables",order,y)
    let tts
    //let table
    let tablesToCont={}
    //setFinalObjectToSubsets(finalObject)
    //empieza bloque para obtener datos de subsets
    
    //termina bloque para obtener datos de subsets
    order[0].forEach(y=>{
      let table
      tts=[]
      tts=getTableToSort(finalObject[y])
      //sortToGetFinalTable(tts,sortRules[y])
      //if(y=="getDataclientes")
      table=getTableToDisplay(sortToGetFinalTable(tts,sortRules[y],y),y)

      tablesToCont[y]=table[y]
      printFinalTableNew(y,table[y],order[1][y])//,order[0])
      printGrandTotalsTrue(y,realGrandTotals1[y],order[1][y])
    })
    setReportShow(totalTables)
    console.log("definitive",routes,y)
  console.log("totalRoutes55",totalRoutes,finalObject)
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
    totalTables=[]
    nr=shallowCopy(routes)
    //console.log("aprop",getFinalRoutesArray(finalRoutes,routes))
    let y=findTheLowerLevelCategory1(getFinalRoutesArray(finalRoutes,calculateRoutes([`getData${currentCategory.name}`])),[],getFinalRoutesArray(finalRoutes,calculateRoutes([`getData${currentCategory.name}`])))
    //console.log("definitive",routes,y)

    for(let i=0;i<finalRoutes.length;i++){
           getLevelData1(categoryProducts[root],routes[finalRoutes[i]],0,true)  
    }
    getInverseTraverseSonTotalsWithConditionsWhereRoutes1(routes,finalRoutes,y)

    let order=getOrderToPrintTables(y)
    console.log("ordertoprinttables",order)
    let tts
    //let table
    let tablesToCont={}
    //setFinalObjectToSubsets(finalObject)
    //empieza bloque para obtener datos de subsets
    
    //termina bloque para obtener datos de subsets
    order[0].forEach(y=>{
      let table
      tts=[]
      tts=getTableToSort(finalObject[y])
      //sortToGetFinalTable(tts,sortRules[y])
      //if(y=="getDataclientes")
      table=getTableToDisplay(sortToGetFinalTable(tts,sortRules[y],y),y)

      tablesToCont[y]=table[y]
      printFinalTableNew(y,table[y],order[1][y])//,order[0])
      printGrandTotalsTrue(y,realGrandTotals1[y],order[1][y])
    })
    console.log("tablestocont",tablesToCont)

    /*bienstart order[0].forEach(y=>{
      printFinalTableNew(y,finalObject[y],order[1][y])
      printGrandTotalsTrue(y,realGrandTotals1[y],order[1][y])
    }) bienend*/
    //setSubsetsData({})
    let ssd={}
    y=getSubsetsData({
      
      data:tablesToCont,
      subsets:subsets,
      conditionsWhere:conditionsWhere,
      order:order,
      firstCatNormalFields:firstCatNormalFields,
      otmChoices:otmChoices,
      parentCategories:parentCategories,
      parentIdentifiers:parentIdentifiers,
      otmChoicesStatistics:otmChoicesStatistics,
  })

let z=getSubsetsCont({
    
    data:tablesToCont,
    subsets:subsets,
    subsetsData:y,
   
    
    conditionsWhere:conditionsWhere,
    order:order,
    firstCatNormalFields:firstCatNormalFields,
    otmChoices:otmChoices,
    parentCategories:parentCategories,
    parentIdentifiers:parentIdentifiers,
    otmChoicesStatistics:otmChoicesStatistics,
})
    totalTables.push(getSubsetsBlock(order,y))
    
    totalTables.push(<GetSubsetsContribution
      finalObject={tablesToCont}/*finalObject}*/
      subsets={subsets}
      conditionsWhere={conditionsWhere}
      subsetsData={y}
      setSubsetsData={setSubsetsData}
      order={order}
      firstCatNormalFields={firstCatNormalFields}
      otmChoices={otmChoices}
      parentCategories={parentCategories}
      parentIdentifiers={parentIdentifiers}
      otmChoicesStatistics={otmChoicesStatistics}
    ></GetSubsetsContribution>)

  totalTables.push(<SubsetContributionsTable
      order={order}
      data={z[0]}
      displayRaw={z[1]}
      grandTotals={z[2]}
      firstCatNormalFields={firstCatNormalFields}
      otmChoices={otmChoices}
      subsets={subsets}
    />)
    setReportShow(totalTables)
    console.log("totalRoutes",totalRoutes)
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

const getFieldsSegment=(category,segment,realSegmentLast)=>{
  let result=[]
  let len=0
  console.log("realsegmentlast111",realSegmentLast)
  //let busca=realSegmentCount
  let theresNormal
  let theresComposite
  let theresOtmDestiny
  if(category==segment){
    if(category==`getData${currentCategory.name}`){
      let normal=firstCatNormalFields[`getData${currentCategory.name}`].normal.length
      let composite=firstCatNormalFields[`getData${currentCategory.name}`].compositeFields.length
      let otmdestiny=firstCatNormalFields[`getData${currentCategory.name}`].otmdestiny.length
      theresNormal=normal>0
      theresComposite=composite>0 
      theresOtmDestiny=otmdestiny>0 
      if(theresNormal)
      result=[...result,...firstCatNormalFields[`getData${currentCategory.name}`].normal.map((q,index)=>{
        
          return <th style={{borderRight:(realSegmentLast==category && normal-1==index && !theresComposite)?"none":"1px solid white"}}>{q.name1}</th>
      }
      )]
      if(theresComposite)
      result=[...result,...firstCatNormalFields[`getData${currentCategory.name}`].compositeFields.map((q,index)=>
        <th style={{borderRight:(realSegmentLast==category && composite-1==index)?"none":"1px solid white"}}>{q.name1}</th>
      )]
      /*if(theresOtmDestiny)
      result=[...result,...firstCatNormalFields[`getData${currentCategory.name}`].otmdestiny.map((q,index)=>
        <th style={{borderRight:(realSegmentLast==category && composite-1==index)?"none":"1px solid white"}}>{q.name1}</th>
      )]*/

      
    }else{
      console.log("otmchoices22",otmChoices[segment])
      let arr
    if(category.startsWith("mtm"))
      arr=mtmChoices[category]
    else if(category.startsWith("otm"))
      arr=otmChoices[category]
      let normal=arr.normal.length
      let composite=arr.compositeFields.length
      let otmdestiny=0
      if(category.startsWith("otm"))
       otmdestiny=arr.otmdestiny.length
      theresNormal=normal>0
      theresComposite=composite>0  
      theresOtmDestiny=otmdestiny>0
      if(theresNormal)   
      result=[...result,...arr.normal.map((q,index)=>
        <th style={{borderRight:(realSegmentLast==category && normal-1==index && !(theresComposite || theresOtmDestiny))?"none":"1px solid white"}}>{q.name1}</th>
      )]
      if(theresComposite)
      result=[...result,...arr.compositeFields.map((q,index)=>
        <th style={{borderRight:(realSegmentLast==category && composite-1==index && !theresOtmDestiny)?"none":"1px solid white"}}>{q.name1}</th>
      )]
      if(theresOtmDestiny==true)
      result=[...result,...arr.otmdestiny.map((q,index)=>
        <th style={{borderRight:(realSegmentLast==category && otmdestiny-1==index)?"none":"1px solid white"}}>{q}</th>
      )]
      let parentCat=parentCategories[category]

      if(parentIdentifiers?.[parentCat]?.["fieldCompOrNormalType"]=="normal" || 
      parentIdentifiers?.[parentCat]?.["fieldCompOrNormalType"]=="composite")
        result.unshift(<th style={{borderRight:realSegmentLast==category && !(theresNormal || theresComposite || !theresOtmDestiny)?"none":"1px solid white"}}>Parent Id</th>)  
      
    }
    result.unshift(<th style={{borderRight:realSegmentLast==category && !(theresNormal || theresComposite || !theresOtmDestiny)?"none":"1px solid white"}}>Id</th>)
  }else{
    let temp=[]
    let arr
    if(segment.startsWith("mtm"))
      arr=mtmChoices[segment]
    else if(segment.startsWith("otm"))
      arr=otmChoices[segment]
    let normal=arr.normal.filter(x=>{
      if(x.type!="number" && x.dataType!="queryCategory")
        return true
      return false}).length
    let composite=arr.compositeFields.length
    let otmdestiny=arr?.otmdestiny?.length
    theresNormal=normal>0
    theresComposite=composite>0  
    theresOtmDestiny=otmdestiny>0
    
    
    let lastIndexNumberComposite=-1
    let lastIndexNumber=-1
    arr.normal.forEach((x,index)=>{
      if(x.type!="number" && x.dataType!="queryCategory")
        lastIndexNumber=index
    })
    arr.compositeFields.forEach((x,index)=>{
      if(x.type=="number")
        lastIndexNumberComposite=index
    })
    
    console.log("theresnormal",segment,realSegmentLast,lastIndexNumber,lastIndexNumberComposite,realSegmentLast==segment && lastIndexNumber==-1 && lastIndexNumberComposite==-1)
    if(theresNormal)
      arr.normal.forEach((q,index)=>{
        
      if(q.type=="number" && q.dataType!="queryCategory"){
        console.log("uiiii",otmChoicesStatistics?.[category]?.[segment],q.name1)
        let otmStatisticsArray=[]
        for(let x in otmChoicesStatistics?.[category]?.[segment]?.[q.name1]){
          console.log("o1111",otmChoicesStatistics?.[category]?.[segment]?.[q.name1]?.[x],x)
          if(otmChoicesStatistics?.[category]?.[segment]?.[q.name1]?.[x]==true){
            otmStatisticsArray.push(x)
          }
        }
        console.log("otmstatisticsarray",otmStatisticsArray)
        console.log("qqq",q.name1,realSegmentLast,segment,normal-1,index)
        temp.push(<th style={{borderRight:(realSegmentLast==segment && lastIndexNumber==index && lastIndexNumberComposite==-1 && otmStatisticsArray.length==0)?"none":"1px solid white"}}>{q.name1}</th>)
        //Object.keys(otmChoicesStatistics[category][segment]?.[q.name1])
        otmStatisticsArray.forEach((ji,i44)=>{
          
          //if(otmChoicesStatistics[category][segment][q.name1][ji]==true){
            
            temp.push(<th style={{borderRight:lastIndexNumber==index && realSegmentLast==segment && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid white"}}>{ji}</th>)

          //}
        })

      }
    
     
    })
    result=[...result,...temp]
    temp=[]
    if(theresComposite)
     arr.compositeFields.forEach((q,index)=>{

      if(q.type=="number"){
        //console.log("compfields33",otmChoices[segment].compositeFields,otmChoicesStatistics[category][segment]?.[q.name1])

        let otmStatisticsArray=[]
        for(let x in otmChoicesStatistics?.[category]?.[segment]?.[q.name1]){
          console.log("o2222",otmChoicesStatistics?.[category]?.[segment],category,segment,q.name1,x)

          if(otmChoicesStatistics?.[category]?.[segment]?.[q.name1]?.[x]==true){
            otmStatisticsArray.push(x)
          }
        }
        console.log("otmsa",otmStatisticsArray)
        temp.push(<th style={{borderRight:(realSegmentLast==segment && lastIndexNumberComposite==index && otmStatisticsArray.length==0)?"none":"1px solid white"}}>{q.name1}</th>)
        //Object.keys(otmChoicesStatistics[category][segment]?.[q.name1]).
        otmStatisticsArray.forEach((ji,i44)=>{
          //if(otmChoicesStatistics[category][segment][q.name1][ji]==true){
            //if(ji=="media")
              console.log("mediainfo",q.name1,realSegmentLast==segment && lastIndexNumberComposite==index && i44==(otmStatisticsArray.length-1),realSegmentLast,segment,lastIndexNumberComposite,index,i44,otmStatisticsArray.length-1)
            temp.push(<th style={{borderRight:(realSegmentLast==segment && lastIndexNumberComposite==index && i44==(otmStatisticsArray.length-1))===true?"none":"1px solid white"}}>{ji}</th>)

          //}
        })
      }
    }
     
  )
  //console.log("ppp888",`${segment}TotalCount`,otmChoicesStatistics[category][segment]?.["general"]?.[`${segment}TotalCount`])

  
  if(realSegmentLast!==segment){ 
    if(lastIndexNumberComposite!==-1 || lastIndexNumber!==-1){
      if(otmChoicesStatistics?.[category]?.[segment]?.["general"]?.[`${segment}TotalCount`]==true){

        result=[<th style={{borderRight:"1px solid white"}}>{`${segment}TotalCount`}</th>,...result,...temp]
      }else
      result=[...result,...temp]
    }
    else{
      if(otmChoicesStatistics?.[category]?.[segment]?.["general"]?.[`${segment}TotalCount`]==true){

        result=[<th style={{borderRight:"none"}}>{`${segment}TotalCount`}</th>]
      }
    }
  }else{
    if(lastIndexNumberComposite!==-1 || lastIndexNumber!==-1){
      if(otmChoicesStatistics?.[category]?.[segment]?.["general"]?.[`${segment}TotalCount`]==true){

        result=[<th style={{borderRight:"1px solid white"}}>{`${segment}TotalCount`}</th>,...result,...temp]
      }else
        result=[...result,...temp]
    }
    else if(otmChoicesStatistics?.[category]?.[segment]?.["general"]?.[`${segment}TotalCount`]==true){
    
      result=[<th style={{/*borderRight:"none"*/borderRight:"none"}}>{`${segment}TotalCount`}</th>]
    }
  }
    /*if(theresOtmDestiny)
    otmChoices[segment].otmdestiny.forEach((q,index)=>{
      temp.push(<th style={{borderRight:realSegmentLast==segment && index==otmdestiny-1?"none":"1px solid white"}}>{q.name1}</th>)
    })*/
  
}
  
  return result
}

const displayDate=(date)=>{
  if(date!==null){
  let nd=new Date(parseInt(date))
  console.log("ddf",nd)
  let m=nd.getMonth()+1
  let d=nd.getDate()
  let y=nd.getFullYear()
  let h=nd.getHours()
  let min=nd.getMinutes()
  let res=""
  if(m.toString().length==1)
    res="0"+m+"/"
  else  
    res=m+"/"
  if(d.toString().length==1)
    res+="0"+d+"/"
  else  
    res+=d+"/"
  res+=y
  res+=" at "
  if(h.toString().length==1)
    res+="0"+h+":"
  else  
    res+=h+":"
  if(min.toString().length==1)
    res+="0"+min
  else  
    res+=min

  return res
  }else 
  return ""
}

const getFieldsDataSegment=(category,a,realSegmentLast,data2)=>{
  let result=[]
  let total=[]
  //let data=finalObject[category][a]
  let data=data2[a]
  console.log("dataverif",data)
  let lastColor="lightgray"
  console.log("data56",data)
  if(data!=null){
  Object.keys(data)?.forEach((y,index)=>{
    result=[]
    let ultimo=false
    let len=0
    if(category==a){
      let theresNormal
      let theresComposite
      let theresOtmDestiny
      if(category==`getData${currentCategory.name}`){
        len=1+
        firstCatNormalFields[`getData${currentCategory.name}`].normal.length+
        firstCatNormalFields[`getData${currentCategory.name}`].compositeFields.length
        let normal=firstCatNormalFields[`getData${currentCategory.name}`].normal.length
        let composite=firstCatNormalFields[`getData${currentCategory.name}`].compositeFields.length
        theresNormal=normal>0
        theresComposite=composite>0 
        //let otmdestiny=firstCatNormalFields[`getData${currentCategory.name}`].otmdestiny.length
        //let theresOtmDestiny=otmdestiny>0
 
        //let otmdestiny=otmChoices[`getData${currentCategory.name}`].otmdestiny.length
        //theresOtmDestiny=otmdestiny>0

        if(theresNormal){
        result=[...result,...firstCatNormalFields[`getData${currentCategory.name}`].normal.map((q,index)=>{
          let disp=""
          
          if(q.type=="date"){
            console.log("datadate",data[y][q.name1])
            disp=displayDate(data[y][q.name1])
            
          
          }else
            disp=data[y][q.name1]
          return <td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && index==normal-1 && !theresComposite? "none":"1px solid black"}}>{disp}</td>
        })]
      }
        if(theresComposite)
        result=[...result,...firstCatNormalFields[`getData${currentCategory.name}`].compositeFields.map((q,index)=>
          <td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",overflow:"normal",borderRight:realSegmentLast==category && index==composite-1?"none":"1px solid black"}}>{data?.[y]?.[`${q.name1}`]}</td>
        )]
        /*if(theresOtmDestiny)
        result=[...result,...firstCatNormalFields[`getData${currentCategory.name}`].otmdestiny.map((q,index)=>
        <td style={{color:"black",background:"white",borderRight:realSegmentLast==category && index==otmdestiny-1?"none":"1px solid black"}}>{finalObject[category][a][y][`${q.name1}`]}</td>
      )]*/

      }else{
        let arr
        if(category.startsWith("mtm"))
          arr=mtmChoices[category]
        else if(category.startsWith("otm"))
          arr=otmChoices[category]
        len=1+arr.normal.length+
        arr.compositeFields.length
        let normal=arr.normal.length
        let composite=arr.compositeFields.length
        theresNormal=normal>0
        theresComposite=composite>0 
        let otmdestiny=arr?.otmdestiny?.length
        theresOtmDestiny=otmdestiny>0
 
      

        if(theresNormal)        
        result=[...result,...arr.normal.map((q,index)=>{
          let disp=""
          
          if(q.type=="date"){
            console.log("datadate",data[y][q.name1])
            disp=displayDate(data[y][q.name1])
            
          
          }else
            disp=data[y][q.name1]
          return <td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && normal-1==index && !(theresComposite || theresOtmDestiny)?"none":"1px solid black"}}>{disp}</td>
        }
        )]
        if(theresComposite)
        result=[...result,...arr.compositeFields.map((q,index)=>
          <td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && composite-1==index && !theresOtmDestiny?"none":"1px solid black"}}>{data[y][`${q.name1}`]}</td>
        )]
      
      
      if(theresOtmDestiny)
      result=[...result,...arr?.otmdestiny?.map((q,index)=>
          <td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && otmdestiny-1==index?"none":"1px solid black"}}>{data[y][q]}</td>
        )]
      let parentCat=parentCategories[category]
      if(parentIdentifiers?.[parentCat]?.["fieldCompOrNormalType"]=="normal" || 
      parentIdentifiers?.[parentCat]?.["fieldCompOrNormalType"]=="composite")
      
        result.unshift(<td style={{whiteSpace:"nowrap",borderRight:realSegmentLast==category && !(theresNormal || theresComposite || !theresOtmDestiny)?"none":"1px solid black"}}>{data[y]["parentIdentifier"]}</td>)  
      
      
    }
    result.unshift(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && !(theresNormal || theresComposite ||theresOtmDestiny)?"none":"1px solid black"}}>{data[y]["id"]}</td>)
  
  }else{
    let arr
    if(a.startsWith("mtm"))
      arr=mtmChoices[a]
    else if(a.startsWith("otm"))
      arr=otmChoices[a]
      let lastIndexNumber=-1
      let lastIndexNumberComposite=-1
        arr.normal.forEach((x,index)=>{
          if(x.type!="number" && x.dataType!="queryCategory")
            lastIndexNumber=index
        })
        arr.compositeFields.forEach((x,index)=>{
          if(x.type=="number")
            lastIndexNumberComposite=index
        })
        let normal=arr.normal.length
        let composite=arr.compositeFields.length
        let theresNormal=normal>0
        let theresComposite=composite>0  
        let theresOtmDestiny
      let temp=[]
      len=1+arr.normal.length+
        arr.compositeFields.length
      if(theresNormal)
      arr.normal.forEach((q,index)=>{
        if(q.type=="number" && q.dataType!="queryCategory"){
          let otmStatisticsArray=[]
          for(let x in otmChoicesStatistics?.[category]?.[a]?.[q.name1]){
            console.log("o1111",otmChoicesStatistics?.[category]?.[a]?.[q.name1]?.[x],x)
            if(otmChoicesStatistics?.[category]?.[a]?.[q.name1]?.[x]==true){
              otmStatisticsArray.push(x)
            }
          }
          temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && otmStatisticsArray.length==0?"none":"1px solid black"}}>{data?.[y]?.[`${q.name1}total`]==undefined?"0.00":data[y][`${q.name1}total`].toFixed(2)}</td>)
          //Object.keys(otmChoicesStatistics[category][a][q.name1]).
          otmStatisticsArray.forEach((ji,i44)=>{
            console.log("www88",finalObject[category][a][y],data[y]?.[`${q.name1}Acummulated`])

            
              let pmay=ji[0].toUpperCase()+ji.substring(1)
              //console.log("verif67",finalObject[category][a][y][`${q.name1}${pmay}`],`${q.name1}${pmay}`)
              if(ji=="percentage"){
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{isNaN(data?.[y]?.[`%${q.name1}`])?"0.00":data[y][`%${q.name1}`].toFixed(2)}</td>)  

              }else if(ji=="minimum"){
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{data?.[y]?.[`${q.name1}Acummulatedminimum`]==undefined?"0.00":data?.[y]?.[`${q.name1}Acummulatedminimum`].toFixed(2)}</td>)  
              }else if(ji=="maximum"){
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{data?.[y]?.[`${q.name1}Acummulatedmaximum`]==undefined?"0.00":data?.[y]?.[`${q.name1}Acummulatedmaximum`].toFixed(2)}</td>)  
              
              }else
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{data?.[y]?.[`${q.name1}${pmay}`]==undefined?"0.00":data[y][`${q.name1}${pmay}`].toFixed(2)}</td>)

            
          })
        }
        
      }
      
      )
      result=[...result,...temp]
      temp=[]
      if(theresComposite)
      arr.compositeFields.forEach((q,index)=>{
        if(q.type=="number"){
          let otmStatisticsArray=[]
          for(let x in otmChoicesStatistics?.[category]?.[a]?.[q.name1]){
            console.log("o1111",otmChoicesStatistics?.[category]?.[a]?.[q.name1]?.[x],x)
            if(otmChoicesStatistics[category][a]?.[q.name1]?.[x]==true){
              otmStatisticsArray.push(x)
            }
          }
          temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumberComposite==index && realSegmentLast==a && otmStatisticsArray.length==0?"none":"1px solid black"}}>{data[y][`${q.name1}total`].toFixed(2)}</td>)
          //Object.keys(otmChoicesStatistics[category][a][q.name1])
          otmStatisticsArray.forEach((ji,i44)=>{
            //if(otmChoicesStatistics[category][a][q.name1][ji]==true){
              let pmay=ji[0].toUpperCase()+ji.substring(1)
              //console.log("verif67",finalObject[category][a][y][`${q.name1}${pmay}`],`${q.name1}${pmay}`)
              //temp.push(<td style={{color:"black",background:"white",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1?"none":"1px solid black"}}>{finalObject[category][a][y][`${q.name1}${pmay}`]}</td>)
              if(ji=="percentage"){
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{isNaN(data?.[y]?.[`%${q.name1}`])?"0.00":data?.[y]?.[`%${q.name1}`]?.toFixed(2)}</td>)  

              }else if(ji=="minimum"){
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{data?.[y]?.[`${q.name1}Acummulatedminimum`]==undefined?"0.00":data?.[y]?.[`${q.name1}Acummulatedminimum`]?.toFixed(2)}</td>)  
              }else if(ji=="maximum"){
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{data[y]?.[`${q.name1}Acummulatedmaximum`]==undefined?"0.00":data?.[y]?.[`${q.name1}Acummulatedmaximum`]?.toFixed(2)}</td>)  
              
              }else
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{data?.[y][`${q.name1}${pmay}`]==undefined?"0.00":data?.[y][`${q.name1}${pmay}`]?.toFixed(2)}</td>)

            //}
          })
        }
        ///return ""
      }
      
      )

      if(realSegmentLast!==a){ 
        if(lastIndexNumberComposite!==-1 || lastIndexNumber!==-1){
          if(otmChoicesStatistics?.[category]?.[a]?.["general"]?.[`${a}TotalCount`]==true){

            result=[<td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`${a}TotalCount`]==undefined?"0.00":data[y][`${a}TotalCount`]}</td>,...result,...temp]
          }else{
            result=[...result,...temp]
          }
        }
        else{
          if(otmChoicesStatistics?.[category]?.[a]?.["general"]?.[`${a}TotalCount`]==true){

            result=[<td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`${a}TotalCount`]==undefined?"0.00":data[y][`${a}TotalCount`]}</td>]
          }
        }
      }else{
        if(lastIndexNumberComposite!==-1 || lastIndexNumber!==-1){
          if(otmChoicesStatistics?.[category]?.[a]?.["general"]?.[`${a}TotalCount`]==true){

            result=[<td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`${a}TotalCount`]==undefined?"0.00":data[y][`${a}TotalCount`]}</td>,...result,...temp]
          }else
            result=[...result,temp]
        }
        else
          if(otmChoicesStatistics?.[category]?.[a]?.["general"]?.[`${a}TotalCount`]==true){

            result=[<td style={{whiteSpace:"nowrap",borderRight:"none"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`${a}TotalCount`]==undefined?"0.00":data[y][`${a}TotalCount`]}</td>]
      }
    }
      
      
      
      
    }
    
    lastColor=lastColor=="lightgray" && index%2==0?"white":"lightgray"
    total.push(<tr style={{background:lastColor}}>{result}</tr>)
  })
 }
  return total
  
}

const displayCategoryHeaders=()=>{
    return <tr style={{background:"black",color:"white",borderBottom:"1px solid white",margin:0,padding:0}}>
      <th style={{borderRight:"1px solid white"}}>Field</th>
      <th style={{borderRight:"1px solid white"}}>Grand Total</th>
      <th style={{borderRight:"1px solid white"}}>Minimum</th>
      <th style={{borderRight:"1px solid white"}}>Maximum</th>
      <th style={{borderRight:"1px solid white"}}>Media</th>
      <th>Median</th>
    </tr>
  
}
const displayFirstCategoryFields=(data)=>{
  const nf=getNumericFields(`getData${currentCategory.name}`)
  let n=nf.normal.map((x,index)=>{
    return <tr style={{background:"white",color:"black",margin:0,padding:0}}>
      <td style={{borderRight:"1px solid black"}}>{x}</td> 
      <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[`${x}total`]==undefined?"0.00":data[`getData${currentCategory.name}`][`${x}total`].toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.[0]==undefined?"0.00":(data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.[0].toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.[data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`].length-1]==undefined?"0.00":(data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.[data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`].length-1].toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[`getData${currentCategory.name}`]?.[`${x}Media`])?"0.00":data[`getData${currentCategory.name}`][`${x}Media`].toFixed(2)}</td>
      <td>{isNaN(data?.[`getData${currentCategory.name}`]?.[`${x}Median`])?"0.00":data[`getData${currentCategory.name}`][`${x}Median`].toFixed(2)}</td>
    </tr>
  })
  let c=nf.compositeFields.map(x=>{
    return <tr style={{background:"white",color:"black",margin:0,padding:0}}>
      <td style={{borderRight:"1px solid black"}}>{x}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[`${x}total`]==undefined?"0.00":data[`getData${currentCategory.name}`][`${x}total`].toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.[0]==undefined?"0.00":(data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.[0].toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.[data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`].length-1]==undefined?"0.00":(data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.[data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`].length-1].toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[`getData${currentCategory.name}`]?.[`${x}Media`])?"0.00":data[`getData${currentCategory.name}`][`${x}Media`].toFixed(2)}</td>
      <td>{isNaN(data?.[`getData${currentCategory.name}`]?.[`${x}Median`])?"0.00":data[`getData${currentCategory.name}`][`${x}Median`].toFixed(2)}</td>
    </tr>
  })
  return [...n,...c]

  
}

const calMedian=(arr)=>{
  let median=0
  let length=arr?.length
  console.log("arrdesp",arr,length)
  if(length==undefined || length==0 || isNaN(length))
    return 0
  else{
    if(length%2==1){
      if(arr[Math.floor(length/2)]==undefined){
        median=0
      }else
        median=arr[Math.floor(length/2)]
    }else{
      let p1,p2
      if(arr[(length/2)-1]==undefined)
        p1=0
      else
        p1=arr[(length/2)-1]
      if(arr[(length/2)]==undefined){
        p2=0
      }else
        p2=arr[(length/2)]

      
      
      
      median=(p1+p2)/2
    }

  return median
  }
}

const displayCategoryFields=(seg,data,cond)=>{
  const nf=getNumericFields(seg)
  let tcr=[]
  let lastColor="lightgray"
  if(cond){
    lastColor="white"
    tcr=[<tr style={{background:"white",color:"black",margin:0,padding:0,background:lastColor}}>
      <td style={{borderRight:"1px solid black"}}>{`${seg}TotalCount`}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${seg}TotalCount`]==undefined?"0.00":data?.[seg]?.[`${seg}TotalCount`]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${seg}TotalCountArray`]?.[0]==undefined?"0.00":data[seg]?.[`${seg}TotalCountArray`]?.[0].toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${seg}TotalCountArray`]?.[data?.[seg]?.[`${seg}TotalCountArray`].length-1]==undefined?"0.00":(data[seg]?.[`${seg}TotalCountArray`]?.[data[seg]?.[`${seg}TotalCountArray`].length-1].toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[seg]?.[`${seg}TotalCount`]/data?.[seg]?.[`${seg}TotalCountArray`]?.length)?"0.00":(data[seg]?.[`${seg}TotalCount`]/data[seg]?.[`${seg}TotalCountArray`]?.length)?.toFixed(2)}</td>
      <td>{isNaN(calMedian(data[seg]?.[`${seg}TotalCountArray`]))?"0.00":calMedian(data[seg]?.[`${seg}TotalCountArray`])?.toFixed(2)}</td>
    </tr>]
  }
  let n=nf.normal.map((x,index)=>{
    lastColor=lastColor=="white" /*&& index%2==0*/?"lightgray":"white"
    return <tr style={{margin:0,padding:0,color:"black",background:lastColor}}>
      <td style={{borderRight:"1px solid black"}}>{x}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}total`]==undefined?"0.00":data[seg]?.[`${x}total`]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}AccumulatedArray`]?.[0]==undefined?"0.00":data[seg]?.[`${x}AccumulatedArray`]?.[0]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}AccumulatedArray`]?.[data[seg]?.[`${x}AccumulatedArray`]?.length-1]==undefined?"0.00":(data[seg]?.[`${x}AccumulatedArray`]?.[data[seg]?.[`${x}AccumulatedArray`]?.length-1]?.toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[seg]?.[`${x}Media`])?"0.00":data[seg]?.[`${x}Media`]?.toFixed(2)}</td>
      <td>{isNaN(data[seg]?.[`${x}Median`])?"0.00":data?.[seg]?.[`${x}Median`]?.toFixed(2)}</td>
    </tr>
  })
  let c=nf.compositeFields.map((x,index)=>{
    lastColor=lastColor=="white"/*&& index%2==0*/?"lightgray":"white"

    return <tr style={{margin:0,padding:0,color:"black",background:lastColor}}>
      <td style={{borderRight:"1px solid black"}}>{x}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}total`]==undefined?"0.00":data[seg]?.[`${x}total`]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}AccumulatedArray`]?.[0]==undefined?"0.00":data[seg]?.[`${x}AccumulatedArray`]?.[0]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}AccumulatedArray`]?.[data[seg]?.[`${x}AccumulatedArray`].length-1]==undefined?"0.00":(data[seg]?.[`${x}AccumulatedArray`]?.[data[seg]?.[`${x}AccumulatedArray`]?.length-1]?.toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[seg]?.[`${x}Media`])?"0.00":data[seg]?.[`${x}Media`]?.toFixed(2)}</td>
      <td>{isNaN(data[seg]?.[`${x}Median`])?"0.00":data?.[seg]?.[`${x}Median`]?.toFixed(2)}</td>
    </tr>
  })
  return [...tcr,...n,...c]

}

const printGrandTotalsTrue=(category,data,segments)=>{
  console.log("resumen",category,data,segments)
  let trec=<p style={{background:"white",color:"black",marginBottom:"10px",display:"inline-block",paddingLeft:"5px",paddingRight:"5px"}}>Number of Records: {tableTotalRecords[category]}</p>
  let res=segments.map(seg=>{
  if(seg==`getData${currentCategory.name}`){
    let dfcf=displayFirstCategoryFields(data)
    if(dfcf.length>0){
      return <table style={{margin:0,padding:0,marginBottom:"10px"}}>
        <thead style={{margin:0,padding:0}}>
          <tr style={{margin:0,padding:0}}>
            <th style={{textAlign:"center",borderBottom:"1px solid white"}}>{seg}</th>
          </tr>
        </thead>
        <tbody style={{margin:0,padding:0}}>
          <tr style={{margin:0,padding:0}}>
            <th style={{margin:0,padding:0}}>
              <table style={{margin:0,padding:0}}>
                <thead style={{margin:0,padding:0}}>{displayCategoryHeaders()}</thead>
                <tbody style={{margin:0,padding:0}}>{displayFirstCategoryFields(data)}</tbody>
              </table>
            </th>
          </tr>
        </tbody>
        
      </table>
    }else{
      return ""
    }
      
  }else{
      let dcf=displayCategoryFields(seg,data,seg!=segments[0])
      if(dcf.length>0)
      return <table style={{margin:0,padding:0,marginBottom:"10px"}}>
      <thead style={{margin:0,padding:0}}>
        <tr style={{margin:0,padding:0}}>
          <th style={{textAlign:"center",borderBottom:"1px solid white",margin:0,padding:0}}>{seg}</th>
        </tr>
      </thead>
      <tbody style={{margin:0,padding:0}}>
        <tr style={{margin:0,padding:0}}>
          <th style={{margin:0,padding:0}}>
            <table style={{margin:0,padding:0}}>
              <thead style={{margin:0,padding:0}}>{displayCategoryHeaders()}</thead>
              <tbody style={{margin:0,padding:0}}>{dcf}</tbody>
            </table>
          </th>
        </tr>
      </tbody>
      
    </table> 
    else 
      return ""
      
    }
  })
  res.unshift(trec)
  totalTables.push(res)
  
}

const printMainHeaders=(data,category,segments)=>{
  let subtitles={}
  let head=[]
  let subsection={}
  let realSegmentsCount=[]

 /*segments.forEach((a,index)=>{

   
    subtitles[a]=getFieldsSegment(category,a)
    if(subtitles[a].length>0)
      realSegmentsCount.push(a)
    

  })*/
  
  let realSegmentsLast=segments[segments.length-1]
  console.log("getfieldssegment",realSegmentsCount,realSegmentsLast)
  segments.forEach((a,index)=>{
    if(head==undefined)
      head=[]
    
    head.push(a)
    let isLast=false
    console.log("yyy",realSegmentsCount,category,a,segments,index,segments.length-1,index==segments.length-1)
    
    if(index==realSegmentsCount.length-1)
      isLast=true
    
    subtitles[a]=getFieldsSegment(category,a,realSegmentsLast)
    subsection[a]=getFieldsDataSegment(category,a,realSegmentsLast,data)
      
  })
  console.log("subtitles",subtitles,head)
  
  return <table style={{width:"100%",background:"white",color:"black",padding:0,margin:0,marginBottom:"15px",marginRight:"10px"}}>
    <thead>
      <tr style={{verticalAlign:"top"}}>
        {head.map((u,index)=>{
          return subtitles[u].length>0 && <th style={{verticalAlign:"top",padding:0,margin:0}}>
              <span style={{display:"block",background:"black",textAlign:"center",
            color:"white",borderBottom:"1px solid white",borderRight:(index<head.length-1)?"1px solid white":"none",
            padding:0,margin:0}}>{u}</span>
              <table style={{background:"white",color:"black",padding:0,margin:0,width:"100%"}}>
                <thead>
                  <tr style={{background:"black",color:"white",padding:0,margin:0}}>{subtitles[u]}</tr>
                </thead>
                <tbody style={{background:"white",color:"black",padding:0,margin:0}}>
                  {subsection[u]}
                </tbody>
              </table>
              
            </th>
          
        })}
      
      </tr>
    </thead>
  </table>
}

const printFinalTableNew=(category,data,segments)=>{//,order)=>{
  console.log("iniciobegin",firstCatNormalFields,otmChoices)
  
  totalTables.push(printMainHeaders(data,category,segments))
 
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
  setReportShow(totalTables)
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
  let fict=Object.keys(routes).map(x=>x)
  console.log("routesfine",routes,fict)
  ////console.log("routes111",routes)
  //routesfinal encuentra la ultima parada de cada una de las rutas
  ////console.log("routesfinal",routesFinal(routes))
  const finalRoutes=routesFinal(routes)
  console.log("finalRoutes1",routes,finalRoutes)
  grandTotals={}
  doneLd={}
  //console.log("importante routes finalRoutes",routes,finalRoutes)
  
  //getDataReport({...routes},[...finalRoutes])
  getDataReportTest({...routes},[...finalRoutes])
  /*quitar este para bien
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
    {identifierCategoryName!=="" && <AddOtmIdFields
      open={openOtmIdFieldsDialog}
      toggleDialog={toggleOtmIdFieldsDialog}
      category={identifierCategoryName}
      fields={identifierCategoryName==`getData${currentCategory.name}`?firstCatNormalFields[`getData${currentCategory.name}`]:
      otmChoices[identifierCategoryName]}
      parentIdentifiers={parentIdentifiers}
      setParentIdentifiers={setParentIdentifiers}
    
      //otmCategoryFields={otmCategoryFields}
    />}
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

    {openWhereStatementDateDialog && <WhereStatementDateDialog
      open={openWhereStatementDateDialog}
      toggleDialog={toggleOpenWhereStatementDateDialog}
      conditionsWhere={conditionsWhere}
      setConditionsWhere={setConditionsWhere}
      comboDataSt={comboDataSt}
      setComboDataSt={setComboDataSt}
      {...varsHeadWhereStatement}

    />}
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

    {openViewWhereStatementDateDialog && <ViewWhereStatementDateDialog
      open={openViewWhereStatementDateDialog}
      toggleDialog={toggleOpenViewWhereStatementDateDialog}
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

    {openSortCriteriaDialog && <SortCriteriaDialog
      open={openSortCriteriaDialog}
      toggleDialog={toggleOpenSortCriteriaDialog}
      {...varOrderHeadCriteria}
    />}
    {openSubsetDialog && <SubsetDialog
      open={openSubsetDialog}
      toggleDialog={toggleOpenSubsetDialog}
      whereHeader={varsHeadWhereStatement}
      conditions={listOfViewConditions}
      subsets={subsets}
      setSubsets={setSubsets}
    />}
    

    
    {showFields 
    && 
    displayCurCategory(currentCategory,true,true,"",true,[`getData${currentCategory.name}`])
    }
    <FormButton onClick={()=>{
        
        beginReport(true,"")
        
        
    }}>Show Report</FormButton>

    {/*reportShow && beginReport(true,"")*/}
    {reportShow}
    
  </div>
}

export default Reports