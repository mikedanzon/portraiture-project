import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/portraiture.png';
import LogoBell from '../assets/img/logo_bell.png';
import LogoUser from '../assets/img/logo_user.png';

function Header() {
  return (
    <div className="port-header">
      <Navbar expand="lg">
        <div className="port-header-logo">
          <Link to="/">
            <img src={Logo} alt="logohome" />
          </Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="port-header-nav">
            <div className="port-header-collection pr-3">
              <Link to="/">Collection</Link>
            </div>
            <div className="port-header-products pr-3">
              <Link to="/">Products</Link>
            </div>
            <div className="port-header-package pr-5">
              <Link to="/">Package</Link>
            </div>
            <div className="port-header-bell pr-4">
              {/* Tambahin tulisan Notification */}
              <Link to="/">
                <img src={LogoBell} alt="imageLogo" />
              </Link>
            </div>
            <div className="port-header-user pr-5">
              {/* Tambahin tulisan Profile */}
              <Link to="/">
                <img src={LogoUser} alt="imageLogo" />
              </Link>
            </div>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
