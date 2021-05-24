import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { BiFilter } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';
import { URL_API } from '../helper/url';
import { Link } from 'react-router-dom';

function Packages() {
  const [dataPackages, setDataPacakges] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      var res = await axios.get(`${URL_API}/package`);
      setDataPacakges(res.data.result);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const packageItems = () => {
    return dataPackages.map((val, index) => {
      return (
        <div className={`data-item-list`} key={index}>
          <img src={val.image} alt="packagesNull" />
        </div>
      );
    });
  };

  return (
    <>
      <Header />
      <div className="packages-wrapper">
        <div className="packages-header">
          <div className="packages-header-text">Packages</div>
          <div className="packages-header-new">
            <button>
              <Link to="/packages/new">New Packages</Link>
            </button>
          </div>
        </div>
        <div className="packages-header-2">
          <div className="packages-header-search">
            <input type="text" placeholder="Search packages" />
            <span className="packages-header-search-icon">
              <AiOutlineSearch />
            </span>{' '}
          </div>
          <div className="packages-header-filter">
            <BiFilter /> Filter
          </div>
        </div>
        <div className="packages-main">{packageItems()}</div>
      </div>
    </>
  );
}

export default Packages;
