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
  return <Dialog
    open={open}
    closeDialog={toggleDialog}
    headline={"Category: "+categoryName+(segment!==""?", Segment: "+segment:"")+", Field: "+fieldName}
    >
  <div style={{display:"flex",flexDirection:"row",
  justifyContent:"space-between",width:"100px",flexGrow:0}}>
    
    <div style={{width:"60px",display:"flex",flexDirection:"column"}}>
    {addConditionWhereArray?.map((x,index)=>{
    if(index%2==0){
      return <div style={{display:"flex",
      justifyContent:"space-between",flex:"1 0 0"}}>
        <p style={{color:"black",flex:"1 0 0",overflow:"hidden",whiteSpace:"nowrap"}}>{x}</p>
            
      </div>
    }
    
    })}
    </div>
    <div style={{flex:1,flexGrow:0/*flex:"1 0 0",display:"flex",flexDirection:"column"*/}}>
      {addConditionWhereArray?.map((x,index)=>{
      
      if(index%2==1){
        
          return <div style={{display:"flex",flexDirection:"row",
          justifyContent:"space-between",flex:1,flexGrow:0} }>
         
          
            <p style={{color:"black",width:"100%",marginLeft:"5px"/*flex:1,flexGrow:0,overflow:"hidden"*/}}>{addConditionWhereArray[index].rule}</p>
          
          </div>
        
      }
      })}
      </div>
     

    
    
    
    
    </div>
    </Dialog>
      


  
}
