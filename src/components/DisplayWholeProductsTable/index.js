import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, setCategoryProducts } from '../../redux/category/actions'
import { BsPencilFill } from 'react-icons/bs';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import FormButton from '../Forms/FormButton'

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
  searchProductsFilter
}) => {
  const dispatch=useDispatch()
  const {
    currentCategory,
    currentCategoryId,
    categories,
    categoryProducts
  }=useSelector(mapToState)

  const [tableIndexes,setTableIndexes]=useState({})
  let deleteId=-1

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
  const DELETE_PRODUCT=getMutationForDelete(currentCategory.name)
  const [deleteProduct2]=useMutation(DELETE_PRODUCT,{
    update:(cache,{data})=>{
      const deleteName=`remove${currentCategory.name}`
      const res=data[deleteName]
      console.log("res",res)
      if(res==true){
      
        dispatch(deleteProduct({categoryName:currentCategory.name,
        productId:deleteId}))
        
      }
    }
  })
    
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

  const displayTable=(titulo,products,respCat)=>{
    let resultado=[]
    console.log("displtable",products,respCat)
    resultado.push(<p style={{marginTop:"10px",marginBottom:"10px"}}>{titulo}</p>)
    /*if(currentCategory.typeOfCategory==0){
      resultado.push(<FormButton
      onClick={()=>{toggleNewProduct()}}>
        Add Product to {currentCategory.name}
      </FormButton>)
    }*/
    let yalohizo=false
    let ifRelations=false
    if(products.length>0){
      
      let headers=Object.keys(products[0]).map(p=><th>{p}</th>)
      //headers.unshift(<th>Selected</th>)
      if(respCat.typeOfCategory==0){
        headers.push(<th>Delete Product</th>)
        headers.push(<th>Edit Product</th>)
      }
      let header=[]
      header.push(<thead><tr>{headers}</tr></thead>)
      let acc=[]
      let cname=titulo.substr(7)
      let indice=0
      for(let p in products){
        let producto={...products[p]}
        let data=[]
        
        for(let yu in respCat.fields){
          if(respCat.fields[yu].dataType=="relationship" && yalohizo==false){
            ifRelations=true
            headers.unshift(<th>Selected</th>)
            yalohizo=true
            break;
          }
        }
        if(ifRelations){
          data.push(<td>
            <input type="radio" name={respCat.name}
            onChange={(e)=>{
            
              console.log("indice",indice,e.target.value)
              setTableIndexes(
                ti=>({...ti,[respCat.name]:e.target.value})
              )
            }
            }
            value={indice}
            
            />
          </td>)
          indice++
        }
        for(let c in producto){
          /*let cc=categories.filter(v=>
            v.name==cname
          )*/
          let fs=respCat.fields.filter(x=>{
            
            return x.name==c
          })
          console.log("ccfields",fs)

          
          if(fs.length==1){
            if(fs[0].dataType=="relationship"){
              data.push(<td>one to many</td>)
            }
            else if(fs[0].declaredType=="date"){
              //if(producto[c]!==""){
                
              console.log("prodc",producto[c])  
              let nf=trDateMex(producto[c])
              console.log("nf",nf)
              //producto[c]=nf
              data.push(<td>{nf}</td>)
              //}
            }else{
              data.push(<td>{producto[c]}</td>)
            }
          }else{
            data.push(<td>{producto[c]}</td>)
          }
        }
        if(respCat.typeOfCategory==0){
          data.push(<td><IoIosRemoveCircleOutline
            onClick={()=>{
              deleteId=producto["id"]
              
              deleteProduct2({
                variables:{
                  id:producto["id"]
                }
              })
            }}
          />
          </td>
        )
        data.push(<td><BsPencilFill
          onClick={()=>{
            console.log("prodwholetable",producto)
            toggleEditProduct(transformProduct(producto))
          }}
        /></td>)
        }
        
        acc.push(<tr>{data}</tr>)
      }
      
      resultado.push(<table>{header}<tbody>{acc}</tbody></table>)
      return resultado
    }else
      return <div>
          <p style={{marginTop:"10px",marginBottom:"10px"}}>{titulo}</p>
          <p>Theres no products of this category</p >
        </div>
      
      /*<div>
          <p>{titulo}</p>
          {currentCategory.typeOfCategory==0 && 
          <div>
            <FormButton
            onClick={()=>{toggleNewProduct()}}>
              Add Product to {currentCategory.name}
            </FormButton>
            
            
          </div>
            
          }    
          <p>Theres no products of this category</p>

        </div>*/
  }
  let allTables
  const getCategoriesProducts=()=>{
    
    allTables=[]
    allTables.push(<FormButton
      style={{
        textAlign:"left",
        backgroundColor:"orange",
        color:"black",
        width:"auto",
        marginTop:"10px",
        marginBottom:"10px"
      }}
      onClick={()=>{
        toggleFilter()
      }}>
        Add Filter
    </FormButton>)
    if(currentCategory.typeOfCategory==0){
    allTables.push(<FormButton
      onClick={()=>{toggleNewProduct()}}
      style={{
        textAlign:"left",
        backgroundColor:"orange",
        color:"black",
        width:"auto",
        marginLeft:"10px",
        marginTop:"10px",
        marginBottom:"10px"
      }}>
        Add Product to {currentCategory.name}
      </FormButton>)
    }
    
    Object.keys(categoryProducts).forEach((cp,index)=>{
      const nc=cp.substr(7)
      const cat2=categories.filter(c=>c.name==nc)[0]
      const oneToManyCategories=cat2.fields.filter(
        x=>(x.dataType=="relationship" && x.relationship=="onetomany")
      )
      displayTableAndRelations(cp,categoryProducts[cp],oneToManyCategories,cat2)
    })
    return allTables
  }
  const displayTableAndRelations=(name,prods,otmrelations,cc)=>{  
      console.log("cp[cp]",name,prods,otmrelations)
      
      allTables.push(displayTable(name,prods,cc))
      otmrelations.forEach(y=>{
        const respCat=categories.filter(o=>o.id==y.relationCategory)[0]
        console.log("y,respCat",y,respCat)
        const otmcats=respCat.fields.filter(
          x=>(x.dataType=="relationship" && x.relationship=="onetomany")
        )
        const otmClusters=prods.map(e=>e[y.name])
        for(let i in otmClusters){
          console.log("tableindex",tableIndexes[cc.name],cc.name)
          if(i==tableIndexes[cc.name]){
            displayTableAndRelations(respCat.name,
          
              otmClusters[i],
              otmcats,respCat
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
