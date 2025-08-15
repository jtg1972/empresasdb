import React,{useState,useEffect} from 'react'
import Dialog from '../Dialog'
import FormButton from '../Forms/FormButton'
import FormInput from '../Forms/FormInput'
import './styles.scss'

export const ViewWhereStatementDateServerDialog=({
  open,
  toggleDialog,
  addConditionWhereArray,
  setAddConditionWhereArray,
  setConditionsWhere,
  categoryName,
  segment,
  fieldName,
  
})=>{
  const displayDate=(date)=>{
    let nd=new Date(date)
    let m=nd.getMonth()
    let d=nd.getDate()
    let y=nd.getFullYear()
    let h=nd.getHours()
    let min=nd.getMinutes()
    let res=""
    if(m.toString().length==1)
      res="0"+(m+1)+"/"
    else  
      res=(m+1)+"/"
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
  const printHeader=()=>{
    return <div style={{display:"flex",flexDirection:"row",
    width:"100%",flexGrow:0,backgroundColor:"black",color:"white"}}>
    
    <div style={{width:"70px",display:"flex",flexDirection:"column",backgroundColor:"black",color:"white"}}>
    <p style={{backgroundColor:"black",color:"white",flex:1}}>Log Op</p>
    </div>
    <div style={{width:"100px",display:"flex",flexDirection:"column",backgroundColor:"black",color:"white"}}>
    <p style={{backgroundColor:"black",color:"white",flex:1}}>Comp Op</p>
    </div>
    <div style={{width:"250px",background:"red",flexGrow:0,display:"flex"/*flex:"1 0 0",display:"flex",flexDirection:"column"*/}}>
    <p style={{backgroundColor:"black",color:"white",flex:1}}>Date</p>
    </div>
    </div>
   
  
  }
  let r1=false,r2=false,r3=false
  return <Dialog 
  open={open}
  closeDialog={toggleDialog} 
  headline={"Category: "+categoryName+", Field: "+fieldName}
    
  >
  {printHeader()}

  <div style={{display:"flex",flexDirection:"row",
  width:"100%"}}>
    <div style={{width:"70px",display:"flex",flexDirection:"column"}}>
    {addConditionWhereArray?.map((x,index)=>{
    if(index%3==0){
      r1=!r1
      return <div style={{display:"flex",
     flex:1,flexDirection:"column",background:r1?"white":"lightgray"}}>
        <p style={{color:"black",flex:1,overflow:"hidden",whiteSpace:"nowrap"}}>{x}</p>
            
      </div>
    }
    
    })}
    </div>
    <div style={{width:"100px",display:"flex",flexDirection:"column"/*flex:"1 0 0",display:"flex",flexDirection:"column"*/}}>
      {addConditionWhereArray?.map((x,index)=>{
      
      if(index%3==1){
          r2=!r2  
          return <div style={{display:"flex",flexDirection:"column",
          flex:1,background:r2?"white":"lightgray"} }>
         
          
            <p style={{color:"black",flex:1/*flex:1,flexGrow:0,overflow:"hidden"*/}}>{addConditionWhereArray[index]=="wherePrevious"?"rule":addConditionWhereArray[index]}</p>
          
          </div>
        
      }
      })}
      </div>
      <div style={{width:"250px",display:"flex",flexDirection:"column"/*,display:"flex",flexDirection:"column"*/}}>
      {addConditionWhereArray?.map((x,index)=>{

    if(index%3==2){
      r3=!r3
      return <div style={{display:"flex",flexDirection:"column",
        flex:1,background:r3?"white":"lightgray"}}>
         
          
            <p style={{color:"black",flex:1,color:"black"/*flex:1,flexGrow:0,overflow:"hidden"*/}}>{displayDate(addConditionWhereArray[index])}</p>
          
          </div>
    }})}
    </div>


       </div>
    
    
    
    
    </Dialog>  
}