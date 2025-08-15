import Dialog from "../Dialog"

export const ViewMainWhereCondition=({
  open,
  toggleDialog,
  addConditionWhereArray,
  setAddConditionWhereArray,
  setConditionsWhere,
  conditionsWhere,
  categoryName,
  segment,
  field,
  rule
})=>{

  const printHeader=()=>{
    return <div style={{display:"flex",flexDirection:"row",
    width:"100%",flexGrow:0,backgroundColor:"black",color:"white"}}>
    
    <div style={{flex:1,display:"flex",flexDirection:"column",backgroundColor:"black",color:"white"}}>
    <p style={{backgroundColor:"black",color:"white",paddingLeft:"3px"}}>Rule</p>
    </div>
    </div>
   
  
  }
  return <Dialog
    open={open}
    closeDialog={toggleDialog}
    headline={"View main rule of category: "+categoryName+(segment!==""?". Found in segment "+segment:"")+", and in field "+field}
    >

  {printHeader()}
  <div style={{display:"flex",flexDirection:"row",
  width:"100%",flexGrow:0}}>
    
    <p style={{color:"black"}}>{conditionsWhere[categoryName]?.["main"]?.["rule"]==undefined?"none":conditionsWhere[categoryName]?.["main"]?.["rule"]  
    }</p>
    </div>
    </Dialog>
      


  
}
