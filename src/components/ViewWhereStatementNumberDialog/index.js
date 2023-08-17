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
  return <Dialog 
  open={open}
  closeDialog={toggleDialog} 
  headline={"Category: "+categoryName+(segment!==""?", Segment: "+segment:"")+", Field: "+fieldName}
    
  >
  <div style={{display:"flex",flexDirection:"row",
  justifyContent:"space-between",flex:1,flexGrow:0}}>
    
    <div style={{width:"60px",display:"flex",flexDirection:"column"}}>
    {addConditionWhereArray?.map((x,index)=>{
    if(index%3==0){
      return <div style={{display:"flex",
      justifyContent:"space-between",flex:"1 0 0"}}>
        <p style={{color:"black",flex:"1 0 0",overflow:"hidden",whiteSpace:"nowrap"}}>{x}</p>
            
      </div>
    }
    
    })}
    </div>
    <div style={{width:"25px",flexGrow:0/*flex:"1 0 0",display:"flex",flexDirection:"column"*/}}>
      {addConditionWhereArray?.map((x,index)=>{
      
      if(index%3==1){
        
          return <div style={{display:"flex",flexDirection:"row",
          justifyContent:"space-between",flex:1,flexGrow:0} }>
         
          
            <p style={{color:"black",width:"275px",marginLeft:"5px"/*flex:1,flexGrow:0,overflow:"hidden"*/}}>{addConditionWhereArray[index]=="wherePrevious"?"rule":addConditionWhereArray[index]}</p>
          
          </div>
        
      }
      })}
      </div>
      <div style={{width:"100px",marginLeft:"5px",marginRight:"5px"/*,display:"flex",flexDirection:"column"*/}}>
      {addConditionWhereArray?.map((x,index)=>{
    if(index%3==2){

      return <div style={{display:"flex",flexDirection:"row",
          justifyContent:"space-between",flex:1,flexGrow:0} }>
         
          
            <p style={{color:"black",width:"275px",marginLeft:"5px",color:"black"/*flex:1,flexGrow:0,overflow:"hidden"*/}}>{addConditionWhereArray[index]}</p>
          
          </div>
    }})}
    </div>


       </div>
    
    
    
    
    </Dialog>  
}