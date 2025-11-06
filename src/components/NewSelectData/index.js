import { useMutation } from "@apollo/client"
import { checkDocument } from "@apollo/client/utilities"
import { GraphQLSpecifiedByDirective } from "graphql"
import gql from "graphql-tag"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { resultPath } from "../../gql/updatestatemtm/utils/getPath"
import FormButton from "../Forms/FormButton"
import GetDataFromInital from "../GetDataFromInitial.js"
import {Op} from 'sequelize'
//import { formatNamedParameters } from "sequelize/types/utils"
const callGetFieldsCategory=(field,categories,checkBoxDataFields={})=>{
  let ui
  const cat=categories.filter(c=>c.id==field.relationCategory)
let bd
  if(cat.length>0){
    bd=cat[0].fields.map(x=>{
      if(x.declaredType=="number")
        return x.name
      if(x.dataType=="queryCategory"){
        const desc=`\n${x.name}GlobalCatQuery\n 
          ${x.name}FinalCatQuery\n 
          ${x.name}ProductQuery`
        //return desc
        return `${x.name}ProductQuery`
      }else if(x.dataType!=="relationship"){
        return x.name
      }else if(x.dataType=="relationship"){
        
        if(x.relationship=="onetomany"){
          if(checkBoxDataFields?.[cat[0]?.name]?.["otm"]?.includes(x.name)){
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
          if(checkBoxDataFields?.[cat?.[0]?.name]?.["mtm"]?.includes(x.name)){
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

//console.log("fieldsnottodispay",fieldsNotToDisplay)


const getQueryFromCategory=(p,categories,checkBoxDataFields)=>{
  let query=`mutation GetData {`
  //console.log("productcats",productCategories)
  let fields
  //let q2=productCategories.map(p=>{
    fields=p.fields.map(x=>{
      if((x.declaredType=="number" || x.declaredType=="string" || x.declaredType=="date") && x.dataType!="queryCategory" && x.relationship!="otmdestiny")
        return x.name
      if(x.dataType=="queryCategory"){
          const desc=`\n${x.name}GlobalCatQuery\n 
          ${x.name}FinalCatQuery\n 
          ${x.name}ProductQuery`
          //return desc
          return `${x.name}ProductQuery`
      }else if(x.dataType=="relationship"){
        const t1=categories.filter(t=>t.id==x.relationCategory)[0]
      
        if(x.relationship=="onetomany"){
          if(checkBoxDataFields?.[p?.name]?.["otm"]?.includes(x.name)){
            return `${x.name}{
              ${callGetFieldsCategory(x,categories,checkBoxDataFields)}
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
            let clavePQ=-1
            let restcamps=t1.fields.map(x=>{
              if((x.declaredType=="string" || x.declaredType=="number")&& x.relationship!="otmdestiny")
                return x.name
            })
            restcamps.push("id")
              
            restcamps=[...newcamps,...restcamps].join("\n")
              
            return `mtm${t1.name}${p.name}{\n
              ${callGetFieldsCategory(x,categories,checkBoxDataFields)}
              
            }`
            //${restcamps}\nkey
            
              
          }else
             return ""
        }
      }
      
    })
    fields.unshift("id")
    const q=`getData${p.name}{
      ${fields.length>0 && fields.join(`\n\t\t`)}
    }`
    //return q
  //})
  //q2=q2.join(`\n`)
  //query+=q2
  query+=`}`
  console.log("queryprod44",query)
  return gql`${query}`
}

const mapToState=({categories})=>({
  currentCategory:categories.currentCategory,
  categories:categories.categories,
  categoryProducts:categories.categoryProducts
})


const NewSelectData=({
      toggleOpenWhereStatementNumberServerDialog,
      setOpenWhereStatementNumberServerDialog,
      WhereStatementDateNumberDialog,

      toggleOpenWhereStatementStringServerDialog,
      setOpenWhereStatementStringServerDialog,
      WhereStatementStringServerDialog,

      toggleOpenWhereStatementDateServerDialog,
      setOpenWhereStatementDateServerDialog,
      WhereStatementDateServerDialog,

      toggleOpenWhereStatementHybridServerDialog,
      varsHeadWhereStatementServer,
      setVarsHeadWhereStatementServer,
      
      toggleOpenWhereSelectMainServer,
      conditionsWhere,

      toggleOpenViewWhereStatementDateServerDialog,
      toggleOpenViewWhereStatementHybridServerDialog,
      toggleOpenViewWhereStatementNumberServerDialog,
      toggleOpenViewWhereStatementStringServerDialog,
      toggleOpenViewMainWhereConditionServerDialog,

      otmChoicesServerOrder,
      setOtmChoicesServerOrder,
      toggleOpenSortCriteriaServerDialog,
      sortRules,
      setSortRules,
      checkBoxFields,
      setCheckBoxFields,
      checkBoxDataFields,
      setCheckBoxDataFields,

      toggleEditProduct,
      toggleNewProduct,
      toggleFilter,
      searchProductsFilter,
      setDqIds,
      dqIds,
      updateCategories,
      setUpdateCategories,
      updateCategoriesIds,
      setUpdateCategoriesIds,
      parentRecord,
      setParentRecord,
      parentFields,
      setParentFields,
      childFields,
      setChildFields
})=>{

  useEffect(()=>{
    if(updateCategories[currentCategory.name]==undefined)
      setUpdateCategories({...updateCategories,[currentCategory.name]:[`getData${currentCategory.name}`]})
  })

  //toggleOpenSortCriteriaDialog({categoryName:field,otmChoicesSort:otmChoicesOrder[field],sortRules:sortRules,setSortRules:setSortRules})
  const {
    currentCategory,
    categories,
    //categoryProducts
  }=useSelector(mapToState)
  const [showQuery,setShowQuery]=useState(false)
  /*const [checkBoxFields,setCheckBoxFields]=useState({})//[currentCategory.name]:{checked:true,real:currentCategory.name}})
  const [checkBoxDataFields,setCheckBoxDataFields]=useState({})*/
  const [change,setChange]=useState(false)
  //const [updateCategories,setUpdateCategories]=useState({[currentCategory.name]:[currentCategory.name]})
  let categoryAlreadyDisplayed=[]
  let counter=0
  console.log("ccat",currentCategory)
  let otmCSOrder={}
  //const GET_PRODUCTS_FROM_CATEGORY=getQueryFromCategory(categories.filter(x=>x.name==currentCategory.name)[0],categories,checkBoxDataFields)
  /*const [getProducts]=useMutation(GET_PRODUCTS_FROM_CATEGORY,{
    update:(cache,{data})=>{
      console.log("datamtmboth:",data)
      dispatch(setCategoryProducts(data))
      
    }
  })*/
  console.log("otmcsorder",otmChoicesServerOrder)

  const displaySubcategory=(catId,field,routec,prName,relationshipType)=>{
    //console.log("routecoo",prName,relationshipType,field)
    let curCat=categories.filter(x=>x.id==catId)
    //gcbf=setCheckBoxFields
    //gcbdf=setCheckBoxFields
    
    let subVar=""
    //console.log("curcats",curCat)
    let nmtm
    if(curCat.length==1){
      let active=false
      
      let mc
      if(relationshipType=="manytomany"){
        if(prName>curCat[0].name)
          nmtm=`${curCat[0].name}_${prName}`
        else
          nmtm=`${prName}_${curCat[0].name}`
        mc=categories.filter(x=>x.name==nmtm)?.[0]

      }
      //console.log("mc",mc)
      let ocSingle
      let ocShare
      let newFields=[]
      let oc
      
      if(relationshipType=="manytomany"){
        newFields=[...curCat[0].fields,...mc.fields]
        
        ocSingle=ordenaCampos(curCat[0].fields,curCat[0].name)
        ocShare=ordenaCampos(mc.fields,mc.name)
        oc=[...ocSingle,...ocShare]
      }
      else{
        newFields=curCat[0].fields
        oc=ordenaCampos(newFields,curCat[0].name)
      }
      //console.log("oc",ocSingle,ocShare)
      
      return <p>
        {relationshipType!="manytomany" && <div><p style={{textDecoration:"underline"}}>
          <a onClick={e=>{
          e.preventDefault()
          toggleOpenWhereSelectMainServer({
            categoryName:field,
            fieldName:"hybrid",
            relationshipType
            
          })
          
          }
        }>Add main where condition</a></p>
        <p onClick={()=>toggleOpenViewMainWhereConditionServerDialog({categoryName:field,relationshipType})}></p>
        {(conditionsWhere[field]?.["main"]==undefined || typeof conditionsWhere[field]?.["main"]!=="object")?<p>none</p>:
      <p onClick={()=>toggleOpenViewMainWhereConditionServerDialog({categoryName:field,relationshipType})}>{conditionsWhere[field]?.["main"]?.["rule"]}</p>
      }
      
        
        <p><a style={{textDecoration:"underline"}}onClick={e=>{
          e.preventDefault()
          toggleOpenWhereStatementHybridServerDialog({categoryName:field,fieldName:"hybrid",relationshipType})
        }}>Add hybrid where condition</a><br/>
        {displayWhereClauses(field,"hybrid")}</p>
        
        <p><a style={{textDecoration:"underline"}}onClick={e=>{
          e.preventDefault()
          toggleOpenSortCriteriaServerDialog({categoryName:field,otmChoicesSort:otmChoicesServerOrder[field],sortRules:sortRules,setSortRules:setSortRules})
        }}>Add sort criteria</a><br/>
        </p>
        
        </div>}
        {
        oc.map((y,index)=>{
        let x=newFields.filter(p=>p.name==y)?.[0]
        let title=""
        let singles=[]
        let manys=[]
        if(index<ocSingle?.length && relationshipType=="manytomany"){
          subVar="single"
          singles.push(index)
          if(index==0)
            title=<p>Single Side
            <div><p style={{textDecoration:"underline"}}>
          <a onClick={e=>{
          e.preventDefault()
          toggleOpenWhereSelectMainServer({
            categoryName:field,
            fieldName:"hybrid",
            relationshipType,
            subVar:"single"
          })
          
          }
        }>Add main where condition</a></p>
        <p onClick={()=>toggleOpenViewMainWhereConditionServerDialog({categoryName:field,relationshipType,subVar:"single"})}></p>
        {(conditionsWhere?.[field]?.["single"]?.["main"]==undefined || typeof conditionsWhere[field]?.["single"]?.["main"]!=="object")?<p>none</p>:
      <p onClick={()=>toggleOpenViewMainWhereConditionServerDialog({categoryName:field,relationshipType,subVar:"single"})}>{conditionsWhere[field]?.["single"]?.["main"]?.["rule"]}</p>
      }
      
        
        <p><a style={{textDecoration:"underline"}}onClick={e=>{
          e.preventDefault()
          toggleOpenWhereStatementHybridServerDialog({categoryName:field,fielName:"hybrid",relationshipType,subVar:"single"})
        }}>Add hybrid where condition</a><br/>
        {displayWhereClauses(field,"hybrid",relationshipType,"single")}</p>
        
        <p><a style={{textDecoration:"underline"}}onClick={e=>{
          e.preventDefault()
          toggleOpenSortCriteriaServerDialog({categoryName:field,otmChoicesSort:otmChoicesServerOrder[field],sortRules:sortRules,setSortRules:setSortRules,subVar:"single",relationshipType:"manytomany"})
        }}>Add sort criteria</a><br/>
        </p>
        </div>
          </p>
   }else if(index>=ocSingle?.length && relationshipType=="manytomany"){
        subVar="shared"

        manys.push(index)
        if(index==ocSingle.length)
          title=<p>Shared data
            <div><p style={{textDecoration:"underline"}}>
          <a onClick={e=>{
          e.preventDefault()
          toggleOpenWhereSelectMainServer({
            categoryName:field,
            fieldName:"hybrid",
            relationshipType,
            subVar:"shared"
          })
          
          }
        }>Add main where condition</a></p>
        <p onClick={()=>toggleOpenViewMainWhereConditionServerDialog({categoryName:field,relationshipType,subVar:"shared"})}></p>
        {(conditionsWhere[field]?.["shared"]?.["main"]==undefined || typeof conditionsWhere[field]?.["shared"]["main"]!=="object")?<p>none</p>:
      <p onClick={()=>toggleOpenViewMainWhereConditionServerDialog({categoryName:field,relationshipType,subVar:"shared"})}>{conditionsWhere[field]?.["shared"]?.["main"]?.["rule"]}</p>
      }
      
        
        <p><a style={{textDecoration:"underline"}}onClick={e=>{
          e.preventDefault()
          toggleOpenWhereStatementHybridServerDialog({categoryName:field,fielName:"hybrid",relationshipType,subVar:"shared"})
        }}>Add hybrid where condition</a><br/>
        {displayWhereClauses(field,"hybrid",relationshipType,"shared")}</p>
        
 {/*<p><a style={{textDecoration:"underline"}}onClick={e=>{
          e.preventDefault()
          toggleOpenSortCriteriaServerDialog({categoryName:field,otmChoicesSort:otmChoicesServerOrder[field]["shared"],sortRules:sortRules,setSortRules:setSortRules,subVar:"shared",relationshipType:"manytomany"})
        }}>Add sort criteria</a><br/>
        </p>*/}
        </div>
          </p>
   }else
          title=""

        if(x.relationship=="onetomany" ||
         x.relationship=="manytomany"){
           
           let namej=`${x.name}${++counter}`
          //if(categoryAlreadyDisplayed.includes(x.name))
            //console.log("routecy",routec)
            let eg
          if(gcbf[namej]==undefined){
            gcbf[namej]={checked:false,real:x.name,routec:[]}
            gcbf[namej]["routec"]=[...routec["routec"],x.name]
            gcbf[namej]["checked"]=findCheckValue(x.name,namej,gcbf[namej]["routec"])
            
          }
          
          
          //deleteResto(x.name,namej)   

         
          
          return <p style={{color:!existegood(gcbf[namej],namej,gcbf)?"red":"white",marginLeft:"0px"}}>
            {title}
            {existegood(gcbf[namej],namej,gcbf) && <input type="checkbox" checked={gcbf[namej]["checked"]==true} 
            onChange={e=>{
              setCheckBoxState(namej,e,x.relationship,field,x.name,[...routec["routec"],x.name])
              let ucPending=updateCategories
            let mainCat
            mainCat=categories.filter(io=>
              io.id==x.relationCategory)[0].name
            if(e.target.checked){
              /*console.log("catmaincat",categories.filter(io=>
                io.id==x.relationCategory)[0].name,x.name)*/
              
              //console.log("maincat",x.name,mainCat)
              
              if(ucPending?.[mainCat]==undefined)
                ucPending={...ucPending,[mainCat]:[x.name]}
              else
                ucPending={...ucPending,[mainCat]:[...ucPending[mainCat],x.name]}
            }else
              ucPending={...ucPending,[mainCat]:[...ucPending[mainCat].filter(y=>y!=x.name)]}
            setUpdateCategories(ucPending)
            //console.log("ucpending",ucPending)
            }}/>} {x.name} ({x.relationship})
            {gcbf?.[namej]?.["checked"]} {namej} {gcbf[namej]["checked"]==true?<p style={{marginLeft:"17px"}}>{displaySubcategory(x.relationCategory,x.name,gcbf[namej],curCat[0].name,x.relationship)}</p>:""}
          </p>
        }
        else{
          
          return <p style={{marginLeft:"0px"}}>
           {((index==0 || index==ocSingle?.length) && title)}
            <input type="checkbox" onChange={e=>{
              setOtmChoicesServerOrder(p=>{
                //console.log("etarget",e.target.checked)
              if(relationshipType!="manytomany"){
                  if(e.target.checked==true){
                    if(p?.[field]==undefined)
                      p={...p,[field]:[]}
                    p={...p,[field]:[...p[field],{name:x.name,type:x.declaredType}]}
                  }else{
                    p[field]=p[field].filter(y=>y.name!=x.name)
                  }
                }else{
                  subVar=singles.includes(index)?"single":"shared"
                  let model
                  if(subVar=="single")
                    model=curCat[0].name
                  else
                    model=nmtm
                  if(e.target.checked==true){
                    if(p?.[field]==undefined)
                      p={...p,[field]:[]}
                    /*if(p[field][subVar]==undefined)
                      p[field]={...p[field],[subVar]:[]}*/
                    p={...p,[field]:[...p[field],{name:x.name,type:x.declaredType,model,grandModel:curCat[0].name}]}
                  }else{
                    p[field]=p[field].filter(y=>y.name!=x.name)
                  }
                }
                //console.log("pio",p)
                return p
              })
              setCheckBoxState(x.name,e,null,field,x.name)
            }}/> {x.name} ({x.declaredType}) {gcbdf?.[field]?.["fields"]?.includes(x.name) && <a style={{textDecoration:"underline"}} 
            onClick={(e)=>{
              e.preventDefault()
              
              if(x.declaredType=="number"){
                //console.log("singles",singles,index)
                toggleOpenWhereStatementNumberServerDialog({
                  categoryName:field,
                  fieldName:x.name,
                  relationshipType,
                  subVar:singles.includes(index)?"single":"shared"
                  
                })
              }else if(x.declaredType=="string"){
                toggleOpenWhereStatementStringServerDialog({
                  categoryName:field,
                  fieldName:x.name,
                  relationshipType,
                  subVar:singles.includes(index)?"single":"shared"
                  
                })
              }else if(x.declaredType=="date"){
                toggleOpenWhereStatementDateServerDialog({
                  categoryName:field,
                  fieldName:x.name,
                  relationshipType,
                  subVar:singles.includes(index)?"single":"shared"
                  
                })
              }
              
            }}>Add where clause</a>}
            {gcbdf?.[field]?.["fields"]?.includes(x.name) && displayWhereClauses(field,x.name,relationshipType,singles.includes(index)?"single":"shared")}
           
          </p>

      }
    })}
      
      </p>
    }
  }
  /*const displaySubcategory=(catId,field,routec)=>{
    console.log("routecoo",routec)
    let curCat=categories.filter(x=>x.id==catId)
    //gcbf=setCheckBoxFields
    //gcbdf=setCheckBoxFields
    console.log("curcats",curCat)
    if(curCat.length==1){
      let active=false
      ordenaCampos(curCat[0].fields,curCat[0].name)
      
      return <p>{curCat[0].fields.map(x=>{
        if(x.relationship=="onetomany" ||
         x.relationship=="manytomany"){
           
           let namej=`${x.name}${++counter}`
          //if(categoryAlreadyDisplayed.includes(x.name))
            console.log("routecy",routec)
            let eg
          if(gcbf[namej]==undefined){
            gcbf[namej]={checked:false,real:x.name,routec:[]}
            gcbf[namej]["routec"]=[...routec["routec"],x.name]
            gcbf[namej]["checked"]=findCheckValue(x.name,namej,gcbf[namej]["routec"])
            
          }
          
          
          //deleteResto(x.name,namej)   

         
          
          return <p style={{color:!existegood(gcbf[namej],namej,gcbf)?"red":"white",marginLeft:"10px"}}>

            {existegood(gcbf[namej],namej,gcbf) && <input type="checkbox" checked={gcbf[namej]["checked"]==true} onChange={e=>setCheckBoxState(namej,e,x.relationship,field,x.name,[...routec["routec"],x.name])}/>}
            {x.name}
            {gcbf?.[namej]?.["checked"]} {namej} {gcbf[namej]["checked"]==true?<p style={{marginLeft:"10px"}}>{displaySubcategory(x.relationCategory,x.name,gcbf[namej])}</p>:""}
          </p>
        }
        else
          return <p style={{marginLeft:"10px"}}>
            <input type="checkbox" onChange={e=>setCheckBoxState(x.name,e,null,field,x.name)}/>{x.name}</p>

      })}</p>
    }
  }*/
  let gcbf={}
  let gcbdf={}

  const findCheckValue=(cat,nuevo,route)=>{
    //console.log("paramscat",cat,nuevo,route)
    let k=Object.keys(gcbf).filter(x=>{
      if(gcbf[x].real==cat && x!=nuevo){
        for(let t=0;t<route.length;t++){
          if(route[t]!=gcbf?.[x]?.["routec"]?.[t])
            return false
        }
        return true
      }else
        return false
        
    })
    //console.log("catnuevo",k,cat,nuevo,gcbf)
    let res
    for(let i=0;i<k.length;i++){
      if(gcbf[k[i]].checked==true)
        return true
      else
        continue
    }
    return gcbf[nuevo]["checked"]
  }
  const existegood=(campo,name,gcbf)=>{
    
    let res=false
    let ke=Object.keys(gcbf)
    console.log("existegood",name,campo,gcbf)
    let camplimp=limpiaCategoria(name,campo["real"],campo["routec"])
    //console.log("camplimp",camplimp,name)
        
    checkIsTrue(camplimp,name)
    //console.log("examinact",gcbf,gcbdf)
    let l=Object.keys(gcbf)
    let k=l.filter(x=>{
      if(gcbf[x]["real"]==campo?.["real"] && gcbf?.[x]?.["checked"]==true && x!=name){
        return true
      }else
        return false
    })
    //console.log("kres",k.length)
    if(k.length>0)
      return false
    return true
          
    

  }

  const encuentraconsec=(cat,route)=>{
    let found=false
    //console.log("catroute",cat,route,gcbf)
    for(let x=0;x<Object.keys(gcbf).length-1;x++){
      //console.log("paraioio",gcbf,cat,gcbf[Object.keys(gcbf)[x]]["real"],gcbf[Object.keys(gcbf)[x]]["checked"])
      if(cat==gcbf[Object.keys(gcbf)[x]]["real"]){// && gcbf[Object.keys(gcbf)[x]]["checked"]==true){
        //console.log("paraioio1",gcbf,cat,gcbf[Object.keys(gcbf)[x]]["real"],gcbf[Object.keys(gcbf)[x]]["routec"])

        for(let y=0;y<gcbf[Object.keys(gcbf)[x]]["routec"].length;y++){
          if(route?.[y]!=gcbf[Object.keys(gcbf)[x]]["routec"][y]){
            found=false
            //console.log("foundoit",found)

            break
          }else 
            found=true
         // console.log("foundoit",found)
          
        }
        
        if(found)
          return Object.keys(gcbf)[x]
      
      }
      
    }
    return false
    
  }
  const uncheckedAllSons=(category,field,cbf,cbdf,type,simpleField,route)=>{
    
    //let ec=encuentraconsec(category)
    //console.log("enc89",field)
    //if(ec!=false){
    //console.log("enc89",ec)
    if(field!=false){
    gcbf={...gcbf,[field]:{...gcbf[field],real:simpleField,checked:false}}
    //console.log("unchecked",gcbf,category,field,simpleField,ec)

    if(type=="otm")
      gcbdf={...gcbdf,
        [category]:{...gcbdf[category],otm:[...gcbdf[category]["otm"].filter(x=>x!=simpleField)]}}
    else if(type=="mtm"){
      //console.log("fieldcb",field,category,gcbdf)
      gcbdf={...gcbdf,
        [category]:{...gcbdf[category],mtm:[...gcbdf[category]["mtm"].filter(x=>x!=simpleField)]}}
        
    }
    
    
   //delete cbf[field]
   //cbdf={...cbdf,
    //[category]:{...cbdf[category],mtm:[...cbdf[category]["mtm"].filter(x=>x!=field)]}}
    //console.log("gcbdfsimplefield",gcbdf,simpleField)
    gcbdf?.[simpleField]?.["otm"].forEach(x=>{
      //cbf={...cbf,[x]:false}
      //delete cbdf[x]
     //console.log("pivej",x)
      //cbf={...cbf,[x]:false}
      uncheckedAllSons(simpleField,encuentraconsec(x,[...route,x]),gcbf,gcbdf,"otm",x,[...route,x])
     //cbdf={...cbdf,[x]:{...cbdf[x],fields:[],otm:[]}}
      


    })
    
    gcbdf?.[simpleField]?.["mtm"].forEach(x=>{
     // console.log("pivej",x)

      //cbf={...cbf,[x]:false}
      //delete cbdf[x]
      uncheckedAllSons(simpleField,encuentraconsec(x,[...route,x]),gcbf,gcbdf,"mtm",x,[...route,x])
      //cbdf={...cbdf,[x]:{...cbdf[x],fields:[],otm:[],mtm:[]}}
    })
    gcbdf={...gcbdf,[simpleField]:{mtm:[],otm:[],fields:[]}}
    //cbdf[field]={mtm:[],otm:[],fields:[]}
    //if(cbdf?.[field])
      //delete gcbdf[field]
    //setCheckBoxFields(cbf)
    //setCheckBoxDataFields(cbdf)
    //}
    return [gcbf,gcbdf]
  }
  }

  const limpiaCategoria=(field,simpleField,route)=>{
    //console.log("paramslc",field,simpleField,route)
    let k=Object.keys(gcbf)
    return k.filter(x=>{
      if(gcbf[x]["real"]==simpleField && field!=x){
        for(let y=0;y<route.length;y++){
          if(gcbf?.[x]?.["routec"]?.[y]!=route[y])
            return false
          
        }
        return true

      }
      return false
    })
  }
  const checkIsTrue=(arr,f)=>{
    console.log("cist",arr,f,gcbf)
    let ver=true
    for(let x=0;x<arr.length;x++){
      
     // console.log("borrararr",arr[x],gcbf)   
      delete gcbf[arr[x]]
    }
    //gcbf[f]["checked"]=ver
    //console.log("cist",arr,f,gcbf)
    
  }

  /*setcheckbox(nombre_aleat,evento,relacion,padre,realnombre)
          displaycategory(relacion,nombrerealcampo,nombrealeatoriocampo)*/
          //setCheckBoxState(namej,e,x.relationship,field,x.name)
  const setCheckBoxState=(field,state,relationship,category,simpleField,route)=>{
    //gcbf=checkBoxFields
    //gcbdf=checkBoxDataFields
    let nkf
    //console.log("paramsver",field,state,relationship,category,simpleField)
    //console.log("statevalue",state.target.value,state,field)
    if(relationship=="onetomany" || relationship=="manytomany"){
      //existe(simpleField)
          //deleteResto(simpleField)
          //let camplimp=limpiaCategoria(field,simpleField,route)
    //console.log("camplimp",camplimp,field)
    //checkIsTrue(camplimp,field)
    gcbf={...gcbf,[field]:{...gcbf[field],routec:route,checked:state.target.checked,real:simpleField}}
    
    
          
         // console.log("fielduuu",gcbf,field,simpleField,category,state.target.checked)

        


      
    
      
      //console.log("veagcgf",gcbf)
      /*if(state.target.checked==false){
      let u=uncheckedAllSons(field,cbf,cbdf)
          cbdf=u[1]
         cbf=u[0]
      }*/
      //cbdf={...cbdf,[field]:{fields:[],mtm:[],otm:[]}}
    }
    if(gcbdf[category]==undefined)
      gcbdf={...gcbdf,[category]:{fields:[],mtm:[],otm:[]}}
    if(relationship=="manytomany"){
      if(state.target.checked==true)
        gcbdf={...gcbdf,
          [category]:{...gcbdf[category],mtm:[...gcbdf[category]["mtm"],simpleField]}}
      else{
        //cbdf={...cbdf,
          //[category]:{...cbdf[category],mtm:[...cbdf[category]["mtm"].filter(x=>x!=field)]}}
        let u=uncheckedAllSons(category,encuentraconsec(simpleField,route),gcbf,gcbdf,"mtm",simpleField,route)
        
          //cbdf=u[1]
         //cbf=u[0]
      }

    }else if(relationship=="onetomany"){
      if(state.target.checked==true)
        gcbdf={...gcbdf,
          [category]:{...gcbdf[category],otm:[...gcbdf[category]["otm"],simpleField]}}
      else{
        //gcbf=cbdf
        //gcbf=cbf
        //cbdf={...cbdf,
          //[category]:{...cbdf[category],otm:[...cbdf[category]["otm"].filter(x=>x!=field)]}}
          let u=uncheckedAllSons(category,encuentraconsec(simpleField,route),gcbf,gcbdf,"otm",simpleField,route)
          //cbdf=u[1]
         //cbf=u[0]
      
      }
    }
    else{
    if(state.target.checked==true){
     gcbdf={...gcbdf,
      [category]:{...gcbdf[category],fields:[...gcbdf[category]["fields"],field]}}
    }else{
      gcbdf={...gcbdf,
        [category]:{...gcbdf[category],fields:[...gcbdf[category]["fields"].filter(x=>x!=field)]}}
    }
  }
    
     
    //console.log("examina",gcbf,gcbdf)
    setChange(true)
    setCheckBoxFields(gcbf)
    setCheckBoxDataFields(gcbdf)
  }
  
  const existe=(cat)=>{
    Object.keys(gcbf).filter(yy=>{
      if(gcbf[yy]["real"]==cat){
        delete gcbf[yy]
        
        
      }
    })

  }
  const deleteResto=(cat,current)=>{
    let keys=Object.keys(gcbf)
    //console.log("catkey",keys,cat,gcbf)
    for(let i=0;i<keys.length;i++){
    //console.log("keysoopc",gcbf[Object.keys(gcbf)[i]]["real"],cat,gcbf[Object.keys(gcbf)[i]]["real"]==cat)
      if(gcbf[keys[i]]?.["real"]==cat && current!=keys[i])
        gcbf={...gcbf,[keys[i]]:{...gcbf[keys[i]],delete:true}}
      else
        gcbf={...gcbf,[keys[i]]:{...gcbf[keys[i]],delete:false}}
      
    }
    //console.log("borrarkeys",gcbf)
    let ngcbf={}
    for(let i=0;i<keys.length;i++){
      //console.log("keysoop",keys,cat,gcbf[Object.keys(gcbf)[i]]["real"])
      if(gcbf[Object.keys(gcbf)[i]]["delete"]==false){
        ngcbf[Object.keys(gcbf)[i]]=gcbf[Object.keys(gcbf)[i]]
        delete ngcbf[Object.keys(gcbf)[i]]["delete"]
      }
    }
    gcbf=ngcbf
    
    //console.log("regdel",gcbf)


  }

  const checkSiva=(nameField,nameRight)=>{
    if(gcbf[nameField]!==undefined && gcbf[nameField]["real"]==nameRight && gcbf[nameField]["checked"]==true)
      return true 
    return false
  }

  const ordenaCampos=(fields,cat)=>{
    let stringFields=[]
    let numericFields=[]
    let dateFields=[]
    let otmFields=[]
    let mtmFields=[]
    //console.log("fieldsoo",fields,cat)
    for(let x=0;x<fields.length;x++){
      let f=fields[x]
      if(f.declaredType=="string")
        stringFields.push(f.name)
      else if(f.declaredType=="number" && f.relationship!="otmdestiny" && f.dataType!="queryCategory")
        numericFields.push(f.name)
      else if(f.declaredType=="date")
        dateFields.push(f.name)
      else if(f.relationship=="onetomany")
        otmFields.push(f.name)
      else if(f.relationship=="manytomany")
        mtmFields.push(f.name)
    }
    stringFields=stringFields.sort((a,b)=>{
      if(a>b)
        return 1
      else 
        return -1
    })
    numericFields=numericFields.sort((a,b)=>{
      if(a>b)
        return 1
      else 
        return -1
    })
    dateFields=dateFields.sort((a,b)=>{
      if(a>b)
        return 1
      else 
        return -1
    })
    otmFields=otmFields.sort((a,b)=>{
      if(a>b)
        return 1
      else 
        return -1
    })
    mtmFields=mtmFields.sort((a,b)=>{
      if(a>b)
        return 1
      else 
        return -1
    })
    let cong=[...stringFields,...numericFields,...dateFields,...otmFields,...mtmFields]
   // console.log("camposgrupos",cat,cong)
    return cong
  }

  const displayWhereClauses=(cat,field,relationshipType,subVar)=>{
    let cc
   // console.log("paramswhere",cat,field,relationshipType,subVar)
    if(relationshipType!="manytomany")
      cc=conditionsWhere?.[cat]
    else{
     
        cc=conditionsWhere?.[cat]?.[subVar]
     
    }
   //console.log("cc",conditionsWhere)
    if(cc){
      let f=cc?.[field]
      if(f){
        let ord=Object.keys(f)
        ord=ord.sort((a,b)=>{
          if(a>b)
            return 1
          else
          return -1
        })
        return <div>
          {ord.map(x=>{
            if(typeof f[x]=="object")
              return<p><a onClick={(e)=>{
                e.preventDefault()
                let ruleexp
                if(relationshipType!="manytomany")
                  ruleexp=conditionsWhere[cat]?.[field]?.[x]?.["rule"]
                else{
                  ruleexp=conditionsWhere[cat]?.[subVar]?.[field]?.[x]?.["rule"]
                }
                if(f.type=="string"){
                  toggleOpenViewWhereStatementStringServerDialog(
                    //conditionsWhere[cat]?.[field]?.[x]?.["rule"],
                    ruleexp,
                    {
                    categoryName:cat,
                    fieldName:field
                  })
                }else if(f.type=="number")
                  toggleOpenViewWhereStatementNumberServerDialog(
                    //conditionsWhere[cat]?.[field]?.[x]?.["rule"],
                    ruleexp,
                    {
                    categoryName:cat,
                    fieldName:field
                  })
                else if(f.type=="date")
                  toggleOpenViewWhereStatementDateServerDialog(
                    //conditionsWhere[cat]?.[field]?.[x]?.["rule"],
                    ruleexp,
                    {
                    categoryName:cat,
                    fieldName:field
                  })
                else if(f.type=="hybrid")
                  toggleOpenViewWhereStatementHybridServerDialog(
                    //conditionsWhere[cat]?.[field]?.[x]?.["rule"],
                    ruleexp,
                    {
                    categoryName:cat,
                    fieldName:field
                  })
              }}>{f[x].name}</a></p>
            return ""
          })}
        </div>
      }
    }
  }
  const main=()=>{
    gcbf={}
    gcbdf={}
    //let ns=++counter
    gcbf=checkBoxFields
    gcbdf=checkBoxDataFields
    let oc=ordenaCampos(currentCategory.fields,currentCategory.name)
  return <div>
    <p style={{background:"black",color:"white",width:"auto",padding:"10px",marginBottom:"5px"}}>Select data</p>
    <p>{currentCategory.name}</p>
    <p style={{textDecoration:"none",marginLeft:"10px"}}>
      <a style={{textDecoration:"underline"}}onClick={e=>{
          e.preventDefault()
          toggleOpenWhereSelectMainServer({
            categoryName:currentCategory.name,
            
            
          })
          
          }
        }>Add main where condition</a>
        <p onClick={()=>toggleOpenViewMainWhereConditionServerDialog({categoryName:currentCategory.name})}></p>
        {(conditionsWhere[currentCategory.name]?.["main"]==undefined || typeof conditionsWhere[currentCategory.name]?.["main"]!=="object")?<p style={{textDecoration:"none"}}>none</p>:
        <p style={{textDecoration:"none"}}onClick={()=>toggleOpenViewMainWhereConditionServerDialog({categoryName:currentCategory.name})}>{conditionsWhere[currentCategory.name]?.["main"]?.["rule"]}</p>}
    </p>
    <p style={{marginLeft:"10px"}}><a style={{textDecoration:"underline"}} onClick={e=>{
      e.preventDefault()
      toggleOpenWhereStatementHybridServerDialog({categoryName:currentCategory.name,fielName:"hybrid"})
    }}>Add hybrid where condition</a><br/>
    {displayWhereClauses(currentCategory.name,"hybrid")}
    </p>
    <p><a style={{textDecoration:"underline",marginLeft:"10px"}}onClick={e=>{
          e.preventDefault()
          toggleOpenSortCriteriaServerDialog({categoryName:currentCategory.name,otmChoicesSort:otmChoicesServerOrder[currentCategory.name],sortRules:sortRules,setSortRules:setSortRules})
        }}>Add sort criteria</a><br/>
        </p>
    <p>{oc.map((y)=>{
      let x=currentCategory["fields"].filter(p=>p.name==y)?.[0]
      let active=false
      
      //let name=`${x.name}${++counter}`
      //if(gcbf[name]==undefined)
        //gcbf={[name]:{checked:false,real:x.name}}
      if(x.relationship=="onetomany" ||
      x.relationship=="manytomany"){
        
        let name=`${x.name}${++counter}`
        
        if(gcbf?.[name]?.["checked"]==true)
            active=false
          else  
            active=true
        categoryAlreadyDisplayed.push(x.name)
        let eg
        //let eg=existegood(gcbf[name],name,gcbf)
        if(gcbf[name]==undefined){
          gcbf={...gcbf,[name]:{checked:false,real:x.name,routec:[]}}
          gcbf[name]["routec"]=[currentCategory.name,x.name]
          gcbf[name]["checked"]=findCheckValue(x.name,name,gcbf[name]["routec"])
          //eg=existegood(gcbf[name],name,gcbf)
        }
        
       // console.log("routec",gcbf[name])
        //deleteResto(x.name,name)  
        
        
        return <p style={{marginLeft:"10px",color:!existegood(gcbf[name],name,gcbf)?"red":"white"}}>
          
          {existegood(gcbf[name],name,gcbf) && <input type="checkbox" checked={gcbf?.[name]?.["checked"]==true?true:false} onChange={e=>{
            setCheckBoxState(name,e,x.relationship,`${currentCategory.name}`,x.name,[currentCategory.name,x.name])
            let ucPending=updateCategories
            let mainCat
            mainCat=categories.filter(io=>
              io.id==x.relationCategory)[0].name
            if(e.target.checked){
              /*console.log("catmaincat",categories.filter(io=>
                io.id==x.relationCategory)[0].name,x.name)*/
              
              //console.log("maincat",x.name,mainCat)
              
              if(ucPending?.[mainCat]==undefined)
                ucPending={...ucPending,[mainCat]:[x.name]}
              else
                ucPending={...ucPending,[mainCat]:[...ucPending[mainCat],x.name]}
            }else
              ucPending={...ucPending,[mainCat]:[...ucPending[mainCat].filter(y=>y!=x.name)]}
            setUpdateCategories(ucPending)
            //console.log("ucpending",ucPending)
          }}/>} {x.name} ({x.relationship})
            
          {gcbf?.[name]?.["checked"]} {name}{gcbf?.[name]?.["checked"]==true && <p style={{marginLeft:"17px"}}>{displaySubcategory(x.relationCategory,x.name,gcbf[name],currentCategory.name,x.relationship)}</p>}
        </p>
      }else
        return <p style={{marginLeft:"10px"}}>
          <input type="checkbox" onChange={e=>{
            setOtmChoicesServerOrder(p=>{
              //console.log("etarget",e.target.checked)
              
                if(e.target.checked==true){
                  if(p?.[currentCategory.name]==undefined)
                    p={...p,[currentCategory.name]:[]}
                  p={...p,[currentCategory.name]:[...p[currentCategory.name],{name:x.name,type:x.declaredType}]}
                }else{
                  p[currentCategory.name]=p[currentCategory.name].filter(y=>y.name!=x.name)
                }
              
             // console.log("pio",p)
              return p
            })
            setCheckBoxState(x.name,e,null,`${currentCategory.name}`,x.name)
          }}/> {x.name} ({x.declaredType}) {gcbdf?.[currentCategory.name]?.["fields"]?.includes(x.name) && <a style={{textDecoration:"underline"}}
          onClick={(e)=>{
            e.preventDefault()
            if(x.declaredType=="number"){
        
              toggleOpenWhereStatementNumberServerDialog({
                categoryName:currentCategory.name,
                fieldName:x.name
                
              })
            }else if(x.declaredType=="string"){
              toggleOpenWhereStatementStringServerDialog({
                categoryName:currentCategory.name,
                fieldName:x.name
                
              })
            }else if(x.declaredType=="date"){
              toggleOpenWhereStatementDateServerDialog({
                categoryName:currentCategory.name,
                fieldName:x.name
                
              })
            }
            
          }}
          >Add where clause</a>}
          {displayWhereClauses(currentCategory.name,x.name)}</p>

    })}</p>
  </div>
    
}
  /*const main=()=>{
    gcbf={}
    gcbdf={}
    //let ns=++counter
    gcbf=checkBoxFields
    gcbdf=checkBoxDataFields
    ordenaCampos(currentCategory.fields,currentCategory.name)
  return <div>
    <p>Displaying categories</p>
    <p>{currentCategory.name}</p>
    <p>{currentCategory.fields.map((x)=>{
      let active=false
      //let name=`${x.name}${++counter}`
      //if(gcbf[name]==undefined)
        //gcbf={[name]:{checked:false,real:x.name}}
      if(x.relationship=="onetomany" ||
      x.relationship=="manytomany"){
        let name=`${x.name}${++counter}`
        
        if(gcbf?.[name]?.["checked"]==true)
            active=false
          else  
            active=true
        categoryAlreadyDisplayed.push(x.name)
        let eg
        //let eg=existegood(gcbf[name],name,gcbf)
        if(gcbf[name]==undefined){
          gcbf={...gcbf,[name]:{checked:false,real:x.name,routec:[]}}
          gcbf[name]["routec"]=[currentCategory.name,x.name]
          gcbf[name]["checked"]=findCheckValue(x.name,name,gcbf[name]["routec"])
          //eg=existegood(gcbf[name],name,gcbf)
        }
        
        console.log("routec",gcbf[name])
        //deleteResto(x.name,name)  
        
        
        return <p style={{marginLeft:"10px",color:!existegood(gcbf[name],name,gcbf)?"red":"white"}}>
          {existegood(gcbf[name],name,gcbf) && <input type="checkbox" checked={gcbf?.[name]?.["checked"]==true?true:false} onChange={e=>setCheckBoxState(name,e,x.relationship,`${currentCategory.name}`,x.name,[currentCategory.name,x.name])}/>} {x.name}
          {gcbf?.[name]?.["checked"]} {name}{gcbf?.[name]?.["checked"]==true && <p style={{marginLeft:"10px"}}>{displaySubcategory(x.relationCategory,x.name,gcbf[name])}</p>}
        </p>
      }else
        return <p style={{marginLeft:"10px"}}>
          <input type="checkbox" onChange={e=>setCheckBoxState(x.name,e,null,`${currentCategory.name}`,x.name)}/>{x.name}</p>

    })}</p>
  </div>
    
}*/
const checkIfSomething=()=>{
  if(checkBoxDataFields?.[currentCategory.name]?.["fields"]?.length>0 ||
  checkBoxDataFields?.[currentCategory.name]?.["mtm"]?.length>0 ||
  checkBoxDataFields?.[currentCategory.name]?.["otm"]?.length>0 
  )
    return true
  else
    return false
}
const codifyRule2=(detail,rule)=>{
  let res=""
  let res1=[]
  let res2=[]
  let op1=""
  let op2=""
 // console.log("paramesp",detail)
  /*for(let i=0;i<detai.length;i+=1){
    if(i%2==1){
      //let rule=detail[i+1]
      let espRule=conditionsWhere[rule["category"]][rule["field"]][rule["rule"]]["rule"]
      if(rule["field"]!="hybrid"){
        if(i==1)
          res1.push(`{where:${detail["rule"][i-1]}${detail["rule"][i]}${detail["rule"][i+1]}`)
        else{
          res1.push(`{where:${detail["rule"][i+1]}${detail["rule"][1]}${detail["rule"][i+2]}`)
        }
      }else{
        let ruley=conditionsWhere?.[detail["category"]]?.[detail?.["field"]][detail?.["rule"]]["rule"]
        //res1.push(codifyRule2(espRule))
      }
      
    }
  


  }*/
  return res1.join("\n")
}

const parseHybrid=(rule,field)=>{
  console.log("ruleparse",rule)
  let res=[]
  let type
  let nr
  for(let i=1;i<rule.length;i+=2){
    
      nr=conditionsWhere[rule[i]["category"]][rule[i]["field"]][rule[i]["rule"]]["rule"]
      type=conditionsWhere?.[rule[i]["category"]][rule[i]["field"]]["type"]

      if(type=="hybrid")
        if(i-1==0 && rule[0]=="not")
          res.push(`${Op.not}:{${parseHybrid(nr)}}`)
        else  
          res.push(parseHybrid(nr))

      else if(type=="string")
        if(i-1==0 && rule[0]=="not")
          res.push(`${Op.not}:{${parseString(nr,rule[i].field)}}`)
        else  
          res.push(parseString(nr,rule[i].field))
        
      else if(type=="number")
      if(i-1==0 && rule[0]=="not")
        res.push(`${Op.not}:{${parseNumber(nr,rule[i].field)}}`)
      else  
        res.push(parseNumber(nr,rule[i].field))
    
    
  }
  let opInd=0
 // console.log("restotal",res)
  let resFinal=""
  for(let i=2;i<rule.length;i+=2){
   // console.log("resopindj6",opInd,res[opInd],res[opInd+1])//
    if(resFinal==""){
      /*if(rule[i]=="not")
        resFinal=`[Op.Not]:[{${res[opInd]}}]`*/
      if(rule[i]=="and")
        resFinal=`${Op.and}:[{${res[opInd]}},{${res[opInd+1]}}]`
      else if(rule[i]=="or")
        resFinal=`${Op.or}:[{${res[opInd]}},{${res[opInd+1]}}]`
      else if(rule[i]=="and not")
        resFinal=`${Op.and}:[{${res[opInd]}},{${Op.not}:[{${res[opInd+1]}}]}]`
      else if(rule[i]=="or not ")
        resFinal=`${Op.or}:[{${res[opInd]}},{${Op.not}:[{${res[opInd+1]}}]}]`
    }else{
      if(rule[i]=="and")
        resFinal=`[Op.and]:[{${resFinal}},{${res[opInd]}}]`
      else if(rule[i]=="or")
        resFinal=`[Op.or]:[{${resFinal}},{${res[opInd]}}]`
      else if(rule[i]=="and not")
       resFinal=`[Op.and]:[{${resFinal}},{[Op.not]:[{${res[opInd]}}]}]`
      else if(rule[i]=="or not")
       resFinal=`[Op.or]:[{${resFinal}},{[Op.not]:[{${res[opInd]}}]}]`
    }
    if(i==2)
      opInd+=2
    else  
      opInd+=1
  }

  return resFinal
}
const parseNumber=(rule,field)=>{
  console.log("parseString",rule)
  let res=[]
  let newOp
  for(let i=3;i<rule.length;i+=3){
    if(rule[i-2]=="=")
      newOp=`\"${field}\":{${Op.eq}:${rule[i-1]}}`
    else if(rule[i-2]==">")
      newOp=`\"${field}\":{${Op.gt}:${rule[i-1]}}`
    else if(rule[i-2]==">=")
      newOp=`\"${field}\":{${Op.gte}:${rule[i-1]}}`
    else if(rule[i-2]=="<")
      newOp=`\"${field}\":{${Op.lt}:${rule[i-1]}}`
    else if(rule[i-2]=="<=")
      newOp=`\"${field}\":{${Op.lte}:${rule[i-1]}}`
    else if(rule[i-2]=="!=")
      newOp=`\"${field}\":{${Op.ne}:${rule[i-1]}}`

    if(i==3 && rule[0]=="not"){
      res.push(`${Op.not}:${newOp}`)
    }else{
      res.push(`${newOp}`)
    }

  }
  let pos=rule.length-2
  if(rule[pos]=="=")
      newOp=`\"${field}\":{${Op.eq}:${rule[pos+1]}}`
    else if(rule[pos]==">")
      newOp=`\"${field}\":{${Op.gt}:${rule[pos+1]}}`
    else if(rule[pos]==">=")
      newOp=`\"${field}\":{${Op.gte}:${rule[pos+1]}}`
    else if(rule[pos]=="<")
      newOp=`\"${field}\":{${Op.lt}:${rule[pos+1]}}`
    else if(rule[pos]=="<=")
      newOp=`\"${field}\":{${Op.lte}:${rule[pos+1]}}`
    else if(rule[pos]=="!=")
      newOp=`\"${field}\":{${Op.ne}:${rule[pos+1]}}`


  res.push(`${newOp}`)
  let resFinal=""
  let it=0
  let opInd=0
  //for(let i=rule.length-3;i>2;i-=3){
  if(rule.length<=3){
    if(rule[1]=="=")
      newOp=`\"${field}\":{${Op.eq}:${rule[2]}}`
    else if(rule[1]==">")
      newOp=`\"${field}\":{${Op.gt}:${rule[2]}}`
    else if(rule[1]==">=")
      newOp=`\"${field}\":{${Op.gte}:${rule[2]}}`
    else if(rule[1]=="<")
      newOp=`\"${field}\":{${Op.lt}:${rule[2]}}`
    else if(rule[1]=="<=")
      newOp=`\"${field}\":{${Op.lte}:${rule[2]}}`
    else if(rule[1]=="!=")
      newOp=`\"${field}\":{${Op.ne}:${rule[2]}}`

    if(rule[0]=="not")
      resFinal=`${Op.not}:[{${newOp}]`
    else
      resFinal=newOp
  
  }else{
    for(let i=3;i<rule.length;i+=3){
     //console.log("resopind",opInd)
      
      if(resFinal==""){
        if(rule[i]=="and")
          resFinal=`${Op.and}:[{${res[opInd]}},{${res[opInd+1]}}]`
        else if(rule[i]=="or")
          resFinal=`${Op.or}:[{${res[opInd]}},{${res[opInd+1]}}]`
        else if(rule[i]=="and not")
          resFinal=`${Op.and}:[{${res[opInd]}},{${Op.not}:[{${res[opInd+1]}}]}]`
        else if(rule[i]=="or not")
          resFinal=`${Op.or}:[{${res[opInd]}},{${Op.not}:[{${res[opInd+1]}}]}]`


      }else{
        if(rule[i]=="and")
          resFinal=`${Op.and}:[{${resFinal}},{${res[opInd]}}]`
        else if(rule[i]=="or")
          resFinal=`${Op.or}:[{${resFinal}},{${res[opInd]}}]`
        else if(rule[i]=="and not")
          resFinal=`${Op.and}:[{${resFinal}},{${Op.not}:[{${res[opInd]}}]}]`
        else if(rule[i]=="or not")
          resFinal=`${Op.or}:[{${resFinal}},{${Op.not}:[{${res[opInd]}}]}]`

      }
      if(i==3)
        opInd+=2
      else  
        opInd+=1
    }
  }
  //resFinal="{"+resFinal+"}"
  //console.log("resfinalexnumber",resFinal)


  return resFinal

}

const parseString=(rule,field)=>{
  console.log("parseString",rule)
  let res=[]
  let newOp
  for(let i=3;i<rule.length;i+=3){
    if(rule[i-2]=="starts with")
      newOp=`\"${field}\":{[${Op.like}]:\"${rule[i-1]}%\"}`
    else if(rule[i-2]=="contains")
      newOp=`\"${field}\":{[${Op.like}]:\"%${rule[i-1]}%\"}`
    else if(rule[i-2]=="ends with")
      newOp=`\"${field}\":{[${Op.like}]:\"%${rule[i-1]}\"}`
    else if(rule[i-2]=="between")
      newOp=`\"${field}\":{[${Op.like}]:\"%${rule[i-1]["initial"]}%${rule[i-1]["final"]}%\"}`
    if(i==3 && rule[0]=="not"){
      res.push(`[${Op.not}]:${newOp}`)
    }else{
      res.push(`${newOp}`)
    }

  }
  let pos=rule.length-2
  if(rule[pos]=="starts with")
    newOp=`\"${field}\":{[${Op.like}]:\"${rule[pos+1]}%\"}`
    else if(rule[pos]=="contains")
    newOp=`\"${field}\":{[${Op.like}]:\"%${rule[pos+1]}%\"}`
  else if(rule[pos]=="ends with")
    newOp=`\"${field}\":{[${Op.like}]:\"%${rule[pos+1]}\"}`
  else if(rule[pos]=="between")
    newOp=`\"${field}\":{[${Op.like}]:\"%${rule[pos+1]["initial"]}%${rule[pos+1]["final"]}%\"}`
  
  res.push(`${newOp}`)
  let resFinal=""
  let it=0
  let opInd=0
  //for(let i=rule.length-3;i>2;i-=3){
  if(rule.length<=3){
    if(rule[1]=="starts with")
      newOp=`\"${field}\":{[${Op.like}]:\"${rule[2]}%\"}`
    else if(rule[1]=="contains")
      newOp=`\"${field}\":{[${Op.like}]:\"%${rule[2]}%\"}`
    else if(rule[1]=="ends with")
      newOp=`\"${field}\":{[${Op.like}]:\"%${rule[2]}\"}`
    else if(rule[1]=="between")
      newOp=`\"${field}\":{[${Op.like}]:\"%${rule[2]["initial"]}%${rule[2]["final"]}%\"}`
  
    if(rule[0]=="not")
      resFinal=`${Op.not}:[{${newOp}]`
    else
      resFinal=newOp
  
  }else{
    for(let i=3;i<rule.length;i+=3){
      //console.log("resopind",opInd)
      
      if(resFinal==""){
        if(rule[i]=="and")
          resFinal=`[${Op.and}]:[{${res[opInd]}},{${res[opInd+1]}}]`
        else if(rule[i]=="or")
          resFinal=`[${Op.or}]:[{${res[opInd]}},{${res[opInd+1]}}]`
        else if(rule[i]=="and not")
          resFinal=`[${Op.and}]:[{${res[opInd]}},{[${Op.not}]:[{${res[opInd+1]}}]}]`
        else if(rule[i]=="or not")
          resFinal=`[${Op.or}]:[{${res[opInd]}},{[${Op.not}]:[{${res[opInd+1]}}]}]`


      }else{
        if(rule[i]=="and")
          resFinal=`[${Op.and}]:[{${resFinal}},{${res[opInd]}}]`
        else if(rule[i]=="or")
          resFinal=`[${Op.or}]:[{${resFinal}},{${res[opInd]}}]`
        else if(rule[i]=="and not")
          resFinal=`[${Op.and}]:[{${resFinal}},{[${Op.not}]:[{${res[opInd]}}]}]`
        else if(rule[i]=="or not")
          resFinal=`[${Op.or}]:[{${resFinal}},{[${Op.not}]:[{${res[opInd]}}]}]`

      }
      if(i==3)
        opInd+=2
      else  
        opInd+=1
    }
  }
  //resFinal="{"+resFinal+"}"
  //console.log("resfinalex",resFinal)


  return resFinal

}
const parseDate=(rule)=>{
 // console.log("parseDate",rule)
  return "parseDate"
}

const andSymbol=Op.and
const opLike=Op.like
  
let test={[andSymbol]:[{area:{[opLike]:"%a1"}},{area:{[opLike]:"%a1"}}]}

const codifyRule=(cat,detail,)=>{
 // console.log("typei",detail)
  //console.log("detail",detail,detail["category"])
  const rule=conditionsWhere?.[detail["category"]]?.[detail?.["field"]][detail?.["rule"]]["rule"]
  let field=detail["field"]
  let type=conditionsWhere?.[detail["category"]]?.[detail?.["field"]]["type"]
 // console.log("rulex",rule,conditionsWhere,detail,field,type)
  let res=[]
 // console.log("Opesc",Op,Op.not)
  
  let test1=JSON.stringify(conditionsWhere)
 // console.log("testi",test1,JSON.parse(test1))//test,test1,JSON.parse(test1))
  if(type=="hybrid"){
    res=parseHybrid(rule,field)
  }else if(type=="string"){
    res=parseString(rule,field)
  }else if(type=="number",field){
    res=parseNumber(rule,field)
  }else if(type=="date")
    res=parseDate(rule,field)
    res="{"+res+"}"
   // console.log("resfinal1",res)/*
  
  /*for(let i=0;i<rule.length;i+=1){
    if(i%2==1){
      //if(rule[i+1]=="or"){
        console.log("paramjorge",conditionsWhere[rule[i]["category"]][rule[i]["field"]][rule[i]["rule"]],rule[i])
        res.push(codifyRule2(conditionsWhere[rule[i]["category"]][rule[i]["field"]][rule[i]["rule"]],rule[i]))
        
        //res.push(codifyRule2(conditionsWhere[detail["category"]][rule[i+1]["field"]][rule[i+1]["rule"]]["rule"]))
      //}
      //else if(rule[i]=="and"){
      //res.push(codifyRule2(conditionsWhere[detail["category"]][rule[i]["field"]][rule[i]["rule"]]["rule"]))
      //res.push(codifyRule2(conditionsWhere[detail["category"]][rule[i+1]["field"]][rule[i+1]["rule"]]["rule"]))
      //}
 
    }
  }*/
  return res
}

const symbolReplacer=(key,value)=>{
  if(typeof key=="symbol")
    return `Symbol(${key.description})`
  return value
}

const jsonString=JSON.stringify(test,function(key,value){
  if(typeof value=="object" && value!=null){
    const newObject={}
    for(const prop in value){
      newObject[prop]=value[prop]
    }
    for(const sym of Object.getOwnPropertySymbols(value)){
      newObject[`Symbol(${sym.description})`]=value[sym]
    }
    return newObject
  }
  return value
})

const codifyRules=()=>{
  let k=[]
  Object.keys(conditionsWhere).forEach(x=>{
    if(typeof conditionsWhere[x]["main"]=="object")
      k.push(conditionsWhere[x]["main"])
    
  })
  let r=Object.keys(k).map(o=>{
    return codifyRule(o,k[o])
  })
 // console.log("codify",k,r)
}

return <div>
  {main()}
  {checkIfSomething() && change && <FormButton style={{padding:"10px",marginTop:"15px",width:"auto",background:"white",color:"black"}}
  onClick={()=>{
    //codifyRules()
    setShowQuery(true)
    setChange(false)
    }
  }>Get Data</FormButton>}
  {showQuery && !change && <GetDataFromInital
    checkBoxDataFields={checkBoxDataFields}
    conditionsWhere={conditionsWhere}
    sortClauses={sortRules}

    toggleEditProduct={toggleEditProduct}
      toggleNewProduct={toggleNewProduct}
      toggleFilter={toggleFilter}
      searchProductsFilter={searchProductsFilter}
      setDqIds={setDqIds}
      dqIds={dqIds}
      updateCategories={updateCategories}
      updateCategoriesIds={updateCategoriesIds}
      setUpdateCategoriesIds={setUpdateCategoriesIds}
      parentRecord={parentRecord}
      setParentRecord={setParentRecord}
      parentFields={parentFields}
      setParentFields={setParentFields}
      childFields={childFields}
      setChildFields={setChildFields}
     
  />}
</div>
}
export default NewSelectData
