import React,{useState,useEffect} from 'react'
import Dialog from '../Dialog'
import FormButton from '../Forms/FormButton'

const DisplayList=({compositeField})=>{
  return <div style={{display:"flex",flexDirection:"row",
  justifyContent:"space-between"}}>
    <div>
    {compositeField.map((x,index)=>{
    if(index%2==0){
      return <div style={{display:"flex",flexDirection:"row",
      justifyContent:"space-between"}}>
        <p style={{color:"black"}}>{x}</p>
            
      </div>
    }
    
    })}
    </div>
    <div>
      {compositeField.map((x,index)=>{
      if(index%2==0){
        return <div style={{display:"flex",flexDirection:"row",
        justifyContent:"space-between"}}>
         
          {index+1<compositeField.length &&
          <p style={{color:"black"}}>{compositeField[index+1]}</p>}
          
        </div>
      }
      })}
      </div>
      <div>
      {compositeField.map((x,index)=>{
    if(index%2==0){
      return <div style={{display:"flex",flexDirection:"row",
      justifyContent:"space-between"}}>
        
        <p style={{color:"red"}}>-</p>
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
  const [stringFields,setStringFields]=useState([])
  const numberOperators=["+","-","*","/"]
  const stringOperators=["concat","substring"]

  useEffect(()=>{

    setField(otmCategoryFields[0]?.name1)
    setCompositeField([])
    setStringFields([])
    setOperator(()=>{
      if(otmCategoryFields[0]?.type=="string")
        return stringOperators[0]
      else
        return numberOperators[0]
    })
    setPrimero(true)
      
      
    }

  ,[otmCategoryFields])

  useEffect(()=>{
    if(stringFields.length==0)
      setOperator(numberOperators[0])
    else  
      setOperator(stringOperators[0])
  },[stringFields])

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
        if(index%2!==0)
          if(numberOperators.includes(x))
            return "concat"
        return x
      }))
      setCompositeField(arr.map((x,index)=>{
        if(index%2!==0)
          if(numberOperators.includes(x))
            return "concat"
        return x
      }))
    }else
      setCompositeField(arr)

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

            <select onChange={(e)=>{
        setField(e.target.value)
      }}>
      {otmCategoryFields.map(x=>{
        
        return <option value={x.name1}>{x.name1}</option>
      })}
      </select>
      <FormButton onClick={()=>{
        let sf=stringFields
        let t=searchType(field)
        if(t=="string"){
          
          setIsString(true)
          sf=[...stringFields,field]
          setStringFields((e)=>([...e,field]))
        
        }else
          setIsString(false)
        if(primero==true){
          updateNumberOperatorsforConcat([field],stringFields)
          //setCompositeField(e=>([field]))
          setPrimero(false)
        }else{
          updateNumberOperatorsforConcat([...compositeField,operator,field],sf)
          //setCompositeField(e=>([...e,operator,field]))
        }
        

      }}>Add</FormButton>

      <DisplayList compositeField={compositeField}></DisplayList>
    </Dialog>
  )
}
