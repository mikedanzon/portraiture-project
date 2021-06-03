import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_API } from '../helper/url';
import { toastError } from '../redux/actions/toastActions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderHome from '../components/HeaderHome';
import Footer from '../components/Footer';

function GalleryAll() {
  const auth = useSelector((state) => state.auth);
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDataGalleryAll();
  }, []);

  const fetchDataGalleryAll = async () => {
    setIsLoading(true);
    try {
      var res = await axios.get(`${URL_API}/collection`);
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      let user = await axios.get(`${URL_API}/user/one`, config);
      setImage(res.data.result);
      setIsLoading(false);
      console.log(res.data.result);
      console.log(user.data.result);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const galleryAllImage = () => {
    return image.map((val, index) => {
      return (
        <div className="galleryall-cards" key={index}>
          <img src={val.cover} alt="no image found" />
          <div className="cards-text">
            <div className="cards-text1">{val.title}</div>
            <div className="cards-text2">{auth.businessName}</div>
          </div>
        </div>
      );
    });
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
    <>
      <HeaderHome />
      <div className="galleryall-wrapper">
        <div className="gallery-title">
          Explore{' '}
          <Link to="/gallery/photographer">
            <span>Photographer Gallery</span>
          </Link>
        </div>
        <div className="galleryall-cards-container">{galleryAllImage()}</div>
        <div className="galleryall-pagination">pagination</div>
      </div>
      <Footer />
    </>
  );
}

export default GalleryAll;
