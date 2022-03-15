import React from 'react'
import './styles.scss'

const Shadow = ({opacity}) => {
  const color='rgba(0,0,0,'+opacity+')'
  return (
    <div
    className="shadow"
    style={{backgroundColor:color}}>
      
    </div>
  )
}

export default Shadow
