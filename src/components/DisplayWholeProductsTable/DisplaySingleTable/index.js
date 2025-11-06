import { gql, useMutation } from '@apollo/client'
import React,{useState,useEffect} from 'react'
import { BsPencilFill } from 'react-icons/bs'
import FormButton from '../../Forms/FormButton'
import { IoIosRemoveCircleOutline, IoMdFunnel } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import {setCategoryProducts} from '../../../redux/category/actions'
import { FcLeftDown2 } from 'react-icons/fc';
import { asyncMap, valueToObjectRepresentation } from '@apollo/client/utilities';
import { isConstValueNode } from 'graphql';
import e from 'cors';
import getIndexesInverse from '../../../gql/updatestatemtm/utils/getIndexesInverse';
import getIndexes from '../../../gql/updatestatemtm/utils/getIndexes';

//import simpleUpdateState from '../../../gql/updatestatemtm/DeleteProduct/simpleUpdateState';
import checkHasSons from '../../../gql/updatestatemtm/utils/checkHasSons';
import updateState from '../../../gql/updatestatemtm/DeleteProduct/updateState';
import { resultPath } from '../../../gql/updatestatemtm/utils/getPath';
import getMutationForDelete from '../../../gql/getMutationForDelete';
import getMutationForDeleteManyToMany from '../../../gql/getMutationForDeleteManyToMany';
import types from '../../../redux/mtmupdate/types';
import { registerables } from 'chart.js';
import { typesOtm } from '../../../redux/otmupdate/types';


/*const getMutationForDelete=(categoryName)=>{
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

}*/
const mapToState=({categories,routes,routesOtm})=>({
  categoryProducts:categories.categoryProducts,
  categories:categories.categories,
  currentCategory:categories.currentCategory,
  mtmRoutes:routes.routes,
  indexes:routes.indexes,
  indexesOtm:routesOtm.indexesOtm
})

