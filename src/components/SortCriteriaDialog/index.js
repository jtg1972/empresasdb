import { valueFromAST } from 'graphql'
import React,{useState,useEffect} from 'react'
import Dialog from '../Dialog'
import FormButton from '../Forms/FormButton'
import FormInput from '../Forms/FormInput'
import './styles.scss'

const DisplayList=({
  
  categoryName,
  sortRules,
  setSortRules
})=>{

  const [haveChanged,setHaveChanged]=useState(false)

  const printHeader=()=>{
    return <div style={{display:"flex",flexDirection:"row",width:"100%",
    /*justifyContent:"space-between",*/}}>
     
    <div style={{display:"flex",width:"220px",flexDirection:"column"}}>
      <div style={{display:"flex",
      justifyContent:"space-between",flex:"1 0 0"}}>
        <p style={{color:"white",background:"black",flex:"1 0 0",overflow:"hidden",whiteSpace:"nowrap"}}>Field</p>
      </div>
    </div>  
    <div style={{display:"flex",width:"120px",flexGrow:0/*flex:"1 0 0",display:"flex"*/,flexDirection:"column"}}>
      <div style={{display:"flex",flexDirection:"column",
          justifyContent:"space-between",flex:1,flexGrow:0} }>
         
          
        <p style={{color:"white",background:"black",flex:1,marginLeft:"0px"/*flex:1,flexGrow:0,overflow:"hidden"*/}}>Order Type</p>
          
      </div>
    </div>
    <div style={{display:"flex",flexDirection:"column",flex:1,marginLeft:"0px",marginRight:"0px"/*,display:"flex",flexDirection:"column"*/}}>
    <p style={{color:"white",background:"black",flex:1}}>-</p>
    </div>
    
    </div>
  }
  return <div style={{marginTop:"5px",width:"100%",display:"flex",flexDirection:"column",background:"white"}}>
  {printHeader()}
  <div style={{display:"flex",flexDirection:"row",
  /*justifyContent:"space-between",*/flex:1,flexGrow:0}}>
    
    <div style={{width:"220px",display:"flex",flexDirection:"column"}}>
    {sortRules?.[categoryName]?.map((x,index)=>{
    //if(index%2==0){
      return <div style={{display:"flex",
      justifyContent:"space-between",flex:"1 0 0",paddingRight:"5px",background:index%2==0?"white":"lightgrey"}}>
        <p style={{color:"black",background:index%2==0?"white":"lightgrey",flex:"1 0 0",overflow:"hidden",whiteSpace:"nowrap"}}>{x.field} ({x.segment})</p>
            
      </div>
    //}
    
    })}
    </div>
    <div style={{width:"120px",flexGrow:0/*flex:"1 0 0",display:"flex"*/,flexDirection:"column"}}>
      {sortRules?.[categoryName]?.map((x,index)=>{
      
      //if(index%2==1){
        
          return <div style={{display:"flex",flexDirection:"column",
          justifyContent:"space-between",flex:1,flexGrow:0} }>
         
          
            <p style={{color:"black",background:index%2==0?"white":"lightgrey",width:"100%",marginLeft:"0px",flex:1/*,flexGrow:0,overflow:"hidden"*/}}>{x.typeOrder}</p>
          
          </div>
        
      //}
      }
      )}
      </div>
     

    <div style={{flex:1,marginLeft:"0px",marginRight:"0px"/*,display:"flex",flexDirection:"column"*/}}>
      {sortRules[categoryName]?.map((x,index)=>{ 
        
        return <p style={{color:"red",background:index%2==0?"white":"lightgrey",flex:1}}
        onClick={()=>{
          console.log("click")
          let j=index
          let y=sortRules[categoryName]
          y.splice(index,1)
          /*y?.filter((i,inx)=>{
            if(j==inx)
              return false
            return true
          })*/
          console.log("uiy",{...sortRules,[categoryName]:y})
          setSortRules(e=>({...e,[categoryName]:y}))
          //setHaveChanged(!haveChanged)
          
        }}>-</p>
      })}
    </div>
    
    
    
    </div>
      
  </div>

  
}

