import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { URL_API } from '../../helper/url';
import PackageModal from '../Modals/PackageModal';

function ProjectPackages() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [modal, setModal] = useState(false);
  const [isPackage, setIsPackage] = useState(false);
  const [packageData, setPackageData] = useState({});
  const [packageItems, setPackageItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(`${URL_API}/project/one?id=${id}`, config);
      if (res.data.result.id_package) {
        setIsPackage(true);
        fetchPackage(res.data.result.id_package);
      }
      setData(res.data.result);
      setIsLoading(false);
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
      setIsLoading(false);
    }
  };

  const fetchPackage = async (idPackage) => {
    setIsLoading(true);
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(
        `${URL_API}/package/one?packageId=${idPackage}`,
        config
      );
      setPackageData(res.data.result);
      if (res.data.result.packageItems) {
        getFullPrice(res.data.result.packageItems);
        setPackageItems(res.data.result.packageItems);
      }
      setIsLoading(false);
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
      setIsLoading(false);
    }
  };

  const getFullPrice = (x) => {
    var total = 0;
    for (var i = 0; i < x.length; i++) {
      total += x[i].price;
    }
    setTotalPrice(`Rp ${new Intl.NumberFormat('de-DE').format(total)},00`);
  };

  const onModalImageClick = (idPackage) => {
    var config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    const bodyFormData = new FormData();
    bodyFormData.append('id_package', idPackage);
    axios
      .put(`${URL_API}/project/addPackage?id=${id}`, bodyFormData, config)
      .then(() => {
        toast.success('Success added a new package!', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        fetchData();
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    setModal(!modal);
  };

  const mapPackageItems = () => {
    return packageItems.map((val, index) => {
      return (
        <div className="package-true-items-list" key={index}>
          <li>{val.itemName}</li>
        </div>
      );
    });
  };

  if (isLoading) {
    return (
      <>
        <div className="loader-project"></div>
      </>
    );
  }

  return (
    <div className="projects-package-wrapper">
      <div className="package-content">
        {isPackage ? (
          <div className="package-true">
            <div className="package-true-left">
              <PackageModal
                show={modal}
                handleClose={() => setModal(false)}
                onModalImageClick={onModalImageClick}
              />
              <div className="package-true-image">
                <img
                  src={packageData.image}
                  alt="packagenull"
                  onClick={() => setModal(!modal)}
                />
              </div>
            </div>
            <div className="package-true-right">
              <div className="package-true-name">{packageData.name}</div>
              <div className="package-true-price">{totalPrice}</div>
              <div className="package-true-items">
                <div className="package-true-items-text">Items</div>
                <div className="package-true-items-content">
                  <ul>{mapPackageItems()}</ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="package-empty">
            <PackageModal
              show={modal}
              handleClose={() => setModal(false)}
              onModalImageClick={onModalImageClick}
            />
            <button onClick={() => setModal(!modal)}>Add Package</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectPackages;
