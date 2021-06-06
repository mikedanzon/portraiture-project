import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { URL_API } from '../helper/url';
import { useDispatch, useSelector } from 'react-redux';
import {
  toastError,
  toastInfo,
  toastSuccess,
} from '../redux/actions/toastActions';
import Logo from '../assets/img/logo.png';

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
        dispatch(toastInfo('Please wait getting user data...'));
        var configGetOneUser = {
          headers: { Authorization: `Bearer ${res.data.token}` },
        };
        axios
          .get(`${URL_API}/user/one`, configGetOneUser)
          .then((res2) => {
            dispatch(toastSuccess('You are now logged in!'));
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
            dispatch(toastError(`${err2.response.data.message}`));
          });
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
  }

  return (
    <>
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
