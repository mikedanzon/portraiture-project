import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function Privacy() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [privacy, setPrivacy] = useState(); // backend

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="privacy-background">
      <div className="privacy-main">
        <div className="privacy-collection">Collection</div>
        <div className="privacy-name">Leon & Stella</div>
        <div className="privacy-date">21 February 2021</div>
        <div className="privacy-form">
          {privacy === 'password' ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="password">
                <Form.Label>
                  Please enter the password provided by
                  <br />
                  Justin Studio to download this photo collection
                </Form.Label>
                <Form.Control
                  autoFocus
                  type="password"
                  value={password}
                  placeholder="Collection Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button size="lg" type="submit">
                Next
              </Button>
            </Form>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="email">
                <Form.Label>Please enter your email before continue</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  value={email}
                  placeholder="e.g. justinjunaedi@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Button size="lg" type="submit">
                Next
              </Button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Privacy;
