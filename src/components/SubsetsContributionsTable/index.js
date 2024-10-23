import {useEffect,useState} from 'react'
import './styles.scss'
export const SubsetContributionsTable=({
  data,
  order,
  firstCatNormalFields,
  otmChoices,
  subsets
})=>{
  const [table,setTable]=useState("")
  useEffect(()=>{
    initializeTablesLoop()
  },[])

  const printDataSubset=(table,seg,field,subset)=>{
      console.log("table seg subset data",table,seg,field,subset,data)
      return <th>
          <tr>
            <th className="bord">count</th>
            <th className="bord">value</th>
            <th className="bord">minimum</th>
            <th className="bord">media</th>
            <th className="bord">median</th>
            <th className="bord">maximum</th>

          </tr>
          </th>
        
      
  }

  const printThirdLevelHeaders=(table,seg,field,ssName)=>{
    console.log("ssperif",table,field,ssName,subsets,subsets?.[ssName])
    let res=""
    let res1=""
    if(subsets?.[ssName]!=undefined){
      res=Object.keys(subsets?.[ssName]).map(x=>
        <th>
          <tr>
            <th className="bord">{x}</th>
            
          </tr>
          <tr>
          {printDataSubset(table,seg,field,x)}
          </tr>
        </th>)
      res.unshift(<th>
        <tr><th className="bord">superset</th></tr>
        <tr>{printDataSubset(table,seg,field)}</tr>
      </th>)
      res.push(<th>
        <tr><th className="bord">subsets stats</th></tr>
        
        <tr>{printDataSubset(table,seg,field)}</tr>
      </th>
      )
      res1=res
          
        
    }
    return res1
  }

  const printSecondLevelHeaders=(fields,first,table,seg,ssName)=>{
    console.log("fields555",fields)
    let fds=fields.map((f,index)=>{
      return <th>
          <table>
            <thead>
              <tr>
                {index==0 && first && <th className="bord" style={{padding:"10px",paddingTop:"5px",paddingBottom:"5px"}}>
                  id
                </th>}
                <th className="bord" style={{padding:"10px",paddingTop:"5px",paddingBottom:"5px"}}>
                  {f.name1}
                </th>
              </tr>
            </thead>
            {!first && <tbody>
              <tr className="bord">

                {!first && <th>{printThirdLevelHeaders(table,seg,f.name1,ssName)}</th>}
              </tr>
        
            </tbody>
            }
        
          </table>
        </th>
      

    })
    //if(first)
      //fds.unshift(<th className="bord">Id</th>)
      

    return <tr>
        {fds}
        
      </tr>
    
  }

  const checkHasFieldToDisplay=(seg)=>{
    if(seg.startsWith("getData"))
    return true
    let n=otmChoices?.[seg]?.normal?.filter(x=>
      x.type=="number")
    let c=otmChoices?.[seg]?.compositeFields?.filter(x=>
      x.type=="number")
    let r=[]
    if(n?.length>0)
      r=[...n]
    if(c?.length>0)
      r=[...r,...c]
    if(r?.length>0)
      return true
    return false
}
  

  const initializeTablesLoop=()=>{
    let piv2
     let pivote=order[0].map((table,index)=>{
       piv2=""
      
      if(table!==order[1][table][order[1][table].length-1]){
        
        piv2=order[1][table].map((seg,ind2)=>{

          console.log("tablereg",order,table,seg)
           
            if(table==seg && table.startsWith('getData'))
             return <th style={{verticalAlign:"bottom",border:"1px solid white"}}><thead><tr><th className="bord">{seg}</th></tr></thead>
             <tbody><tr className="bord"><th>{printSecondLevelHeaders([...firstCatNormalFields?.[seg]?.normal,...firstCatNormalFields?.[seg]?.compositeFields],true,table,seg,order[1][table][1])}</th></tr></tbody></th>
             
            else if(table==seg && !table.startsWith('getData'))
             return <th style={{verticalAlign:"bottom",border:"1px solid white"}}><thead><tr><th className="bord">{seg}</th></tr></thead> 
             <tbody><tr className="m auto bord"><th>{printSecondLevelHeaders([...otmChoices?.[seg]?.normal,...otmChoices?.[seg]?.compositeFields],true,table,seg,order[1][table][1])}</th></tr>
             </tbody></th>
            
            
            else if(table!==seg && checkHasFieldToDisplay(seg))
              return  <th style={{verticalAlign:"bottom",border:"1px solid white"}}><thead><tr><th className="bord">{seg}</th></tr></thead>
              <tbody><tr><th>{printSecondLevelHeaders([...otmChoices?.[seg]?.normal.filter(x=>x.type=="number"),
            ...otmChoices?.[seg]?.compositeFields.filter(x=>x.type=="number")],false,table,seg,order[1][table][1])}</th></tr></tbody></th>
            
            else
            return ""
       
            /*!seg.startsWith('getData') && seg==table &&
            printSecondLevelHeaders([...otmChoices?.[seg]?.normal,...otmChoices?.[seg]?.compositeFields],true,table,seg,order[1][table][1])
            
            seg.startsWith('getData') &&
            printSecondLevelHeaders([...firstCatNormalFields?.[seg]?.normal,...firstCatNormalFields?.[seg]?.compositeFields],true,table,seg,order[1][table][1])
            
            checkHasFieldToDisplay(seg) && table!==seg && 
            printSecondLevelHeaders([...otmChoices?.[seg]?.normal.filter(x=>x.type=="number"),
            ...otmChoices?.[seg]?.compositeFields.filter(x=>x.type=="number")],false,table,seg,order[1][table][1])
            
          */
          
          
        })
      }
      if(piv2!="")
      return <table>
        <tbody className="m">
          <tr className="collapse m">
          {piv2}
          </tr>
        </tbody>
        
      </table>
      else
        return null
    })
    setTable(pivote)
  }

  return <div className="cont">
    {table}
    
  </div>
}