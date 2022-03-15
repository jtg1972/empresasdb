import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'
const Navbar = () => {
  const [isActive,setIsActive]=useState(true)
  const toggleMenu=()=>setIsActive(!isActive)
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
          <li>
            <Link 
            to="/categories/1"
            className="nav-links">
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
          <li><a className="nav-links nav-links-btn">Sign up</a></li>
        </ul>}
      </nav>
    </div>
  )
}

export default Navbar
