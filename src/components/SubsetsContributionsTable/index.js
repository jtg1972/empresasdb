import { NoUnusedVariablesRule } from 'graphql'
import { isLeafType } from 'graphql'
import {useEffect,useState} from 'react'
import './styles.scss'
export const SubsetContributionsTable=({
  data,
  order,
  firstCatNormalFields,
  otmChoices,
  subsets,
  displayRaw,
  grandTotals
})=>{
  const [table,setTable]=useState("")
  useEffect(()=>{
    initializeTablesLoop()
  },[subsets,data])

  const printDataSubset=(table,seg,field,subset,type)=>{
      console.log("table seg subset data",table,seg,field,subset,data)
      let dataRes=[]
      if(type=="secondary"){
        dataRes=Object.keys(data[table][seg]).map((d,index)=>{
          
            
              let rec=data[table][seg][parseInt(d)][`${field}total`][subset]
              console.log("typeofff",rec)
              return <tr>
                <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{(rec?.[`%of${field}Grandtotal`]==undefined || isNaN(rec[`%of${field}Grandtotal`]))?"0.00":(rec[`%of${field}Grandtotal`]*100).toFixed(2)}</td>
                <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{(rec?.[`%of${field}Total`]==undefined || isNaN(rec[`%of${field}Total`]))?"0.00":(rec[`%of${field}Total`]*100).toFixed(2)}</td>
                <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{(rec?.[`%of${field}SubgroupsTotal`]==undefined || isNaN(rec[`%of${field}SubgroupsTotal`]))?"0.00":(rec[`%of${field}SubgroupsTotal`]*100).toFixed(2)}</td>


                <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.["totalCount"]==undefined?"0.00":rec["totalCount"].toFixed(2)}</td>
                <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.["value"]?.toFixed(2)}</td>
                <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.["min"]?.toFixed(2)}</td>
                <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.["media"]?.toFixed(2)}</td>
                <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.["median"]?.toFixed(2)}</td>
                <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.["max"]?.toFixed(2)}</td>

                {(type=="secondary" && displayRaw[table][seg]) && <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.["totalCountRaw"]==undefined?"0.00":rec["totalCountRaw"].toFixed(2)}</td>}
                {(type=="secondary" && displayRaw[table][seg]) && <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.["value"]?.toFixed(2)}</td>}
                {(type=="secondary" && displayRaw[table][seg]) && <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.["minRaw"]?.toFixed(2)}</td>}
                {(type=="secondary" && displayRaw[table][seg]) && <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.["mediaRaw"]?.toFixed(2)}</td>}
                {(type=="secondary" && displayRaw[table][seg]) && <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.["medianRaw"]?.toFixed(2)}</td>}
                {(type=="secondary" && displayRaw[table][seg]) && <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.["maxRaw"]?.toFixed(2)}</td>}
              </tr> 
            
          
          
              
        })
      }
        else if(type=="superset"){
          if(data?.[table]?.[seg]!=undefined){
          dataRes=Object.keys(data[table][seg]).map((d,index)=>{
          
            
            let rec=data[table][seg][d][`${field}total`]
            //console.log("red888",rec)
            return <tr>
              <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{(rec?.[`%${field}`]==undefined || isNaN(rec?.[`%${field}`]))?"0.00":(rec[`%${field}`]).toFixed(2)}</td>

              <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.[`${field}Count`]==undefined?"0.00":rec[`${field}Count`].toFixed(2)}</td>
              <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.[`${field}total`]?.toFixed(2)}</td>
              <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.[`${field}Minimum`]?.toFixed(2)}</td>
              <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.[`${field}Media`]?.toFixed(2)}</td>
              <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.[`${field}Median`]?.toFixed(2)}</td>
              <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.[`${field}Maximum`]?.toFixed(2)}</td>
            </tr> 
          
        
        
            
      })
    }
    }else if(type=="subsetsStats"){
      dataRes=Object.keys(data[table][seg]).map((d,index)=>{
          
            
        let rec=data[table][seg][d][`${field}total`]
        return <tr>
          <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.["totalCount"]?.toFixed(2)}</td>
          <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.["totalRow"]?.toFixed(2)}</td>
          <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.[`min`]?.toFixed(2)}</td>
          <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.[`media`]?.toFixed(2)}</td>
          <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.[`median`]?.toFixed(2)}</td>
          <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.[`max`]?.toFixed(2)}</td>
        </tr> 
      
    
    
      
    })
  }
      
          
    
        
       return <th>
          <table>
            <thead>
              <tr>
                {type=="superset" && <th className="bord">%grandTotal</th>}
                {type=="secondary" && <th className="bord">%grandTotal</th>}
                {type=="secondary" && <th className="bord">%supersetTotal</th>}
                {type=="secondary" && <th className="bord">%subsetsTotal</th>}
                <th className="bord">count</th>
                <th className="bord">value</th>
                <th className="bord">minimum</th>
                <th className="bord">media</th>
                <th className="bord">median</th>
                <th className="bord">maximum</th>
                {(type=="secondary" && displayRaw[table][seg]) && <th className="bord">countRaw</th>}
                {(type=="secondary" && displayRaw[table][seg]) && <th className="bord">valueRaw</th>}
                {(type=="secondary" && displayRaw[table][seg]) && <th className="bord">minimumRaw</th>}
                {(type=="secondary" && displayRaw[table][seg]) && <th className="bord">mediaRaw</th>}
                {(type=="secondary" && displayRaw[table][seg]) && <th className="bord">medianRaw</th>}
                {(type=="secondary" && displayRaw[table][seg]) && <th className="bord">maximumRaw</th>}
              </tr>
            </thead>
            <tbody className="tbh">
              {dataRes}
            </tbody>
          </table>
        </th>
      
  }

  const printThirdLevelHeaders=(table,seg,field,ssName,type)=>{
    console.log("ssperif",table,field,ssName,subsets,subsets?.[ssName])
    let res=[]
    let res1
    
    
   //if(type=="superset")
    res.push(<th>   
      <tr><th className="bord">superset</th></tr>
      <tr>{printDataSubset(table,seg,field,"","superset")}</tr>
    </th>)
      
    if(subsets?.[ssName]!=undefined){
      Object.keys(subsets?.[ssName]).forEach(x=>
        res.push(<th>
          <tr>
            <th className="bord">{x}</th>
            
          </tr>
          <tr>
          {printDataSubset(table,seg,field,x,"secondary")}
          </tr>
        </th>)
      )
      
      res.push(<th>
        <tr><th className="bord">subsets stats</th></tr>
        
        <tr>{printDataSubset(table,seg,field,"","subsetsStats")}</tr>
      </th>
      )
      res1=res
          
        
    }
    res1=res
    return res1
  }

  const displayDate=(date)=>{
    if(date!==null){
    let nd=new Date(parseInt(date))
    console.log("ddf",nd)
    let m=nd.getMonth()+1
    let d=nd.getDate()
    let y=nd.getFullYear()
    let h=nd.getHours()
    let min=nd.getMinutes()
    let res=""
    if(m.toString().length==1)
      res="0"+m+"/"
    else  
      res=m+"/"
    if(d.toString().length==1)
      res+="0"+d+"/"
    else  
      res+=d+"/"
    res+=y
    res+=" at "
    if(h.toString().length==1)
      res+="0"+h+":"
    else  
      res+=h+":"
    if(min.toString().length==1)
      res+="0"+min
    else  
      res+=min
  
    return res
    }else 
    return ""
  }

  const printMainSegOfTableData=(table,seg)=>{
    let dataRes
    if(table.startsWith("getData")){
      dataRes=Object.keys(data[table][seg]).map((d,index)=>{
            
              
        let rec=data[table][seg][d]
        let n=[]
        let c=[]
        n=firstCatNormalFields?.[seg]?.normal?.map(x=>{

          if(x.type=="string")
            return <td style={{whiteSpace:"nowrap",backgroundColor:index%2==0?"white":"lightgray"}}>{data[table][seg][d][x.name1]}</td>
          else if(x.type=="number")
            return <td style={{whiteSpace:"nowrap",backgroundColor:index%2==0?"white":"lightgray"}}>{data[table][seg][d][x.name1].toFixed(2)}</td>
          else if(x.type=="date")
          return <td style={{whiteSpace:"nowrap",backgroundColor:index%2==0?"white":"lightgray"}}>{displayDate(data[table][seg][d][x.name1])}</td>
        })
        c=firstCatNormalFields?.[seg]?.compositeFields?.map(x=>{
          if(x.type=="string")
            return <td style={{whiteSpace:"nowrap",backgroundColor:index%2==0?"white":"lightgray"}}>{data[table][seg][d][x.name1]}</td>
          else if(x.type=="number")
            return <td style={{whiteSpace:"nowrap",backgroundColor:index%2==0?"white":"lightgray"}}>{data[table][seg][d][x.name1].toFixed(2)}</td>
          else if(x.type=="date")
          return <td style={{whiteSpace:"nowrap",backgroundColor:index%2==0?"white":"lightgray"}}>{displayDate(data[table][seg][d][x.name1])}</td>
        })
        let t=[]
         if(n!=undefined && n.length>0)
          t=[...n]
        if(c!=undefined && c.length>0)
          t=[...n,...c]
      t.unshift(<td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{data[table][seg][d]["id"]}</td>)
      return <tr className="left" style={{backgroundColor:index%2==0?"white":"lightgray"}}>
        {t}
      </tr> 
      })
    }else{
      dataRes=Object.keys(data[table][seg]).map((d,index)=>{
          
            
        let rec=data[table][seg][d]
        let n=[]
        let c=[]
        n=otmChoices?.[seg]?.normal?.map(x=>{
          if(x.type=="string")
            return <td style={{whiteSpace:"nowrap",backgroundColor:index%2==0?"white":"lightgray"}}>{data[table][seg][d][x.name1]}</td>
          else if(x.type=="number"){
            if(data[table][seg][d][x.name1]!=undefined && data[table][seg][d][x.name1]!=null)
              return <td style={{whiteSpace:"nowrap",backgroundColor:index%2==0?"white":"lightgray"}}>{data[table][seg][d][x.name1].toFixed(2)}</td>
            else
            return <td style={{whiteSpace:"nowrap",backgroundColor:index%2==0?"white":"lightgray"}}>0.00</td>

          }
          else if(x.type=="date")
          return <td style={{whiteSpace:"nowrap",backgroundColor:index%2==0?"white":"lightgray"}}>{displayDate(data[table][seg][d][x.name1])}</td>
        })
        c=otmChoices?.[seg]?.compositeFields?.map(x=>{
          if(x.type=="string")
            return <td style={{whiteSpace:"nowrap",backgroundColor:index%2==0?"white":"lightgray"}}>{data[table][seg][d][x.name1]}</td>
          else if(x.type=="number")
            return <td style={{whiteSpace:"nowrap",backgroundColor:index%2==0?"white":"lightgray"}}>{data[table][seg][d][x.name1].toFixed(2)}</td>
          else if(x.type=="date")
          return <td style={{whiteSpace:"nowrap",backgroundColor:index%2==0?"white":"lightgray"}}>{displayDate(data[table][seg][d][x.name1])}</td>
        })
        let t=[]
        if(n!=undefined && n.length>0)
          t=[...n]
        if(c!=undefined && c.length>0)
         t=[...n,...c]
         t.unshift(<td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{data[table][seg][d]["id"]}</td>)
        return <tr className="left" 
        style={{backgroundColor:index%2==0?"white":"lightgray"}}>
          {t}
        </tr> 
      })
    }
    return dataRes
  }

  const printSecondLevelHeaders=(fields,first,table,seg,ssName)=>{
    console.log("fields555",fields,table,seg)
    let fds=fields.map((f,index)=>{
      
          return <th className="bord">
                  {f.name1}
                  
                </th>
      
    })
    if(table==seg)
      fds.unshift(<th className="bord">id</th>)
              
    let body=[]
      if(table==seg)
      body.push(printMainSegOfTableData(table,seg))
      if(table!==seg)
      fields.forEach((f,index)=>{
      body.push(<th>{printThirdLevelHeaders(table,seg,f.name1,ssName)}</th>)
      })
              
        
            

    
    //if(first)
      //fds.unshift(<th className="bord">Id</th>)
      

    return <table>
        <thead>
          <tr>
            {fds}
          </tr>
        </thead>
        <tbody>
          {body}
        </tbody>
      </table>
    
  }

  const checkHasSegmentsToDisplay=table=>{
    let res=false
    order[1][table].forEach(seg=>{
      if(seg!=table){
        if(checkHasFieldToDisplay(seg))
          res=true
      }
    })
    return res
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
const displayTotalOrCount=(seg,piv,table,field,type,x)=>{
  let statsCount
  let statsTotal
  let statsCountRaw
  let statsTotalRaw
  if(type=="superset"){
    statsTotal=grandTotals?.[table]?.[seg]?.[`${field}total`]?.["statSuperSetArray"]
    statsCount=grandTotals?.[table]?.[seg]?.[`${field}total`]?.["statSuperSetArrayCount"]
  }else if(type=="subset"){
    statsTotal=grandTotals?.[table]?.[seg]?.[`${field}total`]?.[`statArray${x}`]
    statsCount=grandTotals?.[table]?.[seg]?.[`${field}total`]?.[`statArrayCount${x}`]
    statsTotalRaw=grandTotals?.[table]?.[seg]?.[`${field}total`]?.[`statArrayRaw${x}`]
    statsCountRaw=grandTotals?.[table]?.[seg]?.[`${field}total`]?.[`statArrayCountRaw${x}`]
  }else if(type=="subsets"){
    
    statsTotal=grandTotals?.[table]?.[seg]?.[`${field}total`]?.["statSubsetsArray"]
    statsCount=grandTotals?.[table]?.[seg]?.[`${field}total`]?.["statSubsetsArrayCount"]
    
  }
  console.log("statstot",statsTotal,statsCount)
  return <table><thead>
      <tr>
        <th className="bord">total</th>
        <th className="bord">count</th>
        {seg!=piv && type=="subset" && <th className="bord">totalRaw</th>}
        {seg!=piv && type=="subset" && <th className="bord">countRaw</th>}
      </tr>
    </thead>
    {((statsTotal!=undefined || statsCount!=undefined) && (type=="superset" || type=="subset" || type=="subsets")) &&<tbody>
      <tr>
        <td className="bord" style={{
          backgroundColor:"white",
          color:"black"
        }}>{statsTotal["total"].toFixed(2)}</td>
        <td
        className="bord"
        style={{
          backgroundColor:"white",
          color:"black"}}>{statsCount["total"].toFixed(2)}</td>
        {seg!=piv && type=="subset" &&<td className="bord" style={{
          backgroundColor:"white",
          color:"black"}}>{statsTotalRaw["total"].toFixed(2)}</td>}
        {seg!=piv && type=="subset" && <td className="bord" style={{
          backgroundColor:"white",
          color:"black"}}>{statsCountRaw["total"].toFixed(2)}</td>}
      </tr>
      <tr>
        <td className="bord" style={{
          backgroundColor:"lightgray",
          color:"black"}}>{statsTotal["min"].toFixed(2)}</td>
        <td className="bord" style={{
          backgroundColor:"lightgray",
          color:"black"}}>{statsCount["min"].toFixed(2)}</td>
        {seg!=piv && type=="subset"  && <td className="bord" style={{
          backgroundColor:"lightgray",
          color:"black"}}>{statsTotalRaw["min"].toFixed(2)}</td>}
        {seg!=piv && type=="subset"  && <td className="bord" style={{
          backgroundColor:"lightgray",
          color:"black"}}>{statsCountRaw["min"].toFixed(2)}</td>}
      </tr>
      <tr>
        <td  className="bord" style={{
          backgroundColor:"white",
          color:"black"
        }}>{statsTotal["media"].toFixed(2)}</td>
        <td className="bord" style={{
          backgroundColor:"white",
          color:"black"
        }}>{statsCount["media"].toFixed(2)}</td>
      {seg!=piv && type=="subset" && <td className="bord" style={{
          backgroundColor:"white",
          color:"black"}}>{statsTotalRaw["media"].toFixed(2)}</td>}
        {seg!=piv && type=="subset" && <td className="bord" style={{
          backgroundColor:"white",
          color:"black"}}>{statsCountRaw["media"].toFixed(2)}</td>}
      </tr>
      <tr>
        <td className="bord" style={{
          backgroundColor:"lightgray",
          color:"black"}}>{statsTotal["median"].toFixed(2)}</td>
        <td className="bord" style={{
          backgroundColor:"lightgray",
          color:"black"}}>{statsCount["median"].toFixed(2)}</td>
      {seg!=piv && type=="subset" && <td className="bord" style={{
          backgroundColor:"lightgray",
          color:"black"}}>{statsTotalRaw["median"].toFixed(2)}</td>}
        {seg!=piv && type=="subset"  && <td className="bord" style={{
          backgroundColor:"lightgray",
          color:"black"}}>{statsCountRaw["median"].toFixed(2)}</td>}
      </tr>
      <tr>
        <td className="bord" style={{
          backgroundColor:"white",
          color:"black"
        }}>{statsTotal["max"].toFixed(2)}</td>
        <td className="bord" style={{
          backgroundColor:"white",
          color:"black"
        }}>{statsCount["max"].toFixed(2)}</td>
      {seg!=piv && type=="subset"  && <td className="bord" style={{
          backgroundColor:"white",
          color:"black"}}>{statsTotalRaw["max"].toFixed(2)}</td>}
        {seg!=piv && type=="subset"  && <td className="bord" style={{
          backgroundColor:"white",
          color:"black"}}>{statsCountRaw["max"].toFixed(2)}</td>}
      </tr>
    </tbody>}
    </table>
  
}

const displaySets=(seg,field,tablePiv,table)=>{
  let t=[]
  let s=[]
  if(subsets?.[tablePiv]!=undefined){
    Object.keys(subsets[tablePiv]).forEach(x=>{
      t.push(<th className="bord">{x}</th>)
      s.push(<th>{displayTotalOrCount(seg,tablePiv,table,field,"subset",x)}</th>)
    })
    t.unshift(<th className="bord">superset</th>)
    t.push(<th className="bord">subsets</th>)
    s.unshift(<th>{displayTotalOrCount(seg,seg,table,field,"superset")}</th>)
    s.push(<th>{displayTotalOrCount(seg,seg,table,field,"subsets")}</th>)
    return <table>
      <thead>
        <tr>
          {t}
        </tr>
      </thead>
      <tbody>
        <tr>
          {s}
        </tr>
      </tbody>
      </table>
  }
  return null

}
const displayRowHead=(mes)=>{
  
  return <thead>
    <tr>
      {mes=="space"?<th>&nbsp;</th>:<th>{mes}</th>}
    </tr>
  </thead>
  
}
const displayRowBody=(res)=>{
  
  return <tbody>
    <tr>
      <th>{res}</th>
    </tr>
    </tbody>
    
}

const displayFieldsGrandTotals=(seg,tablePiv,prim,table)=>{
  let c=[]
  let s=[]
  let sv
  sv=<th>
    <table>
      <thead>
        <tr>
          <th className="bord">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <table>
          <thead>
            <tr>
              <th>
                <table>
                  <thead>
                  <tr>
                      <th className="bord">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                      <table>
                        <thead>
                          <tr>
                            <th>
                              <table>
                                <thead>
                                <tr>
                                  <th className="bord">Concept</th>
                                </tr>          
                                </thead>
                                <tbody>
                                <tr>
                                  <th className="bord" style={{width:"100%"}}>Total</th>
                                </tr>
                                <tr>
                                  <th className="bord" style={{width:"100%"}}>Minimum</th>
                                </tr>
                                <tr>
                                  <th className="bord" style={{width:"100%"}}>Media</th>
                                </tr>
                                <tr>
                                  <th className="bord" style={{width:"100%"}}>Median</th>
                                </tr>
                                <tr>
                                  <th className="bord" style={{width:"100%"}}>Maximum</th>
                                </tr>

                        
                              </tbody>
                            </table>
                          </th>
                        </tr>
                      </thead>
                    </table>
                  </tbody>
                </table>
                </th>
              </tr>
            </thead>
          </table>
        </tbody>
      </table>
    </th>
    
    
  
   if(!prim){
  otmChoices[seg].normal.forEach(n=>{
    if(n.type=="number"){
      c.push(<th className="bord">{n.name1}</th>)
      s.push(<th>{displaySets(seg,n.name1,tablePiv,table)}</th>)
    }
      
  })
  otmChoices[seg].compositeFields.map(n=>{
    if(n.type=="number"){
      c.push(<th className="bord">{n.name1}</th>)
      s.push(<th>{displaySets(seg,n.name1,tablePiv,table)}</th>)
    }
      
  })
}
  if(prim){
  c.unshift(sv)
  //s.unshift(<th>&nbsp;</th>)
  }
  
    
  return <table>
    <thead>
      <tr>
        {c}
      </tr>
    </thead>
    {s.length>0 &&<tbody>
      <tr>
        {s}
      </tr>
    </tbody>}
    </table>

    

}

const grandTotalsDisplay=(table)=>{
  
    let piv2=""
    let firstTables=[]
    let tablePiv
    let mainTitles=[]
    let subTitles=[]
    let dummyt=[]
    let dummyst=[]
    if(data[table][table]!=undefined && Object.keys(data[table][table]).length>0){
    if(table.startsWith("getData"))
      firstTables=firstCatNormalFields[table].otm
    else
      firstTables=otmChoices[table].otm
    if(table!==order[1][table][order[1][table].length-1]){
        
      piv2=order[1][table].forEach((seg,ind2)=>{
        //console.log("pivfijo",data[])
        firstTables.forEach(tab=>{
          if(order[1][tab].includes(seg))
            tablePiv=tab
          
        })
        if(seg!==table && checkHasFieldToDisplay(seg) && data?.[tablePiv]?.[tablePiv]!=undefined && Object.keys(data[tablePiv][tablePiv]).length>0 && 
        Object.keys(subsets[tablePiv]).length>0){
          mainTitles.push(<th className="bord">
                  {seg}
                </th>)
          subTitles.push(<th>{displayFieldsGrandTotals(seg,tablePiv,false,table)}</th>)
          dummyt.push(<th className="bord">&nbsp;</th>)
          dummyst.push(<th className="bord">&nbsp;</th>)
        }
            
            
          

      })
      //mainTitles.unshift(dummyt)
      //subTitles.unshift(dummyst)
      if(data?.[tablePiv]?.[tablePiv]!=undefined && Object.keys(data[tablePiv][tablePiv]).length>0){
      mainTitles.unshift(<th className="bord">
        &nbsp;</th>)
     subTitles.unshift(<th>{displayFieldsGrandTotals(null,null,true)}</th>)
      }
      return data?.[tablePiv]?.[tablePiv]!=undefined && Object.keys(data[tablePiv][tablePiv]).length>0 &&
      Object.keys(subsets[tablePiv]).length>0 && <table>
              <thead>
                <tr>
                  {mainTitles}
                </tr>
              </thead>
              <tbody style={{verticalAlign:"top"}}>
                <tr style={{verticalAlign:"top"}}>
                  {subTitles}
                </tr>
            
              </tbody>
            </table>
          
          
        /*<tbody>
          <tr>
            <th className="bord">Total</th>
          </tr>
          <tr>
            <th className="bord">Min</th>
          </tr>
          <tr>
            <th className="bord">Media</th>
          </tr>
          <tr>
            <th className="bord">Median</th>
          </tr>
          <tr>
            <th className="bord">Max</th>
          </tr>
          
        </tbody>
      </table>*/
      
    }
  }else
  return null     
 
}
  

  const initializeTablesLoop=()=>{
    let piv2=[]
    let pivote=""
   
    
     pivote=order[0].map((table,index)=>{
       console.log("datatable",data[table][table])
      if(data?.[table]?.[table]!=undefined){
    
       piv2=[]
      let firstTables=[]
      let tablePiv
      if(table.startsWith("getData"))
        firstTables=firstCatNormalFields[table].otm
      else
        firstTables=otmChoices[table].otm
      
      
      if(table!==order[1][table][order[1][table].length-1]){
        
        piv2=order[1][table].map((seg,ind2)=>{
          firstTables.forEach(tab=>{
            if(order[1][tab].includes(seg))
              tablePiv=tab
          
          })
          console.log("tablereg",order,table,seg,data?.[tablePiv]?.[tablePiv])

          

          //console.log("tablereg",order,table,seg,data[tablePiv][tablePiv])
           
            if(Object.keys(data[table]).length>1 && table==seg && table.startsWith('getData'))
             return <th style={{verticalAlign:"top",height:"auto"}}><table /*style={{border:"1px solid red"}}*/><thead>
             
               <tr><th className="bord">&nbsp;</th></tr>
               <tr style={{height:"31px"}}><th className="bord" style={{marginBottom:"2px"}}>&nbsp;</th></tr>
              
         
               <tr><th className="bord" style={{height:"31px"}}>{seg}</th></tr></thead>
             <tbody className="tbh"><tr><th>{printSecondLevelHeaders([...firstCatNormalFields?.[seg]?.normal,...firstCatNormalFields?.[seg]?.compositeFields],true,table,seg,tablePiv/*order[1][table][1]*/)}</th></tr></tbody></table></th>
             
            else if(Object.keys(data[table]).length>1 && table==seg && !table.startsWith('getData'))
             return <th style={{verticalAlign:"top",heigth:"auto"}}><table><thead>
               
               <tr><th className="bord">&nbsp;</th></tr>
               
                <tr><th className="bord" style={{height:"31px"}}>&nbsp;</th></tr>
                  <tr><th className="bord" style={{height:"31px"}}>{seg}</th></tr></thead> 

             <tbody className="tbh"><tr><th>{printSecondLevelHeaders([...otmChoices?.[seg]?.normal,...otmChoices?.[seg]?.compositeFields],true,table,seg,tablePiv/*order[1][table][1]*/)}</th></tr>
             </tbody></table></th>
            
            //if(data?.[tablePiv]?.[tablePiv]!=undefined && Object.keys(data[tablePiv][tablePiv]).length>0){
            else if(data?.[tablePiv]?.[tablePiv]!=undefined && Object.keys(data[tablePiv][tablePiv]).length>0 && data[table][seg]!==undefined && table!==seg && checkHasFieldToDisplay(seg))
              return  <th style={{verticalAlign:"top",height:"auto"}}><table><thead>
                
                <tr><th className="bord">{seg}</th></tr></thead>
              <tbody className="tbh"><tr><th>{printSecondLevelHeaders([...otmChoices?.[seg]?.normal.filter(x=>x.type=="number"),
            ...otmChoices?.[seg]?.compositeFields.filter(x=>x.type=="number")],false,table,seg,tablePiv/*order[1][table][1]*/)}</th></tr></tbody></table></th>
            
            else
            return ""
          
          //return ""
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
      console.log("piv2ver",piv2,piv2.filter(x=>x!="").length,piv2=="",piv2==null,"hola")
      if(piv2.filter(x=>x!="").length>0 && checkHasSegmentsToDisplay(table)){
      return <div className="cont">
      <table className="main">
        <tbody>
          <tr>
          {piv2}
          </tr>
        </tbody>
        
      </table>
     <table className="main">
        <tbody>
          <tr>
          {grandTotalsDisplay(table)}
          </tr>
        </tbody>
        
      </table>
      
      
      </div>}
      }
      else
        return null
    })
    setTable(pivote)
  
}

  return <div className="cont">
    {table}
    
  </div>
  
}