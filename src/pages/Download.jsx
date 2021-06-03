import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function Download() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="download-background">
      <div className="download-main">
        <div className="download-back">
          <BiArrowBack /> <Link to="/">Back</Link>
        </div>
        <div className="download-main-content">
          <div className="download-text">Download Photos</div>
          <div className="download-name">Leon & Stella</div>
          <div className="download-date">21 February 2021</div>
          <div className="download-form">
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="public">
                <Form.Label>
                  <span className="color-ash">Choose download size</span>
                </Form.Label>
                <Form.Check
                  type="radio"
                  label="High Resolution (72Mb)"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="radio"
                  label="Web size (13Mb)"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                />
              </Form.Group>
              <Button block size="lg" type="submit">
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
