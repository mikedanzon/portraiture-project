import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_API } from '../helper/url';
import { toastError } from '../redux/actions/toastActions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderHome from '../components/HeaderHome';
import Footer from '../components/Footer';
import Lightbox from 'react-awesome-lightbox';
import Pagination from '@material-ui/lab/Pagination';

function GalleryAll() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState();
  const [pageNumber, setPageNumber] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDataGalleryAll();
    fetchDataPage();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDataGalleryAll = async () => {
    setIsLoading(true);
    try {
      var res = await axios.get(`${URL_API}/collection?limit=15&page=0`);
      setCollections(res.data.result);
      // console.log(res.data);
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const fetchDataPage = async () => {
    // setIsLoading(true);
    try {
      var res = await axios.get(`${URL_API}/collection?limit=9999`);
      setPageNumber(Math.ceil(res.data.totalData / 15));
      // setPageNumber(Math.ceil(res.data.totalData / 2));
      // console.log(Math.ceil(res.data.totalData / 15))
      // setIsLoading(false);
      // setPageNumber(res.data.totalData)
      console.log(res.data);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      // setIsLoading(false);
    }
  };

  const pageChange = async (event, value) => {
    setPage(value);
    try {
      var res = await axios.get(
        `${URL_API}/collection?limit=15&page=${value - 1}`
      );
      setCollections(res.data.result);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const galleryAllImage = () => {
    return collections.map((val, index) => {
      return (
        <div className="galleryall-cards" key={index}>
          <img
            src={val.cover}
            alt="NoImageFound"
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
      if (i % 2 === 0) {
        colImages.push({ url: image[i].image, title: `image${i}` });
      }
    }
    setImages(colImages);
  };

  if (isLoading) {
    return (
      <>
        <HeaderHome />
        <div className="loader"></div>
      </>
    );
  }

  return (
    <div className="background-wrapper">
      {images.length ? (
        <Lightbox images={images} onClose={() => setImages([])} />
      ) : null}
      <HeaderHome />
      <div className="galleryall-wrapper">
        <div className="gallery-title">Explore Photographer Gallery</div>
        <div className="galleryall-cards-container">{galleryAllImage()}</div>
        <div className="galleryall-pagination">
          <Pagination
            count={pageNumber}
            page={page}
            onChange={pageChange}
            shape="rounded"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GalleryAll;
