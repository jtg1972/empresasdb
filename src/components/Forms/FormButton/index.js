  import React from 'react'
  import './styles.scss'
  const FormButton = ({
    onClick,
    children,
    fullLength,
    style,
    className,
    ...props
  }) => {
    return (
      <button
      className={"btn "+className}
      onClick={onClick}
      style={style}

      {...props}
      >
        {children}
      </button>
    )
  }
  
  export default FormButton
  