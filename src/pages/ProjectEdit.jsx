import React from 'react';
import HeaderProps from '../components/HeaderProps';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router';

function ProjectEdit() {
  const { id } = useParams();

  return (
    <>
      <HeaderProps title="Edit Project" link="/" />
      <div className="project-edit-container">
        <Form className="project-edit-inner-container">
          <div className="project-edit-pd">Project Details</div>
          <Form.Group>
            <Form.Label className="project-edit-pt">Project Title*</Form.Label>
            <Form.Control
              autoFocus
              className="custom-form-port"
              type="text"
              placeholder="Leon & Stella"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="project-edit-date">Date*</Form.Label>
            <Form.Control
              className="custom-form-port"
              type="date"
              placeholder="28 June 2021"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="project-edit-desc">Description</Form.Label>
            <Form.Control
              className="custom-form-port"
              as="textarea"
              rows={4}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus tristique mi mi ut malesuada ut "
            />
          </Form.Group>
          <div className="project-edit-cd">Client Details</div>
          <Form.Group>
            <Form.Label className="project-edit-cn">Client Name*</Form.Label>
            <Form.Control
              className="custom-form-port"
              type="text"
              placeholder="Leon Handoko"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="project-edit-ca">Client Address*</Form.Label>
            <Form.Control
              className="custom-form-port"
              as="textarea"
              rows={4}
              placeholder="Sunset Boulevard, Pakuwon City Kecamatan Mulyorejo, Surabaya Jawa Timur 60111"
            />
          </Form.Group>
          <div className="project-edit-button-container">
            <Button
              className="project-edit-button"
              variant="primary"
              type="submit"
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
