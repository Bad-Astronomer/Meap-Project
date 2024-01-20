import React from 'react'
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className='navbar-contents'>
      <ul>
        <li>
          <Link to="/"><button className='navbar-buttons'>Home</button></Link>
        </li>
        <li>
          <Link to="/tutorial"><button className='navbar-buttons'>Tutorial</button></Link>
        </li>
        <li>
          <Link to="/mygallery"><button className='navbar-buttons'>My Gallery</button></Link>
        </li>
        <li>
          <Link to="/buycredits"><button className='navbar-buttons'>Buy Credits</button></Link>
        </li>
        <li>
          <Link to="/aboutus"><button className='navbar-buttons'>About Us</button></Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;