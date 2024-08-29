/*{
  data,
  subsets,
  category,
  
  conditionsWhere,
  order,
  firstCatNormalFields,
  otmChoices,
  parentCategories,
  parentIdentifiers,
  otmChoicesStatistics,
}*/
let subsetsData={}
export const getSubsetsData=(vars)=>{

  
   console.log("vars88",vars) 
    if(vars.subsets!=undefined){
  
      Object.keys(vars.subsets).forEach(cat=>{

        subsetsData={...subsetsData,[cat]:{}}
        if(vars.subsets[cat]!=undefined)
          Object.keys(vars.subsets[cat]).forEach(ss=>{
            subsetsData={...subsetsData,[cat]:
              {...subsetsData[cat],
              [ss]:{}}}
              verifyMeetWithConditionsBySegmentBaseLevel2(vars,cat,vars.data[cat],ss,ss)
          })
      })
    }
  
  console.log("return subsetsData",subsetsData)
  return subsetsData
}

const verifyMeetWithConditionsBySegmentBaseLevel2=(vars,category,data1,ssd,ss)=>{
  console.log("datadetail",data1,category)
  let segment=vars.subsets[category][ss]["segment"]
  let fieldName=vars.subsets[category][ss]["fieldName"]
  let rule=vars.subsets[category][ss]["rule"]
  let u=vars.subsets[category][ss]
  let ruleName=vars.subsets[category][ss]["ruleName"]
  //console.log("veri222",category,x)
  
  let getMainRule=vars.conditionsWhere[category][segment][fieldName][ruleName]
  let type=vars.conditionsWhere[category][segment][fieldName]["type"]
  let datafield=vars.conditionsWhere[category][segment][fieldName]
  let res
  
  //console.log("ssd22",ssd1,data1,"entro aqui")
  console.log("pero ", data1[segment],segment,datafield,getMainRule)
  if(category==segment){
    
    let newRecord={}
    Object.keys(data1[category]).forEach(y=>{
      if(checkRule(getMainRule,data1[segment][y],category==segment,fieldName,type,/*u,y*/vars.conditionsWhere)){
        Object.keys(data1).forEach(k=>{
          //if(ssd?.[category]?.[subset]?.[k]==undefined)
          subsetsData={...subsetsData,[category]:{...subsetsData[category],[ss]:{...subsetsData[category][ss],[k]:{...subsetsData[category][ss][k],[y]:data1[k][y]}}}}
            console.log("ssd99",ssd)
        })
      
        
        /*Object.keys(data).forEach(l=>{
            delete data[l][y]
          })
        } */
      } 
    })
  
    
  }else if(category!==segment && segment!=="hybrid"){
     
    Object.keys(data1[segment]).forEach(y=>{
      if(checkRule(getMainRule,data1[segment][y],false,fieldName,type,/*u,*/vars.conditionsWhere)){
        
        Object.keys(data1).forEach(k=>{
          //if(ssd[category]?.[subset]?.[k]==undefined)
          subsetsData={...subsetsData,[category]:{...subsetsData[category],[ss]:{...subsetsData[category][ss],[k]:{...subsetsData[category][ss][k],[y]:data1[k][y]}}}}
        })
      
      
      }
    })
  }else if(segment=="hybrid"){
    Object.keys(data1[category]).forEach(y=>{
      if(checkRuleHybrid(getMainRule,data1,y,vars.conditionsWhere)){
        
        Object.keys(data1).forEach(k=>{
          //if(ssd?.[category]?.[subset]?.[k]==undefined)
          subsetsData={...subsetsData,[category]:{...subsetsData[category],[ss]:{...subsetsData[category][ss],[k]:{...subsetsData[category][ss][k],[y]:data1[k][y]}}}}
        })
        
      }
    })
  }
  
  /*getCategoriesGrandTotals(category,ssd)
  calculatePercentageOverGrandTotal(ssd[category][subset])
  console.log("ssdata77",ssd,data1)
  calculateMediaAndMediansOfRecords(category,ssd[category][subset])
  
  console.log("orderanswers",category,order,data1,otmChoices,firstCatNormalFields,subsets[category])
  //calculateSubsetContributions(ssd)
  //termina bloque

  printFinalTableNew(category,ssd,order[1][category])//,order[0])
  printGrandTotalsTrue(category,realGrandTotals1[category][subset],order[1][category])
  setPrintedTable(twoTables)
  setSubsetsData(ssd1)*/
  
}

const checkRule=(rulex,x,sameCategorySegment,field,type,conditionsWhere)=>{
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

const checkRuleHybrid=(rulex,x,index,conditionsWhere)=>{
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
