import gql from "graphql-tag"

const getManyToManyRelation=(parentCategory,sonCategory,categories,counters=[])=>{
  console.log("soncatfields",sonCategory.fields)
  let y=[...sonCategory.fields,
  ...getMiddleTable(parentCategory,sonCategory,categories)]
  console.log("yfijoyu",y)
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
    }/*else if(j.relationship=="manytomany"){
      console.log("counters",counters)
      const i=categories.filter(c=>c.id==j.relationCategory)[0]
      let u=counters.filter(c=>
        c.name==`mtm${sonCategory.name}${parentCategory.name}`)
      
      if(u.length>0){
        if(u[0].count>0){
          return ""
        }
        if(u[0].count==0){
          return getManyToManyRelation(sonCategory,i,categories,
            counters.map(c=>{
              if(c.name==`mtm${sonCategory.name}${parentCategory.name}`){
                return {name:c.name,count:c.count+1}
              }
              return c
            })
          )
        }
      }*/
    else if(j.dataType=="string" || j.dataType=="number" || j.dataType=="date")
      return j.name

    else if(j.relationship=="manytomany"){}
    
  })

  nc.push("id")
  console.log("nc88",nc)
  nc=`mtm${sonCategory.name}${parentCategory.name}{
    ${nc.join("\n")}
  }`
  return nc
}

const getOneToManyRelation=(parentCategory,sonCategory,categories)=>{
  let counters=[]
  let nc=sonCategory.fields.map(j=>{
    if(j.dataType=="queryCategory")
      return `${j.name}ProductQuery`
    else if(j.relationship=="onetomany"){
      const i=categories.filter(c=>c.id==j.relationCategory)[0]
      return getOneToManyRelation(sonCategory,i,categories)
    }else if(j.relationship=="manytomany"){
      const i=categories.filter(c=>c.id==j.relationCategory)[0]
      //counters=[...counters,{name:`mtm${i.name}${sonCategory}`,count:0}]
      return getManyToManyRelation(sonCategory,i,categories,counters)
    }

    else
      return j.name
  
  })
  nc.push("id")
  
  nc=`otm${parentCategory.name}${sonCategory.name}{
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
  return categories.filter(x=>x.name==name)[0].fields
  
}

export default (category,categories)=>{
  let args=[]
  let args1=[]
  let argsf=category.fields
  let counters=[]
  console.log("argsf",argsf)
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
  args.unshift("$id:Int")
  args=args.join(", ")
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
    }/*else{
      const rr=categories.filter(c=>c.id==argsf[f].relationCategory)[0]
      if(argsf[f].relationship=="manytomany"){
        counters=[...counters,{name:argsf[f].name,count:0}]
        console.log("counters44",counters)
        campos.push(getManyToManyRelation(category,rr,categories,counters))
        
      }else if(argsf[f].relationship=="onetomany"){
        campos.push(getOneToManyRelation(category,rr,categories))
      }

    }*/
  }
  //console.log("camposmi",campos)
  campos.unshift("id")
  campos=campos.join("\n")
  args1.unshift("id:$id")
  args1=args1.join(", ")
  let query=`
    mutation EditProducto(${args}){
      edit${category.name}(${args1}){
        ${campos}
        
      }
    }
  `
  console.log("querynormal5",query)
  query=gql`${query}`
  return query
}