const DisplaySingleTable = ({
  titulo,
  segmentRoutes,
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
  nameMutationManyToManyData,
  setDqIds,
  dqIds,
  checkBoxDataFields,
  updateCategories,
  updateCategoriesIds,
      setUpdateCategoriesIds,
      parentRecord,
      setParentRecord
  })=>{
    //console.log("productsmain",products)
    //console.log("parentcatid Singletable",parentCatId)
  
  console.log("segmentRoutes",segmentRoutes)
  console.log("parrecst",parentRecord)
  const dispatch=useDispatch()

  
  let otrotitulo
  let resultado=[]
  let deleteId
  const {
    categoryProducts,
    categories,
    currentCategory,
    mtmRoutes,
    indexes,
    indexesOtm
    
    
  }=useSelector(mapToState)
    //console.log("updcat",respCat.name,updateCategories,updateCategories?.[respCat.name])
    //console.log("paramsact",indexes,titulo,parentId,indexesOtm)
    //console.log()
    //console.log("parentRelationdisplaySingletable",parentRelation,categories,categories.filter(x=>x.id==parentRelation)?.[0]?.fields.filter(x=>(x.declaredType=="string" || x.declaredType=="number")),respCat.fields.filter(x=>(x.declaredType=="string" || x.declaredType=="number")))
  let newRoutesSeg=[]
    useEffect(()=>{
      
      dispatch({
        type:types.ADD_SEGMENT_TO_ROUTE,
        payload:{
          segment:titulo,
          route:segmentRoutes
        }
      })
      
      
    },[])

    /*useEffect(()=>{
      console.log("mtmroutesver",mtmRoutes,parentId)
      actEdit()
    },[])*/
    /*
    dispatch({
                    type:typesOtm.ADD_INDEXES_TO_OTMRECORD,
                    payload:{
                      category:z.name,
                      id:"delete_main",
                      action:"DELETE_MAIN",
                      otherId:deleteId,
                      firstStage:true,
                      otherMtmRel
                    }
                  })
    */
    useEffect(()=>{
      actEdit()
    },[indexesOtm?.[titulo]?.edit?.length,parentId])
  useEffect(()=>{
    actDelete()
  },[indexesOtm?.[titulo]?.delete_main?.length,parentId])
    useEffect(()=>{
      setUpdateCategoriesIds(x=>{
        let y=x
        if(y[titulo]!=undefined)
          y={...y,[titulo]:0}
        y={...y,[titulo]:parentId}
        //console.log("catsids",y)
        return y
        
      })
    },[parentId])
    useEffect(()=>{
      //if(titulo.startsWith("mtm")){
        
       
      //}
    },[])
    useEffect(()=>{
      
      let ncp=categoryProducts
     //console.log("paramsact",indexes,titulo,parentId,indexesOtm)
      parentId=parentId
      let cur
      //if(titulo.startsWith("otm"))
        cur=indexesOtm
      
       // console.log("entrouuuu",cur,mtmRoutes,indexes,indexesOtm)//?.[titulo]?.[parentId])
       console.log("curtitulo",cur?.[titulo])
      if(cur?.[titulo]?.[parentId]?.length>0){
      if(cur?.[titulo]!=undefined){
        if(cur?.[titulo]?.[parentId]!=undefined){
          cur?.[titulo]?.[parentId]?.forEach(x=>{
            let typeRel
            if(x.action=="ADD"){
              let i=getIndexes(tableIndexes,segmentRoutes)
              
              console.log("parui",ncp,x.row,titulo,segmentRoutes,i)  
              if(i.length>0 && segmentRoutes.length>0){
               ncp=simpleUpdateStateHere1(ncp,x.row,titulo,segmentRoutes,i)
             }
            }
          
            /*if(x.action=="EDIT"){
              let i=getIndexes(tableIndexes,mtmRoutes[titulo])
              console.log("paramsacttab",ncp,x.row,titulo,mtmRoutes,mtmRoutes[titulo],i,x.row.original,x.row.copy)
              if(i.length>0 && mtmRoutes[titulo].length>0)
                ncp=simpleUpdateStateHereEdit(ncp,x.row,titulo,mtmRoutes[titulo],i)
            }*/
            if(x.action=="DELETE"){
              let i=getIndexes(tableIndexes,segmentRoutes)
              //console.log("checbien",i,segmentRoutes)
              //console.log("paramsacttabdel",ncp,titulo,nameVar1,nameValue1,nameVar2,nameValue2)
              //console.log("xuio",x)
              console.log("xyuyu",x)
              if(i.length>0 && segmentRoutes.length>0)
            
                ncp=simpleUpdateStateHereDelete(ncp,x.otherId,titulo,segmentRoutes,i)

            }
            
          })
          dispatch(setCategoryProducts(ncp))
          if(titulo.startsWith("otm"))
          dispatch({
            type:typesOtm.DELETE_INDEX_TO_OTMRECORD,
            payload:{
              category:titulo,
              id:parentId
            }
          })
        
          
          
          
        }
      }
    }
    },[indexesOtm?.[titulo]?.[parentId]?.length,parentId])
   /* useEffect(()=>{
      
      let ncp=categoryProducts
      //console.log("paramsact",indexes,titulo,parentId,indexesOtm)
      parentId=parentId
      let cur
      //if(titulo.startsWith("mtm"))
        cur=indexes
       // console.log("entrouuuu",cur,mtmRoutes,indexes,indexesOtm)//?.[titulo]?.[parentId])
      if(cur?.[titulo]?.[parentId]?.length>0){
      if(cur?.[titulo]!=undefined){
        if(cur?.[titulo]?.[parentId]!=undefined){
          cur?.[titulo]?.[parentId]?.forEach(x=>{
            let typeRel
            if(x.action=="ADD"){
              let i=getIndexes(tableIndexes,mtmRoutes?.[titulo])
              
             // console.log("parui",ncp,x.row,titulo,mtmRoutes?.[titulo],i)  
              if(i.length>0 && mtmRoutes?.[titulo]?.length>0){
               ncp=simpleUpdateStateHere1(ncp,x.row,titulo,segmentRoutes,i)
              }
             }
            if(x.action=="EDIT"){
              let i=getIndexes(tableIndexes,mtmRoutes[titulo])
            //  console.log("paramsacttab",ncp,x.row,titulo,mtmRoutes,mtmRoutes[titulo],i,x.row.original,x.row.copy)
              if(i.length>0 && mtmRoutes[titulo].length>0)
                ncp=simpleUpdateStateHereEdit(ncp,x.row,titulo,mtmRoutes[titulo],i)
            }
            if(x.action=="DELETE"){
              let i=getIndexes(tableIndexes,mtmRoutes[titulo])
            //  console.log("paramsacttabdel",ncp,titulo,mtmRoutes[titulo],i,x.otherId)
              if(i.length>0 && mtmRoutes[titulo].length>0)
                ncp=simpleUpdateStateHereDelete(ncp,parentId,x.otherId,titulo,mtmRoutes[titulo],i)

            }
            
          })
          dispatch(setCategoryProducts(ncp))
          
          
          dispatch({
            type:types.DELETE_INDEX_TO_MTMRECORD,
            payload:{
              category:titulo,
              id:parentId
            }
          })  

          
          
          
        }
     
    }
    }},[indexes?.[titulo]?.[parentId]?.length])*/

    const actEdit=()=>{
      let ncp=categoryProducts
      
      //console.log("indexespo",newRoutesSeg,indexesOtm?.[titulo]?.edit?.length,indexesOtm?.[titulo]?.edit,ncp)
      let rt=""
   /*if(titulo.startsWith("getData"))
        rt=titulo.substring(7)*/
      //else
        //rt=titulo
        console.log("iotm",indexesOtm,rt,titulo)
      if(indexesOtm?.[titulo]?.edit?.length>0){
        indexesOtm?.[titulo]?.edit?.forEach(x=>{
          let i=getIndexes(tableIndexes,segmentRoutes)    
      console.log("paramsacttab77",x,ncp,x.row,rt,segmentRoutes,newRoutesSeg,i)
          //if(i.length>0 && segmentRoutes.length>0)
            ncp=simpleUpdateStateHereEdit(ncp,x.row,rt,segmentRoutes,i)
        })
      }
      console.log("ncpbien",ncp)
      dispatch(setCategoryProducts(ncp))
      /*dispatch({
        type:types.ADD_SEGMENT_TO_ROUTE,
        payload:{
          segment:titulo,
          route:segmentRoutes
        }
      })*/
          
          
          /*dispatch({
            type:typesOtm.DELETE_INDEX_TO_OTMRECORD,
            payload:{
              category:titulo,
              id:"edit"
            }
          })*/
    }
    const actDelete=()=>{
      let ncp=categoryProducts
      
      //console.log("indexespo",newRoutesSeg,indexesOtm?.[titulo]?.edit?.length,indexesOtm?.[titulo]?.edit,ncp)
      

      if(indexesOtm?.[titulo]?.delete_main?.length>0){
        indexesOtm?.[titulo]?.delete_main?.forEach(x=>{
          let i=getIndexes(tableIndexes,segmentRoutes)    
      //console.log("paramsacttab",x,ncp,x.row,titulo,segmentRoutes,newRoutesSeg,i)
          if(i.length>0 && segmentRoutes.length>0)
            ncp=simpleUpdateStateHereDeleteMain(ncp,x.firstStage,x.otherMtmRel,x.otherId,titulo,segmentRoutes,i)
        })
      }
      console.log("ncpbien",ncp)
      dispatch(setCategoryProducts(ncp))
      /*let st=cp[c1[0]][i[0]]
      for(let u1=1;u1<c1.length;u1++){

        if(st[c1[u1]]){
          if(u1<c1.length-1){ 
            //console.log("stverif222",st[c1][u1],c1,i,c1[u1],nameVar1,parentId,otherId)

            st=st[c1[u1]][i[u1]]
          }else{
           // console.log("stveriffin",st[c1[u1]])
            st[c1[u1]]=st[c1[u1]].filter(x=>{
             // console.log("xorig")
              return x["id"]!=id1 
              
            })
          }
        }
      }
      return cp*/
    }
    const simpleUpdateStateHereDeleteMain=(cp,firstStage,otherMtmRel,otherId,titulo,c1,i)=>{
      let st=cp[c1[0]][i[0]]
      console.log("entrohum")
      for(let u1=1;u1<c1.length;u1++){

        if(st[c1[u1]]){
          if(u1<c1.length-1){ 
            //console.log("stverif222",st[c1][u1],c1,i,c1[u1],nameVar1,parentId,otherId)

            st=st[c1[u1]][i[u1]]
          }else{
           // console.log("stveriffin",st[c1[u1]])
            st[c1[u1]]=st[c1[u1]].filter(x=>{
             // console.log("xorig")
             
              return x[otherMtmRel]!=otherId 
              
            })
          }
        }
      }
      return cp
    }


    const simpleUpdateState=(cp1,titulo,c1,i,deleteId)=>{
      let cp=cp1
      let st
      for(let po=0;po<c1.length;po++){
        if(po>=c1.length-1)
          i[po]=undefined
      }
    
      //console.log("titio",titulo)
      if(titulo.startsWith("getData")){
        cp[titulo]=cp[titulo].filter(x=>{
         // console.log("xverio",x.id,deleteId)
          if(x.id==deleteId)
            return false
          else
            return true
        })
      }else{
        st=cp[c1[0]][i[0]]
        for(let u1=1;u1<c1.length;u1++){
         // console.log("stverif",c1,i,c1[u1])
          if(st[c1[u1]]){
            if(i[u1]!=undefined) 
              st=st[c1[u1]][i[u1]]
            else
              st[c1[u1]]=st[c1[u1]].filter(x=>{
                if(x.id==deleteId)
                  return false
                else
                  return true
              })
              
              
          }
        }
      }
      return cp
    
    }
//ncp,x.otherId,titulo,segmentRoutes,i
    const simpleUpdateStateHereDelete=(cp,id1,titulo,c1,i)=>{
    console.log("dataespec2221",cp,id1,titulo,c1,i)
     /* for(let po=0;po<c1?.length;po++){
        if(po>=c1?.length-1)
          i[po]=undefined
      }*/
      let st=cp[c1[0]][i[0]]
      for(let u1=1;u1<c1.length;u1++){

        if(st[c1[u1]]){
          if(u1<c1.length-1){ 
            //console.log("stverif222",st[c1][u1],c1,i,c1[u1],nameVar1,parentId,otherId)

            st=st[c1[u1]][i[u1]]
          }else{
           // console.log("stveriffin",st[c1[u1]])
            st[c1[u1]]=st[c1[u1]].filter(x=>{
             // console.log("xorig")
              return x["id"]!=id1 
              
            })
          }
        }
      }
      return cp
    }
    //ncp,x.row,titulo,mtmRoutes[titulo],i
    const simpleUpdateStateHere1=(cp1,reg,titulo,c1,i)=>{
      let cp=cp1
      let st
      let bien=false
      console.log("c1uio",c1,cp[c1[0]])
      
      st=cp[c1[0]][i[0]]
      console.log("sr",c1)
      if(c1.length==1){
        cp[c1[0]].push(reg)
      }else{
      for(let u1=1;u1<c1.length;u1++){
        console.log("stverif77",st,reg,c1,i,c1[u1])

        if(st[c1[u1]]){
          if(u1<c1.length-1) 
            st=st[c1[u1]][i[u1]]
          else{
            let found=false
            st[c1[u1]].map(x=>{
              if(x.id==reg.id){
                found=true
                return reg
              }
              else
                return x
            })
            if(found==false)
              st[c1[u1]]=[...st[c1[u1]],reg]
          

          }
        }
      }
    }
      return cp
    }

    const simpleUpdateStateHereEdit=(ncp,reg,tit,c1,i,cf,pmtm)=>{
      console.log("regio",reg,tit,c1,i)
      let cp=ncp
      /*for(let po=0;po<c1?.length;po++){
        if(po>=c1.length-1)
          i[po]=undefined
      }*/
    let st=[]
    if(c1.length==1){
      console.log("entrouuu",cp)
      cp[c1[0]]=cp[c1[0]].map(x=>{
        
        if(x.id==reg.id){
          console.log("entroee",reg,x.id)
          return {...x,...reg}
        }
        return x
      })
    }else{
      st=cp[c1[0]][i[0]]
      for(let u1=1;u1<c1.length;u1++){
        console.log("stverif",tit,u1,st,c1,i,c1[u1])//,nameVar1,nameVar2,valueVar1,valueVar2)
        if(st[c1[u1]]){
          if(u1<c1.length-1) 
            st=st[c1[u1]][i[u1]]
          else{
            console.log("st[c1]",st[c1[u1]])
            st[c1[u1]]=st[c1[u1]].map(x=>{
              if(x.id==reg.id){
                /*if(tit.startsWith("mtm")){
                  //if(pmtm==false){
                    let nc={}
                    let np=false
                    cf?.forEach(y=>{
                      if(reg?.[y.name]!=undefined)
                        nc={...nc,[y.name]:reg[y.name]}
                      else
                        np=true
                        
                    })
                    
                    //nc["id"]=reg["id"]
                    console.log("cfio",nc,cf,{...reg,...nc},"np",np,tit)
                    if(!np)
                      return {...x,...nc}
                    

                }*/
                console.log("xreg",{...x,...reg})
                return {...x,...reg}
                
              }else
                return x
            })
            console.log("st[c1]",st[c1[u1]])
          }
          
        }
      }
    }
  //console.log("entro clusters",c1,i)
    return cp
  }
   // console.log("mtmroutesver",mtmRoutes,titulo,tableIndexes,parentId,indexes)
  // console.log("respcatst",respCat)
  //console.log("parentId",parentId)

  /*const simpleUpdateState=(prods,indexPartials=0,indexArray=0,tit)=>{
    //console.log("entro  aqui",to,pt,st)  
    indexPartials=parseInt(indexPartials)
      indexArray=parseInt(indexArray)
      let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
    
    //  console.log("tipartials",ti,partials)
      let cp 
        
        partials=path
        ti=ind

      console.log("titdeleteid",tit,deleteId)
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
          
          //console.log("ui",partials[indexPartials],cp[partials[indexPartials]])
          return {...cp,
            [partials[indexPartials]]:cp[partials[indexPartials]].filter(x=>
              x.id!==deleteId
            )}
        }else{
          //console.log("entro no final")
          return {...cp,[partials[indexPartials]]:simpleUpdateState(cp[partials[indexPartials]],indexPartials+1,indexArray,tit)}
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
            return simpleUpdateState(cp[ti[indexArray]],indexPartials,indexArray+1,tit)
          }
          return y
        })
      
      
    }
  }
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
      
  }*/
  

  /*let ind=[]
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
*/

const formatHour=(h,m)=>{
  if(h.toString().length==1)
    h="0"+h
  if(m.toString().length==1)
    m="0"+m
  return h+":"+m
}

const formatDate=(d,m,y)=>{
  if(d.toString().length==1)
    d="0"+d
  if(m.toString().length==1)
    m="0"+m
  return d+"/"+m+"/"+y
}
  const hasSons=(indTable)=>{
    console.log("respcatresp",respCat)
    const fws=respCat.fields.filter(x=>
    x.dataType=="relationship" &&
    (x.relationship=="onetomany"
    || x.relationship=="manytomany"))
    for(let cf in fws){
      
      if(fws[cf].relationship=="onetomany" ||
      fws[cf].relationship=="manytomany"){
        if(!isManyToMany)
          if(products?.[indTable]?.[fws?.[cf]?.name]?.length>0){
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
  const makeOtherMtmTable=(cp,id,otherId)=>{
    console.log("parentdelete",{


      type:typesOtm.ADD_INDEXES_TO_OTMRECORD,
      payload:{
        category:`mtm${respCat.name}${parentCategory.name}`,
        id:otherId,
        action:"DELETE",
        otherId:id,
        
        //categories.filter(x=>x.id==parentRelation)?.[0]?.fields.filter(x=>(x.declaredType=="string" || x.declaredType=="number")),respCat.fields.filter(x=>(x.declaredType=="string" || x.declaredType=="number"))


      }},{
        type:typesOtm.ADD_INDEXES_TO_OTMRECORD,
        payload:{
          category:`mtm${parentCategory.name}${respCat.name}`,
          id,
          action:"DELETE",
          otherId,
          
          
  
  
        }
      }
      )
      /*displayFields:respCat.fields.filter(x=>(x.declaredType=="string" || x.declaredType=="number"))
      displayFields:categories.filter(x=>x.id==parentRelation)?.[0]?.fields.filter(x=>(x.declaredType=="string" || x.declaredType=="number"))*/
    dispatch({


      type:typesOtm.ADD_INDEXES_TO_OTMRECORD,
      payload:{
        category:`mtm${respCat.name}${parentCategory.name}`,
        id:otherId,
        action:"DELETE",
        otherId:id,
        


      }
    })
    dispatch({
      type:typesOtm.ADD_INDEXES_TO_OTMRECORD,
      payload:{
        category:`mtm${parentCategory.name}${respCat.name}`,
        id,
        action:"DELETE",
        otherId,
        


      }
    })
    /*dispatch({


      type:types.ADD_INDEXES_TO_MTMRECORD,
      payload:{
        mtm:`mtm${parentCategory.name}${respCat.name}`,
        id,
        action:"DELETE",
        otherId:otherId,
        


      }
    })
    dispatch({
      type:types.ADD_INDEXES_TO_MTMRECORD,
      payload:{
        mtm:`mtm${respCat.name}${parentCategory.name}`,
        id:otherId,
        action:"DELETE",
        otherId:id,
        


      }
    })*/
  }

  const updateClusters=(c1,i)=>{
  
      let cp=categoryProducts
      let st=cp[c1[0]][i[0]]
      for(let u1=1;u1<c1.length;u1++){
        console.log("stverif",st,c1,i,c1[u1],nameVar1,nameVar2,valueVar1,valueVar2)
        if(st[c1[u1]]){
          if(i[u1]!=undefined) 
            st=st[c1[u1]][i[u1]]
          else{
            st[c1[u1]]=st[c1[u1]].filter(x=>{
              return x?.["original"][nameVar1]!=valueVar1 
              || x?.["original"][nameVar2]!=valueVar2 
            })
            
          }
        }
      }
      makeOtherMtmTable(cp,valueVar2,valueVar1)
     //console.log("entro clusters",c1,i)
      return cp
    
    
  }

  const getRecord=()=>{

  }

  const [delete2]=useMutation(DELETE_PRODUCT,{
    update:(cache,{data})=>{
      let n
    console.log("datan",data)
    

    if(!isManyToMany){
        n=`remove${respCat.name}`
      
    }else{
        parentCategory=categories.filter(x=>
          x.id==parentRelation)[0]
        if(parentCategory.name>respCat.name)
          n=`remove${respCat.name}_${parentCategory.name}`
        else
          n=`remove${parentCategory.name}_${respCat.name}`
    }
      if(data[n]==true){
        let campos
        let tcampos=[]
        if(titulo.substring(7)==currentCategory.name){
          for(let c=0;c<categories.length;c++){
            campos=categories[c].fields.filter(z=>{
              if(z.relationCategory==currentCategory.id)
               console.log("paramsuiyt",currentCategory.id,z.name,z.relationship,z.relationCategory,parseInt(z.relationCategory)==parseInt(currentCategory.id),
               ((z.relationship=="manytomany" ||
               z.relationship=="onetomany") && parseInt(z.relationCategory)==parseInt(currentCategory.id)))
              if((z.relationship=="manytomany" ||
               z.relationship=="onetomany") && parseInt(z.relationCategory)==parseInt(currentCategory.id)){
                let otherMtmRel
                if(z.relationship=="manytomany"){
                  
                  otherMtmRel=`mtm${categories[c].name}${currentCategory.name}`
                  console.log("bothmtm",z.name,otherMtmRel,{
                    category:z.name,
                    id:"delete_main",
                    action:"DELETE_MAIN",
                    otherId:deleteId,
                    firstStage:true,
                    otherMtmRel:`${z.name}Id`
                  },
                  {
                    category:otherMtmRel,
                    id:"delete_main",
                    action:"DELETE_MAIN",
                    otherId:deleteId,
                    firstStage:true,
                    otherMtmRel:`${z.name}Id`
                  })
                
                
                  dispatch({
                    type:typesOtm.ADD_INDEXES_TO_OTMRECORD,
                    payload:{
                      category:z.name,
                      id:"delete_main",
                      action:"DELETE_MAIN",
                      otherId:deleteId,
                      firstStage:true,
                      otherMtmRel:`${z.name}Id`
                    }
                  })
                  dispatch({
                    type:typesOtm.ADD_INDEXES_TO_OTMRECORD,
                    payload:{
                      category:otherMtmRel,
                      id:"delete_main",
                      action:"DELETE_MAIN",
                      otherId:deleteId,
                      firstStage:true,
                      otherMtmRel:`${z.name}Id`
                    }
                  })
                }else{
                  dispatch({
                    type:typesOtm.ADD_INDEXES_TO_OTMRECORD,
                    payload:{
                      category:z.name,
                      id:"delete_main",
                      action:"DELETE_MAIN",
                      otherId:deleteId,
                      firstStage:false,
                      
                    }
                  })

                }
                  
                
                
              }
            })
            tcampos=[...tcampos,...campos]


            
          }
          let tcampos1=tcampos.map(p=>p.name)
          tcampos.forEach(i=>{

            console.log("redmention",{
              category:i.name,
              relType:i.relationship=="manytomany"?"manytomany":"onetomany",
              id:"DELETEMAIN",
              otherId:deleteId,
              

            })
          })
          /*
dispatch({


      type:typesOtm.ADD_INDEXES_TO_OTMRECORD,
      payload:{
        category:`mtm${respCat.name}${parentCategory.name}`,
        id:otherId,
        action:"DELETE",
        otherId:id,
        


      }
    })
          */
          console.log("camposver",tcampos1)
          
          
        }
        if(!isManyToMany){
          const path=[`getData${currentCategory.name}`]
         
          //indexSize=1
          //console.log("titulo45",titulo)
          
          const p=resultPath(currentCategory.fields.filter(x=>
          x.dataType=="relationship"),titulo,
          categories,path,true)
          //console.log("path",path)
          
          const i=getIndexes(tableIndexes,segmentRoutes)
          //console.log("indices",ind)
            
            let us=simpleUpdateState(categoryProducts,titulo,
              segmentRoutes,i,deleteId)
          //console.log("us",us)
            dispatch(setCategoryProducts(us))
        }else{
          //console.log("entromanytomany")
          let pivoteTable,otherPivoteTable,tablaoriginal
          const path=[`getData${currentCategory.name}`]
          //indexSize=1
          //
        /*const c=resultPath(currentCategory.fields.filter(x=>
            x.dataType=="relationship"),titulo,categories,
            path,true)*/
          const i=getIndexes(tableIndexes,segmentRoutes)
       console.log("valuevar",valueVar1,valueVar2)
          makeOtherMtmTable(categoryProducts,valueVar2,valueVar1)
          /*if(c[c.length-2].startsWith("mtm")){
            pivoteTable=titulo
            otherPivoteTable=otrotitulo
            tablaoriginal=c[c.length-3]
          }else{
            pivoteTable=otrotitulo
            otherPivoteTable=titulo
            tablaoriginal=c[c.length-2]
          }*/
          //path=[`getData${currentCategory.name}`]
          //indexSize=1
          /*const y=resultPath(currentCategory.fields.filter(x=>
            x.dataType=="relationship"),pivoteTable,
            categories,path,true)
          const i=getIndexesInverse(deleteRecord,pivoteTable,otherPivoteTable,y,tableIndexes)
          console.log("xxx",deleteRecord,y,i)*/
          //bilet r1=simpleUpdateStateHereDelete(c)
          //let r1=updateClusters(c,i)
          //bi
          
          
          //dispatch(setCategoryProducts(r1))

        }
          
        
          
      }
    }
  })

  
  const [loadedIds,setLoadedIds]=useState([])
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
    /*for(let f in p){
      if(isFDate(f)){
        p[f]=trDateDB(p[f])
      }
    }*/
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
  let nameVar1
  let valueVar1
  let nameVar2
  let valueVar2

  const res=()=>{
    let prodQueryIds=[]
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
    resultado.push(<p>{segmentRoutes.map(x=>x)}</p>)
    
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
       // console.log("parentRelatiion1",parentRelation,dqIds)
        toggleNewProduct(respCat,tableIndexes,partials,titulo,parentId,isManyToMany,relationCategory,parentRelation,parentCatId,dqIds,parentRecord,products)
      
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
       // console.log("hname",h.name,fieldsNotToDisplay[titulo])
        if(//products[0][h.name]!==undefined
          fieldsNotToDisplay[titulo]!==h.name){
            
               if ((h.dataType!="relationship" && !(h.dataType=="queryCategory" && h.relationCategory==null))){ //&& titulo.startsWith("otm")){
                 camp.push(h.name)
                 return <th>{h.name}</th>
               }
          
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
       // console.log("camp",camp)
        totalFields=[...totalFields,...fields2]
        //console.log("tf camp",totalFields,camp)
        headers=camp.map(f=><th>{f}</th>)
        //headers=[...headers,...headers2]
      }
      
      headers.unshift(<th>Id</th>)
      camp.unshift("id")
      headers.push(<th>Category</th>)
      camp.push("__typename")
      
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
       // console.log("producto",products[p])
        let producto={...products[p]}
        let data=[]
        
        for(let yu in totalFields){//respCat.fields){
          if(totalFields?.[yu]?.dataType=="relationship" 
          && products?.[p]?.[totalFields?.[yu]?.name]!==undefined
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
              setParentRecord(r=>{
                if(r?.[titulo]==
                  undefined)
                  r={...r,[titulo]:{}}
                r[titulo]=products[p]
                return r
              })
              }

              
            }
            
            value={tableIndexes[titulo]}
            
            />
          </td>)
          indice++
        }
        //console.log("praw",products,camp)
        //for(let p in products){
          let route
          for(let c in camp){//products[p]){
          
            if(isManyToMany /*&& (titulo=="mtmscmateriassccarreras"
            || titulo=="mtmsccarrerasscmaterias")*/){
              route=products[p]
            //  console.log("atingen",products[p])
            } 
            else 
              route=products[p]
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
                // && Object.keys(route).length>0){
               // console.log("route00",route)
                data.push(<td>one to many</td>)
              }else if(fs[0].relationship=="manytomany"){// && Object.keys(route).length>0){
                if(fs[0].name!==fieldsNotToDisplay[titulo])
                  
                    data.push(<td>many to many</td>)
              }else if(fs[0].declaredType=="date"){
                //if(producto[c]!==""){
              
                //console.log("prodc",products[p][camp[c]])  
                //let nf=trDateMex(products[p][camp[c]])
                //console.log("nf",nf)
                //producto[c]=nf
                let d=new Date(parseInt(route[camp[c]]))
                let disp=""
                if(d!="Invalid Date")
                  disp=formatDate(d.getDate(),(d.getMonth()+1),d.getFullYear())+" at "+formatHour(d.getHours(),d.getMinutes())
                console.log("datespec",d)

                data.push(<td>{disp}</td>)
                //}
              }else if(fs[0].dataType=="queryCategory" && fs[0].declaredType=="number"){
                if(route?.[camp?.[c]]!=undefined){
                  prodQueryIds.push(route[camp[c]])
                  data.push(<td>{route[camp[c]]}</td>)
                }
              }else if(fs[0].dataType=="queryCategory"){
                let x=`${camp[c]}ProductQuery`
               // console.log("imp",x,`${products[p][x]}`)
                //data.push(<td>{products[p][`${products[p][camp[c]]}GlobalCatQuery`]}</td>)
                //data.push(<td>{products[p][`${products[p][camp[c]]}FinalCatQuery`]}</td>)
                if(route?.[x]!=undefined){
                data.push(<td>{route[x]}</td>)
                prodQueryIds.push(route[x])
                }
              }else {
                //if(titulo=="mtmscprofesoresscmaterias") 
                //console.log("chekjorge",route,camp[c],route[camp[c]])
                //if(route?.[camp?.[c]])
                  data.push(<td>{route?.[camp?.[c]]}</td>)
              }
            }else{
              //if(route?.[camp?.[c]])
                data.push(<td>{route?.[camp?.[c]]}</td>)
            }
          }
        //}
        if(respCat.typeOfCategory==0){ 
          

          
          
          if(typeof route=="object" && Object.keys(route).length>0){
            //if(!hasSons(p)){
              data.push(<td><IoIosRemoveCircleOutline
              onClick={()=>{
              if(isManyToMany){
                const pr=categories.filter(x=>
                  x.id==parentRelation)[0]
                const f1=`mtm${pr.name}${respCat.name}Id`
                const f2=`mtm${respCat.name}${pr.name}Id`
                console.log("paramsdelmtm",{
                  [f1]: parentCatId,
                  [f2]: route["id"]//products[p]["id"]
                })
                deleteId=route["id"]//products[p]["id"]
                deleteRecord=route//products[p]
                nameVar1=f1
                valueVar1=parentCatId
                nameVar2=f2
                valueVar2=route["id"]//products[p]["id"]

                delete2({
                  variables:{
                    [f1]: route[f1],//parentCatId,
                    [f2]: route[f2]//route["id"]//products[p]["id"]
                  }
                })
              }else{
                deleteId=products[p]["id"]
                console.log("titulop",titulo.substring(7),currentCategory.name)
                if(titulo.substring(7)==currentCategory.name){
                  let otmFields=currentCategory.fields.map(x=>{
                    if(x.relationship=="onetomany")
                      return x.relationCategory
                  }).filter(y=>y!=undefined).map(u=>{
                    return categories.filter(t=>t.id==u).map(e=>e.name)
                  })
                  let otmf=[]
                  let mtmf=[]
                  for(let l=0;l<otmFields.length;l++){
                    otmf=[...otmf,...otmFields[l]]
                  }
                  
                  let mtmFields=currentCategory.fields.map(x=>{
                    if(x.relationship=="manytomany")
                      return x.relationCategory
                  }).filter(y=>y!=undefined).map(u=>{
                    return categories.filter(t=>t.id==u).map(e=>e.name)
                  })

                  for(let l=0;l<mtmFields.length;l++){
                    mtmf=[...mtmf,...mtmFields[l]]
                  }
                  
                  console.log("otmmtmfields",otmf,mtmf,
                  {
                    id:products[p]["id"],
                    hardDelete:true,
                    otmCategoryIds:otmf,
                    mtmCategoryIds:mtmf
                  })
                  delete2({
                    variables:{
                      id:products[p]["id"],
                      hardDelete:true,
                      otmCategoryIds:otmf,
                      mtmCategoryIds:mtmf
                    }
                  })
                }else{
                console.log("Paramsbien ",deleteId,products[p]["id"],`${titulo}Id`)
                  delete2({
                    variables:{
                      id:products[p]["id"],
                      hardDelete:false,
                      parentArg:`${titulo}Id`
                    }
                  })
                }
              }
            }}
          />
          </td>)
        /*}else{
          data.push(<td></td>)
        }*/
      }
          
        if(typeof route=="object" && Object.keys(route).length>0)
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
              [f2]: route["id"]
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
      if(Object.keys(acc).length>0){
        resultado.push(<table>{header}<tbody>{acc}</tbody></table>)
        return resultado
      }
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
            //console.log("prodqueryids",prodQueryIds)
            setDqIds(prodQueryIds)
            //console.log("parentcadid single table",parentCatId)
            toggleNewProduct(respCat,tableIndexes,partials,titulo,parentId,isManyToMany,relationCategory,parentRelation,parentCatId,dqIds,parentRecord,products)}
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