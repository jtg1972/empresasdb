import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFilterCriteria } from '../../../redux/category/actions'
import AlertMessage from '../AlertMessage'
import FormButton from '../../Forms/FormButton'
import './styles.scss'

const mapToState=({categories})=>({
  filterCriterias:categories.filterCriterias
})

const FilterHeader = ({fields}) => {
  const dispatch=useDispatch()
  const {filterCriterias}=useSelector(mapToState)

  const [moreFields,setMoreFields]=useState(false)
  const [addField,setAddField]=useState(false)

  useEffect(()=>{
    getMoreFields()

  },[fields,filterCriterias])

  const getMoreFields=()=>{
    //console.log("fields",fields)
    fields.length
    ==
    filterCriterias.length
    ?
    setMoreFields(false)
    :
    setMoreFields(true)
  }

  const fieldsCriteriaToDisplay=()=>{
    return fields.map((f,i)=>{
      const found=filterCriterias.filter(fc=>{
        return fc.name==f.name
      })
      if(found.length==1){
        return null
      }else{
        return <option 
          key={i}
          value={f.name}
          >{f.name}</option>
      }
    })

  }

  const findField=(name)=>{
    const rec=fields.filter(e=>e.name==name)[0]
    //console.log("rec",rec)
    return rec
  }

  const selectChange=(e)=>{
    setAddField(false)
    dispatch(addFilterCriteria(findField(e.target.value)))
  }

  const alertMessageConfig={
    message:"All Fields are taken"
  }

  const buttonConfig={
    className:"buttonAddField",
    onClick:()=>setAddField(true)
  }

  const selectConfig={
    onChange:e=>selectChange(e),
    className:"selectStyle"
  }
  return (
    !moreFields
    ?
    <AlertMessage
    {...alertMessageConfig}
    />
    :
    !addField
    ?
    (
      <FormButton
      {...buttonConfig}>
        Add Field
      </FormButton>
    )
    :
    (
      <select
      {...selectConfig}
      >
        <option value="">
          Select a field
        </option>
        {fieldsCriteriaToDisplay()}

      

      </select>
    )
  )
}

export default FilterHeader
