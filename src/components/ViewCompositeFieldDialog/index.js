import { selectHttpOptionsAndBodyInternal } from "@apollo/client"
import Dialog from "../Dialog"

export const ViewCompositeFieldDialog=({compositeField,compositeFieldName,
  specificOtmName,open,toggleDialog})=>{
    console.log("comfield",compositeField,specificOtmName,compositeFieldName)
    //const 
   /*useEffect(()=>{
      if(open==true){
        compositeField[specificOtmName].filter(x=>{
          if(x==specificOtmName)
            return true
          return false
        })
      }
    },[open])*/
    const displayHeader=()=><div style={{backgroundColor:"black",color:"white",width:"100%",marginTop:"5px",marginBottom:"0px",
    display:"flex"}}>
      <div style={{width:"100px"}}>
        Operator
      </div>
      <div style={{flex:1}}>
        Params
      </div>
      
    </div>

    return <Dialog
    open={open}
    closeDialog={toggleDialog}
    headline={`View composite field ${compositeFieldName}`}>
    <div style={{width:"100%",display:"flex",flexDirection:"column"}}>
    {compositeField[specificOtmName].filter(x=>x.name1==compositeFieldName)[0]["structure"].length!==0 && displayHeader()}
    <div style={{display:"flex",flexDirection:"row",
    width:"100%"}}>
      
      <div style={{width:"100px",display:"flex",flexDirection:"column",backgroundColor:"white"}}>
      {compositeField[specificOtmName].filter(x=>x.name1==compositeFieldName)[0].structure.map((x,index)=>{
      if(index%2==0){
        return <div style={{display:"flex",
        flex:1}}>
          <p style={{color:"black",flex:1,overflow:"hidden",whiteSpace:"nowrap"}}>{x}</p>
              
        </div>
      }
      
      })}
      </div>
      <div style={{flex:1,display:"flex",backgroundColor:"white",flexDirection:"column",overflowX:"hidden",whiteSpace:"nowrap",paddingRight:"3px"/*flex:"1 0 0",display:"flex",flexDirection:"column"*/}}>
        {compositeField[specificOtmName].filter(x=>x.name1==compositeFieldName)[0].structure.map((x,index)=>{
        
        if(index%2==1){
          if(typeof compositeField[specificOtmName].filter(x=>x.name1==compositeFieldName)[0]["structure"][index]!=="object")
            return <div style={{display:"flex",flexDirection:"column",
            flex:1,whiteSpace:"nowrap",overflowX:"hidden"} }>
           
            
              <p style={{color:"black",marginLeft:"0px",flex:1,overflowX:"hidden",whiteSpace:"nowrap"/*flex:1,flexGrow:0,overflow:"hidden"*/}}>{x/*compositeField[index]*/}</p>
            
            </div>
          else
            return <div style={{display:"flex",flexDirection:"row",
            flex:1,whiteSpacing:"nowrap",overflowX:"hidden"}}>
           
            {compositeField[specificOtmName].filter(x=>x.name1==compositeFieldName)[0]["structure"][index]["op"]=="substring" &&
              <p style={{color:"black",marginLeft:"0px",flex:1,overflowX:"hidden",whiteSpace:"nowrap"}}>{compositeField[specificOtmName].filter(x=>x.name1==compositeFieldName)[0]["structure"][index]["field"]} chars: {compositeField[specificOtmName].filter(x=>x.name1==compositeFieldName)[0]["structure"][index]["chars"]} from: {compositeField[specificOtmName].filter(x=>x.name1==compositeFieldName)[0]["structure"][index]["start"]}</p>
            }
            {compositeField[specificOtmName].filter(x=>x.name1==compositeFieldName)[0]["structure"][index]["op"]=="add text" &&
              <p style={{color:"black",marginLeft:"0px",flex:1,overflowX:"hidden",whiteSpace:"nowrap"}}>{compositeField[specificOtmName].filter(x=>x.name1==compositeFieldName)[0]["structure"][index]["value"]}</p>
            }
            </div> 
        }
        })}
        </div>
        
    </div>
    </div>
    </Dialog>
  }