import React from 'react'
import Navbar from '../../components/Navbar'
import './styles.scss'
const MainLayoutProducts = ({children}) => {
  return (
    <div className="mainLayout">
      <Navbar/>
      <div className="sidebarMenuAndContent">
        <div className="content">
          {children}
        </div>
      </div>
      
    </div>
  )
}

export default MainLayoutProducts
