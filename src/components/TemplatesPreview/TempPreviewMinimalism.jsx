import React, { useRef } from 'react';
import { BsBoxArrowInDown, BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { FaRegShareSquare } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { URL_API } from '../../helper/url';

function TempPreviewMinimalism(props) {
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
    <div className="minimalist-wrapper">
      <div ref={myRefBack} className="minimalist-header">
        <div className="mh-background">
          <img src={URL.createObjectURL(imagePreview[imageCover])} alt="" />
        </div>
        <div className="mh-info">
          <div className="mh-logo-studioname">
            <div className="mh-logo">
              <img src={`${URL_API}${auth.photo}`} alt="" />
            </div>
            <div className="mh-studioname">{auth.businessName}</div>
          </div>
          <div className="mh-title-date">
            <div className="mh-title">Leon & Stella</div>
            <div className="mh-date">28 June 2021</div>
          </div>
          <div className="mh-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            expedita eos nisi officiis.
          </div>
          <div className="arrow-open">
            <button onClick={scrollOpen}>
              <div>Open</div>
              <BsArrowDown size={30} />
            </button>
          </div>
        </div>
      </div>
      <div className="minimalist-main">
        <div ref={myRefOpen} className="cobascroll">
          <div className="mm-title-studioname-info">
            <div className="mm-title-studioname">
              <div className="mm-title">Leon & Stella</div>
              <div className="mm-studioname">{auth.businessName}</div>
            </div>
            <div className="mm-info">
              <div>
                <FaRegShareSquare style={{ marginBottom: '3px' }} />{' '}
                <span className="share">Share</span>
              </div>
              <div>
                <BsBoxArrowInDown style={{ marginBottom: '3px' }} />{' '}
                <span>Download</span>
              </div>
            </div>
          </div>
          <div className="mm-cards-wrapper">{collectionAllImage()}</div>
        </div>
        <div>
          <div className="arrow-back">
            <button onClick={scrollBack}>
              <div>Back to top</div>
              <BsArrowUp size={30} />
            </button>
          </div>
        </div>
        <div className="minimalist-footer">
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

export default TempPreviewMinimalism;
