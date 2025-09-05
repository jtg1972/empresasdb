import { valueFromAST } from 'graphql'
import React,{useState,useEffect} from 'react'
import Dialog from '../Dialog'
import FormButton from '../Forms/FormButton'
import FormInput from '../Forms/FormInput'
import './styles.scss'


const DisplayList=({
  
  categoryName,
  sortRules,
  setSortRules,
  relationshipType,
  subVar
})=>{

  const [haveChanged,setHaveChanged]=useState(false)

  const printHeader=()=>{
    return <div style={{display:"flex",flexDirection:"row",width:"100%",background:"black",paddingLeft:"2px"
    /*justifyContent:"space-between",*/}}>
     
    <div style={{display:"flex",width:"240px",flexDirection:"column",paddingRight:"0px"}}>
      <div style={{display:"flex",
      justifyContent:"space-between",flex:"1 0 0"}}>
        <p style={{color:"white",background:"black",flex:"1 0 0",overflow:"hidden",whiteSpace:"nowrap"}}>Field</p>
      </div>
    </div>  
    <div style={{display:"flex",width:"90px",flexGrow:0,paddingRight:"0px"/*flex:"1 0 0",display:"flex"*/,flexDirection:"column"}}>
      <div style={{display:"flex",flexDirection:"column",
          justifyContent:"space-between",flex:1,flexGrow:0} }>
         
          
        <p style={{color:"white",background:"black",flex:1,marginLeft:"0px"/*flex:1,flexGrow:0,overflow:"hidden"*/}}>Order Type</p>
          
      </div>
    </div>
    <div style={{display:"flex",flexDirection:"column",flex:1,marginLeft:"0px",marginRight:"0px",paddingRight:"0px"/*,display:"flex",flexDirection:"column"*/}}>
      <p style={{color:"white",background:"black",flex:1}}>Cs</p>
    </div>
    <div style={{display:"flex",flexDirection:"column",flex:1,paddingLeft:"5px",marginLeft:"0",marginRight:"0px"/*,display:"flex",flexDirection:"column"*/}}>
    <p style={{color:"white",background:"black",flex:1,paddingRight:"2px"}}>-</p>
    </div>
    
    </div>
  }
  return <div style={{marginTop:"5px",width:"100%",display:"flex",flexDirection:"column",background:"white"}}>
  {printHeader()}
  {relationshipType!="manytomany" &&
  <div style={{display:"flex",flexDirection:"row",
  /*justifyContent:"space-between",*/flex:1,flexGrow:0}}>
    
    <div style={{width:"235px",display:"flex",flexDirection:"column",paddingRight:"0px"}}>
    {sortRules?.[categoryName]?.map((x,index)=>{
    //if(index%2==0){
      return <div style={{display:"flex",flexDirection:"column",
      justifyContent:"space-between",flex:"1 0 0",marginLeft:0,marginRight:0,paddingRight:"5px",background:index%2==0?"white":"lightgrey"}}>
        <p style={{color:"black",background:index%2==0?"white":"lightgrey",flex:"1 0 0",overflow:"hidden",whiteSpace:"nowrap",paddingRight:"0px"}}>{x.field}</p>
            
      </div>
    //}
    
    })}
    </div>
    <div style={{width:"90px",flexGrow:0,flexDirection:"column"}}>
      {sortRules?.[categoryName]?.map((x,index)=>{
      
      //if(index%2==1){
        
          return <div style={{display:"flex",flexDirection:"column",
          justifyContent:"space-between",flex:"1 0 0"} }>
         
          
            <p style={{paddingRight:"0px",color:"black",background:index%2==0?"white":"lightgrey",width:"100%",marginLeft:"0px",flex:"1 0 0",textAlign:"left"
            /*,flexGrow:0,overflow:"hidden"*/}}>{x.typeOrder}</p>
          
          </div>
        
      //}
      }
      )}
      </div>
    <div style={{display:"flex",flexDirection:"column",width:"20px",marginLeft:"0",margin:"0px",paddingRight:"0px"/*,display:"flex",flexDirection:"column"*/}}>
      {sortRules?.[categoryName]?.map((x,index)=>{ 
        return <p style={{color:"black",background:index%2==0?"white":"lightgrey",flex:"1 0 0"}}>{x.caseSensitive}</p>
      })}
    </div>
    

    <div style={{width:"10px"/*,display:"flex",flexDirection:"column"*/}}>
      {sortRules?.[categoryName]?.map((x,index)=>{ 
        
        return <p style={{color:"red",paddingRight:"2px",background:index%2==0?"white":"lightgrey",flex:"1 0 0"}}
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
  }
  {relationshipType=="manytomany" &&
  <div style={{display:"flex",flexDirection:"row",
  /*justifyContent:"space-between",*/flex:1,flexGrow:0}}>
    
    <div style={{width:"235px",display:"flex",flexDirection:"column",paddingRight:"0px"}}>
    {sortRules?.[categoryName]?.[subVar]?.map((x,index)=>{
    //if(index%2==0){
      return <div style={{display:"flex",flexDirection:"column",
      justifyContent:"space-between",flex:"1 0 0",marginLeft:0,marginRight:0,paddingRight:"5px",background:index%2==0?"white":"lightgrey"}}>
        <p style={{color:"black",background:index%2==0?"white":"lightgrey",flex:"1 0 0",overflow:"hidden",whiteSpace:"nowrap",paddingRight:"0px"}}>{x.field}</p>
            
      </div>
    //}
    
    })}
    </div>
    <div style={{width:"90px",flexGrow:0,flexDirection:"column"}}>
      {sortRules?.[categoryName]?.[subVar]?.map((x,index)=>{
      
      //if(index%2==1){
        
          return <div style={{display:"flex",flexDirection:"column",
          justifyContent:"space-between",flex:"1 0 0"} }>
         
          
            <p style={{paddingRight:"0px",color:"black",background:index%2==0?"white":"lightgrey",width:"100%",marginLeft:"0px",flex:"1 0 0",textAlign:"left"
            /*,flexGrow:0,overflow:"hidden"*/}}>{x.typeOrder}</p>
          
          </div>
        
      //}
      }
      )}
      </div>
    <div style={{display:"flex",flexDirection:"column",width:"20px",marginLeft:"0",margin:"0px",paddingRight:"0px"/*,display:"flex",flexDirection:"column"*/}}>
      {sortRules?.[categoryName]?.[subVar]?.map((x,index)=>{ 
        return <p style={{color:"black",background:index%2==0?"white":"lightgrey",flex:"1 0 0"}}>{x.caseSensitive}</p>
      })}
    </div>
    

    <div style={{width:"10px"/*,display:"flex",flexDirection:"column"*/}}>
      {sortRules?.[categoryName]?.[subVar]?.map((x,index)=>{ 
        
        return <p style={{color:"red",paddingRight:"2px",background:index%2==0?"white":"lightgrey",flex:"1 0 0"}}
        onClick={()=>{
          console.log("click")
          let j=index
          let y=sortRules[categoryName][subVar]
          y.splice(index,1)
          /*y?.filter((i,inx)=>{
            if(j==inx)
              return false
            return true
          })*/
          console.log("uiy",{...sortRules,[categoryName]:y})
          setSortRules(e=>({...e,[categoryName]:{
            ...e[categoryName],
            [subVar]:y}}))
          //setHaveChanged(!haveChanged)
          
        }}>-</p>
      })}
    </div>
    
    
    
    </div>
  }    
  </div>
  

  
}

export const SortCriteriaServerDialog = ({
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
  relationshipType,
  subVar,
  
  otmCategoryFields,
  setOtmChoices,
  otmChoices,
  specificOtmName,
  compFieldsArray,
  setCompFieldsArray
}) => {



  
  

  
  
 //const [selectedSegment,setSelectedSegment]=useState("")
  const [selectedField,setSelectedField]=useState("")
  //const [listSegments,setListSegments]=useState([])
  const [listFields,setListFields]=useState([])
  const [typeOrder,setTypeOrder]=useState("asc")
  const [thereIsSortRule,setTheresIsSortRule]=useState("nosort")
  const [haveChange,setHaveChange]=useState(false)
  const [fieldType,setFieldType]=useState("")
  const [caseSensitive,setCaseSensitive]=useState("n")
  let type
  let displayAllCombo=""
  
  useEffect(()=>{
    console.log("ssr",sortRules)
    //setSortRules([])
    init(0)
  },[])

  useEffect(()=>{

    return ()=>{
      //if(relationshipType!="manytomany"){
        if(sortRules?.[categoryName]?.[0]!=="nosort")
          if(sortRules?.[categoryName]?.length==0)
            setSortRules(e=>({...e,[categoryName]:["nosort"]}))
      /*}else{
        if(sortRules?.[categoryName]?.[subVar]?.[0]!=="nosort")
          if(sortRules?.[categoryName]?.[subVar]?.length==0)
            setSortRules(e=>({...e,
              [categoryName]:{
                [subVar]:["nosort"]
              }
            }))

      }*/
    }
  },[])
  
  useEffect(()=>{
    //setSortRules([])
    init(1)
  },[thereIsSortRule])

  

  /*useEffect(()=>{
    if(selectedSegment=="")
      setListFields([])
      
    displayFieldsCombo()
  },[selectedSegment])*/

  const displayFieldsCombo=()=>{
    let res=[]
    //res.push("Select Field")
    //console.log("rastreo",ss)
    if(otmChoicesSort==undefined){
    
      
      otmChoicesSort?.map(x=>{
        res.push(x.name)
      })
      setListFields(res)
    }
  }

  const init=(i)=>{
    let ls=[]
    setFieldType("")
    if(relationshipType!="manytomany"){
    if(sortRules?.[categoryName]?.[0]!=="nosort")
      
      if(i!==1)
        setTheresIsSortRule("sort")
      console.log("otmcsort",otmChoicesSort)
      if(otmChoicesSort!==undefined){
        ls=otmChoicesSort.map(y=>y.name)
        
        setListFields(ls)
      }
    }else{
      if(sortRules?.[categoryName]?.[subVar]?.[0]!=="nosort")
      
      if(i!==1)
        setTheresIsSortRule("sort")
      console.log("otmcsort",otmChoicesSort)
      if(otmChoicesSort!==undefined){
        ls=otmChoicesSort.map(y=>y.name)
        
        setListFields(ls)
      }

    }
      
      
    
  }
  const addSortRules=()=>{
    let st=sortRules
    console.log("st11",st,sortRules)
    
    
    if(relationshipType!="manytomany"){
      if(st?.[categoryName]==undefined){
        st[categoryName]=[]
      }
      if(thereIsSortRule=="sort"){
        if(st?.[categoryName]?.[0]=="nosort")
          st?.[categoryName].splice(0,1)
        console.log("verifgg",st[categoryName])
        let it=identifyType(selectedField)
        st[categoryName].push({
          //segment:selectedSegment,
          field:selectedField,
          typeOrder:typeOrder,
          caseSensitive:fieldType=="string"?caseSensitive:"na",
          fieldType:fieldType
          
        })
      }else if(thereIsSortRule=="nosort"){
        st[categoryName]=["nosort"]
      }
    }else{
      if(st?.[categoryName]==undefined){
        st[categoryName]=[]
        
      }
      /*if(st[categoryName][subVar]==undefined)
        st[categoryName]={...st[categoryName],[subVar]:[]}]*/
      if(thereIsSortRule=="sort"){
        if(st?.[categoryName]?.[0]=="nosort")
          st?.[categoryName]?.splice(0,1)
        console.log("verifgg",st[categoryName])
        let it=identifyType(selectedField)
        st[categoryName].push({
          //segment:selectedSegment,
          field:selectedField,
          typeOrder:typeOrder,
          caseSensitive:fieldType=="string"?caseSensitive:"na",
          fieldType:fieldType,
          model:identifyModel(selectedField),
          grandModel:identifyGrandModel(selectedField)
          
        })
      }else if(thereIsSortRule=="nosort"){
        st[categoryName][subVar]=["nosort"]
      }
    } 
    console.log("sortRules",st)
    setHaveChange(!haveChange)
    setSortRules(st)
  }

  const identifyType=(name)=>{
    //console.log("aprob",seg,name,otmChoicesSort)
    let res=otmChoicesSort.filter(x=>x.name==name)?.[0]
    setFieldType(res.type)
  }
  const identifyModel=(name)=>{
    let res=otmChoicesSort.filter(x=>x.name==name)?.[0]
    return res.model
  }
  const identifyGrandModel=(name)=>{
    let res=otmChoicesSort.filter(x=>x.name==name)?.[0]
    return res.grandModel
  }

  const checkDisabled=()=>{
    if(thereIsSortRule=="sort"){
      if(selectedField!=="")
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
      {thereIsSortRule!="nosort" &&
     <div>
      <div style={{display:"flex",flex:1,backgroundColor:"brown",color:"white",height:"20px",padding:0,margin:0,marginRight:0,marginBottom:"5px"}}>
        <select  onChange={(e)=>{
          setSelectedField(e.target.value)
          if(e.target.value!=="")
            identifyType(e.target.value)
          else
            setFieldType("")

          
         
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
        {fieldType=="string" && selectedField!=="" &&
        (<><input type="checkbox" 
        onChange={e=>{
          console.log("ischecked",e.target.checked)
          if(e.target.checked==true)
            setCaseSensitive("y")
          else  
            setCaseSensitive("n")

        }}/> <span style={{color:"black"}}>Case Sensitive</span></>)
        }
      </div>}
        <FormButton style={{flex:1,height:"20px",margin:"0px",padding:"0px",
        opacity:checkDisabled()?0.7:1}} disabled={checkDisabled()}
          onClick={()=>{
            
            addSortRules()
            //addWhereConditionInArray()
          }}

          >Add</FormButton>
           
        
      
      
      
     
    {(sortRules?.[categoryName]?.[0]!=="nosort" && thereIsSortRule=="sort") && <DisplayList 
        categoryName={categoryName}
        sortRules={sortRules}
        setSortRules={setSortRules}
        //relationshipType={relationshipType}
      
      />
    }
      
      
      
      </Dialog>
  )
}
