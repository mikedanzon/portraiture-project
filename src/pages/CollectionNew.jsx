import React, { useState, useCallback } from 'react';
import { Button, Form } from 'react-bootstrap';
import HeaderProps from '../components/HeaderProps';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import ThemeClass from '../assets/img/collections/theme-classic.png';
import ThemeMin from '../assets/img/collections/theme-minimalism.png';
import ThemeDark from '../assets/img/collections/theme-dark.png';
import { AiFillEye } from 'react-icons/ai';
import { URL_API } from '../helper/url';
import { useSelector } from 'react-redux';
import axios from 'axios';

function CollectionNew() {
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState();
  const [desc, setDesc] = useState('');
  const [gallery, setGallery] = useState(true);
  const [download, setDownload] = useState(true);
  const [advOpen, setAdvOpen] = useState(false);
  const [image, setImage] = useState();
  const [theme, setTheme] = useState();
  const auth = useSelector((state) => state.auth);

  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const previewImages = () => {
    return image.map((val, index) => {
      return (
        <div className="image-preview-list">
          <img src={URL.createObjectURL(val)} alt="previewImages" />
        </div>
      );
    });
  };

  const onSubmitFirst = () => {
    if (!title) {
      return console.log('Please insert title first!');
    } else if (!date) {
      return console.log('Please insert date!');
    } else {
      setPage(1);
    }
  };

  const onUploadImage = () => {
    setPage(2);
  };

  const onSaveTheme = () => {
    console.log('succes, just need to wait backend');
    var data = {
      title: title,
      description: desc,
      date: date,
      id_user: auth.id
    }
    axios.post(`${URL_API}/collection`)
  };

  const previewTheme = () => {
    console.log(theme);
  };

  return (
    <>
      <HeaderProps title="Create Collections" link="/" />
      <div className="cnew-header">
        <div className="cnew-header-title">
          <div className={`${page ? '' : 'cnew-header-active'}`}>
            1. Collection Details
          </div>
          <div className="cnew-header-border"></div>
          <div className={`${page === 1 ? 'cnew-header-active' : ''}`}>
            2. Upload Photos
          </div>
          <div className="cnew-header-border"></div>
          <div className={`${page === 2 ? 'cnew-header-active' : ''}`}>
            3. Select Theme
          </div>
        </div>
      </div>
      {page === 1 ? (
        <div className="cnew-main">
          <div className="port-upload">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="port-upload-text">
                <div className="upload-text-1">
                  <AiOutlineCloudUpload /> Upload Images
                </div>
                <div className="upload-text-2">
                  Drag and drop, or click to select
                </div>
                <div className="upload-text-3">
                  Accepts JPEG files up to 50MB each
                </div>
              </div>
            </div>
          </div>
          {image && <div className="port-image">{previewImages()}</div>}
          <div
            className={`${
              image ? 'port-upload-button-2' : 'port-upload-button'
            }`}
          >
            <Button variant="none" onClick={onUploadImage} disabled={!image}>
              Next
            </Button>
          </div>
        </div>
      ) : page === 2 ? (
        <div className="cnew-main">
          <div className="cnew-theme">
            <div className="cnew-theme-1">
              <span className="theme-pointer pb-2" onClick={() => setTheme(1)}>
                <img src={ThemeClass} alt="classTheme" />
              </span>
            </div>
            <div className="cnew-theme-2 pb-2">
              <span className="theme-pointer" onClick={() => setTheme(2)}>
                <img src={ThemeMin} alt="classTheme" />
              </span>
            </div>
            <div className="cnew-theme-3 pb-2">
              <span className="theme-pointer" onClick={() => setTheme(3)}>
                <img src={ThemeDark} alt="classTheme" />
              </span>
            </div>
          </div>
          {theme ? (
            <div className="cnew-theme-preview">
              <div className="theme-preview">
                <span className="theme-pointer" onClick={previewTheme}>
                  <div className="theme-preview-wrap">
                    <div className="theme-preview-text-1">
                      <AiFillEye />
                    </div>
                    <div className="theme-preview-text-2">Preview</div>
                  </div>
                </span>
              </div>
            </div>
          ) : null}
          <div className="cnew-theme-button">
            <Button variant="none" onClick={onSaveTheme} disabled={!theme}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="cnew-main">
          <Form>
            <Form.Group>
              <Form.Label>Title*</Form.Label>
              <Form.Control
                autoFocus
                className="custom-form-port"
                type="text"
                placeholder="e.g. Leon & Stella"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Date*</Form.Label>
              <Form.Control
                className="custom-form-port"
                type="date"
                placeholder="Select date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>
            <div className="cnew-advance">
              <span onClick={() => setAdvOpen(!advOpen)}>Advance options</span>
            </div>
            <div
              className="cnew-advance-options"
              style={{ display: advOpen ? 'block' : 'none' }}
            >
              <div className="cnew-advance-1">
                <div className="cnew-advance-1-1">
                  <div className="cnew-1-1">
                    <label className="switch">
                      <input
                        type="checkbox"
                        value={gallery}
                        onChange={() => setGallery(!gallery)}
                        defaultChecked={gallery}
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
                        value={download}
                        onChange={() => setDownload(!download)}
                        defaultChecked={download}
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
            <Button variant="primary" onClick={onSubmitFirst}>
              Next
            </Button>
          </Form>
        </div>
      )}
    </>
  );
}

export default CollectionNew;
