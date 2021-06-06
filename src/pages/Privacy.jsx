import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { URL_API } from '../helper/url';
import { toastError } from '../redux/actions/toastActions';

function Privacy() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let res = await axios.get(
        `${URL_API}/collection/one?id_collection=${id}`
      );
      setUserPassword(res.data.result.password);
      console.log(res.data.result.password);
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(password);
    console.log(userPassword);
    if (password === userPassword) {
      history.push(`/download/${id}`);
    } else {
      dispatch(toastError('Wrong password, try again!'));
    }
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
