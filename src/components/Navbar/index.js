import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineShortcut } from "react-icons/md"
import './styles.scss'
const Navbar = ({isThereReport,setIsThereReport}) => {
  const [isActive,setIsActive]=useState(true)
  const toggleMenu=()=>setIsActive(!isActive)
  console.log("itreport",isThereReport)
  return (
    <div className="nav-container">
      <nav className="navbar">
        <h1 id="navbar-logo">LUXCO</h1>
        <div 
        id="mobile-menu"
        className="menu-toggle"
        onClick={toggleMenu}>
          <span className="bar"/>
          <span className="bar"/>
          <span className="bar"/>
        </div>
        {isActive 
        &&
        <ul className="nav-menu active">
          {isThereReport[0] && <li><a className="nav-links"
          onClick={(e)=>{
            e.preventDefault()
            setIsThereReport(e=>[true,!e[1]])
          }}
          ><MdOutlineShortcut/></a></li>}
          <li>
            <Link 
            to="/categories"
            className="nav-links"
            >
              Products
            </Link>
          </li>          
          <li>
            <Link 
            to="/reports"
            className="nav-links">
              Reports
            </Link>
          </li>
          
          <li><a className="nav-links">About us</a></li>
          <li><a className="nav-links">Contact</a></li>
          {/*<li><a className="nav-links">Sign up</a></li>*/}
          
            
              

            
          
          
        </ul>}
      </nav>
    </div>
  )
}
//nav-links-btn
export default Navbar
