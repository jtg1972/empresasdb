import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { searchRecordsFromQuery } from '../../../utilities/searchRecordsFromQuery'
import FormInput from '../../Forms/FormInput'
import DisplaySearchProducts from '../DisplaySearchProducts'
const callGetFieldsCategory=(field,categories,rep)=>{
  const cat=categories.filter(c=>c.id==field.relationCategory)
let bd
  if(cat.length>0){
      bd=cat[0].fields.map(x=>{
      if(x.dataType!=="relationship"){
        return x.name
      }else if(x.dataType=="relationship"){
        if(rep<2){
          return `\n${x.name}{\n
            ${callGetFieldsCategory(x,categories,rep+1)}
          }\n
          `
        }
        else return ""
      }

    })
    bd.unshift("id")
    bd=bd.join("\n")
    return bd
  }

}


const getQueryFromCategory=(productCategories,categories,rep=0)=>{
  let query=`mutation GetData {`
  console.log("productcats",productCategories)
  let fields
  let q2=productCategories.map(p=>{
    fields=p.fields.map(x=>{
      if(x.dataType=="queryCategory"){
          const desc=`\n${x.name}GlobalCatQuery\n 
          ${x.name}FinalCatQuery\n 
          ${x.name}ProductQuery`
          return desc
      }else if(x.dataType!=="relationship"){
        return x.name
      }
      else if(x.dataType=="relationship"){
        const t1=categories.filter(t=>t.id==x.relationCategory)
      

        return `${x.name}{
          ${callGetFieldsCategory(x,categories,rep+1)}
        }`
      }
    })
    fields.unshift("id")
    const q=`getData${p.name}{
      ${fields.length>0 && fields.join(`\n\t\t`)}
    }`
    return q
  })
  q2=q2.join(`\n`)
  query+=q2
  query+=`}`
  console.log("query",query)
  return gql`${query}`
}
const mapToState=({categories})=>({
  categories:categories.categories,
})

const DisplayQuerySearch = ({
  setFields,
  fields,
  queryCategory,
  queryFieldName,
  structure,
  isManyToMany,
  parentId,
  parentCatId,
  fieldMtm
}) => {
  const [chosenProduct,setChosenProduct]=useState({})
  const {categories}=useSelector(mapToState)
  const [dataTable,setDataTable]=useState({})
  const [search,setSearch]=useState("")
  const[searchResult,setSearchResult]=useState([])
  const curCat=categories.filter(y=>
    y.id==queryCategory)[0]
  const productCategories=categories.filter(c=>{
    if(c.parentCategories.includes(queryCategory)
    && c.typeOfCategory==0){
  
      return true
    }else return false
  })
  const GET_PRODUCTS_FROM_CATEGORY=getQueryFromCategory(productCategories,categories)
  const [getProducts]=useMutation(GET_PRODUCTS_FROM_CATEGORY,{
    update:(cache,{data})=>{
      console.log("data:",data)
      setDataTable(data)
      //dispatch(setCategoryProducts(data))
      
    }
  })
  const rawProductsArr=Object.values(dataTable)
  const rawProductsKeys=Object.keys(dataTable)
  let recordsToFilter=[]
  let headers=[]
  let cat={}
  for(let rp in rawProductsArr){
    cat=categories.filter(c=>{

      let busca=rawProductsKeys[rp].substr(7)
      console.log("busca",busca)
      return c.name==busca
    }
    )[0]
  
    if(rawProductsArr[rp][0]!==undefined){
      for(let x in rawProductsArr[rp][0]){
        headers.push(x)
        
      }
      headers.unshift("Cat Id")
      headers.unshift("Cat Name")
      for(let x in rawProductsArr[rp]){
        recordsToFilter=[...recordsToFilter,{catId:cat.id,catName:cat.name,...rawProductsArr[rp][x]}]
        
      }
    }
    
  }
  console.log("recordsToFilter",recordsToFilter)
  

  useEffect(()=>{
    getProducts()
  },[])
  


  return (
    <div>
        <FormInput 
          onChange={(e)=>setSearch(e.target.value)}
          value={search}
          placeholder={curCat.name}
          onKeyUp={(e)=>{
            if(e.key=="Enter"){
              const x=searchRecordsFromQuery(search,recordsToFilter)
              console.log("x",x)
              setSearchResult(x)
            }
          }}
          
        />
        {searchResult.length>0 &&
        <DisplaySearchProducts 
          searchProducts={searchResult}
          setChosenProduct={setChosenProduct}
          setFields={setFields}
          fields={fields}
          queryCategory={queryCategory}
          nameCategory={curCat.name}
          queryFieldName={queryFieldName}
          structure={structure}
          isManyToMany={isManyToMany}
          parentId={parentId}
          fieldMtm={fieldMtm}
          parentCatId={parentCatId}
        />

        
      }
    </div>
  )
}

export default DisplayQuerySearch
