import React from 'react'
import { useSelector } from 'react-redux'
import DisplayMultipleValue from '../DisplayMultipleValue'
import DisplaySingleValueDate from '../DisplaySingleValueDate'
import DisplaySingleValueNumber from '../DisplaySingleValueNumber'
import DisplaySingleValueString from '../DisplaySingleValueString'

const mapToState=({categories})=>({
  filterCriterias:categories.filterCriterias
})

const DisplayAllFieldsCriteria = ({
  values,
  setValues,
  setOrder,
  operator,
  setOperator
}) => {
  const {filterCriterias}=useSelector(mapToState)

  const filterCriteriasGreaterThanZero=()=>{
    if(filterCriterias.length>0)
      return true
    else
      return false
  }

  return filterCriteriasGreaterThanZero() 
  &&
  filterCriterias.map(fc=>{
    if(fc.dataType=="multipleValue")
      return <DisplayMultipleValue
      setValues={setValues}
      values={values}
      campo={fc}
      setOrder={setOrder}
      />
    else if(fc.dataType=="singleValue"){
      if(fc.declaredType=="string")
        return <DisplaySingleValueString
        setValues={setValues}
        values={values}
        campo={fc}
        setOrder={setOrder}
        />
      else if(fc.declaredType=="number"){
        return <DisplaySingleValueNumber
        setValues={setValues}
        values={values}
        campo={fc}
        setOrder={setOrder}
        operator={operator}
        setOperator={setOperator}
        />
      }else if(fc.declaredType=="date"){
        return <DisplaySingleValueDate
        setValues={setValues}
        values={values}
        campo={fc}
        setOrder={setOrder}
        operator={operator}
        setOperator={setOperator}
        />
      }
    }
  })
}

export default DisplayAllFieldsCriteria
