import React, { useState } from 'react';
import LogoBell from '../assets/img/logo_bell.png';
import LogoUser from '../assets/img/logo_user.png';
import Logo from '../assets/img/logo.png';
import { FaBars } from 'react-icons/fa';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand className="header-logo" href="/">
          <img className="logo" src={Logo} alt="logo" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="header-nav" navbar>
            <NavItem>
              <NavLink className="header-nav-user" href="/">
                Edit Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="header-nav-user" href="/">
                Notifications
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Collections</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Products</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Packages</NavLink>
            </NavItem>
            <span className="header-nav-user-logo">
              <NavItem>
                <NavLink className="header-nav-logo" href="/">
                  <img src={LogoBell} alt="notifications" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="header-nav-logo" href="/">
                  <img src={LogoUser} alt="user" />
                </NavLink>
              </NavItem>
            </span>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
