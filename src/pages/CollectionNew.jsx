import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BsX } from 'react-icons/bs';
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
import CollectionsDetails from '../components/CollectionsNew/CollectionsDetails';
import CollectionsTheme from '../components/CollectionsNew/CollectionsTheme';
import TempPreviewClassic from '../components/TemplatesPreview/TempPreviewClassic';
import TempPreviewMinimalism from '../components/TemplatesPreview/TempPreviewMinimalism';
import TempPreviewDarkmode from '../components/TemplatesPreview/TempPreviewDarkmode';
import HeaderPreview from '../components/HeaderPreview';

function CollectionNew() {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [gallery, setGallery] = useState(true);
  const [download, setDownload] = useState(true);
  const [advOpen, setAdvOpen] = useState(false);
  const [image, setImage] = useState([]);
  const [cover, setCover] = useState(0);
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
        <span
          onClick={(e) => {
            e.stopPropagation();
            onPreviewSelect(index);
          }}
          className="image-preview-button"
        >
          <div className="image-preview-list">
            {index === cover && (
              <div className="image-preview-cover">Cover</div>
            )}
            <img src={URL.createObjectURL(val)} alt="previewImages" />
            <button
              className="image-preview-delete"
              onClick={(e) => {
                e.stopPropagation();
                onPreviewDelete(index);
              }}
            >
              <BsX size={20} />
            </button>
          </div>
        </span>
      );
    });
  };

  const onPreviewSelect = (index) => {
    setCover(index);
  };

  const onPreviewDelete = (index) => {
    const imageFilter = image.filter((photo, i) => i !== index);
    setImage(imageFilter);
  };

  const onSubmitFirst = () => {
    if (!title) {
      return dispatch(toastError(`Please insert collection title!`));
    } else if (!date) {
      return dispatch(toastError(`Please insert collection date!`));
    } else {
      setPage('photo');
    }
  };

  const onUploadImage = () => {
    if (image) {
      return setPage('theme');
    }
    dispatch(toastError('Please upload image first!'));
  };

  const onSaveTheme = () => {
    setIsLoading(true);
    var bodyFormData = new FormData();
    bodyFormData.append('title', title);
    bodyFormData.append('description', desc);
    bodyFormData.append('date', date);
    bodyFormData.append('downloadOption', download);
    bodyFormData.append('showGallery', gallery);
    bodyFormData.append('image', image[cover]);
    bodyFormData.append('theme', theme);
    var config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    axios
      .post(`${URL_API}/collection`, bodyFormData, config)
      .then((res) => {
        dispatch(toastInfo('Please wait, uploading images to the server!'));
        postImage(res.data.result.id);
      })
      .catch((err) => {
        setIsLoading(false);
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  const postImage = (idCollection) => {
    var config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    var imageFormData = new FormData();
    imageFormData.append('id_collection', idCollection);
    for (var i = 0; i < image.length; i++) {
      imageFormData.append('image', image[i]);
    }
    axios
      .post(`${URL_API}/collectionImages`, imageFormData, config)
      .then(() => {
        dispatch(toastSuccess('Success created a new collection!'));
        history.push('/collections');
      })
      .catch((err) => {
        setIsLoading(false);
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  const previewTheme = () => {
    if (theme === 'Classic') {
      setPage('previewClassic');
    } else if (theme === 'Minimalism') {
      setPage('previewMinimalism');
    } else {
      setPage('previewDarkmode');
    }
  };

  if (isLoading) {
    return (
      <>
        <HeaderProps title="Create Collection" link="/collections" />
        <div className="loader"></div>
      </>
    );
  }

  return (
    <>
      {page === 'previewClassic' ||
      page === 'previewMinimalism' ||
      page === 'previewDarkmode' ? (
        <HeaderPreview onClickBack={() => setPage('theme')} />
      ) : (
        <HeaderProps title="Create Collection" link="/collections" />
      )}
      {page === 'previewClassic' ||
      page === 'previewMinimalism' ||
      page === 'previewDarkmode' ? null : (
        <div className="cnew-header">
          <div className="cnew-header-title">
            <div className={`${page ? '' : 'cnew-header-active'}`}>
              <span onClick={() => setPage(0)} className="cursor-pointer">
                1. Collection Details
              </span>
            </div>
            <div className="cnew-header-border"></div>
            <div className={`${page === 'photo' ? 'cnew-header-active' : ''}`}>
              <span onClick={onSubmitFirst} className="cursor-pointer">
                2. Upload Photos
              </span>
            </div>
            <div className="cnew-header-border"></div>
            <div className={`${page === 'theme' ? 'cnew-header-active' : ''}`}>
              <span onClick={onUploadImage} className="cursor-pointer">
                3. Select Theme
              </span>
            </div>
          </div>
        </div>
      )}
      {page === 'photo' ? (
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
                  Accepts JPEG files up to 10MB each
                </div>
              </div>
            </div>
          </div>
          {image && (
            <div className="port-image-wrapper">
              <div className="port-image">{previewImages()}</div>
            </div>
          )}
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
      ) : page === 'theme' ? (
        <CollectionsTheme
          setThemeClassic={() => setTheme('Classic')}
          themeClass={ThemeClass}
          setThemeMinimalism={() => setTheme('Minimalism')}
          themeMin={ThemeMin}
          setThemeDarkmode={() => setTheme('Darkmode')}
          themeDark={ThemeDark}
          theme={theme}
          previewTheme={previewTheme}
          onSaveTheme={onSaveTheme}
          classicClick={theme === 'Classic' ? 'cnew-theme-img-active' : null}
          minimalismClick={
            theme === 'Minimalism' ? 'cnew-theme-img-active' : null
          }
          darkmodeClick={theme === 'Darkmode' ? 'cnew-theme-img-active' : null}
        />
      ) : page === 'previewClassic' ? (
        <TempPreviewClassic imagePreview={image} imageCover={cover} />
      ) : page === 'previewMinimalism' ? (
        <TempPreviewMinimalism imagePreview={image} imageCover={cover} />
      ) : page === 'previewDarkmode' ? (
        <TempPreviewDarkmode imagePreview={image} imageCover={cover} />
      ) : (
        <CollectionsDetails
          title={title}
          titleChange={(e) => setTitle(e.target.value)}
          date={date}
          dateChange={(e) => setDate(e.target.value)}
          desc={desc}
          descChange={(e) => setDesc(e.target.value)}
          advanceClick={() => setAdvOpen(!advOpen)}
          styleAdvance={{ display: advOpen ? 'block' : 'none' }}
          gallery={gallery}
          galleryChange={() => setGallery(!gallery)}
          download={download}
          downloadChange={() => setDownload(!download)}
          onSubmitFirst={onSubmitFirst}
        />
      )}
    </>
  );
}

export default CollectionNew;
