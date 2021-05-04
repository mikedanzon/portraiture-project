import React, { useState, useCallback } from 'react';
import { Button, Form } from 'react-bootstrap';
import HeaderProps from '../components/HeaderProps';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';

function CollectionNew() {
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState();
  const [desc, setDesc] = useState('');
  const [gallery, setGallery] = useState(true);
  const [download, setDownload] = useState(true);
  const [advOpen, setAdvOpen] = useState(false);
  const [image, setImage] = useState();

  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // const objectURL = URL.createObjectURL(image)

  const previewImages = () => {
    return image.map((val) => {
      return (
        <img src={URL.createObjectURL(val)} alt="previewImages"/>
      )
    })
  }

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
    console.log(image);
  };

  return (
    <>
      <HeaderProps title="Create Collections" link="/" />
      <div className="cnew-header">
        {page === 1 ? (
          <div className="cnew-header-title">
            <div>1. Collection Details</div>
            <div className="cnew-header-border"></div>
            <div className="cnew-header-active">2. Upload Photos</div>
            <div className="cnew-header-border"></div>
            <div>3. Select Theme</div>
          </div>
        ) : page === 2 ? (
          <div className="cnew-header-title">
            <div>1. Collection Details</div>
            <div className="cnew-header-border"></div>
            <div>2. Upload Photos</div>
            <div className="cnew-header-border"></div>
            <div className="cnew-header-active">3. Select Theme</div>
          </div>
        ) : (
          <div className="cnew-header-title">
            <div className="cnew-header-active">1. Collection Details</div>
            <div className="cnew-header-border"></div>
            <div>2. Upload Photos</div>
            <div className="cnew-header-border"></div>
            <div>3. Select Theme</div>
          </div>
        )}
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
          {image ? (
            <div className="port-image">
              {previewImages()}
            </div>
          ) : null}
          <div className="port-upload-button">
            {image ? (
              <Button variant="none" onClick={onUploadImage}>
                Next
              </Button>
            ) : (
              <Button variant="none" disabled>
                Next
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="cnew-main">
          <Form>
            <Form.Group>
              <Form.Label>Title*</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Leon & Stella"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Date*</Form.Label>
              <Form.Control
                type="date"
                placeholder="Select date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
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
