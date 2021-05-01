import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/portraiture.png';

function HeaderHome() {
  return (
    <div className="hhome">
      <Navbar expand="lg">
        <div className="hhome-logo">
          <Link to="/">
            <img src={Logo} alt="logohome" />
          </Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="hhome-nav">
            <div className="hhome-product pr-3">
              <a href="#product">Product</a>
            </div>
            <div className="hhome-gallery pr-5">
              <Link to="/">Gallery</Link>
            </div>
            <div className="hhome-button-login">
              <Link to="/login">
                <button className="hhome-login mr-3">Login</button>
              </Link>
            </div>
            <div>
              <Link to="/register">
                <button className="hhome-signup">Signup</button>
              </Link>
            </div>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default HeaderHome;
