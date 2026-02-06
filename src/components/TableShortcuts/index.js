import {useState,useEffect} from 'react'
import './styles.scss'

const PrintShortCutsStatistics=({table,fields,
  currentField,setCurrentField,currentSegment,setCurrentSegment,
otmChoicesStatistics,currentStatistic,setCurrentStatistic})=>{
    const [statisticsList,setStatisticsList]=useState([])
    useEffect(()=>{
      console.log("alert99",otmChoicesStatistics)
      let otcs=[]
      if(otmChoicesStatistics?.[table]?.[currentSegment]?.[currentField]!=undefined){
        otcs=Object.keys(otmChoicesStatistics?.[table]?.[currentSegment]?.[currentField]).filter(x=>{
          if(otmChoicesStatistics?.[table]?.[currentSegment]?.[currentField]?.[x]==true)
            return true
          return false
        })
      }


      if(otcs!=undefined)
        setStatisticsList(otcs)
    },[currentField])

  
    const resetScroll=tableName=>{
      //console.log("tablepor",table)
      let elem=document.getElementById(tableName)
      elem.scrollTo=0
      elem.scrollIntoView()
    }
    const goToCero=(idName)=>{
      resetScroll(`goBegin`)
      let elem=document.getElementById(idName)
      if(elem!=undefined){
        elem.scrollTo=0
      
        elem.scrollIntoView()
        elem.classList.add("movezero")
      }
    }
    return <div>
      {statisticsList?.length>0 && <p style={{color:"yellow"}}>Statistics shortcuts</p>}
      {statisticsList?.map(x=>{
      return <button 
      onClick={(e)=>{
        e.preventDefault()
        setCurrentStatistic(x)
        if(x=="total")
          goToCero(`${table}_${currentSegment}_${currentField}`)
        else
         goToCero(`${table}_${currentSegment}_${currentField}_${x}`)
      }}
      
      
      style={{color:"white",border:"none",background:"transparent",borderBottom:currentStatistic==x?"1px solid yellow":"none",textDecoration:"none",marginLeft:"0",marginRight:"10px"}}>{
        x
      }</button>})}
   
   </div>
    
  }

const PrintShortCutsFields=({table,fields,
  currentField,setCurrentField,currentSegment,setCurrentSegment,
otmChoicesStatistics,otmChoices,currentStatistic,setCurrentStatistic})=>{
    
    /*useEffect(()=>{
      fields.unshift("totalCount")
    },[currentSegment])*/
    const resetScroll=tableName=>{
      //console.log("tablepor",table)
      let elem=document.getElementById(tableName)
      elem.scrollRight=0
      elem.scrollIntoView()
    }
    const goToCero=(idName)=>{
      //resetScroll(`goBegin`)
      let elem=document.getElementById(idName)
      if(elem!=undefined){
        elem.scrollLeft=0
      
        elem.scrollIntoView()
        //elem.classList.add("movezero")
      }
    }
    return <div>
      {fields?.length>0 && <p style={{color:"yellow"}}>Fields shortcuts</p>}
      {fields?.map(x=>{
      return <button 
      onClick={(e)=>{
        e.preventDefault()
        setCurrentField(x)
        setCurrentStatistic("")
        goToCero(`${table}_${currentSegment}_${x}`)
      }}
      
      
      style={{color:"white",border:"none",background:"transparent",borderBottom:currentField==x?"1px solid yellow":"none",textDecoration:"none",marginLeft:"0",marginRight:"10px"}}>{
        x
      }</button>})}
      {currentField!="" && <PrintShortCutsStatistics
    currentSegment={currentSegment}
    setCurrentSegment={setCurrentSegment}
    currentField={currentField}
    setCurrentField={setCurrentField}
    fields={otmChoices?.[currentSegment]?.normal?.filter(x=>x.type=="number")?.map(y=>y.name1)}
    table={table}
    otmChoicesStatistics={otmChoicesStatistics}
    currentStatistic={currentStatistic}
    setCurrentStatistic={setCurrentStatistic}
    />}
    </div>
    
  }

