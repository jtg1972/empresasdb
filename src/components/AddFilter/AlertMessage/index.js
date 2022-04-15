import React from 'react'
import './styles.scss'
const AlertMessage = ({
  message
}) => {
  return (
    <p
    className="alerte">
      {message}
    </p>
  )
}
export default AlertMessage
