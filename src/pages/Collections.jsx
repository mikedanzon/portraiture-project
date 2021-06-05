import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL_API } from '../helper/url';
import { useDispatch } from 'react-redux';
import {
  toastError,
  toastSuccess,
  toastWarning,
} from '../redux/actions/toastActions';
import { AiFillEye } from 'react-icons/ai';
import { BsCardImage, BsBoxArrowInDown } from 'react-icons/bs';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import HeaderUser from '../components/HeaderUser';
import SimplePopover from '../components/Popover/SimplePopover';
import Lightbox from 'react-awesome-lightbox';

function Collections() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataCollections, setDataCollections] = useState([]);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    setIsLoading(true);
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(`${URL_API}/collection/all`, config);
      setDataCollections(res.data.result.reverse());
      console.log(res.data.result);
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const onEditClick = (id) => {
    history.push(`/collections/edit/${id}`);
  };

  const onDeleteClick = (idCol) => {
    var config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    axios
      .delete(`${URL_API}/collection/delete?id_collection=${idCol}`, config)
      .then((res) => {
        console.log(res.data.result);
        dispatch(toastSuccess('Success deleted a collection!'));
        setTimeout(() => {
          fetchData();
        }, 3000);
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  const onImageClick = (image) => {
    let colImages = [];
    for (var i = 0; i < image.length; i++) {
      if (i % 2 !== 0) {
        colImages.push({ url: image[i].image, title: `image${i}` });
      }
    }
    console.log(colImages);
    setImages(colImages);
  };

  const onPreviewClick = () => {
    dispatch(toastWarning('Preview coming soon in 2 days!'));
  };

  const collectionItems = () => {
    return dataCollections.map((val, index) => {
      return (
        <div className="data-item-list" key={index}>
          <div className="collections-top">
            <div className="collections-image">
              <img
                src={val.cover}
                alt="imageCollections"
                onClick={() => onImageClick(val.collectionImages)}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="collections-bottom">
            <div className="collections-text-preview">
              <div className="collections-text">{val.title}</div>
              <div className="collections-preview">
                <span
                  onClick={() => onPreviewClick(val.collectionImages)}
                  className="cursor-pointer"
                >
                  <AiFillEye /> Preview
                </span>
              </div>
            </div>
            <div className="collections-date">
              {val.date.slice(0, 10).split('-').reverse().join('-')}
            </div>
            <div className="collections-etc">
              <div className="collections-etc-image">
                <BsCardImage size={16} /> {val.collectionImages.length / 2}
              </div>
              <div className="collections-etc-download">
                <BsBoxArrowInDown size={16} /> {val.totalDownload}
              </div>
              <div className="collections-etc-edit">
                <SimplePopover
                  onEditClick={() => onEditClick(val.id)}
                  onDeleteClick={() => onDeleteClick(val.id)}
                  buttonName="Edit"
                />
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const onClickFilter = () => {
    alert('success filter');
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="loader"></div>
      </>
    );
  }

  if (!localStorage.getItem('token')) {
    return (
      <div className="notfound">
        <div className="notfound-inside">
          <h1>You need to login to view this page!</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      {images.length ? (
        <Lightbox images={images} onClose={() => setImages([])} />
      ) : null}
      <Header />
      <div className="collections-wrapper">
        <HeaderUser
          headerOneText="Collections"
          headerOneButton="New Collection"
          headerOneLink="/collections/new"
          headerSearchText="Search Collections"
          onClick={onClickFilter}
        />
        <div className="collections-main">{collectionItems()}</div>
      </div>
    </>
  );
}

export default Collections;
