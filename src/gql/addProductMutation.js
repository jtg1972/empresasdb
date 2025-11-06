import gql from "graphql-tag"

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

        if(x.relationship=="onetomany"){
          console.log("cbdfespec",checkBoxDataFields,field.name,x.name)

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
          console.log("cbdfespec",checkBoxDataFields,field.name,x.name)

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
              key
              otherKey
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


export default (category,categories,mtm,checkBoxDataFields,nameComp)=>{
  console.log("namecomp44",nameComp)
  let argsf=category?.["fields"]
  let args1=[]
  let ya={}
  for(let f in argsf){
    if(argsf[f].dataType=="queryCategory" && argsf[f].relationCategory!=null){
      args1.push(`$${argsf[f].name}GlobalCatQuery:Int`)
      args1.push(`$${argsf[f].name}FinalCatQuery:Int`)
      args1.push(`$${argsf[f].name}ProductQuery:Int`)
      
    }else if(argsf[f].declaredType=="number" && argsf[f]?.relationCategory!=null){
      //if(ya[argsf[f].name]!==undefined && ya[argsf[f].name]!==true){
        args1.push(`$${argsf[f].name}:Int`)
      //}
    }else if(argsf[f].declaredType=="string" 
    || argsf[f].declaredType=="date"
    || argsf[f].dataType=="multipleValue"){
      args1.push(`$${argsf[f].name}:String`)
    }else if(argsf[f].relationship=="otmdestiny"){
      args1.push(`$${argsf[f].name}:Int`)
    }
  }
  args1=args1.join(", ")
  let args2=[]
  for(let f in argsf){
    if(argsf[f].dataType=="queryCategory" && argsf[f].relationCategory!=null){
      args2.push(`${argsf[f].name}GlobalCatQuery:$${argsf[f].name}GlobalCatQuery`)
      args2.push(`${argsf[f].name}FinalCatQuery:$${argsf[f].name}FinalCatQuery`)
      args2.push(`${argsf[f].name}ProductQuery:$${argsf[f].name}ProductQuery`)
      
    }else if(argsf[f].declaredType=="number" && argsf[f]?.relationCategory!=null){
      
        args2.push(`${argsf[f].name}:$${argsf[f].name}`)
      
    }else if(argsf[f].declaredType=="string" 
    || argsf[f].declaredType=="date"
    || argsf[f].dataType=="multipleValue"){
      args2.push(`${argsf[f].name}:$${argsf[f].name}`)
    }
    else if(argsf[f].relationship=="otmdestiny"){
      args2.push(`${argsf[f].name}:$${argsf[f].name}`)
    }
  }
  args2.join(", ")
  let campos=[]
  //let newFields=categories.filter(x=>x.name==category.name)[0].fields
  for(let f in argsf){
    
    let x=argsf[f]
    //console.log("xpo",x)
    if(x.dataType=="relationship"){
      const t1=categories.filter(t=>t.id==x.relationCategory)[0]
     // console.log("categorypo",nameComp,checkBoxDataFields)
      if(x.relationship=="onetomany"){
        console.log("cbdfespec",checkBoxDataFields,nameComp,x.name)

        if(checkBoxDataFields?.[nameComp]?.["otm"]?.includes(x.name)){
          campos.push(`${x.name}{
            ${callGetFieldsCategory(x,categories,checkBoxDataFields)}
            
            
          }`)
        }
        
      }else if(x.relationship=="manytomany"){
        const ar=`mtm${t1.name}${category.name}`
        let nn
       console.log("cbdfespec",checkBoxDataFields,nameComp,x.name)
        if(checkBoxDataFields?.[nameComp]?.["mtm"]?.includes(x.name)){
          if(t1.name>category.name)
            nn=`${category.name}_${t1.name}`
          else
            nn=`${t1.name}_${category.name}`
          //console.log("nnpop",nn,categories.filter(x=>x.name==category.name)[0])
          //ui=`mtm${ny.name}${cat[0].name}`
          let catm=categories.filter(c=>c.name==nn)[0]
          let newcamps=catm.fields.map(x=>{
            
            return x.name
          })
          //newcamps.push(`id`)
          let clavePQ=-1
          let restcamps=t1.fields.map(x=>{
            if((x.declaredType=="string" || x.declaredType=="number") && x.relationship!="otmdestiny")
              return x.name
          })
          
          
            
          restcamps=[...newcamps,...restcamps].join("\n")
            
          campos.push(`${x.name}{\n
            ${newcamps.join("\n")}
            key
            otherKey
            
            ${callGetFieldsCategory(x,categories,checkBoxDataFields)}
            
          }`)
            
        }
   }
  }/*else if(argsf[f].dataType=="queryCategory"){
      campos.push(`${argsf[f].name}GlobalCatQuery`)
      campos.push(`${argsf[f].name}FinalCatQuery`)
      campos.push(`${argsf[f].name}ProductQuery`)      
      
    }else if(argsf[f].declaredType=="number"){
      
        campos.push(`${argsf[f].name}`)
      
    }*/else if((argsf[f].declaredType=="string" ||
    argsf[f].declaredType=="number") && argsf[f].relationCategory==null)
      campos.push(argsf[f].name)
  }
//if(!mtm){
    campos.unshift("id")  
  //}
  campos=campos.join("\n")
  const query=`mutation CreateProduct(${args1},$parentArg:String,$id:Int){
    create${category.name}(${args2},parentArg:$parentArg,id:$id){
      ${campos}
    }
  }`
  console.log("queryaddmut",query)
  return gql`${query}`
}