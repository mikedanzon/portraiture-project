import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { URL_API } from '../helper/url';
import { useSelector } from 'react-redux';
import { toastError } from '../redux/actions/toastActions';
import { useDispatch } from 'react-redux';
import Lightbox from 'react-awesome-lightbox';
import Pagination from '@material-ui/lab/Pagination';

function GalleryPhoto() {
  const { id } = useParams();
  const auth = useSelector((state) => state.auth);
  const [image, setImage] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);
  const [studioName, setStudioName] = useState('');
  const [studioImage, setStudioImage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDataGalleryPhoto();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDataGalleryPhoto = async () => {
    setIsLoading(true);
    try {
      var res = await axios.get(
        `${URL_API}/collection/oneUser?limit=15&page=0&id_user=${id}`
      );
      setImage(res.data.result);
      let getUser = await fetchUser();
      for (let i = 0; i < getUser.length; i++) {
        if (getUser[i].id === res.data.result[0].id_user) {
          setStudioImage(getUser[i].photo);
          setStudioName(getUser[i].businessName);
          break;
        }
      }
      setPageNumber(Math.ceil(res.data.result.length / 15));
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const fetchUser = () => {
    return axios.get(`${URL_API}/user`).then((res) => {
      return res.data.result;
    });
  };

  const pageChange = async (event, value) => {
    setPage(value);
    try {
      var res = await axios.get(
        `${URL_API}/collection/oneUser?limit=15&page=${value - 1}&id_user=${
          auth.id
        }`
      );
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
          <img
            className="cards-img"
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
          <Link className="gallery-link" to="/gallery/all">
            <img
              className="gallery-logo"
              src={`${URL_API}${studioImage}`}
              alt=""
            />
            <div className="logo-name">{studioName}</div>
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
