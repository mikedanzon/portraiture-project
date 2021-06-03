import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_API } from '../helper/url';
import { toastError } from '../redux/actions/toastActions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderHome from '../components/HeaderHome';
import Footer from '../components/Footer';

function GalleryAll() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDataGalleryAll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDataGalleryAll = async () => {
    setIsLoading(true);
    try {
      var res = await axios.get(`${URL_API}/collection`);
      // var collections = res.data.result;
      // console.log(collections)
      // for (let i = 0; i < collections.length; i++) {
      //   var idUser = collections[i].id_user;
      //   var res2 = await axios.get(`${URL_API}/collection/oneUser?id_user=${idUser}`)
      //   console.log(res2.data.result[idUser])
      // }
      setCollections(res.data.result);
      // console.log(user.data.result);
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const galleryAllImage = () => {
    return collections.map((val, index) => {
      return (
        <div className="galleryall-cards" key={index}>
          <img src={val.cover} alt="noImageFound" />
          <div className="cards-text">
            <div className="cards-text1">{val.title}</div>
            <div className="cards-text2">Photographer Studio</div>
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
        <div className="galleryall-pagination"></div>
      </div>
      <Footer />
    </>
  );
}

export default GalleryAll;
