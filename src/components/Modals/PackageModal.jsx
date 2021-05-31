import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { URL_API } from '../../helper/url';

function PackageModal(props) {
  const { show, handleClose, onModalImageClick } = props;
  const [packages, setPackages] = useState([]);
  const showModal = show ? 'package-modal d-block' : 'package-modal d-none';

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
      toast.error(`${error.response.data.message}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