const PrintShortCutsSegments=({table,segments,
currentSegment,setCurrentSegment,currentField,setCurrentField,
otmChoices,otmChoicesStatistics,currentStatistic,setCurrentStatistic})=>{
  console.log("otmchoicesporpor",otmChoices,currentSegment)
  //let fields=[]
  const [fieldList,setFieldList]=useState([])
  useEffect(()=>{
    let fields=[]
    fields=otmChoices?.[currentSegment]?.normal?.filter(x=>x.type=="number")?.map(y=>y.name1)
    if(fields?.length!=undefined)
      if(otmChoicesStatistics?.[table]?.[currentSegment]?.["general"]?.["totalCount"]==true)
        fields.unshift("totalCount")
    setFieldList(fields)
  },[currentSegment])
  const resetScroll=tableName=>{
    //console.log("tablepor",table)
    let elem=document.getElementById(tableName)
    elem.scrollTo=0
    elem.scrollIntoView()
  }
  const goToCero=(idName)=>{
    resetScroll(`${table}Id`)
    let elem=document.getElementById(idName)
    if(elem!=undefined){
      elem.scrollTo=0
    
      elem.scrollIntoView()
      elem.classList.add("movezero")
    }
  }
  return <div>
    {segments?.length>0 && <p style={{color:"yellow"}}>Segment shortcuts</p>}
    {segments?.map(x=>{
    return <button 
    onClick={(e)=>{
      e.preventDefault()
      setCurrentSegment(x)
      setCurrentField("")
      setCurrentStatistic("")
      goToCero(`${table}_${x}`)
    }}
    
    
    style={{color:"white",border:"none",background:"transparent",borderBottom:currentSegment==x?"1px solid yellow":"none",textDecoration:"none",marginLeft:"0",marginRight:"10px"}}>{
      x
    }</button>})}
    {(currentSegment!="" && currentSegment!=table )&&
    <PrintShortCutsFields
    currentSegment={currentSegment}
    setCurrentSegment={setCurrentSegment}
    currentField={currentField}
    setCurrentField={setCurrentField}
    fields={fieldList}
    table={table}
    otmChoicesStatistics={otmChoicesStatistics}
    currentStatistic={currentStatistic}
    setCurrentStatistic={setCurrentStatistic}
    />}

  </div>
  
}

const TableShortcuts=({order,isThereReport,setIsThereReport,
otmChoices,otmChoicesStatistics})=>{
  //console.log("orderlili",order)
  const [table,setTable]=useState("")
  const [currentSegment,setCurrentSegment]=useState("")
  const [currentField,setCurrentField]=useState("")
  const [currentStatistic,setCurrentStatistic]=useState("")
  useEffect(()=>{
    setCurrentSegment("")
    setCurrentField("")
    setCurrentStatistic("")
  },[table])
  /*const printShortCutsSegments=(table,segments)=>{
    let segs1=[]
   console.log("tablesegs",table,segments)
    for(let j=0;j<segments.length;j++)
      segs1.push(<button 
      onClick={(e)=>{
        e.preventDefault()
        goToCero(`${table}_${segments[j]}`)
      }}
      
      
      style={{color:"white",border:"none",background:"transparent",borderBottom:"1px solid yellow",textDecoration:"none",marginLeft:"0",marginRight:"10px"}}>{
        segments[j]
      }</button>)
    //setCurrentSelectedSegments(<div>{[...segs1]}</div>)
  }*/
  
  const printShortcuts=()=>{
    let tabs=[]
    let segs1=[]
    let totalSegs=[]
    
    //let cc=`getData${currentCategory?.name}`
    //console.log("shortcuts",tables,segs)
    let s=[]
    let cc=""
    for(let i=0;i<order?.[0]?.length;i++){
      //let h1=`#${tables[i]}`
      //let table=cc=order[0][i]
      
      tabs.push(<button 
      onClick={(e)=>{
        e.preventDefault()
        //console.log("llamo")
        let t=order[0][i]
       setTable(order[0][i])
        
        /*this._toScroll.scrollIntoView()*/
      //setCurrentSelectedTable(tables[i])
    
     //setprintShortCutsSegments(cc,order[1][cc])
      goToCero(t)
    
    }}
        style={{color:"white",border:"none",background:"transparent",borderBottom:table==order[0][i]?"1px solid yellow":"none",textDecoration:"none",marginLeft:"0",marginRight:"10px"}}>
          {order?.[0]?.[i]}
        </button>)
        /*onClick={(e)=>{
          cc=tables[i]
          ///e.preventDefault()
          //estTestsetCurrentSelectedTable(tables[i])
          console.log("segs",tables,tables[i],segs)
          
          
        }
        }*/
        
    }
    
      
    
  
    return ((order?.[0]?.length>0) && <div>
      {[...tabs]}<br/>
      {order.length==2 && <PrintShortCutsSegments
        table={table}
        segments={order[1][table]}
        setCurrentSegment={setCurrentSegment}
        currentSegment={currentSegment}
        currentField={currentField}
        setCurrentField={setCurrentField}
        otmChoices={otmChoices}
        otmChoicesStatistics={otmChoicesStatistics}
        currentStatistic={currentStatistic}
        setCurrentStatistic={setCurrentStatistic}
      ></PrintShortCutsSegments>}  
    </div>)
  
  }
  const resetScroll=tableName=>{
    let elem=document.getElementById(tableName)
    if(elem!=undefined){
      elem.scrollTo=0
      elem.scrollIntoView()
    }
  }
  const goToCero=(idName)=>{
    
    resetScroll(`${table}Id`)
    let elem=document.getElementById(idName)
    if(elem!=undefined){
      elem.scrollTo=0
      elem.scrollIntoView()
      elem.classList.add("movezero")
    }

  }
  return (order?.[0]?.length>0 && isThereReport[1])?<div style={{width:"400px",padding:"10px",zIndex:100,height:"auto",marginBottom:"20px",position:"fixed",left:"270px",top:"100px",background:"black"}}>
    <p style={{color:"yellow"}}>Table Shortcuts</p>
    {printShortcuts()}
    
  </div>:""
}
export default TableShortcuts