export const SortCriteriaDialog = ({
  open,
  toggleDialog,
  fieldName,
  categoryName,
  segment,
  setConditionsWhere,
  conditionsWhere,
  comboDataSt,
  setComboDataSt,
  otmChoicesSort,
  sortRules,
  setSortRules,
  otmCategoryFields,
  setOtmChoices,
  otmChoices,
  specificOtmName,
  compFieldsArray,
  setCompFieldsArray
}) => {



  
  

  
  
  const [selectedSegment,setSelectedSegment]=useState("")
  const [selectedField,setSelectedField]=useState("")
  const [listSegments,setListSegments]=useState([])
  const [listFields,setListFields]=useState([])
  const [typeOrder,setTypeOrder]=useState("asc")
  const [thereIsSortRule,setTheresIsSortRule]=useState("nosort")
  const [haveChange,setHaveChange]=useState(false)
  let type
  let displayAllCombo=""
  
  useEffect(()=>{
    init(0)
  },[])

  useEffect(()=>{

    return ()=>{
      if(sortRules?.[categoryName]?.[0]!=="nosort")
        if(sortRules?.[categoryName].length==0)
          setSortRules(e=>({...e,[categoryName]:["nosort"]}))
    }
  },[])
  
  useEffect(()=>{
    init(1)
  },[thereIsSortRule])

  

  useEffect(()=>{
    displayFieldsCombo()
  },[selectedSegment])

  const displayFieldsCombo=()=>{
    let res=[]
    //res.push("Select Field")
    //console.log("rastreo",ss)
    if(otmChoicesSort?.[selectedSegment]!==undefined){
    
      
      otmChoicesSort?.[selectedSegment].map(x=>{
        res.push(x)
      })
      setListFields(res)
    }
  }

  const init=(i)=>{
    let ls=[]
    if(sortRules?.[categoryName]?.[0]!=="nosort")
      if(i!==1)
        setTheresIsSortRule("sort")
      console.log("otmcsort",otmChoicesSort)
      if(otmChoicesSort!==undefined){
        ls=Object.keys(otmChoicesSort)
        setListSegments(ls)
      }
      
      
    
  }
  const addSortRules=()=>{
    let st=sortRules
    console.log("st11",st,sortRules)
    
    if(st[categoryName]==undefined){
      st[categoryName]=[]
    }
    if(thereIsSortRule=="sort"){
      if(st[categoryName][0]=="nosort")
        st[categoryName].splice(0,1)
      console.log("verifgg",st[categoryName])
      
      st[categoryName].push({
        segment:selectedSegment,
        field:selectedField,
        typeOrder:typeOrder
      })
    }else if(thereIsSortRule=="nosort"){
      st[categoryName]=["nosort"]
    } 
    console.log("sortRules",st)
    setHaveChange(!haveChange)
    setSortRules(st)
  }

  const checkDisabled=()=>{
    if(thereIsSortRule=="sort"){
      if(selectedSegment!=="" && selectedField!=="")
        return false
      else
        return true
    }
    return false
  }


  return (
    <Dialog 
      open={open}
      closeDialog={toggleDialog} 
      headline={`${categoryName} Order Criteria`}
    >
      <div style={{display:"flex",flex:1,backgroundColor:"brown",color:"white",height:"20px",padding:0,margin:0,marginRight:0,marginBottom:"5px"}}>
        <select onChange={e=>{
          setTheresIsSortRule(e.target.value)
        }} 
        value={thereIsSortRule}
        style={{height:"20px",border:"none",outline:"none",backgroundColor:"brown",color:"white",padding:0}}>
          <option value="nosort">No sort criteria</option>
          <option value="sort">Sort Criteria</option>
        </select>
      </div>
      {thereIsSortRule=="sort" && <div>
        <div>
        <select  
        style={{display:"flex",flex:1,backgroundColor:"brown",color:"white",height:"20px",padding:0,margin:0,marginRight:0,marginBottom:"5px"}}
        onChange={(e)=>{
          setSelectedSegment(e.target.value)
          setSelectedField("")
          displayFieldsCombo(e.target.value)}
        }
        value={selectedSegment}
          style={{outline:"none",margin:0,padding:0,alignItems:"center",width:"100%",backgroundColor:"brown",color:"white",border:"none",height:"20px",lineHeight:"20px",
          marginBottom:"5px"}}>
            <option value="">Select Segment</option>
            {listSegments.map(x=><option value={x}>{x}</option>)}
        </select>
      </div>
      <div style={{display:"flex",flex:1,backgroundColor:"brown",color:"white",height:"20px",padding:0,margin:0,marginRight:0,marginBottom:"5px"}}>
        <select  onChange={(e)=>{
          setSelectedField(e.target.value)
         
        }}
          value={selectedField}
          style={{flex:7.5,outline:"none",margin:0,padding:0,alignItems:"center",backgroundColor:"brown",color:"white",border:"none",height:"20px",lineHeight:"20px"}}>
            <option value="">Select Field</option>
            {listFields.map(x=><option value={x}>{x}</option>)}
            
        </select>
      </div>
        <select name="typeOrder" style={{flex:1.5,height:"20px",outline:"none",border:"none",backgroundColor:"brown",color:"white",padding:0,margin:0,marginBottom:"5px"}}
        onChange={(e)=>setTypeOrder(e.target.value)}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>}
        <FormButton style={{flex:1,height:"20px",margin:"0px",padding:"0px",
        opacity:checkDisabled()?0.7:1}} disabled={checkDisabled()}
          onClick={()=>{
            
            addSortRules()
            //addWhereConditionInArray()
          }}

          >Add</FormButton>
      
      
     <br/> 
    {(sortRules?.[categoryName]?.[0]!=="nosort" && thereIsSortRule=="sort") && <DisplayList 
        categoryName={categoryName}
        sortRules={sortRules}
        setSortRules={setSortRules}
      />
    }
      
      
      
      </Dialog>
  )
}
