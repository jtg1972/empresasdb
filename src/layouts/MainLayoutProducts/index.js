import React from 'react'
import Navbar from '../../components/Navbar'
import './styles.scss'
const MainLayoutProducts = ({children,isThereReport,setIsThereReport}) => {
  return (
    <div className="mainLayout">
      <Navbar 
        isThereReport={isThereReport}
        setIsThereReport={setIsThereReport}
      />
      <div className="sidebarMenuAndContent">
        <div className="content">
          {children}
        </div>
      </div>
      
    </div>
  )
}

export default MainLayoutProducts
