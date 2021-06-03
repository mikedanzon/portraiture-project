import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Button, Breadcrumb } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload, AiFillEye } from 'react-icons/ai';
import { BiShow } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toastError } from '../redux/actions/toastActions';
import { URL_API } from '../helper/url';
import Header from '../components/Header';
import ThemeClass from '../assets/img/collections/theme-classic.png';
import ThemeMin from '../assets/img/collections/theme-minimalism.png';
import ThemeDark from '../assets/img/collections/theme-dark.png';
import Switch from '../components/Fields/Switch';
import CollectionsCollection from '../components/CollectionsPage/CollectionsCollection';

function CollectionEdit() {
  const { id } = useParams();
  const [page, setPage] = useState(undefined);
  const [theme, setTheme] = useState(0);
  const [image, setImage] = useState(null);
  const [showGallery, setShowGallery] = useState(true);
  // const [emailReg, setEmailReg] = useState();
  const [date, setDate] = useState('');
  const [collPass, setCollPass] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [downloadOption, setDownloadOption] = useState(true);
  const [limitDownload, setLimitDownload] = useState(false);
  const [imgHigh, setImgHigh] = useState(true);
  const [imgWeb, setImgWeb] = useState(true);
  const [restrictEmail, setRestrictEmail] = useState(false);
  const [collection, setCollection] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    setIsLoading(true);
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(
        `${URL_API}/collection/one?id_collection=${id}`,
        config
      );
      setDate(res.data.result.date.slice(0, 10).split('-').reverse().join('-'));
      setCollection(res.data.result);
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const previewImages = () => {
    return image.map((val, index) => {
      return (
        <div className="image-preview-list">
          <img src={URL.createObjectURL(val)} alt="previewImages" />
        </div>
      );
    });
  };

  const onUploadImage = () => {
    console.log('success');
  };

  const onSaveTheme = () => {
    console.log('succes, just need to wait backend');
  };

  const previewTheme = () => {
    console.log(theme);
  };

  if (isLoading) {
    return (
      <>
        <div className="loader-project"></div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="cedit">
        <div className="cedit-header-menu">
          <Breadcrumb>
            <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item Link to="#" active>
              Collections
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="cedit-header-text">
          <div className="cedit-header-text-name">{collection.title}</div>
          <div className="cedit-header-text-date">{date}</div>
        </div>
        <div className="cedit-main-menu">
          <div className="cedit-menu">
            <div
              className={`cedit-menu-style ${page ? '' : 'active'}`}
              onClick={() => setPage(false)}
            >
              Collection
            </div>
            <div
              className={`cedit-menu-style ${page === 'theme' ? 'active' : ''}`}
              onClick={() => setPage('theme')}
            >
              Theme
            </div>
            <div
              className={`cedit-menu-style ${
                page === 'photos' ? 'active' : ''
              }`}
              onClick={() => setPage('photos')}
            >
              Photos
            </div>
            <div
              className={`cedit-menu-style ${
                page === 'privacy' ? 'active' : ''
              }`}
              onClick={() => setPage('privacy')}
            >
              Privacy
            </div>
            <div
              className={`cedit-menu-style ${
                page === 'download' ? 'active' : ''
              }`}
              onClick={() => setPage('download')}
            >
              Download
            </div>
          </div>
          <div className="cedit-menu-border"></div>
        </div>
        {page === 'theme' ? (
          <div className="cedit-content">
            <div className="cedit-theme">
              <div className="cedit-theme-1">
                <span
                  className="theme-pointer pb-2"
                  onClick={() => setTheme(1)}
                >
                  <img src={ThemeClass} alt="classTheme" />
                </span>
              </div>
              <div className="cedit-theme-2 pb-2">
                <span className="theme-pointer" onClick={() => setTheme(2)}>
                  <img src={ThemeMin} alt="classTheme" />
                </span>
              </div>
              <div className="cedit-theme-3 pb-2">
                <span className="theme-pointer" onClick={() => setTheme(3)}>
                  <img src={ThemeDark} alt="classTheme" />
                </span>
              </div>
            </div>
            {theme ? (
              <div className="cedit-theme-preview">
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
            <div className="cedit-theme-button">
              <Button variant="none" onClick={onSaveTheme} disabled={!theme}>
                Save
              </Button>
            </div>
          </div>
        ) : page === 'photos' ? (
          <div className="cedit-content">
            <div className="cedit-upload">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="cedit-upload-text">
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
            {image && <div className="cedit-image">{previewImages()}</div>}
            <div
              className={`${
                image ? 'cedit-upload-button-2' : 'cedit-upload-button'
              }`}
            >
              <Button variant="none" onClick={onUploadImage} disabled={!image}>
                Save
              </Button>
            </div>
          </div>
        ) : page === 'privacy' ? (
          <div className="cedit-content">
            <div className="cedit-privacy">
              <div className="cedit-advance-1">
                <div className="cedit-advance-1-1">
                  <div className="cedit-1-1">
                    <label className="switch">
                      <input
                        name="showGallery"
                        type="checkbox"
                        value={showGallery}
                        onChange={() => setShowGallery(!showGallery)}
                        defaultChecked={showGallery}
                      />
                      <span class="slider"></span>
                    </label>
                    {/* <Switch
                      name="showGallery"
                      value={showGallery}
                      onChange={() => setShowGallery(!showGallery)}
                      defaultChecked={showGallery}
                    /> */}
                  </div>
                  <div className="cedit-1-2">Show on Gallery</div>
                </div>
                <div className="cedit-advance-1-2">
                  This collection available on your main page.{' '}
                  <Link to="/">See page</Link>
                </div>
              </div>
              <div className="cedit-advance-2">
                <div className="cedit-advance-2-1">
                  <div className="cedit-2-1">
                    <label className="switch">
                      <input
                        type="checkbox"
                        value={collPass}
                        onChange={() => setCollPass(!collPass)}
                        defaultChecked={collPass}
                      />
                      <span class="slider"></span>
                    </label>
                    {/* <Switch
                      name="collPass"
                      value={collPass}
                      onChange={() => setCollPass(!collPass)}
                      defaultChecked={collPass}
                    /> */}
                  </div>
                  <div className="cedit-2-2">Collection Password</div>
                </div>
                <div className="cedit-advance-2-2">
                  Turn on to have a generated password for all guest in order to
                  see your collection
                </div>
                <div
                  className="cedit-advance-2-3"
                  style={{ display: `${collPass ? 'block' : 'none'}` }}
                >
                  <input
                    type={`${hidePass ? 'password' : 'text'}`}
                    placeholder="Set a password"
                    className="custom-form-port mr-3"
                  />
                  <BiShow
                    className="cedit-eye"
                    onClick={() => setHidePass(!hidePass)}
                  />
                  <button>Save</button>
                </div>
              </div>
            </div>
          </div>
        ) : page === 'download' ? (
          <div className="cedit-content">
            <div className="cedit-download">
              <div className="cedit-advance-1">
                <div className="cedit-advance-1-1">
                  <div className="cedit-1-1">
                    <Switch
                      name="downloadOption"
                      value={downloadOption}
                      onChange={() => setDownloadOption(!downloadOption)}
                      defaultChecked={downloadOption}
                    />
                  </div>
                  <div className="cedit-1-2">Download Option</div>
                </div>
                <div className="cedit-advance-1-2">
                  Turn on to allow your client to download photos from this
                  collection
                </div>
                <div
                  className="download-option-1"
                  style={{ display: `${downloadOption ? 'block' : 'none'}` }}
                >
                  <div className="option-image">
                    <div className="option-image-text pb-2">Image size</div>
                    <div className="option-image-1 pb-1">
                      <input
                        type="checkbox"
                        value={imgHigh}
                        onChange={() => setImgHigh(!imgHigh)}
                        defaultChecked={imgHigh}
                        className="mr-2"
                      />
                      High Resolution{' '}
                      <span style={{ color: '#999999' }}>{'>'} 3600 px</span>
                    </div>
                    <div className="option-image-2 pb-1">
                      <input
                        type="checkbox"
                        value={imgWeb}
                        onChange={() => setImgWeb(!imgWeb)}
                        defaultChecked={imgWeb}
                        className="mr-2"
                      />
                      Web size{' '}
                      <span style={{ color: '#999999' }}>640 px - 1024 px</span>
                    </div>
                  </div>
                </div>
                <div
                  className="download-option-2"
                  style={{ display: `${downloadOption ? 'block' : 'none'}` }}
                >
                  <div className="option-email">
                    <div className="option-email-button">
                      <Switch
                        name="restrictEmail"
                        value={restrictEmail}
                        onChange={() => setRestrictEmail(!restrictEmail)}
                        defaultChecked={restrictEmail}
                      />
                    </div>
                    <div className="option-email-text">
                      Restrict to Specific Emails
                    </div>
                    <div className="option-email-text-2">
                      Restrict download to only emails you have been registered
                    </div>
                    <div
                      className="option-email-add"
                      style={{ display: `${restrictEmail ? 'block' : 'none'}` }}
                    >
                      <input
                        type="text"
                        placeholder="Add email"
                        className="custom-form-port mr-3"
                      />
                      <button>Add</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cedit-advance-2">
                <div className="cedit-advance-2-1">
                  <div className="cedit-2-1">
                    <Switch
                      name="limitDownload"
                      value={limitDownload}
                      onChange={() => setLimitDownload(!limitDownload)}
                      defaultChecked={limitDownload}
                    />
                  </div>
                  <div className="cedit-2-2">
                    Limit Total Collection Download
                  </div>
                </div>
                <div className="cedit-advance-2-2">
                  Guess only able to download collection up to the download
                  limit.
                </div>
                <div
                  className="download-limit"
                  style={{ display: `${limitDownload ? 'block' : 'none'}` }}
                >
                  <input
                    type="text"
                    placeholder="e.g. 2"
                    className="custom-form-port mr-3"
                  />
                  <button>Save</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <CollectionsCollection />
        )}
      </div>
    </>
  );
}

export default CollectionEdit;
