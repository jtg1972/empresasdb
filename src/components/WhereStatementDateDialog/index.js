import { valueFromAST } from 'graphql'
import React,{useState,useEffect} from 'react'
import DateTimePicker from '../DateTimePicker'
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
  fieldName,
  
})=>{
  let sig=false,sig1=false,sig2=false,sig3=false
  const displayHeaders=()=>{
    return <div style={{display:"flex",flexDirection:"row",
    flex:1,marginTop:"5px"}}>
      
      <div style={{display:"flex",width:"55px",flexDirection:"column",
      background:"black",color:"white"}}>
        <p>Log Op</p>
      </div>
      <div style={{display:"flex",width:"70px",flexDirection:"column",
      background:"black",color:"white"}}>
        <p>Comp Op</p>
      </div>
      <div style={{display:"flex",width:"215px",flexDirection:"column",
      background:"black",color:"white"}}>
        <p>Date</p>
      </div>
      <div style={{display:"flex",width:"15px",flexDirection:"column",
      background:"black",color:"white"}}>
        <p>-</p>
      </div>
    </div>

  }

  const formatDateTime=(d,m,y,h,min)=>{
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
    
    
    
    


  }

  const displayDate=(date)=>{
    let nvR=new Date(date)
    //let disp=nvR.getDate()+"/"+(nvR.getMonth()+1)+"/"+nvR.getFullYear()+" "+nvR.getHours()+":"+nvR.getMinutes()
    let disp=formatDateTime(nvR.getDate(),(nvR.getMonth()+1),nvR.getFullYear(),nvR.getHours(),nvR.getMinutes())
    return disp

  }
  return <div>
    {displayHeaders()}
    
  
  
  <div style={{display:"flex",flexDirection:"row",
  flex:1}}>
    
    <div style={{display:"flex",width:"55px",flexDirection:"column"}}>
    {addConditionWhereArray?.map((x,index)=>{
    if(index%3==0){
      
      sig=sig?false:true
      return <div style={{background:!sig?"lightgrey":"white",display:"flex",
      flex:"1 0 0"}}>
        <p style={{color:"black",flex:"1 0 0",overflow:"hidden",whiteSpace:"nowrap"}}>{addConditionWhereArray[index]}</p>
            
      </div>
    }
    
    })}
    </div>
    <div style={{width:"70px",display:"flex",flexDirection:"column"/*flex:"1 0 0",display:"flex",flexDirection:"column"*/}}>
      {addConditionWhereArray?.map((x,index)=>{
      
      if(index%3==1){
          sig1=sig1?false:true  
          return <div style={{background:!sig1?"lightgrey":"white",display:"flex",flexDirection:"column",
          flex:1,flexGrow:0} }>
         
          
            <p style={{color:"black",flex:1,marginLeft:"0px"/*flex:1,flexGrow:0,overflow:"hidden"*/}}>{addConditionWhereArray[index]=="wherePrevious"?"rule":addConditionWhereArray[index]}</p>
          
          </div>
        
      }
      })}
      </div>
      <div style={{width:"220px",marginLeft:"0px",marginRight:"0px",display:"flex",flexDirection:"column"/*,display:"flex",flexDirection:"column"*/}}>
      {addConditionWhereArray?.map((x,index)=>{
    if(index%3==2){
      sig2=sig2?false:true
      return <div style={{background:!sig2?"lightgrey":"white",display:"flex",flexDirection:"column",
          justifyContent:"space-between",flex:1,flexGrow:0} }>
         
          
            <p style={{color:"black",flex:1,marginLeft:"0px",color:"black",paddingRight:"5px",/*flex:1,flexGrow:0,overflow:"hidden"*/}}>{displayDate(addConditionWhereArray[index])}</p>
          
          </div>
    }})}
    </div>


    <div style={{width:"15px",marginLeft:"0px",marginRight:"0px"/*,display:"flex",flexDirection:"column"*/}}>
      {addConditionWhereArray?.map((x,index)=>{ 
        if(index%3==0){ 
        sig3=sig3?false:true
        return <p style={{background:!sig3?"lightgrey":"white",color:"red",flex:1}}
        onClick={()=>{
          let j=index
          let y=addConditionWhereArray.filter((i,inx)=>{
            if(j==inx || j+1==inx || j+2==inx)
              return false
            return true
          })

          if(index==0){//y.length==3){
            if(["<","=","<=",">",">=","!=","wherePrevious"].includes(y[1]))
              if(["and not","or not","not"].includes(y[0]))
                y[0]="not"
              else
                y[0]="none"
          }
          setAddConditionWhereArray(y)
        
        }}>-</p>
      }})}
    </div>
    
    
    
    </div>
      
</div>

  
}

