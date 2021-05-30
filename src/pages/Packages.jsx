import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL_API } from '../helper/url';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePackage } from '../redux/actions';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import HeaderUser from '../components/HeaderUser';
import SimplePopover from '../components/Popover/SimplePopover';

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
              <SimplePopover
                onEditClick={() => onEditClick(val.id)}
                onDeleteClick={() => onDeleteClick(val.id)}
                buttonName="Edit"
              />
            </div>
          </div>
          <div className="data-item-count">{val.packageItems.length} Items</div>
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
      <div className="packages-wrapper">
        <HeaderUser
          headerOneText="Packages"
          headerOneButton="New Package"
          headerOneLink="/packages/new"
          headerSearchText="Search Packages"
          onClick={onClickFilter}
        />
        <div className="packages-main">{packageItems()}</div>
      </div>
    </>
  );
}

export default Packages;
