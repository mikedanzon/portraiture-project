import React, { useRef } from 'react';
import { URL_API } from '../../helper/url';
import { useSelector } from 'react-redux';
import { FaRegShareSquare } from 'react-icons/fa';
import { BsBoxArrowInDown, BsArrowUp } from 'react-icons/bs';

function TempPreviewClassic(props) {
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
    <div className="classic-wrapper">
      <div ref={myRefBack} className="classic-header">
        <div className="ch-background">
          <img src={URL.createObjectURL(imagePreview[imageCover])} alt="" />
        </div>
        <div className="ch-info">
          <div className="ch-logo-studioname">
            <div className="ch-logo">
              <img src={`${URL_API}${auth.photo}`} alt="" />
            </div>
            <div className="ch-studioname">{auth.businessName}</div>
          </div>
          <div className="ch-title-date">
            <div className="ch-title">Leon & Stella</div>
            <div className="ch-date">28 June 2021</div>
          </div>
          <div className="arrow-open">
            <button onClick={scrollOpen}>Open</button>
          </div>
        </div>
      </div>
      <div className="classic-main">
        <div>
          <div ref={myRefOpen} className="cm-title-studioname-info">
            <div className="cm-title-studioname">
              <div className="cm-title">Leon & Stella</div>
              <div className="cm-studioname">{auth.businessName}</div>
            </div>
            <div className="cm-info">
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
          <div className="ch-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            expedita eos nisi officiis.
          </div>
          <div className="cm-cards-wrapper">{collectionAllImage()}</div>
        </div>
        <div>
          <div className="arrow-back">
            <button onClick={scrollBack}>
              <div>Back to top</div>
              <BsArrowUp size={30} />
            </button>
          </div>
        </div>
        <div className="classic-footer">
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

export default TempPreviewClassic;
