import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const FilterHeader = ({fields}) => {
  const dispatch=useDispatch()
  const [moreFields,setMoreFields]=useState(false)
  const [addField,setAddField]=useState(false)

  useEffect(()=>{
    getMoreFields()

  },[fields,fieldCriterias])

  const getMoreFields=()=>{
    Object.keys(fields).length
    ==
    fieldCriterias.length
    ?
    setMoreFields(false)
    :
    setMoreFields(true)
  }

  const fieldsCriteriaToDisplay=()=>{
    return fields.map((f,i)=>{
      const found=fieldCriterias.filter(fc=>{
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

  const selectChange=(e)=>{
    setAddField(false)
    dispatch(addFieldCriteria(fields[e.target.value]))
  }

  const alertMessageConfig={
    message:"All Fields are taken"
  }

  const buttonConfig={
    className="buttonAddField",
    onClick=()=>setAddField(true)
  }

  const selectConfig={
    onChange:e=>selectChange(e),
    className="selectStyle"
  }
  return (
    <div>
      
    </div>
  )
}

export default FilterHeader
