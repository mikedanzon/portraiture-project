import React from 'react';
import { Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../assets/img/portraiture.png';

function HeaderHome() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    toast.success('You are now logged out!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      localStorage.removeItem('token');
      dispatch({
        type: 'LOGOUT',
      });
    }, 2000);
  };

  return (
    <>
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
                <Link to="/gallery/all">Gallery</Link>
              </div>
              <div className="hhome-button-login">
                {auth.isLogin ? (
                  <Link to="/dashboard">
                    <button className="hhome-login mr-3">Dashboard</button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <button className="hhome-login mr-3">Login</button>
                  </Link>
                )}
              </div>
              <div>
                {auth.isLogin ? (
                  <button className="hhome-signup" onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <Link to="/register">
                    <button className="hhome-signup">Signup</button>
                  </Link>
                )}
              </div>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}

export default HeaderHome;
