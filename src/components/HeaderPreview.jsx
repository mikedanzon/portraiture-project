import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';

function HeaderPreview(props) {
  return (
    <div
      style={{
        padding: '30px',
        background: '#373737',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <div
        onClick={props.onClickBack}
        className="cursor-pointer"
        style={{
          position: 'fixed',
          top: '15px',
          left: '20px',
          background: '#373737',
          padding: '15px',
          borderRadius: '7px',
        }}
      >
        <IoIosArrowBack size={16} style={{ marginTop: '-2px' }} />
        Back
      </div>
      <div>
        Viewing collection as <b>Owner</b>
      </div>
    </div>
  );
}

export default HeaderPreview;
