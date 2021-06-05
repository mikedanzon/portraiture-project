import React from 'react';
import { Button, Form } from 'react-bootstrap';

function CollectionsDetails(props) {
  return (
    <div className="cnew-main">
      <Form>
        <Form.Group>
          <Form.Label>Title*</Form.Label>
          <Form.Control
            autoFocus
            className="custom-form-port"
            type="text"
            placeholder="e.g. Leon & Stella"
            value={props.title}
            onChange={props.titleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Date*</Form.Label>
          <Form.Control
            className="custom-form-port"
            type="date"
            placeholder="Select date"
            value={props.date}
            onChange={props.dateChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control
            className="custom-form-port"
            as="textarea"
            rows={4}
            type="text"
            placeholder="Type collection description"
            value={props.desc}
            onChange={props.descChange}
          />
        </Form.Group>
        <div className="cnew-advance">
          <span onClick={props.advanceClick}>Advance options</span>
        </div>
        <div className="cnew-advance-options" style={props.styleAdvance}>
          <div className="cnew-advance-1">
            <div className="cnew-advance-1-1">
              <div className="cnew-1-1">
                <label className="switch">
                  <input
                    type="checkbox"
                    value={props.gallery}
                    onChange={props.galleryChange}
                    defaultChecked={props.gallery}
                  />
                  <span class="slider"></span>
                </label>
              </div>
              <div className="cnew-1-2">Show on Gallery</div>
            </div>
            <div className="cnew-advance-1-2">
              This collection available on your main page
            </div>
          </div>
          <div className="cnew-advance-2">
            <div className="cnew-advance-2-1">
              <div className="cnew-2-1">
                <label className="switch">
                  <input
                    type="checkbox"
                    value={props.download}
                    onChange={props.downloadChange}
                    defaultChecked={props.download}
                  />
                  <span class="slider"></span>
                </label>
              </div>
              <div className="cnew-2-2">Download Option</div>
            </div>
            <div className="cnew-advance-2-2">
              Turn on to allow your client to download photos from
              <br />
              this collection
            </div>
          </div>
          <div className="cnew-advance-download"></div>
          <div className="cnew-advance-text">
            You can adjust later on privacy and download settings
          </div>
        </div>
        <Button variant="primary" onClick={props.onSubmitFirst}>
          Next
        </Button>
      </Form>
    </div>
  );
}

export default CollectionsDetails;
