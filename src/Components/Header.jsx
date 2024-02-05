import React from "react";
import "./Header.css";
import logo from "../assets/images/logo.png";
const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
        <img className="logo-img" src={logo} alt="" />
      </div>
    </div>
  );
};

export default Header;
