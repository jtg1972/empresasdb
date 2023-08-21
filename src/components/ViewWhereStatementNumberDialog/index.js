import React,{useState,useEffect} from 'react'
import Dialog from '../Dialog'
import FormButton from '../Forms/FormButton'
import FormInput from '../Forms/FormInput'
import './styles.scss'

export const ViewWhereStatementNumberDialog=({
  open,
  toggleDialog,
  addConditionWhereArray,
  setAddConditionWhereArray,
  setConditionsWhere,
  categoryName,
  segment,
  fieldName,
  
})=>{
  const printHeader=()=>{
    return <div style={{display:"flex",flexDirection:"row",
    width:"100%",flexGrow:0,backgroundColor:"black",color:"white"}}>
    
    <div style={{width:"33%",display:"flex",flexDirection:"column",backgroundColor:"black",color:"white"}}>
    <p style={{backgroundColor:"black",color:"white",paddingLeft:"3px",flex:1}}>Logical Operator</p>
    </div>
    <div style={{width:"40%",display:"flex",flexDirection:"column",backgroundColor:"black",color:"white"}}>
    <p style={{backgroundColor:"black",color:"white",paddingLeft:"3px",flex:1}}>Boolean Operator</p>
    </div>
    <div style={{width:"27%",flexGrow:0,marginLeft:"5px",display:"flex"/*flex:"1 0 0",display:"flex",flexDirection:"column"*/}}>
    <p style={{backgroundColor:"black",color:"white",flex:1}}>Value</p>
    </div>
    </div>
   
  
  }
  return <Dialog 
  open={open}
  closeDialog={toggleDialog} 
  headline={"Category: "+categoryName+(segment!==""?", Segment: "+segment:"")+", Field: "+fieldName}
    
  >
  {printHeader()}

  <div style={{display:"flex",flexDirection:"row",
  width:"100%"}}>
    <div style={{width:"33%",display:"flex",flexDirection:"column"}}>
    {addConditionWhereArray?.map((x,index)=>{
    if(index%3==0){
      return <div style={{display:"flex",
     flex:1,flexDirection:"column"}}>
        <p style={{color:"black",flex:1,overflow:"hidden",whiteSpace:"nowrap"}}>{x}</p>
            
      </div>
    }
    
    })}
    </div>
    <div style={{width:"40%",display:"flex",flexDirection:"column"/*flex:"1 0 0",display:"flex",flexDirection:"column"*/}}>
      {addConditionWhereArray?.map((x,index)=>{
      
      if(index%3==1){
        
          return <div style={{display:"flex",flexDirection:"column",
          flex:1} }>
         
          
            <p style={{color:"black",marginLeft:"5px",flex:1/*flex:1,flexGrow:0,overflow:"hidden"*/}}>{addConditionWhereArray[index]=="wherePrevious"?"rule":addConditionWhereArray[index]}</p>
          
          </div>
        
      }
      })}
      </div>
      <div style={{width:"27%",marginRight:"2px",display:"flex",flexDirection:"column"/*,display:"flex",flexDirection:"column"*/}}>
      {addConditionWhereArray?.map((x,index)=>{
    if(index%3==2){

      return <div style={{display:"flex",flexDirection:"column",
        flex:1}}>
         
          
            <p style={{color:"black",flex:1,color:"black"/*flex:1,flexGrow:0,overflow:"hidden"*/}}>{addConditionWhereArray[index]}</p>
          
          </div>
    }})}
    </div>


       </div>
    
    
    
    
    </Dialog>  
}