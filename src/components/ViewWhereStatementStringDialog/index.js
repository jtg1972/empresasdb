import React,{useState,useEffect} from 'react'
import Dialog from '../Dialog'
import FormButton from '../Forms/FormButton'
import FormInput from '../Forms/FormInput'
import './styles.scss'
//en las clausulas where de cada campo no puede haber referencias
//circulares porque la primera existe antes que la segunda por lo que
//no se pueden incluir mutuamente
export const ViewWhereStatementStringDialog=({
  open,
  toggleDialog,
  addConditionWhereArray,
  setAddConditionWhereArray,
  setConditionsWhere,
  categoryName,
  segment,
  fieldName
})=>{
  const printHeader=()=>{
    return <div style={{display:"flex",flexDirection:"row",
    width:"100%",flexGrow:0,backgroundColor:"black",color:"white"}}>
    
    <div style={{width:"120px",display:"flex",flexDirection:"column",backgroundColor:"black",color:"white"}}>
    <p style={{backgroundColor:"black",color:"white",paddingLeft:"3px",flex:1}}>Logical Operator</p>
    </div>
    <div style={{width:"120px",display:"flex",flexDirection:"column",backgroundColor:"black",color:"white"}}>
    <p style={{backgroundColor:"black",color:"white",paddingLeft:"3px",flex:1}}>String Operator</p>
    </div>
    <div style={{flex:1,flexGrow:0,marginLeft:"5px",display:"flex"/*flex:"1 0 0",display:"flex",flexDirection:"column"*/}}>
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
  justifyContent:"space-between",flex:1,flexGrow:0}}>
    
    <div style={{width:"120px",display:"flex",flexDirection:"column"}}>
    {addConditionWhereArray?.map((x,index)=>{
    if(index%3==0){
      return <div style={{display:"flex",
      justifyContent:"space-between",flex:"1 0 0"}}>
        <p style={{color:"black",flex:"1 0 0",overflow:"hidden",whiteSpace:"nowrap"}}>{x}</p>
            
      </div>
    }
    
    })}
    </div>
    <div style={{width:"120px",flexGrow:0/*flex:"1 0 0",display:"flex",flexDirection:"column"*/}}>
      {addConditionWhereArray?.map((x,index)=>{
      
      if(index%3==1){
        
          return <div style={{display:"flex",flexDirection:"row",
          justifyContent:"space-between",flex:1,flexGrow:0} }>
         
          
            <p style={{color:"black",flex:1,marginLeft:"5px",whiteSpace:"nowrap",/*flex:1,flexGrow:0,overflow:"hidden"*/}}>
              {addConditionWhereArray[index]=="wherePrevious"?"rule":addConditionWhereArray[index]

              }</p>
          
          </div>
        
      }
      })}
      </div>
      <div style={{flex:1,marginLeft:"5px",marginRight:"0"/*,display:"flex",flexDirection:"column"*/}}>
      {addConditionWhereArray?.map((x,index)=>{
    if(index%3==2){

      return <div style={{display:"flex",flexDirection:"row",
          justifyContent:"space-between",flex:1,flexGrow:0} }>
         
          
            <p style={{color:"black",flex:1,marginLeft:"0px",color:"black",whiteSpace:"nowrap",overflowX:"hidden"/*flex:1,flexGrow:0,overflow:"hidden"*/}}>
              {addConditionWhereArray[index-1]!=="between"?
              addConditionWhereArray[index]:
              `${addConditionWhereArray[index]["initial"]} to ${addConditionWhereArray[index]["final"]}`}</p>
          
          </div>
    }})}
    </div>


  
    
    
    
    </div>
    </Dialog>  


  
}


