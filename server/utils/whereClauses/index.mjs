import {Op} from 'sequelize'

const getFieldNameforQuery1=(field,type,oneSide,bothSides,catName,oneSideName)=>{
  let mtmName=""
  console.log("variabmain",catName,oneSideName)
  if(catName>oneSideName)
    mtmName=oneSideName+"_"+catName
  else 
    mtmName=catName+"_"+oneSideName
  for(let i=0;i<oneSide.length;i++){
    if(oneSide[i].name==field && oneSide[i].declaredType==type)
      return `${oneSideName}.${field}`
  }
  for(let i=0;i<bothSides.length;i++){
    if(bothSides[i].name==field && bothSides[i].declaredType==type)
      return `${oneSideName}.${mtmName}.${field}`
  }

}

const codifyRuleMtm=(conditionsWhere,cat,subVar)=>{
  //console.log("paramsmtm",conditionsWhere,cat,oneSide,bothSides,catName,osName)
  let rn=conditionsWhere[cat][subVar]["main"]["rule"]
  let cn=conditionsWhere[cat][subVar]["main"]["category"]
  let fn=conditionsWhere[cat][subVar]["main"]["field"]
  let detail={category:cn,field:fn,rule:rn}
  console.log("detail",detail,detail["category"])
  const rule=conditionsWhere?.[detail["category"]]?.[subVar]?.[detail?.["field"]][detail?.["rule"]]["rule"]
  let type=conditionsWhere?.[detail["category"]]?.[subVar]?.[detail?.["field"]]["type"]
  let field
  /*if(detail["field"]!="hybrid"){
    field=getFieldNameforQuery1(detail["field"],type,oneSide,bothSides,catName,osName)
    console.log("fieldrule",field)
  }el*/
    field=detail["field"]

  console.log("rulex",rule,conditionsWhere,detail,field,type)
  let res=[]
  console.log("Opesc",Op,Op.not)
  
  let test1=JSON.stringify(conditionsWhere)
  console.log("testi",test1,JSON.parse(test1))//test,test1,JSON.parse(test1))
  
  if(type=="hybrid"){
    res=parseHybrid(rule,field,conditionsWhere,subVar)
  }else if(type=="string"){
    res=parseString(rule,field,conditionsWhere)
  }else if(type=="number",field){
    res=parseNumber(rule,field,conditionsWhere)
  }else if(type=="date")
    res=parseDate(rule,field,conditionsWhere)
  //res="{"+res+"}"
  console.log("resfinal1",res)
  return res
}


const codifyRule=(conditionsWhere,cat)=>{  
  let rn=conditionsWhere[cat]["main"]["rule"]
  let cn=conditionsWhere[cat]["main"]["category"]
  let fn=conditionsWhere[cat]["main"]["field"]
  let detail={category:cn,field:fn,rule:rn}
  console.log("detail",detail,detail["category"])
  const rule=conditionsWhere?.[detail["category"]]?.[detail?.["field"]][detail?.["rule"]]["rule"]
  let field=detail["field"]
  let type=conditionsWhere?.[detail["category"]]?.[detail?.["field"]]["type"]
  console.log("rulex",rule,conditionsWhere,detail,field,type)
  let res=[]
  console.log("Opesc",Op,Op.not)
  
  let test1=JSON.stringify(conditionsWhere)
  console.log("testi",test1,JSON.parse(test1))//test,test1,JSON.parse(test1))
  
  if(type=="hybrid"){
    res=parseHybrid(rule,field,conditionsWhere)
  }else if(type=="string"){
    res=parseString(rule,field,conditionsWhere)
  }else if(type=="number",field){
    res=parseNumber(rule,field,conditionsWhere)
  }else if(type=="date")
    res=parseDate(rule,field,conditionsWhere)
  //res="{"+res+"}"
  console.log("resfinal1",res)
  return res
}

