import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL_API } from '../helper/url';
import { MdEdit } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import HeaderUser from '../components/HeaderUser';
import SimplePopover from '../components/Popover/SimplePopover';
import { useDispatch } from 'react-redux';
import { deletePackage } from '../redux/actions';

function Packages() {
  const [dataPackages, setDataPacakges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(`${URL_API}/package`, config);
      setDataPacakges(res.data.result);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setIsLoading(false);
    }
  };

  const onEditClick = (id) => {
    history.push(`/packages/edit/${id}`);
  };

  const onDeleteClick = (id) => {
    dispatch(deletePackage(id));
    setTimeout(() => {
      fetchData();
    }, 3000);
  };

  const packageItems = () => {
    return dataPackages.map((val, index) => {
      return (
        <div className="data-item-list" key={index}>
          <img src={val.image} alt="packagesNull" />
          <div className="data-item-content">
            <div className="content-text">{val.name}</div>
            <div className="content-edit">
              {/* <Link to={`/packages/edit/${val.id}`}> */}
              {/* <MdEdit /> */}
              {/* </Link> */}
              <SimplePopover
                onEditClick={() => onEditClick(val.id)}
                onDeleteClick={() => onDeleteClick(val.id)}
              />
            </div>
          </div>
          <div className="data-item-count">{val.packageItems.length} Items</div>
        </div>
      );
    });
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
      <Header />
      <div className="packages-wrapper">
        <HeaderUser
          headerOneText="Packages"
          headerOneButton="New Packages"
          headerOneLink="/packages/new"
          headerSearchText="Search Packages"
        />
        <div className="packages-main">{packageItems()}</div>
      </div>
    </>
  );
}

export default Packages;
