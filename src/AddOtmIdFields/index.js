import React, { useState,useEffect } from 'react'
import Dialog from '../components/Dialog'
import FormButton from '../components/Forms/FormButton'
import './styles.scss'

const AddOtmIdFields = ({
  open,
  toggleDialog,
  category,
  fields,
  parentIdentifiers,
  setParentIdentifiers
  
}) => {
  const [selectedField,setSelectedField]=useState("")
  const [fieldCompOrNormalType,setFieldCompOrNormalType]=useState("")
  const [fieldType,setFieldType]=useState("")

  useEffect(() => {


    setSelectedField("")
    setFieldType("")
  },[fieldCompOrNormalType])

  const getType=(compOrNormalField,field)=>{
    let res=""
    if(compOrNormalField=="normal"){
      res=fields["normal"]?.filter(x=>x.name1==field)?.[0]?.["type"]
    }else if(compOrNormalField=="composite"){
      res=fields["compositeFields"]?.filter(x=>x.name1==field)?.[0]?.["type"]
    }
    return res
  }

  
  return (
    <Dialog
      open={open}
      closeDialog={toggleDialog}
      headline={`Add Field to Identify parent Relation (${category})`}>
      <p style={{margin:0,padding:0,paddingLeft:"5px",marginBottom:"5px",background:"brown",color:"white"}}>field: {parentIdentifiers?.[category]?.["field"]}</p>
      <p style={{margin:0,padding:0,paddingLeft:"5px",marginBottom:"5px",background:"brown",color:"white"}}>type: {parentIdentifiers?.[category]?.["fieldCompOrNormalType"]}</p>

      <select style={{margin:0,padding:0,border:"none",outline:"none",marginBottom:"5px"}}
      onChange={(e)=>{setFieldCompOrNormalType(e.target.value)}}
      value={fieldCompOrNormalType}>
        <option value="">select field type</option>
        <option value="none">none</option>
        <option value="normal">normal field</option>
        <option value="composite">composite field</option>
      </select>
      {fieldCompOrNormalType=="normal" && <select style={{margin:0,padding:0,border:"none",outline:"none",marginBottom:"5px"}}
      onChange={(e)=>{
        setSelectedField(e.target.value)
        setFieldType(getType(fieldCompOrNormalType,e.target.value))
      }
    }
      value={selectedField}>
        <option value="">select a field</option>
        {fields?.["normal"]?.map(x=><option value={x.name1}>{x.name1}</option>)}
        
      </select>
      }
      {fieldCompOrNormalType=="composite" && <select style={{margin:0,padding:0,border:"none",outline:"none",marginBottom:"5px"}}
      onChange={(e)=>{
        setSelectedField(e.target.value)
        setFieldType(getType(fieldCompOrNormalType,e.target.value))
      }}
      value={selectedField}>
        <option value="">select a field</option>
        {fields?.["compositeFields"]?.map(x=><option value={x.name1}>{x.name1}</option>)}
        
      </select>
      }
      <FormButton style={{opacity:selectedField || fieldCompOrNormalType=="none"?1:0.7}} 
      disabled={selectedField!=="" || fieldCompOrNormalType=="none"?false:true}
      onClick={()=>{
        if(fieldCompOrNormalType!=="none"){
          console.log("parentid",{...parentIdentifiers,[category]:{
            field:selectedField,
            type:fieldType,
            fieldCompOrNormalType:fieldCompOrNormalType
          }})
          setParentIdentifiers(e=>{
            return {...e,[category]:{
              field:selectedField,
              type:fieldType,
              fieldCompOrNormalType:fieldCompOrNormalType
            }}
          })
        }else{
          console.log("parentid",{...parentIdentifiers,[category]:{
            field:"",
            type:"",
            fieldCompOrNormalType:fieldCompOrNormalType
          }})
          setParentIdentifiers(e=>{
            return {...e,[category]:{
              field:"",
              type:"",
              fieldCompOrNormalType:fieldCompOrNormalType
            }}
          })
        }
      }}>Set parent Field</FormButton>
      
    </Dialog>
  )
}

export default AddOtmIdFields
