import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { URL_API } from '../helper/url';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {
  toastError,
  toastInfo,
  toastSuccess,
} from '../redux/actions/toastActions';
import HeaderProps from '../components/HeaderProps';
import ThemeClass from '../assets/img/collections/theme-classic.png';
import ThemeMin from '../assets/img/collections/theme-minimalism.png';
import ThemeDark from '../assets/img/collections/theme-dark.png';

function CollectionNew() {
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [gallery, setGallery] = useState(true);
  const [download, setDownload] = useState(true);
  const [advOpen, setAdvOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [theme, setTheme] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

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
      return dispatch(toastError(`Please insert collection title!`));
    } else if (!date) {
      return dispatch(toastError(`Please insert collection date!`));
    } else {
      setPage(1);
    }
  };

  const onUploadImage = () => {
    setPage(2);
  };

  const onSaveTheme = () => {
    setTheme(!theme);
    var bodyFormData = new FormData();
    bodyFormData.append('title', title);
    bodyFormData.append('description', desc);
    bodyFormData.append('date', date);
    bodyFormData.append('image', image[0]);
    bodyFormData.append('theme', theme);
    axios({
      method: 'post',
      url: `${URL_API}/collection`,
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(() => {
        dispatch(toastInfo('Please wait, uploading images to the server!'));
        postImage();
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  const postImage = () => {
    axios
      .get(`${URL_API}/collection`)
      .then((res) => {
        var response = res.data.result;
        var potong = response.slice(-1).pop();
        var imageFormData = new FormData();
        imageFormData.append('id_collection', potong.id);
        for (var i = 0; i < image.length; i++) {
          imageFormData.append('image', image[i]);
        }
        axios({
          method: 'post',
          url: `${URL_API}/collectionImages`,
          data: imageFormData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
          .then(() => {
            dispatch(toastSuccess('Success created a new collection!'));
            history.push('/collections');
          })
          .catch((err) => {
            dispatch(toastError(`${err.response.data.message}`));
          });
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  const previewTheme = () => {
    console.log(theme);
  };

  return (
    <>
      <HeaderProps title="Create Collection" link="/collections" />
      <div className="cnew-header">
        <div className="cnew-header-title">
          <div className={`${page ? '' : 'cnew-header-active'}`}>
            <span onClick={() => setPage(0)} className="cursor-pointer">
              1. Collection Details
            </span>
          </div>
          <div className="cnew-header-border"></div>
          <div className={`${page === 1 ? 'cnew-header-active' : ''}`}>
            <span onClick={() => setPage(1)} className="cursor-pointer">
              2. Upload Photos
            </span>
          </div>
          <div className="cnew-header-border"></div>
          <div className={`${page === 2 ? 'cnew-header-active' : ''}`}>
            <span onClick={() => setPage(2)} className="cursor-pointer">
              3. Select Theme
            </span>
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
              <span
                className="theme-pointer pb-2"
                onClick={() => setTheme('Classic')}
              >
                <img src={ThemeClass} alt="classTheme" />
              </span>
            </div>
            <div className="cnew-theme-2 pb-2">
              <span
                className="theme-pointer"
                onClick={() => setTheme('Minimalism')}
              >
                <img src={ThemeMin} alt="classTheme" />
              </span>
            </div>
            <div className="cnew-theme-3 pb-2">
              <span
                className="theme-pointer"
                onClick={() => setTheme('Darkmode')}
              >
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
