import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL_API } from '../helper/url';
import { useDispatch } from 'react-redux';
import { toastError, toastSuccess } from '../redux/actions/toastActions';
import { AiFillEye } from 'react-icons/ai';
import { BsCardImage, BsCloudDownload } from 'react-icons/bs';
import Header from '../components/Header';
import HeaderUser from '../components/HeaderUser';
import SimplePopover from '../components/Popover/SimplePopover';
import { useHistory } from 'react-router';

function Collections() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataCollections, setDataCollections] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(`${URL_API}/collection/all`, config);
      setDataCollections(res.data.result);
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

  const collectionItems = () => {
    return dataCollections.map((val, index) => {
      return (
        <div className="data-item-list" key={index}>
          <div className="collections-top">
            <div className="collections-image">
              <img src={val.cover} alt="imageCollections" />
            </div>
          </div>
          <div className="collections-bottom">
            <div className="collections-text-preview">
              <div className="collections-text">{val.title}</div>
              <div className="collections-preview">
                <AiFillEye /> Preview
              </div>
            </div>
            <div className="collections-date">
              {val.date.slice(0, 10).split('-').reverse().join('-')}
            </div>
            <div className="collections-etc">
              <div className="collections-etc-image">
                <BsCardImage /> 1
              </div>
              <div className="collections-etc-download">
                <BsCloudDownload /> 2
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
