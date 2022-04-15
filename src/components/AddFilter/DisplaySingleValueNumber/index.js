import React from 'react'
import { useDispatch } from 'react-redux'
import FormInput from '../../Forms/FormInput'
import FormButton from '../../Forms/FormButton'
import { removeFilterCriteria } from '../../../redux/category/actions'
const DisplaySingleValueNumber = ({
  setValues,
  values,
  campo,
  setOrder,
  operator,
  setOperator
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
        {campo.name}
      </span>
      <select
      style={{
        flex:1,
        outline:"none",
        border:"none",
        marginTop:"10px"
      }}
      value={operator}
      onChange={e=>{
        setOperator(e.target.value)
        setValues(v=>(
          {
            ...v,
            [campo.name]:{
              ...v[campo.name],
              operator:e.target.value
            }
          }
        ))
      }}
      >
        <option value="igual">igual</option>
        <option value="menor">menor que</option>
        <option value="mayor">mayor que</option>

      </select>
      <FormInput
        value={values[campo.name]?.val!==undefined
          ?
          values[campo.name].val
          :
          ""
        }
        onChange={e=>{
          setValues(v=>({
            ...v,
            [campo.name]:{
              ...v[campo.name],
              val:e.target.value
            }
          }))
        }}
        placeholder={campo.name}
        style={{
          marginBottom:"0",
          border:"none",
          borderBottom:"1px solid grey",
          flex:1
        }}
      />
      <FormButton
      style={{
        width:"auto",
        marginLeft:"3px",
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
        setOrder("asc")
        setValues(v=>({...v,[campo.name]:{...v[campo.name],order:"asc"}}))

      }}
      >
        U
      </FormButton>
      <FormButton
      style={{
        width:"auto",
        marginLeft:"3px",
        marginBottom:"2px",
        marginTop:0
      }}
      onClick={()=>{
        setOrder("desc")
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

export default DisplaySingleValueNumber
