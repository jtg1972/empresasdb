import { SDLValidationContext } from 'graphql/validation/ValidationContext'
import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
const mapToState=({categories})=>({
  currentCategory:categories.currentCategory,
  categories:categories.categories,
  categoryProducts:categories.categoryProducts
})
export const GetCategorySubset=({data,subset,category,subsets,
subsetsData,setSubsetsData,conditionsWhere,
order,firstCatNormalFields,otmChoices,parentCategories,
parentIdentifiers,otmChoicesStatistics})=>{
  let totalTables={}
  let tableTotalRecords={}
  const [printedTable,setPrintedTable]=useState("")
  
  const {
    currentCategory,
    categories,
    categoryProducts
  }=useSelector(mapToState)
  let realGrandTotals1={}
  let twoTables=[]
  let ssd1
  useEffect(()=>{
    //console.log("subset9090",subset,subsetsData)
    //console.log("conditionswhere1",conditionsWhere,data)
    if(subsetsData!=undefined){
      //verifyMeetWithConditionsBySegmentBaseLevel2(category,data,ssd1)
      getCategoriesGrandTotals(category,subsetsData)
      console.log("ssdata771",subsetsData,subsetsData[category][subset],data,realGrandTotals1[category][subset])

      calculatePercentageOverGrandTotal(subsetsData,category)
      console.log("ssdata77",subsetsData,subsetsData[category][subset],data,realGrandTotals1[category][subset])
      calculateMediaAndMediansOfRecords(category,subsetsData[category][subset])
      /*bloque que obtiene la participacion de los subsets a la tabla category*/
     // console.log("orderanswers",category,order,data,otmChoices,firstCatNormalFields,subsets[category])
      //calculateSubsetContributions(ssd)
      //termina bloque
  
      printFinalTableNew(category,subsetsData,order[1][category])//,order[0])
      printGrandTotalsTrue(category,realGrandTotals1[category][subset],order[1][category])
      setPrintedTable(twoTables)
    }
    
    //setSubsetsData(ssd)
  },[subsetsData])

  

  const displayCategoryHeaders=()=>{
    return <tr style={{background:"black",color:"white",borderBottom:"1px solid white",margin:0,padding:0}}>
      <th style={{borderRight:"1px solid white"}}>Field</th>
      <th style={{borderRight:"1px solid white"}}>Grand Total</th>
      <th style={{borderRight:"1px solid white"}}>Minimum</th>
      <th style={{borderRight:"1px solid white"}}>Maximum</th>
      <th style={{borderRight:"1px solid white"}}>Media</th>
      <th>Median</th>
    </tr>
  
}
  const displayFirstCategoryFields=(data)=>{
  const nf=getNumericFields(`getData${currentCategory.name}`)
  let n=nf.normal.map((x,index)=>{
    return <tr style={{background:"white",color:"black",margin:0,padding:0}}>
      <td style={{borderRight:"1px solid black"}}>{x}</td>       
      <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[subset]?.[`${x}total`]==undefined?"0.00":data[`getData${currentCategory.name}`][subset][`${x}total`].toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[subset]?.[`${x}AccumulatedArray`]?.[0]==undefined?"0.00":(data[`getData${currentCategory.name}`]?.[subset]?.[`${x}AccumulatedArray`]?.[0].toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[subset]?.[`${x}AccumulatedArray`]?.[data[`getData${currentCategory.name}`]?.[subset]?.[`${x}AccumulatedArray`].length-1]==undefined?"0.00":(data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.[data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`].length-1].toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[`getData${currentCategory.name}`]?.[subset]?.[`${x}Media`])?"0.00":data[`getData${currentCategory.name}`][subset][`${x}Media`].toFixed(2)}</td>
      <td>{isNaN(data?.[`getData${currentCategory.name}`]?.[subset]?.[`${x}Median`])?"0.00":data[`getData${currentCategory.name}`][subset][`${x}Median`].toFixed(2)}</td>
    </tr>
  })
  let c=nf.compositeFields.map(x=>{
    return <tr style={{background:"white",color:"black",margin:0,padding:0}}>
      <td style={{borderRight:"1px solid black"}}>{x}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[subset]?.[`${x}total`]==undefined?"0.00":data[`getData${currentCategory.name}`][`${x}total`].toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[subset]?.[`${x}AccumulatedArray`]?.[0]==undefined?"0.00":(data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.[0].toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[subset]?.[`${x}AccumulatedArray`]?.[data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`].length-1]==undefined?"0.00":(data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.[data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`].length-1].toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[`getData${currentCategory.name}`]?.[subset]?.[`${x}Media`])?"0.00":data[`getData${currentCategory.name}`][`${x}Media`].toFixed(2)}</td>
      <td>{isNaN(data?.[`getData${currentCategory.name}`]?.[subset]?.[`${x}Median`])?"0.00":data[`getData${currentCategory.name}`][subset][`${x}Median`].toFixed(2)}</td>
    </tr>
  })
  return [...n,...c]

  
}
  
  const printFinalTableNew=(category,data2,segments)=>{//,order)=>{
  //  console.log("iniciobegin",firstCatNormalFields,otmChoices)
    
  twoTables.push(printMainHeaders(subsetsData[category][subset],category,segments))
  //setSubsetsData(data2)  
  }
  /*const printMainHeaders=(data,category,segments)=>{
    let subtitles={}
    let head=[]
    let subsection={}
    let realSegmentsCount=[]
  
  
    
    let realSegmentsLast=segments[segments.length-1]
    //console.log("getfieldssegment",data,realSegmentsCount,realSegmentsLast)
    segments.forEach((a,index)=>{
      if(head==undefined)
        head=[]
      
      head.push(a)
      let isLast=false
    // console.log("yyy",realSegmentsCount,category,a,segments,index,segments.length-1,index==segments.length-1)
      
      if(index==realSegmentsCount.length-1)
        isLast=true
      
      subtitles[a]=getFieldsSegment(category,a,realSegmentsLast)
      subsection[a]=getFieldsDataSegment(category,a,realSegmentsLast,data)
        
    })
    //console.log("subtitles",subtitles,head)
    
    return <div>
      <div style={{borderBottom:`5px solid ${subsets[category][subset]["color"]}`,marginBottom:"5px",background:"white"}}>
        <span style={{display:"inline-block",color:"black",padding:"10px",textAlign:"center"}}>Subset {subsets[category][subset]["ruleName"]} </span>
      </div>
      <table style={{width:"100%",background:"white",color:"black",padding:0,margin:0,marginBottom:"15px",marginRight:"10px"}}>
      <thead>
        <tr style={{verticalAlign:"top"}}>
          {head.map((u,index)=>{
            return subtitles[u].length>0 && <th style={{verticalAlign:"top",padding:0,margin:0}}>
                <span style={{display:"block",background:"black",textAlign:"center",
              color:"white",borderBottom:"1px solid white",borderRight:(index<head.length-1)?"1px solid white":"none",
              padding:0,margin:0}}>{u}</span>
                <table style={{background:"white",color:"black",padding:0,margin:0,width:"100%"}}>
                  <thead>
                    <tr style={{background:"black",color:"white",padding:0,margin:0}}>{subtitles[u]}</tr>
                  </thead>
                  <tbody style={{background:"white",color:"black",padding:0,margin:0}}>
                    {subsection[u]}
                  </tbody>
                </table>
                
              </th>
            
          })}
        
        </tr>
      </thead>
    </table>
    </div>
  }*/
  const printMainHeaders=(data,category,segments,refIn)=>{
  let subtitles={}
  let head=[]
  let subsection={}
  let realSegmentsCount=[]

 /*segments.forEach((a,index)=>{

   
    subtitles[a]=getFieldsSegment(category,a)
    if(subtitles[a].length>0)
      realSegmentsCount.push(a)
    

  })*/
  
  let realSegmentsLast=segments?.[segments.length-1]
 // console.log("getfieldssegment",realSegmentsCount,realSegmentsLast)
  segments?.forEach((a,index)=>{
    if(head==undefined)
      head=[]
    
    head.push(a)
    let isLast=false
   // console.log("yyy",realSegmentsCount,category,a,segments,index,segments.length-1,index==segments.length-1)
    
    if(index==realSegmentsCount.length-1)
      isLast=true
    
    subtitles[a]=getFieldsSegment(category,a,realSegmentsLast)
    subsection[a]=getFieldsDataSegment(category,a,realSegmentsLast,data)
      
  })
 // console.log("subtitles",subtitles,head,refIn)
  
  return <div style={{width:"100%",maxWidth:"100%",height:"auto",maxHeight:"400px",overflow:"auto",background:"transparent",marginBottom:"10px"}}> 
  <table id={`${category}`} style={{/*width:"100vw",height:"100px",maxHeight:"100px",overflow:"auto",*/background:"white",color:"black",padding:0,margin:0,marginBottom:"15px",marginRight:"10px"}}>
    <thead>
      <tr style={{verticalAlign:"top"}}>
        {head.map((u,index)=>{
          return subtitles[u].length>0 && <th style={{verticalAlign:"top",padding:0,margin:0}}>
              <span id={`${category}_${u}`}style={{display:"block",background:"black",textAlign:"center",
            color:"white",borderBottom:"1px solid white",borderRight:(index<head.length-1)?"1px solid white":"none",
            padding:0,margin:0}}>{u}</span>
              <table style={{background:"white",left:0,top:0,color:"black",padding:0,margin:0,width:"100%"}}>
                <thead>
                  <tr style={{background:"black",color:"white",padding:0,margin:0}}>
                    {subtitles[u]}</tr>
                </thead>
                <tbody style={{background:"white",color:"black",padding:0,margin:0,overflow:"auto"}}>
                  {subsection[u]}
                </tbody>
              </table>
              
            </th>
          
        })}
      
      </tr>
    </thead>
  </table>
  </div>
}

/*const getFieldsSegment=(category,segment,realSegmentLast)=>{
    let result=[]
    let len=0
    //console.log("realsegmentlast111",realSegmentLast)
    //let busca=realSegmentCount
    let theresNormal
    let theresComposite
    let theresOtmDestiny
    if(category==segment){
      if(category==`getData${currentCategory.name}`){
        let normal=firstCatNormalFields[`getData${currentCategory.name}`].normal.length
        let composite=firstCatNormalFields[`getData${currentCategory.name}`].compositeFields.length
        let otmdestiny=firstCatNormalFields[`getData${currentCategory.name}`].otmdestiny.length
        theresNormal=normal>0
        theresComposite=composite>0 
        theresOtmDestiny=otmdestiny>0 
        if(theresNormal)
        result=[...result,...firstCatNormalFields[`getData${currentCategory.name}`].normal.map((q,index)=>
          <th style={{borderRight:(realSegmentLast==category && normal-1==index && !theresComposite)?"none":"1px solid white"}}>{q.name1}</th>
        )]
        if(theresComposite)
        result=[...result,...firstCatNormalFields[`getData${currentCategory.name}`].compositeFields.map((q,index)=>
          <th style={{borderRight:(realSegmentLast==category && composite-1==index)?"none":"1px solid white"}}>{q.name1}</th>
        )]
      
        
      }else{
        //console.log("otmchoices22",otmChoices[segment])
  
        let normal=otmChoices[category].normal.length
        let composite=otmChoices[category].compositeFields.length
        let otmdestiny=otmChoices[category].otmdestiny.length
        theresNormal=normal>0
        theresComposite=composite>0  
        theresOtmDestiny=otmdestiny>0
        if(theresNormal)   
        result=[...result,...otmChoices[category].normal.map((q,index)=>
          <th style={{borderRight:(realSegmentLast==category && normal-1==index && !(theresComposite || theresOtmDestiny))?"none":"1px solid white"}}>{q.name1}</th>
        )]
        if(theresComposite)
        result=[...result,...otmChoices[category].compositeFields.map((q,index)=>
          <th style={{borderRight:(realSegmentLast==category && composite-1==index && !theresOtmDestiny)?"none":"1px solid white"}}>{q.name1}</th>
        )]
        if(theresOtmDestiny)
        result=[...result,...otmChoices[category].otmdestiny.map((q,index)=>
          <th style={{borderRight:(realSegmentLast==category && otmdestiny-1==index)?"none":"1px solid white"}}>{q}</th>
        )]
        let parentCat=parentCategories[category]
  
        if(parentIdentifiers?.[parentCat]?.["fieldCompOrNormalType"]=="normal" || 
        parentIdentifiers?.[parentCat]?.["fieldCompOrNormalType"]=="composite")
          result.unshift(<th style={{borderRight:realSegmentLast==category && !(theresNormal || theresComposite || !theresOtmDestiny)?"none":"1px solid white"}}>Parent Id</th>)  
        
      }
      result.unshift(<th style={{borderRight:realSegmentLast==category && !(theresNormal || theresComposite || !theresOtmDestiny)?"none":"1px solid white"}}>Id</th>)
    }else{
      let temp=[]
      let normal=otmChoices[segment].normal.length
      let composite=otmChoices[segment].compositeFields.length
      let otmdestiny=otmChoices[segment].otmdestiny.length
      theresNormal=normal>0
      theresComposite=composite>0  
      theresOtmDestiny=otmdestiny>0
      
      
      let lastIndexNumberComposite=-1
      let lastIndexNumber=-1
      otmChoices[segment].normal.forEach((x,index)=>{
        if(x.type=="number")
          lastIndexNumber=index
      })
      otmChoices[segment].compositeFields.forEach((x,index)=>{
        if(x.type=="number")
          lastIndexNumberComposite=index
      })
      
    // console.log("theresnormal",segment,realSegmentLast,lastIndexNumber,lastIndexNumberComposite,realSegmentLast==segment && lastIndexNumber==-1 && lastIndexNumberComposite==-1)
      if(theresNormal)
      otmChoices[segment].normal.forEach((q,index)=>{
          
        if(q.type=="number"){
         // console.log("uiiii",otmChoicesStatistics?.[category]?.[segment],q.name1)
          let otmStatisticsArray=[]
          for(let x in otmChoicesStatistics?.[category]?.[segment]?.[q.name1]){
          //  console.log("o1111",otmChoicesStatistics?.[category]?.[segment]?.[q.name1]?.[x],x)
            if(otmChoicesStatistics?.[category]?.[segment]?.[q.name1]?.[x]==true){
              otmStatisticsArray.push(x)
            }
          }
          //console.log("otmstatisticsarray",otmStatisticsArray)
          //console.log("qqq",q.name1,realSegmentLast,segment,normal-1,index)
          temp.push(<th style={{borderRight:(realSegmentLast==segment && lastIndexNumber==index && lastIndexNumberComposite==-1 && otmStatisticsArray.length==0)?"none":"1px solid white"}}>{q.name1}</th>)
          //Object.keys(otmChoicesStatistics[category][segment]?.[q.name1])
          otmStatisticsArray.forEach((ji,i44)=>{
            
            //if(otmChoicesStatistics[category][segment][q.name1][ji]==true){
              
              temp.push(<th style={{borderRight:lastIndexNumber==index && realSegmentLast==segment && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid white"}}>{ji!="percentage"?ji:`${ji}SetAndSubset`}</th>)
  
            //}
          })
  
        }
      
       
      })
      result=[...result,...temp]
      temp=[]
      if(theresComposite)
       otmChoices[segment].compositeFields.forEach((q,index)=>{
  
        if(q.type=="number"){
          //console.log("compfields33",otmChoices[segment].compositeFields,otmChoicesStatistics[category][segment]?.[q.name1])
  
          let otmStatisticsArray=[]
          for(let x in otmChoicesStatistics?.[category]?.[segment]?.[q.name1]){
            console.log("o2222",otmChoicesStatistics?.[category]?.[segment],category,segment,q.name1,x)
  
            if(otmChoicesStatistics?.[category]?.[segment]?.[q.name1]?.[x]==true){
              otmStatisticsArray.push(x)
            }
          }
          console.log("otmsa",otmStatisticsArray)
          temp.push(<th style={{borderRight:(realSegmentLast==segment && lastIndexNumberComposite==index && otmStatisticsArray.length==0)?"none":"1px solid white"}}>{q.name1}</th>)
          //Object.keys(otmChoicesStatistics[category][segment]?.[q.name1]).
          otmStatisticsArray.forEach((ji,i44)=>{
            //if(otmChoicesStatistics[category][segment][q.name1][ji]==true){
              //if(ji=="media")
                console.log("mediainfo",q.name1,realSegmentLast==segment && lastIndexNumberComposite==index && i44==(otmStatisticsArray.length-1),realSegmentLast,segment,lastIndexNumberComposite,index,i44,otmStatisticsArray.length-1)
              temp.push(<th style={{borderRight:(realSegmentLast==segment && lastIndexNumberComposite==index && i44==(otmStatisticsArray.length-1))===true?"none":"1px solid white"}}>{ji!="percentage"?ji:`${ji}SetAndSubset`}</th>)
  
            //}
          })
        }
      }
       
    )
    //console.log("ppp888",`${segment}TotalCount`,otmChoicesStatistics[category][segment]?.["general"]?.[`${segment}TotalCount`])
  
    
    if(realSegmentLast!==segment){ 
      if(lastIndexNumberComposite!==-1 || lastIndexNumber!==-1){
        if(otmChoicesStatistics?.[category]?.[segment]?.["general"]?.[`${segment}TotalCount`]==true){
  
          result=[<th style={{borderRight:"1px solid white"}}>{`${segment}TotalCount`}</th>,...result,...temp]
        }else
        result=[...result,...temp]
      }
      else{
        if(otmChoicesStatistics?.[category]?.[segment]?.["general"]?.[`${segment}TotalCount`]==true){
  
          result=[<th style={{borderRight:"none"}}>{`${segment}TotalCount`}</th>]
        }
      }
    }else{
      if(lastIndexNumberComposite!==-1 || lastIndexNumber!==-1){
        if(otmChoicesStatistics?.[category]?.[segment]?.["general"]?.[`${segment}TotalCount`]==true){
  
          result=[<th style={{borderRight:"1px solid white"}}>{`${segment}TotalCount`}</th>,...result,...temp]
        }else
          result=[...result,...temp]
      }
      else if(otmChoicesStatistics?.[category]?.[segment]?.["general"]?.[`${segment}TotalCount`]==true){
      
        result=[<th style={{borderRight:"none"}}>{`${segment}TotalCount`}</th>]
      }
    }
     
  }
    
  return result
}*/
const getFieldsSegment=(category,segment,realSegmentLast)=>{
  let result=[]
  let len=0
 // console.log("realsegmentlast111",realSegmentLast)
  //let busca=realSegmentCount
  let theresNormal
  let theresComposite
  let theresOtmDestiny
  if(category==segment){
    if(category==`getData${currentCategory.name}`){
      let normal=firstCatNormalFields[`getData${currentCategory.name}`].normal.length
      let composite=firstCatNormalFields[`getData${currentCategory.name}`].compositeFields.length
      let otmdestiny=firstCatNormalFields[`getData${currentCategory.name}`].otmdestiny.length
      theresNormal=normal>0
      theresComposite=composite>0 
      theresOtmDestiny=otmdestiny>0 
      if(theresNormal)
      result=[...result,...firstCatNormalFields[`getData${currentCategory.name}`].normal.map((q,index)=>{
          let percNumberRow=""
          if(q.type=="number")
            percNumberRow=<th style={{borderRight:(realSegmentLast==category && normal-1==index && !theresComposite)?"none":"1px solid white"}}>{`%${q.name1}Superset-%${q.name1}Set`}</th>
          if(percNumberRow=="")
            return <th style={{borderRight:(realSegmentLast==category && normal-1==index && !theresComposite)?"none":"1px solid white"}}>{q.name1}</th>
          else
          return [<th style={{borderRight:(realSegmentLast==category && normal-1==index && !theresComposite)?"1px solid white":"1px solid white"}}>{q.name1}</th>,percNumberRow]
      }
      )]
      if(theresComposite)
      result=[...result,...firstCatNormalFields[`getData${currentCategory.name}`].compositeFields.map((q,index)=>{
        let percNumberRow=""
        if(q.type=="number")
           percNumberRow=<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && normal-1==index && !(theresComposite || theresOtmDestiny)?"1px solid white":"1px solid white"}}>{`%${q.name1}Superset-%${q.name1}Set`}</td>
        if(percNumberRow=="")
          return <th style={{borderRight:(realSegmentLast==category && composite-1==index && !theresOtmDestiny)?"none":"1px solid white"}}>{q.name1}</th>
        else
          return [<th style={{borderRight:(realSegmentLast==category && composite-1==index && !theresOtmDestiny)?"1px solid white":"1px solid white"}}>{q.name1}</th>,percNumberRow]
       
      }
      )]
      /*if(theresOtmDestiny)
      result=[...result,...firstCatNormalFields[`getData${currentCategory.name}`].otmdestiny.map((q,index)=>
        <th style={{borderRight:(realSegmentLast==category && composite-1==index)?"none":"1px solid white"}}>{q.name1}</th>
      )]*/

      
    }else{
      //console.log("otmchoices22",otmChoices[segment])
      let arr
    if(category.startsWith("mtm"))
      arr=otmChoices[category]
    else if(category.startsWith("otm"))
      arr=otmChoices[category]
      let normal=arr.normal.length
      let composite=arr.compositeFields.length
      let otmdestiny=0
      if(category.startsWith("otm"))
       otmdestiny=arr.otmdestiny.length
      theresNormal=normal>0
      theresComposite=composite>0  
      theresOtmDestiny=otmdestiny>0
      if(theresNormal)   
      result=[...result,...arr.normal.map((q,index)=>{
        let percNumberRow=""
        if(q.type=="number")
           percNumberRow=<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && normal-1==index && !(theresComposite || theresOtmDestiny)?"none":"1px solid white"}}>{`%${q.name1}Superset-%${q.name1}Set`}</td>
        if(percNumberRow=="")
          return <th style={{borderRight:(realSegmentLast==category && normal-1==index && !(theresComposite || theresOtmDestiny))?"none":"1px solid white"}}>{q.name1}</th>
        else
          return [<th style={{borderRight:(realSegmentLast==category && normal-1==index && !(theresComposite || theresOtmDestiny))?"1px solid white":"1px solid white"}}>{q.name1}</th>,percNumberRow]

      })]
      if(theresComposite)
      result=[...result,...arr.compositeFields.map((q,index)=>{
        let percNumberRow=""
        if(q.type=="number")
           percNumberRow=<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && normal-1==index && !(theresComposite || theresOtmDestiny)?"1px solid black":"1px solid black"}}>{`%${q.name1}Superset-%${q.name1}Set`}</td>
        if(percNumberRow=="")
          return <th style={{borderRight:(realSegmentLast==category && composite-1==index && !theresOtmDestiny)?"none":"1px solid white"}}>{q.name1}</th>
        else
        return [<th style={{borderRight:(realSegmentLast==category && composite-1==index && !theresOtmDestiny)?"1px solid white":"1px solid white"}}>{q.name1}</th>,percNumberRow]
      }
      )]
      if(theresOtmDestiny==true)
      result=[...result,...arr.otmdestiny.map((q,index)=>
        <th style={{borderRight:(realSegmentLast==category && otmdestiny-1==index)?"none":"1px solid white"}}>{q}</th>
      )]
      let parentCat=parentCategories[category]

      if(parentIdentifiers?.[parentCat]?.["fieldCompOrNormalType"]=="normal" || 
      parentIdentifiers?.[parentCat]?.["fieldCompOrNormalType"]=="composite")
        result.unshift(<th style={{borderRight:realSegmentLast==category && !(theresNormal || theresComposite || !theresOtmDestiny)?"none":"1px solid white"}}>Parent Id</th>)  
      
    }
    result.unshift(<th id={`${category}Id`} style={{borderRight:realSegmentLast==category && !(theresNormal || theresComposite || !theresOtmDestiny)?"none":"1px solid white"}}>Id</th>)
  }else{
    let temp=[]
    let arr
    if(segment.startsWith("mtm"))
      arr=otmChoices[segment]
    else if(segment.startsWith("otm"))
      arr=otmChoices[segment]
    let normal=arr.normal.filter(x=>{
      if(x.type!="number" && x.dataType!="queryCategory")
        return true
      return false}).length
    let composite=arr.compositeFields.length
    let otmdestiny=arr?.otmdestiny?.length
    theresNormal=normal>0
    theresComposite=composite>0  
    theresOtmDestiny=otmdestiny>0
    
    
    let lastIndexNumberComposite=-1
    let lastIndexNumber=-1
    arr.normal.forEach((x,index)=>{
      if(x.type!="number" && x.dataType!="queryCategory")
        lastIndexNumber=index
    })
    arr.compositeFields.forEach((x,index)=>{
      if(x.type=="number")
        lastIndexNumberComposite=index
    })
    
    //console.log("theresnormal",segment,realSegmentLast,lastIndexNumber,lastIndexNumberComposite,realSegmentLast==segment && lastIndexNumber==-1 && lastIndexNumberComposite==-1)
    if(theresNormal)
      arr.normal.forEach((q,index)=>{
        
      if(q.type=="number" && q.dataType!="queryCategory"){
       // console.log("uiiii",otmChoicesStatistics?.[category]?.[segment],q.name1)
        let otmStatisticsArray=[]
        for(let x in otmChoicesStatistics?.[category]?.[segment]?.[q.name1]){
          //console.log("o1111",otmChoicesStatistics?.[category]?.[segment]?.[q.name1]?.[x],x)
          if(otmChoicesStatistics?.[category]?.[segment]?.[q.name1]?.[x]==true){
            otmStatisticsArray.push(x)
          }
        }
       // console.log("otmstatisticsarray",otmStatisticsArray)
        //console.log("qqq",q.name1,realSegmentLast,segment,normal-1,index)
        temp.push(<th id={`${category}_${segment}_${q.name1}`} style={{borderRight:(realSegmentLast==segment && lastIndexNumber==index && lastIndexNumberComposite==-1 && otmStatisticsArray.length==0)?"none":"1px solid white"}}>{q.name1}</th>)
        temp.push(<th style={{borderRight:(realSegmentLast==segment && lastIndexNumber==index && lastIndexNumberComposite==-1 && otmStatisticsArray.length==0)?"none":"1px solid white"}}>{q.name1}Unique</th>)
        //Object.keys(otmChoicesStatistics[category][segment]?.[q.name1])
        otmStatisticsArray.forEach((ji,i44)=>{
          
          //if(otmChoicesStatistics[category][segment][q.name1][ji]==true){
            if(ji!=="total"){
            if(ji!="percentage")
              temp.push(<th id={`${category}_${segment}_${q.name1}_${ji}`}style={{borderRight:lastIndexNumber==index && realSegmentLast==segment && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"1px solid white":"1px solid white"}}>{ji}</th>)
            else
              temp.push(<th id={`${category}_${segment}_${q.name1}_${ji}`}style={{borderRight:lastIndexNumber==index && realSegmentLast==segment && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"1px solid white":"1px solid white",whiteSpace:"nowrap"}}>{ji}Set-{ji}Subset</th>)
            if(ji=="percentage")
              temp.push(<th style={{borderRight:lastIndexNumber==index && realSegmentLast==segment && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"1px solid white":"1px solid white",whiteSpace:"nowrap"}}>{ji}NoRepeatSet-{ji}NoRepeatSubset</th>)
            temp.push(<th style={{borderRight:lastIndexNumber==index && realSegmentLast==segment && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"1px solid white":"1px solid white",whiteSpace:"nowrap"}}>{ji}Unique</th>)
            
            if(ji=="percentage")
              temp.push(<th style={{borderRight:lastIndexNumber==index && realSegmentLast==segment && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"1px solid white":"1px solid white",whiteSpace:"nowrap"}}>{ji}NoRepeatUniqueSet-{ji}NoRepeatUniqueSubset</th>)
            //temp.push(<th style={{borderRight:lastIndexNumber==index && realSegmentLast==segment && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"1px solid white":"1px solid white"}}>{ji}NoRepeat</th>)
            
              

            }//
          //}
        })

      }
    
     
    })
    result=[...result,...temp]
    temp=[]
    if(theresComposite)
     arr.compositeFields.forEach((q,index)=>{

      if(q.type=="number"){
        //console.log("compfields33",otmChoices[segment].compositeFields,otmChoicesStatistics[category][segment]?.[q.name1])

        let otmStatisticsArray=[]
        for(let x in otmChoicesStatistics?.[category]?.[segment]?.[q.name1]){
         // console.log("o2222",otmChoicesStatistics?.[category]?.[segment],category,segment,q.name1,x)

          if(otmChoicesStatistics?.[category]?.[segment]?.[q.name1]?.[x]==true){
            otmStatisticsArray.push(x)
          }
        }
    // console.log("otmsa",otmStatisticsArray)
        temp.push(<th id={`${category}_${segment}_${q.name1}`}style={{borderRight:(realSegmentLast==segment && lastIndexNumberComposite==index && otmStatisticsArray.length==0)?"none":"1px solid white"}}>{q.name1}</th>)
        temp.push(<th style={{borderRight:(realSegmentLast==segment && lastIndexNumberComposite==index && otmStatisticsArray.length==0)?"none":"1px solid white"}}>{q.name1}Unique</th>)
        //Object.keys(otmChoicesStatistics[category][segment]?.[q.name1]).
        otmStatisticsArray.forEach((ji,i44)=>{
          //if(otmChoicesStatistics[category][segment][q.name1][ji]==true){
            //if(ji=="media")
            if(ji!="total"){
              if(ji!="percentage")
              temp.push(<th id={`${category}_${segment}_${q.name1}_${ji}`}style={{borderRight:lastIndexNumber==index && realSegmentLast==segment && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"1px solid white":"1px solid white"}}>{ji}</th>)
            else
              temp.push(<th id={`${category}_${segment}_${q.name1}_${ji}`}style={{borderRight:lastIndexNumber==index && realSegmentLast==segment && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"1px solid white":"1px solid white",whiteSpace:"nowrap"}}>{ji}Set-{ji}Subset</th>)
              if(ji=="percentage")
                temp.push(<th style={{borderRight:lastIndexNumber==index && realSegmentLast==segment && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"1px solid white":"1px solid white",whiteSpace:"nowrap"}}>{ji}NoRepeatSet-{ji}NoRepeatSubset</th>)
              temp.push(<th style={{borderRight:lastIndexNumber==index && realSegmentLast==segment && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"1px solid white":"1px solid white"}}>{ji}Unique</th>)
              if(ji=="percentage")
                temp.push(<th style={{borderRight:lastIndexNumber==index && realSegmentLast==segment && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"1px solid white":"1px solid white",whiteSpace:"nowrap"}}>{ji}NoRepeatUniqueSet-{ji}NoRepeatUniqueSubset</th>)

              
            }

          //}
        })
      }
    }
     
  )
  //console.log("ppp888",`${segment}TotalCount`,otmChoicesStatistics[category][segment]?.["general"]?.[`${segment}TotalCount`])

  
  if(realSegmentLast!==segment){ 
    if(lastIndexNumberComposite!==-1 || lastIndexNumber!==-1){
      if(otmChoicesStatistics?.[category]?.[segment]?.["general"]?.[`totalCount`]==true){

        result=[<th id={`${category}_${segment}_totalCount`} style={{borderRight:"1px solid white"}}>{`${segment}TotalCount`}</th>,
        <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`%${segment}TotalCountSuperset-Subset`}</th>,
        <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`%${segment}NoRepeatTotalCountSuperset-Subset`}</th>,
        <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`${segment}UniqueTotalCount`}</th>,
        <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`%${segment}UniqueTotalCountSuperset-Subset`}</th>,
        <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`%${segment}NoRepeatUniqueTotalCountSuperset-Subset`}</th>,
        ...result,...temp]

      }else
      result=[...result,...temp]
    }
    else{
      if(otmChoicesStatistics?.[category]?.[segment]?.["general"]?.[`totalCount`]==true){

        result=[<th id={`${category}_${segment}_totalCount`} style={{borderRight:"none"}}>{`${segment}TotalCount`}</th>,
        <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`%${segment}TotalCountSuperset-Subset`}</th>,
        <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`%${segment}NoRepeatTotalCountSuperset-Subset`}</th>,
        <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`${segment}UniqueTotalCount`}</th>,
        <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`%${segment}UniqueTotalCountSuperset-Subset`}</th>,
        <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`%${segment}NoRepeatUniqueTotalCountSuperset-Subset`}</th>,]
      }
    }
  }else{
    if(lastIndexNumberComposite!==-1 || lastIndexNumber!==-1){
      if(otmChoicesStatistics?.[category]?.[segment]?.["general"]?.[`totalCount`]==true){

        result=[<th id={`${category}_${segment}_totalCount`} style={{borderRight:"1px solid white"}}>{`${segment}TotalCount`}</th>,
        <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`%${segment}TotalCountSuperset-Subset`}</th>,
        <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`%${segment}NoRepeatTotalCountSuperset-Subset`}</th>,
        <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`${segment}UniqueTotalCount`}</th>,
        <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`%${segment}UniqueTotalCountSuperset-Subset`}</th>,
        <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`%${segment}NoRepeatUniqueTotalCountSuperset-Subset`}</th>,
        ...result,...temp]
      }else
        result=[...result,...temp]
    }
    else if(otmChoicesStatistics?.[category]?.[segment]?.["general"]?.[`totalCount`]==true){
    
      result=[<th id={`${category}_${segment}_totalCount`} style={{/*borderRight:"none"*/borderRight:"none"}}>{`${segment}TotalCount`}</th>,
      <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`%${segment}TotalCountSuperset-Subset`}</th>,
        <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`%${segment}NoRepeatTotalCountSuperset-Subset`}</th>,
        <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`${segment}UniqueTotalCount`}</th>,
        <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`%${segment}UniqueTotalCountSuperset-Subset`}</th>,
        <th style={{borderRight:"1px solid white",whiteSpace:"nowrap"}}>{`%${segment}NoRepeatUniqueTotalCountSuperset-Subset`}</th>,]
    }
  }
    /*if(theresOtmDestiny)
    otmChoices[segment].otmdestiny.forEach((q,index)=>{
      temp.push(<th style={{borderRight:realSegmentLast==segment && index==otmdestiny-1?"none":"1px solid white"}}>{q.name1}</th>)
    })*/
  
}
  
  return result
}
  const getNumericFields=(cat)=>{
    let res={normal:[],compositeFields:[]}
    if(cat==`getData${currentCategory.name}`){
      firstCatNormalFields?.[cat]?.["normal"].forEach(x=>{
        if(x.type=="number")
          res["normal"].push(x.name1)
    
      })
      firstCatNormalFields?.[cat]?.["compositeFields"].forEach(x=>{
        if(x.type=="number")
          res["compositeFields"].push(x.name1)
      })
  
    }else{
      
      otmChoices?.[cat]?.["normal"].forEach(x=>{
        if(x.type=="number")
          res["normal"].push(x.name1)
  
      })
      otmChoices?.[cat]?.["compositeFields"].forEach(x=>{
        if(x.type=="number")
          res["compositeFields"].push(x.name1)
      })
      
    }
  //  console.log("numericvalues",cat,res)
    return res
  }

  /*const getCategoriesGrandTotals=(category,ssd)=>{
   // console.log("ssd879",ssd)
    if(realGrandTotals1[category]==undefined)
      realGrandTotals1[category]={}
    if(realGrandTotals1[category][subset]==undefined)
      realGrandTotals1[category]={...realGrandTotals1[category],[subset]:{}}
  
    Object.keys(ssd[category][subset]).forEach(y=>{
      let nf=getNumericFields(y)
  
    
  
      if(realGrandTotals1[category][subset]?.[y]==undefined)
        realGrandTotals1[category][subset][y]={}
  
                    
      Object.keys(ssd[category][subset][y]).forEach(u=>{
        for(let j1=0;j1<nf.normal.length;j1++){
          if(realGrandTotals1[category][subset][y][`${nf["normal"][j1]}total`]==undefined)
            realGrandTotals1[category][subset][y][`${nf["normal"][j1]}total`]=0
          let st=0
          if(category==y)
            st=ssd[category][subset][y][u][nf.normal[j1]]
          else
            st=ssd[category][subset][y][u][`${nf.normal[j1]}total`]
  
          realGrandTotals1[category][subset][y]={...realGrandTotals1[category][subset][y],[`${nf["normal"][j1]}total`]:realGrandTotals1[category][subset][y][`${nf["normal"][j1]}total`]+st}
        }
        for(let j1=0;j1<nf.compositeFields.length;j1++){
          if(realGrandTotals1[category][subset][y]?.[`${nf["compositeFields"][j1]}total`]==undefined)
            realGrandTotals1[category][subset][y][`${nf["compositeFields"][j1]}total`]=0
          let st=0
          if(category==y)
            st=ssd[category][subset][y][u][nf.compositeFields[j1]]            
          else
            st=ssd[category][subset][y][u][`${nf.compositeFields[j1]}total`]
          realGrandTotals1[category][subset][y]={...realGrandTotals1[category][subset][y],[`${nf["compositeFields"][j1]}total`]:realGrandTotals1[category][subset][y][`${nf["compositeFields"][j1]}total`]+st}
        }
  
      })
      Object.keys(ssd[category][subset][y]).forEach(u=>{
        if(realGrandTotals1[category][subset][y]?.[`${y}TotalCount`]==undefined)
          realGrandTotals1[category][subset][y][`${y}TotalCount`]=0
        if(realGrandTotals1[category][subset][y]?.[`${y}TotalCountArray`]==undefined)
          realGrandTotals1[category][subset][y][`${y}TotalCountArray`]=[]
        
        realGrandTotals1[category][subset][y][`${y}TotalCount`]=realGrandTotals1[category][subset][y][`${y}TotalCount`]+ssd[category][subset][y][u][`${y}TotalCount`]
        realGrandTotals1[category][subset][y][`${y}TotalCountArray`].push(ssd[category][subset][y][u][`${y}TotalCount`])
  
  
      })
      realGrandTotals1?.[category]?.[subset]?.[y]?.[`${y}TotalCountArray`]?.sort((a,b)=>a-b)
  
    })
   //console.log("realGrandtotals",realGrandTotals1)
  }*/
  const getCategoriesGrandTotals=(category,ssd)=>{

  if(realGrandTotals1[category]==undefined)
    realGrandTotals1[category]={}
  if(realGrandTotals1[category][subset]==undefined)
      realGrandTotals1[category]={...realGrandTotals1[category],[subset]:{}}
  

  Object.keys(ssd[category][subset]).forEach(y=>{
    let nf=getNumericFields(y)

  

    if(realGrandTotals1[category][subset]?.[y]==undefined)
        realGrandTotals1[category][subset][y]={}
  
    let idAlreadyDone=[]             
    Object.keys(ssd[category][subset][y]).forEach(u=>{
      for(let j1=0;j1<nf.normal.length;j1++){

        if(realGrandTotals1[category][subset][y][`${nf["normal"][j1]}total`]==undefined)
            realGrandTotals1[category][subset][y][`${nf["normal"][j1]}total`]=0
          
        if(realGrandTotals1[category][subset][y]?.[`${nf["normal"][j1]}UniqueTotal`]==undefined)
          realGrandTotals1[category][subset][y][`${nf["normal"][j1]}UniqueTotal`]=0
        let st=0
        let st1=0
          if(category==y)
            st=ssd[category][subset][y][u][nf.normal[j1]]
          else
            st=ssd[category][subset][y][u][`${nf.normal[j1]}total`]
  
          if(ssd[category][subset][y][u]?.[`${nf.normal[j1]}UniqueTotal`]!=undefined)
            st1=ssd[category][subset][y][u][`${nf.normal[j1]}UniqueTotal`]
          else 
            st1=0
        

        realGrandTotals1[category][subset][y]={...realGrandTotals1[category][subset][y],
          [`${nf["normal"][j1]}total`]:realGrandTotals1[category][subset][y][`${nf["normal"][j1]}total`]+st,
          [`${nf["normal"][j1]}UniqueTotal`]:realGrandTotals1[category][subset][y]?.[`${nf["normal"][j1]}UniqueTotal`]+st1
        }
        if(category!=y){
          if(realGrandTotals1[category][subset][y][`${nf["normal"][j1]}NoRepeatTotal`]==undefined)
            realGrandTotals1[category][subset][y]={...realGrandTotals1[category][subset][y],[`${nf["normal"][j1]}NoRepeatTotal`]:0}
          if(realGrandTotals1[category][subset][y][`${nf["normal"][j1]}NoRepeatUniqueTotal`]==undefined)
            realGrandTotals1[category][subset][y]={...realGrandTotals1[category][subset][y],[`${nf["normal"][j1]}NoRepeatUniqueTotal`]:0}
  
        //empieza fragmento donde los ids no son los mismos
          if(!idAlreadyDone.includes(ssd[category][subset][y][u]?.["id"])){
            realGrandTotals1[category][subset][y]={...realGrandTotals1[category][subset][y],
              [`${nf["normal"][j1]}NoRepeatTotal`]:realGrandTotals1[category][subset][y][`${nf["normal"][j1]}NoRepeatTotal`]+st,
              [`${nf["normal"][j1]}NoRepeatUniqueTotal`]:realGrandTotals1[category][subset][y]?.[`${nf["normal"][j1]}NoRepeatUniqueTotal`]+st1
            }
        
            //idAlreadyDone.push(ssd[category][subset][y][u]?.["id"])
        
          }
        }
    
      }

      


      //termina fragmento donde los ids no son los mismos

      
      for(let j1=0;j1<nf.compositeFields.length;j1++){
        if(realGrandTotals1[category][subset][y]?.[`${nf["compositeFields"][j1]}total`]==undefined)
          realGrandTotals1[category][subset][y][`${nf["compositeFields"][j1]}total`]=0
          if(realGrandTotals1[category][subset][y]?.[`${nf["compositeFields"][j1]}UniqueTotal`]==undefined)
          realGrandTotals1[category][subset][y][`${nf["compositeFields"][j1]}UniqueTotal`]=0
        let st=0
        let st1=0
        if(category==y)
          st=ssd[category][subset][y][u][nf.compositeFields[j1]]            
        else{
          st=ssd[category][subset][y][u][`${nf.compositeFields[j1]}total`]
          if(ssd[category][subset][y][u][`${nf.compositeFields[j1]}UniqueTotal`]==undefined)
            st1=0
          else
            st1=ssd[category][subset][y][u][`${nf.compositeFields[j1]}UniqueTotal`]
        }
        realGrandTotals1[category][subset][y]={...realGrandTotals1[category][subset][y],
          [`${nf["compositeFields"][j1]}total`]:realGrandTotals1[category][subset][y][`${nf["compositeFields"][j1]}total`]+st,
          [`${nf["compositeFields"][j1]}UniqueTotal`]:realGrandTotals1[category][subset][y][`${nf["compositeFields"][j1]}UniqueTotal`]+st1
        }
        if(category!=y){
          if(realGrandTotals1[category][subset][y][`${nf["compositeFields"][j1]}NoRepeatTotal`]==undefined)
            realGrandTotals1[category][subset][y]={...realGrandTotals1[category][subset][y],[`${nf["compositeFields"][j1]}NoRepeatTotal`]:0}
          if(realGrandTotals1[category][subset][y][`${nf["compositeFields"][j1]}NoRepeatUniqueTotal`]==undefined)
            realGrandTotals1[category][subset][y]={...realGrandTotals1[category][subset][y],[`${nf["compositeFields"][j1]}NoRepeatUniqueTotal`]:0}
  
        //empieza fragmento donde los ids no son los mismos
        if(!idAlreadyDone.includes(ssd[category][subset][y][u]?.["id"])){
            realGrandTotals1[category][subset][y]={...realGrandTotals1[category][subset][y],
              [`${nf["compositeFields"][j1]}NoRepeatTotal`]:realGrandTotals1[category][subset][y][`${nf["compositeFields"][j1]}NoRepeatTotal`]+st,
              [`${nf["compositeFields"][j1]}NoRepeatUniqueTotal`]:realGrandTotals1[category][subset][y]?.[`${nf["compositeFields"][j1]}NoRepeatUniqueTotal`]+st1
            }
        
            //idAlreadyDone.push(finalObject[category][y][u]?.["id"])
        
          }
        }
      }
      
      if(!idAlreadyDone.includes(ssd[category][subset][y][u]?.["id"]))
       idAlreadyDone.push(ssd[category][subset][y][u]?.["id"])
    })
    idAlreadyDone=[]
    Object.keys(ssd[category][subset][y]).forEach(u=>{
      if(realGrandTotals1[category][subset][y]?.[`${y}TotalCount`]==undefined)
        realGrandTotals1[category][subset][y][`${y}TotalCount`]=0
      if(realGrandTotals1[category][subset][y]?.[`${y}NoRepeatTotalCount`]==undefined)
        realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCount`]=0


      if(realGrandTotals1[category][subset][y]?.[`${y}TotalCountArray`]==undefined)
        realGrandTotals1[category][subset][y][`${y}TotalCountArray`]=[]
      if(realGrandTotals1[category][subset][y]?.[`${y}NoRepeatTotalCountArray`]==undefined)
        realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCountArray`]=[]


        if(realGrandTotals1[category][subset][y]?.[`${y}TotalCountUnique`]==undefined)
          realGrandTotals1[category][subset][y][`${y}TotalCountUnique`]=0
        if(realGrandTotals1[category][subset][y]?.[`${y}NoRepeatTotalCountUnique`]==undefined)
          realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCountUnique`]=0


      if(realGrandTotals1[category][subset][y]?.[`${y}TotalCountArrayUnique`]==undefined)
        realGrandTotals1[category][subset][y][`${y}TotalCountArrayUnique`]=[]
        if(realGrandTotals1[category][subset][y]?.[`${y}NoRepeatTotalCountArrayUnique`]==undefined)
        realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCountArrayUnique`]=[]
      
      realGrandTotals1[category][subset][y][`${y}TotalCount`]=realGrandTotals1[category][subset][y][`${y}TotalCount`]+ssd[category][subset][y][u][`${y}TotalCount`]
      realGrandTotals1[category][subset][y][`${y}TotalCountArray`].push(ssd[category][subset][y][u][`${y}TotalCount`])

      realGrandTotals1[category][subset][y][`${y}TotalCountUnique`]=realGrandTotals1[category][subset][y][`${y}TotalCountUnique`]+ssd[category][subset][y][u][`${y}UniqueTotalCount`]
      realGrandTotals1[category][subset][y][`${y}TotalCountArrayUnique`].push(ssd[category][subset][y][u][`${y}UniqueTotalCount`])

      if(!idAlreadyDone.includes(ssd[category][subset][y][u]["id"])){
        realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCount`]=realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCount`]+ssd[category][subset][y][u][`${y}TotalCount`]
        realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCountArray`].push(ssd[category][subset][y][u][`${y}TotalCount`])

        realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCountUnique`]=realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCountUnique`]+ssd[category][subset][y][u][`${y}UniqueTotalCount`]
        realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCountArrayUnique`].push(ssd[category][subset][y][u][`${y}UniqueTotalCount`])
        idAlreadyDone.push(ssd[category][subset][y][u][`id`])
        
      }


    })
    
    realGrandTotals1?.[category]?.[subset]?.[y]?.[`${y}TotalCountArray`]?.sort((a,b)=>a-b)
    realGrandTotals1?.[category]?.[subset]?.[y]?.[`${y}NoRepeatTotalCountArray`]?.sort((a,b)=>a-b)
    realGrandTotals1?.[category]?.[subset]?.[y]?.[`${y}TotalCountArrayUnique`]?.sort((a,b)=>a-b)
    realGrandTotals1?.[category]?.[subset]?.[y]?.[`${y}NoRepeatTotalCountArrayUnique`]?.sort((a,b)=>a-b)
  })
  //onsole.log("realgt",realGrandTotals1)
}

/*const calculatePercentageOverGrandTotal=(ssd)=>{
    if(tableTotalRecords[category]==undefined)
      tableTotalRecords[category]=0
    Object.keys(realGrandTotals1[category][subset]).forEach((y,p)=>{
    //  console.log("verifverif",ssd,realGrandTotals1)
      if(p==0)
        tableTotalRecords[category]=Object.keys(ssd[y]).length
      Object.keys(ssd[y]).forEach(u=>{
        if(category==`getData${currentCategory.name}`){
          if(y==`getData${currentCategory.name}`){
            
            firstCatNormalFields[y].normal.forEach(i=>{
              if(i.type=="number"){
                console.log("verifwrong",y,u,i.name1,ssd?.[y]?.[u]?.[i.name1],realGrandTotals1[category][subset][y][`${i.name1}total`])
                ssd[y][u][`%${i.name1}Subset`]=(ssd?.[y]?.[u]?.[i.name1]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[y][u][i.name1]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
                
                //ssd[y][u][`%${i.name1}NoRepeatSubset`]=(ssd?.[y]?.[u]?.[i.name1]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`]>0)?(ssd[y][u][i.name1]/realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`])*100:0
               
                if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(subsetsData[y][u][i.name1])
              }    
            })
            firstCatNormalFields[y].compositeFields.forEach(i=>{
              if(i.type=="number"){
                ssd[y][u][`%${i.name1}Subset`]=(ssd?.[y]?.[u]?.[`${i.name1}`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[y][u][`${i.name1}`]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
                
                if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(ssd[y][u][i.name1])
              }
            })
          }else{
            ssd[y][u][`%${y}TotalCountSubset`]=(ssd?.[y]?.[u]?.[`${y}TotalCount`]!=undefined && realGrandTotals1[category][subset][y][`${y}TotalCount`]>0)?(ssd[y][u][`${y}TotalCount`]/realGrandTotals1[category][subset][y][`${y}TotalCount`]):0
            ssd[y][u][`%${y}TotalCountUniqueSubset`]=(ssd?.[y]?.[u]?.[`${y}UniqueTotalCount`]!=undefined && realGrandTotals1[category][subset][y][`${y}TotalCountUnique`]>0)?(ssd[y][u][`${y}UniqueTotalCount`]/realGrandTotals1[category][subset][y][`${y}TotalCountUnique`]):0
            ssd[y][u][`%${y}NoRepeatTotalCountSubset`]=(ssd?.[y]?.[u]?.[`${y}TotalCount`]!=undefined && realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCount`]>0)?(ssd[y][u][`${y}TotalCount`]/realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCount`]):0
            ssd[y][u][`%${y}NoRepeatTotalCountUniqueSubset`]=(ssd?.[y]?.[u]?.[`${y}UniqueTotalCount`]!=undefined && realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCountUnique`]>0)?(ssd[y][u][`${y}UniqueTotalCount`]/realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCountUnique`]):0
            otmChoices[y].normal.forEach(i=>{
              if(i.type=="number"){
                console.log("verifwrong",y,u,i.name1,ssd?.[y]?.[u]?.[i.name1],realGrandTotals1[category][subset][y][`${i.name1}total`])
                ssd[y][u][`%${i.name1}Subset`]=(ssd?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
                ssd[y][u][`%${i.name1}NoRepeatSubset`]=(ssd?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`]>0)?(ssd[y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`])*100:0
                ssd[y][u][`%${i.name1}UniqueSubset`]=(ssd?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`]>0)?(ssd[y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`])*100:0
                ssd[y][u][`%${i.name1}NoRepeatUniqueSubset`]=(ssd?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`]>0)?(ssd[y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`])*100:0
                if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(ssd[y][u][`${i.name1}total`])
              }
            })
            otmChoices[y].compositeFields.forEach(i=>{
              if(i.type=="number"){
                ssd[y][u][`%${i.name1}Subset`]=(ssd?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
                ssd[y][u][`%${i.name1}NoRepeatSubset`]=(ssd?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`]>0)?(ssd[y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`])*100:0
                ssd[y][u][`%${i.name1}UniqueSubset`]=(ssd?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`]>0)?(ssd[y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`])*100:0
                ssd[y][u][`%${i.name1}NoRepeatUniqueSubset`]=(ssd?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`]>0)?(ssd[y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`])*100:0
                if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(ssd[y][u][`${i.name1}total`])
              }
            })
          }
        }else{
          if(category==y){
            otmChoices[y].normal.forEach(i=>{
              if(i.type=="number"){
                console.log("verifwrong",y,u,i.name1,ssd?.[y]?.[u]?.[i.name1],realGrandTotals1[category][subset][y][`${i.name1}total`])
               // console.log("supervision",realGrandTotals1[category][subset],y,`${i.name1}total`,realGrandTotals1[category][subset][y][`${i.name1}total`])
               ssd[y][u][`%${i.name1}Subset`]=(ssd?.[y]?.[u]?.[`${i.name1}`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[y][u][`${i.name1}`]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
               //ssd[y][u][`%${i.name1}NoRepeatSubset`]=(ssd?.[y]?.[u]?.[`%${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`]>0)?(ssd[y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`])*100:0
                //((finalObject[category][y][u][`${i.name1}`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
                if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(ssd[y][u][i.name1])
              }
            })
            otmChoices[y].compositeFields.forEach(i=>{
              if(i.type=="number"){
                ssd[y][u][`%${i.name1}Subset`]=(ssd?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
                
                //((finalObject[category][y][u][`${i.name1}`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
                if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
              realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(ssd[y][u][i.name1])
              }
            })
          }else{
            ssd[y][u][`%${y}TotalCountSubset`]=(ssd?.[y]?.[u]?.[`${y}TotalCount`]!=undefined && realGrandTotals1[category][subset][y][`${y}TotalCount`]>0)?(ssd[y][u][`${y}TotalCount`]/realGrandTotals1[category][subset][y][`${y}TotalCount`]):0
            ssd[y][u][`%${y}TotalCountUniqueSubset`]=(ssd?.[y]?.[u]?.[`${y}UniqueTotalCount`]!=undefined && realGrandTotals1[category][subset][y][`${y}TotalCountUnique`]>0)?(ssd[y][u][`${y}UniqueTotalCount`]/realGrandTotals1[category][subset][y][`${y}TotalCountUnique`]):0
            ssd[y][u][`%${y}NoRepeatTotalCountSubset`]=(ssd?.[y]?.[u]?.[`${y}TotalCount`]!=undefined && realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCount`]>0)?(ssd[y][u][`${y}TotalCount`]/realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCount`]):0
            ssd[y][u][`%${y}NoRepeatTotalCountUniqueSubset`]=(ssd?.[y]?.[u]?.[`${y}UniqueTotalCount`]!=undefined && realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCountUnique`]>0)?(ssd[y][u][`${y}UniqueTotalCount`]/realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCountUnique`]):0
            otmChoices[y].normal.forEach(i=>{
              if(i.type=="number"){
                ssd[y][u][`%${i.name1}Subset`]=(ssd?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
                ssd[y][u][`%${i.name1}NoRepeatSubset`]=(ssd?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`]>0)?(ssd[y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`])*100:0
                ssd[y][u][`%${i.name1}UniqueSubset`]=(ssd?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`]>0)?(ssd[y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`])*100:0
                ssd[y][u][`%${i.name1}NoRepeatUniqueSubset`]=(ssd?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`]>0)?(ssd[y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`])*100:0
                //((finalObject[category][y][u][`${i.name1}total`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
                if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(ssd[y][u][`${i.name1}total`])
              }
            })
            otmChoices[y].compositeFields.forEach(i=>{
              if(i.type=="number"){
                ssd[y][u][`%${i.name1}Subset`]=(ssd?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
                ssd[y][u][`%${i.name1}NoRepeatSubset`]=(ssd?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`]>0)?(ssd[y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`])*100:0
                ssd[y][u][`%${i.name1}UniqueSubset`]=(ssd?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`]>0)?(ssd[y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`])*100:0
                ssd[y][u][`%${i.name1}NoRepeatUniqueSubset`]=(ssd?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`]>0)?(ssd[y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`])*100:0
                //((finalObject[category][y][u][`${i.name1}total`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
                if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(ssd[y][u][`${i.name1}total`])
              }
            })
          }
          
  
        }
      })
  
    })
    
  }*/

  const calculatePercentageOverGrandTotal=(ssd,category)=>{
  if(tableTotalRecords[category]==undefined)
    tableTotalRecords[category]=0
  Object.keys(realGrandTotals1[category][subset]).forEach((y,p)=>{
    if(p==0)
      tableTotalRecords[category]=Object.keys(ssd[category][subset][y]).length
    let idAlreadyDone=[]
    Object.keys(ssd[category][subset][y]).forEach(u=>{
      if(category==`getData${currentCategory.name}`){
        if(y==`getData${currentCategory.name}`){
          
          firstCatNormalFields[y].normal.forEach(i=>{
            if(i.type=="number"){
              console.log("gerger",ssd?.[category]?.[y]?.[u]?.[i.name1],realGrandTotals1[category][subset][y][`${i.name1}total`])
              ssd[category][subset][y][u][`%${i.name1}Subset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[i.name1]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[category][subset][y][u][i.name1]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
              if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
              realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(ssd[category][subset][y][u][i.name1])
            }    
          })
          firstCatNormalFields[y].compositeFields.forEach(i=>{
            if(i.type=="number"){
              ssd[category][subset][y][u][`%${i.name1}Subset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[i.name1]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[category][subset][y][u][i.name1]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
              if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
              realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(ssd[category][subset][y][u][i.name1])
            }
          })
        }else{
          let arr
          ssd[category][subset][y][u][`%${y}TotalCountSubset`]=ssd?.[category]?.[subset]?.[y]?.[u]?.[`${y}TotalCount`]!=undefined && realGrandTotals1[category][subset][y][`${y}TotalCount`]>0?
          ssd?.[category]?.[subset]?.[y]?.[u]?.[`${y}TotalCount`]/realGrandTotals1[category][subset][y][`${y}TotalCount`]:0

          ssd[category][subset][y][u][`%${y}NoRepeatTotalCountSubset`]=ssd?.[category]?.[subset]?.[y]?.[u]?.[`${y}TotalCount`]!=undefined && realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCount`]>0?
          ssd?.[category]?.[subset]?.[y]?.[u]?.[`${y}TotalCount`]/realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCount`]:0

          ssd[category][subset][y][u][`%${y}TotalCountUniqueSubset`]=ssd?.[category]?.[subset]?.[y]?.[u]?.[`${y}UniqueTotalCount`]!=undefined && realGrandTotals1[category][subset][y][`${y}TotalCountUnique`]>0?
          ssd?.[category]?.[subset]?.[y]?.[u]?.[`${y}UniqueTotalCount`]/realGrandTotals1[category][subset][y][`${y}TotalCountUnique`]:0

          ssd[category][subset][y][u][`%${y}NoRepeatTotalCountUniqueSubset`]=ssd?.[category]?.[subset]?.[y]?.[u]?.[`${y}UniqueTotalCount`]!=undefined && realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCountUnique`]>0?
          ssd?.[category]?.[subset]?.[y]?.[u]?.[`${y}UniqueTotalCount`]/realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCountUnique`]:0

          if(y.startsWith("otm"))
            arr=otmChoices[y]
          else if(y.startsWith("mtm"))
            arr=otmChoices[y]
          arr.normal.forEach(i=>{
            if(i.type=="number"){
              ssd[category][subset][y][u][`%${i.name1}Subset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[category][subset][y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
              ssd[category][subset][y][u][`%${i.name1}UniqueSubset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`]>0)?(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`])*100:0

              ssd[category][subset][y][u][`%${i.name1}NoRepeatSubset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`]>0)?(ssd[category][subset][y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`])*100:0
              ssd[category][subset][y][u][`%${i.name1}NoRepeatUniqueSubset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`]>0)?(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`])*100:0
              //((finalObject[category][y][u][`${i.name1}total`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
              if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
              realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(ssd[category][subset][y][u][`${i.name1}total`])
              
              if(!idAlreadyDone.includes(ssd[category][subset][y][u][`id`])){
                if(realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`].push(ssd[category][subset][y][u][`${i.name1}total`])
              }

              if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`]==undefined)
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`]=[]
              realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`].push(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]!=undefined?ssd[category][subset][y][u][`${i.name1}UniqueTotal`]:0)

              if(!idAlreadyDone.includes(ssd[category][subset][y][u][`id`])){
                if(realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`].push(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]!=undefined?ssd[category][subset][y][u][`${i.name1}UniqueTotal`]:0)
              }
              //((finalObject[category][y][u][`${i.name1}total`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
              
            }
          })
          arr.compositeFields.forEach(i=>{
            if(i.type=="number"){

              ssd[category][subset][y][u][`%${i.name1}Subset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[category][subset][y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
              ssd[category][subset][y][u][`%${i.name1}UniqueSubset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`]>0)?(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`])*100:0

              ssd[category][subset][y][u][`%${i.name1}NoRepeatSubset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`]>0)?(ssd[category][subset][y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`])*100:0
              ssd[category][subset][y][u][`%${i.name1}NoRepeatUniqueSubset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`]>0)?(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`])*100:0
              //((finalObject[category][y][u][`${i.name1}total`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
              if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
              realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(ssd[category][subset][y][u][`${i.name1}total`])
              
              if(!idAlreadyDone.includes(ssd[category][subset][y][u][`id`])){
                if(realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`].push(ssd[category][subset][y][u][`${i.name1}total`])
              }
                

              if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`]==undefined)
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`]=[]
              realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`].push(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]!=undefined?ssd[category][subset][y][u][`${i.name1}UniqueTotal`]:0)

              if(!idAlreadyDone.includes(ssd[category][subset][y][u][`id`])){
                if(realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`].push(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]!=undefined?ssd[category][subset][y][u][`${i.name1}UniqueTotal`]:0)
              }
            }
          })
        }
      }else{
        let arr
        if(category==y){
          if(y.startsWith("otm")){
            arr=otmChoices[y]
          }else if(y.startsWith("mtm"))
            arr=otmChoices[y]
          
          arr.normal.forEach(i=>{
            if(i.type=="number"){
              ssd[category][subset][y][u][`%${i.name1}Subset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[category][subset][y][u][i.name1]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
              ssd[category][subset][y][u][`%${i.name1}UniqueSubset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`]>0)?(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`])*100:0

              ssd[category][subset][y][u][`%${i.name1}NoRepeatSubset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`]>0)?(ssd[category][subset][y][u][i.name1]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`])*100:0
              ssd[category][subset][y][u][`%${i.name1}NoRepeatUniqueSubset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`]>0)?(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`])*100:0

              //((finalObject[category][y][u][`${i.name1}`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
              if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
              realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(ssd[category][subset][y][u][i.name1])

              if(!idAlreadyDone.includes(ssd[category][subset][y][u][`id`])){
                if(realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`].push(ssd[category][subset][y][u][i.name1])
              }

              if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`]==undefined)
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`]=[]
              realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`].push(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]?ssd[category][subset][y][u][`${i.name1}UniqueTotal`]:0)

              if(!idAlreadyDone.includes(ssd[category][subset][y][u][`id`])){
                if(realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`].push(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]?ssd[category][subset][y][u][`${i.name1}UniqueTotal`]:0)
              }
            }
          })
          arr.compositeFields.forEach(i=>{
            if(i.type=="number"){
              ssd[category][subset][y][u][`%${i.name1}Subset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[i.name1]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[category][subset][y][u][i.name1]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
              ssd[category][subset][y][u][`%${i.name1}UniqueSubset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`]>0)?(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`])*100:0

              ssd[category][subset][y][u][`%${i.name1}NoRepeatSubset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[i.name1]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`]>0)?(ssd[category][subset][y][u][i.name1]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`])*100:0
              ssd[category][subset][y][u][`%${i.name1}NoRepeatUniqueSubset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`]>0)?(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`])*100:0
              //((finalObject[category][y][u][`${i.name1}`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
              if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
              realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(ssd[category][subset][y][u][i.name1])

              if(!idAlreadyDone.includes(ssd[category][subset][y][u][`id`])){
                if(realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`].push(ssd[category][subset][y][u][i.name1])
              }

              if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`]==undefined)
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`]=[]
              realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`].push(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]?ssd[category][subset][y][u][`${i.name1}UniqueTotal`]:0)

              if(!idAlreadyDone.includes(ssd[category][subset][y][u][`id`])){
                if(realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`].push(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]?ssd[category][subset][y][u][`${i.name1}UniqueTotal`]:0)
              }
            }
          })
        }else{
          let arr
          ssd[category][subset][y][u][`%${y}TotalCountSubset`]=0.00
          ssd[category][subset][y][u][`%${y}TotalCountUniqueSubset`]=0.00
          
          ssd[category][subset][y][u][`%${y}NoRepeatTotalCountSubset`]=0.00
          ssd[category][subset][y][u][`%${y}NoRepeatTotalCountUniqueSubset`]=0.00
          
          ssd[category][subset][y][u][`%${y}TotalCountSubset`]=ssd?.[category]?.[subset]?.[y]?.[u]?.[`${y}TotalCount`]!=undefined && realGrandTotals1[category][subset][y][`${y}TotalCount`]!=undefined?
          ssd?.[category]?.[subset]?.[y]?.[u]?.[`${y}TotalCount`]/realGrandTotals1[category][subset][y][`${y}TotalCount`]:0
        
          ssd[category][subset][y][u][`%${y}NoRepeatTotalCountSubset`]=ssd?.[category]?.[subset]?.[y]?.[u]?.[`${y}TotalCount`]!=undefined && realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCount`]!=undefined?
          ssd?.[category]?.[subset]?.[y]?.[u]?.[`${y}TotalCount`]/realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCount`]:0
        
          ssd[category][subset][y][u][`%${y}TotalCountUniqueSubset`]=ssd?.[category]?.[subset]?.[y]?.[u]?.[`${y}UniqueTotalCount`]!=undefined && realGrandTotals1[category][subset][y][`${y}TotalCountUnique`]!=undefined?
          ssd?.[category]?.[subset]?.[y]?.[u]?.[`${y}UniqueTotalCount`]/realGrandTotals1[category][subset][y][`${y}TotalCountUnique`]:0

          ssd[category][subset][y][u][`%${y}NoRepeatTotalCountUniqueSubset`]=ssd?.[category]?.[subset]?.[y]?.[u]?.[`${y}UniqueTotalCount`]!=undefined && realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCountUnique`]!=undefined?
          ssd?.[category]?.[subset]?.[y]?.[u]?.[`${y}UniqueTotalCount`]/realGrandTotals1[category][subset][y][`${y}NoRepeatTotalCountUnique`]:0
        
        
          if(y.startsWith("otm")){
            arr=otmChoices[y]
          }else if(y.startsWith("mtm"))
            arr=otmChoices[y]
        
          arr.normal.forEach(i=>{
            if(i.type=="number"){
              ssd[category][subset][y][u][`%${i.name1}Subset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[category][subset][y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
              ssd[category][subset][y][u][`%${i.name1}UniqueSubset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`]>0)?(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`])*100:0

              ssd[category][subset][y][u][`%${i.name1}NoRepeatSubset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`]>0)?(ssd[category][subset][y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`])*100:0
              ssd[category][subset][y][u][`%${i.name1}NoRepeatUniqueSubset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`]>0)?(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`])*100:0
              //((finalObject[category][y][u][`${i.name1}total`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
              if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
              realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(ssd[category][subset][y][u][`${i.name1}total`])

              if(!idAlreadyDone.includes(ssd[category][subset][y][u][`id`])){
                if(realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`].push(ssd[category][subset][y][u][`${i.name1}total`])
              }

              if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`]==undefined)
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`]=[]
              realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`].push(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]?ssd[category][subset][y][u][`${i.name1}UniqueTotal`]:0)

              if(!idAlreadyDone.includes(ssd[category][subset][y][u][`id`])){

                if(realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`].push(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]?ssd[category][subset][y][u][`${i.name1}UniqueTotal`]:0)
              }
            }
          })
          arr.compositeFields.forEach(i=>{
            if(i.type=="number"){
              ssd[category][subset][y][u][`%${i.name1}Subset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[category][subset][y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
              ssd[category][subset][y][u][`%${i.name1}UniqueSubset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`]>0)?(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}UniqueTotal`])*100:0

              ssd[category][subset][y][u][`%${i.name1}NoRepeatSubset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`]>0)?(ssd[category][subset][y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatTotal`])*100:0
              ssd[category][subset][y][u][`%${i.name1}NoRepeatUniqueSubset`]=(ssd?.[category]?.[subset]?.[y]?.[u]?.[`${i.name1}UniqueTotal`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`]>0)?(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]/realGrandTotals1[category][subset][y][`${i.name1}NoRepeatUniqueTotal`])*100:0
              //((finalObject[category][y][u][`${i.name1}total`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
              if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
              realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(ssd[category][subset][y][u][`${i.name1}total`])

              if(!idAlreadyDone.includes(ssd[category][subset][y][u][`id`])){
                if(realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`].push(ssd[category][subset][y][u][`${i.name1}total`])
              }

              if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`]==undefined)
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`]=[]
              realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`].push(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]?ssd[category][subset][y][u][`${i.name1}UniqueTotal`]:0)

              if(!idAlreadyDone.includes(ssd[category][subset][y][u][`id`])){
                if(realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`].push(ssd[category][subset][y][u][`${i.name1}UniqueTotal`]?ssd[category][subset][y][u][`${i.name1}UniqueTotal`]:0)
              }
            }
          })
        }
        

      }
      if(!idAlreadyDone.includes(ssd[category][subset][y][u][`id`]))
        idAlreadyDone.push(ssd[category][subset][y][u][`id`])
    })

  })
  
}

  const printGrandTotalsTrue=(category,data,segments)=>{
    //console.log("resumen",category,data,segments)
    let trec=<p style={{background:"white",color:"black",marginBottom:"10px",display:"inline-block",paddingLeft:"5px",paddingRight:"5px"}}>Number of Records: {tableTotalRecords[category]}</p>
    let res=segments.map(seg=>{
    if(seg==`getData${currentCategory.name}`){
      let dfcf=displayFirstCategoryFields(data)
      if(dfcf.length>0){
        return <table style={{margin:0,padding:0,marginBottom:"10px"}}>
          <thead style={{margin:0,padding:0}}>
            <tr style={{margin:0,padding:0}}>
              <th style={{textAlign:"center",borderBottom:"1px solid white"}}>{seg}</th>
            </tr>
          </thead>
          <tbody style={{margin:0,padding:0}}>
            <tr style={{margin:0,padding:0}}>
              <th style={{margin:0,padding:0}}>
                <table style={{margin:0,padding:0}}>
                  <thead style={{margin:0,padding:0}}>{displayCategoryHeaders()}</thead>
                  <tbody style={{margin:0,padding:0}}>{displayFirstCategoryFields(data)}</tbody>
                </table>
              </th>
            </tr>
          </tbody>
          
        </table>
      }else{
        return ""
      }
        
    }else{
        let dcf=displayCategoryFields(seg,data,seg!=segments[0])
        if(dcf.length>0)
        return <table style={{margin:0,padding:0,marginBottom:"10px"}}>
        <thead style={{margin:0,padding:0}}>
          <tr style={{margin:0,padding:0}}>
            <th style={{textAlign:"center",borderBottom:"1px solid white",margin:0,padding:0}}>{seg}</th>
          </tr>
        </thead>
        <tbody style={{margin:0,padding:0}}>
          <tr style={{margin:0,padding:0}}>
            <th style={{margin:0,padding:0}}>
              <table style={{margin:0,padding:0}}>
                <thead style={{margin:0,padding:0}}>{displayCategoryHeaders()}</thead>
                <tbody style={{margin:0,padding:0}}>{dcf}</tbody>
              </table>
            </th>
          </tr>
        </tbody>
        
      </table> 
      else 
        return ""
        
      }
    })
    res.unshift(trec)
    twoTables.push(res)
    
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

 /*const getFieldsDataSegment=(category,a,realSegmentLast,data2)=>{
    let result=[]
    let total=[]
    //let data=finalObject[category][a]
    let data=data2[a]
    //console.log("dataverif",data)
    let lastColor="lightgray"
    //console.log("data56",data)
    if(data!=null){
    Object.keys(data)?.forEach((y,index)=>{
      result=[]
      let ultimo=false
      let len=0
      if(category==a){
        let theresNormal
        let theresComposite
        let theresOtmDestiny
        if(category==`getData${currentCategory.name}`){
          len=1+
          firstCatNormalFields[`getData${currentCategory.name}`].normal.length+
          firstCatNormalFields[`getData${currentCategory.name}`].compositeFields.length
          let normal=firstCatNormalFields[`getData${currentCategory.name}`].normal.length
          let composite=firstCatNormalFields[`getData${currentCategory.name}`].compositeFields.length
          theresNormal=normal>0
          theresComposite=composite>0 
          //let otmdestiny=firstCatNormalFields[`getData${currentCategory.name}`].otmdestiny.length
          //let theresOtmDestiny=otmdestiny>0
   
          //let otmdestiny=otmChoices[`getData${currentCategory.name}`].otmdestiny.length
          //theresOtmDestiny=otmdestiny>0
  
          if(theresNormal){
          result=[...result,...firstCatNormalFields[`getData${currentCategory.name}`].normal.map((q,index)=>{
            let disp=""
            
            if(q.type=="date"){
              console.log("datadate",data[y][q.name1])
              disp=displayDate(data[y][q.name1])
              
            
            }else
              disp=data[y][q.name1]
            return <td style={{wordSpacing:"nowrap",borderRight:realSegmentLast==category && index==normal-1 && !theresComposite? "none":"1px solid black"}}>{disp}</td>
          })]
        }
          if(theresComposite)
          result=[...result,...firstCatNormalFields[`getData${currentCategory.name}`].compositeFields.map((q,index)=>
            <td style={{whiteSpace:"nowrap",overflow:"normal",borderRight:realSegmentLast==category && index==composite-1?"none":"1px solid black"}}>{data[y][`${q.name1}`]}</td>
          )]
          
        }else{
          len=1+otmChoices[category].normal.length+
          otmChoices[category].compositeFields.length
          let normal=otmChoices[category].normal.length
          let composite=otmChoices[category].compositeFields.length
          theresNormal=normal>0
          theresComposite=composite>0 
          let otmdestiny=otmChoices[category].otmdestiny.length
          theresOtmDestiny=otmdestiny>0
   
        
  
          if(theresNormal)        
          result=[...result,...otmChoices[category].normal.map((q,index)=>{
            let disp=""
            
            if(q.type=="date"){
              console.log("datadate",data[y][q.name1])
              disp=displayDate(data[y][q.name1])
              
            
            }else
              disp=data[y][q.name1]
            return <td style={{whiteSpace:"nowrap",borderRight:realSegmentLast==category && normal-1==index && !(theresComposite || theresOtmDestiny)?"none":"1px solid black"}}>{disp}</td>
          }
          )]
          if(theresComposite)
          result=[...result,...otmChoices[category].compositeFields.map((q,index)=>
            <td style={{whiteSpace:"nowrap",borderRight:realSegmentLast==category && composite-1==index && !theresOtmDestiny?"none":"1px solid black"}}>{data[y][`${q.name1}`]}</td>
          )]
        
        
        if(theresOtmDestiny)
        result=[...result,...otmChoices[category].otmdestiny.map((q,index)=>
            <td style={{whiteSpace:"nowrap",borderRight:realSegmentLast==category && otmdestiny-1==index?"none":"1px solid black"}}>{data[y][q]}</td>
          )]
        let parentCat=parentCategories[category]
        if(parentIdentifiers?.[parentCat]?.["fieldCompOrNormalType"]=="normal" || 
        parentIdentifiers?.[parentCat]?.["fieldCompOrNormalType"]=="composite")
        
          result.unshift(<td style={{borderRight:realSegmentLast==category && !(theresNormal || theresComposite || !theresOtmDestiny)?"none":"1px solid black"}}>{data[y]["parentIdentifier"]}</td>)  
        
        
      }
      result.unshift(<td style={{whiteSpace:"nowrap",borderRight:realSegmentLast==category && !(theresNormal || theresComposite ||theresOtmDestiny)?"none":"1px solid black"}}>{data[y]["id"]}</td>)
    
    }else{
        let lastIndexNumber=-1
        let lastIndexNumberComposite=-1
          otmChoices[a].normal.forEach((x,index)=>{
            if(x.type=="number")
              lastIndexNumber=index
          })
          otmChoices[a].compositeFields.forEach((x,index)=>{
            if(x.type=="number")
              lastIndexNumberComposite=index
          })
          let normal=otmChoices[a].normal.length
          let composite=otmChoices[a].compositeFields.length
          let theresNormal=normal>0
          let theresComposite=composite>0  
          let theresOtmDestiny
        let temp=[]
        len=1+otmChoices[a].normal.length+
          otmChoices[a].compositeFields.length
        if(theresNormal)
        otmChoices[a].normal.forEach((q,index)=>{
          if(q.type=="number"){
            let otmStatisticsArray=[]
            for(let x in otmChoicesStatistics?.[category]?.[a]?.[q.name1]){
            //  console.log("o1111",otmChoicesStatistics?.[category]?.[a]?.[q.name1]?.[x],x)
              if(otmChoicesStatistics?.[category]?.[a]?.[q.name1]?.[x]==true){
                otmStatisticsArray.push(x)
              }
            }
            temp.push(<td style={{whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && otmStatisticsArray.length==0?"none":"1px solid black"}}>{data[y][`${q.name1}total`].toFixed(2)}</td>)
            //Object.keys(otmChoicesStatistics[category][a][q.name1]).
            otmStatisticsArray.forEach((ji,i44)=>{
              //console.log("www88",finalObject[category][a][y],data[y]?.[`${q.name1}Acummulated`])
  
              
                let pmay=ji[0].toUpperCase()+ji.substring(1)
                //console.log("verif67",finalObject[category][a][y][`${q.name1}${pmay}`],`${q.name1}${pmay}`)
                if(ji=="percentage"){
                  temp.push(<td style={{whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{(data[y][`%${q.name1}`]!=null && data[y][`%${q.name1}`]!=undefined)?data[y][`%${q.name1}`].toFixed(2):"0.00"}%-{(data[y][`%${q.name1}Subset`]!=null && data[y][`%${q.name1}Subset`]!=undefined)?data[y][`%${q.name1}Subset`].toFixed(2):"0.00"}%</td>)  
  
                }else if(ji=="minimum"){
                  temp.push(<td style={{whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{(data[y]?.[`${q.name1}Acummulatedminimum`]!=undefined && data[y]?.[`${q.name1}Acummulatedminimum`]!=null)?data[y]?.[`${q.name1}Acummulatedminimum`].toFixed(2):"0.00"}</td>)  
                }else if(ji=="maximum"){
                  temp.push(<td style={{whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{(data[y]?.[`${q.name1}Acummulatedmaximum`]!=undefined && data[y]?.[`${q.name1}Acummulatedmaximum`]!=null)?data[y]?.[`${q.name1}Acummulatedmaximum`].toFixed(2):"0.00"}</td>)  
                
                }else
                  temp.push(<td style={{whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{(data[y][`${q.name1}${pmay}`]!=undefined && data[y][`${q.name1}${pmay}`]!=null)?data[y][`${q.name1}${pmay}`].toFixed(2):"0.00"}</td>)
  
              
            })
          }
          
        }
        
        )
        result=[...result,...temp]
        temp=[]
        if(theresComposite)
        otmChoices[a].compositeFields.forEach((q,index)=>{
          if(q.type=="number"){
            let otmStatisticsArray=[]
            for(let x in otmChoicesStatistics?.[category]?.[a]?.[q.name1]){
              console.log("o1111",otmChoicesStatistics?.[category]?.[a]?.[q.name1]?.[x],x)
              if(otmChoicesStatistics[category][a]?.[q.name1]?.[x]==true){
                otmStatisticsArray.push(x)
              }
            }
            temp.push(<td style={{borderRight:lastIndexNumberComposite==index && realSegmentLast==a && otmStatisticsArray.length==0?"none":"1px solid black"}}>{data[y][`${q.name1}total`].toFixed(2)}</td>)
            //Object.keys(otmChoicesStatistics[category][a][q.name1])
            otmStatisticsArray.forEach((ji,i44)=>{
              //if(otmChoicesStatistics[category][a][q.name1][ji]==true){
                let pmay=ji[0].toUpperCase()+ji.substring(1)
                //console.log("verif67",finalObject[category][a][y][`${q.name1}${pmay}`],`${q.name1}${pmay}`)
                //temp.push(<td style={{color:"black",background:"white",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1?"none":"1px solid black"}}>{finalObject[category][a][y][`${q.name1}${pmay}`]}</td>)
                if(ji=="percentage"){
                  temp.push(<td style={{whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{(data[y][`%${q.name1}`]!=undefined && data[y][`%${q.name1}`]!=null)?data[y][`%${q.name1}`].toFixed(2):"0.00"}%-{(data[y][`%${q.name1}Subset`]!=undefined && data[y][`%${q.name1}Subset`]!=null)?data[y][`%${q.name1}Subset`].toFixed(2):"0.00"}%</td>)  
  
                }else if(ji=="minimum"){
                  temp.push(<td style={{whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{(data[y]?.[`${q.name1}Acummulatedminimum`]!=null && data[y]?.[`${q.name1}Acummulatedminimum`]!=undefined)?data[y]?.[`${q.name1}Acummulatedminimum`].toFixed(2):"0.00"}</td>)  
                }else if(ji=="maximum"){
                  temp.push(<td style={{whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{(data[y]?.[`${q.name1}Acummulatedmaximum`]!=null && data[y]?.[`${q.name1}Acummulatedmaximum`]!=undefined)?data[y]?.[`${q.name1}Acummulatedmaximum`].toFixed(2):"0.00"}</td>)  
                
                }else
                  temp.push(<td style={{whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{(data[y][`${q.name1}${pmay}`]!=undefined && data[y][`${q.name1}${pmay}`]!=null)?data[y][`${q.name1}${pmay}`].toFixed(2):"0.00"}</td>)
  
              //}
            })
          }
          ///return ""
        }
        
        )
  
        if(realSegmentLast!==a){ 
          if(lastIndexNumberComposite!==-1 || lastIndexNumber!==-1){
            if(otmChoicesStatistics?.[category]?.[a]?.["general"]?.[`${a}TotalCount`]==true){
              let val=data[y][`${a}TotalCount`]/realGrandTotals1[category][subset][a][`${a}TotalCount`]
              result=[<td style={{whiteSpace:"nowrap",borderRight:"1px solid black"}}>{data[y][`${a}TotalCount`]} ({isNaN(val)?"0.00":(val*100).toFixed(2)}%)</td>,...result,...temp]
            }else{
              result=[...result,...temp]
            }
          }
          else{
            if(otmChoicesStatistics?.[category]?.[a]?.["general"]?.[`${a}TotalCount`]==true){
              let val=data[y][`${a}TotalCount`]/realGrandTotals1[category][subset][a][`${a}TotalCount`]
              result=[<td style={{whiteSpace:"nowrap",borderRight:"1px solid black"}}>{data[y][`${a}TotalCount`]} ({isNaN(val)?"0.00":(val*100).toFixed(2)}%)</td>]
            }
          }
        }else{
          if(lastIndexNumberComposite!==-1 || lastIndexNumber!==-1){
            let val=0
            if(otmChoicesStatistics?.[category]?.[a]?.["general"]?.[`${a}TotalCount`]==true){
              //console.log("track1",data[y][`${a}TotalCount`]/realGrandTotals1[category][subset][a][`${a}TotalCount`])
              val=data[y][`${a}TotalCount`]/realGrandTotals1[category][subset][a][`${a}TotalCount`]
              result=[<td style={{whiteSpace:"nowrap",borderRight:"1px solid black"}}>{data[y][`${a}TotalCount`]} ({isNaN(val)?"0.00":(val*100).toFixed(2)}%)</td>,...result,...temp]
            }else
              result=[...result,temp]
          }
          else
            if(otmChoicesStatistics?.[category]?.[a]?.["general"]?.[`${a}TotalCount`]==true){
  
              result=[<td style={{whiteSpace:"nowrap",borderRight:"none"}}>{data[y][`${a}TotalCount`]}</td>]
        }
      }
        
        
        
        
      }
      
      lastColor=lastColor=="lightgray" && index%2==0?"white":"lightgray"
      total.push(<tr style={{background:lastColor}}>{result}</tr>)
    })
   }
   
    return total
    
  }
  const checkRuleHybrid=(rulex,x,index)=>{
    let rule=rulex["rule"]
    let arrAnswers=[]
    let ops=[]
   // console.log("paramsxx",rule,x,sameCategorySegment,field,type)
    for(let i in rule){
      if(i%2==0){
        let nk=parseInt(i)
        ops=[...ops,rule[nk]]
        let data=rule[nk+1]
        let specificRule=conditionsWhere[data["category"]][data["segment"]][data["field"]][data["rule"]]
        let type=conditionsWhere[data["category"]][data["segment"]][data["field"]]["type"]
        let res
        console.log("rulenk",rule[nk],conditionsWhere[data["category"]],x,x[data["segment"]][index])
        if(data["segment"]!=="hybrid")
          res=checkRule(specificRule,x[data["segment"]][index],false,data["field"],type,data)
        else{
          res=checkRuleHybrid(specificRule,x,index)
        }
        arrAnswers=[...arrAnswers,res]
      }
    }
    return evaluateRule(arrAnswers,ops)
  }
  const evaluateRule=(answers,operators)=>{
    let wholeAnswer=false
    console.log("evalrule",answers,operators)
    if(answers.length==operators.length){
      for(let x in operators){
        x=parseInt(x)
        if(operators[x]=="none")
          wholeAnswer=answers[0]
        else if(operators[x]=="not")
          wholeAnswer=!answers[x]
        else if(operators[x]=="and not")
          wholeAnswer=wholeAnswer && !answers[x]
        else if(operators[x]=="or not")
          wholeAnswer=wholeAnswer || !answers[x]
        else if(operators[x]=="or")
           wholeAnswer=wholeAnswer || answers[x]
        else if(operators[x]=="and")
          wholeAnswer=wholeAnswer && answers[x]
  
      }
  
    }
    return wholeAnswer
  }
  

  const checkRule=(rulex,x,sameCategorySegment,field,type)=>{
    let rule=rulex["rule"]
    let arrAnswers=[]
    let ops=[]
    console.log("paramsxx",rule,x,sameCategorySegment,field,type)
    if(true){
  
      if(rule.length>1){
        
        
        if(rule[1]=="wherePrevious"){
          let r=conditionsWhere[rule["category"]][r["segment"]][r["fieldName"]][rule[2]]
          ops=[...ops,rule[0]]
          arrAnswers=[...arrAnswers,checkRule(r,x,field,type)]
        }else if(type=="string"){ 
          for(let i in rule){
            
            
            if(i%3==0){
              let nk=parseInt(i)
              ops=[...ops,rule[nk]]
              console.log("entro aqui76",rule,rule[nk+1],nk+1,rule.length,i,x[field],x?.[field]?.toString()?.startsWith(rule[nk+2])) 
  
              if(rule[nk+1]=="starts with"){
                
                if(x?.[field]?.toString()?.startsWith(rule[nk+2]))
                  arrAnswers=[...arrAnswers,true]
                else
                  arrAnswers=[...arrAnswers,false]
                console.log("entrostart",field,x?.[field],arrAnswers)
              }else if(rule[nk]=="contains"){
                if(x[field].toString().includes(rule[nk+2]))
                  arrAnswers=[...arrAnswers,true]
                else  
                  arrAnswers=[...arrAnswers,false]
              }else if(rule[nk]=="ends with"){
                if(x?.[field].toString().endsWith(rule[nk+2]))
                    arrAnswers=[...arrAnswers,true]
                  else
                    arrAnswers=[...arrAnswers,false]
              }else if(rule[nk]=="between"){
                if(x?.[field]?.toString().toUpperCase()>rule[nk+2].initial && x?.[field]?.toString()?.toUpperCase()<rule[nk+2].final)
                  arrAnswers=[...arrAnswers,true]
                else
                  arrAnswers=[...arrAnswers,false]
              }
            }  
          }
        }else if(type=="number"){
    
          for(let i in rule){
            if(i%3==0){
              let nk=parseInt(i)
              ops=[...ops,rule[nk]]
            
           
              if(rule[nk+1]==">"){
                if(x[field]>rule[nk+2])
                  arrAnswers=[...arrAnswers,true]
                else 
                  arrAnswers=[...arrAnswers,false]
              }else if(rule[nk+1]==">="){
                if(x[field]>=rule[nk+2])
                  arrAnswers=[...arrAnswers,true]
                else 
                  arrAnswers=[...arrAnswers,false]
              }else if(rule[nk+1]=="<"){
                if(x[field]<rule[nk+2])
                  arrAnswers=[...arrAnswers,true]
                else 
                  arrAnswers=[...arrAnswers,false]
              }else if(rule[nk+1]=="<="){
                if(x[field]<=rule[nk+2])
                  arrAnswers=[...arrAnswers,true]
                else 
                  arrAnswers=[...arrAnswers,false]
              }else if(rule[nk+1]=="="){
                if(x[field]==rule[nk+2])
                  arrAnswers=[...arrAnswers,true]
                else 
                  arrAnswers=[...arrAnswers,false]
              }else if(rule[nk+1]=="!="){
                if(x[field]!=rule[nk+2])
                  arrAnswers=[...arrAnswers,true]
                else 
                  arrAnswers=[...arrAnswers,false]
              }
            }
          }
        }else if(type=="date"){
          for(let i in rule){
            if(i%3==0){
              let nk=parseInt(i)
              ops=[...ops,rule[nk]]
            
              let v1=""
              if(x[field]!==null)
                v1=new Date(parseInt(x[field]))
              let r1=rule[nk+2]
              if(v1==""){
                arrAnswers=[...arrAnswers,false]
              }else{
                console.log("dateprev",v1,r1)
                if(rule[nk+1]==">"){
                  if(v1>r1)
                    arrAnswers=[...arrAnswers,true]
                  else 
                    arrAnswers=[...arrAnswers,false]
                }else if(rule[nk+1]==">="){
                  if(v1>=r1)
                    arrAnswers=[...arrAnswers,true]
                  else 
                    arrAnswers=[...arrAnswers,false]
                }else if(rule[nk+1]=="<"){
                  if(v1<r1)
                    arrAnswers=[...arrAnswers,true]
                  else 
                    arrAnswers=[...arrAnswers,false]
                }else if(rule[nk+1]=="<="){
                  if(v1<=r1)
                    arrAnswers=[...arrAnswers,true]
                  else 
                    arrAnswers=[...arrAnswers,false]
                }else if(rule[nk+1]=="="){
                  if(v1==r1)
                    arrAnswers=[...arrAnswers,true]
                  else 
                    arrAnswers=[...arrAnswers,false]
                }else if(rule[nk+1]=="!="){
                  if(v1!=r1)
                    arrAnswers=[...arrAnswers,true]
                  else 
                    arrAnswers=[...arrAnswers,false]
                }
              }
            }
          }
        }   
      }
    }else if(field!=="hybrid"){
      console.log("res segmentotherthatmain")
    }
    console.log("evrule",evaluateRule(arrAnswers,ops),x,field)
      return evaluateRule(arrAnswers,ops)
  }

  const displayFirstCategoryFields=(data)=>{
    const nf=getNumericFields(`getData${currentCategory.name}`)
    console.log("dataxxy",data)
    data=data[category][subset]
    let n=nf.normal.map((x,index)=>{
      return <tr style={{background:"white",color:"black",margin:0,padding:0}}>
        <td style={{borderRight:"1px solid black"}}>{x}</td> 
        <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[`${x}total`]==undefined?"0.00":data?.[`getData${currentCategory.name}`]?.[`${x}total`]?.toFixed(2)}</td>
        <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.[0]==undefined?"0.00":(data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.[0].toFixed(2))}</td>
        <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.[data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.length-1]==undefined?"0.00":(data?.[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.[data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.length-1]?.toFixed(2))}</td>
        <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[`${x}Media`]==undefined?"0.00":data?.[`getData${currentCategory.name}`]?.[`${x}Media`]?.toFixed(2)}</td>
        <td>{data[`getData${currentCategory.name}`][`${x}Median`]==undefined?"0.00":data[`getData${currentCategory.name}`][`${x}Median`].toFixed(2)}</td>
      </tr>
    })
    let c=nf.compositeFields.map(x=>{
      return <tr style={{background:"white",color:"black",margin:0,padding:0}}>
      <td style={{borderRight:"1px solid black"}}>{x}</td> 
      <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[`${x}total`]==undefined?"0.00":data?.[`getData${currentCategory.name}`]?.[`${x}total`]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.[0]==undefined?"0.00":(data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.[0].toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.[data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.length-1]==undefined?"0.00":(data?.[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.[data[`getData${currentCategory.name}`]?.[`${x}AccumulatedArray`]?.length-1]?.toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[`getData${currentCategory.name}`]?.[`${x}Media`]==undefined?"0.00":data?.[`getData${currentCategory.name}`]?.[`${x}Media`]?.toFixed(2)}</td>
      <td>{data[`getData${currentCategory.name}`][`${x}Median`]==undefined?"0.00":data[`getData${currentCategory.name}`][`${x}Median`].toFixed(2)}</td>
    </tr>
    })
    return [...n,...c]
  
    
  }
  const displayCategoryHeaders=()=>{
    return <tr style={{background:"black",color:"white",borderBottom:"1px solid white",margin:0,padding:0}}>
      <th style={{borderRight:"1px solid white"}}>Field</th>
      <th style={{borderRight:"1px solid white"}}>Grand Total</th>
      <th style={{borderRight:"1px solid white"}}>Minimum</th>
      <th style={{borderRight:"1px solid white"}}>Maximum</th>
      <th style={{borderRight:"1px solid white"}}>Media</th>
      <th>Median</th>
    </tr>
  
}*/
const getFieldsDataSegment=(category,a,realSegmentLast,data2)=>{
  let result=[]
  let total=[]
  //let data=finalObject[category][a]
  let data=data2[a]
 // console.log("dataverif",data)
  let lastColor="lightgray"
 // console.log("data56",data)
  if(data!=null){
  Object.keys(data)?.forEach((y,index)=>{
    result=[]
    let ultimo=false
    let len=0
    if(category==a){
      let theresNormal
      let theresComposite
      let theresOtmDestiny
      if(category==`getData${currentCategory.name}`){
        len=1+
        firstCatNormalFields[`getData${currentCategory.name}`].normal.length+
        firstCatNormalFields[`getData${currentCategory.name}`].compositeFields.length
        let normal=firstCatNormalFields[`getData${currentCategory.name}`].normal.length
        let composite=firstCatNormalFields[`getData${currentCategory.name}`].compositeFields.length
        theresNormal=normal>0
        theresComposite=composite>0 
        //let otmdestiny=firstCatNormalFields[`getData${currentCategory.name}`].otmdestiny.length
        //let theresOtmDestiny=otmdestiny>0
 
        //let otmdestiny=otmChoices[`getData${currentCategory.name}`].otmdestiny.length
        //theresOtmDestiny=otmdestiny>0

        if(theresNormal){
        result=[...result,...firstCatNormalFields[`getData${currentCategory.name}`].normal.map((q,index)=>{
          let disp=""
          
          if(q.type=="date"){
            console.log("datadate",data[y][q.name1])
            disp=displayDate(data[y][q.name1])
            
          
          }else
            disp=data[y][q.name1]
          let percDataRow=""
          if(q.type=="number")
            percDataRow=<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && index==normal-1 && !theresComposite? "1px solid black":"1px solid black"}}>{(data[y][`%${q.name1}`]).toFixed(2)}-{(data[y][`%${q.name1}Subset`]).toFixed(2)} <sub>{data[y].id},{data[y].parentId}</sub></td>
          if(percDataRow=="")
            return <td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && index==normal-1 && !theresComposite? "1px solid black":"1px solid black"}}>{disp} <sub>{data[y].id}</sub></td>
          else
            return [<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && index==normal-1 && !theresComposite? "1px solid black":"1px solid black"}}>{disp} <sub>{data[y].id}</sub></td>,percDataRow]
        })]
      }
        if(theresComposite)
        result=[...result,...firstCatNormalFields[`getData${currentCategory.name}`].compositeFields.map((q,index)=>{
          let percNumberRow=""
          if(q.type=="number")
            percNumberRow=<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && normal-1==index && !(theresComposite || theresOtmDestiny)?"1px solid black":"1px solid black"}}>{(data[y][`%${q.name1}`]).toFixed(2)}-{(data[y][`%${q.name1}Subset`]).toFixed(2)}<sub>{data[y].id},{data[y].parentId}</sub></td>
          if(percNumberRow=="")
            return <td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",overflow:"normal",borderRight:realSegmentLast==category && index==composite-1?"1px solid black":"1px solid black"}}>{data?.[y]?.[`${q.name1}`]}<sub>{data[y].id},{data[y].parentId}</sub></td>
          else 
            return [<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",overflow:"normal",borderRight:realSegmentLast==category && index==composite-1?"1px solid black":"1px solid black"}}>{data?.[y]?.[`${q.name1}`]}<sub>{data[y].id},{data[y].parentId}</sub></td>,percNumberRow]

        })]
        /*if(theresOtmDestiny)
        result=[...result,...firstCatNormalFields[`getData${currentCategory.name}`].otmdestiny.map((q,index)=>
        <td style={{color:"black",background:"white",borderRight:realSegmentLast==category && index==otmdestiny-1?"none":"1px solid black"}}>{finalObject[category][a][y][`${q.name1}`]}</td>
      )]*/

      }else{
        let arr
        if(category.startsWith("mtm"))
          arr=otmChoices[category]
        else if(category.startsWith("otm"))
          arr=otmChoices[category]
        len=1+arr.normal.length+
        arr.compositeFields.length
        let normal=arr.normal.length
        let composite=arr.compositeFields.length
        theresNormal=normal>0
        theresComposite=composite>0 
        let otmdestiny=arr?.otmdestiny?.length
        theresOtmDestiny=otmdestiny>0
 
      

        if(theresNormal)        
        result=[...result,...arr.normal.map((q,index)=>{
          let disp=""
          
          if(q.type=="date"){
           // console.log("datadate",data[y][q.name1])
            disp=displayDate(data[y][q.name1])
            
          
          }else
            disp=data[y][q.name1]
          let percNumberRow=""
          if(q.type=="number")
           percNumberRow=<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && normal-1==index && !(theresComposite || theresOtmDestiny)?"none":"1px solid black"}}>{(data[y][`%${q.name1}`]).toFixed(2)}-{(data[y][`%${q.name1}Subset`]).toFixed(2)}<sub>{data[y].id},{data[y].parentId}</sub></td>
          if(percNumberRow=="")
            return <td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && normal-1==index && !(theresComposite || theresOtmDestiny)?"none":"1px solid black"}}>{disp}<sub>{data[y].id},{data[y].parentId}</sub></td>
          else
            return [<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && normal-1==index && !(theresComposite || theresOtmDestiny)?"1px solid black":"1px solid black"}}>{disp}<sub>{data[y].id},{data[y].parentId}</sub></td>,percNumberRow]

        }
        )]
        if(theresComposite)
        result=[...result,...arr.compositeFields.map((q,index)=>{
          let percNumberRow=""
          if(q.type=="number")
            percNumberRow=<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && normal-1==index && !(theresComposite || theresOtmDestiny)?"none":"1px solid black"}}>{(data[y][`%${q.name1}`]).toFixed(2)}-{(data[y][`%${q.name1}Subset`]).toFixed(2)}<sub>{data[y].id},{data[y].parentId}</sub></td>
          if(percNumberRow=="")
            return <td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && composite-1==index && !theresOtmDestiny?"none":"1px solid black"}}>{(data[y][`${q.name1}`]).toFixed(2)}<sub>{data[y].id},{data[y].parentId}</sub></td>
          else
           return [<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && composite-1==index && !theresOtmDestiny?"1px solid black":"1px solid black"}}>{data?.[y]?.[`${q.name1}`]}<sub>{data[y].id},{data[y].parentId}</sub></td>,percNumberRow]

        }
        )]
      
      
      if(theresOtmDestiny)
      result=[...result,...arr?.otmdestiny?.map((q,index)=>
          <td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && otmdestiny-1==index?"none":"1px solid black"}}>{data[y][q]}<sub>{data[y].id},{data[y].parentId}</sub></td>
        )]
      let parentCat=parentCategories[category]
      if(parentIdentifiers?.[parentCat]?.["fieldCompOrNormalType"]=="normal" || 
      parentIdentifiers?.[parentCat]?.["fieldCompOrNormalType"]=="composite")
      
        result.unshift(<td style={{whiteSpace:"nowrap",borderRight:realSegmentLast==category && !(theresNormal || theresComposite || !theresOtmDestiny)?"none":"1px solid black"}}>{data[y]["parentIdentifier"]}<sub>{data[y].id},{data[y].parentId}</sub></td>)  
      
      
    }
    result.unshift(<td id={`${category}recorreId`} style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:realSegmentLast==category && !(theresNormal || theresComposite ||theresOtmDestiny)?"none":"1px solid black"}}>{data[y]["id"]}</td>)
  
  }else{
    let arr
    if(a.startsWith("mtm"))
      arr=otmChoices[a]
    else if(a.startsWith("otm"))
      arr=otmChoices[a]
      let lastIndexNumber=-1
      let lastIndexNumberComposite=-1
        arr.normal.forEach((x,index)=>{
          if(x.type!="number" && x.dataType!="queryCategory")
            lastIndexNumber=index
        })
        arr.compositeFields.forEach((x,index)=>{
          if(x.type=="number")
            lastIndexNumberComposite=index
        })
        let normal=arr.normal.length
        let composite=arr.compositeFields.length
        let theresNormal=normal>0
        let theresComposite=composite>0  
        let theresOtmDestiny
      let temp=[]
      len=1+arr.normal.length+
        arr.compositeFields.length
      if(theresNormal)
      arr.normal.forEach((q,index)=>{
        if(q.type=="number" && q.dataType!="queryCategory"){
          let otmStatisticsArray=[]
          for(let x in otmChoicesStatistics?.[category]?.[a]?.[q.name1]){
            //console.log("o1111",otmChoicesStatistics?.[category]?.[a]?.[q.name1]?.[x],x)
            if(otmChoicesStatistics?.[category]?.[a]?.[q.name1]?.[x]==true){
              otmStatisticsArray.push(x)
            }
          }
          temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && otmStatisticsArray.length==0?"none":"1px solid black"}}>{data?.[y]?.[`${q.name1}total`]==undefined?"0.00":data[y][`${q.name1}total`].toFixed(2)}<sub>{data[y].id},{data[y].parentId}</sub></td>)
          temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && otmStatisticsArray.length==0?"none":"1px solid black"}}>{data?.[y]?.[`${q.name1}UniqueTotal`]==undefined?"0.00":data[y][`${q.name1}UniqueTotal`].toFixed(2)}<sub>{data[y].id},{data[y].parentId}</sub></td>)
          //Object.keys(otmChoicesStatistics[category][a][q.name1]).
          otmStatisticsArray.forEach((ji,i44)=>{
           // console.log("www88",finalObject[category][a][y],data[y]?.[`${q.name1}Acummulated`])

            
              let pmay=ji[0].toUpperCase()+ji.substring(1)
              if(ji!=="total"){
              //console.log("verif67",finalObject[category][a][y][`${q.name1}${pmay}`],`${q.name1}${pmay}`)
              if(ji=="percentage"){
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{isNaN(data?.[y]?.[`%${q.name1}`])?"0.00":`${data[y][`%${q.name1}`].toFixed(2)}-${data[y][`%${q.name1}Subset`].toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>)  
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{isNaN(data?.[y]?.[`%${q.name1}NoRepeat`])?"0.00":`${data?.[y]?.[`%${q.name1}NoRepeat`]?.toFixed(2)}-${data?.[y]?.[`%${q.name1}NoRepeatSubset`]?.toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>)  
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{isNaN(data?.[y]?.[`%${q.name1}Unique`])?"0.00":`${data[y][`%${q.name1}Unique`].toFixed(2)}-${data[y][`%${q.name1}UniqueSubset`].toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>)  
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{isNaN(data?.[y]?.[`%${q.name1}NoRepeatUnique`])?"0.00":`${data[y][`%${q.name1}NoRepeatUnique`].toFixed(2)}-${data[y][`%${q.name1}NoRepeatUniqueSubset`].toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>)  
              }else if(ji=="minimum"){
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{data?.[y]?.[`${q.name1}Acummulatedminimum`]==undefined?"0.00":data?.[y]?.[`${q.name1}Acummulatedminimum`].toFixed(2)}<sub>{data[y].id},{data[y].parentId}</sub></td>)  
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{data?.[y]?.[`${q.name1}AcummulatedUniqueminimum`]==undefined?"0.00":data?.[y]?.[`${q.name1}AcummulatedUniqueminimum`].toFixed(2)}<sub>{data[y].id},{data[y].parentId}</sub></td>)  
              }else if(ji=="maximum"){
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{data?.[y]?.[`${q.name1}Acummulatedmaximum`]==undefined?"0.00":data?.[y]?.[`${q.name1}Acummulatedmaximum`].toFixed(2)}<sub>{data[y].id},{data[y].parentId}</sub></td>) 
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{data?.[y]?.[`${q.name1}AcummulatedUniquemaximum`]==undefined?"0.00":data?.[y]?.[`${q.name1}AcummulatedUniquemaximum`].toFixed(2)}<sub>{data[y].id},{data[y].parentId}</sub></td>)   
              
              }else{
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{data?.[y]?.[`${q.name1}${pmay}`]==undefined?"0.00":data[y][`${q.name1}${pmay}`].toFixed(2)}<sub>{data[y].id},{data[y].parentId}</sub></td>)
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{data?.[y]?.[`${q.name1}${pmay}Unique`]==undefined?"0.00":data[y][`${q.name1}${pmay}Unique`].toFixed(2)}<sub>{data[y].id},{data[y].parentId}</sub></td>)
              }
            }
            
          })
        }
        
      }
      
      )
      result=[...result,...temp]
      temp=[]
      if(theresComposite)
      arr.compositeFields.forEach((q,index)=>{
        if(q.type=="number"){
          let otmStatisticsArray=[]
          for(let x in otmChoicesStatistics?.[category]?.[a]?.[q.name1]){
           // console.log("o1111",otmChoicesStatistics?.[category]?.[a]?.[q.name1]?.[x],x)
            if(otmChoicesStatistics[category][a]?.[q.name1]?.[x]==true){
              otmStatisticsArray.push(x)
            }
          }
          temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumberComposite==index && realSegmentLast==a && otmStatisticsArray.length==0?"none":"1px solid black"}}>{data[y][`${q.name1}total`].toFixed(2)}<sub>{data[y].id},{data[y].parentId}</sub></td>)
          temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumberComposite==index && realSegmentLast==a && otmStatisticsArray.length==0?"none":"1px solid black"}}>{data[y][`${q.name1}UniqueTotal`]!=undefined?data[y][`${q.name1}UniqueTotal`].toFixed(2):"0.00"}<sub>{data[y].id},{data[y].parentId}</sub></td>)
          //Object.keys(otmChoicesStatistics[category][a][q.name1])
          otmStatisticsArray.forEach((ji,i44)=>{
            //if(otmChoicesStatistics[category][a][q.name1][ji]==true){
              let pmay=ji[0].toUpperCase()+ji.substring(1)
              if(ji!="total"){
              //console.log("verif67",finalObject[category][a][y][`${q.name1}${pmay}`],`${q.name1}${pmay}`)
              //temp.push(<td style={{color:"black",background:"white",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1?"none":"1px solid black"}}>{finalObject[category][a][y][`${q.name1}${pmay}`]}</td>)
              if(ji=="percentage"){
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{isNaN(data?.[y]?.[`%${q.name1}`])?"0.00":`${data[y][`%${q.name1}`].toFixed(2)}-${data[y][`%${q.name1}Subset`].toFixed(2)}`}<sub>{data[y].id}</sub></td>)  
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{isNaN(data?.[y]?.[`%${q.name1}NoRepeat`])?"0.00":`${data[y][`%${q.name1}NoRepeat`].toFixed(2)}-${data[y][`%${q.name1}NoRepeatSubset`].toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>)  
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{isNaN(data?.[y]?.[`%${q.name1}Unique`])?"0.00":`${data[y][`%${q.name1}Unique`].toFixed(2)}-${data[y][`%${q.name1}UniqueSubset`].toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>)  
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{isNaN(data?.[y]?.[`%${q.name1}NoRepeatUnique`])?"0.00":`${data?.[y]?.[`%${q.name1}NoRepeatUnique`]?.toFixed(2)}-${data[y][`%${q.name1}NoRepeatUniqueSubset`].toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>)  

              }else if(ji=="minimum"){
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{data?.[y]?.[`${q.name1}Acummulatedminimum`]==undefined?"0.00":data?.[y]?.[`${q.name1}Acummulatedminimum`]?.toFixed(2)}<sub>{data[y].id},{data[y].parentId}</sub></td>) 
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{data?.[y]?.[`${q.name1}AcummulatedUniqueminimum`]==undefined?"0.00":data?.[y]?.[`${q.name1}AcummulatedUniqueminimum`]?.toFixed(2)}<sub>{data[y].id},{data[y].parentId}</sub></td>)   
              }else if(ji=="maximum"){
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{data[y]?.[`${q.name1}Acummulatedmaximum`]==undefined?"0.00":data?.[y]?.[`${q.name1}Acummulatedmaximum`]?.toFixed(2)}<sub>{data[y].id},{data[y].parentId}</sub></td>)  
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{data[y]?.[`${q.name1}AcummulatedUniquemaximum`]==undefined?"0.00":data?.[y]?.[`${q.name1}AcummulatedUniquemaximum`]?.toFixed(2)}<sub>{data[y].id},{data[y].parentId}</sub></td>)  
              }else{
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{data?.[y][`${q.name1}${pmay}`]==undefined?"0.00":data?.[y][`${q.name1}${pmay}`]?.toFixed(2)}<sub>{data[y].id},{data[y].parentId}</sub></td>)
                temp.push(<td style={{/*color:"black",background:"white",*/whiteSpace:"nowrap",borderRight:lastIndexNumber==index && realSegmentLast==a && lastIndexNumberComposite==-1 && i44==otmStatisticsArray.length-1?"none":"1px solid black"}}>{data?.[y][`${q.name1}${pmay}Unique`]==undefined?"0.00":data?.[y][`${q.name1}${pmay}Unique`]?.toFixed(2)}<sub>{data[y].id},{data[y].parentId}</sub></td>)
              }
            //}
              }
          })
        }
        ///return ""
      }
      
      )

      if(realSegmentLast!==a){ 
        if(lastIndexNumberComposite!==-1 || lastIndexNumber!==-1){
          if(otmChoicesStatistics?.[category]?.[a]?.["general"]?.[`totalCount`]==true){

            result=[<td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`${a}TotalCount`]==undefined?"0.00":data[y][`${a}TotalCount`]}<sub>{data[y].id}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`%${a}TotalCount`]==undefined?"0.00":`${(data[y][`%${a}TotalCount`]*100).toFixed(2)}-${(data[y][`%${a}TotalCountSubset`]*100).toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`%${a}NoRepeatTotalCount`]==undefined?"0.00":`${(data[y][`%${a}NoRepeatTotalCount`]*100).toFixed(2)}-${(data[y][`%${a}NoRepeatTotalCountSubset`]*100).toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`${a}UniqueTotalCount`]==undefined?"0.00":`${data[y][`${a}UniqueTotalCount`].toFixed(2)}`}<sub>{data[y].id},{data[y].parentId},{data[y].parentId}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`%${a}TotalCountUnique`]==undefined?"0.00":`${(data[y][`%${a}TotalCountUnique`]*100).toFixed(2)}-${(data[y][`%${a}TotalCountUniqueSubset`]*100).toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`%${a}NoRepeatTotalCountUnique`]==undefined?"0.00":`${(data[y][`%${a}NoRepeatTotalCountUnique`]*100).toFixed(2)}-${(data[y][`%${a}NoRepeatTotalCountUniqueSubset`]*100).toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>,
            ...result,...temp]
          }else{
            result=[...result,...temp]
          }
        }
        else{
          if(otmChoicesStatistics?.[category]?.[a]?.["general"]?.[`totalCount`]==true){

            result=[<td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`${a}TotalCount`]==undefined?"0.00":data[y][`${a}TotalCount`]}<sub>{data[y].id},{data[y].parentId}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`%${a}TotalCount`]==undefined?"0.00":`${(data[y][`%${a}TotalCount`]*100).toFixed(2)}-${(data[y][`%${a}TotalCountSubset`]*100).toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`%${a}NoRepeatTotalCount`]==undefined?"0.00":`${(data[y][`%${a}NoRepeatTotalCount`]*100).toFixed(2)}-${(data[y][`%${a}NoRepeatTotalCountSubset`]*100).toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`${a}UniqueTotalCount`]==undefined?"0.00":`${(data[y][`${a}UniqueTotalCount`]).toFixed(2)}`}<sub>{data[y].id},{data[y].parentId},{data[y].parentId}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`%${a}TotalCountUnique`]==undefined?"0.00":`${(data[y][`%${a}TotalCountUnique`]*100).toFixed(2)}-${(data[y][`%${a}TotalCountUniqueSubset`]*100).toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`%${a}NoRepeatTotalCountUnique`]==undefined?"0.00":`${(data[y][`%${a}NoRepeatTotalCountUnique`]*100).toFixed(2)}-${(data[y][`%${a}NoRepeatTotalCountUniqueSubset`]*100).toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>,
            ]
          }
        }
      }else{
        if(lastIndexNumberComposite!==-1 || lastIndexNumber!==-1){
          if(otmChoicesStatistics?.[category]?.[a]?.["general"]?.[`totalCount`]==true){

            result=[<td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`${a}TotalCount`]==undefined?"0.00":data[y][`${a}TotalCount`]}<sub>{data[y].id},{data[y].parentId}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`%${a}TotalCount`]==undefined?"0.00":`${(data[y][`%${a}TotalCount`]*100).toFixed(2)}-${(data[y][`%${a}TotalCountSubset`]*100).toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`%${a}NoRepeatTotalCount`]==undefined?"0.00":`${(data[y][`%${a}NoRepeatTotalCount`]*100).toFixed(2)}-${(data[y][`%${a}NoRepeatTotalCountSubset`]*100).toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`${a}UniqueTotalCount`]==undefined?"0.00":`${data[y][`${a}UniqueTotalCount`].toFixed(2)}`}<sub>{data[y].id},{data[y].parentId},{data[y].parentId}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`%${a}TotalCountUnique`]==undefined?"0.00":`${(data[y][`%${a}TotalCountUnique`]*100).toFixed(2)}-${(data[y][`%${a}TotalCountUniqueSubset`]*100).toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`%${a}NoRepeatTotalCountUnique`]==undefined?"0.00":`${(data[y][`%${a}NoRepeatTotalCountUnique`]*100).toFixed(2)}-${(data[y][`%${a}NoRepeatTotalCountUniqueSubset`]*100).toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>,
            ...result,...temp]
          }else
            result=[...result,temp]
        }
        else
          if(otmChoicesStatistics?.[category]?.[a]?.["general"]?.[`totalCount`]==true){

            result=[<td style={{whiteSpace:"nowrap",borderRight:"none"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`${a}TotalCount`]==undefined?"0.00":data[y][`${a}TotalCount`]}<sub>{data[y].id},{data[y].parentId}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`%${a}TotalCount`]==undefined?"0.00":`${(data[y][`%${a}TotalCount`]*100).toFixed(2)}-${(data[y][`%${a}TotalCountSubset`]*100).toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`%${a}NoRepeatTotalCount`]==undefined?"0.00":`${(data[y][`%${a}NoRepeatTotalCount`]*100).toFixed(2)}-${(data[y][`%${a}NoRepeatTotalCountSubset`]*100).toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`${a}UniqueTotalCount`]==undefined?"0.00":`${data[y][`${a}UniqueTotalCount`].toFixed(2)}`}<sub>{data[y].id},{data[y].parentId},{data[y].parentId}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`%${a}TotalCountUnique`]==undefined?"0.00":`${(data[y][`%${a}TotalCountUnique`]*100).toFixed(2)}-${(data[y][`%${a}TotalCountUniqueSubset`]*100).toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>,
            <td style={{whiteSpace:"nowrap",borderRight:"1px solid black"/*,background:"white",color:"black"*/}}>{data?.[y]?.[`%${a}NoRepeatTotalCountUnique`]==undefined?"0.00":`${(data[y][`%${a}NoRepeatTotalCountUnique`]*100).toFixed(2)}-${(data[y][`%${a}NoRepeatTotalCountUniqueSubset`]*100).toFixed(2)}`}<sub>{data[y].id},{data[y].parentId}</sub></td>]
      }
    }
      
      
      
      
    }
    
    lastColor=lastColor=="lightgray" && index%2==0?"white":"lightgray"
    total.push(<tr style={{background:lastColor}}>{result}</tr>)
  })
 }
  return total
  
}
/*const displayCategoryFields=(seg,data,cond)=>{
  const nf=getNumericFields(seg)
  let tcr=[]
  let lastColor="lightgray"
  //data=data[category][subset]
 // console.log("datauiu",data,seg,cond)
  if(cond){
    lastColor="white"
    tcr=[<tr style={{background:"white",color:"black",margin:0,padding:0,background:lastColor}}>
      <td style={{borderRight:"1px solid black"}}>{`${seg}TotalCount`}</td>
      <td style={{borderRight:"1px solid black"}}>{data[seg]?.[`${seg}TotalCount`]!=undefined?data[seg]?.[`${seg}TotalCount`]?.toFixed(2):"0.00"}</td>
      <td style={{borderRight:"1px solid black"}}>{data[seg]?.[`${seg}TotalCountArray`]?.[0]==undefined?"0.00":data[seg]?.[`${seg}TotalCountArray`]?.[0]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data[seg]?.[`${seg}TotalCountArray`]?.[data[seg]?.[`${seg}TotalCountArray`]?.length-1]==undefined?"0.00":(data[seg]?.[`${seg}TotalCountArray`]?.[data[seg]?.[`${seg}TotalCountArray`].length-1].toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{(isNaN(data[seg]?.[`${seg}TotalCount`]/data[seg]?.[`${seg}TotalCountArray`]?.length))?"0.00":(data[seg]?.[`${seg}TotalCount`]/data[seg]?.[`${seg}TotalCountArray`]?.length)?.toFixed(2)}</td>
      <td>{data[seg]?.[`${seg}TotalCountArray`]?.length>0?calMedian(data[seg]?.[`${seg}TotalCountArray`])?.toFixed(2):"0.00"}</td>
    </tr>]
  }
  let n=nf.normal.map((x,index)=>{
    //console.log("dataseg11",data[seg])
    lastColor=lastColor=="white"?"lightgray":"white"
    return <tr style={{margin:0,padding:0,color:"black",background:lastColor}}>
      <td style={{borderRight:"1px solid black"}}>{x}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}total`]==undefined?"0.00":data?.[seg]?.[`${x}total`]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}AccumulatedArray`]?.[0]==undefined?"0.00":data[seg]?.[`${x}AccumulatedArray`]?.[0].toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}AccumulatedArray`]?.[data[seg]?.[`${x}AccumulatedArray`].length-1]==undefined?"0.00":(data[seg]?.[`${x}AccumulatedArray`]?.[data[seg]?.[`${x}AccumulatedArray`]?.length-1]?.toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[seg]?.[`${x}Media`])?"0.00":data?.[seg]?.[`${x}Media`]?.toFixed(2)}</td>
      <td>{data[seg]?.[`${x}Median`]!=undefined?data[seg]?.[`${x}Median`]?.toFixed(2):"0.00"}</td>
    </tr>
  })
  let c=nf.compositeFields.map((x,index)=>{
    lastColor=lastColor=="white"?"lightgray":"white"

    return <tr style={{margin:0,padding:0,color:"black",background:lastColor}}>
    <td style={{borderRight:"1px solid black"}}>{x}</td>
    <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}total`]==undefined?"0.00":data?.[seg]?.[`${x}total`]?.toFixed(2)}</td>
    <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}AccumulatedArray`]?.[0]==undefined?"0.00":data[seg]?.[`${x}AccumulatedArray`]?.[0].toFixed(2)}</td>
    <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}AccumulatedArray`]?.[data[seg]?.[`${x}AccumulatedArray`].length-1]==undefined?"0.00":(data[seg]?.[`${x}AccumulatedArray`]?.[data[seg]?.[`${x}AccumulatedArray`]?.length-1]?.toFixed(2))}</td>
    <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[seg]?.[`${x}Media`])?"0.00":data?.[seg]?.[`${x}Media`]?.toFixed(2)}</td>
    <td>{data[seg]?.[`${x}Median`]!=undefined?data[seg]?.[`${x}Median`]?.toFixed(2):"0.00"}</td>
  </tr>
  })
  return [...tcr,...n,...c]

}*/
const displayCategoryFields=(seg,data,cond)=>{
  const nf=getNumericFields(seg)
  let tcr=[]
  let lastColor="lightgray"
  let countArray=[]
  if(cond){
    lastColor="white"
    countArray.push(<tr style={{background:"white",color:"black",margin:0,padding:0,background:lastColor}}>
      <td style={{borderRight:"1px solid black"}}>{`${seg}TotalCount`}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${seg}TotalCount`]==undefined?"0.00":data?.[seg]?.[`${seg}TotalCount`]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${seg}TotalCountArray`]?.[0]==undefined?"0.00":data[seg]?.[`${seg}TotalCountArray`]?.[0].toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${seg}TotalCountArray`]?.[data?.[seg]?.[`${seg}TotalCountArray`].length-1]==undefined?"0.00":(data?.[seg]?.[`${seg}TotalCountArray`]?.[data?.[seg]?.[`${seg}TotalCountArray`].length-1].toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[seg]?.[`${seg}TotalCount`]/data?.[seg]?.[`${seg}TotalCountArray`]?.length)?"0.00":(data?.[seg]?.[`${seg}TotalCount`]/data?.[seg]?.[`${seg}TotalCountArray`]?.length)?.toFixed(2)}</td>
      <td>{isNaN(calMedian(data?.[seg]?.[`${seg}TotalCountArray`]))?"0.00":calMedian(data?.[seg]?.[`${seg}TotalCountArray`])?.toFixed(2)}</td>
    </tr>)
    lastColor=lastColor=="white" /*&& index%2==0*/?"lightgray":"white"
    countArray.push(<tr style={{background:"white",color:"black",margin:0,padding:0,background:lastColor}}>
    <td style={{borderRight:"1px solid black"}}>{`${seg}NoRepeatTotalCount`}</td>
    <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${seg}NoRepeatTotalCount`]==undefined?"0.00":data?.[seg]?.[`${seg}NoRepeatTotalCount`]?.toFixed(2)}</td>
    <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${seg}NoRepeatTotalCountArray`]?.[0]==undefined?"0.00":data[seg]?.[`${seg}NoRepeatTotalCountArray`]?.[0].toFixed(2)}</td>
    <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${seg}NoRepeatTotalCountArray`]?.[data?.[seg]?.[`${seg}NoRepeatTotalCountArray`].length-1]==undefined?"0.00":(data[seg]?.[`${seg}NoRepeatTotalCountArray`]?.[data[seg]?.[`${seg}NoRepeatTotalCountArray`].length-1].toFixed(2))}</td>
    <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[seg]?.[`${seg}NoRepeatTotalCount`]/data?.[seg]?.[`${seg}NoRepeatTotalCountArray`]?.length)?"0.00":(data[seg]?.[`${seg}NoRepeatTotalCount`]/data[seg]?.[`${seg}NoRepeatTotalCountArray`]?.length)?.toFixed(2)}</td>
    <td>{isNaN(calMedian(data?.[seg]?.[`${seg}NoRepeatTotalCountArray`]))?"0.00":calMedian(data?.[seg]?.[`${seg}NoRepeatTotalCountArray`])?.toFixed(2)}</td>
    </tr>)
    lastColor=lastColor=="white" /*&& index%2==0*/?"lightgray":"white"
    countArray.push(<tr style={{background:lastColor,color:"black",margin:0,padding:0,background:lastColor}}>
      <td style={{borderRight:"1px solid black"}}>{`${seg}TotalCountUnique`}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${seg}TotalCountUnique`]==undefined?"0.00":data?.[seg]?.[`${seg}TotalCountUnique`]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${seg}TotalCountArrayUnique`]?.[0]==undefined?"0.00":data[seg]?.[`${seg}TotalCountArrayUnique`]?.[0].toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${seg}TotalCountArrayUnique`]?.[data?.[seg]?.[`${seg}TotalCountArrayUnique`].length-1]==undefined?"0.00":(data[seg]?.[`${seg}TotalCountArrayUnique`]?.[data[seg]?.[`${seg}TotalCountArrayUnique`].length-1].toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[seg]?.[`${seg}TotalCountUnique`]/data?.[seg]?.[`${seg}TotalCountArrayUnique`]?.length)?"0.00":(data[seg]?.[`${seg}TotalCountUnique`]/data[seg]?.[`${seg}TotalCountArrayUnique`]?.length)?.toFixed(2)}</td>
      <td>{isNaN(calMedian(data?.[seg]?.[`${seg}TotalCountArrayUnique`]))?"0.00":calMedian(data?.[seg]?.[`${seg}TotalCountArrayUnique`])?.toFixed(2)}</td>
    </tr>)

