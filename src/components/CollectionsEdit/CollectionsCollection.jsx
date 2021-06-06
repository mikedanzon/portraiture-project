import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { URL_API } from '../../helper/url';
import { useDispatch } from 'react-redux';
import { toastError, toastSuccess } from '../../redux/actions/toastActions';

function CollectionsCollection() {
  const { id } = useParams();
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [desc, setDesc] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    setIsLoading(true);
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(
        `${URL_API}/collection/one?id_collection=${id}`,
        config
      );
      setTitle(res.data.result.title);
      setDate(res.data.result.date.slice(0, 10));
      setDesc(res.data.result.description);
      // setCollection(res.data.result);
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const onClickSave = (e) => {
    e.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append('title', title);
    bodyFormData.append('description', desc);
    bodyFormData.append('date', date);
    var config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    axios
      .put(`${URL_API}/collection?id_collection=${id}`, bodyFormData, config)
      .then((res) => {
        dispatch(toastSuccess('You have updated your collection!'));
        setTimeout(() => {
          history.push(`/collections`);
        }, 2000);
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  if (isLoading) {
    return (
      <>
        <div className="loader-project"></div>
      </>
    );
  }

  return (
    <div className="cedit-content">
      <Form className="cedit-collection">
        <Form.Group size="lg" controlId="title">
          <Form.Label>Title*</Form.Label>
          <Form.Control
            className="custom-form-port"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="title">
          <Form.Label>Date*</Form.Label>
          <Form.Control
            className="custom-form-port"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="title">
          <Form.Label>Description</Form.Label>
          <Form.Control
            className="custom-form-port"
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Group>
        <button size="lg" onClick={onClickSave} className="mt-5">
          Save
        </button>
      </Form>
    </div>
  );
}

export default CollectionsCollection;
