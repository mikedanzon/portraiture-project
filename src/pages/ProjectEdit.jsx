import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { URL_API } from '../helper/url';
import { useDispatch } from 'react-redux';
import { toastError, toastSuccess } from '../redux/actions/toastActions';
import HeaderProps from '../components/HeaderProps';

function ProjectEdit() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientAddrs, setClientAddrs] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(`${URL_API}/project/one?id=${id}`, config);
      setTitle(res.data.result.title);
      setDate(res.data.result.date);
      setDesc(res.data.result.description);
      setClientName(res.data.result.clientName);
      setClientAddrs(res.data.result.clientAddress);
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const onSaveClick = () => {
    var bodyFormData = new FormData();
    bodyFormData.append('title', title);
    bodyFormData.append('date', date);
    bodyFormData.append('description', desc);
    bodyFormData.append('clientName', clientName);
    bodyFormData.append('clientAddress', clientAddrs);
    var config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    axios
      .put(`${URL_API}/project?id=${id}`, bodyFormData, config)
      .then(() => {
        dispatch(toastSuccess('Success edited the project!'));
        setTimeout(() => {
          window.location = `/projects/details/${id}`;
        }, 2000);
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  if (isLoading) {
    return (
      <>
        <HeaderProps title="Edit Project" link={`/projects/details/${id}`} />
        <div className="loader"></div>
      </>
    );
  }

  return (
    <>
      <HeaderProps title="Edit Project" link={`/projects/details/${id}`} />
      <div className="project-edit-container">
        <Form className="project-edit-inner-container">
          <div className="project-edit-pd">Project Details</div>
          <Form.Group>
            <Form.Label className="project-edit-pt">Project Title*</Form.Label>
            <Form.Control
              autoFocus
              className="custom-form-port"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="project-edit-date">Date*</Form.Label>
            <Form.Control
              className="custom-form-port"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="project-edit-desc">Description</Form.Label>
            <Form.Control
              className="custom-form-port"
              as="textarea"
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Group>
          <div className="project-edit-cd">Client Details</div>
          <Form.Group>
            <Form.Label className="project-edit-cn">Client Name*</Form.Label>
            <Form.Control
              className="custom-form-port"
              type="text"
              placeholder="Leon Handoko"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="project-edit-ca">Client Address*</Form.Label>
            <Form.Control
              className="custom-form-port"
              as="textarea"
              rows={4}
              value={clientAddrs}
              onChange={(e) => setClientAddrs(e.target.value)}
            />
          </Form.Group>
          <div className="project-edit-button-container">
            <Button
              className="project-edit-button"
              variant="primary"
              onClick={onSaveClick}
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default ProjectEdit;
