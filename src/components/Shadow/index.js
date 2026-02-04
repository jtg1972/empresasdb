import React from 'react'
import {useEffect} from 'react'
import './styles.scss'

const Shadow = ({opacity,children,open}) => {
  const color='rgba(0,0,0,'+opacity+')'
  useEffect(()=>{
    let x=document.getElementById("princ")
    x.classList.add("screensize")
    return ()=>{
      x.classList.remove("screensize")
    }
  },[open])
  return (
    <div
    className="shadow"
    style={{backgroundColor:color}}>
      {children}
    </div>
  )
}

export default Shadow