const parseHybrid=(rule,field,conditionsWhere,subVar="")=>{
  console.log("ruleparse",rule)
  let res=[]
  let type
  let nr
  for(let i=1;i<rule.length;i+=2){
    nr=conditionsWhere[rule[i]["category"]][rule[i]["field"]][rule[i]["rule"]]["rule"]
    type=conditionsWhere?.[rule[i]["category"]][rule[i]["field"]]["type"]
    if(type=="hybrid")
      if(i-1==0 && rule[0]=="not"){
        if(subVar=="")
          res.push({[Op.not]:[parseHybrid(nr,rule[1].field,conditionsWhere)]})
        else
          res.push({[Op.not]:[parseHybrid(nr,rule[1].field,conditionsWhere,subVar)]})

      }else{
        if(subVar=="")  
          res.push(parseHybrid(nr,rule[i].field,conditionsWhere))
        else
          res.push(parseHybrid(nr,rule[i].field,conditionsWhere,subVar))
      }

    else if(type=="string")
      if(i-1==0 && rule[0]=="not")
        res.push({[Op.not]:[parseString(nr,rule[1].field,conditionsWhere)]})
      else  
        res.push(parseString(nr,rule[i].field,conditionsWhere))
      
    else if(type=="number")
    if(i-1==0 && rule[0]=="not")
      res.push({[Op.not]:[parseNumber(nr,rule[1].field,conditionsWhere)]})
    else  
      res.push(parseNumber(nr,rule[i].field,conditionsWhere))
  }
  let opInd=0
  console.log("restotal",res)
  let resFinal={}
  if(rule.length>=3){
    for(let i=2;i<rule.length;i+=2){
      console.log("resopindj6",opInd,res[opInd],res[opInd+1])//
      if(Object.keys(resFinal).length==0){
        if(rule[i]=="and")
          resFinal={[Op.and]:[res[opInd],res[opInd+1]]}
        else if(rule[i]=="or")
          resFinal={[Op.or]:[res[opInd],res[opInd+1]]}
        else if(rule[i]=="and not")
          resFinal={[Op.and]:[res[opInd],{[Op.not]:[res[opInd+1]]}]}
        else if(rule[i]=="or not ")
          resFinal={[Op.or]:[res[opInd],{[Op.not]:[res[opInd+1]]}]}
      }else{
        if(rule[i]=="and")
          resFinal={[Op.and]:[resFinal,res[opInd]]}
        else if(rule[i]=="or")
          resFinal={[Op.or]:[resFinal,res[opInd]]}
        else if(rule[i]=="and not")
          resFinal={[Op.and]:[resFinal,{[Op.not]:[res[opInd]]}]}
        else if(rule[i]=="or not")
          resFinal={[Op.or]:[resFinal,{[Op.not]:[res[opInd]]}]}
      }
      if(i==2)
        opInd+=2
      else  
        opInd+=1
    }
  }else{
    resFinal=res[0]
  }
  return resFinal
}

const parseNumber=(rule,field,conditionsWhere)=>{
  console.log("parseString",rule)
  let res=[]
  let newOp
  for(let i=3;i<rule.length;i+=3){
    if(rule[i-2]=="=")
      newOp={[field]:{[Op.eq]:rule[i-1]}}
    else if(rule[i-2]==">")
      newOp={[field]:{[Op.gt]:rule[i-1]}}
    else if(rule[i-2]==">=")
      newOp={[field]:{[Op.gte]:rule[i-1]}}
    else if(rule[i-2]=="<")
      newOp={[field]:{[Op.lt]:rule[i-1]}}
    else if(rule[i-2]=="<=")
      newOp={[field]:{[Op.lte]:rule[i-1]}}
    else if(rule[i-2]=="!=")
      newOp={[field]:{[Op.ne]:rule[i-1]}}

    if(i==3 && rule[0]=="not"){
      res.push({[Op.not]:[newOp]})
    }else{
      res.push(newOp)
    }

  }
  let pos=rule.length-2
  if(rule[pos]=="=")
    newOp={[field]:{[Op.eq]:rule[pos+1]}}
  else if(rule[pos]==">")
    newOp={[field]:{[Op.gt]:rule[pos+1]}}
  else if(rule[pos]==">=")
    newOp={[field]:{[Op.gte]:rule[pos+1]}}
  else if(rule[pos]=="<")
    newOp={[field]:{[Op.lt]:rule[pos+1]}}
  else if(rule[pos]=="<=")
    newOp={[field]:{[Op.lte]:rule[pos+1]}}
  else if(rule[pos]=="!=")
    newOp={[field]:{[Op.ne]:rule[pos+1]}}
  res.push(newOp)
  let resFinal={}
  let it=0
  let opInd=0
  //for(let i=rule.length-3;i>2;i-=3){
  if(rule.length<=3){
    if(rule[1]=="=")
      newOp={[field]:{[Op.eq]:rule[2]}}
    else if(rule[1]==">")
      newOp={[field]:{[Op.gt]:rule[2]}}
    else if(rule[1]==">=")
      newOp={[field]:{[Op.gte]:rule[2]}}
    else if(rule[1]=="<")
      newOp={[field]:{[Op.lt]:rule[2]}}
    else if(rule[1]=="<=")
      newOp={[field]:{[Op.lte]:rule[2]}}
    else if(rule[1]=="!=")
      newOp={[field]:{[Op.ne]:rule[2]}}

    if(rule[0]=="not")
      resFinal={[Op.not]:[newOp]}
    else
      resFinal=newOp

  }else{
    for(let i=3;i<rule.length;i+=3){
      console.log("resopind",opInd)
      if(Object.keys(resFinal).length==0){
        if(rule[i]=="and")
          resFinal={[Op.and]:[res[opInd],res[opInd+1]]}
        else if(rule[i]=="or")
          resFinal={[Op.or]:[res[opInd],res[opInd+1]]}
        else if(rule[i]=="and not")
          resFinal={[Op.and]:[res[opInd],{[Op.not]:[res[opInd+1]]}]}
        else if(rule[i]=="or not")
          resFinal={[Op.or]:[res[opInd],{[Op.not]:[res[opInd+1]]}]}
      }else{
        if(rule[i]=="and")
          resFinal={[Op.and]:[resFinal,res[opInd]]}
        else if(rule[i]=="or")
          resFinal={[Op.or]:[resFinal,res[opInd]]}
        else if(rule[i]=="and not")
          resFinal={[Op.and]:[resFinal,{[Op.not]:[res[opInd]]}]}
        else if(rule[i]=="or not")
          resFinal={[Op.or]:[resFinal,{[Op.not]:[res[opInd]]}]}

      }
      if(i==3)
        opInd+=2
      else  
        opInd+=1
    }
  }
//resFinal="{"+resFinal+"}"
  console.log("resfinalexnumber",resFinal)
  return resFinal

}

