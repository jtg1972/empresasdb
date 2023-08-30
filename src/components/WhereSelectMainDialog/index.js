import { valueFromAST } from 'graphql'
import React,{useState,useEffect} from 'react'
import Dialog from '../Dialog'
import FormButton from '../Forms/FormButton'
import FormInput from '../Forms/FormInput'
import './styles.scss'

const DisplayList=({
  addConditionWhereArray,
  setAddConditionWhereArray,
  setConditionsWhere,
  categoryName,
  segment,
  fieldName
})=>{
  return <div style={{display:"flex",flexDirection:"row",
  justifyContent:"space-between",flex:1,flexGrow:0}}>
    
    <div style={{width:"60px",display:"flex",flexDirection:"column"}}>
    {addConditionWhereArray?.map((x,index)=>{
    if(index%2==0){
      return <div style={{display:"flex",
      justifyContent:"space-between",flex:"1 0 0"}}>
        <p style={{color:"black",flex:"1 0 0",overflow:"hidden",whiteSpace:"nowrap"}}>{x}</p>
            
      </div>
    }
    
    })}
    </div>
    <div style={{width:"25px",flexGrow:0/*flex:"1 0 0",display:"flex",flexDirection:"column"*/}}>
      {addConditionWhereArray?.map((x,index)=>{
      
      if(index%2==1){
        
          return <div style={{display:"flex",flexDirection:"row",
          justifyContent:"space-between",flex:1,flexGrow:0} }>
         
          
            <p style={{color:"black",width:"100%",marginLeft:"5px"/*flex:1,flexGrow:0,overflow:"hidden"*/}}>{addConditionWhereArray[index].rule}</p>
          
          </div>
        
      }
      })}
      </div>
     

    <div style={{width:"10px",marginLeft:"5px",marginRight:"5px"/*,display:"flex",flexDirection:"column"*/}}>
      {addConditionWhereArray?.map((x,index)=>{ 
        if(index%2==0) 
        return <p style={{color:"red",flex:1}}
        onClick={()=>{
          let j=index
          let y=addConditionWhereArray.filter((i,inx)=>{
            if(j==inx || j+1==inx)
              return false
            return true
          })

          if(y.length==2){
            
              if(["and not","or not","not"].includes(y[0]))
                y[0]="not"
              else
                y[0]="none"
          }
          setAddConditionWhereArray(y)
          
        }}>-</p>
      })}
    </div>
    
    
    
    </div>
      


  
}

