import React, { useEffect } from 'react'
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
  useEffect(()=>{
    console.log("valuesfield",values[campo.name])
  },[])
  const changeRange=(e,campo,place)=>{
    const fieldName=`${campo}${place}`
    setValues({...values,
      [campo]:{
        ...values[campo],
        type:"group",
        [fieldName]:e.target.value
      }
    })
  }

  return (
    <>
    <div 
    style={{
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
        <option value="rango">rango</option>
      </select>
      {operator!=="rango" &&
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
              type:"single",
              val:e.target.value,
              operator:operator
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
      />}
      
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
    {operator=="rango" &&
    <div style={{display:"flex",marginTop:"0px"}}>
      <FormInput style={{flex:1}}
      placeholder="From"
      onChange={(e)=>changeRange(e,campo.name,1)}
      />
      <FormInput 
      style={{flex:1,marginLeft:"10px"}}
      placeholder="To"
      onChange={(e)=>changeRange(e,campo.name,2)}
      />
    </div>}
  </>
  )
}

export default DisplaySingleValueNumber
