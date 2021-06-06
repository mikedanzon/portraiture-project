import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Breadcrumb } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toastError } from '../redux/actions/toastActions';
import { URL_API } from '../helper/url';
import { dateFormatter } from '../helper/dateformatter';
import Header from '../components/Header';
import CollectionsCollection from '../components/CollectionsEdit/CollectionsCollection';
import CollectionsTheme from '../components/CollectionsEdit/CollectionsTheme';
import CollectionsPrivacy from '../components/CollectionsEdit/CollectionsPrivacy';
import CollectionsDownload from '../components/CollectionsEdit/CollectionsDownload';
import CollectionsPhotos from '../components/CollectionsEdit/CollectionsPhotos';

function CollectionEdit() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(undefined);
  const [date, setDate] = useState('');
  const [collection, setCollection] = useState({});
  const dispatch = useDispatch();

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
      var res = await axios.get(
        `${URL_API}/collection/one?id_collection=${id}`,
        config
      );
      setDate(res.data.result.date);
      setCollection(res.data.result);
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
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
          <div className="cedit-header-text-date">
            {date && dateFormatter(date)}
          </div>
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
          <CollectionsTheme />
        ) : page === 'photos' ? (
          <CollectionsPhotos />
        ) : page === 'privacy' ? (
          <CollectionsPrivacy />
        ) : page === 'download' ? (
          <CollectionsDownload />
        ) : (
          <CollectionsCollection />
        )}
      </div>
    </>
  );
}

export default CollectionEdit;
