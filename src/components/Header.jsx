import React, { useEffect, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/portraiture.png';
import LogoBell from '../assets/img/header/logo_bell.png';
import LogoUser from '../assets/img/header/logo_user.png';

function Header() {
  const [page, setPage] = useState('');

  useEffect(() => {
    getUrl();
  }, []);

  const getUrl = () => {
    let url = window.location.href;
    let result = url.match(/[^\/]+$/);
    setPage(result[0]);
  };

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
            <div
              className={`port-header-collection pr-3 ${
                page === 'collections' ? 'header-link-active' : null
              }`}
            >
              <Link to="/collections">Collections</Link>
            </div>
            <div
              className={`port-header-products pr-3 ${
                page === 'projects' ? 'header-link-active' : null
              }`}
            >
              <Link to="/projects">Projects</Link>
            </div>
            <div
              className={`port-header-package pr-5 ${
                page === 'packages' ? 'header-link-active' : null
              }`}
            >
              <Link to="/packages">Packages</Link>
            </div>
            <div className="port-header-bell pr-4">
              <Link to="/">
                <img src={LogoBell} alt="imageLogo" />
              </Link>
            </div>
            <div className="port-header-user pr-5">
              <Link to="/dashboard">
                <img src={LogoUser} alt="imageLogo" />
              </Link>
            </div>
            <div className="port-header-bell-notif pr-4">
              <Link to="/">
                <Link to="/">Notifications</Link>
              </Link>
            </div>
            <div className="port-header-user-profile pr-5">
              <Link to="/dashboard">
                <Link to="/profile">Profile</Link>
              </Link>
            </div>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
