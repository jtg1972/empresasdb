import gql from "graphql-tag"
import { FcCamcorderPro } from "react-icons/fc"

export default (category,categories,titleMutation,crec,copy)=>{
  let argsf=category?.["fields"]
  let args1=[]
  let ya={}

  console.log("paramsentrance",category,categories,titleMutation,crec)
  for(let f in argsf){
    if(argsf[f].dataType=="queryCategory"){
      args1.push(`$${argsf[f].name}GlobalCatQuery:Int`)
      args1.push(`$${argsf[f].name}FinalCatQuery:Int`)
      args1.push(`$${argsf[f].name}ProductQuery:Int`)
      if(argsf[f].declaredType=="number")
        args1.push(`$${argsf[f].name}:Int`)
    }else if(argsf[f].declaredType=="number"){
      if(ya[argsf[f].name]!==true){
        args1.push(`$${argsf[f].name}:Int`)
      }
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
      if(argsf[f].declaredType=="number"){        
        if(ya[argsf[f].name]!==true){
          args2.push(`${argsf[f].name}:$${argsf[f].name}`)
        }
      }
    }else if(argsf[f].declaredType=="string" 
    || argsf[f].declaredType=="date" 
    || argsf[f].declaredType=="number" 
    || argsf[f].dataType=="multipleValue"){
      args2.push(`${argsf[f].name}:$${argsf[f].name}`)
    }    
  }
  args2.join(", ")
  let campos=[]
  for(let f in argsf){
    /*if(argsf[f].dataType=="relationship"){
      if(argsf[f].relationship=="onetomany"){
        let oc=categories.filter(c=>c.id==argsf[f].relationCategory)
        let na=`otm${category.name}${oc[0].name}`        
        campos.push(`${na}{id}`)      
      }else if(argsf[f].relationship=="manytomany"){
        let oc=categories.filter(c=>c.id==argsf[f].relationCategory)[0]
        let na=argsf[f].name
        let ncent=oc.fields(o=>o.name)
        let nmtm=category.fields(c=>c.name)
        ncent=[...ncent,...nmtm]
        ncent.push("id")
        ncent.join("\n")
        campos.push(`${na}{${ncent}}`)
      
      }
    }else if(argsf[f].dataType=="queryCategory" && argsf[f].declaredType!=="number"){
      campos.push(`${argsf[f].name}GlobalCatQuery`)
      campos.push(`${argsf[f].name}FinalCatQuery`)
      campos.push(`${argsf[f].name}ProductQuery`)
      ya={[argsf[f].name]:true}

    }else*/ if(argsf[f].declaredType=="number" ||
    argsf[f].declaredType=="string"){
      if(ya[argsf[f].name]!==true){
        campos.push(`${argsf[f].name}`)
      }
    }else
      campos.push(argsf[f].name)
  }
  campos=campos.join("\n")
  let campRelOrig=[]
  crec?.["fields"]?.forEach(cr=>{
    /*if(cr.dataType=="relationship"){
      if(cr.relationship=="onetomany"){
        let oc=categories.filter(c=>c.id==cr.relationCategory)
        let na=`${cr.name}`
        campos.push(`${na}{id}`)
      }else if(cr.relationship=="manytomany"){
        let oc=categories.filter(c=>c.id==cr.relationCategory)[0]        
        let na=cr.name        
        let ncent=oc.fields.map(o=>{
          if(o.dataType=="relationship"){
            if(o.relationship=="onetomany"){
              return `otm${o.name}{id}`
            }else if(o.relationship=="manytomany"){
              const ro=categories.filter(
                x=>x.id==o.relationCategory
              )[0]
              let nc=ro.fields.map(x=>{
                if(x.dataType=="relationship"){
                  return ""                  
                }else
                  return x.name
              })
              let ny=category?.["fields"]?.map(u=>u.name)
              if(ny!=undefined)
                nc=[...nc,...ny]
              nc.push("id")
              nc.join("\n")
              return `${o.name}{${nc}}`
            }
          }else{
            return o.name
          }
        })
        let nmtm=category?.["fields"]?.map(c=>c.name)
        if(nmtm!=undefined)
          ncent=[...ncent,...nmtm]
        ncent.push("id")
        ncent.join("\n")
        campos.push(`${na}{${ncent}}`)
      }
    }else*/ if((cr.declaredType=="number" ||
    cr.declaredType=="string") && cr.relationship!="otmdestiny"){
      campRelOrig.push(`${cr.name}`)
    }/*else if(cr.dataType=="queryCategory"){
      campRelOrig.push(`${cr.name}GlobalCatQuery`)
      campRelOrig.push(`${cr.name}FinalCatQuery`)
      campRelOrig.push(`${cr.name}ProductQuery`)
    }*/
    /*else
      campos.push(cr.name)*/
  })
  campRelOrig.unshift("id")  
  campRelOrig=campRelOrig.join("\n")
  let campRelCopy=[]
  copy?.["fields"]?.forEach(cr=>{
    if((cr.declaredType=="number" ||
    cr.declaredType=="string") && cr.relationship!="otmdestiny"){
      campRelCopy.push(`${cr.name}`)
    }/*else if(cr.dataType=="queryCategory"){
      campRelCopy.push(`${cr.name}GlobalCatQuery`)
      campRelCopy.push(`${cr.name}FinalCatQuery`)
      campRelCopy.push(`${cr.name}ProductQuery`)
    }*/
    /*else
      campos.push(cr.name)*/
  })
  campRelCopy.unshift("id")  
  campRelCopy=campRelCopy.join("\n")
  
  




  let query=""
  /*if(titleMutation=="createdatamtmscmateriassccarreras" ||
  titleMutation=="createdatamtmsccarrerasscmaterias"){*/
    query=`mutation CreateMTMProduct(${args1}){
      ${titleMutation}(${args2}){
        original{
          ${campos}
          ${campRelOrig}
          key
        }
        copy{
          ${campos}
          ${campRelCopy}
          key
        }
        
      }
    }` 
  /*}else{
    query=`mutation CreateMTMProduct(${args1}){
      ${titleMutation}(${args2}){
          ${campos}
          ${campRelOrig}
      }
      
    }`
  }*/

  console.log("alertuio45",query)
  return gql`${query}`
}