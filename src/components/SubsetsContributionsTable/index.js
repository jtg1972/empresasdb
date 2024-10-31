import { isLeafType } from 'graphql'
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

  const printDataSubset=(table,seg,field,subset,type)=>{
      console.log("table seg subset data",table,seg,field,subset,data)
      let dataRes=[]
      if(type=="secondary"){
        dataRes=Object.keys(data[table][seg]).map((d,index)=>{
          
            
              let rec=data[table][seg][d][`${field}total`][subset]
              console.log("typeofff",rec[`%of${field}SubgroupsTotal`])
              return <tr>
                <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{(rec[`%of${field}Grandtotal`]==undefined || isNaN(rec[`%of${field}Grandtotal`]))?"0.00":(rec[`%of${field}Grandtotal`]*100).toFixed(2)}</td>
                <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{(rec[`%of${field}Total`]==undefined || isNaN(rec[`%of${field}Total`]))?"0.00":(rec[`%of${field}Total`]*100).toFixed(2)}</td>
                <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{(rec[`%of${field}SubgroupsTotal`]==undefined || isNaN(rec[`%of${field}SubgroupsTotal`]))?"0.00":(rec[`%of${field}SubgroupsTotal`]*100).toFixed(2)}</td>


                <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec["totalCount"]==undefined?"0.00":rec["totalCount"].toFixed(2)}</td>
                <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec["value"].toFixed(2)}</td>
                <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec["min"].toFixed(2)}</td>
                <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec["media"].toFixed(2)}</td>
                <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec["median"].toFixed(2)}</td>
                <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec["max"].toFixed(2)}</td>
              </tr> 
            
          
          
              
        })
      }
        else if(type=="superset"){
          dataRes=Object.keys(data[table][seg]).map((d,index)=>{
          
            
            let rec=data[table][seg][d][`${field}total`]
            //console.log("red888",rec)
            return <tr>
              <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{(rec?.[`%${field}`]==undefined || isNaN(rec?.[`%${field}`]))?"0.00":(rec[`%${field}`]).toFixed(2)}</td>

              <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec?.[`${field}Count`]==undefined?"0.00":rec[`${field}Count`].toFixed(2)}</td>
              <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec[`${field}total`].toFixed(2)}</td>
              <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec[`${field}Minimum`].toFixed(2)}</td>
              <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec[`${field}Media`].toFixed(2)}</td>
              <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec[`${field}Median`].toFixed(2)}</td>
              <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec[`${field}Maximum`].toFixed(2)}</td>
            </tr> 
          
        
        
            
      })
    }else if(type=="subsetsStats"){
      dataRes=Object.keys(data[table][seg]).map((d,index)=>{
          
            
        let rec=data[table][seg][d][`${field}total`]
        return <tr>
          <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec["totalCount"].toFixed(2)}</td>
          <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec["totalRow"].toFixed(2)}</td>
          <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec[`min`].toFixed(2)}</td>
          <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec[`media`].toFixed(2)}</td>
          <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec[`median`].toFixed(2)}</td>
          <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{rec[`max`].toFixed(2)}</td>
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

  const printMainSegOfTableData=(table,seg)=>{
    let dataRes
    if(table.startsWith("getData")){
      dataRes=Object.keys(data[table][seg]).map((d,index)=>{
            
              
        let rec=data[table][seg][d]
        let n=[]
        let c=[]
        n=firstCatNormalFields?.[seg]?.normal?.map(x=>{
          return <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{data[table][seg][d][x.name1]}</td>
        })
        c=firstCatNormalFields?.[seg]?.compositeFields?.map(x=>{
          return <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{data[table][seg][d][x.name1]}</td>
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
          return <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{data[table][seg][d][x.name1]}</td>
        })
        c=otmChoices?.[seg]?.compositeFields?.map(x=>{
          return <td style={{backgroundColor:index%2==0?"white":"lightgray"}}>{data[table][seg][d][x.name1]}</td>
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
    console.log("fields555",fields)
    let fds=fields.map((f,index)=>{
      return <th style={{height:"auto"}}>
          <table>
            <thead>
              <tr>
                {index==0 && first && <th className="bord">
                  id
                </th>}
                <th className="bord">
                  {f.name1}
                  
                </th>
              </tr>
              

            </thead>
            <tbody className="tbh">
              
                {table==seg && index==fields.length-1 && printMainSegOfTableData(table,seg)}
                {table!==seg && <th>{printThirdLevelHeaders(table,seg,f.name1,ssName)}</th>}
              
        
            </tbody>
            
        
          </table>
        </th>
      

    })
    //if(first)
      //fds.unshift(<th className="bord">Id</th>)
      

    return <table>
        <thead>
          <tr>
            {fds}
          </tr>
        </thead>
      </table>
    
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
             return <th style={{verticalAlign:"top",height:"auto"}}><table /*style={{border:"1px solid red"}}*/><thead>
             
               <tr><th className="bord">&nbsp;</th></tr>
               <tr style={{height:"31px"}}><th className="bord" style={{marginBottom:"2px"}}>&nbsp;</th></tr>
              
         
               <tr><th className="bord" style={{height:"31px"}}>{seg}</th></tr></thead>
             <tbody className="tbh"><tr><th>{printSecondLevelHeaders([...firstCatNormalFields?.[seg]?.normal,...firstCatNormalFields?.[seg]?.compositeFields],true,table,seg,order[1][table][1])}</th></tr></tbody></table></th>
             
            else if(table==seg && !table.startsWith('getData'))
             return <th style={{verticalAlign:"top",heigth:"auto"}}><table><thead>
               
               <tr><th className="bord">&nbsp;</th></tr>
               
                <tr><th className="bord" style={{height:"31px"}}>&nbsp;</th></tr>
                  <tr><th className="bord" style={{height:"31px"}}>{seg}</th></tr></thead> 

             <tbody className="tbh"><tr><th>{printSecondLevelHeaders([...otmChoices?.[seg]?.normal,...otmChoices?.[seg]?.compositeFields],true,table,seg,order[1][table][1])}</th></tr>
             </tbody></table></th>
            
            
            else if(table!==seg && checkHasFieldToDisplay(seg))
              return  <th style={{verticalAlign:"top",height:"auto"}}><table><thead>
                
                <tr><th className="bord">{seg}</th></tr></thead>
              <tbody className="tbh"><tr><th>{printSecondLevelHeaders([...otmChoices?.[seg]?.normal.filter(x=>x.type=="number"),
            ...otmChoices?.[seg]?.compositeFields.filter(x=>x.type=="number")],false,table,seg,order[1][table][1])}</th></tr></tbody></table></th>
            
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
      return <table className="main">
        <tbody>
          <tr>
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