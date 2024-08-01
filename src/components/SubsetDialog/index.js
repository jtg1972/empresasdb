import {useState,useEffect} from 'react'
import Dialog from "../Dialog"
import './styles.scss'

export const SubsetDialog=({open,toggleDialog,whereHeader,conditions,
subsets,
setSubsets})=>{
    const [color,setColor]=useState("#000000")
    const[pretendColor,setPretendColor]=useState("#000000")
    const [borderColor,setBorderColor]=useState("lightgray")
    const [colorExists,setColorExists]=useState(false)
    let ssvar={}
    const [type,setType]=useState("input")
    const[value,setValue]=useState("")
    useEffect(()=>{
      console.log("propsuu",whereHeader,conditions)
      ssvar=subsets
      let inputType="input"
      let value
      let x
      let y
      if(ssvar?.[whereHeader["categoryName"]]==undefined)
        ssvar={...ssvar,[whereHeader["categoryName"]]:{}}
      let p=Object.keys(ssvar?.[whereHeader["categoryName"]])
      for(let o=0;o<p.length;o++){
        let c=ssvar?.[whereHeader["categoryName"]][p[o]]
        if(c["categoryName"]==whereHeader["categoryName"] &&
          c["segment"]==whereHeader["segment"] &&
          c["fieldName"]==whereHeader["fieldName"] &&
          c["ruleName"]==whereHeader["rule"]){
          x=c["color"]
          inputType="color"
          break;
        }else{
        
          x=null
          inputType="input"
        }
          
      }
      setValue("")
      setType(inputType)
      setColor(x)
      setPretendColor(x)
      setSubsets(ssvar)

    },[])
   
    const getCurrentColors=()=>{
      let colors
      let llaves=whereHeader
      ssvar=subsets
      if(ssvar?.[whereHeader?.["categoryName"]]==undefined)
        colors=[]
      else 
        colors=Object.keys(ssvar?.[whereHeader?.["categoryName"]])
      
      return colors
    }
  /*const getCurrentColor=()=>{
      ssvar=subsets
      let nn=ssvar?.[whereHeader?.["categoryName"]]
      console.log("nn",nn)
      if(nn!=={}){
      let cc=Object.keys(nn)
      for(let k=0;k<cc.length;k++){
        if(nn[cc[k]]["categoryName"]=whereHeader["categoryName"] &&
          nn[cc[k]]["segment"]==whereHeader["segment"] &&
          nn[cc[k]]["fieldName"]==whereHeader["fieldName"] &&
          nn[cc[k]]["ruleName"]==whereHeader["rule"]){
            return nn[cc[k]]["color"]
          }
          

      }
      }
      return null
      
      
    }*/

    const colorExistsf=(c)=>{
      let colors
      ssvar=subsets
      if(ssvar?.[whereHeader?.["categoryName"]]==undefined)
        colors=[]
      else
        colors=Object.keys(ssvar?.[whereHeader?.["categoryName"]])
       console.log("checkedcolor",ssvar,colors,color,pretendColor) 
      if((colors.includes(pretendColor) && color!==pretendColor) || pretendColor==null){
        
        //setColorExists(true)
        return true
      }
      //setColorExists(false)
      return false
    }
    return <Dialog
      open={open}
      closeDialog={toggleDialog}
      headline={`Create Subset of rule ${whereHeader?.["rule"]} of field ${whereHeader?.["fieldName"]} in segment ${whereHeader?.["segment"]} of category ${whereHeader?.["categoryName"]}`}>
        <div style={{width:"100%",display:"flex",flexDirection:"column"}}>
          <p style={{color:"black",margin:0,padding:0}}>Select a color of the subset</p>
          <input className="phcolor" 
          type={type=="input"?"text":"color"}
          onClick={()=>{
            console.log("vars",type)
            if(type=="input")
              setType("color")
          }}
          value={type=="input"?"":pretendColor}
          placeholder={pretendColor==null?"Click to select a color":""}
          style={{border:type=="input"?"1px solid lightgray":colorExistsf(color)!=false?"1px solid red":"1px solid green",outline:"none",width:"100%",marginBottom:"5px"}}
          onChange={(e)=>{
              setPretendColor(e.target.value)
            
          }}
          //value={pretendColor}
          />
          <button disabled={colorExistsf()}
          style={{opacity:colorExistsf()==true?0.7:1,background:"brown",color:"white",padding:"2px",border:"none"}}
            onClick={(e)=>{
              
              ssvar=subsets
              console.log("a borrar",ssvar?.[whereHeader?.["categoryName"]]?.[color])
              
              let colors=getCurrentColors()
              //colorExistsf()
              console.log("colorexists",color,colorExistsf(color))
              delete ssvar?.[whereHeader?.["categoryName"]]?.[color]
              colorExistsf(color)
              if(!colorExistsf()){
                
                //!colors.includes(e.target.value))          
                ssvar={...ssvar,
                  [whereHeader["categoryName"]]:{
                    ...ssvar[whereHeader["categoryName"]],[pretendColor]:{
                      categoryName:whereHeader["categoryName"],
                      segment:whereHeader["segment"],
                      fieldName:whereHeader["fieldName"],
                      rule:conditions,
                      ruleName:whereHeader["rule"],
                      color:pretendColor
                    }
                  }
                }
                setColor(pretendColor)
                setSubsets(ssvar)
              }}}>Add Color</button>
          {color!=null && <button 
            style={{
              color:"black",
              background:"white",
              border:"1px solid black",
              marginTop:"5px",
              
              
            }}
            onClick={()=>{
              let x=subsets
              delete x[whereHeader?.["categoryName"]][color]
              setSubsets(x)
              setColor(null)
              setPretendColor(null)
              setType("input")
            }}>
            Eliminar subset
          </button>
          }
        </div>
        
    </Dialog>
  }