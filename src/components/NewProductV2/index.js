import Dialog from "../Dialog"
import DisplayFields from "../DisplayFields"
import FormButton from "../Forms/FormButton"
import {useEffect, useState} from 'react'
import { useSelector } from "react-redux"
import { useMutation } from "@apollo/client"
import addMtmProductMutation from '../../gql/addMtmProductMutation'
import {resultPath} from '../../gql/updatestatemtm/utils/getPath'
const mapToState=({categories})=>({
  currentCategory:categories.currentCategory,
  categoryProducts:categories.categoryProducts,
  categories:categories.categories
})


export const NewProductV2 = ({
  open,
  toggleDialog,
  respCat,
  tableIndexes,
  partials,
  titulo,
  parentId,
  isManyToMany,
  relationCategory,
  parentRelation,
  parentCatId
  
}) => {

  console.log("paramsenter",titulo,parentRelation,relationCategory)
  const [mtmStr,setMtmStr]=useState([])
  let pR,nRc,nn,relMtMC,path
  let fieldsMtMRel
  let nameAlias
  const [fields,setFields]=useState([])
  const {currentCategory,
    categoryProducts,
    categories
  }=useSelector(mapToState)
  useEffect(()=>{
    console.log("titulo",titulo)
    if(titulo.startsWith("mtm")){
      pR=categories.filter(x=>x.id==parentRelation)[0]
      nRc=categories.filter(x=>x.id==relationCategory)[0]
      if(pR.name<nRc.name)
        nn=`${pR.name}_${nRc.name}`
      else
        nn=`${nRc.name}_${pR.name}`
      
      relMtMC=categories.filter(x=>x.name==nn)[0]
      nameAlias=`createdatamtm${nRc?.["name"]}${pR?.["name"]}`
      console.log("stringnamealias")
      fieldsMtMRel=relMtMC.fields
    }
  },[])
  
    let CREATE_PRODUCT_MUTATION_MTM=""
    if(titulo.startsWith("mtm")){
      pR=categories.filter(x=>x.id==parentRelation)[0]
      nRc=categories.filter(x=>x.id==relationCategory)[0]
      if(pR.name<nRc.name)
        nn=`${pR.name}_${nRc.name}`
      else
        nn=`${nRc.name}_${pR.name}`
      
      relMtMC=categories.filter(x=>x.name==nn)[0]
      nameAlias=`createdatamtm${nRc?.["name"]}${pR?.["name"]}`
      console.log("stringnamealias")
      fieldsMtMRel=relMtMC.fields
      CREATE_PRODUCT_MUTATION_MTM=addMtmProductMutation(relMtMC,categories,nameAlias,nRc)
    }
    
    
    const [addProduct3]=useMutation(CREATE_PRODUCT_MUTATION_MTM,{
      update:(cache,{data})=>{
        //setAddRecGlobal(()=>({...data[nameAlias]}))
        console.log("global")
      }
    })
    
  
  const formButtonConfig={
    onClick:()=>buttonClick()
  }

  const buttonClick=()=>{
    if(titulo.startsWith("mtm")){
      console.log("x111",fields)
      addProduct3({
        variables:{
          ...fields
        }
      })
    }
  }

  const displayFieldsConfig=()=>{
    if(titulo.startsWith("mtm")) { 
      return {
        category:relMtMC,
        structure:relMtMC.fields,
        fields,
        setFields,
        parentId,
        isManyToMany,
        parentCatId,
        categoryNameRelDestiny:respCat.name
      }  
      
    }
  }
  /*if(titulo.startsWith("mtm")){
    path=[`getData${currentCategory.name}`]
    //indexSize=1
    const c=resultPath(currentCategory.fields.filter(x=>x.dataType=="relationship"),
    titulo,categories,path,true)
    console.log("c22",c)
    
    if(pR?.["name"]<nRc?.["name"])
      nn=`${pR?.["name"]}_${nRc?.["name"]}`
    else
      nn=`${nRc?.["name"]}_${pR?.["name"]}`
    relMtMC=categories.filter(x=>x.name==nn)[0]
    
   
    //nameAlias=`createdatamtm${nRc.name}${pR.name}`
    CREATE_PRODUCT_MUTATION_MTM=addMtmProductMutation(relMtMC,categories,"",nRc)
  }*/

  const dialogConfig={
    open:open,
    closeDialog:toggleDialog,
    headline:"Add Product of "+respCat.name
  }
  return (
    <Dialog
    {...dialogConfig}>
      
      <DisplayFields
        {...displayFieldsConfig()}    
      />
      
      <FormButton
      {...formButtonConfig}>
        Create Product
      </FormButton>
    </Dialog>
    )
}

