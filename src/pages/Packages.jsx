import React from 'react';
import Header from '../components/Header';
import { BiFilter } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';

function Packages() {
  return (
    <>
      <Header />
      <div className="packages-wrapper">
        <div className="packages-header">
          <div className="packages-header-text">Packages</div>
          <div className="packages-header-new">
            <button>New Packages</button>
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
        <div className="packages-main">
          Content nanti disini dari backend di mapping
        </div>
      </div>
    </>
  );
}

export default Packages;