lastColor=lastColor=="white" /*&& index%2==0*/?"lightgray":"white"
countArray.push(<tr style={{background:lastColor,color:"black",margin:0,padding:0,background:lastColor}}>
  <td style={{borderRight:"1px solid black"}}>{`${seg}NoRepeatTotalCountUnique`}</td>
  <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${seg}NoRepeatTotalCountUnique`]==undefined?"0.00":data?.[seg]?.[`${seg}NoRepeatTotalCountUnique`]?.toFixed(2)}</td>
  <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${seg}NoRepeatTotalCountArrayUnique`]?.[0]==undefined?"0.00":data[seg]?.[`${seg}NoRepeatTotalCountArrayUnique`]?.[0].toFixed(2)}</td>
  <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${seg}NoRepeatTotalCountArrayUnique`]?.[data?.[seg]?.[`${seg}NoRepeatTotalCountArrayUnique`].length-1]==undefined?"0.00":(data[seg]?.[`${seg}NoRepeatTotalCountArrayUnique`]?.[data[seg]?.[`${seg}NoRepeatTotalCountArrayUnique`].length-1].toFixed(2))}</td>
  <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[seg]?.[`${seg}NoRepeatTotalCountUnique`]/data?.[seg]?.[`${seg}NoRepeatTotalCountArrayUnique`]?.length)?"0.00":(data[seg]?.[`${seg}NoRepeatTotalCountUnique`]/data[seg]?.[`${seg}NoRepeatTotalCountArrayUnique`]?.length)?.toFixed(2)}</td>
  <td>{isNaN(calMedian(data?.[seg]?.[`${seg}NoRepeatTotalCountArrayUnique`]))?"0.00":calMedian(data?.[seg]?.[`${seg}NoRepeatTotalCountArrayUnique`])?.toFixed(2)}</td>
</tr>)
    
  }
  let normalArray=[]
  let n=nf.normal.map((x,index)=>{
    normalArray=[]
    lastColor=lastColor=="white" /*&& index%2==0*/?"lightgray":"white"
    normalArray.push(<tr style={{margin:0,padding:0,color:"black",background:lastColor}}>
      <td style={{borderRight:"1px solid black"}}>{x}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}total`]==undefined?"0.00":data[seg]?.[`${x}total`]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}AccumulatedArray`]?.[0]==undefined?"0.00":data[seg]?.[`${x}AccumulatedArray`]?.[0]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}AccumulatedArray`]?.[data[seg]?.[`${x}AccumulatedArray`]?.length-1]==undefined?"0.00":(data[seg]?.[`${x}AccumulatedArray`]?.[data[seg]?.[`${x}AccumulatedArray`]?.length-1]?.toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[seg]?.[`${x}Media`])?"0.00":data?.[seg]?.[`${x}Media`]?.toFixed(2)}</td>
      <td>{isNaN(data?.[seg]?.[`${x}Median`])?"0.00":data?.[seg]?.[`${x}Median`]?.toFixed(2)}</td>
    </tr>)

