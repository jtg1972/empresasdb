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
import e from 'cors';


const getMutationForDelete=(categoryName)=>{
  const mutation=`mutation Remove${categoryName}($id: Int) {
    remove${categoryName}(id: $id)

  }`
  //console.log("mutation",mutation)
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

 // console.log("Namedelmut",name)
  const mutation=`mutation Remove${name}($mtm${parentCategory.name}${category.name}Id: Int,
    $mtm${category.name}${parentCategory.name}Id: Int
    ) {
    remove${name}(mtm${parentCategory.name}${category.name}Id: $mtm${parentCategory.name}${category.name}Id,
      mtm${category.name}${parentCategory.name}Id: $mtm${category.name}${parentCategory.name}Id)

  }`
  //console.log("mutationdel",mutation)
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
    //console.log("productsmain",products)
    //console.log("parentcatid Singletable",parentCatId)
  console.log("parentRelationdisplaySingletable",parentRelation)
  const dispatch=useDispatch()
  let otrotitulo
  let resultado=[]
  let deleteId
  const {categoryProducts,
  categories,
  currentCategory}=useSelector(mapToState)
 // console.log("respcatst",respCat)
  //console.log("parentId",parentId)
  const updateState=(prods,indexPartials=0,indexArray=0,to,pt,st,rec)=>{
    console.log("entro  aqui",to,pt,st)  
    indexPartials=parseInt(indexPartials)
      indexArray=parseInt(indexArray)
      let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
    
    //  console.log("tipartials",ti,partials)
      let cp 
        
        partials=path
        ti=ind

      
      if(!Array.isArray(prods)){
        cp={...prods}
        //console.log("no arreglo")
        //console.log("prods partlength partials",prods,partials.length,partials)
        let ui
        //console.log("pip",partials[indexPartials],cp[partials[indexPartials]])
        //console.log("params",cp[partials[indexPartials]],indexPartials+1,indexArray)
        //console.log("se modifica campo",partials[indexPartials])
        //if((indexPartials+1)==partials.length){
        //console.log("importante",partials[indexPartials],titulo)
        if(partials[indexPartials]==to){
          let ni
          let nv
          console.log("to",to)
            
            nv=rec["id"]
            

          //console.log("ui",partials[indexPartials],cp[partials[indexPartials]])
          return {...cp,
            [partials[indexPartials]]:cp[partials[indexPartials]].map(x=>{
              //console.log("xid deleteid",x.id,deleteId,x.id!==deleteId)
              let n=`${pt}Id`// en el ejemplo mtmgruposalumnosid
              let m=`${st}Id`//en el ejemplo metmalumnosgruposid
              console.log("nm",n,m)
              let newR,newSr
              if(x.id==rec[m]){
              //estoy en tabla original y el id es igual al registro en
              //el campo de la primera tabla de muchos a muchos  
                newR=x[pt].filter(y=>{
                  if(y.id==rec[n]){
                    
                    if(y[n]==deleteRecord[n] && y[m]==deleteRecord[m]){
                      return false
                    }
                  }
                  return true
                })
                newSr=newR.map(j=>{
                  if(j[n]==rec[n]){
                    let nst
                    nst=j[st].filter(h=>{
                      if(h[m]==deleteRecord[m] && h[n]==deleteRecord[n])
                        return false
                      else
                        return true
                    
                    })
                    return {...j,[st]:nst}
                  }else
                    return j
                })
                return {...x,[pt]:newSr}
              }else
                return x
              }
            )
          }
        }else{
          //console.log("entro no final")
          return {...cp,[partials[indexPartials]]:updateState(cp[partials[indexPartials]],indexPartials+1,indexArray,to,pt,st,rec)}
        }
      
      } else if(Array.isArray(prods)){
        cp=[...prods]
        //console.log("arraglo",indexArray,ti.length)
        //console.log("deliddd",deleteId)
        //console.log("prods",prods)
          //console.log("partarr",cp[ti[indexArray]])
        //console.log("paramsarr",cp[ti[indexArray]],indexPartials,indexArray+1,titulo)
        let nv
        let nia
        //console.log("jorgevio",ti[indexArray])
        if(ti[indexArray].toString().startsWith("-")){
          nv=parseInt(ti[indexArray].substr(1))
          cp.forEach((x,indx)=>{
            if(x.id==nv){
              ti[indexArray]=indx
            }
        })    
      }      
        
        return cp.map((y,index)=>{
          if(index==ti[indexArray]){
            return updateState(cp[ti[indexArray]],indexPartials,indexArray+1,to,pt,st,rec)
          }
          return y
        })
      
      
    } 
      
  }
  /*original updatestate
  const updateState=(prods,indexPartials=0,indexArray=0,tit)=>{
    console.log("entro  aqui",tit)  
    indexPartials=parseInt(indexPartials)
      indexArray=parseInt(indexArray)
      let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
    
    //  console.log("tipartials",ti,partials)
      let cp 
        
        partials=path
        ti=ind

      
      if(!Array.isArray(prods)){
        cp={...prods}
        //console.log("no arreglo")
        //console.log("prods partlength partials",prods,partials.length,partials)
        let ui
        //console.log("pip",partials[indexPartials],cp[partials[indexPartials]])
        //console.log("params",cp[partials[indexPartials]],indexPartials+1,indexArray)
        //console.log("se modifica campo",partials[indexPartials])
        //if((indexPartials+1)==partials.length){
        //console.log("importante",partials[indexPartials],titulo)
        if(partials[indexPartials]==tit){
          let ni
          let nv
          console.log("tit titulo",tit,titulo)
          if(tit==titulo){
            nv=deleteRecord["id"]
            console.log("nifield1","id",deleteRecord["id"])

            
            //console.log("ni",ni,nv)
          } else{
            ni=`${otrotitulo}Id`
            console.log("nifield",ni,deleteRecord[ni])
            nv=deleteRecord[ni]

          }
          //console.log("ui",partials[indexPartials],cp[partials[indexPartials]])
          return {...cp,
            [partials[indexPartials]]:cp[partials[indexPartials]].filter(x=>{
              //console.log("xid deleteid",x.id,deleteId,x.id!==deleteId)
              return x.id!==nv//deleteId?true:false
            })}
        }else{
          //console.log("entro no final")
          return {...cp,[partials[indexPartials]]:updateState(cp[partials[indexPartials]],indexPartials+1,indexArray,tit)}
        }
      
      } else if(Array.isArray(prods)){
        cp=[...prods]
        //console.log("arraglo",indexArray,ti.length)
        //console.log("deliddd",deleteId)
        //console.log("prods",prods)
          //console.log("partarr",cp[ti[indexArray]])
        //console.log("paramsarr",cp[ti[indexArray]],indexPartials,indexArray+1,titulo)
        let nv
        let nia
        //console.log("jorgevio",ti[indexArray])
        if(ti[indexArray].toString().startsWith("-")){
          nv=parseInt(ti[indexArray].substr(1))
          cp.forEach((x,indx)=>{
            if(x.id==nv){
              ti[indexArray]=indx
            }
        })    
      }      
        
        return cp.map((y,index)=>{
          if(index==ti[indexArray]){
            return updateState(cp[ti[indexArray]],indexPartials,indexArray+1,tit)
          }
          return y
        })
      
      
    } 
      
  }
  termina original updatestate*/

  const updateManyToManyState=(prods,indexPartials=0,indexArray=0,reemp,titulo)=>{
    let cp 
    let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))

      /*if(prods==undefined || prods==[]
        ||prods=={})
        return null*/
        
        partials=path
        ti=ind

      //console.log("prodslog",prods)
      if(!Array.isArray(prods)){
        cp={...prods}
        //console.log("no arreglo")
        //console.log("prods partlength partials",prods,partials.length,partials)
        let ui
        //console.log("pip",partials[indexPartials],cp[partials[indexPartials]])
        //console.log("params",cp[partials[indexPartials]],indexPartials+1,indexArray)
        //console.log("se modifica campo",partials[indexPartials])
        //if((indexPartials+1)==partials.length){
        //console.log("importante",partials[indexPartials],titulo)
        let newRet=[]
        if(partials[indexPartials]==titulo){
          reemp.forEach((x,ind)=>{
            newRet[ind]=reemp[ind]
            
          })
          return {...cp, [partials[indexPartials]]:[...newRet]}
          /*console.log("ui",cp,partials[indexPartials],cp[partials[indexPartials]])
          console.log("entrofinal2",{...cp,
            [partials[indexPartials]]:reemp})
          return {...cp,
            [partials[indexPartials]]:reemp}*/
        }else{
          //console.log("entro no final")
          return {...cp,[partials[indexPartials]]:updateManyToManyState(cp[partials[indexPartials]],indexPartials+1,indexArray,reemp,titulo)}
        }
      
      }else if(Array.isArray(prods)){
        cp=[...prods]
        //console.log("arraglo",indexArray,ti.length)
        //console.log("deliddd",deleteId)
        //console.log("prods",prods)
          //console.log("partarr",cp[ti[indexArray]])
        //console.log("paramsarr",cp[ti[indexArray]],indexPartials,indexArray+1,titulo)
                  
        
        
        return cp.map((x,index)=>{
          if(index==ti[indexArray]){
            return updateManyToManyState(cp[ti[indexArray]],indexPartials,indexArray+1,reemp,titulo)
           } else
            return x
          })
          
          
        
      
      } 
      
  }

  let ind=[]
  let path
  
  const getIndexesInverse=(editableRecord,pivoteTable,otherPivoteTable)=>{
    for(let p in path){
      //console.log("ti pathp",tableIndexes,path[p])
      if(path[p]!==pivoteTable){
        let curInd
        curInd=tableIndexes[path[p]]
        ind.push(curInd)
      }else{
        if(path[p].startsWith("mtm")){
          ind=ind.splice(0,ind.length-1)
          console.log("pathp PATHP-1",path[p],path[p-1])
          ind=ind.splice(0,ind.length-2)
          const uy=`${pivoteTable}Id`
           ind.push(`-${editableRecord[uy]}`)
            let n=`${otherPivoteTable}Id`
            ind.push(`-${editableRecord[n]}`)
          
          const nn=`${pivoteTable}Id`
          ind.push(`-${editableRecord[nn]}`)
          
            
        
         
        }
      }
    }
  }
  /*original getIndexesinverse
  const getIndexesInverse=()=>{
    //console.log("fiartificial",fi)
    for(let p in path){
      //console.log("ti pathp",tableIndexes,path[p])
      if(path[p]!==otrotitulo){
        let curInd
        curInd=tableIndexes[path[p]]
        ind.push(curInd)
      }else{
        if(path[p].startsWith("mtm")){
          ind=ind.splice(0,ind.length-1)
          console.log("pathp PATHP-1",path[p],path[p-1])
          if(path[p-1].startsWith("mtm")){
            ind=ind.splice(0,ind.length-1)
            const uy=`${otrotitulo}Id`
           ind.push(`-${deleteRecord[uy]}`)
            let n=`${titulo}Id`
            ind.push(`-${deleteRecord[n]}`)
          
          const nn=`${otrotitulo}Id`
          ind.push(`-${deleteRecord[nn]}`)
          
            
        
          }else{
            //ind=ind.splice(0,ind.length-1)
            const pr=`${titulo}Id`
            ind.push(`-${deleteRecord[pr]}`)
            const n=`${otrotitulo}Id`

            ind.push(`-${deleteRecord[n]}`)
      
            //const nn=`${otrotitulo}Id`
            //ind.push(`-${fi[nn]}`)
            
          }
        }
      }
    }
  }termina original getIndexesinverse*/
  const getIndexes=()=>{
    
    for(let p in path){
      //console.log("ti pathp",tableIndexes,path[p])
      let curInd
      curInd=tableIndexes[path[p]]
      ind.push(curInd)
      
    }
    return ind
  }
  let indexSize=1
  
  const getPath=(fields,tit)=>{
    
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
        if(fields[f].name!==tit){
          const relCatId=fields[f].relationCategory
          const curCat=categories.filter(x=>x.id==relCatId)[0]
          
          
          const r=getPath(curCat.fields.filter(x=>x.dataType=="relationship"),tit)
          if(r==true)
              break
        }else{
          return true
        }
      }
    }else
      return

  }
  const checkHasSons=(prods,indexPartials=0,indexArray=0,tit)=>{
    console.log("entro  aqui",tit)  
  indexPartials=parseInt(indexPartials)
    indexArray=parseInt(indexArray)
    let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
  
  //  console.log("tipartials",ti,partials)
    let cp 
    /*if(prods==undefined || prods==[]
      ||prods=={})
      return null*/
      
      partials=path
      ti=ind

    
    if(!Array.isArray(prods)){
      cp={...prods}
      //console.log("no arreglo")
      //console.log("prods partlength partials",prods,partials.length,partials)
      let ui
      //console.log("pip",partials[indexPartials],cp[partials[indexPartials]])
      //console.log("params",cp[partials[indexPartials]],indexPartials+1,indexArray)
      //console.log("se modifica campo",partials[indexPartials])
      //if((indexPartials+1)==partials.length){
      //console.log("importante",partials[indexPartials],titulo)
      console.log("pip",partials[indexPartials],tit)
      if(partials[indexPartials]==tit){
        console.log("match")
        return cp[partials[indexPartials]]

      }else{
        //console.log("entro no final")
        return checkHasSons(cp[partials[indexPartials]],indexPartials+1,indexArray,tit)
      }
    
    } else if(Array.isArray(prods)){
      cp=[...prods]
      //console.log("arraglo",indexArray,ti.length)
      //console.log("deliddd",deleteId)
      //console.log("prods",prods)
        //console.log("partarr",cp[ti[indexArray]])
      //console.log("paramsarr",cp[ti[indexArray]],indexPartials,indexArray+1,titulo)
      let nv
      let nia
      //console.log("jorgevio",ti[indexArray])
      if(ti[indexArray].toString().startsWith("-")){
        nv=parseInt(ti[indexArray].substr(1))
        cp.forEach((x,indx)=>{
          if(x.id==nv){
            ti[indexArray]=indx
          }
      })    
    }      
      
      return checkHasSons(cp[ti[indexArray]],indexPartials,indexArray+1,tit)
        
    
    
  } 
    
}

  const hasSons=(indTable)=>{
    console.log("respcatresp",respCat)
    const fws=respCat.fields.filter(x=>
    x.dataType=="relationship" &&
    x.relationship=="onetomany")
    for(let cf in fws){
      /*if(fws[cf].relationship=="manytomany"){
        if(products[indTable][fws[cf].name]!==undefined){

          if(products[indTable][fws[cf].name].length>1){
            return true
          }
        }else{
          path=[`getData${currentCategory.name}`]
          ind=[]
          getPath(currentCategory.fields.filter(x=>
            x.dataType=="relationship"),fws[cf].name)
          
          const recsName=path[path.length-2]
          getIndexes()
          console.log("path ind",path,ind)
          const ot=`${otrotitulo}Id`
          const ui=checkHasSons(categoryProducts,0,0,products[indTable]["id"],products[indTable][ot],recsName,fws[cf].name)
          console.log("uiop",ui)
          if(ui==true)
            return true
        }/*/

      if(fws[cf].relationship=="onetomany"){
        if(products[indTable][fws[cf].name].length>0){
          return true
        }
      }
    }        
    return false
  
  }
  let deleteRecord={}
  let DELETE_PRODUCT=``
  if(!isManyToMany){
    DELETE_PRODUCT=getMutationForDelete(respCat.name)
  }else{
    DELETE_PRODUCT=getMutationForDeleteManyToMany(parentRelation,respCat,categories)
  }

  let parentCategory
  if(isManyToMany){
    parentCategory=categories.filter(x=>
    x.id==parentRelation)[0]
    otrotitulo=`mtm${parentCategory.name}${respCat.name}`
  }

  const updateClusters=(tablaoriginal,pivoteTable,otherPivoteTable)=>{
    console.log("entro clusters",pivoteTable)
    const recs=checkHasSons(categoryProducts,0,0,pivoteTable)
    console.log("recs",recs,pivoteTable,otherPivoteTable)
    let currentData=categoryProducts
    for(let x in recs){
      ind=[]
      getIndexesInverse(recs[x],pivoteTable,otherPivoteTable)
      currentData=updateState(currentData,0,0,tablaoriginal,otherPivoteTable,pivoteTable,recs[x])
      console.log("trans",ind,currentData)
    }
    dispatch(setCategoryProducts(currentData))
  }

  const [delete2]=useMutation(DELETE_PRODUCT,{
    update:(cache,{data})=>{
      let n
      if(!isManyToMany)
        n=`remove${respCat.name}`
      else{
        parentCategory=categories.filter(x=>
          x.id==parentRelation)[0]
        if(parentCategory.name>respCat.name)
          n=`remove${respCat.name}_${parentCategory.name}`
        else
          n=`remove${parentCategory.name}_${respCat.name}`
        if(data[n]==true){
          if(!isManyToMany){
            path=[`getData${currentCategory.name}`]
            indexSize=1
            getPath(currentCategory.fields.filter(x=>
            x.dataType=="relationship"),titulo)
            //console.log("path",path)
            ind=[]
            getIndexes()
            //console.log("indices",ind)
      
             let us=updateState(categoryProducts,0,0,titulo)
            //console.log("us",us)
              //dispatch(setCategoryProducts(us))
          }else{
            let pivoteTable,otherPivoteTable,tablaoriginal
            path=[`getData${currentCategory.name}`]
            indexSize=1
            getPath(currentCategory.fields.filter(x=>
              x.dataType=="relationship"),titulo)
            console.log("path1",path)
            if(path[path.length-2].startsWith("mtm")){
              pivoteTable=titulo
              otherPivoteTable=otrotitulo
              tablaoriginal=path[path.length-3]
            }else{
              pivoteTable=otrotitulo
              otherPivoteTable=titulo
              tablaoriginal=path[path.length-2]
            }
            path=[`getData${currentCategory.name}`]
            indexSize=1
            getPath(currentCategory.fields.filter(x=>
              x.dataType=="relationship"),pivoteTable)
            ind=[]
            getIndexesInverse(deleteRecord,pivoteTable,otherPivoteTable)
            updateClusters(tablaoriginal,pivoteTable,otherPivoteTable)
          }
          
        }
          
      }
    }
  })


  /*delete2 original
  const [delete2]=useMutation(DELETE_PRODUCT,{
    update:(cache,{data})=>{
      let n
      if(!isManyToMany)
        n=`remove${respCat.name}`
      else{
        parentCategory=categories.filter(x=>
          x.id==parentRelation)[0]
        
        if(parentCategory.name>respCat.name)
          n=`remove${respCat.name}_${parentCategory.name}`
        else
          n=`remove${parentCategory.name}_${respCat.name}`
      
      }
    
      if(data[n]==true){
        //console.log("tituloenc",titulo)
        path=[`getData${currentCategory.name}`]
        indexSize=1
        getPath(currentCategory.fields.filter(x=>
          x.dataType=="relationship"),titulo)
        //console.log("path",path)
        ind=[]
        getIndexes()
        //console.log("indices",ind)
      
        let us=updateState(categoryProducts,0,0,titulo)
        //console.log("us",us)
        //dispatch(setCategoryProducts(us))
        let entromtm=false
        let nj
        if(isManyToMany){
          entromtm=true
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
          const otrof1=`mtm${respCat.name}${parentCategory.name}Id`
          const otrof2=`mtm${parentCategory.name}${respCat.name}Id`
          otrotitulo=`mtm${parentCategory.name}${respCat.name}`
          path=[`getData${currentCategory.name}`]
          console.log("otrotitulo",otrotitulo)
          getPath(currentCategory.fields.filter(x=>
            x.dataType=="relationship"),otrotitulo)
          if(!path[path.length-2].startsWith("mtm")){

            ind=[]
            getIndexesInverse()
            console.log("indices2",ind)
            console.log("otot",otrotitulo)
            console.log("us",us)
            nj=updateState(us,0,0,otrotitulo)
      

          }else{
            const chs=checkHasSons(categoryProducts,0,0,otrotitulo)
            console.log("checkhassons",chs)
          }
        }
        if(entromtm)
          dispatch(setCategoryProducts(nj))
        else 
          dispatch(setCategoryProducts(us))
      
        //console.log("tableIndexes",tableIndexes)
      }
    }
  })end delete2 original/*

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
  //console.log("repmut",repMut)
  const [getMtmData]=useMutation(repMut,
    {update:(cache,{data})=>{
      const dMTM=data[nameMutationManyToManyData]
      //console.log("dmtm",dMTM)
      path=[`getData${currentCategory.name}`]
        indexSize=1
        getPath(currentCategory.fields.filter(x=>
          x.dataType=="relationship"))
        //console.log("pathmtm",path)
        ind=[]
        getIndexes()
        
      //console.log("datamtm",data,path)
      //console.log("cp",categoryProducts)
      let ncp={...categoryProducts}
      let currPiv={...ncp}
      //console.log("indcurrpiv",path,currPiv,ind)
      
      let i=0
      let j=0
      for(;;){
        //console.log("ii",i)
        if(Array.isArray(currPiv)){
          if(parseInt(ind[i])>=0){
            currPiv=currPiv[ind[i]]
            //console.log("currPivcic",currPiv)
            i++
          }else
            break
        }else{
          //console.log("en22")
          currPiv=currPiv[path[j]]
          //console.log("bit",path[j],titulo)
          if(path[j]==titulo){
            //console.log("pathtitulo")
            j++
            break
          }
          j++
          //console.log("path1",path[j])
        }

        
      }

      //console.log("pam0",currPiv,path)
      currPiv=currPiv.map(c=>{
        //console.log("dMTM",dMTM)
        const comp=dMTM.filter(d=>{
          /*console.log("argsmtm",
          nameFieldKeyToDisplay,
          d[nameFieldKeyToDisplay],
          c.id)*/
          /*return d[nameFieldKeyToDisplay]==c.id 
        })
        //console.log("comp",comp)
        if(comp){
          return {...c,...comp[0]}
        }
        //else
          //return c

      })
      //console.log("curpivfinal",currPiv,categoryProducts)
     const us=updateManyToManyState(categoryProducts,0,0,currPiv,titulo)
     //console.log("usbien",us)
     dispatch(setCategoryProducts(us))
     //setLoadedIds([...loadedIds,parentCatId])

     //setLoadedIds([...loadedIds,parentCatId])

    }

  })*/
  
  const [loadedIds,setLoadedIds]=useState([])
 /*useEffect(()=>{
    //setTableIndexes(e=>({...e,[titulo]:-1}))
    
    console.log("pcidbien",parentCatId)
    if(parentCatId!==-1){ //&& !loadedIds.includes(parentCatId)){
      
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
  },[parentCatId])*/

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
      x.relationship=="otmdestiny" ||
      x.relationship=="manytomany").length
      //console.log("y pARENTID",y,parentId)
    if(y==0 || titulo.startsWith("getData"))
      return true
    else if(y>0 && parentId>0)
      return true
    else
      return false
  }

  const res=()=>{
    //console.log("displtable",products,respCat)
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
      onClick={()=>{
        console.log("parentRelatiion1",parentRelation)
        toggleNewProduct(respCat,tableIndexes,partials,titulo,parentId,isManyToMany,relationCategory,parentRelation,parentCatId)
      }
      }
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
    let camp=[]
    if(products?.length>0){
      
      let headers=respCat.fields.map(h=>{
        /*if(h.dataType=="queryCategory"){

          return <>
            <th>{h.name} Global</th>
            <th>{h.name} Final</th>
            <th>{h.name} Product</th>
          </>

        }*/

        if(//products[0][h.name]!==undefined
          fieldsNotToDisplay[titulo]!==h.name){
          camp.push(h.name)
          return <th>{h.name}</th>
        }
      
      })
      if(isManyToMany){
        /*let fields2=parentCategory1.fields.filter(x=>{
          
          return x.name.startsWith("mtm")
        }
          
        )
        )*/
        let fields2=parentCategory1.fields
        fields2.forEach(d=>{
          //if(!d.name.startsWith("mtm")){
            camp.push(d.name)
          //}
        })
        totalFields=[...totalFields,...fields2]
        //console.log("tf camp",totalFields,camp)
        headers=camp.map(f=><th>{f}</th>)
        //headers=[...headers,...headers2]
      }
      
      headers.unshift(<th>Id</th>)
      camp.unshift("id")
      headers.push(<th>Category</th>)
      camp.push("__typename")
      //console.log("camp",camp)
      /*let headers=Object.keys(products[0]).map(p=>{
      
      <th>{p}</th>}
      )*/
      //headers.unshift(<th>Selected</th>)
      //console.log("totalFields",totalFields,headers,camp,products)  
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
        //console.log("producto",products[p])
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
          let m=indice
          data.push(<td>
            <input type="radio" name={titulo}
            onChange={(e)=>{
              
              //console.log("indice",indice,e.target.value,titulo)
              //console.log("impser",{...tableIndexes,[titulo]:e.target.value})
              setTableIndexes(ti=>({...ti,[titulo]:m}))
              }

              
            }
            
            value={tableIndexes[titulo]}
            
            />
          </td>)
          indice++
        }
        //console.log("praw",products,camp)
        //for(let p in products){
          for(let c in camp){//products[p]){
          /*let cc=categories.filter(v=>
            v.name==cname
          )*/
          //console.log("productsp",products[p],totalFields)
            let fs=totalFields.filter(x=>{
            
              return x.name==camp[c]
            })
            //console.log("ccfields",fs)

          
            if(fs.length==1){
              if(fs[0].relationship=="onetomany"){
                data.push(<td>one to many</td>)
              }else if(fs[0].relationship=="manytomany"){
                if(fs[0].name!==fieldsNotToDisplay[titulo])
                  data.push(<td>many to many</td>)
              }else if(fs[0].declaredType=="date"){
                //if(producto[c]!==""){
              
                //console.log("prodc",products[p][camp[c]])  
                let nf=trDateMex(products[p][camp[c]])
                //console.log("nf",nf)
                //producto[c]=nf
                data.push(<td>{nf}</td>)
                //}
              }/*else if(fs[0].dataType=="queryCategory"){
                //data.push(<td>{products[p][`${products[p][camp[c]]}GlobalCatQuery`]}</td>)
                //data.push(<td>{products[p][`${products[p][camp[c]]}FinalCatQuery`]}</td>)
                data.push(<td>{products[p][`${products[p][camp[c]]}ProductQuery`]}</td>)
              }*/else { 
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
                /*console.log("paramsdelmtm",{
                  [f1]: parentCatId,
                  [f2]: products[p]["id"]
                })*/
                deleteId=products[p]["id"]
                deleteRecord=products[p]

                delete2({
                  variables:{
                    [f1]: parentCatId,
                    [f2]: products[p]["id"]
                  }
                })
              }else{
                deleteId=products[p]["id"]

                //console.log("Paramsbien ",deleteId)
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
            //console.log("prodwholetable",products[p])
            toggleEditProduct(transformProduct(products[p]),respCat,tableIndexes,partials,titulo,{})
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
            const otrof1=`mtm${respCat.name}${parentCategory.name}Id`
            const otrof2=`mtm${parentCategory.name}${respCat.name}Id`
            otrotitulo=`mtm${parentCategory.name}${respCat.name}`
            //console.log("otrotitulo222",otrotitulo)
            /*console.log("paramsdelmtmedit",{
              [f1]: parentCatId,
              [f2]: products[p]["id"]
            })*/
            const keysEditRecord={
              [f1]: parentCatId,
              [f2]: products[p]["id"]
            }
            
            let curCatModified={...curCat}
            curCatModified.fields=curCatModified.fields.filter(x=>
            x.name!==f1 && x.name!==f2)
            let indexInTable
            if(curCatModified.fields.length>0){
              //let m=indice
              //console.log("mmm",m)
              //keysEditRecord[f2]=products[m]["id"]
              //setTableIndexes(x=>({...x,[titulo]:p}))
              
              toggleEditProduct(transformProduct(products[p]),curCatModified,tableIndexes,partials,titulo,keysEditRecord,otrotitulo,p,parentRelation)
            }

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
            //console.log("parentcadid single table",parentCatId)
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
