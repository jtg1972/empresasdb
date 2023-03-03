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
              
              if(y[u]=="add text" || y[u]=="concat")
                sf.push(y[u+1])
              if(y[u]=="substring")
                sf.push(y[u+1].field)
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
  const initalOperators=["none","add text",/*"add field",*/"substring"]
  console.log("sfadd",stringFields,compositeField)
  let pr=true
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
    let u=otmCategoryFields.filter(
      x=>x.name1==name
    )
    if(u.length==1)
      return u[0].type
  }

  const updateNumberOperatorsforConcat=(arr,sf,pri=false)=>{
    let compFields=[]
    let strFields=[]
    let uno=false
    if(sf.length>0){
      if(arr.length==2){
        uno=true
        if(arr[0]!=="concat" && arr[0]!=="add text" && arr[0]!=="substring"){
          console.log("entro con dos")
          let u=searchType(arr[1])
          if(u=="string"){
            console.log("entro con dos string")

            strFields=[arr[1]]
          //if(arr[0]!=="substring")
            compFields=arr
          }else{
            console.log("entro con dos number")

            strFields=[]
            compFields=["none",arr[1]]
          }
          //compFields=["none",arr[1]]
          
          console.log("revisa ww",strFields,compFields)
          
            
        } 
        
        else{
          let u=searchType(arr[1])
          if(u=="string"){
            console.log("entro con dos string")

            strFields=[arr[1]]
          //if(arr[0]!=="substring")
            compFields=arr
          }else{
            console.log("entro con dos number")

            strFields=[]
            compFields=["none",arr[1]]
          }
          //strFields=[arr[1]]
          //compFields=arr

          /*let u=searchType(arr[1])
          if(u=="string"){
           strFields=[arr[1]]
            
          }else{
            strFields=[]
            compFields=["none",arr[1]]
          //strFields=sf
          compFields=arr*/
          console.log("revisa wy",strFields,compFields)

        }
      }else{
        console.log("revisa 1")
        compFields=arr.map((x,index)=>{
          console.log("revisa",x,index)
          if(index%2==0){
            if(index!==0){
              if(numberOperators.filter(y=>(y!=="add text" && y!=="concat" && y!=="substring" && y!=="none")).includes(x))
            
                return "concat"
              
              return x

            }else{
              console.log("entro cero")
              if(x!=="concat" && x!=="add text" && x!=="substring"){
                console.log("entro none")
                return "none"
                  
              }else 
                return x
            }
          }else
            return x
          
            
        })
      
        /*setCompositeField(arr.map((x,index)=>{
          if(index%2==0)
            if(numberOperators.filter(y=>(y!=="substring" && y!=="add text" && y!=="none")).includes(x))
            
              return "concat"
          return x
        }))*/
      }
        
        
          let sf1=[]
          for(let u=0;u<compFields.length;u++){
            if(u%2==0){
              if(compFields[u]=="add text" || compFields[u]=="concat" || compFields[u]=="add text" || compFields[u]=="none")
                sf1.push(compFields[u+1])
              if(compFields[u]=="substring")
                sf1.push(compFields[u+1].field)
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
      console.log("entro aqui pendejo")
      if(arr.length==2){
          console.log("x22")
          compFields=["none",arr[1]]
          console.log("revisa ww",strFields,compFields)
            
      }else if(arr.length>2) {
        console.log("x33")
        compFields=arr
        compFields[0]="none"
        console.log("revisa wy",strFields,compFields)

      }else if(arr.length==0)
        setStringFields([])
      setCompositeField(compFields)
     
      if(arr.length==0)
        setPrimero(true)
      else
        setPrimero(false)
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
        console.log("searchtype",searchType(field),operator)

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
          sf=[...stringFields,addText]
          //setStringFields(sf)
          updateNumberOperatorsforConcat([...compositeField,operator,addText],sf)
        }else if(operator=="substring"){
          sf=[...stringFields,field]
          //setStringFields(sf)
          updateNumberOperatorsforConcat([...compositeField,operator,{op:"substring",start,chars,field}],sf)
        } else{
          updateNumberOperatorsforConcat([...compositeField,operator,field,pr],sf)
        }

      }}>Add</FormButton>

      <DisplayList compositeField={compositeField}
      setCompositeField={setCompositeField}
      updateNumberOperatorsforConcat={updateNumberOperatorsforConcat}></DisplayList>
    </Dialog>
  )
}
