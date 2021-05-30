import React from 'react';
import { CgOptions } from 'react-icons/cg';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function HeaderUser(props) {
  const {
    headerOneText,
    headerOneButton,
    headerSearchText,
    headerOneLink,
    onClick,
  } = props;

  return (
    <div className="header-user-wrapper">
      <div className="header-user-1">
        <div className="header-1-text">{headerOneText}</div>
        <div className="header-1-button">
          <Link to={headerOneLink}>
            <button>{headerOneButton}</button>
          </Link>
        </div>
      </div>
      <div className="header-user-2">
        <div className="header-2-search">
          <div className="header-2-search-1">
            <input
              className="header-searchbar"
              type="search"
              placeholder={headerSearchText}
            />
          </div>
          <div className="header-2-search-2">
            <FiSearch size={16} />
          </div>
        </div>
        <div className="header-2-filter">
          <button onClick={onClick}>
            <CgOptions /> Filter
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderUser;