/*normalArray.push(<tr style={{margin:0,padding:0,color:"black",background:lastColor}}>
<td style={{borderRight:"1px solid black"}}>{`${x}NoRepeat`}</td>
<td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}NoRepeatTotal`]==undefined?"0.00":data[seg]?.[`${x}NoRepeatTotal`]?.toFixed(2)}</td>
<td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}NoRepeatAccumulatedArray`]?.[0]==undefined?"0.00":data[seg]?.[`${x}NoRepeatAccumulatedArray`]?.[0]?.toFixed(2)}</td>
<td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}NoRepeatAccumulatedArray`]?.[data[seg]?.[`${x}NoRepeatAccumulatedArray`]?.length-1]==undefined?"0.00":(data[seg]?.[`${x}NoRepeatAccumulatedArray`]?.[data[seg]?.[`${x}NoRepeatAccumulatedArray`]?.length-1]?.toFixed(2))}</td>
<td style={{borderRight:"1px solid black"}}>{isNaN(data?.[seg]?.[`${x}NoRepeatMedia`])?"0.00":data[seg]?.[`${x}NoRepeatMedia`]?.toFixed(2)}</td>
<td>{isNaN(data[seg]?.[`${x}NoRepeatMedian`])?"0.00":data?.[seg]?.[`${x}NoRepeatMedian`]?.toFixed(2)}</td>
</tr>)*/
    if(cond){
      lastColor=lastColor=="white" /*&& index%2==0*/?"lightgray":"white"
      normalArray.push(<tr style={{margin:0,padding:0,color:"black",background:lastColor}}>
<td style={{borderRight:"1px solid black"}}>{`${x}NoRepeat`}</td>
<td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}NoRepeatTotal`]==undefined?"0.00":data[seg]?.[`${x}NoRepeatTotal`]?.toFixed(2)}</td>
<td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}NoRepeatAccumulatedArray`]?.[0]==undefined?"0.00":data[seg]?.[`${x}NoRepeatAccumulatedArray`]?.[0]?.toFixed(2)}</td>
<td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}NoRepeatAccumulatedArray`]?.[data[seg]?.[`${x}NoRepeatAccumulatedArray`]?.length-1]==undefined?"0.00":(data[seg]?.[`${x}NoRepeatAccumulatedArray`]?.[data[seg]?.[`${x}NoRepeatAccumulatedArray`]?.length-1]?.toFixed(2))}</td>
<td style={{borderRight:"1px solid black"}}>{isNaN(data?.[seg]?.[`${x}NoRepeatMedia`])?"0.00":data[seg]?.[`${x}NoRepeatMedia`]?.toFixed(2)}</td>
<td>{isNaN(data?.[seg]?.[`${x}NoRepeatMedian`])?"0.00":data?.[seg]?.[`${x}NoRepeatMedian`]?.toFixed(2)}</td>
</tr>)
    lastColor=lastColor=="white" /*&& index%2==0*/?"lightgray":"white"
    
    normalArray.push(<tr style={{margin:0,padding:0,color:"black",background:lastColor}}>
    <td style={{borderRight:"1px solid black"}}>{`${x}Unique`}</td>
    <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}UniqueTotal`]==undefined?"0.00":data[seg]?.[`${x}UniqueTotal`]?.toFixed(2)}</td>
    <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}AccumulatedArrayUnique`]?.[0]==undefined?"0.00":data[seg]?.[`${x}AccumulatedArrayUnique`]?.[0]?.toFixed(2)}</td>
    <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}AccumulatedArrayUnique`]?.[data[seg]?.[`${x}AccumulatedArrayUnique`]?.length-1]==undefined?"0.00":(data[seg]?.[`${x}AccumulatedArrayUnique`]?.[data[seg]?.[`${x}AccumulatedArrayUnique`]?.length-1]?.toFixed(2))}</td>
    <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[seg]?.[`${x}MediaUnique`])?"0.00":data[seg]?.[`${x}MediaUnique`]?.toFixed(2)}</td>
    <td>{isNaN(data?.[seg]?.[`${x}MedianUnique`])?"0.00":data?.[seg]?.[`${x}MedianUnique`]?.toFixed(2)}</td>
    </tr>)
    lastColor=lastColor=="white" /*&& index%2==0*/?"lightgray":"white"
    
    normalArray.push(<tr style={{margin:0,padding:0,color:"black",background:lastColor}}>
    <td style={{borderRight:"1px solid black"}}>{`${x}NoRepeatUnique`}</td>
    <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}NoRepeatUniqueTotal`]==undefined?"0.00":data[seg]?.[`${x}NoRepeatUniqueTotal`]?.toFixed(2)}</td>
    <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}NoRepeatAccumulatedArrayUnique`]?.[0]==undefined?"0.00":data[seg]?.[`${x}NoRepeatAccumulatedArrayUnique`]?.[0]?.toFixed(2)}</td>
    <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}NoRepeatAccumulatedArrayUnique`]?.[data[seg]?.[`${x}NoRepeatAccumulatedArrayUnique`]?.length-1]==undefined?"0.00":(data[seg]?.[`${x}NoRepeatAccumulatedArrayUnique`]?.[data[seg]?.[`${x}NoRepeatAccumulatedArrayUnique`]?.length-1]?.toFixed(2))}</td>
    <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[seg]?.[`${x}NoRepeatMediaUnique`])?"0.00":data[seg]?.[`${x}NoRepeatMediaUnique`]?.toFixed(2)}</td>
    <td>{isNaN(data?.[seg]?.[`${x}NoRepeatMedianUnique`])?"0.00":data?.[seg]?.[`${x}NoRepeatMedianUnique`]?.toFixed(2)}</td>
    </tr>)
    }
    return normalArray
  })
  let compositeArray=[]
  let c=nf.compositeFields.map((x,index)=>{
    lastColor=lastColor=="white"/*&& index%2==0*/?"lightgray":"white"
    compositeArray=[]
    compositeArray.push(<tr style={{margin:0,padding:0,color:"black",background:lastColor}}>
      <td style={{borderRight:"1px solid black"}}>{x}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}total`]==undefined?"0.00":data[seg]?.[`${x}total`]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}AccumulatedArray`]?.[0]==undefined?"0.00":data[seg]?.[`${x}AccumulatedArray`]?.[0]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}AccumulatedArray`]?.[data[seg]?.[`${x}AccumulatedArray`].length-1]==undefined?"0.00":(data[seg]?.[`${x}AccumulatedArray`]?.[data[seg]?.[`${x}AccumulatedArray`]?.length-1]?.toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[seg]?.[`${x}Media`])?"0.00":data[seg]?.[`${x}Media`]?.toFixed(2)}</td>
      <td>{isNaN(data?.[seg]?.[`${x}Median`])?"0.00":data?.[seg]?.[`${x}Median`]?.toFixed(2)}</td>
    </tr>
    )
    

    /*compositeArray.push(<tr style={{margin:0,padding:0,color:"black",background:lastColor}}>
      <td style={{borderRight:"1px solid black"}}>{`${x}NoRepeat`}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}NoRepeatTotal`]==undefined?"0.00":data[seg]?.[`${x}NoRepeatTotal`]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}NoRepeatAccumulatedArray`]?.[0]==undefined?"0.00":data[seg]?.[`${x}NoRepeatAccumulatedArray`]?.[0]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}NoRepeatAccumulatedArray`]?.[data[seg]?.[`${x}NoRepeatAccumulatedArray`].length-1]==undefined?"0.00":(data[seg]?.[`${x}NoRepeatAccumulatedArray`]?.[data[seg]?.[`${x}NoRepeatAccumulatedArray`]?.length-1]?.toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[seg]?.[`${x}NoRepeatMedia`])?"0.00":data[seg]?.[`${x}NoRepeatMedia`]?.toFixed(2)}</td>
      <td>{isNaN(data[seg]?.[`${x}NoRepeatMedian`])?"0.00":data?.[seg]?.[`${x}NoRepeatMedian`]?.toFixed(2)}</td>
    </tr>
    )*/
    if(cond){
      lastColor=lastColor=="white"/*&& index%2==0*/?"lightgray":"white"
      compositeArray.push(<tr style={{margin:0,padding:0,color:"black",background:lastColor}}>
      <td style={{borderRight:"1px solid black"}}>{`${x}NoRepeat`}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}NoRepeatTotal`]==undefined?"0.00":data[seg]?.[`${x}NoRepeatTotal`]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}NoRepeatAccumulatedArray`]?.[0]==undefined?"0.00":data[seg]?.[`${x}NoRepeatAccumulatedArray`]?.[0]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}NoRepeatAccumulatedArray`]?.[data[seg]?.[`${x}NoRepeatAccumulatedArray`].length-1]==undefined?"0.00":(data[seg]?.[`${x}NoRepeatAccumulatedArray`]?.[data[seg]?.[`${x}NoRepeatAccumulatedArray`]?.length-1]?.toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[seg]?.[`${x}NoRepeatMedia`])?"0.00":data[seg]?.[`${x}NoRepeatMedia`]?.toFixed(2)}</td>
      <td>{isNaN(data?.[seg]?.[`${x}NoRepeatMedian`])?"0.00":data?.[seg]?.[`${x}NoRepeatMedian`]?.toFixed(2)}</td>
    </tr>
    )
    lastColor=lastColor=="white"/*&& index%2==0*/?"lightgray":"white"
    compositeArray.push(<tr style={{margin:0,padding:0,color:"black",background:lastColor}}>
      <td style={{borderRight:"1px solid black"}}>{`${x}Unique`}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}UniqueTotal`]==undefined?"0.00":data[seg]?.[`${x}UniqueTotal`]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}AccumulatedArrayUnique`]?.[0]==undefined?"0.00":data[seg]?.[`${x}AccumulatedArrayUnique`]?.[0]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}AccumulatedArrayUnique`]?.[data[seg]?.[`${x}AccumulatedArrayUnique`].length-1]==undefined?"0.00":(data[seg]?.[`${x}AccumulatedArrayUnique`]?.[data[seg]?.[`${x}AccumulatedArrayUnique`]?.length-1]?.toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[seg]?.[`${x}MediaUnique`])?"0.00":data[seg]?.[`${x}MediaUnique`]?.toFixed(2)}</td>
      <td>{isNaN(data?.[seg]?.[`${x}MedianUnique`])?"0.00":data?.[seg]?.[`${x}MedianUnique`]?.toFixed(2)}</td>
    </tr>
    )
    lastColor=lastColor=="white"/*&& index%2==0*/?"lightgray":"white"
    compositeArray.push(<tr style={{margin:0,padding:0,color:"black",background:lastColor}}>
      <td style={{borderRight:"1px solid black"}}>{`${x}NoRepeatUnique`}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}NoRepeatUniqueTotal`]==undefined?"0.00":data[seg]?.[`${x}NoRepeatUniqueTotal`]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}NoRepeatAccumulatedArrayUnique`]?.[0]==undefined?"0.00":data[seg]?.[`${x}NoRepeatAccumulatedArrayUnique`]?.[0]?.toFixed(2)}</td>
      <td style={{borderRight:"1px solid black"}}>{data?.[seg]?.[`${x}NoRepeatAccumulatedArrayUnique`]?.[data[seg]?.[`${x}NoRepeatAccumulatedArrayUnique`].length-1]==undefined?"0.00":(data[seg]?.[`${x}NoRepeatAccumulatedArrayUnique`]?.[data[seg]?.[`${x}NoRepeatAccumulatedArrayUnique`]?.length-1]?.toFixed(2))}</td>
      <td style={{borderRight:"1px solid black"}}>{isNaN(data?.[seg]?.[`${x}NoRepeatMediaUnique`])?"0.00":data[seg]?.[`${x}NoRepeatMediaUnique`]?.toFixed(2)}</td>
      <td>{isNaN(data?.[seg]?.[`${x}MedianUnique`])?"0.00":data?.[seg]?.[`${x}NoRepeatMedianUnique`]?.toFixed(2)}</td>
    </tr>
    )
    }
    return compositeArray
  })
  return [...countArray,...n,...c]

}


