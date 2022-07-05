import { gql, useMutation } from '@apollo/client'
import React,{useState,useEffect} from 'react'
import { BsPencilFill } from 'react-icons/bs'
import FormButton from '../../Forms/FormButton'
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import {setCategoryProducts} from '../../../redux/category/actions'
import { FcLeftDown2 } from 'react-icons/fc';
import { asyncMap, valueToObjectRepresentation } from '@apollo/client/utilities';
import { isConstValueNode } from 'graphql';


const getMutationForDelete=(categoryName)=>{
  const mutation=`mutation Remove${categoryName}($id: Int) {
    remove${categoryName}(id: $id)

  }`
  console.log("mutation",mutation)
  return gql`${mutation}`

}

const getMutationForDeleteManyToMany=(parentRelationId,category,categories)=>{
  const parentCategory=categories.filter(x=>
    x.id==parentRelationId)[0]
  let name=""
  if(parentCategory.name>category.name)
  name=`${category.name}_${parentCategory.name}`
  else
  name=`${parentCategory.name}_${category.name}`

  console.log("Namedelmut",name)
  const mutation=`mutation Remove${name}($mtm${parentCategory.name}${category.name}Id: Int,
    $mtm${category.name}${parentCategory.name}Id: Int
    ) {
    remove${name}(mtm${parentCategory.name}${category.name}Id: $mtm${parentCategory.name}${category.name}Id,
      mtm${category.name}${parentCategory.name}Id: $mtm${category.name}${parentCategory.name}Id)

  }`
  console.log("mutationdel",mutation)
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
  parentCatId,
  fieldsNotToDisplay,
  mutMtmData,
  nameFieldKey,
  nameFieldKeyToDisplay,
  nameMutationManyToManyData
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
  const updateManyToManyState=(prods,indexPartials=0,indexArray=0,reemp,titulo)=>{
    let cp 
    let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))

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
            [partials[indexPartials]]:reemp}
        }else{
          console.log("entro no final")
          return {...cp,[partials[indexPartials]]:updateManyToManyState(cp[partials[indexPartials]],indexPartials+1,indexArray,reemp,titulo)}
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
            return updateManyToManyState(cp[ti[indexArray]],indexPartials,indexArray+1,reemp,titulo)
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

  let DELETE_PRODUCT=``
  if(!isManyToMany){
    DELETE_PRODUCT=getMutationForDelete(respCat.name)
  }else{
    DELETE_PRODUCT=getMutationForDeleteManyToMany(parentRelation,respCat,categories)
  }
  const [delete2]=useMutation(DELETE_PRODUCT,{
    update:(cache,{data})=>{
      let n
      if(!isManyToMany)
        n=`remove${respCat.name}`
      else{
        const parentCategory=categories.filter(x=>
          x.id==parentRelation)[0]
        
        if(parentCategory.name>respCat.name)
          n=`remove${respCat.name}_${parentCategory.name}`
        else
          n=`remove${parentCategory.name}_${respCat.name}`
      
      }
    
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

  let repMut
  if(mutMtmData!==""){
     repMut=mutMtmData
  }else{
    
    repMut=gql`mutation getMutationMtm{
     getData${respCat.name}{
       id
     }
    }`
  }
  console.log("repmut",repMut)
  const [getMtmData]=useMutation(repMut,
    {update:(cache,{data})=>{
      const dMTM=data[nameMutationManyToManyData]
      console.log("dmtm",dMTM)
      path=[`getData${currentCategory.name}`]
        indexSize=1
        getPath(currentCategory.fields.filter(x=>
          x.dataType=="relationship"))
        console.log("pathmtm",path)
        ind=[]
        getIndexes()
        
      console.log("datamtm",data)
      console.log("cp",categoryProducts)
      let ncp={...categoryProducts}
      let currPiv={...ncp}
      for(let i in path){
        currPiv=currPiv[path[i]]
        if(tableIndexes[path[i]]>=0){
          currPiv=currPiv[tableIndexes[path[i]]]
          console.log("currPiv",currPiv)
        }
      }

      console.log("pam",currPiv)
      currPiv=currPiv.map(c=>{
        const comp=dMTM.filter(d=>{
          console.log("argsmtm",
          d[nameFieldKeyToDisplay],
          c.id)
          return d[nameFieldKeyToDisplay]==c.id
        })[0]
        return {...c,...comp}

      })
      console.log("curpivfinal",currPiv)
     const us=updateManyToManyState(categoryProducts,0,0,currPiv,titulo)
     dispatch(setCategoryProducts(us))

    }

  })
  

  useEffect(()=>{
    console.log("pcidbien",parentCatId)
    if(parentCatId!==-1){

      console.log("varmut",{
        variables:{
          [nameFieldKey]:parentCatId
        }
      })
      getMtmData({
        variables:{
          [nameFieldKey]:parentCatId
        }
      })
    }
  },[parentCatId])

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
    let parentCategory1
    let headers2={}
    if(isManyToMany){
      const parentCategory=categories.filter(x=>
        x.id==parentRelation)[0]
      let name=""
      if(parentCategory.name>respCat.name)
       name=`${respCat.name}_${parentCategory.name}`
      else
        name=`${parentCategory.name}_${respCat.name}`
    
      parentCategory1=categories.filter(x=>
        x.name==name)[0]
    }
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
    let totalFields=[...respCat.fields]
    const camp=[]
    if(products?.length>0){
      
      let headers=respCat.fields.map(h=>{
        if(h.dataType=="queryCategory"){

          return <>
            <th>{h.name} Global</th>
            <th>{h.name} Final</th>
            <th>{h.name} Product</th>
          </>

        }

        if(//products[0][h.name]!==undefined
          fieldsNotToDisplay[titulo]!==h.name){
          camp.push(h.name)
          return <th>{h.name}</th>
        }
      
      })
      if(isManyToMany){
        let fields2=parentCategory1.fields.filter(x=>{
          
          return !x.name.startsWith("mtm")
        }
          
        )
        fields2.map(d=>camp.push(d.name))
        totalFields=[...totalFields,...fields2]
        
        headers2=fields2.map(f=><th>{f.name}</th>)
        headers=[...headers,...headers2]
      }
      
      headers.unshift(<th>Id</th>)
      camp.unshift("id")
      headers.push(<th>Category</th>)
      camp.push("__typename")
      /*let headers=Object.keys(products[0]).map(p=>{
      
      <th>{p}</th>}
      )*/
      //headers.unshift(<th>Selected</th>)
      console.log("totalFields",totalFields,headers,camp,products)  
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
        
        for(let yu in totalFields){//respCat.fields){
          if(totalFields[yu].dataType=="relationship" 
          && products[p][totalFields[yu].name]!==undefined
          && yalohizo==false
          && fieldsNotToDisplay[titulo]!==totalFields[yu].name){
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
        console.log("praw",products,camp)
        //for(let p in products){
          for(let c in camp){//products[p]){
          /*let cc=categories.filter(v=>
            v.name==cname
          )*/
          //console.log("productsp",products[p],totalFields)
            let fs=totalFields.filter(x=>{
            
              return x.name==camp[c]
            })
            console.log("ccfields",fs)

          
            if(fs.length==1){
              if(fs[0].relationship=="onetomany"){
                data.push(<td>one to many</td>)
              }else if(fs[0].relationship=="manytomany"){
                if(fs[0].name!==fieldsNotToDisplay[titulo])
                  data.push(<td>many to many</td>)
              }else if(fs[0].declaredType=="date"){
                //if(producto[c]!==""){
              
                console.log("prodc",products[p][camp[c]])  
                let nf=trDateMex(products[p][camp[c]])
                console.log("nf",nf)
                //producto[c]=nf
                data.push(<td>{nf}</td>)
                //}
              }else if(fs[0].dataType=="queryCategory"){
                data.push(<td>products[p][`${products[p][camp[c]]}globalCatQuery`]</td>)
                data.push(<td>products[p][`${products[p][camp[c]]}finalCatQuery`]</td>)
                data.push(<td>products[p][`${products[p][camp[c]]}productQuery`]</td>)
              }else { 
                data.push(<td>{products[p][camp[c]]}</td>)
              }
            }else{
              data.push(<td>{products[p][camp[c]]}</td>)
            }
          }
        //}
        if(respCat.typeOfCategory==0){ 
          

          
          if(!hasSons(p)){
          data.push(<td><IoIosRemoveCircleOutline
            onClick={()=>{
              if(isManyToMany){
                const pr=categories.filter(x=>
                  x.id==parentRelation)[0]
                const f1=`mtm${pr.name}${respCat.name}Id`
                const f2=`mtm${respCat.name}${pr.name}Id`
                console.log("paramsdelmtm",{
                  [f1]: parentCatId,
                  [f2]: products[p]["id"]
                })
                deleteId=products[p]["id"]
                delete2({
                  variables:{
                    [f1]: parentCatId,
                    [f2]: products[p]["id"]
                  }
                })
              }else{
                deleteId=products[p]["id"]

                console.log("Paramsbien ",deleteId)
                
                delete2({
                  variables:{
                    id:products[p]["id"]
                  }
                })
              }
            }}
          />
          </td>)
        }else{
          data.push(<td></td>)
        }
          
        
        data.push(<td><BsPencilFill
        onClick={()=>{
          if(!isManyToMany){
            console.log("prodwholetable",products[p])
            toggleEditProduct(transformProduct(products[p]),respCat,tableIndexes,partials,titulo)
          }else{
            const parentCategory=categories.filter(x=>
              x.id==parentRelation)[0]
            let name=""
            if(parentCategory.name>respCat.name)
            name=`${respCat.name}_${parentCategory.name}`
            else
            name=`${parentCategory.name}_${respCat.name}`
            const curCat=categories.filter(x=>
              x.name==name && x.manyToMany==true
            )[0]
            const f1=`mtm${parentCategory.name}${respCat.name}Id`
            const f2=`mtm${respCat.name}${parentCategory.name}Id`
            console.log("paramsdelmtmedit",{
              [f1]: parentCatId,
              [f2]: products[p]["id"]
            })
            const keysEditRecord={
              [f1]: parentCatId,
              [f2]: products[p]["id"]
            }
            let curCatModified={...curCat}
            curCatModified.fields=curCatModified.fields.filter(x=>
              x.name!==f1 && x.name!==f2)
            if(curCatModified.fields.length>0)
              toggleEditProduct(transformProduct(products[p]),curCatModified,tableIndexes,partials,titulo,keysEditRecord)

          }
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
