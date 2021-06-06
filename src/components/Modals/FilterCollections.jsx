import React from 'react';

function FilterCollections() {
  return (
    <div className="filmod-coll-wrapper">
      <div className="filmod-menu-privacy">
        <div className="filmod-menu-header">Privacy</div>
        <div className="filmod-menu-text">You can only select one</div>
      </div>
      <div className="filmod-menu-theme">
        <div className="filmod-menu-header">Theme</div>
        <div className="filmod-menu-text">You may select more than one</div>
      </div>
    </div>
  );
}

export default FilterCollections;
