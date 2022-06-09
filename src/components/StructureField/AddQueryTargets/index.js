import React, { useState, useEffect } from 'react'
import { flushSync } from 'react-dom'
import { useSelector } from 'react-redux'
import FormButton from '../../Forms/FormButton'
import './styles.scss'
const mapToState=({categories})=>({
  categories:categories.categories
})

const AddQueryTargets = ({
  originalCategoryFields,
  currentCategoryFields,
  setCurrentCategoryFields,
  queryCategory,
  targets,
  setTargets
}) => {
  const {categories}=useSelector(mapToState)
  const [addTarget,setAddTarget]=useState(false)
  const [queryCategoryField,setQueryCategoryField]=useState("")
  const [categoryField,setCategoryField]=useState("")
  
  const [ccfState,setCcfState]=useState([])
  const qc=categories.filter(c=>c.id==queryCategory)[0]
  let qf=qc.fields.filter(x=>((
    x.declaredType=="string"
    ||
    x.declaredType=="number"
    )
    &&
    x.relationship!=="otmdestiny"
  )
  )
  let ccf=currentCategoryFields
  let nqf,nccf=[],ccfType
  useEffect(()=>{
    if(queryCategoryField!==""){
      nqf=qf.filter(
        x=>x.name==queryCategoryField
      )[0]
      const type=nqf.declaredType
      ccfType=ccf.filter((x)=>
        x.declaredType==type
      )
      console.log("nccf",nccf,type)
      setCcfState(ccfType)
      }
  },[queryCategoryField])
  return (
    <div style={{marginBottom:"5px"}}>
      <FormButton onClick={()=>setAddTarget(true)}
      style={{marginBottom:"10px"}}>Add Target</FormButton>
      {addTarget 
      &&
      <div className="container"/*style={{display:"flex",alignItems:"center"}}*/>
      
      <select 
      className="selectStyle"
      style={{padding:"0px",marginBottom:"0px",backgroundColor:"white",color:"black",
      border:"none",
      marginLeft:"0px",
      marginRight:"5px",
      outline:"none"}}
      onChange={(e)=>{setQueryCategoryField(e.target.value)}}
      value={queryCategoryField}
      >
        <option value="">Select a field</option>
        {qf.map(f=>{
          return <option style={{flex:1}} value={f.name}>{f.name}</option> 
          
        }
          
        )}
      </select>
      
      
      {queryCategoryField!=="" 
      && 
      <>
      <span style={{flex:"auto"}}>targets</span>

      <select className="selectStyle"
      style={{marginBottom:"0px",backgroundColor:"white",color:"black",
      marginLeft:"5px",border:"none",
      marginRigth:"0px",
      outline:"none",
      padding:"0px"}}
      
      onChange={(e)=>setCategoryField(e.target.value)}
      value={categoryField}>
        <option value="">Select a Field</option>
        {ccfState.map(f=>{
          return <option style={{flex:1}} value={f.name}>{f.name}</option> 
          
        }
          
        )}
      </select>
      
      <FormButton 
      style={{flex:"20px"}}
      onClick={()=>{
        if(queryCategoryField!==""
        && 
        categoryField!==""){
          setAddTarget(false)
          setTargets([...targets,queryCategoryField,categoryField])
          
          setCurrentCategoryFields(e=>e.filter(q=>{
            console.log("comp",q.name,categoryField)
            return q.name!==categoryField
          }))
          setCcfState(currentCategoryFields)
          
          setQueryCategoryField("")
          setCategoryField("")
        }else{
          setAddTarget(false)
        }
      }}>+</FormButton>
      </>}
      </div>

      }
      {targets.map((t,i)=>{
        if(i%2==0){
          return <div style={{display:"flex",marginBottom:"5px",alignItems:"center"}}>
            <div style={{flex:1}}>{t} targets {targets[i+1]}</div>
            <FormButton 
      style={{width:"20px",height:"20px",
    display:"flex",alignItems:"center",
  justifyContent:"center"}}
      onClick={()=>{
        const x=targets
        const pos=x.findIndex(e=>e==targets[i+1])
        console.log("targets index",targets,pos)
        const nx=x.filter((i,index)=>{
          if(index==pos){
            const ocf=originalCategoryFields.filter(y=>{
              console.log("yname xpos",y.name,x[pos],y.name==x[pos])
              return y.name==x[pos]
            })[0]
            console.log("ocf",ocf)
            setCurrentCategoryFields(e=>(
              [...e,ocf]
            ))
            setCcfState(currentCategoryFields)
          }
          if(index!==pos-1 && index!==pos)
            return true
          return false
            
        })
        setTargets(nx)
        
      }}>-</FormButton>
      
          </div>
        }
        return null
      })}      
      
    </div>
  )
}

export default AddQueryTargets
