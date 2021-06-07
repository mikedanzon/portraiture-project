import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { URL_API } from '../helper/url';
import { toastError, toastSuccess } from '../redux/actions';
import Logo from '../assets/img/logo.png';

function Login() {
  const [name, setName] = useState('');
  const [bsName, setBsName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (auth.isLogin === true) {
    history.push('/');
  }

  function handleSubmit(event) {
    event.preventDefault();
    var data = {
      email: email,
      password: password,
      confirmPassword: password,
      name: name,
      businessName: bsName,
    };
    axios
      .post(`${URL_API}/auth/signup`, data)
      .then((res) => {
        dispatch(
          toastSuccess('Success! You are now logged in with your new account!')
        );
        localStorage.setItem('token', res.data.token);
        setTimeout(() => {
          window.location = '/';
        }, 3000);
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
              Already have account? <Link to="/login">Login</Link>
            </div>
          </div>
          <div className="port-text">Register</div>
          <div className="user-form">
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  autoFocus
                  required
                  type="text"
                  value={name}
                  placeholder="Justin Junaedi"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="bsName">
                <Form.Label>Business Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={bsName}
                  placeholder="Justin Studio"
                  onChange={(e) => setBsName(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  value={email}
                  placeholder="e.g. justinjunaedi@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  value={password}
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button block size="lg" type="submit">
                Signup
              </Button>
            </Form>
          </div>
          <div className="port-main-footer">
            <Link to="/">Cancel and back to website</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
