import gql from "graphql-tag"
import { FcCamcorderPro } from "react-icons/fc"

const callGetFieldsCategory=(field,categories,checkBoxDataFields={})=>{
  let ui
  //console.log("fieldpo",field,checkBoxDataFields)
  const cat=categories.filter(c=>c.id==field.relationCategory)
let bd
  if(cat.length>0){
    bd=cat[0].fields.map(x=>{
      if((x.declaredType=="number" || x.declaredType=="string" || x.declaredType=="date") && x.dataType!="queryCategory")
        return x.name
      /*if(x.dataType=="queryCategory"){
        const desc=`\n${x.name}GlobalCatQuery\n 
          ${x.name}FinalCatQuery\n 
          ${x.name}ProductQuery`
        //return desc
        return `${x.name}ProductQuery`
      }else if(x.dataType!=="relationship"){
        return x.name
      }*/else if(x.dataType=="relationship"){
       // console.log("fieldespect",field.name,checkBoxDataFields,x.name)

        if(x.relationship=="onetomany"){
          console.log("otmfieldee",field.name,x.name,checkBoxDataFields?.[field.name]?.["otm"])

          if(checkBoxDataFields?.[field.name]?.["otm"]?.includes(x.name)){
            return `\n${x.name}{\n
              ${callGetFieldsCategory(x,categories,checkBoxDataFields)}
              
            }\n
            `
          }else
            return ""
        }else if(x.relationship=="manytomany"){
            
          const ny=categories.filter(c=>c.id==x.relationCategory)[0]
          let nn
          if(ny.name>cat[0].name)
            nn=`${cat[0].name}_${ny.name}`
          else
            nn=`${ny.name}_${cat[0].name}`
          ui=`mtm${ny.name}${cat[0].name}`
          if(checkBoxDataFields?.[field.name]?.["mtm"]?.includes(x.name)){
            let catm=categories.filter(c=>c.name==nn)[0]
            let newcamps=catm.fields.map(x=>{
              return x.name
            })
            let restcamps=ny.fields.map(x=>{
              if((x.declaredType=="number" || x.declaredType=="string")&& x.relationship!="otmdestiny")
                return x.name
              
            })
            restcamps.push("id")
            
            restcamps=[...restcamps,...newcamps].join("\n")
            return `mtm${ny.name}${cat[0].name}{\n
              ${newcamps.join("\n")}
              ${callGetFieldsCategory(x,categories,checkBoxDataFields)}
              
            }`
            //${restcamps}\n
          }else
            return ""
        
        }
      
      }

    })
    
    bd.unshift("id")
    bd=bd.join("\n")
    return bd
  }

}

const getQueryFromCategory=(p,categories,checkBoxDataFields)=>{
  let query=`mutation GetData($whereClauses:String,$sortClauses:String){`
  //console.log("productcats",productCategories)
  let fields
  //let q2=productCategories.map(p=>{
    fields=p.fields.map(x=>{
      if((x.declaredType=="number" || x.declaredType=="string" || x.declaredType=="date") && x.dataType!="queryCategory" && x.relationship!="otmdestiny")
        return x.name
      /*if(x.dataType=="queryCategory" && !x.startsWith("mtm")){
          const desc=`\n${x.name}GlobalCatQuery\n 
          ${x.name}FinalCatQuery\n 
          ${x.name}ProductQuery`
          //return desc
          return `${x.name}ProductQuery`
      }*/else if(x.dataType=="relationship"){
        const t1=categories.filter(t=>t.id==x.relationCategory)[0]
      
        if(x.relationship=="onetomany"){
          if(checkBoxDataFields?.[p?.name]?.["otm"]?.includes(x.name)){
            return `${x.name}{
              ${callGetFieldsCategory(x,categories,checkBoxDataFields)}
              sortClauses
              whereClauses
            }`
          }else
            return ""
          
        }else if(x.relationship=="manytomany"){
          const ar=`mtm${t1.name}${p.name}`
          let nn
          if(checkBoxDataFields?.[p.name]?.["mtm"]?.includes(x.name)){
            if(t1.name>p.name)
              nn=`${p.name}_${t1.name}`
            else
              nn=`${t1.name}_${p.name}`
            //ui=`mtm${ny.name}${cat[0].name}`
            let catm=categories.filter(c=>c.name==nn)[0]
            let newcamps=catm.fields.map(x=>{
              
              return x.name
            })
            newcamps.push(`id`)
            let clavePQ=-1
            let restcamps=t1.fields.map(x=>{
              if((x.declaredType=="string" || x.declaredType=="number"))//&& x.relationship!="otmdestiny")
                return `'${t1.name}.${x.name}'`
            })
            
            
              
            restcamps=[...newcamps,...restcamps].join("\n")
              
            return `mtm${t1.name}${p.name}{\n
              ${newcamps.join("\n")}
              ${callGetFieldsCategory(x,categories,checkBoxDataFields)}
              sortClauses
              whereClauses
            }`
            //${restcamps}\nkey
            
              
          }else
             return ""
        }
      }
      
    })
    fields.unshift("id")
    const q=`getData${p.name}(whereClauses:$whereClauses,sortClauses:$sortClauses){
      ${fields.length>0 && fields.join(`\n\t\t`)}
      sortClauses
      whereClauses
    }`
    //return q
  //})
  //q2=q2.join(`\n`)
  query+=q
  query+=`}`
  //console.log("queryprod44",query)
  return gql`${query}`
}




