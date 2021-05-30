import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Dummy3 from '../assets/img/dummy-img/dummy3.png';
import { AiFillEdit } from 'react-icons/ai';
import {
  BsImage,
  BsBoxArrowInDown,
  BsEyeFill,
} from 'react-icons/bs';
import axios from 'axios';
import { URL_API } from '../helper/url';
import { Link, useHistory } from 'react-router-dom';
import HeaderUser from '../components/HeaderUser';
import { useDispatch } from 'react-redux';
import { deletePackage } from '../redux/actions';
import SimplePopover from '../components/Popover/SimplePopover';

function Collections() {
  const [dataCollections, setDataCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch(`${URL_API}/collection`)
    .then(res => res.json())
    .then(data => setDataCollections(data.result))
    try {
      var res = await axios.get(`${URL_API}/collection`);
      console.log(res.data.result);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const onEditClick = (id) => {
    history.push(`/collections/edit/${id}`);
  };

  const onDeleteClick = (id) => {
    dispatch(deletePackage(id));
    setTimeout(() => {
      fetchData();
    }, 3000);
  };

  const collectionsItems = () => {
    return dataCollections.map((val, index) => {
      return (
        <div className="data-item-list" key={index}>
          <img src={Dummy3} alt="packagesNull" />
          <div className="data-item-content">
            <div className="content-text">{val.title}</div>
            <div className="content-preview">
              <BsEyeFill size={18} style={{marginTop: "2px", marginRight: "5px"}}/>
              <div className="content-preview-text">Preview</div>
            </div>
          </div>
          <div className="content-date">28 June 2021</div>
          <div className="content-desc">
            <div className="content-img-count">
              <BsImage size={18} style={{marginTop: "2px", marginRight: "5px"}}/>
              <div>13</div>
            </div>
            <div className="content-down-count">
              <BsBoxArrowInDown size={18} style={{marginTop: "2px", marginRight: "5px", marginLeft:"20px"}}/>
              <div>3</div>
            </div>
            <div className="content-edit">
              <SimplePopover
                onEditClick={() => onEditClick(val.id)}
                onDeleteClick={() => onDeleteClick(val.id)}
              />
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Header />
      <Header />
      <div className="collections-wrapper">
        <HeaderUser
          headerOneText="Collections"
          headerOneButton="New Collection"
          headerOneLink="/collections/new"
          headerSearchText="Search Collections"
        />
        <div className="collections-main">{collectionsItems()}</div>
      </div>
    </>
  );
}

export default Collections;
