import React from "react";
import { Link } from "react-router-dom";
import '../styles/navbar.css'


const Navbar = () => {
  return (
    <nav className="navbar">
          <Link to="/" className="navbar-links">
            Home
          </Link>
          <Link to="/tutorial" className="navbar-links">
            Tutorial
          </Link>
          <Link to="/mygallery" className="navbar-links">
            My Gallery
          </Link>
          <Link to="/buycredits" className="navbar-links">
            Buy Credits
          </Link>
          <Link to="/aboutus" className="navbar-links">
            About Us
          </Link>
          <Link to="/aboutus" className="navbar-button">
            Logout
          </Link>
    </nav>
  );
};

export default Navbar;
