import React, { useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Button, Form } from 'react-bootstrap';
import Header from '../components/Header';

function CollectionEdit() {
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [desc, setDesc] = useState();
  const [page, setPage] = useState();

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <Header />
      <div className="cedit">
        <div className="cedit-header-menu">
          <Breadcrumb>
            <Breadcrumb.Item Link to="#">
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item Link to="#" active>
              Collections
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="cedit-header-text">
          <div className="cedit-header-text-name">Leon & Stella</div>
          <div className="cedit-header-text-date">28 June 2021</div>
        </div>
        <div className="cedit-main-menu">
          <div className="cedit-menu">
            <div className={`cedit-menu-style ${page ? "" : "active"}`}>Collection</div>
            <div className={`cedit-menu-style ${page === 'theme' ? "active" : ""}`}>Theme</div>
            <div className={`cedit-menu-style ${page === 'photos' ? "active" : ""}`}>Photos</div>
            <div className={`cedit-menu-style ${page === 'privacy' ? "active" : ""}`}>Privacy</div>
            <div className={`cedit-menu-style ${page === 'download' ? "active" : ""}`}>Download</div>
          </div>
          <div className="cedit-menu-border"></div>
        </div>
        <div className="cedit-content">
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="title">
              <Form.Label>Title*</Form.Label>
              <Form.Control
                className="custom-form-port"
                type="text"
                value={title}
                placeholder="value dari backend"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="title">
              <Form.Label>Date*</Form.Label>
              <Form.Control
                className="custom-form-port"
                type="text"
                value={date}
                placeholder="value dari backend"
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="title">
              <Form.Label>Description</Form.Label>
              <Form.Control
                className="custom-form-port"
                type="text"
                value={desc}
                placeholder="value dari backend"
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>
            <button size="lg" type="submit" className="mt-5">
              Save
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default CollectionEdit;
