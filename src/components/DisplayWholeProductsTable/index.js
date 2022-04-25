import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, setCategoryProducts } from '../../redux/category/actions'
import { BsPencilFill } from 'react-icons/bs';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { getDataFromTree } from '@apollo/client/react/ssr'
import FormButton from '../Forms/FormButton'
import { isSpecifiedScalarType } from 'graphql'
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
const getMutationForDelete=(categoryName)=>{
  const mutation=`mutation DeleteProduct($id: Int) {
    delete${categoryName}(id: $id)

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
  let deleteId=-1

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
  const DELETE_PRODUCT=getMutationForDelete(currentCategory.name)
  const [deleteProduct2]=useMutation(DELETE_PRODUCT,{
    update:(cache,{data})=>{
      const name=`getData${currentCategory.name}`
      const deleteName=`delete${currentCategory.name}`
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

  const displayTable=(titulo,products)=>{
    let resultado=[]
    resultado.push(<p style={{marginTop:"10px",marginBottom:"10px"}}>{titulo}</p>)
    /*if(currentCategory.typeOfCategory==0){
      resultado.push(<FormButton
      onClick={()=>{toggleNewProduct()}}>
        Add Product to {currentCategory.name}
      </FormButton>)
    }*/

    if(products.length>0){
      let headers=Object.keys(products[0]).map(p=><th>{p}</th>)
      if(currentCategory.typeOfCategory==0){
        headers.push(<th>Delete Product</th>)
        headers.push(<th>Edit Product</th>)
      }
      let header=[]
      header.push(<thead><tr>{headers}</tr></thead>)
      let acc=[]
      for(let p in products){
        let producto={...products[p]}
        let data=[]
        for(let c in producto){
          let fs=currentCategory.fields.filter(x=>{
            
            return x.name==c
          })
          console.log("ccfields",fs)
          if(fs.length==1){
            
            if(fs[0].declaredType=="date"){
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
        if(currentCategory.typeOfCategory==0){
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

  const getCategoriesProducts=()=>{
    const allTables=[]
    
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
