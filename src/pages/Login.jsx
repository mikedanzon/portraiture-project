import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/logo.png';

function Login() {
  return (
    <div className="port-background">
      <div className="port-main">
        <div className="port-main-header">
          <div className="port-main-header-logo">
            <img src={Logo} alt="portlogo" />
          </div>
          <div className="port-main-header-login">
            Don't have account? <Link to="/register">Signup</Link>
          </div>
        </div>
        <div className="port-main-body">
          <div className="port-main-body-create">Login</div>
          <div>
            <div className="pb-1">Email</div>
            <div className="pb-2">
              <input type="email" placeholder="e.g. justinjunaedi@gmail.com" />
            </div>
          </div>
          <div>
            <div className="pb-1">Password</div>
            <div className="pb-5">
              <input type="password" placeholder="********" />
            </div>
          </div>
          <div>
            <button>Login</button>
          </div>
        </div>
        <div className="port-main-footer">
          <Link to="/">Cancel and back to website</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
