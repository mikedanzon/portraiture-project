import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { URL_API } from '../helper/url';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toastError, toastSuccess } from '../redux/actions/toastActions';
import HeaderProps from '../components/HeaderProps';

function ProjectNew() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(null);
  const [desc, setDesc] = useState('');
  const [cname, setCname] = useState('');
  const [caddrs, setCaddrs] = useState('');
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSave = () => {
    var data = {
      id_user: auth.id,
      title: title,
      date: date,
      description: desc,
      clientName: cname,
      clientAddress: caddrs,
    };
    var config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    axios
      .post(`${URL_API}/project`, data, config)
      .then(() => {
        dispatch(toastSuccess('Success, you can now check your new project!'));
        setTimeout(() => {
          history.push('/projects');
        }, 3000);
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  if (!localStorage.getItem('token')) {
    return (
      <div className="notfound">
        <div className="notfound-inside">
          <h1>You need to login to view this page!</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeaderProps title="Create Project" link="/projects" />
      <div className="project-new-container">
        <Form className="project-new-inner-container">
          <div className="project-new-pd">Project Details</div>
          <Form.Group>
            <Form.Label className="project-new-pt">Project Title*</Form.Label>
            <Form.Control
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="custom-form-port"
              type="text"
              placeholder="e.g. Leon & Stella"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="project-new-date">Date*</Form.Label>
            <Form.Control
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="custom-form-port"
              type="date"
              placeholder="Select Date"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="project-new-desc">Description</Form.Label>
            <Form.Control
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="custom-form-port"
              as="textarea"
              rows={4}
              placeholder="Type collection description"
            />
          </Form.Group>
          <div className="project-new-cd">Client Details</div>
          <Form.Group>
            <Form.Label className="project-new-cn">Client Name*</Form.Label>
            <Form.Control
              value={cname}
              onChange={(e) => setCname(e.target.value)}
              className="custom-form-port"
              type="text"
              placeholder="e.g. Leon Handoko"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="project-new-ca">Client Address*</Form.Label>
            <Form.Control
              value={caddrs}
              onChange={(e) => setCaddrs(e.target.value)}
              className="custom-form-port"
              as="textarea"
              rows={4}
              placeholder="e.g. Sunset Boulevard, Pakuwon City Kecamatan Mulyorejo, Surabaya Jawa Timur 60111"
            />
          </Form.Group>
          <div className="project-new-button-container">
            <Button
              className="project-new-button"
              variant="primary"
              onClick={onSave}
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default ProjectNew;
