import React from "react";
import { Link } from "react-router-dom";
import '../styles/navbar.css'
import Divider from '@mui/material/Divider';
import { dark } from "@mui/material/styles/createPalette";


const Navbar = () => {
  return (
    <div className="navbar">
      <nav className="navbar-contents">
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
            <Link to="/aboutus">
            <button className="navbar-button">
              Logout
            </button>
            </Link>
      </nav>
    </div>
  );
};

export default Navbar;
