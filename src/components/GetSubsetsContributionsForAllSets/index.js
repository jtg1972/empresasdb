import {useEffect} from 'react'

const GetSubsetsContributionsForAllSets=({
  vars
}
)=>{
  const {
    order,
    data,
    displayRaw,
    grandTotals,
    firstCatNormalFields,
    otmChoices,
    subsets,
    finalRoutes,
    routes,
    immediateSons,
    setDummyState
  }=vars
  const alreadyDone={}
  useEffect(()=>{
    startProcess()
  },[subsets,data])
  console.log("varsfijo",order,
  data,
  displayRaw,
  grandTotals,
  firstCatNormalFields,
  otmChoices,
  subsets,finalRoutes,routes,
  immediateSons)
  let dataAgainstAll={}

  const calcSubsetVariables=(key,subsets,toAnalizeTable,segment,dataSegment)=>{
    
  }

  const initializeVariablesSubsets=(rec,mainTable,route,toAnalizeTable)=>{
    let pivote=route[1]
    let recordsToAnalize=[]
    for(let i=0;i<=rec.keys.length;i++){
      
      for(let j=0;j<Object.keys(data[pivote]).length;j++){
        if(Object.keys(data[pivote])[j]!=pivote){
          console.log("nonouij",data,data[pivote],pivote,Object.keys(data[pivote])[j])
          recordsToAnalize=Object.keys(data[pivote][Object.keys(data[pivote])[j]]["data"]).map(p=>{
            console.log("keyskeys",data[pivote][pivote][p].id,rec.id)
            if(data[pivote][pivote][p]["parentId"]==rec.id)
              return data[pivote][Object.keys(data[pivote])[j]]["data"][p]
            else
            return ""
          }).filter(o=>o!="")
          console.log("subsetspoiuy",subsets[toAnalizeTable],pivote,mainTable,recordsToAnalize,rec.id)
          if(subsets[pivote]!=undefined){
            for(let ss=0;ss<Object.keys(subsets[pivote]).length;ss++)
              calcSubsetVariables(rec.keys?.[i],subsets[pivote][ss],toAnalizeTable,recordsToAnalize)
          }
            
        }
      }
      
    }


  }
  const createSubsetMain=(mainTable,toAnalizeTable,route)=>{
    console.log("maintable",mainTable,toAnalizeTable,route)
    for(let j=0;j<Object.keys(data[mainTable][mainTable]).length;j++){
      initializeVariablesSubsets(data[mainTable][mainTable][j],mainTable,route,toAnalizeTable)
    }

  }
  const calRoute=(table,begin,end)=>{
    let route=[]
    for(let o=begin;o<=end;o++)
      route.push(table[o])
    console.log("routecalc",route)
    return route
  }

  const beginContributions=(tables)=>{
    let startIndex=0
    
    for(let j=tables.length-1;j>=0;j--){
      startIndex=j-2
      for(let i=startIndex;i>=0;i--){
        console.log("tablarespectiva80",tables[i],tables[j])
        
        createSubsetMain(tables[i],tables[j],calRoute(tables,i,j))

      }
    }
    console.log("tabla18010")
    
  }
  const startProcess=()=>{
    
    console.log("orderbegin",order[0].length)
    for(let i=0;i<finalRoutes.length;i++){
      let route=routes[finalRoutes[i]]
      beginContributions(route)
      
    }
    /*for(let j=order[0].length-1;j>=0;j--){
      console.log("orderdetail",order,order[0][j],order[1][order[0][j]])
      if(order[1][order[0][j]].length>=3){
        console.log("entro aqui00")
        beginContributions(order[1][order[0][j]])
      }
    }*/
    
  

  }
  return <p>Jorge</p>
}
export {GetSubsetsContributionsForAllSets}