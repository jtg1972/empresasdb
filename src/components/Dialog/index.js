import React from 'react'
import Shadow from '../Shadow'
import './styles.scss'
const Dialog = ({
  children,
  open,
  closeDialog,
  headline

}) => {
  return (
    open
    ?
    <div>
      <Shadow opacity={0.3} open={open}/>
      <div className="dialog">
        <div className="header">
          <h1 className="headline">{headline}</h1>
          <p className="close" style={{marginLeft:"10px"}} onClick={closeDialog}>X</p>
        </div>
        <div className="childContent">
          {children}
        </div>
        
      </div>      
    </div>:""
  )
}

export default Dialog