export default (category,categories,titleMutation,crec,copy,checkBoxDataFields,nameComp,mtmRel)=>{
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
  let newFields=categories.filter(x=>x.name==crec.name)[0].fields
  console.log("newfields",crec,newFields)
  for(let f in newFields){
    let x=newFields[f]
   // console.log("xpo",x)
    if(x.dataType=="relationship"){
      const t1=categories.filter(t=>t.id==x.relationCategory)[0]
      console.log("categorypo",nameComp,checkBoxDataFields)
      if(x.relationship=="onetomany"){
        if(checkBoxDataFields?.[nameComp]?.["otm"]?.includes(x.name)){
          campos.push(`${x.name}{
            ${callGetFieldsCategory(x,categories,checkBoxDataFields)}
            
            
          }`)
        }
        
      
    }else if(x.relationship=="manytomany"){
      //  console.log("entrouu")
        const ar=`mtm${t1.name}${category.name}`
        let nn
        console.log()
        if(checkBoxDataFields?.[nameComp]?.["mtm"]?.includes(x.name)){
          if(t1.name>category.name)
            nn=`${category.name}_${t1.name}`
          else
            nn=`${t1.name}_${category.name}`
        //  console.log("nnpop",nn,categories.filter(x=>x.name==category.name)[0])
          //ui=`mtm${ny.name}${cat[0].name}`
          let catm=categories.filter(c=>c.name==category.name)[0]
          let newcamps=catm.fields.map(x=>{
            
            return x.name
          })
          //newcamps.push(`id`)
          let clavePQ=-1
          let restcamps=t1.fields.map(x=>{
            if((x.declaredType=="string" || x.declaredType=="number")&& x.relationship!="otmdestiny")
              return x.name
          })
          
          
            
          restcamps=[...newcamps,...restcamps].join("\n")
            
          campos.push(`${x.name}{\n
            ${newcamps.join("\n")}
            ${callGetFieldsCategory(x,categories,checkBoxDataFields)}
            
          }`)
            
        }
   }
  }/*else if(x.declaredType=="number" ||
    x.declaredType=="string"){
      if(ya[x.name]!==true){
        campos.push(x.name)
      }
    }else
      campos.push(x.name)*/
 }
  campos=campos.join("\n")
  let campRelOrig=[]
 // console.log("crec",crec)
  crec?.["fields"]?.forEach(cr=>{
    if((cr.declaredType=="number" ||
    cr.declaredType=="string")){// && cr.relationship!="otmdestiny"){
      campRelOrig.push(`${cr.name}`)
    }
  })
  mtmRel.fields.forEach(x=>
    campRelOrig.push(x.name))
  campRelOrig.unshift("id")  
  campRelOrig=campRelOrig.join("\n")
  let campRelCopy=[]
  copy?.["fields"]?.forEach(cr=>{
    if((cr.declaredType=="number" ||
    cr.declaredType=="string") && cr.relationship!="otmdestiny"){
      campRelCopy.push(`${cr.name}`)
    }
  })
  campRelCopy.unshift("id")  
  campRelCopy=campRelCopy.join("\n")
  
  




  let query=""
    query=`mutation CreateMTMProduct(${args1}){
      ${titleMutation}(${args2}){
        
          ${campos}
          ${campRelOrig}
          key
          otherKey
        
      }
    }` 

 console.log("alertuio45",query)
  return gql`${query}`
}