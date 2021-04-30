import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/logo.png';

function Register() {
  return (
    <div className="port-background">
      <div className="port-main">
        <div className="port-main-header">
          <div className="port-main-header-logo">
            <img src={Logo} alt="portlogo" />
          </div>
          <div className="port-main-header-login">
            Already have account? <Link to="/login">Login</Link>
          </div>
        </div>
        <div className="port-main-body">
          <div className="port-main-body-create">Create an account</div>
          <div>
            <div className="pb-1">Name</div>
            <div className="pb-2">
              <input type="text" placeholder="e.g. Justin Junaedi" />
            </div>
          </div>
          <div>
            <div className="pb-1">Business Name</div>
            <div className="pb-2">
              <input type="text" placeholder="e.g. Justin Studio" />
            </div>
          </div>
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
            <button>Signup</button>
          </div>
        </div>
        <div className="port-main-footer">
          <Link to="/">Cancel and back to website</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
