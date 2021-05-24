import React, { useState } from 'react';
import HeaderProps from '../components/HeaderProps';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { URL_API } from '../helper/url';
import { toast, ToastContainer } from 'react-toastify';

function ProjectNew() {
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [desc, setDesc] = useState();
  const [cname, setCname] = useState();
  const [caddrs, setCaddrs] = useState();

  const onSave = () => {
    var data = {
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
        toast.success('Success, you can now check your new project!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location = '/dashboard';
        }, 3000);
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
  };

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
      <HeaderProps title="Create Project" link="/" />
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
