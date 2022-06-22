import { gql, useMutation } from '@apollo/client'
import React,{useState} from 'react'
import { BsPencilFill } from 'react-icons/bs'
import FormButton from '../../Forms/FormButton'
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import {setCategoryProducts} from '../../../redux/category/actions'
import { FcLeftDown2 } from 'react-icons/fc';
import { valueToObjectRepresentation } from '@apollo/client/utilities';
const getMutationForDelete=(categoryName)=>{
  const mutation=`mutation Remove${categoryName}($id: Int) {
    remove${categoryName}(id: $id)

  }`
  console.log("mutation",mutation)
  return gql`${mutation}`

}
const mapToState=({categories})=>({
  categoryProducts:categories.categoryProducts,
  categories:categories.categories,
  currentCategory:categories.currentCategory
})

const DisplaySingleTable = ({
  titulo,
  products,
  respCat,
  toggleEditProduct,
  toggleNewProduct,
  tableIndexes,
  setTableIndexes,
  partials,
  parentId,
  isManyToMany,
  relationCategory,
  parentRelation,
  parentCatId
  })=>{
    console.log("productsmain",products)
    console.log("parentcatid Singletable",parentCatId)
  const dispatch=useDispatch()
  let resultado=[]
  let deleteId
  const {categoryProducts,
  categories,
  currentCategory}=useSelector(mapToState)
  console.log("respcatst",respCat)
  console.log("parentId",parentId)

  const updateState=(prods,indexPartials=0,indexArray=0)=>{
      
    indexPartials=parseInt(indexPartials)
      indexArray=parseInt(indexArray)
      let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
    
      console.log("tipartials",ti,partials)
      let cp 
      /*if(prods==undefined || prods==[]
        ||prods=={})
        return null*/
        
        partials=path
        ti=ind

      
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

  let ind
  let path
  const getIndexes=()=>{
    
    for(let p in path){
      console.log("ti pathp",tableIndexes,path[p])
      let curInd
      curInd=tableIndexes[path[p]]
      ind.push(curInd)
      
    }
    return ind
  }
  let indexSize=1
  
  const getPath=(fields)=>{
    
    if(titulo.startsWith('getData')){
      return path
    }
    let keys=Object.keys(fields)
    if(keys?.length>0){
      indexSize++
      let ni=indexSize
      for(let f in keys){
        if(path.length>=ni){
          path.splice(ni-1)
        }
        path.push(fields[f].name)
        if(fields[f].name!==titulo){
          const relCatId=fields[f].relationCategory
          const curCat=categories.filter(x=>x.id==relCatId)[0]
          
          
          const r=getPath(curCat.fields.filter(x=>x.dataType=="relationship"))
          if(r==true)
              break
        }else{
          return true
        }
      }
    }else
      return

  }

  const hasSons=(ind)=>{
    const fws=respCat.fields.filter(x=>
      x.dataType=="relationship" &&
      x.relationship=="onetomany")
      for(let cf in fws){
        if(products[ind][fws[cf].name].length>0)
          return true
      return false
      }
  }



  const DELETE_PRODUCT=getMutationForDelete(respCat.name)
  const [delete2]=useMutation(DELETE_PRODUCT,{
    update:(cache,{data})=>{
      const n=`remove${respCat.name}`
    
      if(data[n]==true){
        console.log("tituloenc",titulo)
        path=[`getData${currentCategory.name}`]
        indexSize=1
        getPath(currentCategory.fields.filter(x=>
          x.dataType=="relationship"))
        console.log("path",path)
        ind=[]
        getIndexes()
        console.log("indices",ind)
      
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
  const isSonAndHasParent=()=>{
    const y=respCat.fields.filter(x=>
      x.relationship=="otmdestiny").length
      console.log("y pARENTID",y,parentId)
    if(y==0)
      return true
    else if(y>0 && parentId>0)
      return true
    else
      return false
  }

  const res=()=>{
    console.log("displtable",products,respCat)
    resultado.push(<p style={{marginTop:"10px",marginBottom:"10px"}}>{titulo}</p>)
    {isSonAndHasParent() &&
      resultado.push(<FormButton
      style={{
        textAlign:"left",
        backgroundColor:"orange",
        color:"black",
        width:"auto",
        marginTop:"10px",
        marginBottom:"10px"
      }}
      onClick={()=>toggleNewProduct(respCat,tableIndexes,partials,titulo,parentId,isManyToMany,relationCategory,parentRelation,parentCatId)}
      >Add Record of {respCat.name}</FormButton>)
    }
    /*if(currentCategory.typeOfCategory==0){
      resultado.push(<FormButton
      onClick={()=>{toggleNewProduct()}}>
        Add Product to {currentCategory.name}
      </FormButton>)
    }*/
    let yalohizo=false
    let ifRelations=false
    if(products?.length>0){
      
      let headers=respCat.fields.map(h=>{
        if(h.dataType=="queryCategory"){
          return <>
            <th>{h.name} Global</th>
            <th>{h.name} Final</th>
            <th>{h.name} Product</th>
          </>

        }
        return <th>{h.name}</th>
      })
      headers.unshift(<th>Id</th>)
      headers.push(<th>Category</th>)
      /*let headers=Object.keys(products[0]).map(p=>{
        
      <th>{p}</th>}
      )*/
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
          if(respCat.fields[yu].dataType=="relationship" 
          && products[p][respCat.fields[yu].name]!==undefined
          && yalohizo==false){
            ifRelations=true
            headers.unshift(<th>Selected</th>)
            yalohizo=true
            break;
          }
        }
        if(ifRelations){
          data.push(<td>
            <input type="radio" name={titulo}
            onChange={(e)=>{
            
              console.log("indice",indice,e.target.value,titulo)
              console.log("impser",{...tableIndexes,[titulo]:e.target.value})
              setTableIndexes(ti=>({...ti,[titulo]:e.target.value}))
              }

              
            }
            
            value={indice}
            
            />
          </td>)
          indice++
        }
        for(let c in products[p]){
          /*let cc=categories.filter(v=>
            v.name==cname
          )*/
          console.log("productsp",products[p],respCat.fields)
          let fs=respCat.fields.filter(x=>{
            
            return x.name==c
          })
          console.log("ccfields",fs)

          
          if(fs.length==1){
            if(fs[0].relationship=="onetomany"){
              data.push(<td>one to many</td>)
            }else if(fs[0].relationship=="manytomany"){
              data.push(<td>many to many</td>)
            }
            else if(fs[0].declaredType=="date"){
              //if(producto[c]!==""){
                
              console.log("prodc",producto[c])  
              let nf=trDateMex(producto[c])
              console.log("nf",nf)
              //producto[c]=nf
              data.push(<td>{nf}</td>)
              //}
            }else if(fs[0].dataType=="queryCategory"){
              data.push(<td>producto[`${producto[c]}globalCatQuery`]</td>)
              data.push(<td>producto[`${producto[c]}finalCatQuery`]</td>)
              data.push(<td>producto[`${producto[c]}productQuery`]</td>)
            }else { 
              data.push(<td>{producto[c]}</td>)
            }
          }else{
            data.push(<td>{producto[c]}</td>)
          }
        }
        if(respCat.typeOfCategory==0){ 
          if(!hasSons(p)){
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
          )}else{
            data.push(<td></td>)
          }
        
          data.push(<td><BsPencilFill
          onClick={()=>{
            
            console.log("prodwholetable",producto)
            toggleEditProduct(transformProduct(producto),respCat,tableIndexes,partials,titulo)
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
          {isSonAndHasParent() &&
          <FormButton
          style={{
            textAlign:"left",
            backgroundColor:"orange",
            color:"black",
            width:"auto",
            marginTop:"10px",
            marginBottom:"10px"
          }}
          onClick={()=>{
            console.log("parentcadid single table",parentCatId)
            toggleNewProduct(respCat,tableIndexes,partials,titulo,parentId,isManyToMany,relationCategory,parentRelation,parentCatId)}
          }
          >Add Record of {respCat.name}
          </FormButton>
          }
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
