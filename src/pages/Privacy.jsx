import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { URL_API } from '../helper/url';
import { toastError, toastSuccess } from '../redux/actions/toastActions';

function Privacy() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post(`${URL_API}/collection/submit?id_collection=${id}`, {
        password: password,
      })
      .then(() => {
        dispatch(toastSuccess('Please wait, redirecting to download...'));
        setTimeout(() => {
          history.push(`/download/${id}`);
        }, 2000);
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return (
      <>
        <div className="loader"></div>
      </>
    );
  }

  return (
    <div className="privacy-background">
      <div className="privacy-main">
        <div className="privacy-collection">Collection</div>
        <div className="privacy-name">Leon & Stella</div>
        <div className="privacy-date">21 February 2021</div>
        <div className="privacy-form">
          <Form>
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
            <Button size="lg" onClick={handleSubmit}>
              Next
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
