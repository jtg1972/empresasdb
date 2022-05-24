import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, setCategoryProducts, setCurrentCategory } from '../../redux/category/actions'
import { BsPencilFill } from 'react-icons/bs';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import FormButton from '../Forms/FormButton'
import DeleteProductRecord from '../../hooks/DeleteProductRecord'
import DisplaySingleTable from './DisplaySingleTable'

const callGetFieldsCategory=(field,categories)=>{
  const cat=categories.filter(c=>c.id==field.relationCategory)
let bd
  if(cat.length>0){
      bd=cat[0].fields.map(x=>{
      if(x.dataType!=="relationship"){
        return x.name
      }else if(x.dataType=="relationship"){
        return `\n${x.name}{\n
          ${callGetFieldsCategory(x,categories)}
        }\n
        `
      }

    })
    bd.unshift("id")
    bd=bd.join("\n")
    return bd
  }

}


const getQueryFromCategory=(productCategories,categories)=>{
  let query=`mutation GetData {`
  console.log("productcats",productCategories)
  let fields
  let q2=productCategories.map(p=>{
    fields=p.fields.map(x=>{
      if(x.dataType!=="relationship"){
        return x.name
      }
      else if(x.dataType=="relationship"){
        const t1=categories.filter(t=>t.id==x.relationCategory)
      

        return `${x.name}{
          ${callGetFieldsCategory(x,categories)}
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
const getMutationForDelete=(categoryName)=>{
  const mutation=`mutation Remove${categoryName}($id: Int) {
    remove${categoryName}(id: $id)

  }`
  console.log("mutation",mutation)
  return gql`${mutation}`

}


const mapToState=({categories})=>({
  currentCategory:categories.currentCategory,
  currentCategoryId:categories.currentCategoryId,
  categories:categories.categories,
  categoryProducts:categories.categoryProducts
  
})

const DisplayWholeProductsTable = ({
  toggleEditProduct,
  toggleNewProduct,
  toggleFilter,
  searchProductsFilter,
  
}) => {
  let deleteFunctions={}
  const dispatch=useDispatch()
  const {
    currentCategory,
    currentCategoryId,
    categories,
    categoryProducts
  }=useSelector(mapToState)

  const [rc,setRc]=useState({})
  const [tableIndexes,setTableIndexes]=useState({})
  
  let deleteId=-1
  let catName

  const productCategories=categories.filter(c=>{
    if(c.parentCategories.includes(currentCategory.id)
    && c.typeOfCategory==0){
  
      return true
    }else return false
  })
  const GET_PRODUCTS_FROM_CATEGORY=getQueryFromCategory(productCategories,categories)
  const [getProducts]=useMutation(GET_PRODUCTS_FROM_CATEGORY,{
    update:(cache,{data})=>{
      console.log("data:",data)
      dispatch(setCategoryProducts(data))
      
    }
  })
  

  catName=currentCategory.name
    
  useEffect(()=>{
    getProducts()
  },[currentCategory])

  

  const trDateMex=(val)=>{
    console.log("val",val)
    if(val!==null){
      let dateObj = new Date(val)
      let month = dateObj.getUTCMonth() + 1
      let day = dateObj.getUTCDate()
      let year = dateObj.getUTCFullYear()
      let  nD = day + "/" + month + "/" + year
      console.log("nd",nD)
      return nD
      }
    return ""
  }
  const trDateDB=(val)=>{

    console.log("val",val)
    if(val!==null){
      let dateObj = new Date(val)
      let month = dateObj.getUTCMonth() + 1
      let day = dateObj.getUTCDate()
      let year = dateObj.getUTCFullYear()
      let  nD = year+ "/" + month + "/" + day
      console.log("nd",nD)
      return nD
    }
    return ""
  }
  
  console.log("params",currentCategoryId,currentCategory.typeOfCategory,
  (currentCategory.typeOfCategory!==undefined)?currentCategory.typeOfCategory:1)

  const isFDate=campo=>{
    const res=currentCategory.fields.filter(
      n=>n.name==campo
    )
    if(res.length!==0){
      if(res[0].declaredType=="date")
        return true
      return false
    }
  }
  const transformProduct=({...p})=>{
    for(let f in p){
      if(isFDate(f)){
        p[f]=trDateDB(p[f])
      }
    }
    return p
  }

  
  let allTables
  
  const getCategoriesProducts=()=>{
    
    allTables=[]
    let partials=[]
      
    Object.keys(categoryProducts).forEach((cp,index)=>{
      const nc=cp.substr(7)
      const cat2=categories.filter(c=>c.name==nc)[0]
      const oneToManyCategories=cat2.fields.filter(
        x=>(x.dataType=="relationship" && x.relationship=="onetomany")
      )
      partials.push(cp)
      displayTableAndRelations(cp,categoryProducts[cp],oneToManyCategories,cat2,partials)
      
    })
    
    return allTables
  }
  const displayTableAndRelations=(name,prods,otmrelations,cc,partials)=>{  
      console.log("cp[cp]",name,prods,otmrelations,cc)
      
      if(cc){
      console.log("partials",partials)
      allTables.push(<DisplaySingleTable
        titulo={name}
        products={prods}
        respCat={cc}
        toggleEditProduct={toggleEditProduct}
        toggleNewProduct={toggleNewProduct}
        tableIndexes={tableIndexes}
        setTableIndexes={setTableIndexes}
        partials={partials}
        />
        )
      }
      let relationNames=[]
      otmrelations.forEach(y=>{
        const respCat=categories.filter(o=>o.id==y.relationCategory)[0]
        console.log("y,respCat",y,respCat)

        const otmcats=respCat.fields.filter(
          x=>{
            //relationNames.push(x.name)
            if(x.dataType=="relationship" && x.relationship=="onetomany")
              relationNames.push(x.name)
            return (x.dataType=="relationship" && x.relationship=="onetomany")
          }
        )
        const otmClusters=prods?.map(e=>e[y.name])
        for(let i in otmClusters){
          console.log("tableindex",tableIndexes[cc.name],cc.name)
          console.log("yname",y)
          console.log("imp2",i,tableIndexes[y.name],y.name)
          if(i==tableIndexes[name]){
            console.log("imp3",i,tableIndexes[name],name)

            partials.push(y.name)
            displayTableAndRelations(y.name,
            
          
              otmClusters[i],
              otmcats,respCat,partials
            )
          }  
        }
      })
      return allTables
      
  }

  return (
    <div>
      {getCategoriesProducts()}
      
    </div>
  )
}

export default DisplayWholeProductsTable
