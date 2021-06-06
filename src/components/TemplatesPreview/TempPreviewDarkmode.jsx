import React, { useState, useEffect, useRef } from 'react';
import { URL_API } from '../../helper/url';
import { useSelector } from 'react-redux';
import { FaRegShareSquare } from 'react-icons/fa';
import { BsBoxArrowInDown, BsArrowUp } from 'react-icons/bs';

function TempPreviewDarkmode(props) {
  const { imagePreview, imageCover } = props;
  const auth = useSelector((state) => state.auth);
  const myRefOpen = useRef(null);
  const myRefBack = useRef(null);

  const collectionAllImage = () => {
    return imagePreview.map((val, index) => {
      return <img src={URL.createObjectURL(val)} alt="" />;
    });
  };

  const scrollOpen = () => {
    myRefOpen.current.scrollIntoView({ top: 0, left: 0, behavior: 'smooth' });
  };
  const scrollBack = () => {
    myRefBack.current.scrollIntoView({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div className="darkmode-wrapper">
      <div ref={myRefBack} className="darkmode-header">
        <div className="dmh-background-blur">
          <img src={URL.createObjectURL(imagePreview[imageCover])} alt="" />
        </div>
        <div className="dmh-info">
          <div className="dmh-logo-studioname">
            <div className="dmh-logo">
              <img src={`${URL_API}${auth.photo}`} alt="" />
            </div>
            <div className="dmh-studioname">{auth.businessName}</div>
          </div>
          <div onClick={scrollOpen} className="dmh-background">
            <img src={URL.createObjectURL(imagePreview[imageCover])} alt="" />
          </div>
          <div className="dmh-titledate-desc">
            <div className="dmh-title-date">
              <div className="dmh-title">Leon & Stella</div>
              <div className="dmh-date">28 June 2021</div>
            </div>
            <div className="dmm-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              expedita eos nisi officiis.
            </div>
          </div>
        </div>
      </div>
      <div className="darkmode-main">
        <div>
          <div ref={myRefOpen} className="dmm-title-studioname-info">
            <div className="dmm-info">
              <div className="cursor-pointer">
                <FaRegShareSquare style={{ marginBottom: '3px' }} />{' '}
                <span className="share">Share</span>
              </div>
              <div className="cursor-pointer">
                <BsBoxArrowInDown style={{ marginBottom: '3px' }} />{' '}
                <span>Download</span>
              </div>
            </div>
          </div>
          <div className="dmm-cards-wrapper">{collectionAllImage()}</div>
        </div>
        <div>
          <div className="arrow-back">
            <button onClick={scrollBack}>
              <div>Back to top</div>
              <BsArrowUp size={30} />
            </button>
          </div>
        </div>
        <div className="darkmode-footer">
          <div className="footer-text-top">
            Copyright &#xA9; 2021 <span>{auth.businessName}</span>
          </div>
          <div className="footer-text-bottom">
            powered by <span>portraiture</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TempPreviewDarkmode;
