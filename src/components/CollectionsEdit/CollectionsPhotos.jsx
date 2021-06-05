import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BsX } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { toastError } from '../../redux/actions';
import axios from 'axios';
import { URL_API } from '../../helper/url';

function CollectionsPhotos() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [images, setImages] = useState([]);
  const [cover, setCover] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      var res = await axios.get(
        `${URL_API}/collectionImages/bycollection?id_collection=${id}`
      );
      let imagesColl = res.data.result.filter((item, index) => {
        return index % 2 !== 0;
      });
      setImages(imagesColl.reverse());
      console.log(imagesColl);
    } catch (error) {
      dispatch(toastError(`${error}`));
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    // setImage(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const previewImages = () => {
    return images.map((val, index) => {
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
            <img src={val.image} alt="previewImages" />
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
    if (cover == index) {
      setCover(0);
    }
    const imageFilter = image.filter((photo, i) => i !== index);
    setImage(imageFilter);
  };

  const onUploadImage = (e) => {
    e.preventDefault();
    console.log('success');
  };

  if (isLoading) {
    return (
      <>
        <div className="loader-project"></div>
      </>
    );
  }

  return (
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
              Accepts JPEG files up to 10MB each
            </div>
          </div>
        </div>
      </div>
      {image && (
        <div className="cedit-image-wrapper">
          <div className="cedit-image">{previewImages()}</div>
        </div>
      )}
      <div
        className={`${image ? 'cedit-upload-button-2' : 'cedit-upload-button'}`}
      >
        <Button variant="none" onClick={onUploadImage} disabled={!image}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default CollectionsPhotos;
