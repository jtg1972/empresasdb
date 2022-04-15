import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFilterCriteria } from '../../../redux/category/actions'
import FormButton from '../../Forms/FormButton'
import FormInput from '../../Forms/FormInput'


const DisplaySingleValueString = ({
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
    }}>
      <span
      style={{display:"block"}}>
        {campo.name} contains
      </span>&nbsp;
      <FormInput
      style={{
        flex:1,
        marginBottom:"0",
        border:"none",
        borderBottom:"1px solid grey"
      }}
      value={values[campo.name]?.val}
      onChange={e=>{
        setValues(values=>({
          ...values,
          [campo.name]:{
            ...values[campo.name],
            val:e.target.value
          }
        }))
      }}
      placeholder={campo.fieldname}
      />
      <FormButton
      style={{
        width:"auto",
        marginLeft:"3px",
        marginBottom:"2px",
        marginTop:"0"
      }}
      onClick={()=>{
        dispatch(removeFilterCriteria(campo.name))
        delete values[campo.name]
      }}
      >
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
        setValues(v=>({
          ...v,
          [campo.name]:{
            ...v[campo.name],
            order:"asc"
          }
        }))
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
        setValues(v=>({
          ...v,
          [campo.name]:{
            ...v[campo.name],
            order:"desc"
          }
        }))
      }}
      
      >
        D
      </FormButton>
    </div>
  )
}

export default DisplaySingleValueString