const parseString=(rule,field,conditionsWhere)=>{
  console.log("parseString",rule)
  let res=[]
  let newOp
  for(let i=3;i<rule.length;i+=3){
    if(rule[i-2]=="starts with")
      newOp={[field]:{[Op.like]:rule[i-1]+"%"}}
    else if(rule[i-2]=="contains")
      newOp={[field]:{[Op.like]:"%"+rule[i-1]+"%"}}
    else if(rule[i-2]=="ends with")
      newOp={[field]:{[Op.like]:"%"+rule[i-1]}}
    else if(rule[i-2]=="between")
      newOp={[field]:{[Op.like]:"%"+rule[i-1]["initial"]+"%"+rule[i-1]["final"]+"%"}}
    if(i==3 && rule[0]=="not"){
      res.push({[Op.not]:[newOp]})
    }else{
      res.push(newOp)
    }

  }

  let pos=rule.length-2
  if(rule[pos]=="starts with")
    newOp={[field]:{[Op.like]:rule[pos+1]+"%"}}
  else if(rule[pos]=="contains")
    newOp={[field]:{[Op.like]:"%"+rule[pos+1]+"%"}}
  else if(rule[pos]=="ends with")
    newOp={[field]:{[Op.like]:"%"+rule[pos+1]}}
  else if(rule[pos]=="between")
    newOp={[field]:{[Op.like]:"%"+rule[pos+1]["initial"]+"%"+rule[pos+1]["final"]+"%"}}

  res.push(newOp)
  console.log("operands",res)
  let resFinal={}
  let it=0
  let opInd=0
  //for(let i=rule.length-3;i>2;i-=3){
  if(rule.length<=3){
    if(rule[1]=="starts with")
      newOp={[field]:{[Op.like]:rule[2]+"%"}}
    else if(rule[1]=="contains")
      newOp={[field]:{[Op.like]:"%"+rule[2]+"%"}}
    else if(rule[1]=="ends with")
      newOp={[field]:{[Op.like]:"%"+rule[2]}}
    else if(rule[1]=="between")
      newOp={[field]:{[Op.like]:"%"+rule[2]["initial"]+"%"+rule[2]["final"]+"%"}}
    if(rule[0]=="not")
      resFinal={[Op.not]:[newOp]}
    else
      resFinal=newOp
  }else{
    for(let i=3;i<rule.length;i+=3){
      console.log("resopind",opInd,res[opInd],res[opInd+1])
      if(Object.keys(resFinal).length==0){
        if(rule[i]=="and")
          resFinal={[Op.and]:[res[opInd],res[opInd+1]]}
        else if(rule[i]=="or")
          resFinal={[Op.or]:[res[opInd],res[opInd+1]]}
        else if(rule[i]=="and not")
          resFinal={[Op.and]:[res[opInd],{[Op.not]:[res[opInd+1]]}]}
        else if(rule[i]=="or not")
          resFinal={[Op.or]:[res[opInd],{[Op.not]:[res[opInd+1]]}]}
      }else{
        if(rule[i]=="and")
          resFinal={[Op.and]:[resFinal,res[opInd]]}
        else if(rule[i]=="or")
          resFinal={[Op.or]:[resFinal,res[opInd]]}
        else if(rule[i]=="and not")
          resFinal={[Op.and]:[resFinal,{[Op.not]:[res[opInd]]}]}
        else if(rule[i]=="or not")
          resFinal={[Op.or]:[resFinal,{[Op.not]:[res[opInd]]}]}
      }
      console.log("resit",resFinal)
      if(i==3)
        opInd+=2
      else  
        opInd+=1
    }
  }
  console.log("resfinalex",resFinal)
  return resFinal
}

