import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryProducts } from '../../redux/category/actions'
import { BsPencilFill } from 'react-icons/bs';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
const getQueryFromCategory=(productCategories)=>{
  let query=`mutation GetData {`
  console.log("productcats",productCategories)
  let q2=productCategories.map(p=>{
    let fields=p.fields.map(x=>x.name)
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
  currentCategory:categories.currentCategory,
  currentCategoryId:categories.currentCategoryId,
  categories:categories.categories,
  categoryProducts:categories.categoryProducts
  
})

const DisplayWholeProductsTable = () => {
  const dispatch=useDispatch()
  const {
    currentCategory,
    currentCategoryId,
    categories,
    categoryProducts
  }=useSelector(mapToState)


  const productCategories=categories.filter(c=>{
    if(c.parentCategories.includes(currentCategory.id)
    && c.typeOfCategory==0){
  
      return true
    }else return false
  })
  const GET_PRODUCTS_FROM_CATEGORY=getQueryFromCategory(productCategories)
  const [getProducts]=useMutation(GET_PRODUCTS_FROM_CATEGORY,{
    update:(cache,{data})=>{
      console.log("data:",data)
      dispatch(setCategoryProducts(data))
    }
  })
    
  useEffect(()=>{
    getProducts()
  },[currentCategory])
  
  console.log("params",currentCategoryId,currentCategory.typeOfCategory,
  (currentCategory.typeOfCategory!==undefined)?currentCategory.typeOfCategory:1)

  const displayTable=(titulo,products)=>{
    let resultado=[]
    resultado.push(<p>{titulo}</p>)
    if(products.length>0){
      let headers=Object.keys(products[0]).map(p=><th>{p}</th>)
      if(currentCategory.typeOfCategory==0){
        headers.push(<th>Edit Product</th>)
        headers.push(<th>Delete Product</th>)
      }
      let header=[]
      header.push(<thead><tr>{headers}</tr></thead>)
      let acc=[]
      for(let p in products){
        let producto=products[p]
        let data=[]
        for(let c in producto){
          data.push(<td>{producto[c]}</td>)
        }
        if(currentCategory.typeOfCategory==0){
          data.push(<td><IoIosRemoveCircleOutline
        
          />
          </td>
        )
        }
        
        acc.push(<tr>{data}</tr>)
      }
      
      resultado.push(<table>{header}<tbody>{acc}</tbody></table>)
      return resultado
    }else
      return <div>
          <p>{titulo}</p>
          <p>Theres no products of this category</p>
        </div>
  }

  const getCategoriesProducts=()=>{
    const allTables=[]
    Object.keys(categoryProducts).forEach(cp=>
      allTables.push(displayTable(cp,categoryProducts[cp]))
    )
    return allTables
  }

  return (
    <div>
      {getCategoriesProducts()}      
    </div>
  )
}

export default DisplayWholeProductsTable
