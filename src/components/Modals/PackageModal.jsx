import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import { URL_API } from '../../helper/url';
import { useDispatch } from 'react-redux';
import { toastError } from '../../redux/actions/toastActions';

function PackageModal(props) {
  const { show, handleClose, onModalImageClick } = props;
  const [packages, setPackages] = useState([]);
  const showModal = show ? 'package-modal d-block' : 'package-modal d-none';
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(`${URL_API}/package`, config);
      setPackages(res.data.result);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
    }
  };

  const renderPackages = () => {
    return packages.map((val, index) => {
      return (
        <div className="data-item-list" key={index}>
          <img
            src={val.image}
            alt="packagesNull"
            className="cursor-pointer"
            onClick={() => onModalImageClick(val.id)}
          />
          <div className="data-item-text">{val.name}</div>
          <div className="data-item-count">{val.packageItems.length} Items</div>
        </div>
      );
    });
  };

  return (
    <div className={showModal}>
      <div className="package-modal-main">
        <div className="package-modal-header">
          <div className="modal-header-text">Select Package</div>
          <div className="modal-header-close">
            <span onClick={handleClose} className="cursor-pointer">
              <AiOutlineClose />
            </span>
          </div>
        </div>
        <div className="package-modal-content">{renderPackages()}</div>
      </div>
    </div>
  );
}

export default PackageModal;
