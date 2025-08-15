import Dialog from "../Dialog"

export const ViewMainWhereConditionServer=({
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
  console.log("entroaquisisi")

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
    headline={"View main rule of category: "+categoryName+", and in field "+(conditionsWhere[categoryName]?.["main"]?.["field"]==undefined?"none":conditionsWhere[categoryName]?.["main"]?.["field"])}
    >

  {printHeader()}
  <div style={{display:"flex",flexDirection:"row",
  width:"100%",flexGrow:0}}>
    
    <p style={{color:"black"}}>{conditionsWhere[categoryName]?.["main"]?.["rule"]==undefined?"none":conditionsWhere[categoryName]?.["main"]?.["rule"]  
    }</p>
    </div>
    </Dialog>
      


  
}