/*const calMedian=(arr)=>{
  let median=0
  if(arr?.length>0){
  let length=arr.length
  arr=arr.map(x=>{
    if(x==undefined || x==null)
      return 0
    return x
  })
  if(length%2==1){
    if(arr[Math.floor(length/2)]!=undefined && arr[Math.floor(length/2)]!=null)
      median=arr[Math.floor(length/2)]
    else 
      median=0
  }else{
    let p1,p2
    if(arr[(length/2)-1]!=undefined && arr[(length/2)-1]!=null)
      p1=arr[(length/2)-1]
    else
      p1=0
    if(arr[(length/2)]!=undefined && arr[(length/2)]!=null)
      p2=arr[(length/2)]
    else
      p2=0
    
    median=(p1+p2)/2
  }
}
  return median
}*/

const calMedian=(arr)=>{
  let median=0
  let length=arr?.length
//console.log("arrdesp",arr,length)
  if(length==undefined || length==0 || isNaN(length))
    return 0
  else{
    if(length%2==1){
      if(arr[Math.floor(length/2)]==undefined){
        median=0
      }else
        median=arr[Math.floor(length/2)]
    }else{
      let p1,p2
      if(arr[(length/2)-1]==undefined)
        p1=0
      else
        p1=arr[(length/2)-1]
      if(arr[(length/2)]==undefined){
        p2=0
      }else
        p2=arr[(length/2)]

      
      
      
      median=(p1+p2)/2
    }

  return median
  }
}
/*
const calculateMediaAndMediansOfRecords=(category,ssd)=>{
 
  Object.keys(realGrandTotals1[category][subset]).forEach(y=>{
   //console.log("aplic",ssd,y,realGrandTotals1)
    if(Object.keys(ssd[y]).length>0){
  
    Object.keys(ssd[y]).forEach(u=>{
      if(category==`getData${currentCategory.name}`){
        if(y==`getData${currentCategory.name}`){
          
          firstCatNormalFields[u].normal.forEach(i=>{
            let total=0
            let sortedValues
            let median=0
            if(i.type=="number"){
              total=0
              sortedValues=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                 return 0
                return x
              })
              if(sortedValues.length>0){
                
                sortedValues.forEach(i=>{
                  if(i!=undefined && i!=null)
                    total=total+i
                })
                realGrandTotals1[category][y][`${i.name1}Media`]=(total/sortedValues.length)
                

                if(sortedValues.length%2==1){
                  median=(sortedValues[Math.floor(sortedValues.length/2)])
                }else{
                  median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
                }
                realGrandTotals1[category][y][`${i.name1}Median`]=median
                  
                    
              }else{
                realGrandTotals1[category][y][`${i.name1}Media`]=0
                realGrandTotals1[category][y][`${i.name1}Median`]=0
              }
            }

          })
          firstCatNormalFields[y].compositeFields.forEach(i=>{
            let total=0
            let sortedValues
            let median=0
            
            if(i.type=="number"){
              total=0
              sortedValues=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                 return 0
                return x
              })
              if(sortedValues.length>0){
                sortedValues.forEach(i=>total=total+i)
                realGrandTotals1[category][subset][y][`${i.name1}Media`]=(total/sortedValues.length)
                

                if(sortedValues.length%2==1){
                  median=(sortedValues[Math.floor(sortedValues.length/2)])
                }else{
                  median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
                }
                realGrandTotals1[category][subset][y][`${i.name1}Median`]=median
              }else{
                realGrandTotals1[category][subset][y][`${i.name1}Media`]=0
                realGrandTotals1[category][subset][y][`${i.name1}Median`]=0
              }
            }
          })
            
        }else{
          let total=0
          
          let median=0
            
          otmChoices[y].normal.forEach(i=>{
            if(i.type=="number"){
              total=0
              let sortedValues=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                 return 0
                return x
              })
              if(sortedValues.length>0){
                sortedValues.forEach(i=>total=total+i)
                realGrandTotals1[category][subset][y][`${i.name1}Media`]=(total/sortedValues.length)
                

                if(sortedValues.length%2==1){
                  median=(sortedValues[Math.floor(sortedValues.length/2)])
                }else{
                  median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
                }
                realGrandTotals1[category][subset][y][`${i.name1}Median`]=median
              }else{
                realGrandTotals1[category][subset][y][`${i.name1}Media`]=0
                realGrandTotals1[category][subset][y][`${i.name1}Median`]=0
              }

            }
          })
          otmChoices[y].compositeFields.forEach(i=>{
            if(i.type=="number"){
            
              let total=0
              let sortedValues=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                 return 0
                return x
              })
              let median=0
              if(sortedValues.length>0){
                sortedValues.forEach(i=>total=total+i)
                realGrandTotals1[category][subset][y][`${i.name1}Media`]=(total/sortedValues.length)
                

                if(sortedValues.length%2==1){
                  median=(sortedValues[Math.floor(sortedValues.length/2)])
                }else{
                  median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
                }
                realGrandTotals1[category][subset][y][`${i.name1}Median`]=median
              }else{
                realGrandTotals1[category][subset][y][`${i.name1}Media`]=0
                realGrandTotals1[category][subset][y][`${i.name1}Median`]=0
              }
            }
            
          })
        }
      }else{
        if(category==y){
          otmChoices[y].normal.forEach(i=>{
            if(i.type=="number"){
              let total=0
              let median=0
              let sortedValues=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                 return 0
                return x
              })
              if(sortedValues.length>0){
                sortedValues.forEach(i=>total=total+i)
                realGrandTotals1[category][subset][y][`${i.name1}Media`]=(total/sortedValues.length)
                

                if(sortedValues.length%2==1){
                  median=(sortedValues[Math.floor(sortedValues.length/2)])
                }else{
                  median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
                }
                realGrandTotals1[category][subset][y][`${i.name1}Median`]=median
              }else{
                realGrandTotals1[category][subset][y][`${i.name1}Media`]=0
                realGrandTotals1[category][subset][y][`${i.name1}Median`]=0
              }
            }
          })
          otmChoices[y].compositeFields.forEach(i=>{
            if(i.type=="number"){
              let total=0
              let sortedValues=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                 return 0
                return x
              })
              if(sortedValues.length>0){
                let median=0
                sortedValues.forEach(i=>total=total+i)
                realGrandTotals1[category][subset][y][`${i.name1}Media`]=(total/sortedValues.length)
                

                if(sortedValues.length%2==1){
                  median=(sortedValues[Math.floor(sortedValues.length/2)])
                }else{
                  median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
                }
                realGrandTotals1[category][subset][y][`${i.name1}Median`]=median
              }else{
                realGrandTotals1[category][subset][y][`${i.name1}Media`]=0
                realGrandTotals1[category][subset][y][`${i.name1}Median`]=0
              }
            }
          })
        }else{
          otmChoices[y].normal.forEach(i=>{
            if(i.type=="number"){
              let total=0
              let median=0
              let sortedValues=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              if(sortedValues.length>0){
                sortedValues=sortedValues.map(x=>{
                  if(x==undefined || x==null)
                  return 0
                  return x
                })
                sortedValues.forEach(i=>total=total+i)
                realGrandTotals1[category][subset][y][`${i.name1}Media`]=(total/sortedValues.length)
                

                if(sortedValues.length%2==1){
                  median=(sortedValues[Math.floor(sortedValues.length/2)])
                }else{
                  median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
                }
                realGrandTotals1[category][subset][y][`${i.name1}Median`]=median
              }else{
                realGrandTotals1[category][subset][y][`${i.name1}Media`]=0
                realGrandTotals1[category][subset][y][`${i.name1}Median`]=0
              }
            }
          })
          otmChoices[y].compositeFields.forEach(i=>{
            if(i.type=="number"){
              let total=0
              let median=0
              let sortedValues=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                 return 0
                return x
              })
              if(sortedValues.length>0){
                sortedValues.forEach(i=>total=total+i)
                realGrandTotals1[category][subset][y][`${i.name1}Media`]=(total/sortedValues.length)
                

                if(sortedValues.length%2==1){
                  median=(sortedValues[Math.floor(sortedValues.length/2)])
                }else{
                  median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
                }
                realGrandTotals1[category][subset][y][`${i.name1}Median`]=median
              }else{
                realGrandTotals1[category][subset][y][`${i.name1}Media`]=0
                realGrandTotals1[category][subset][y][`${i.name1}Median`]=0
              }
            }
          })
        }
      }
    })
    }
    
  })
}*/
const calculateMediaAndMediansOfRecords=(category,ssd)=>{
  Object.keys(realGrandTotals1[category][subset]).forEach(y=>{
    //Object.keys(ssd[y]).forEach(u=>{
      if(category==`getData${currentCategory.name}`){
        if(y==`getData${currentCategory.name}`){
          
          firstCatNormalFields[y].normal.forEach(i=>{
            let total=0
            let sortedValues
            let median=0
            if(i.type=="number"){
              total=0
              sortedValues=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues.forEach(i=>total=total+i)
              realGrandTotals1[category][subset][y][`${i.name1}Media`]=(total/sortedValues.length)
              

              if(sortedValues.length%2==1){
                median=(sortedValues[Math.floor(sortedValues.length/2)])
              }else{
                median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
              }
              realGrandTotals1[category][subset][y][`${i.name1}Median`]=median

            }    
          })
          firstCatNormalFields[y].compositeFields.forEach(i=>{
            let total=0
            let sortedValues
            let median=0
            
            if(i.type=="number"){
              total=0
              sortedValues=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues.forEach(i=>total=total+i)
              realGrandTotals1[category][subset][y][`${i.name1}Media`]=(total/sortedValues.length)
              

              if(sortedValues.length%2==1){
                median=(sortedValues[Math.floor(sortedValues.length/2)])
              }else{
                median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
              }
              realGrandTotals1[category][subset][y][`${i.name1}Median`]=median

            }
          })
            
        }else{
          let total=0
          let totalA=0
          let median=0
          let medianA=0
          let arr
          let arrA

          let total1=0
          let total1A=0
          let median1=0
          let median1A=0
          let arr1
          let arr1A

          
          if(y.startsWith("otm")){
            arr=otmChoices[y]
          }else if(y.startsWith("mtm"))
            arr=otmChoices[y]
        
          arr.normal.forEach(i=>{
            if(i.type=="number"){
              total=0
              totalA=0
              total1=0
              total1A=0
              
              let sortedValues=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              let sortedValuesA=realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`].sort((a,b)=>a-b)
              let sortedValues1=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`].sort((a,b)=>a-b)
              let sortedValues1A=realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`].sort((a,b)=>a-b)
              
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValuesA=sortedValuesA.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })

              sortedValues1=sortedValues1.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues1A=sortedValues1A.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              }) 
              sortedValues.forEach(i=>total=total+i)
              sortedValuesA.forEach(i=>totalA=totalA+i)
              sortedValues1.forEach(i=>total1=total1+i)
              sortedValues1A.forEach(i=>total1A=total1A+i)
              
              realGrandTotals1[category][subset][y][`${i.name1}Media`]=(total/sortedValues.length)
              realGrandTotals1[category][subset][y][`${i.name1}NoRepeatMedia`]=(totalA/sortedValuesA.length)
              realGrandTotals1[category][subset][y][`${i.name1}MediaUnique`]=(total1/sortedValues1.length)
              realGrandTotals1[category][subset][y][`${i.name1}NoRepeatMediaUnique`]=(total1A/sortedValues1A.length)
              

              if(sortedValues.length%2==1){
                median=(sortedValues[Math.floor(sortedValues.length/2)])
              }else{
                median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
              }
              if(sortedValuesA.length%2==1){
                medianA=(sortedValuesA[Math.floor(sortedValuesA.length/2)])
              }else{
                medianA=((sortedValuesA[(sortedValuesA.length/2)-1]+sortedValuesA[(sortedValuesA.length/2)])/2)
              }

              if(sortedValues1.length%2==1){
                median1=(sortedValues1[Math.floor(sortedValues1.length/2)])
              }else{
                median1=((sortedValues1[(sortedValues1.length/2)-1]+sortedValues1[(sortedValues1.length/2)])/2)
              }
              if(sortedValues1A.length%2==1){
                median1A=(sortedValues1A[Math.floor(sortedValues1A.length/2)])
              }else{
                median1A=((sortedValues1A[(sortedValues1A.length/2)-1]+sortedValues1A[(sortedValues1A.length/2)])/2)
              }
              realGrandTotals1[category][subset][y][`${i.name1}Median`]=median
              realGrandTotals1[category][subset][y][`${i.name1}NoRepeatMedian`]=medianA
              realGrandTotals1[category][subset][y][`${i.name1}MedianUnique`]=median1
              realGrandTotals1[category][subset][y][`${i.name1}NoRepeatMedianUnique`]=median1A

            }
          })
          arr.compositeFields.forEach(i=>{
            if(i.type=="number"){
            
              let total=0
              let totalA=0
              let total1=0
              let total1A=0
              let sortedValues=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              let sortedValuesA=realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`].sort((a,b)=>a-b)
              let sortedValues1=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`].sort((a,b)=>a-b)
              let sortedValues1A=realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`].sort((a,b)=>a-b)
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValuesA=sortedValuesA.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues1=sortedValues1.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues1A=sortedValues1A.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              let median=0
              let medianA=0
              let median1=0
              let median1A=0
              sortedValues.forEach(i=>total=total+i)
              sortedValuesA.forEach(i=>totalA=totalA+i)
              sortedValues1.forEach(i=>total1=total1+i)
              sortedValues1A.forEach(i=>total1A=total1A+i)
              realGrandTotals1[category][subset][y][`${i.name1}Media`]=(total/sortedValues.length)
              realGrandTotals1[category][subset][y][`${i.name1}NoRepeatMedia`]=(totalA/sortedValuesA.length)
              realGrandTotals1[category][subset][y][`${i.name1}MediaUnique`]=(total1/sortedValues1.length)
              realGrandTotals1[category][subset][y][`${i.name1}NoRepeatMediaUnique`]=(total1A/sortedValues1A.length)
              

              if(sortedValues.length%2==1){
                median=(sortedValues[Math.floor(sortedValues.length/2)])
              }else{
                median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
              }
              if(sortedValuesA.length%2==1){
                medianA=(sortedValuesA[Math.floor(sortedValuesA.length/2)])
              }else{
                medianA=((sortedValuesA[(sortedValuesA.length/2)-1]+sortedValuesA[(sortedValuesA.length/2)])/2)
              }
              if(sortedValues1.length%2==1){
                median1=(sortedValues1[Math.floor(sortedValues1.length/2)])
              }else{
                median1=((sortedValues1[(sortedValues1.length/2)-1]+sortedValues1[(sortedValues1.length/2)])/2)
              }
              if(sortedValues1A.length%2==1){
                median1A=(sortedValues1A[Math.floor(sortedValues1A.length/2)])
              }else{
                median1A=((sortedValues1A[(sortedValues1A.length/2)-1]+sortedValues1A[(sortedValues1A.length/2)])/2)
              }
              realGrandTotals1[category][subset][y][`${i.name1}Median`]=median
              realGrandTotals1[category][subset][y][`${i.name1}NoRepeatMedian`]=medianA
              realGrandTotals1[category][subset][y][`${i.name1}MedianUnique`]=median1
              realGrandTotals1[category][subset][y][`${i.name1}NoRepeatMedianUnique`]=median1A
            }
            
          })
        }
      }else{
        if(category==y){
          let arr
        
        
          if(y.startsWith("otm")){
            arr=otmChoices[y]
          }else if(y.startsWith("mtm"))
            arr=otmChoices[y]
        
          arr.normal.forEach(i=>{
            if(i.type=="number"){
              let total=0
              let median=0
              let sortedValues=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)

              let total1=0
              let median1=0
              let sortedValues1=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`].sort((a,b)=>a-b)

              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues1=sortedValues1.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues.forEach(i=>total=total+i)
              sortedValues1.forEach(i=>total1=total1+i)
              realGrandTotals1[category][subset][y][`${i.name1}Media`]=(total/sortedValues.length)
              realGrandTotals1[category][subset][y][`${i.name1}MediaUnique`]=(total1/sortedValues1.length)

              if(sortedValues.length%2==1){
                median=(sortedValues[Math.floor(sortedValues.length/2)])
              }else{
                median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
              }
              if(sortedValues1.length%2==1){
                median1=(sortedValues1[Math.floor(sortedValues1.length/2)])
              }else{
                median1=((sortedValues1[(sortedValues1.length/2)-1]+sortedValues1[(sortedValues1.length/2)])/2)
              }
              realGrandTotals1[category][subset][y][`${i.name1}Median`]=median
              realGrandTotals1[category][subset][y][`${i.name1}MedianUnique`]=median1

            }
          })
          arr.compositeFields.forEach(i=>{
            if(i.type=="number"){
              let total=0
              let sortedValues=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              let median=0
              let total1=0
              let sortedValues1=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`].sort((a,b)=>a-b)
              let median1=0
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues1=sortedValues1.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues.forEach(i=>total=total+i)
              sortedValues1.forEach(i=>total1=total1+i)
              realGrandTotals1[category][subset][y][`${i.name1}Media`]=(total/sortedValues.length)
              realGrandTotals1[category][subset][y][`${i.name1}MediaUnique`]=(total1/sortedValues1.length)

              if(sortedValues.length%2==1){
                median=(sortedValues[Math.floor(sortedValues.length/2)])
              }else{
                median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
              }
              if(sortedValues1.length%2==1){
                median1=(sortedValues1[Math.floor(sortedValues1.length/2)])
              }else{
                median1=((sortedValues1[(sortedValues1.length/2)-1]+sortedValues1[(sortedValues1.length/2)])/2)
              }
              realGrandTotals1[category][subset][y][`${i.name1}Median`]=median
              realGrandTotals1[category][subset][y][`${i.name1}MedianUnique`]=median1
            }
          })
        }else{
          let arr
        
          if(y.startsWith("otm")){
            arr=otmChoices[y]
          }else if(y.startsWith("mtm"))
            arr=otmChoices[y]
        
          arr.normal.forEach(i=>{
            if(i.type=="number"){
              let total=0
              let totalA=0
              let median=0
              let medianA=0
              let sortedValues=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              let sortedValuesA=realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`].sort((a,b)=>a-b)
              let total1=0
              let total1A=0
              let median1=0
              let median1A=0
              let sortedValues1=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`].sort((a,b)=>a-b)
              let sortedValues1A=realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`].sort((a,b)=>a-b)
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValuesA=sortedValuesA.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues1=sortedValues1.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues1A=sortedValues1A.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues.forEach(i=>total=total+i)
              sortedValuesA.forEach(i=>totalA=totalA+i)
              sortedValues1.forEach(i=>total1=total1+i)
              sortedValues1A.forEach(i=>total1A=total1A+i)
              realGrandTotals1[category][subset][y][`${i.name1}Media`]=(total/sortedValues.length)
              realGrandTotals1[category][subset][y][`${i.name1}NoRepeatMedia`]=(totalA/sortedValuesA.length)
              realGrandTotals1[category][subset][y][`${i.name1}MediaUnique`]=(total1/sortedValues1.length)
              realGrandTotals1[category][subset][y][`${i.name1}NoRepeatMediaUnique`]=(total1A/sortedValues1A.length)

              if(sortedValues.length%2==1){
                median=(sortedValues[Math.floor(sortedValues.length/2)])
              }else{
                median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
              }
              if(sortedValuesA.length%2==1){
                medianA=(sortedValuesA[Math.floor(sortedValuesA.length/2)])
              }else{
                medianA=((sortedValuesA[(sortedValuesA.length/2)-1]+sortedValuesA[(sortedValuesA.length/2)])/2)
              }
              if(sortedValues1.length%2==1){
                median1=(sortedValues1[Math.floor(sortedValues1.length/2)])
              }else{
                median1=((sortedValues1[(sortedValues1.length/2)-1]+sortedValues1[(sortedValues1.length/2)])/2)
              }
              if(sortedValues1A.length%2==1){
                median1A=(sortedValues1A[Math.floor(sortedValues1A.length/2)])
              }else{
                median1A=((sortedValues1A[(sortedValues1A.length/2)-1]+sortedValues1A[(sortedValues1A.length/2)])/2)
              }
              realGrandTotals1[category][subset][y][`${i.name1}Median`]=median
              realGrandTotals1[category][subset][y][`${i.name1}NoRepeatMedian`]=medianA
              realGrandTotals1[category][subset][y][`${i.name1}MedianUnique`]=median1
              realGrandTotals1[category][subset][y][`${i.name1}NoRepeatMedianUnique`]=median1A
            }
          })
          arr.compositeFields.forEach(i=>{
            if(i.type=="number"){
              let total=0
              let totalA=0
              let median=0
              let medianA=0
              let sortedValues=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].sort((a,b)=>a-b)
              let sortedValuesA=realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArray`].sort((a,b)=>a-b)

              let total1=0
              let total1A=0
              let median1=0
              let median1A=0
              let sortedValues1=realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArrayUnique`].sort((a,b)=>a-b)
              let sortedValues1A=realGrandTotals1[category][subset][y][`${i.name1}NoRepeatAccumulatedArrayUnique`].sort((a,b)=>a-b)
              sortedValues=sortedValues.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValuesA=sortedValuesA.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues1=sortedValues1.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues1A=sortedValues1A.map(x=>{
                if(x==undefined || x==null)
                  return 0
                return x
              })
              sortedValues.forEach(i=>total=total+i)
              sortedValuesA.forEach(i=>totalA=totalA+i)
              sortedValues1.forEach(i=>total1=total1+i)
              sortedValues1A.forEach(i=>total1A=total1A+i)
              realGrandTotals1[category][subset][y][`${i.name1}Media`]=(total/sortedValues.length)
              realGrandTotals1[category][subset][y][`${i.name1}NoRepeatMedia`]=(totalA/sortedValuesA.length)
              realGrandTotals1[category][subset][y][`${i.name1}MediaUnique`]=(total1/sortedValues1.length)
              realGrandTotals1[category][subset][y][`${i.name1}NoRepeatMediaUnique`]=(total1A/sortedValues1A.length)
              

              if(sortedValues.length%2==1){
                median=(sortedValues[Math.floor(sortedValues.length/2)])
              }else{
                median=((sortedValues[(sortedValues.length/2)-1]+sortedValues[(sortedValues.length/2)])/2)
              }
              if(sortedValuesA.length%2==1){
                medianA=(sortedValuesA[Math.floor(sortedValuesA.length/2)])
              }else{
                medianA=((sortedValuesA[(sortedValuesA.length/2)-1]+sortedValuesA[(sortedValuesA.length/2)])/2)
              }
              if(sortedValues1.length%2==1){
                median1=(sortedValues1[Math.floor(sortedValues1.length/2)])
              }else{
                median1=((sortedValues1[(sortedValues1.length/2)-1]+sortedValues1[(sortedValues1.length/2)])/2)
              }
              if(sortedValues1A.length%2==1){
                median1A=(sortedValues1A[Math.floor(sortedValues1A.length/2)])
              }else{
                median1A=((sortedValues1A[(sortedValues1A.length/2)-1]+sortedValues1A[(sortedValues1A.length/2)])/2)
              }
              realGrandTotals1[category][subset][y][`${i.name1}Median`]=median
              realGrandTotals1[category][subset][y][`${i.name1}NoRepeatMedian`]=medianA
              realGrandTotals1[category][subset][y][`${i.name1}MedianUnique`]=median1
              realGrandTotals1[category][subset][y][`${i.name1}NoRepeatMedianUnique`]=median1A
            }
          })
        }
      }
    //})
  })
}

  

  return <div>
    {/*<p>Category {category}</p>
    <p>{subset}</p>*/}
    {printedTable}
  </div>
}