import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { URL_API } from '../helper/url';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../assets/img/logo.png';
import Home from './Home';
import { toast, ToastContainer } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (auth.isLogin === true) {
    window.location = '/';
  }

  function handleSubmit(event) {
    event.preventDefault();
    var data = {
      email: email,
      password: password,
    };
    axios
      .post(`${URL_API}/auth/signin`, data)
      .then((res) => {
        toast.info('Please wait getting user data...', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        var configGetOneUser = {
          headers: { Authorization: `Bearer ${res.data.token}` },
        };
        axios
          .get(`${URL_API}/user/one`, configGetOneUser)
          .then((res2) => {
            toast.success('You are now logged in!', {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              dispatch({
                type: 'LOGIN',
                payload: {
                  id: res2.data.result.id,
                  token: res.data.token,
                  name: res2.data.result.name,
                  businessName: res2.data.result.businessName,
                  photo: res2.data.result.photo,
                  address: res2.data.result.address,
                  email: res2.data.result.email,
                },
              });
              localStorage.setItem('token', res.data.token);
            }, 2000);
          })
          .catch((err2) => {
            toast.error(`${err2.response.data.message}`, {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="port-background">
        <div className="port-main">
          <div className="port-main-header">
            <div className="port-main-header-logo">
              <img src={Logo} alt="portlogo" />
            </div>
            <div className="port-main-header-link">
              Don't have account? <Link to="/register">Signup</Link>
            </div>
          </div>
          <div className="port-text">Login</div>
          <div className="user-form">
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  className="custom-form-port"
                  type="email"
                  value={email}
                  placeholder="e.g. justinjunaedi@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="custom-form-port"
                  type="password"
                  value={password}
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button block size="lg" type="submit">
                Login
              </Button>
            </Form>
          </div>
          <div className="port-main-footer-login">
            <Link to="/">Cancel and back to website</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
