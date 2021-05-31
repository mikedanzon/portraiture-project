import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { URL_API } from '../helper/url';
import Header from '../components/Header';
import HeaderUser from '../components/HeaderUser';

function Collections() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataCollections, setDataCollections] = useState([]);
  const [imageCollections, setImageCollections] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      var res = await axios.get(`${URL_API}/collection`);
      setDataCollections(res.data.result);
      setIsLoading(false);
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
    }
  };

  const collectionItems = () => {
    return dataCollections.map((val, index) => {
      return (
        <div className="data-item-list" key={index}>
          {val.title}
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

  return (
    <>
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
