import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BsX } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { toastError, toastSuccess } from '../../redux/actions';
import { URL_API } from '../../helper/url';

function CollectionsPhotos() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [cover, setCover] = useState(false);
  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    setIsLoading(true);
    let imageUpload = acceptedFiles;
    let bodyFormData = new FormData();
    bodyFormData.append('id_collection', id);
    for (let i = 0; i < imageUpload.length; i++) {
      bodyFormData.append('image', imageUpload[i]);
    }
    axios
      .post(`${URL_API}/collectionImages`, bodyFormData)
      .then(() => {
        dispatch(toastSuccess('Success uploading images!'));
        setTimeout(() => {
          window.location = `/collections/edit/${id}`;
        }, 2000);
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
        setIsLoading(false);
      });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let res = await axios.get(
        `${URL_API}/collectionImages/bycollection?id_collection=${id}`
      );
      let imagesColl = res.data.result.filter((item, index) => {
        return index % 2 !== 0;
      });
      let imagesRev = imagesColl.reverse();
      let collection = await fetchCollection();
      for (var i = 0; i < imagesRev.length; i++) {
        if (collection == imagesRev[i].image) {
          setCover(i);
        }
      }
      setImages(imagesRev);
    } catch (error) {
      dispatch(toastError(`${error}`));
    }
  };

  const fetchCollection = () => {
    return axios
      .get(`${URL_API}/collection/one?id_collection=${id}`)
      .then((res) => {
        return res.data.result.cover;
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  const previewImages = () => {
    return images.map((val, index) => {
      return (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onPreviewSelect(val.id, index);
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
                onPreviewDelete(val.id, index);
              }}
            >
              <BsX size={20} />
            </button>
          </div>
        </span>
      );
    });
  };

  const onPreviewSelect = (idImage, index) => {
    setCover(index);
    setIsLoading(true);
    axios
      .put(
        `${URL_API}/collection/cover?id_collectionImages=${idImage}&id_collection=${id}`
      )
      .then(() => {
        dispatch(toastSuccess('Success updated the cover image!'));
        setIsLoading(false);
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
        setIsLoading(false);
      });
  };

  const onPreviewDelete = (idImage, index) => {
    setIsLoading(true);
    const imageFilter = images.filter((photo, i) => i !== index);
    setImages(imageFilter);
    axios
      .delete(`${URL_API}/collectionImages/one?id=${idImage + 1}`)
      .then(() => {
        dispatch(toastSuccess('Success deleted the image!'));
        if (index < cover) {
          setCover(cover - 1);
        } else if (cover === index) {
          setCover(0);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
        setIsLoading(false);
      });
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
      <div className="cedit-image-wrapper">
        <div className="cedit-image">{previewImages()}</div>
      </div>
    </div>
  );
}

export default CollectionsPhotos;
