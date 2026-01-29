import { useMutation } from "@apollo/client"
import { checkDocument } from "@apollo/client/utilities"
import { GraphQLSpecifiedByDirective } from "graphql"
import gql from "graphql-tag"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import FormButton from "../Forms/FormButton"
import { deleteProduct, setCategoryProducts, setCurrentCategory } from '../../redux/category/actions'
import DisplayWholeProductsTable from "../DisplayWholeProductsTable"

const callGetFieldsCategory=(field,categories,checkBoxDataFields={})=>{
  let ui
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
          if(checkBoxDataFields?.[field.name]?.["otm"]?.includes(x.name)){
            return `\n${x.name}{\n
              ${callGetFieldsCategory(x,categories,checkBoxDataFields)}
              sortClauses
              whereClauses
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
              if((x.declaredType=="number" || x.declaredType=="string"))//&& x.relationship!="otmdestiny")
                return x.name
              
            })
            //newcamps.push("id")
            newcamps=newcamps.join("\n")
            
            restcamps=[...restcamps,...newcamps].join("\n")
            return `mtm${ny.name}${cat[0].name}{\n
              ${newcamps}
              ${callGetFieldsCategory(x,categories,checkBoxDataFields)}
              sortClauses
              whereClauses
              
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
            //newcamps.push(`id`)
            let clavePQ=-1
            let restcamps=t1.fields.map(x=>{
              if((x.declaredType=="string" || x.declaredType=="number"))//&& x.relationship!="otmdestiny")
                return `'${t1.name}.${x.name}'`
            })
            
            
              
            //restcamps=[...newcamps,...restcamps].join("\n")
              
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
  //console.log("queryprod445",query)
  return gql`${query}`
}
const mapToState=({categories})=>({
  currentCategory:categories.currentCategory,
  categories:categories.categories,
  categoryProducts:categories.categoryProducts
})
const GetDataFromInital=({
  
  conditionsWhere,
  sortClauses,

  toggleEditProduct,
      toggleNewProduct,
      toggleFilter,
      searchProductsFilter,
      setDqIds,
      dqIds,
      checkBoxFields,
      setCheckBoxFields,
      checkBoxDataFields,
      setCheckBoxDataFields,
      updateCategories,
      updateCategoriesIds,
      setUpdateCategoriesIds,
      parentRecord,
      setParentRecord,
      parentFields,
      setParentFields,
      childFields,
      setChildFields
})=>{
  
  const {
    currentCategory,
    categories,
    
    //categoryProducts
  }=useSelector(mapToState)
  let dispatch = useDispatch()
  const GET_PRODUCTS_FROM_CATEGORY=getQueryFromCategory(categories.filter(x=>x.name==currentCategory.name)[0],categories,checkBoxDataFields)
  const [getProducts]=useMutation(GET_PRODUCTS_FROM_CATEGORY,{
    update:(cache,{data})=>{
      //console.log("datamtmboth:",data)
      dispatch(setCategoryProducts(data))
      
    }
  })
  //console.log("stringentrance",JSON.stringify(conditionsWhere),JSON.stringify(sortClauses))
  useEffect(()=>{
    getProducts({
      variables:{
        whereClauses:JSON.stringify(conditionsWhere),
        sortClauses:JSON.stringify(sortClauses)
      }
    })
  },[])

  return <div>
    <p>Jorge</p>
    <DisplayWholeProductsTable
      toggleEditProduct={toggleEditProduct}
      toggleNewProduct={toggleNewProduct}
      toggleFilter={toggleFilter}
      searchProductsFilter={searchProductsFilter}
      setDqIds={setDqIds}
      dqIds={dqIds}
      checkBoxFields={checkBoxFields}
      setCheckBoxFields={setCheckBoxFields}
      checkBoxDataFields={checkBoxDataFields}
      setCheckBoxDataFields={setCheckBoxDataFields}
      updateCategories={updateCategories}
      updateCategoriesIds={updateCategoriesIds}
      setUpdateCategoriesIds={setUpdateCategoriesIds}
      parentRecord={parentRecord}
      setParentRecord={setParentRecord}
      parentFields={parentFields}
      setParentFields={setParentFields}
      childFields={childFields}
      setChildFields={setChildFields}
      />  
  </div>

}

export default GetDataFromInital
