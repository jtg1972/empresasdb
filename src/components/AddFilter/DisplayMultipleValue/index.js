import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFilterCriteria } from '../../../redux/category/actions'
import FormButton from '../../Forms/FormButton'

const DisplayMultipleValue = ({
  setValues,
  values,
  campo,
  setOrder
}) => {
  const dispatch=useDispatch()

  return (
    <div
    style={{
      marginBottom:"5px",
      display:"flex",
      alignItems:"center"
    }}
    >
      <span
      style={{display:"block"}}>
        {campo.name}
      </span>
      <select
      style={{flex:1,outline:"none"}}
      onChange={(e)=>{
        setValues(v=>({
          ...v,
          [campo.name]:{...v[campo.name],
            value:e.target.value
          }
        }))
      }}
      value={values[campo.name]?.val}
      >
        <option value="">
          Select an option
          {campo.values.map(v=>{
            return <option value={v.value}>{v.value}</option>
          })}
        </option>

      </select>
      <FormButton 
      style={{
        width:"auto",
        marginLeft:"3px",
        marginTop:"0"
      }}
      onClick={()=>{
        dispatch(removeFilterCriteria(campo.name))
        delete values[campo.name]
      }}>
        -
      </FormButton>
      <FormButton
      style={{
        width:"auto",
        marginLeft:"3px",
        marginBottom:"2px",
        marginTop:"0"
      }}
      onClick={()=>{
        setOrder("asc")
        setValues(v=>({...v,[campo.name]:{...v[campo.name],order:"asc"}}))
      }}>
        U
      </FormButton>
      <FormButton
      style={{
        width:"auto",
        marginLeft:"3px",
        marginBottom:"2px",
        marginTop:"0"
      }}
      onClick={()=>{
        setOrder("desc")
        setValues(v=>({...v,[campo.name]:{...v[campo.name],order:"desc"}}))
      }}
      >
        D
      </FormButton>
      
    </div>
  )
}

export default DisplayMultipleValue
