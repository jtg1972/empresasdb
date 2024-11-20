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
    console.log("subset9090",subset,subsetsData)
    console.log("conditionswhere1",conditionsWhere,data)
    if(subsetsData!=undefined){
      //verifyMeetWithConditionsBySegmentBaseLevel2(category,data,ssd1)
      getCategoriesGrandTotals(category,subsetsData)
      calculatePercentageOverGrandTotal(subsetsData[category][subset])
      console.log("ssdata77",subsetsData,data)
      calculateMediaAndMediansOfRecords(category,subsetsData[category][subset])
      /*bloque que obtiene la participacion de los subsets a la tabla category*/
      console.log("orderanswers",category,order,data,otmChoices,firstCatNormalFields,subsets[category])
      //calculateSubsetContributions(ssd)
      //termina bloque
  
      printFinalTableNew(category,subsetsData,order[1][category])//,order[0])
      printGrandTotalsTrue(category,realGrandTotals1[category][subset],order[1][category])
      setPrintedTable(twoTables)
    }
    
    //setSubsetsData(ssd)
  },[subsetsData])

  

  
  
  
  const printFinalTableNew=(category,data2,segments)=>{//,order)=>{
    console.log("iniciobegin",firstCatNormalFields,otmChoices)
    
  twoTables.push(printMainHeaders(subsetsData[category][subset],category,segments))
  //setSubsetsData(data2)  
  }
  const printMainHeaders=(data,category,segments)=>{
    let subtitles={}
    let head=[]
    let subsection={}
    let realSegmentsCount=[]
  
  
    
    let realSegmentsLast=segments[segments.length-1]
    console.log("getfieldssegment",data,realSegmentsCount,realSegmentsLast)
    segments.forEach((a,index)=>{
      if(head==undefined)
        head=[]
      
      head.push(a)
      let isLast=false
      console.log("yyy",realSegmentsCount,category,a,segments,index,segments.length-1,index==segments.length-1)
      
      if(index==realSegmentsCount.length-1)
        isLast=true
      
      subtitles[a]=getFieldsSegment(category,a,realSegmentsLast)
      subsection[a]=getFieldsDataSegment(category,a,realSegmentsLast,data)
        
    })
    console.log("subtitles",subtitles,head)
    
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
  }

  const getFieldsSegment=(category,segment,realSegmentLast)=>{
    let result=[]
    let len=0
    console.log("realsegmentlast111",realSegmentLast)
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
        console.log("otmchoices22",otmChoices[segment])
  
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
      
      console.log("theresnormal",segment,realSegmentLast,lastIndexNumber,lastIndexNumberComposite,realSegmentLast==segment && lastIndexNumber==-1 && lastIndexNumberComposite==-1)
      if(theresNormal)
      otmChoices[segment].normal.forEach((q,index)=>{
          
        if(q.type=="number"){
          console.log("uiiii",otmChoicesStatistics?.[category]?.[segment],q.name1)
          let otmStatisticsArray=[]
          for(let x in otmChoicesStatistics?.[category]?.[segment]?.[q.name1]){
            console.log("o1111",otmChoicesStatistics?.[category]?.[segment]?.[q.name1]?.[x],x)
            if(otmChoicesStatistics?.[category]?.[segment]?.[q.name1]?.[x]==true){
              otmStatisticsArray.push(x)
            }
          }
          console.log("otmstatisticsarray",otmStatisticsArray)
          console.log("qqq",q.name1,realSegmentLast,segment,normal-1,index)
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
    console.log("numericvalues",cat,res)
    return res
  }

  const getCategoriesGrandTotals=(category,ssd)=>{
    console.log("ssd879",ssd)
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
    console.log("realGrandtotals",realGrandTotals1)
  }

 const calculatePercentageOverGrandTotal=(ssd)=>{
    if(tableTotalRecords[category]==undefined)
      tableTotalRecords[category]=0
    Object.keys(realGrandTotals1[category][subset]).forEach((y,p)=>{
      console.log("verifverif",ssd,realGrandTotals1)
      if(p==0)
        tableTotalRecords[category]=Object.keys(ssd[y]).length
      Object.keys(ssd[y]).forEach(u=>{
        if(category==`getData${currentCategory.name}`){
          if(y==`getData${currentCategory.name}`){
            
            firstCatNormalFields[y].normal.forEach(i=>{
              if(i.type=="number"){
                subsetsData[y][u][`%${i.name1}Subset`]=(subsetsData?.[y]?.[u]?.[i.name1]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[y][u][i.name1]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
                if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(subsetsData[y][u][i.name1])
              }    
            })
            firstCatNormalFields[y].compositeFields.forEach(i=>{
              if(i.type=="number"){
                ssd[y][u][`%${i.name1}Subset`]=(ssd?.[y]?.[u]?.[i.name1]!=undefined && realGrandTotals1[category][y][`${i.name1}total`]>0)?(ssd[y][u][i.name1]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
                if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(subsetsData[y][u][i.name1])
              }
            })
          }else{
            otmChoices[y].normal.forEach(i=>{
              if(i.type=="number"){
                ssd[y][u][`%${i.name1}Subset`]=(ssd?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
                //((finalObject[category][y][u][`${i.name1}total`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
                if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(ssd[y][u][`${i.name1}total`])
              }
            })
            otmChoices[y].compositeFields.forEach(i=>{
              if(i.type=="number"){
                ssd[y][u][`%${i.name1}Subset`]=(ssd?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
                //((finalObject[category][y][u][`${i.name1}total`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
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
                console.log("supervision",realGrandTotals1[category][subset],y,`${i.name1}total`,realGrandTotals1[category][subset][y][`${i.name1}total`])
                ssd[y][u][`%${i.name1}Subset`]=(ssd?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
                //((finalObject[category][y][u][`${i.name1}`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
                if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(ssd[y][u][i.name1])
              }
            })
            otmChoices[y].compositeFields.forEach(i=>{
              if(i.type=="number"){
                ssd[y][u][`%${i.name1}Subset`]=(ssd?.[y]?.[u]?.[i.name1]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[y][u][i.name1]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
                //((finalObject[category][y][u][`${i.name1}`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
                if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
              realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(ssd[y][u][i.name1])
              }
            })
          }else{
            otmChoices[y].normal.forEach(i=>{
              if(i.type=="number"){
                ssd[y][u][`%${i.name1}Subset`]=(ssd?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
                //((finalObject[category][y][u][`${i.name1}total`]/realGrandTotals1[category][y][`${i.name1}total`])*100)
                if(realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]==undefined)
                  realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`]=[]
                realGrandTotals1[category][subset][y][`${i.name1}AccumulatedArray`].push(ssd[y][u][`${i.name1}total`])
              }
            })
            otmChoices[y].compositeFields.forEach(i=>{
              if(i.type=="number"){
                ssd[y][u][`%${i.name1}Subset`]=(ssd?.[y]?.[u]?.[`${i.name1}total`]!=undefined && realGrandTotals1[category][subset][y][`${i.name1}total`]>0)?(ssd[y][u][`${i.name1}total`]/realGrandTotals1[category][subset][y][`${i.name1}total`])*100:0
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
    
  }

  const printGrandTotalsTrue=(category,data,segments)=>{
    console.log("resumen",category,data,segments)
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

  const getFieldsDataSegment=(category,a,realSegmentLast,data2)=>{
    let result=[]
    let total=[]
    //let data=finalObject[category][a]
    let data=data2[a]
    console.log("dataverif",data)
    let lastColor="lightgray"
    console.log("data56",data)
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
              console.log("o1111",otmChoicesStatistics?.[category]?.[a]?.[q.name1]?.[x],x)
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
              console.log("track1",data[y][`${a}TotalCount`]/realGrandTotals1[category][subset][a][`${a}TotalCount`])
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
  
}
const displayCategoryFields=(seg,data,cond)=>{
  const nf=getNumericFields(seg)
  let tcr=[]
  let lastColor="lightgray"
  //data=data[category][subset]
  console.log("datauiu",data,seg,cond)
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
    console.log("dataseg11",data[seg])
    lastColor=lastColor=="white" /*&& index%2==0*/?"lightgray":"white"
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
    lastColor=lastColor=="white"/*&& index%2==0*/?"lightgray":"white"

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

}

const calMedian=(arr)=>{
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
}

const calculateMediaAndMediansOfRecords=(category,ssd)=>{
 
  Object.keys(realGrandTotals1[category][subset]).forEach(y=>{
    console.log("aplic",ssd,y,realGrandTotals1)
    if(Object.keys(ssd[y]).length>0){
  
    Object.keys(ssd[y]).forEach(u=>{
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
}

  

  return <div>
    {/*<p>Category {category}</p>
    <p>{subset}</p>*/}
    {printedTable}
  </div>
}