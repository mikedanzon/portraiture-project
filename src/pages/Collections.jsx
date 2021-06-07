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
import { Link } from 'react-router-dom';
import { dateFormatter } from '../helper/dateformatter';
import Header from '../components/Header';
import HeaderUser from '../components/HeaderUser';
import SimplePopover from '../components/Popover/SimplePopover';
import Lightbox from 'react-awesome-lightbox';

function Collections() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataCollections, setDataCollections] = useState([]);
  const [dataBackup, setDataBackup] = useState([]);
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let results = [];
    for (let i = 0; i < dataCollections.length; i++) {
      if (dataCollections[i].title.toLowerCase().includes(search)) {
        results.push(dataCollections[i]);
      }
    }
    setDataCollections(results.reverse());
    if (search.length === 0) {
      setDataCollections(dataBackup);
    }
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    setIsLoading(true);
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(`${URL_API}/collection/all`, config);
      if (res.data.result.length) {
        setDataCollections(res.data.result.reverse());
        setDataBackup(res.data.result);
      }
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
      .then(() => {
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
      if (i % 2 === 0) {
        colImages.push({ url: image[i].image, title: `image${i}` });
      }
    }
    setImages(colImages);
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
                {val.theme === 'Classic' ? (
                  <Link to={`/temp/classic/${val.id}`} target="_blank">
                    <AiFillEye /> Preview
                  </Link>
                ) : val.theme === 'Minimalism' ? (
                  <Link to={`/temp/minimalism/${val.id}`} target="_blank">
                    <AiFillEye /> Preview
                  </Link>
                ) : (
                  <Link to={`/temp/darkmode/${val.id}`} target="_blank">
                    <AiFillEye /> Preview
                  </Link>
                )}
              </div>
            </div>
            <div className="collections-date">{dateFormatter(val.date)}</div>
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
    dispatch(toastWarning('Feature coming soon!'));
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="loader"></div>
      </>
    );
  }

  return (
    <>
      {images.length && (
        <Lightbox images={images} onClose={() => setImages([])} />
      )}
      <Header />
      <div className="collections-wrapper">
        <HeaderUser
          headerOneText="Collections"
          headerOneButton="New Collection"
          headerOneLink="/collections/new"
          headerSearchText="Search Collections"
          onClick={onClickFilter}
          searchValue={search}
          searchChange={(e) => setSearch(e.target.value)}
        />
        <div className="collections-main">{collectionItems()}</div>
      </div>
    </>
  );
}

export default Collections;
