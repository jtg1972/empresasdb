import React from 'react'
import { useDispatch } from 'react-redux'
import FormInput from '../../Forms/FormInput'
import FormButton from '../../Forms/FormButton'
import { removeFilterCriteria } from '../../../redux/category/actions'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import './styles.scss'
const DisplaySingleValueDate = ({
  setValues,
  values,
  campo,
  setOrder,
  operator,
  setOperator
}) => {
  const dispatch=useDispatch()
  
  
  const getName=(campo,index)=>{
    return `${campo}${index}`
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
        <option value="igualDate">igual</option>
        <option value="menorDate">menor que</option>
        <option value="mayorDate">mayor que</option>
        <option value="rangoDate">rango</option>
      </select>


      
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
    {operator!=="rangoDate" &&
      <ReactDatePicker
      className="reactdp_norango"
      placeholder="Date"
      selected={//trDate(fields[cat.name])
        //new Date(`"${trDate(fields[cat.name])}"`)
        //trDate(new Date(`"${fields[cat.name]}"`))
        //new Date(fields[cat.name])
        //new Date("2021/09/21")
        values[campo.name]!==undefined
        ?
        values[campo.name][getName(campo.name,"")]!==undefined 
          ?
          new Date(values[campo.name][getName(campo.name,"")])
          :
          new Date()
        :
        new Date()
      }
      onChange={e=>{
        setValues({
          ...values,
          [campo.name]:{
            ...values[campo.name],
            [getName(campo.name,"")]:e
          }
        })
      
      }}/>}
      
    {operator=="rangoDate" &&
      <div style={{display:"flex",marginBottom:"5px"}}>
      <div style={{flex:1,marginRight:"5px"}}>
      <ReactDatePicker
      className="reactdp_rango1"
      placeholder="Date"
      selected={//trDate(fields[cat.name])
        //new Date(`"${trDate(fields[cat.name])}"`)
        //trDate(new Date(`"${fields[cat.name]}"`))
        //new Date(fields[cat.name])
        //new Date("2021/09/21")
        values[campo.name]!==undefined
        ?
        values[campo.name][getName(campo.name,1)]!==undefined 
          ?
          new Date(values[campo.name][getName(campo.name,1)])
          :
          new Date()
        :
        new Date()
      }
      onChange={e=>{
        setValues({
          ...values,
          [campo.name]:{
            ...values[campo.name],
            [getName(campo.name,1)]:e
          }
        })
      
      }}/> 
      </div>
      <div style={{flex:1,marginLeft:"5px"}}>
      <ReactDatePicker
      className="reactdp_rango2"
      placeholder="Date"
      selected={//trDate(fields[cat.name])
        //new Date(`"${trDate(fields[cat.name])}"`)
        //trDate(new Date(`"${fields[cat.name]}"`))
        //new Date(fields[cat.name])
        //new Date("2021/09/21")
        values[campo.name]!==undefined
        ?
        values[campo.name][getName(campo.name,2)]!==undefined 
          ?
          new Date(values[campo.name][getName(campo.name,2)])
          :
          new Date()
        :
        new Date()
      }
      onChange={e=>{
        setValues({
          ...values,
          [campo.name]:{
            ...values[campo.name],
            [getName(campo.name,2)]:e
          }
        })
      
      }}/> 
      </div>    
      </div>}
      
  </>
  )
}

export default DisplaySingleValueDate
