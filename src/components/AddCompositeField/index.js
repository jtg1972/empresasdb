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
         
          
            <p className="ofx">{compositeField[index]["field"]} chars:{compositeField[index]["chars"]} from:{compositeField[index]["start"]}</p>
          
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
              if(y[u]=="add text" || y[u]=="concat" || y[u]=="substring")
                sf.push(y[u+1])
          }
          console.log("sfff",sf)
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

export const AddCompositeField = ({
  open,
  toggleDialog,
  otmCategoryFields
}) => {
  const [field,setField]=useState("")
  const [compositeField,setCompositeField]=useState([])
  const [primero,setPrimero]=useState(true)
  const [isString,setIsString]=useState(false)
  const [operator,setOperator]=useState("")
  const [addText,setAddText]=useState("")
  const [stringFields,setStringFields]=useState([])
  const [start,setStart]=useState(0)
  const [chars,setChars]=useState(0)
  const numberOperators=["+","-","*","/","substring","add text"]
  const stringOperators=["concat","substring","add text"]
  const initalOperators=["none","add text","add field","substring"]
  console.log("sfadd",stringFields,compositeField)

  useEffect(()=>{

    setField(otmCategoryFields[0]?.name1)
    setCompositeField([])
    setStringFields([])
    setOperator("none")/*()=>{
      if(otmCategoryFields[0]?.type=="string")
        return stringOperators[0]
      else
        return numberOperators[0]
    })*/
    setPrimero(true)
      
      
    }

  ,[otmCategoryFields])

  useEffect(()=>{
    if(primero==false){
    if(stringFields.length==0)
      setOperator(numberOperators[0])
    else  
      setOperator(stringOperators[0])
    }
  },[stringFields,primero])

  const searchType=(name)=>{
    let u=otmCategoryFields.filter(
      x=>x.name1==name
    )
    if(u.length==1)
      return u[0].type
  }

  const updateNumberOperatorsforConcat=(arr,sf)=>{
    if(sf.length>0){
      console.log("arryy",arr,arr.map((x,index)=>{
        if(index%2==0)
        if(numberOperators.filter(y=>(y!=="substring" && y!=="add text" && y!=="none")).includes(x))
          
            return "concat"
        return x
      }))
      let scf=arr.map((x,index)=>{
        if(index%2==0)
          if(numberOperators.filter(y=>(y!=="substring" && y!=="add text" && y!=="none")).includes(x))
          
            return "concat"
        return x
      })
      setCompositeField(arr.map((x,index)=>{
        if(index%2==0)
          if(numberOperators.filter(y=>(y!=="substring" && y!=="add text" && y!=="none")).includes(x))
          
            return "concat"
        return x
      }))
      let sf1=[]
      for(let u=0;u<scf.length;u++){
        if(u%2==0)
          if(scf[u]=="add text" || scf[u]=="concat" || scf[u]=="substring")
            sf1.push(scf[u+1])
      }
      setStringFields(sf1)
    }else{
      setCompositeField(arr)
      setStringFields(sf)
      setPrimero(true)
    }

  }



  return (
    <Dialog 
      open={open}
      closeDialog={toggleDialog} 
      headline="Add Composite Field"
    >
      
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
        <FormInput placeholder="write text"
        onChange={(e)=>setAddText(e.target.value)}></FormInput>
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
      </select>
      }
      <FormButton onClick={()=>{
        let sf=stringFields
        if(operator!=="add text" && operator!=="substring"){
          let t=searchType(field)
          if(t=="string"){
            
            setIsString(true)
            sf=[...stringFields,field]
            setStringFields((e)=>([...e,field]))
          
          }else
            setIsString(false)
          if(primero==true){
            updateNumberOperatorsforConcat([operator,field],stringFields)
            //setCompositeField(e=>([field]))
            setPrimero(false)
          }else{
            updateNumberOperatorsforConcat([...compositeField,operator,field],sf)
            //setCompositeField(e=>([...e,operator,field]))
          }
        }else if(operator=="add text"){
          sf=[...stringFields,addText]
          setStringFields(sf)
          updateNumberOperatorsforConcat([...compositeField,operator,addText],sf)
        }else if(operator=="substring"){
          sf=[...stringFields,field]
          setStringFields(sf)
          updateNumberOperatorsforConcat([...compositeField,operator,{op:"substring",start,chars,field}],sf)
        } 

      }}>Add</FormButton>

      <DisplayList compositeField={compositeField}
      setCompositeField={setCompositeField}
      updateNumberOperatorsforConcat={updateNumberOperatorsforConcat}></DisplayList>
    </Dialog>
  )
}
