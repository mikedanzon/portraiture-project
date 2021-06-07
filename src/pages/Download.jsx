import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { dateFormatter } from '../helper/dateformatter';
import { URL_API } from '../helper/url';
import { toastError } from '../redux/actions';

function Download() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [radio, setRadio] = useState(0);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    setIsLoading(true);
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      let res = await axios.get(
        `${URL_API}/collection/one?id_collection=${id}`,
        config
      );
      setDate(dateFormatter(res.data.result.date));
      setTitle(res.data.result.title);
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const onClickDownload = () => {
    axios
      .get(`${URL_API}/collection/download?id_collection=${id}&option=${radio}`)
      .then((res) => {
        window.open(`${res.data.result}`, '_blank');
      })
      .catch((err) => {
        dispatch(toastError(`${err}`));
      });
  };

  if (isLoading) {
    return (
      <>
        <div className="loader"></div>
      </>
    );
  }

  return (
    <div className="download-background">
      <div className="download-main">
        <div className="download-back">
          <BiArrowBack /> <Link to="/">Back</Link>
        </div>
        <div className="download-main-content">
          <div className="download-text">Download Photos</div>
          <div className="download-name">{title}</div>
          <div className="download-date">{date}</div>
          <div className="download-form">
            <Form>
              <Form.Group size="lg" controlId="public">
                <Form.Label>
                  <span className="color-ash">Choose download size</span>
                </Form.Label>
                <Form.Check
                  type="radio"
                  label="High Resolution"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                  defaultChecked={radio === 1}
                  value={radio}
                  onChange={() => setRadio(1)}
                />
                <Form.Check
                  type="radio"
                  label="Web size"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                  defaultChecked={radio === 2}
                  value={radio}
                  onChange={() => setRadio(2)}
                />
              </Form.Group>
              <Button block size="lg" onClick={onClickDownload}>
                Start Download
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Download;