export const WhereSelectMainDialog = ({
  open,
  toggleDialog,
  fieldName,
  categoryName,
  segment,
  setConditionsWhere,
  conditionsWhere,
  comboDataSt,
  setComboDataSt,
  otmCategoryFields,
  setOtmChoices,
  otmChoices,
  specificOtmName,
  compFieldsArray,
  setCompFieldsArray
}) => {



  //console.log("parametros",otmChoices,setOtmChoices,specificOtmName)
  /*const [field,setField]=useState("")
  const [compositeField,setCompositeField]=useState([])
  const [primero,setPrimero]=useState(true)
  const [isString,setIsString]=useState(false)
  const [operator,setOperator]=useState("")
  const [addText,setAddText]=useState("")
  const [stringFields,setStringFields]=useState([])
  const [start,setStart]=useState(0)
  const [chars,setChars]=useState(0)
  const [compositeFieldName,setCompositeFieldName]=useState("")
  const numberOperators=["+","-","*","/","substring","add text"]
  const stringOperators=["concat","substring","add text"]
  const initalOperators=["none","add text","substring"]
  const [addTextNumber,setAddTextNumber]=useState(false)
  console.log("sfadd",stringFields,compositeField)
  console.log("compfieldsarray",compFieldsArray)
  let pr=true
  useEffect(()=>{

    setField(otmCategoryFields[0]?.name1)
    setCompositeField([])
    setStringFields([])
    setCompositeFieldName("")
    setOperator("none")
    setPrimero(true)
    if(compFieldsArray[specificOtmName]==undefined)
      setCompFieldsArray(e=>({...e,[specificOtmName]:[]}))
      
      
    }

  ,[otmCategoryFields])

  useEffect(()=>{
    if(compositeField.length==0)
      setPrimero(true)
    else  
    setPrimero(false)
  },[compositeField])
  useEffect(()=>{
    if(primero==false){
    if(stringFields.length==0)
      setOperator(numberOperators[0])
    else  
      setOperator(stringOperators[0])
    }
  },[stringFields,primero])

  

  const searchType=(name)=>{
    let oo=compFieldsArray[specificOtmName]
    for(let l in oo){
      if(oo[l].name1==name){
        //console.log("oo1",oo,oo[l].type)
        return oo[l].type
      }
        

        
    }
    

    let u=otmCategoryFields.filter(
      x=>x.name1==name
    )
    if(u.length==1)
      return u[0].type
  }

  const checkIsNumber=()=>{
    if(stringFields.length==0)
      return true
    return false
  }

  const updateNumberOperatorsforConcat=(arr,sf,pri=false)=>{
    let compFields=[]
    let strFields=[]
    let uno=false
    //console.log("arr0900",arr)
    if(sf.length>0){
      if(arr.length==2){
        uno=true
        if(arr[0]!=="concat" && arr[0]!=="add text" && arr[0]!=="substring"){
          //console.log("entro con dos")
          let u=searchType(arr[1])
          if(u=="string"){
            //console.log("entro con dos string")

            strFields=[arr[1]]
          //if(arr[0]!=="substring")
            compFields=arr
          }else{
            //console.log("entro con dos number")

            strFields=[]
            compFields=["none",arr[1]]
          }
          //compFields=["none",arr[1]]
          
          //console.log("revisa ww",strFields,compFields)
          
            
        } 
        
        else{
          if(typeof arr[1]!=="object"){
            let u=searchType(arr[1])
            if(u=="string") {
              //console.log("entro con dos string")

              strFields=[arr[1]]
            //if(arr[0]!=="substring")
              compFields=arr
            }else if(u=="number"){
              strFields=[]
              compFields=["none",arr[1]]
            }else{
              strFields=[arr[1]]
              compFields=arr
            }
          }else{
            if(arr[1].op=="add text" && arr[1].type=="string"){
              strFields=[arr[1].value]
              compFields=arr
            }else if(arr[1].op=="substring"){
              strFields=[]
              compFields=["substring",arr[1]]
            }

          }
          
          /*else{
            console.log("entro con dos number")

            strFields=[]
            compFields=["none",arr[1]]
          }
          //strFields=[arr[1]]
          //compFields=arr

          //console.log("revisa wy",strFields,compFields)

        }
      }else{
        //console.log("revisa 1")
        compFields=arr.map((x,index)=>{
          //console.log("revisa",x,index)
          if(index%2==0){
            if(index!==0){
              if(numberOperators.filter(y=>(y!=="add text" && y!=="concat" && y!=="substring" && y!=="none")).includes(x))
            
                return "concat"
              
              return x

            }else{
              //console.log("entro cero")
              if(x!=="concat" && x!=="add text" && x!=="substring"){
                //console.log("entro none")
                return "none"
                  
              }else 
                return x
            }
          }else
            return x
          
            
        })
      
        
      }
        
        
          let sf1=[]
          for(let u=0;u<compFields.length;u++){
            if(u%2==0){
              if(compFields[u]=="add text" || compFields[u]=="concat" || compFields[u]=="add text" || compFields[u]=="none")
                sf1.push(compFields[u+1])
              if(compFields[u]=="substring")
                sf1.push(compFields[u+1].field)
              if(compFields[u]=="add text"){
                if(compFields[u+1].type=="string")
                  sf1.push(compFields[u+1].value)
              }
            }
          }
          if(!uno){
            setStringFields(sf1)
            setCompositeField(compFields)
            setPrimero(false)
          }else {
           setStringFields(strFields)
            setCompositeField(compFields)
            setPrimero(false)
          }
      
    }else{
      //console.log("entro aqui pendejo")
      if(arr.length==2){
          //console.log("x22")
          if(arr[1].op=="add text"){
          
            compFields=["add text",arr[1]]

          }
          else if(arr[1].op=="substring")
            compFields=["substring",arr[1]]
          else 
            compFields=["none",arr[1]]
          //console.log("revisa ww",strFields,compFields)
            
      }else if(arr.length>2) {
        //console.log("x33")
        if(arr[1].op!=="add text" && arr[1].op!=="substring"){
          arr[0]="none"
        }
        compFields=arr

          

        
        //console.log("revisa wy",strFields,compFields)

      }else if(arr.length==0)
        setStringFields([])
      setCompositeField(compFields)
     
      if(arr.length==0)
        setPrimero(true)
      else
        setPrimero(false)
    }

  }*/
  
  const logicalOperators=["and","or","and not","or not"]

  const initialLogicalOperators=["none","not"]
  
  const [logicalOperator,setLogicalOperator]=useState(logicalOperators[0])
  const [initialLogicalOperator,setInitialLogicalOperator]=useState(initialLogicalOperators[0])
  
  const [nameWhereClause,setNameWhereClause]=useState("")
  const [typeWhereDefinition,setTypeWhereDefinition]=useState("normal")
  const [added,setAdded]=useState(false)
  const [thereAreConditions,setThereAreConditions]=useState(false)
  const [mainWhereClause,setMainWhereClause]=useState("none")
  let p=conditionsWhere?.[categoryName]?.[segment]?.[fieldName]
  let iv=""
  if(p!==undefined){
    let sfcw=Object.keys(conditionsWhere?.[categoryName]?.[segment]?.[fieldName])
    
    if(sfcw.length>0){
      iv=sfcw[0]
    }
  }
  const [addConditionWhereArray,setAddConditionWhereArray]=useState([])
  const [displayCombo,setDisplayCombo]=useState("")

  const [fieldConditionWhere,setFieldConditionWhere]=useState(iv)
  const [selectedSegment,setSelectedSegment]=useState("")
  const [selectedField,setSelectedField]=useState("")
  const [selectedRule,setSelectedRule]=useState("")
  const [listSegments,setListSegments]=useState([])
  const [listFields,setListFields]=useState([])
  const [listRules,setListRules]=useState([])
  const [isWhereCondition,setIsWhereCondition]=useState("none")
  let type
  let displayAllCombo=""
  
  useEffect(()=>{
    setTypeWhereDefinition("normal")
    let iv=""
    if(typeWhereDefinition=="previous"){
      let p=conditionsWhere?.[categoryName]?.[segment]?.[fieldName]
      if(p!==undefined){
      let sfcw=Object.keys(conditionsWhere?.[categoryName]?.[segment]?.[fieldName]).filter(x=>{
        if(x!=="categoryName" && x!=="segment" && x!=="fieldName" && x!=="type")
            return true
          return false
      })
      
      if(sfcw.length>0){
        iv=sfcw[0]
        setFieldConditionWhere(iv)
      }
      }
  }
  },[typeWhereDefinition])

  
 
  useEffect(()=>{

    if(open==true || added==true){
      if(thereAreConditions==true)
        setThereAreConditions(false)
      
      setNameWhereClause("")
      setAddConditionWhereArray([])
      setTypeWhereDefinition("normal")
      
      setInitialLogicalOperator(initialLogicalOperators[0])
      setLogicalOperator(logicalOperators[0])
      setSelectedSegment("")
      setSelectedField("")
      setSelectedRule("")
      setListSegments([])
      setListFields([])
      setListRules([])
      displaySegmentsCombo()
      console.log("entro222")
      
      
    }

  },[categoryName,added,open])

  

  const checkPreviousAdd=()=>{
    let sfcw=conditionsWhere?.[categoryName]?.[segment]?.[fieldName]
    if(isWhereCondition=="none")
      return true
    else{
      if(selectedRule!=="")
        return true
    }
    return false
  }

  
  const displayInitialLogicalOperators=()=>{
    
    return (<select style={{height:"20px",backgroundColor:"brown",color:"white",border:"none",outline:"none",padding:0,margin:0,marginLeft:"10px",marginRight:"10px"}}
    onChange={e=>{
      setInitialLogicalOperator(e.target.value)
    }}
    value={initialLogicalOperator}>
      {initialLogicalOperators.map(x=><option value={x}>{x}</option>)}
    </select>)
  }
  const displayLogicalOperators=()=>{
    
    return (<select style={{height:"20px",backgroundColor:"brown",color:"white",border:"none",outline:"none",padding:0,margin:0,marginLeft:"10px",marginRight:"10px"}}
    onChange={e=>{
      setLogicalOperator(e.target.value)
    }}
    value={logicalOperator==""?logicalOperators[0]:logicalOperator}>
      {logicalOperators.map(x=><option value={x}>{x}</option>)}
    </select>)
  }

  const addWhereConditionInArray=()=>{
    let acwa=addConditionWhereArray
  
    if(addConditionWhereArray.length==0)
      acwa=[...acwa,initialLogicalOperator,{
        category:categoryName,
        segment:selectedSegment,
        field:selectedField,
        rule:selectedRule
      
      }]
    else  
      acwa=[...acwa,logicalOperator,{
        category:categoryName,
        segment:selectedSegment,
        field:selectedField,
        rule:selectedRule
      
      }]
      
      
    
    setAddConditionWhereArray(acwa)
    
  }
  const addCondition=()=>{
    let mapeo=conditionsWhere
    if(mapeo[categoryName]==undefined){
      mapeo={...mapeo,[categoryName]:{}}
    }
    if(mapeo[categoryName]["main"]==undefined){
      mapeo={...mapeo,[categoryName]:{...mapeo[categoryName],main:"none"}}
      
    }
    mapeo={...mapeo,[categoryName]:{...mapeo[categoryName],main:isWhereCondition!=="none"?{
      category:categoryName,
      segment:selectedSegment,
      field:selectedField,
      rule:selectedRule}:"none"}}
    
    console.log("mapeo",mapeo)
    setConditionsWhere(mapeo)
    
    setAdded(true)
    
  }
  let doneUno=false

  //const displayComboFunc=()=>{
  let displayedFields

  const displaySegmentsCombo=()=>{
    let res=[]
    //res.push("Select Segment")
    if(conditionsWhere?.[categoryName]!==undefined){
      Object.keys(conditionsWhere?.[categoryName]).map(x=>{
        if(x!=="main" && x!=="categoryName" && x!=="segment" && x!=="fieldName" && x!=="type"){
          if(conditionsWhere?.[categoryName]?.[x]!==undefined){
            res.push(x)
        
          }
        }
      })
      setListSegments(res)
    }

    /*if(conditionsWhere?.[categoryName]!==undefined){
      Object.keys(conditionsWhere?.[categoryName]).map(x=>{
        if(x!=="categoryName" && x!=="segment" && x!=="fieldName" && x!=="type"){
          if(comboDataSt?.[categoryName]?.[x]!==undefined){
            res.push(<option style={{color:"yellow"}} disabled>seg{x}</option>)
            Object.keys(conditionsWhere?.[categoryName]?.[x]).map(y=>{
              
              if(conditionsWhere?.[categoryName]?.[x]?.[y]!==undefined){
                res.push(<option style={{color:"gray"}} disabled>&nbsp;{y}</option>)
                Object.keys(conditionsWhere?.[categoryName]?.[x]?.[y]).map(z=>{
                  if(z!=="categoryName" && z!=="segment" && z!=="fieldName" && z!=="type"){
                    res.push(<option>&nbsp;&nbsp;{z}</option>)
                    if(thereAreConditions==false)
                      setThereAreConditions(true)
                  }
                })
              }
            })
          }
        }
          
      })
      let r1=<div style={{display:"flex",flex:1,backgroundColor:"brown",color:"white",height:"20px",padding:0,margin:0,marginRight:"10px"}}><select style={{outline:"none",margin:0,padding:0,alignItems:"center",width:"100%",backgroundColor:"brown",color:"white",border:"none",height:"20px",lineHeight:"20px"}}><option>jorge</option>{res}</select></div>
      console.log("r1",r1)
      setDisplayCombo(r1)
      

    }*/
  }
  const displayFieldsCombo=(ss)=>{
    let res=[]
    //res.push("Select Field")
    console.log("rastreo",ss)
    if(conditionsWhere?.[categoryName]?.[ss]!==undefined){
    
      console.log("rastreo",Object.keys(conditionsWhere?.[categoryName]?.[ss]))
      Object.keys(conditionsWhere?.[categoryName]?.[ss]).map(x=>{
        if(x!=="categoryName" && x!=="segment" && x!=="fieldName" && x!=="type"){
          if(conditionsWhere?.[categoryName]?.[ss]?.[x]!==undefined){
            res.push(x)
        
          }
        }
      })
      setListFields(res)
    }
  }

  const displayRulesCombo=(ss,ff)=>{
    let res=[]
    //res.push("Select Rule")

    if(conditionsWhere?.[categoryName]?.[ss]?.[ff]!==undefined){
    
      
      Object.keys(conditionsWhere?.[categoryName]?.[ss]?.[ff]).map(x=>{
        if(x!=="categoryName" && x!=="segment" && x!=="fieldName" && x!=="type"){
          if(conditionsWhere?.[categoryName]?.[ss]?.[ff]?.[x]!==undefined){
            res.push(x)
        
          }
        }
      })
      setListRules(res)
    }
  }

  const displayCurrentMainCategory=()=>{
    if(typeof conditionsWhere?.[categoryName]?.["main"]=="object")
      return conditionsWhere?.[categoryName]?.["main"]?.["rule"]
    else
      return "none"
  }
    

  
  


  return (
    <Dialog 
      open={open}
      closeDialog={toggleDialog} 
      headline={"Category: "+categoryName+", Setting Main Where Clause"}
   >     
  
      <p style={{backgroundColor:"brown",color:"white",border:"none",outline:"none",padding:"3px",marginBottom:"5px"}}>Current main category: {displayCurrentMainCategory()}</p>
      <select style={{border:"none",outline:"none",padding:0,marginLeft:"-3px",fontFamily:"inherit", fontSize:"inherit",marginBottom:"5px"}} onChange={(e)=>setIsWhereCondition(e.target.value)}
      value={isWhereCondition}>
        <option value="none">None</option>
        <option value="where">Where condition</option>
      </select>

      {isWhereCondition=="where" && 
       <>
   
    
      <div style={{display:"flex",flex:1,backgroundColor:"brown",color:"white",height:"20px",padding:0,margin:0,marginRight:0,marginBottom:"5px"}}>
        <select  onChange={(e)=>{
          setSelectedSegment(e.target.value)
          setSelectedField("")
          setSelectedRule("")
          console.log("rastreo1",e.target.value)
          displayFieldsCombo(e.target.value)}
        }
        value={selectedSegment}
          style={{outline:"none",margin:0,padding:0,alignItems:"center",width:"100%",backgroundColor:"brown",color:"white",border:"none",height:"20px",lineHeight:"20px"}}>
            <option value="">Select Segment</option>
            {listSegments.map(x=><option value={x}>{x}</option>)}
        </select>
        </div>
      <div style={{display:"flex",flex:1,backgroundColor:"brown",color:"white",height:"20px",padding:0,margin:0,marginRight:0,marginBottom:"5px"}}>
        <select  onChange={(e)=>{
          setSelectedField(e.target.value)
          setSelectedRule("")
          displayRulesCombo(selectedSegment,e.target.value)
        }}
          value={selectedField}
          style={{outline:"none",margin:0,padding:0,alignItems:"center",width:"100%",backgroundColor:"brown",color:"white",border:"none",height:"20px",lineHeight:"20px"}}>
            <option value="">Select Field</option>
            {listFields.map(x=><option value={x}>{x}</option>)}
            
        </select>
      </div>
      <div style={{display:"flex",flex:1,backgroundColor:"brown",color:"white",height:"20px",padding:0,margin:0,marginRight:0,marginBottom:"5px"}}>
        <select  onChange={(e)=>{
          setSelectedRule(e.target.value)
          //displayRulesCombo(e.target.value)
        }}
          value={selectedRule}
          style={{outline:"none",margin:0,padding:0,alignItems:"center",width:"100%",backgroundColor:"brown",color:"white",border:"none",height:"20px",lineHeight:"20px"}}>
            <option value="">Select Rule</option>
            {listRules.map(x=><option value={x}>{x}</option>)}
            
        </select>
      </div>
  </>
      }
      
      
      
          
      
      
      
      <FormButton 
        style={{marginTop:"0px",opacity:(selectedRule=="" && isWhereCondition!=="none")?0.7:1}}
        onClick={()=>addCondition()}
        disabled={selectedRule=="" && isWhereCondition!=="none"}
      >Set Main Where</FormButton>
  {/*<FormInput placeholder="Name of the Field" 
      value={compositeFieldName}
      onChange={(e)=>setCompositeFieldName(e.target.value)}
      />
      {!primero &&
        (stringFields.length>0 ? 
          <select onChange={(e)=>setOperator(e.target.value)} 
          value={operator}>
            {
              stringOperators.map(x=><option value={x}>{x}</option>)
            }
        </select> : 
            <select onChange={(e)=>setOperator(e.target.value)}
            value={operator}>
            {
            numberOperators.map(x=><option value={x}>{x}</option>)
            }
            </select>)}
            {primero &&
        <select 
        onChange={e=>setOperator(e.target.value)}
        value={operator}>
          {
            initalOperators.map(x=><option value={x}>{x}</option>)
          }
        </select>
      }
      {operator=="add text" &&
      <>
        <FormInput placeholder="write text"
        type={addTextNumber?"number":"text"}
        value={addText}
        onChange={(e)=>setAddText(e.target.value)}></FormInput>
        <br/><input type="checkbox" onChange={
          (e)=>{
            if(e.target.checked==true){
              setAddTextNumber(true)
              
            }else{
              setAddTextNumber(false)
            }
            setAddText("")
          }
      }
        /> <span style={{color:"black"}}>Number</span>
      </>
      }
      {operator=="substring" && 
      <>
        <FormInput type="number"
         placeholder="from"
         onChange={(e)=>setStart(e.target.value)}></FormInput>
        <FormInput type="number" 
        placeholder="No. of chars"
        onChange={e=>setChars(e.target.value)}>
        </FormInput>
      </>
      }
      
       {(operator!=="add text") &&  
        <select onChange={(e)=>{
          setField(e.target.value)
        }}>
       
      
      {otmCategoryFields.map(x=>{
        
        return <option value={x.name1}>{x.name1}</option>
      })}
      {compFieldsArray[specificOtmName]?.map(x=>{
        
        return <option value={x.name1}>{x.name1}</option>
      })}
      </select>
      }
      <FormButton onClick={()=>{
        let sf=stringFields
        //console.log("searchtype",searchType(field),operator)

        if(operator!=="add text" && operator!=="substring" && operator!=="concat"){
          let t=searchType(field)
          if(t=="string"){
            
            //setIsString(true)
            sf=[...stringFields,field]
            //setStringFields((e)=>([...e,field]))
          
          }else
            setIsString(false)
          if(primero==true){
            updateNumberOperatorsforConcat([operator,field],sf)
            //setCompositeField(e=>([field]))
            //setPrimero(false)
          }else{
            updateNumberOperatorsforConcat([...compositeField,operator,field],sf)
            //setCompositeField(e=>([...e,operator,field]))
          }

        }else if(operator=="concat"){
          sf=[...stringFields,field]
          //setStringFields(sf)
          updateNumberOperatorsforConcat([...compositeField,operator,field],sf)
        
        }else if(operator=="add text"){
          if(!addTextNumber)
            sf=[...stringFields,addText]
            //console.log("alarm",[...compositeField,operator,{op:"add text",type:addTextNumber?"number":"string",value:addTextNumber?parseInt(addText):addText,field:`${addText}`}])
          //setStringFields(sf)
          updateNumberOperatorsforConcat([...compositeField,operator,{op:"add text",type:addTextNumber?"number":"string",value:addTextNumber?parseFloat(addText):addText,field:`${addText}`}],sf)
        }else if(operator=="substring"){
          sf=[...stringFields,field]
          //setStringFields(sf)
          updateNumberOperatorsforConcat([...compositeField,operator,{op:"substring",start,chars,field}],sf)
        } else{
          updateNumberOperatorsforConcat([...compositeField,operator,field,pr],sf)
        }

      }}>Add</FormButton>
      <FormButton onClick={()=>{
        
        setCompFieldsArray(e=>({...e,[specificOtmName]:[
          ...e[specificOtmName],
          {
            name1:compositeFieldName,
            structure:compositeField,
            compositeField:true,
            type:checkIsNumber()?"number":"string"
          }]}))
          
      }}>
        Add CompositeField
      </FormButton>

      <DisplayList compositeField={compositeField}
      setCompositeField={setCompositeField}
    updateNumberOperatorsforConcat={updateNumberOperatorsforConcat}></DisplayList>*/}
    </Dialog>
  )
}
