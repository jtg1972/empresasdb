import React from 'react'
import './styles.scss'
const FormInput = ({
  value,
  onChange,
  type,
  placeholder,
  ...other
}) => {
  return (
    <input
    type={type}
    onChange={onChange}
    placeholder={placeholder}
    value={value}
    {...other}
    className={`input ${other.className}`}
    />
  )
}

export default FormInput
