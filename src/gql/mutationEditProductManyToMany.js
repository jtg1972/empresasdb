import gql from "graphql-tag"

const getManyToManyRelation=(parentCategory,sonCategory,keyFields,categories,counters=[],nRc,f1)=>{
  let nkf=[]
  for(let u in keyFields){
    nkf=[...nkf,
      {name:u,dataType:"queryCategory",
        declaredType:"number"}
    ]
  }
  let y=[...nRc.fields,...nkf,
  ...parentCategory.fields]
  console.log("y34",y)
  const xr=parentCategory.name.split("_")
  let nn=f1
    
  console.log("soncatfields",y)
  let nc=y.map(j=>{
    if(j.dataType=="queryCategory" &&
    j.declaredType=="number"){
      return j.name
    }else if(j.dataType=="queryCategory"){
      return `${j.name}ProductQuery`
    /*else if(j.relationship=="onetomany"){
      const i=categories.filter(c=>c.id==j.relationCategory)[0]
      return getOneToManyRelation(sonCategory,i,categories)

    }*/
    }else if(j.relationship=="manytomany"){
      console.log("counters",counters)
      const i=categories.filter(c=>c.id==j.relationCategory)[0]
      let u=counters.filter(c=>
        c.name==nn)
      
      if(u.length>0){
        if(u[0].count>0){
          return ""
        }
        if(u[0].count==0){
          return getManyToManyRelation(parentCategory,i,keyFields,categories,
            counters.map(c=>{
              if(c.name==f1){
                return {name:c.name,count:c.count+1}
              }
              return c
            }),i,`mtm${i.name}${sonCategory.name}`
          )
        }
      }
    }else
      return j.name
    
  })
  nc.push("id")
  nc=`${f1}{
    ${nc.join("\n")}
  }`
  return nc
}

const getMiddleTable=(one,other,categories)=>{
  let name
  if(one.name>other.name)
    name=`${other.name}_${one.name}`
  else
    name=`${one.name}_${other.name}`
  const c=categories.filter(x=>x.name==name)[0]
  console.log("cc3",c)
  if(c)
    return c.fields
  
}




export default (category,keyFields,categories,nameMut,nRc)=>{
  let args=[]
  let args1=[]
  let argsf=category.fields
  for(let f in argsf){
    //console.log("ffff",f)
    if(argsf[f].declaredType=="number"){
      args.push(`$${argsf[f].name}:Int`)
    }else if(argsf[f].dataType=="queryCategory"){
      args.push(`$${argsf[f].name}GlobalCatQuery:Int`)
      args.push(`$${argsf[f].name}FinalCatQuery:Int`)
      args.push(`$${argsf[f].name}ProductQuery:Int`)
    }else if(argsf[f].declaredType=="string"){
      args.push(`$${argsf[f].name}:String`)
    }else if(argsf[f].declaredType=="date"){
      args.push(`$${argsf[f].name}:String`)
    
    }
  }
  //args.unshift("$id:Int")
  for(let k in keyFields){
    args.push(`$${k}:Int`)
  }
  
  args=args.join(", ")
  let counters=[]
  for(let f in argsf){
    if(argsf[f].dataType!=="relationship"){
      if(argsf[f].dataType=="queryCategory"){
        args1.push(`${argsf[f].name}GlobalCatQuery:$${argsf[f].name}GlobalCatQuery`)
        args1.push(`${argsf[f].name}FinalCatQuery:$${argsf[f].name}FinalCatQuery`)
        args1.push(`${argsf[f].name}ProductQuery:$${argsf[f].name}ProductQuery`)
      }else{
        args1.push(`${argsf[f].name}:$${argsf[f].name}`)
      }
    }
  }
  for(let k in keyFields){
    args1.push(`${k}:$${k}`)
  }
  let campos=[]
  
  for(let f in argsf){
    if(argsf[f].dataType!=="relationship"){
      if(argsf[f].dataType=="queryCategory"){
        campos.push(`${argsf[f].name}GlobalCatQuery`)
        campos.push(`${argsf[f].name}FinalCatQuery`)
        campos.push(`${argsf[f].name}ProductQuery`)
      }else{
        campos.push(argsf[f].name)
      }
    }
  }
      
  /*const rr=categories.filter(c=>c.id==nRc.id)[0]
  const nn=category.name
  const sp=nn.split("_")
  let f1
  let cat
  if(sp[1]==nRc.name){
    f1=`mtm${sp[0]}${sp[1]}`
    cat=categories.filter(c=>c.name==sp[0])[0]
  }else{
    f1=`mtm${sp[1]}${sp[0]}`
    cat=categories.filter(c=>c.name==sp[1])[0]
  }    
  counters=[...counters,{name:f1,count:0}]
  console.log("counters44",counters)
  //campos.push(getManyToManyRelation(category,cat,keyFields,categories,counters,cat,f1))
  */    
    
  
  for(let k in keyFields){
    campos.push(`${k}`)
  }
  
  campos.push("id")
  nRc.fields.forEach(t=>{
    if(t.declaredType=="number" || t.declaredType=="string"){
      campos.push(t.name)
    }
  })
  //console.log("camposmi",campos)
  //campos.unshift("id")
  campos=campos.join("\n")
  //args1.unshift("id:$id")
  args1=args1.join(", ")
  let query=`
    mutation EditProductoMtm(${args}){
      ${nameMut}(${args1}){
        ${campos}
      }
    }
  `
  console.log("querymtm",query)
  query=gql`${query}`
  return query
}
