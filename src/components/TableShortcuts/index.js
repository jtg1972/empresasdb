import {useState,useEffect} from 'react'
import './styles.scss'
const PrintShortCutsSegments=({table,segments})=>{
  const [currentSegment,setCurrentSegment]=useState("")
  useEffect(()=>{
    setCurrentSegment("")
  },[table])
  const resetScroll=tableName=>{
    console.log("tablepor",table)
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
    <p style={{color:"yellow"}}>Segment shortcuts</p>
    {segments?.map(x=>{
    return <button 
    onClick={(e)=>{
      e.preventDefault()
      setCurrentSegment(x)
      goToCero(`${table}_${x}`)
    }}
    
    
    style={{color:"white",border:"none",background:"transparent",borderBottom:currentSegment==x?"1px solid yellow":"none",textDecoration:"none",marginLeft:"0",marginRight:"10px"}}>{
      x
    }</button>})}
  </div>
  
}

const TableShortcuts=({order})=>{
  //console.log("orderlili",order)
  const [table,setTable]=useState("")
  
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
    
      
    
  
    return (order?.[0]?.length>0 && <div>
      {[...tabs]}<br/>
      {order.length==2 && <PrintShortCutsSegments
        table={table}
        segments={order[1][table]}
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
  return order?.[0]?.length>0?<div style={{width:"400px",padding:"10px",zIndex:100,height:"auto",marginBottom:"20px",position:"fixed",left:"270px",top:"100px",background:"black"}}>
    <p style={{color:"yellow"}}>Table Shortcuts</p>
    {printShortcuts()}
    
  </div>:""
}
export default TableShortcuts