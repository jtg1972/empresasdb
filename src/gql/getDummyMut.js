import gql from "graphql-tag"

export default (cat)=>{
  let argsf=cat.fields
  let args1=[]
  let ya
  for(let f in argsf){
    if(argsf[f].declaredType=="number"){
        args1.push(`$${argsf[f].name}:Int`)
    }if(argsf[f].declaredType=="string" 
    || argsf[f].declaredType=="date"
    || argsf[f].dataType=="multipleValue"){
      args1.push(`$${argsf[f].name}:String`)
    }
  
  }
  args1=args1.join(", ")

  let args2=[]
  for(let f in argsf){
    if(argsf[f].declaredType=="number"){
      args2.push(`${argsf[f].name}:$${argsf[f].name}`)
    }else if(argsf[f].declaredType=="string" 
    || argsf[f].declaredType=="date"
    || argsf[f].dataType=="multipleValue"){
      args2.push(`${argsf[f].name}:$${argsf[f].name}`)
    }
  }

  args2.join(", ")

  let campos=[]
  for(let f in argsf){
    if(argsf[f].declaredType=="number"){
      campos.push(`${argsf[f].name}`)
    }else if(argsf[f].declaredType=="string" || 
    argsf[f].declaredType=="date" || 
    argsf[f].dataType=="multipleValue"){
      campos.push(argsf[f].name)
    }
  }
  campos.unshift("id")
  campos=campos.join("\n")
  const query=`mutation GetDummyMtm(${args1}){
    create${cat.name}(${args2}){
      ${campos}
    }
  }`
  console.log("querygroup",query)
  return gql`${query}`
}
