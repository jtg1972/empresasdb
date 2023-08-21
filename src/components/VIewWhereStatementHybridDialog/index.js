import Dialog from "../Dialog"

export const ViewWhereStatementHybridDialog=({
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
    
    <div style={{width:"80px",display:"flex",flexDirection:"column",backgroundColor:"black",color:"white"}}>
    <p style={{backgroundColor:"black",color:"white",paddingLeft:"3px"}}>Operator</p>
    </div>
    <div style={{flex:1,flexGrow:0,marginLeft:"5px"/*flex:"1 0 0",display:"flex",flexDirection:"column"*/}}>
    <p style={{backgroundColor:"black",color:"white"}}>Rule</p>
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
  width:"100%",flexGrow:0}}>
    
    <div style={{width:"80px",display:"flex",flexDirection:"column"}}>
   
    {addConditionWhereArray?.map((x,index)=>{
    if(index%2==0){
      return <div style={{display:"flex", width:"80px",
      flex:"1 0 0"}}>
        
        <p style={{color:"black",flex:"1 0 0",overflow:"hidden",whiteSpace:"nowrap"}}>{x}</p>
            
      </div>
    }
    
    })}
    </div>
    <div style={{flex:1,flexGrow:0/*flex:"1 0 0",display:"flex",flexDirection:"column"*/}}>
      {addConditionWhereArray?.map((x,index)=>{
      
      if(index%2==1){
        
          return <div style={{display:"flex",flexDirection:"row",
          flex:1,flexGrow:0}}>
            <p style={{textAlign:"left",color:"black",width:"100%",marginLeft:"5px"/*flex:1,flexGrow:0,overflow:"hidden"*/}}>{addConditionWhereArray[index].rule}</p>
          
          </div>
        
      }
      })}
      </div>
     

    
    
    
    
    </div>
    </Dialog>
      


  
}
