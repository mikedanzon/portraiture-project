import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BsBoxArrowInDown, BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { FaRegShareSquare } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { URL_API } from '../helper/url';
import { useDispatch } from 'react-redux';
import { toastError } from '../redux/actions/toastActions';

function TemplateMinimalist() {
  const auth = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const myRefOpen = useRef(null);
  const myRefBack = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDataImage();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDataImage = async () => {
    setIsLoading(true);
    try {
      var res = await axios.get(
        `${URL_API}/collectionImages/bycollection?id_collection=14`
      );
      let colImages = res.data.result.filter((item, index) => {
        return index % 2 !== 0;
      });
      setImages(colImages);
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const collectionAllImage = () => {
    return images.map((val, index) => {
      return <img src={val.image} alt="" />;
    });
  };

  const scrollOpen = () => {
    myRefOpen.current.scrollIntoView({ top: 0, left: 0, behavior: 'smooth' });
  };
  const scrollBack = () => {
    myRefBack.current.scrollIntoView({ top: 0, left: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <>
        <div className="loader"></div>
      </>
    );
  }

  return (
    <div className="minimalist-wrapper">
      <div ref={myRefBack} className="minimalist-header">
        <div className="ch-background">
          <img src={images[0].image} alt="" />
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
          <div className="ch-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            expedita eos nisi officiis.
          </div>
          <div onClick={scrollOpen} className="arrow-open">
            <div>Open</div>
            <BsArrowDown size={30} />
          </div>
        </div>
      </div>
      <div className="minimalist-main">
        <div ref={myRefOpen} className="cobascroll">
          <div className="cm-title-studioname-info">
            <div className="cm-title-studioname">
              <div className="cm-title">Leon & Stella</div>
              <div className="cm-studioname">{auth.businessName}</div>
            </div>
            <div className="cm-info">
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

export default TemplateMinimalist;
