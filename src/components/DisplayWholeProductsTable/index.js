import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, setCategoryProducts, setCurrentCategory } from '../../redux/category/actions'
import { BsEmojiSmileUpsideDownFill, BsPencilFill } from 'react-icons/bs';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import FormButton from '../Forms/FormButton'
import DeleteProductRecord from '../../hooks/DeleteProductRecord'
import DisplaySingleTable from './DisplaySingleTable'
let fieldsNotToDisplay=[]
const callGetFieldsCategory=(field,categories,rep=0,ar="")=>{
  const cat=categories.filter(c=>c.id==field.relationCategory)
let bd
  if(cat.length>0){
      bd=cat[0].fields.map(x=>{
      if(x.dataType=="queryCategory"){
        const desc=`\n${x.name}GlobalCatQuery\n 
          ${x.name}FinalCatQuery\n 
          ${x.name}ProductQuery`
        return desc
      }else if(x.dataType!=="relationship"){
        return x.name
      }else if(x.dataType=="relationship"){
        if(x.relationship=="onetomany"){
          return `\n${x.name}{\n
            ${callGetFieldsCategory(x,categories)}
          }\n
          `
        }else if(x.relationship=="manytomany"){
          //console.log("entrrooooo44445")
          if(rep+1==2){
            fieldsNotToDisplay.push({[ar]:x.name})
            console.log("FIEELSNOTDISPLAY",fieldsNotToDisplay)
            return ''
          }else{
            const ny=categories.filter(c=>c.id==x.relationCategory)[0]
            const ui=`mtm${ny.name}${cat[0].name}`
            return `mtm${ny.name}${cat[0].name}{\n
            ${callGetFieldsCategory(x,categories,rep+1,ui)}
            }`
          }
        }

      }

    })
    bd.unshift("id")
    bd=bd.join("\n")
    return bd
  }

}

//console.log("fieldsnottodispay",fieldsNotToDisplay)


const getQueryFromCategory=(productCategories,categories)=>{
  let query=`mutation GetData {`
  //console.log("productcats",productCategories)
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
        const t1=categories.filter(t=>t.id==x.relationCategory)[0]
      
        if(x.relationship=="onetomany"){
          return `${x.name}{
            ${callGetFieldsCategory(x,categories)}
          }`
        }else if(x.relationship=="manytomany"){
          //console.log("entro aqQUIW3242341")
          console.log("xnameee",`mtm${t1.name}${p.name}`)
          const ar=`mtm${t1.name}${p.name}`
          return `mtm${t1.name}${p.name}{
            ${callGetFieldsCategory(x,categories,0,ar)}
          }`
        }
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
      //console.log("data:",data)
      dispatch(setCategoryProducts(data))
      
    }
  })
  

  catName=currentCategory.name
    
  useEffect(()=>{
    getProducts()
  },[currentCategory])

  

  const trDateMex=(val)=>{
    //console.log("val",val)
    if(val!==null){
      let dateObj = new Date(val)
      let month = dateObj.getUTCMonth() + 1
      let day = dateObj.getUTCDate()
      let year = dateObj.getUTCFullYear()
      let  nD = day + "/" + month + "/" + year
      //console.log("nd",nD)
      return nD
      }
    return ""
  }
  const trDateDB=(val)=>{

    //console.log("val",val)
    if(val!==null){
      let dateObj = new Date(val)
      let month = dateObj.getUTCMonth() + 1
      let day = dateObj.getUTCDate()
      let year = dateObj.getUTCFullYear()
      let  nD = year+ "/" + month + "/" + day
      //console.log("nd",nD)
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
        x=>(x.dataType=="relationship" && (x.relationship=="onetomany"
        || x.relationship=="manytomany"))
      )
      partials.push(cp)
      displayTableAndRelations(cp,categoryProducts[cp],oneToManyCategories,cat2,partials,-1,false,-1,-1,-1)
      
    })
    
    return allTables
  }
  const displayTableAndRelations=(name,prods,otmrelations,cc,partials,pi,isManyToMany=false,relCat,parRel,relCatInd)=>{  
      //console.log("cp[cp]",name,prods,otmrelations,cc)
      let parId
      
      if(cc){
      //console.log("partials",partials)
      let indtable=tableIndexes[name]
      //console.log("ti,name",tableIndexes,name,tableIndexes[name])
    
      if(indtable>=0){
        parId=prods[indtable]?.id
      }else{
        parId=-1
      }
      console.log("paridentroaqui",parId)
    
      allTables.push(<DisplaySingleTable
        titulo={name}
        products={prods}
        respCat={cc}
        toggleEditProduct={toggleEditProduct}
        toggleNewProduct={toggleNewProduct}
        tableIndexes={tableIndexes}
        setTableIndexes={setTableIndexes}
        partials={partials}
        parentId={pi}
        isManyToMany={isManyToMany}
        relationCategory={relCat}
        parentRelation={parRel}
        parentCatId={relCatInd}
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
            if(x.dataType=="relationship" && (x.relationship=="onetomany" ||
            x.relationship=="manytomany"))
              relationNames.push(x.name)
            return (x.dataType=="relationship" && (x.relationship=="onetomany"
            || x.relationship=="manytomany"))
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
            console.log("prodstableindex.id dwp",prods[tableIndexes[name]].id)
            displayTableAndRelations(y.name,
            
          
              otmClusters[i],
              otmcats,respCat,partials,
              parId,
              y.relationship=="manytomany",
              y.relationCategory,
              cc.id,
              prods[tableIndexes[name]].id
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
