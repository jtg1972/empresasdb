import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, setCategoryProducts } from '../../redux/category/actions'
import Dialog from '../Dialog'
import DisplayFields from '../DisplayFields'
import FormButton from '../Forms/FormButton'

const addProductMutation=(category,categories,mtm)=>{
  let argsf=category.fields
  let args1=[]
  for(let f in argsf){
    if(argsf[f].dataType=="queryCategory"){
      args1.push(`$${argsf[f].name}GlobalCatQuery:Int`)
      args1.push(`$${argsf[f].name}FinalCatQuery:Int`)
      args1.push(`$${argsf[f].name}ProductQuery:Int`)
    }if(argsf[f].declaredType=="number"){
      args1.push(`$${argsf[f].name}:Int`)

    }else if(argsf[f].declaredType=="string" 
    || argsf[f].declaredType=="date"
    || argsf[f].dataType=="multipleValue"){
      args1.push(`$${argsf[f].name}:String`)
    }
  }
  args1=args1.join(", ")
 
  let args2=[]
  for(let f in argsf){
    if(argsf[f].dataType=="queryCategory"){
      args2.push(`${argsf[f].name}GlobalCatQuery:$${argsf[f].name}GlobalCatQuery`)
      args2.push(`${argsf[f].name}FinalCatQuery:$${argsf[f].name}FinalCatQuery`)
      args2.push(`${argsf[f].name}ProductQuery:$${argsf[f].name}ProductQuery`)
      if(mtm)
        args2.push(`${argsf[f].name}:$${argsf[f].name}`)
    }else if(argsf[f].dataType!=="relationship"){
      args2.push(`${argsf[f].name}:$${argsf[f].name}`)
    }
  }
  
  args2.join(", ")

  let campos=[]
  for(let f in argsf){
    if(argsf[f].dataType=="relationship"){
      if(argsf[f].relationship=="onetomany"){
        let oc=categories.filter(c=>c.id==argsf[f].relationCategory)
        console.log("oc",oc)
        let na=`otm${category.name}${oc[0].name}`
        
        campos.push(`${na}{id}`)
      
      }
    }else if(argsf[f].dataType=="queryCategory"){
      campos.push(`${argsf[f].name}GlobalCatQuery`)
      campos.push(`${argsf[f].name}FinalCatQuery`)
      campos.push(`${argsf[f].name}ProductQuery`)
      if(mtm)
        campos.push(`${argsf[f].name}`)
    }
    else
      campos.push(argsf[f].name)
  }
  
  campos.unshift("id")  
  campos=campos.join("\n")
  
  const query=`mutation CreateProduct(${args1}){
    create${category.name}(${args2}){
      ${campos}
    }
  }`
  console.log("queryadd",query)
  return gql`${query}`
}

const mapToState=({categories})=>({
  currentCategory:categories.currentCategory,
  categoryProducts:categories.categoryProducts,
  categories:categories.categories
})

const NewProduct = ({
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
  console.log("respcatnuevo",respCat)
  console.log("parentcatid newproduct",parentCatId)
  const [fields,setFields]=useState({})
  const {currentCategory,
  categoryProducts,
  categories}=useSelector(mapToState)
  const dispatch=useDispatch()
  let nC,nRc,pR,nn,relMtMC
  const [mtmStr,setMtmStr]=useState([])

  useEffect(()=>{
    
    
    if(isManyToMany){
      /*pR=categories.filter(x=>x.id==parentRelation)[0]
      nRc=categories.filter(x=>x.id==relationCategory)[0]
    
      
      if(pR.name<nRc.name)
        nn=`${pR.name}_${nRc.name}`
      else
        nn=`${nRc.name}_${pR.name}`
      relMtMC=categories.filter(x=>x.name==nn)[0]
      console.log("nn",nn)
      nC=categories.filter(x=>x.name==nn)[0]
      console.log("Nccc",nC.fields)*/
      setMtmStr(nC.fields)
      //setFields(nC.fields)
    }

    const xfields=respCat.fields.filter(x=>
      x.relationship=="otmdestiny"
    )
    const nf={}
    xfields.forEach(f=>{
      nf[f.name]=parentId
    })
    console.log("nf",nf)
    setFields({...fields,...nf})
  },[])

  const updateState=(prods,indexPartials=0,indexArray=0,nuevo)=>{
      
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
          return {
            ...cp,
            [partials[indexPartials]]:
            [...cp[partials[indexPartials]],nuevo]
          }
        }else{
          console.log("entro no final")
          return {...cp,[partials[indexPartials]]:updateState(cp[partials[indexPartials]],indexPartials+1,indexArray,nuevo)}
        }
      
      } else if(Array.isArray(prods)){
        cp=[...prods]
        console.log("arraglo",indexArray,ti.length)
        //console.log("deliddd",deleteId)
        console.log("prods",prods)
          console.log("partarr",cp[ti[indexArray]])
        console.log("paramsarr",cp[ti[indexArray]],indexPartials,indexArray+1,titulo)
                  
        
        return cp.map((y,index)=>{
          if(index==ti[indexArray]){
            return updateState(cp[ti[indexArray]],indexPartials,indexArray+1,nuevo)
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

  let CREATE_PRODUCT_MUT=""
  if(isManyToMany){
      pR=categories.filter(x=>x.id==parentRelation)[0]
      nRc=categories.filter(x=>x.id==relationCategory)[0]
    
      
      if(pR.name<nRc.name)
        nn=`${pR.name}_${nRc.name}`
      else
        nn=`${nRc.name}_${pR.name}`
      relMtMC=categories.filter(x=>x.name==nn)[0]
      console.log("nn",nn)
      nC=categories.filter(x=>x.name==nn)[0]
      console.log("Nccc",nC.fields)
      

    CREATE_PRODUCT_MUT=addProductMutation(relMtMC,categories,true)
  }else{
    CREATE_PRODUCT_MUT=addProductMutation(respCat,categories,false)
  }
  const [addProduct2]=useMutation(CREATE_PRODUCT_MUT,{
    update:(cache,{data})=>{
      const nam=`create${respCat.name}`

      path=[`getData${currentCategory.name}`]
      indexSize=1
      getPath(currentCategory.fields.filter(x=>
        x.dataType=="relationship"))
      console.log("path",path)
      ind=[]
      getIndexes()



      const us=updateState(categoryProducts,0,0,data[nam])
      console.log("ust",us)
      dispatch(setCategoryProducts(us))
      /*dispatch(addProduct({
        categoryName:respCat.name,
        product:data[nam]
      }))*/
      
    }
  })

  const buttonClick=()=>{
    console.log("fieldsadd",fields)
    addProduct2({
      variables:{
        ...fields
      }
    })
  
  }
  const dialogConfig={
    open:open,
    closeDialog:toggleDialog,
    headline:"Add Product of "+respCat.name
  }

  const displayFieldsConfig=()=>{
    if(!isManyToMany) { 
    return {
      category:respCat,
      structure:respCat.fields,
      fields,
      setFields,
      parentId,
      isManyToMany,
      parentCatId
      
    }
    }
    else{
      return {
        category:nC,
        structure:mtmStr,
        fields,
        setFields,
        parentId,
        isManyToMany,
        parentCatId,
        categoryNameRelDestiny:respCat.name
      }
    }
  }

  const formButtonConfig={
    onClick:()=>buttonClick()
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

export default NewProduct