const parseDate=(rule,field,conditionsWhere)=>{
  console.log("parseDate",rule)
 
  let res=[]
  let newOp
  for(let i=3;i<rule.length;i+=3){
    if(rule[i-2]=="=")
      newOp={[field]:{[Op.eq]:new Date(rule[i-1])}}
    else if(rule[i-2]==">")
      newOp={[field]:{[Op.gt]:new Date(rule[i-1])}}
    else if(rule[i-2]==">=")
      newOp={[field]:{[Op.gte]:new Date(rule[i-1])}}
    else if(rule[i-2]=="<")
      newOp={[field]:{[Op.lt]:new Date(rule[i-1])}}
    else if(rule[i-2]=="<=")
      newOp={[field]:{[Op.lte]:new Date(rule[i-1])}}
    else if(rule[i-2]=="!=")
      newOp={[field]:{[Op.ne]:new Date(rule[i-1])}}

    if(i==3 && rule[0]=="not"){
      res.push({[Op.not]:[newOp]})
    }else{
      res.push(newOp)
    }

  }
  let pos=rule.length-2
  if(rule[pos]=="=")
    newOp={[field]:{[Op.eq]:new Date(rule[pos+1])}}
  else if(rule[pos]==">")
    newOp={[field]:{[Op.gt]:new Date(rule[pos+1])}}
  else if(rule[pos]==">=")
    newOp={[field]:{[Op.gte]:new Date(rule[pos+1])}}
  else if(rule[pos]=="<")
    newOp={[field]:{[Op.lt]:new Date(rule[pos+1])}}
  else if(rule[pos]=="<=")
    newOp={[field]:{[Op.lte]:new Date(rule[pos+1])}}
  else if(rule[pos]=="!=")
    newOp={[field]:{[Op.ne]:new Date(rule[pos+1])}}
  res.push(newOp)
  let resFinal={}
  let it=0
  let opInd=0
  //for(let i=rule.length-3;i>2;i-=3){
  if(rule.length<=3){
    if(rule[1]=="=")
      newOp={[field]:{[Op.eq]:new Date(rule[2])}}
    else if(rule[1]==">")
      newOp={[field]:{[Op.gt]:new Date(rule[2])}}
    else if(rule[1]==">=")
      newOp={[field]:{[Op.gte]:new Date(rule[2])}}
    else if(rule[1]=="<")
      newOp={[field]:{[Op.lt]:new Date(rule[2])}}
    else if(rule[1]=="<=")
      newOp={[field]:{[Op.lte]:new Date(rule[2])}}
    else if(rule[1]=="!=")
      newOp={[field]:{[Op.ne]:new Date(rule[2])}}

    if(rule[0]=="not")
      resFinal={[Op.not]:[newOp]}
    else
      resFinal=newOp

  }else{
    for(let i=3;i<rule.length;i+=3){
      console.log("resopind",opInd)
      if(Object.keys(resFinal).length==0){
        if(rule[i]=="and")
          resFinal={[Op.and]:[res[opInd],res[opInd+1]]}
        else if(rule[i]=="or")
          resFinal={[Op.or]:[res[opInd],res[opInd+1]]}
        else if(rule[i]=="and not")
          resFinal={[Op.and]:[res[opInd],{[Op.not]:[res[opInd+1]]}]}
        else if(rule[i]=="or not")
          resFinal={[Op.or]:[res[opInd],{[Op.not]:[res[opInd+1]]}]}
      }else{
        if(rule[i]=="and")
          resFinal={[Op.and]:[resFinal,res[opInd]]}
        else if(rule[i]=="or")
          resFinal={[Op.or]:[resFinal,res[opInd]]}
        else if(rule[i]=="and not")
          resFinal={[Op.and]:[resFinal,{[Op.not]:[res[opInd]]}]}
        else if(rule[i]=="or not")
          resFinal={[Op.or]:[resFinal,{[Op.not]:[res[opInd]]}]}

      }
      if(i==3)
        opInd+=2
      else  
        opInd+=1
    }
  }
//resFinal="{"+resFinal+"}"
  console.log("resfinalexdate",resFinal)
  return resFinal

}

export default codifyRule
export {codifyRuleMtm}