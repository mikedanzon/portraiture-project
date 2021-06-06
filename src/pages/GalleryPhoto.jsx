import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { URL_API } from '../helper/url';
import { useSelector } from 'react-redux';
import { toastError } from '../redux/actions/toastActions';
import { useDispatch } from 'react-redux';
import Lightbox from 'react-awesome-lightbox';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function GalleryPhoto() {
  const auth = useSelector((state) => state.auth);
  const [image, setImage] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState();
  const [pageNumber, setPageNumber] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDataGalleryPhoto();
    fetchDataPage();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDataGalleryPhoto = async () => {
    setIsLoading(true);
    try {
      var res = await axios.get(`${URL_API}/collection/oneUser?limit=15&page=0&id_user=${auth.id}`);
      setImage(res.data.result);
      setIsLoading(false);
      console.log(res.data);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const fetchDataPage = async () => {
    setIsLoading(true);
    try {
      var res = await axios.get(`${URL_API}/collection/oneUser?limit=9999&page=0&id_user=${auth.id}`);
      setPageNumber(Math.ceil(res.data.totalData / 15));
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const pageChange = async (event, value) => {
    setPage(value);
    try {
      var res = await axios.get(`${URL_API}/collection/oneUser?limit=15&page=${value - 1}&id_user=${auth.id}`);
      setImage(res.data.result);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const galleryPhotoImage = () => {
    return image.map((val, index) => {
      return (
        <div className="gallery-cards">
          <img className="cards-img" 
          src={val.cover} 
          alt="noImageFound"
          onClick={() => onImageClick(val.collectionImages)}  
          />
          <div className="cards-text">
            <div className="cards-text1">{val.title}</div>
            <div className="cards-text2">{val.user.businessName}</div>
          </div>
        </div>
      );
    });
  };

  if (!localStorage.getItem('token')) {
    return (
      <div className="notfound">
        <div className="notfound-inside">
          <h1>You need to login to view this page!</h1>
        </div>
      </div>
    );
  }

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

  if (isLoading) {
    return (
      <>
        <div className="loader"></div>
      </>
    );
  }

  return (
    <>
    {images.length ? (
        <Lightbox images={images} onClose={() => setImages([])} />
      ) : null}
      <div className="galleryphoto-wrapper">
        <div className="gallery-head">
          <Link className="gallery-link" to="/dashboard">
            <img
              className="gallery-logo"
              src={`${URL_API}${auth.photo}`}
              alt=""
            />
            <div className="logo-name">
            {auth.businessName}
            </div>
          </Link>
          <div className="gallery-search">
            <div className="search-input">
              <input type="search" placeholder="Search gallery" />
            </div>
            <div className="search-icon">
              <FiSearch size={16} />
            </div>
          </div>
        </div>
        <div className="gallery-wrapper">{galleryPhotoImage()}</div>
        <div className="gallery-pagination">
          <Pagination 
            count={pageNumber}
            page={page}
            onChange={pageChange}
            shape="rounded" 
          />
        </div>
      </div>
    </>
  );
}

export default GalleryPhoto;
