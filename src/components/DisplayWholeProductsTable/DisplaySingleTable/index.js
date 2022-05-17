import { gql, useMutation } from '@apollo/client'
import React,{useState} from 'react'
import { BsPencilFill } from 'react-icons/bs'
import FormButton from '../../Forms/FormButton'
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import {setCategoryProducts} from '../../../redux/category/actions'
import { FcLeftDown2 } from 'react-icons/fc';
const getMutationForDelete=(categoryName)=>{
  const mutation=`mutation Remove${categoryName}($id: Int) {
    remove${categoryName}(id: $id)

  }`
  console.log("mutation",mutation)
  return gql`${mutation}`

}
const mapToState=({categories})=>({
  categoryProducts:categories.categoryProducts
})

const DisplaySingleTable = ({
  titulo,
  products,
  respCat,
  toggleEditProduct,
  toggleNewProduct,
  tableIndexes,
  setTableIndexes,
  partials
  })=>{
  const dispatch=useDispatch()
  let resultado=[]
  let deleteId
  const {categoryProducts}=useSelector(mapToState)
  console.log("respcatst",respCat)

  const updateState=(prods,indexPartials=0,indexArray=0)=>{
      
    indexPartials=parseInt(indexPartials)
      indexArray=parseInt(indexArray)
      let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
    
      console.log("tipartials",ti,partials)
      let cp 
      /*if(prods==undefined || prods==[]
        ||prods=={})
        return null*/
     
      
      if(!Array.isArray(prods)){
        cp={...prods}
        console.log("no arreglo")
        console.log("prods partlength partials",prods,partials.length,partials)
        let ui
        //console.log("pip",partials[indexPartials],cp[partials[indexPartials]])
        //console.log("params",cp[partials[indexPartials]],indexPartials+1,indexArray)
        console.log("se modifica campo",partials[indexPartials])
        //if((indexPartials+1)==partials.length){
        console.log("importante",partials[indexPartials],titulo)
        if(partials[indexPartials]==titulo){
          console.log("entro final")
          /*ui=cp[partials[indexPartials]].filter(x=>{
            console.log("xid deleteid",x.id,deleteId)
            return x.id!==deleteId
          })*/
          
          console.log("ui",partials[indexPartials],cp[partials[indexPartials]])
          return {...cp,
            [partials[indexPartials]]:cp[partials[indexPartials]].filter(x=>{
              console.log("xid deleteid",x.id,deleteId,x.id!==deleteId)
              return x.id!==deleteId?true:false
            })}
        }else{
          console.log("entro no final")
          return {...cp,[partials[indexPartials]]:updateState(cp[partials[indexPartials]],indexPartials+1,indexArray)}
        }
      
      } else if(Array.isArray(prods)){
        cp=[...prods]
        console.log("arraglo",indexArray,ti.length)
        console.log("deliddd",deleteId)
        console.log("prods",prods)
          console.log("partarr",cp[ti[indexArray]])
        console.log("paramsarr",cp[ti[indexArray]],indexPartials,indexArray+1,titulo)
                  
        
        return cp.map((y,index)=>{
          if(index==ti[indexArray]){
            return updateState(cp[ti[indexArray]],indexPartials,indexArray+1)
          }
          return y
        })
      
      } 
      
  }
  const DELETE_PRODUCT=getMutationForDelete(respCat.name)
  const [delete2]=useMutation(DELETE_PRODUCT,{
    update:(cache,{data})=>{
      const n=`remove${respCat.name}`
    
      if(data[n]==true){
        console.log("tituloenc",titulo)
        let us=updateState(categoryProducts,0,0,titulo)
        console.log("us",us)
        dispatch(setCategoryProducts(us))
        console.log("tableIndexes",tableIndexes)
      }
    }
  })

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
  
 
  const isFDate=campo=>{
    const res=respCat.fields.filter(
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
  const res=()=>{
    console.log("displtable",products,respCat)
    resultado.push(<p style={{marginTop:"10px",marginBottom:"10px"}}>{titulo}</p>)
    resultado.push(<FormButton
      style={{
        textAlign:"left",
        backgroundColor:"orange",
        color:"black",
        width:"auto",
        marginTop:"10px",
        marginBottom:"10px"
      }}
      onClick={()=>toggleNewProduct(respCat,tableIndexes,partials)}
      >Add Record of {respCat.name}</FormButton>)
    
    /*if(currentCategory.typeOfCategory==0){
      resultado.push(<FormButton
      onClick={()=>{toggleNewProduct()}}>
        Add Product to {currentCategory.name}
      </FormButton>)
    }*/
    let yalohizo=false
    let ifRelations=false
    if(products?.length>0){
      
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
              setTableIndexes(ti=>({...ti,[respCat.name]:e.target.value}))
              
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

              console.log("Paramsbien ",deleteId)
              
              delete2({
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
            toggleEditProduct(transformProduct(producto),respCat)
          }}
        /></td>)
        }
        
        acc.push(<tr>{data}</tr>)
      }
      
      resultado.push(<table>{header}<tbody>{acc}</tbody></table>)
      return resultado
    }else{
      return( 
        <div>
          <p style={{marginTop:"10px",marginBottom:"10px"}}>{titulo}</p>
          <FormButton
          style={{
            textAlign:"left",
            backgroundColor:"orange",
            color:"black",
            width:"auto",
            marginTop:"10px",
            marginBottom:"10px"
          }}
          onClick={()=>toggleNewProduct(respCat)}
          >Add Record of {respCat.name}
          </FormButton>
          <p>Theres no products of this category</p >
        </div>)
      }
  }
  return <div>{res()}</div>
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

export default DisplaySingleTable
