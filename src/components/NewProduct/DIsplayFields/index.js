import React from 'react'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
const DisplayFields = ({
  structure,
  fields,
  setFields
}) => {
  
  const inputChange=(cat,e)=>{
    const fieldName=cat.fieldName
    setFields({
      ...fields,
      [fieldName]:e.target.value
    })
  }

  const selectChange=(cat,e)=>{
    const fieldName=cat.fieldName
    setFields({
      ...fields,
      [fieldName]:e.target.value
    })
  }

  const dateChange=(cat,e)=>{
    const fieldName=cat.fieldName
    setFields({
      ...fields,
      [fieldName]:e
    })
  }

  const formInputConfig=(cat,index)=>({
    key:index,
    placeholder:cat.fieldName,
    value:fields[cat.fieldName],
    onChange:(e)=>inputChange(cat,e)
  })

  const selectConfig=(cat,index)=>({
    value:fields[cat.fieldName],
    onChange:(e)=>selectChange(cat,e)
  })


  return (
    <div>
    {structure.map((cat,index)=>{
      if(cat.dataType=="singleValue"){
        if(cat.declaredType=="string" ||
        cat.declaredType=="number"){
          return <FormInput
          {...formInputConfig(cat,index)}
          ></FormInput>
        }else if(cat.declaredType=="date"){
          return (
            <div>
              <p>{cat.displayName}:</p>
              <ReactDatePicker
              placeholder={cat.fieldName}
              selected={fields[cat.fieldName]}
              onChange={e=>dateChange(cat,e)}
              />

            </div>
          )
        }
      }else if(cat.dataType=="multipleValue"){
        return (
          <div>
            <select 
            {...selectConfig(cat,index)}>
              <option value="">Select {cat.fieldName}</option>
              {cat.values.map(v=>
                <option value={v.value}>
                  {v.value}
                </option>)}
            </select>
          </div>
        )
      }

    })}
    </div>
  )
}

export default DisplayFields
