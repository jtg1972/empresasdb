  import React from 'react'
  import './styles.scss'
  const FormButton = ({
    onClick,
    children,
    fullLength,
    style,
    className
  }) => {
    return (
      <button
      className={"btn "+className}
      onClick={onClick}
      style={style}
      >
        {children}
      </button>
    )
  }
  
  export default FormButton
  