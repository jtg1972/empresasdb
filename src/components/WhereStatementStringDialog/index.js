import React,{useState,useEffect} from 'react'
import Dialog from '../Dialog'
import FormButton from '../Forms/FormButton'
import FormInput from '../Forms/FormInput'
import './styles.scss'

const DisplayList=({compositeField,setCompositeField,
updateNumberOperatorsforConcat})=>{
  return <div style={{display:"flex",flexDirection:"row",
  justifyContent:"space-between",flex:1,flexGrow:0}}>
    
    <div style={{width:"60px",display:"flex",flexDirection:"column"}}>
    {compositeField.map((x,index)=>{
    if(index%2==0){
      return <div style={{display:"flex",
      justifyContent:"space-between",flex:"1 0 0"}}>
        <p style={{color:"black",flex:"1 0 0",overflow:"hidden",whiteSpace:"nowrap"}}>{x}</p>
            
      </div>
    }
    
    })}
    </div>
    <div style={{flex:1,flexGrow:0/*flex:"1 0 0",display:"flex",flexDirection:"column"*/}}>
      {compositeField.map((x,index)=>{
      
      if(index%2!=0){
        if(typeof compositeField[index]!=="object")
          return <div style={{display:"flex",flexDirection:"row",
          justifyContent:"space-between",flex:1,flexGrow:0} }>
         
          
            <p style={{color:"black",width:"275px",marginLeft:"5px"/*flex:1,flexGrow:0,overflow:"hidden"*/}}>{compositeField[index]}</p>
          
          </div>
        else
          return <div style={{display:"flex",flexDirection:"row",
          justifyContent:"space-between",flex:1,flexGrow:1}}>
         
          {compositeField[index]["op"]=="substring" &&
            <p className="ofx">{compositeField[index]["field"]} chars:{compositeField[index]["chars"]} from:{compositeField[index]["start"]}</p>
          }
          {compositeField[index]["op"]=="add text" &&
            <p className="ofx">{compositeField[index]["value"]}</p>
          }
          </div> 
      }
      })}
      </div>
      <div style={{width:"10px",marginLeft:"5px",marginRight:"5px"/*,display:"flex",flexDirection:"column"*/}}>
      {compositeField.map((x,index)=>{
    if(index%2==0){
      return <div style={{display:"flex",flexDirection:"column",
      justifyContent:"space-between",flex:"1 0 0"}}>
        
        <p style={{color:"red",flex:1}}
        onClick={()=>{
          let j=index
          let y=compositeField.filter((i,inx)=>{
            if(j==inx || j+1==inx)
              return false
            return true
          })
          let sf=[]
          for(let u=0;u<y.length;u++){
            if(u%2==0)
              
              //if(y[u]=="add text" || y[u]=="concat")
                //sf.push(y[u+1])
              if(y[u]=="add text")
                if(y[u+1].type=="string"){
                  sf.push(y[u+1].value)
                }
              if(y[u]=="concat")
                sf.push(y[u+1])
              if(y[u]=="substring")
                sf.push(y[u+1].field)
          }
          //console.log("sfff",sf)
          updateNumberOperatorsforConcat(y,sf)
          /*setCompositeField(o=>o.filter((i,inx)=>{
            if(j==inx || j+1==inx)
              return false
            return true
          }))*/
        
        }}>-</p>
      </div>
    }
    
    })}
    </div>
      


  </div>
}

export const WhereStatementStringDialog = ({
  open,
  toggleDialog,
  fieldName,
  categoryName,
  segment,
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



  return (
    <Dialog 
      open={open}
      closeDialog={toggleDialog} 
      headline={"Category: "+categoryName+(segment!==""?", Segment: "+segment:"")+", Field: "+fieldName}
        
    >
      <p>String dialog</p>
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
