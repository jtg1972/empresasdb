import gql from "graphql-tag"

export default (category,categories,mtm)=>{
  let argsf=category?.["fields"]
  let args1=[]
  let ya={}
  for(let f in argsf){
    if(argsf[f].dataType=="queryCategory"){
      args1.push(`$${argsf[f].name}GlobalCatQuery:Int`)
      args1.push(`$${argsf[f].name}FinalCatQuery:Int`)
      args1.push(`$${argsf[f].name}ProductQuery:Int`)
      
    }else if(argsf[f].declaredType=="number"){
      //if(ya[argsf[f].name]!==undefined && ya[argsf[f].name]!==true){
        args1.push(`$${argsf[f].name}:Int`)
      //}
    }else if(argsf[f].declaredType=="string" 
    || argsf[f].declaredType=="date"
    || argsf[f].dataType=="multipleValue"){
      args1.push(`$${argsf[f].name}:String`)
    }
  }
  args1=args1.join(", ")
  let args2=[]
  for(let f in argsf){
    if(argsf[f].dataType=="queryCategory"){
      args2.push(`${argsf[f].name}GlobalCatQuery:$${argsf[f].name}GlobalCatQuery`)
      args2.push(`${argsf[f].name}FinalCatQuery:$${argsf[f].name}FinalCatQuery`)
      args2.push(`${argsf[f].name}ProductQuery:$${argsf[f].name}ProductQuery`)
      
    }else if(argsf[f].declaredType=="number"){
      
        args2.push(`${argsf[f].name}:$${argsf[f].name}`)
      
    }
    else if(argsf[f].dataType!=="relationship"){
      args2.push(`${argsf[f].name}:$${argsf[f].name}`)
    }
  }
  args2.join(", ")
  let campos=[]
  for(let f in argsf){
    if(argsf[f].dataType=="relationship"){
      if(argsf[f].relationship=="onetomany"){
        let oc=categories.filter(c=>c.id==argsf[f].relationCategory)
        let na=`otm${category.name}${oc[0].name}`
        campos.push(`${na}{id}`)
      }else if(argsf[f].relationship=="manytomany"){
        let oc=categories.filter(c=>c.id==argsf[f].relationCategory)
        let na=`mtm${oc[0].name}${category.name}`
        campos.push(`${na}{id}`)
      }
    }else if(argsf[f].dataType=="queryCategory"){
      campos.push(`${argsf[f].name}GlobalCatQuery`)
      campos.push(`${argsf[f].name}FinalCatQuery`)
      campos.push(`${argsf[f].name}ProductQuery`)      
      
    }else if(argsf[f].declaredType=="number"){
      
        campos.push(`${argsf[f].name}`)
      
    }else
      campos.push(argsf[f].name)
  }
  if(!mtm){
    campos.unshift("id")  
  }
  campos=campos.join("\n")
  const query=`mutation CreateProduct(${args1}){
    create${category.name}(${args2}){
      ${campos}
    }
  }`
  console.log("queryaddmut",query)
  return gql`${query}`
}