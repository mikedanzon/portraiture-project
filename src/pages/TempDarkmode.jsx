import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Dummy from '../assets/img/dummy-img/minimalist-background.png';
import { URL_API } from '../helper/url';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toastError } from '../redux/actions/toastActions';
import { FaRegShareSquare } from 'react-icons/fa';
import { BsBoxArrowInDown, BsArrowUp } from 'react-icons/bs';

function TempDarkmode() {
  const auth = useSelector((state) => state.auth);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const myRefOpen = useRef(null);
  const myRefBack = useRef(null);

  useEffect(() => {
    fetchDataImage();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDataImage = async () => {
    setIsLoading(true);
    try {
      var res = await axios.get(
        `${URL_API}/collectionImages/bycollection?id_collection=1`
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
    <div className="darkmode-wrapper">
      <div ref={myRefBack} className="darkmode-header">
        <div className="dmh-background-blur">
          <img src={Dummy} alt="" />
        </div>
        <div className="dmh-info">
          <div className="dmh-logo-studioname">
            <div className="dmh-logo">
              <img src={`${URL_API}${auth.photo}`} alt="" />
            </div>
            <div className="dmh-studioname">{auth.businessName}</div>
          </div>
          <div onClick={scrollOpen} className="dmh-background">
            <img src={Dummy} alt="" />
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
          {/*<div className="arrow-open">
	            <button onClick={scrollOpen}>Open</button>  
	          </div>*/}
        </div>
      </div>
      <div className="darkmode-main">
        <div>
          <div ref={myRefOpen} className="dmm-title-studioname-info">
            <div className="dmm-info">
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

export default TempDarkmode;