export const WhereStatementDateDialog = ({
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
  const mathOperators=[">",">=","<","<=","=","!="]
  const logicalOperators=["and","or","and not","or not"]

  const initialLogicalOperators=["none","not"]
  const [mathOperator,setMathOperator]=useState(mathOperators[0])
  const [logicalOperator,setLogicalOperator]=useState(logicalOperators[0])
  const [initialLogicalOperator,setInitialLogicalOperator]=useState(initialLogicalOperators[0])
  const [valueRule,setValueRule]=useState({date:""})
  const [nameWhereClause,setNameWhereClause]=useState("")
  const [typeWhereDefinition,setTypeWhereDefinition]=useState("normal")
  const [added,setAdded]=useState(false)
  let p=conditionsWhere?.[categoryName]?.[segment]?.[fieldName]
  let iv=""
  if(p!==undefined){
    let sfcw=Object.keys(conditionsWhere?.[categoryName]?.[segment]?.[fieldName])
    
    if(sfcw.length>0){
      iv=sfcw[0]
    }
  }
  let [addConditionWhereArray,setAddConditionWhereArray]=useState([])

  const [fieldConditionWhere,setFieldConditionWhere]=useState(iv)
  let type
  
  useEffect(()=>{
    
    let cd2=valueRule["date"]==""?new Date():valueRule["date"]
    console.log("valueRuledate",valueRule["date"],cd2)
    let now_utc = Date.UTC(
      cd2.getUTCFullYear(), 
      cd2.getUTCMonth(),
      cd2.getUTCDate(), 
      cd2.getUTCHours(),
      cd2.getUTCMinutes(), 
      cd2.getUTCSeconds()
    );
    now_utc=new Date(now_utc)
    console.log("now_utc",now_utc)
      setValueRule({date:now_utc})
    
  },[])
  useEffect(()=>{
    //setTypeWhereDefinition("normal")
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

    let cd2=valueRule["date"]==""?new Date():valueRule["date"]
    console.log("valueRuledate",valueRule["date"]," y ",cd2)

    let now_utc = Date.UTC(
      cd2.getUTCFullYear(), 
      cd2.getUTCMonth(),
      cd2.getUTCDate(), 
      cd2.getUTCHours(),
      cd2.getUTCMinutes(), 
      cd2.getUTCSeconds()
    );
    now_utc=new Date(now_utc)
    console.log("now_utc",now_utc)
      setValueRule({date:now_utc})
    
    
  },[addConditionWhereArray])
  useEffect(()=>{
    if(open==true || added==true){
      setNameWhereClause("")
      setAddConditionWhereArray([])
      setTypeWhereDefinition("normal")
      setMathOperator(mathOperators[0])
      setInitialLogicalOperator(initialLogicalOperators[0])
      setLogicalOperator(logicalOperators[0])
      //setValueRule({date:""})
      setAdded(false)
      
    }

  },[categoryName,segment,fieldName,added,open])

  const checkRowAddOn=()=>{
    /*let nvR=new Date(valueRule)
    let disp=nvR.getDate()+"/"+(nvR.getMonth()+1)+"/"+nvR.getFullYear()+" "+nvR.getHours()+":"+nvR.getMinutes()
    console.log("valueRule",valueRule["date"])
    setValueRule(disp)
    */
   
     let x=new Date(valueRule["date"])
     console.log("x567",x,valueRule["date"])
     if(x=="Invalid Date")
        return false
      else
        return true
    console.log("uii false")
     return false
   
  }


  const checkPreviousAdd=()=>{
    let sfcw=conditionsWhere?.[categoryName]?.[segment]?.[fieldName]
    if(nameWhereClause=="")
      return true
    if(sfcw!=undefined && sfcw!=null){
      sfcw=Object.keys(sfcw)
      sfcw=sfcw.filter(x=>{
        if(x!=="categoryName" && x!=="segment" && x!=="fieldName" && x!=="type")
          return true
       return false
      })
  
      if(addConditionWhereArray.length==0)
        return true
      if(sfcw.includes(nameWhereClause))
        return true
      return false
    }else{
      if(addConditionWhereArray.length==0)
        return true
      return false
    }

  }

  const displayMathOperators=()=>{
    return(<select style={{backgroundColor:"brown",color:"white",border:"none",padding:0,margin:0,
    outline:"none",marginRight:"10px",height:"20px"}}
    onChange={(e)=>{
      setMathOperator(e.target.value)
    }}
    value={mathOperator}>
      {mathOperators.map(x=><option value={x}>{x}</option>)}
    </select>)


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
    console.log("valueRule",valueRule?.["date"])
    if(typeWhereDefinition=="normal"){
      if(addConditionWhereArray.length==0)
        acwa=[...acwa,initialLogicalOperator,mathOperator,valueRule?.["date"]]
      else  
        acwa=[...acwa,logicalOperator,mathOperator,valueRule?.["date"]]
        
      
    }
    else if(typeWhereDefinition=="previous"){
      if(addConditionWhereArray.length==0)
        acwa=[...acwa,initialLogicalOperator,"wherePrevious",fieldConditionWhere]
      else  
        acwa=[...acwa,logicalOperator,"wherePrevious",fieldConditionWhere]
    }
        
    console.log("acwa",acwa)
    setAddConditionWhereArray(acwa)
    
  }
  const addCondition=()=>{
    let mapeo=conditionsWhere
    if(mapeo[categoryName]==undefined){
      mapeo={...mapeo,[categoryName]:{}}
    }
    if(mapeo[categoryName][segment]==undefined){
      mapeo={...mapeo,[categoryName]:{...mapeo[categoryName],[segment]:{}}}
    }
    if(mapeo[categoryName][segment][fieldName]==undefined){
      mapeo={...mapeo,[categoryName]:{...mapeo[categoryName],[segment]:{
        ...mapeo[categoryName][segment],
        [fieldName]:{

      }}}}
    }
    
    
      mapeo={...mapeo,[categoryName]:{...mapeo[categoryName],[segment]:{
        ...mapeo[categoryName][segment],
        [fieldName]:{
          ...mapeo[categoryName][segment][fieldName],
          [nameWhereClause]:{
            name:nameWhereClause,
            rule:addConditionWhereArray
          },
          type:"date",
          categoryName,
          segment,
          fieldName
        }
      }}}
    
    console.log("mapeo",mapeo)
    setConditionsWhere(mapeo)
    setNameWhereClause("")
    setAdded(true)
    
  }

  


  return (
    <Dialog 
      open={open}
      closeDialog={toggleDialog} 
      headline={"Category: "+categoryName+(segment!==""?", Segment: "+segment:"")+", Field: "+fieldName}
        
    >
    
      <FormInput style={{width:"100%",border:"none",marginBottom:"5px",
      padding:0,outline:"none",border:"none"}}
      className="ph2" 
      onChange={e=>setNameWhereClause(e.target.value)}
      value={nameWhereClause}
      placeholder="Name of the where clause"/>
      {conditionsWhere?.[categoryName]?.[segment]?.[fieldName]!==undefined &&
          Object.keys(conditionsWhere?.[categoryName]?.[segment]?.[fieldName]).filter(x=>{
            if(x!=="categoryName" && x!=="segment" && x!=="fieldName" && x!=="type")
              return true
            return false
          }).length>0 &&
      <select onChange={e=>setTypeWhereDefinition(e.target.value)}
      style={{border:"none",margin:0,marginLeft:"-5px",padding:0,marginBottom:"5px",padding:0,outline:"none"}}
      value={typeWhereDefinition}>
        <option 
        value="previous"
        >
          Previously Defined Field Where Clause
        </option>
        <option 
        value="normal"
        
        >
          Define Where Clause
        </option>
      </select>}
      {typeWhereDefinition=="normal" &&
      <p style={{display:"flex",alignItems:"center",height:"20px",
      backgroundColor:"brown",color:"white"}}>
        {addConditionWhereArray.length>0 ?
        <p style={{backgroundColor:"brown",color:"white",width:"100px",height:"20px",padding:0,margin:0,marginRight:"10px"}}>{displayLogicalOperators()}</p>:
        <p style={{backgroundColor:"brown",color:"white",width:"100px",height:"20px",padding:0,margin:0,marginRight:"10px"}}>{displayInitialLogicalOperators()}</p>
            
        }

        <p style={{width:"70px", height:"20px",padding:0,margin:0,marginRight:"10px"}}>{displayMathOperators()}</p>
        <DateTimePicker style={{backgroundColor:"brown",color:"white",flex:1,border:"none",height:"20px",outline:"none",margin:0,marginLeft:0,marginRight:"10px"}}
       // onChange={e=>setValueRule(e.target.value)}
        //className="ph1"
        placeholder="choose a date"
        letterColor="white"
        placeholderColor="red"
        //type="number"
        value={valueRule["date"]}
        name="date"
        setFields={setValueRule}
        fields={valueRule}
        cd={valueRule["date"]}
        ></DateTimePicker>
        <FormButton style={{width:"60px", height:"20px",backgroundColor:"brown",color:"white",margin:0,padding:0,
        opacity:!checkRowAddOn()?0.7:1}}
        onClick={e=>{
          
          addWhereConditionInArray()
          //setValueRule({date:""})
        }}
        disabled={!checkRowAddOn()}
        >Add</FormButton>
        
      </p>}
      {typeWhereDefinition=="previous" &&
        <p style={{display:"flex",alignItems:"center",height:"20px"}}>
          {addConditionWhereArray.length>0?
           <p style={{backgroundColor:"brown",color:"white",width:"100px",height:"20px",padding:0,margin:0,marginRight:"10px"}}>{displayLogicalOperators()}</p>:
           <p style={{backgroundColor:"brown",color:"white",width:"100px",height:"20px",padding:0,margin:0,marginRight:"10px"}}>{displayInitialLogicalOperators()}</p>
          }
          
          {conditionsWhere?.[categoryName]?.[segment]?.[fieldName]!==undefined &&
          Object.keys(conditionsWhere?.[categoryName]?.[segment]?.[fieldName]).filter(x=>{
            if(x!=="categoryName" && x!=="segment" && x!=="fieldName" && x!=="type")
              return true
            return false
          }).length>0 &&
          <select style={{height:"20px",outline:"none",border:"none",backgroundColor:"brown",color:"white",
          margin:0,padding:0,flex:1}} onChange={(e)=>setFieldConditionWhere(e.target.value)}>
            
            {Object.keys(conditionsWhere?.[categoryName]?.[segment]?.[fieldName]).filter(x=>{
            if(x!=="categoryName" && x!=="segment" && x!=="fieldName" && x!=="type")
              return true
            return false
          }).map(x=>
              <option value={x}>{x}</option>
          )}
          </select>
          }
          <FormButton style={{width:"60px",height:"20px",margin:"0px",padding:"0px"}}
          disabled={checkRowAddOn()?false:true} opacity={checkRowAddOn()?1:0.7}
          onClick={e=>{
            
            addWhereConditionInArray()
          }}
          >Add</FormButton>
        
        
      </p>}
      <DisplayList 
        addConditionWhereArray={addConditionWhereArray}
        setAddConditionWhereArray={setAddConditionWhereArray}
        setConditionsWhere={setConditionsWhere}
        categoryName={categoryName}
        segment={segment}
        fieldName={fieldName}
      />
      
      <FormButton 
        style={{marginTop:"10px",opacity:checkPreviousAdd()?0.7:1}}
        onClick={()=>addCondition()}
        disabled={checkPreviousAdd()}>Add Rule Where</FormButton>
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
