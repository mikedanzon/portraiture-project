import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Dummy from '../assets/img/dummy-img/minimalist-background.png';
import { URL_API } from '../helper/url';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toastError } from '../redux/actions/toastActions';
import { FaRegShareSquare } from 'react-icons/fa';
import { BsBoxArrowInDown, BsArrowUp } from 'react-icons/bs';
import { useParams } from 'react-router';

function TempClassic() {
  const { id } = useParams();
  // const auth = useSelector((state) => state.auth);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [date, setDate] = useState('');
  const [collection, setCollection] = useState({});
  const dispatch = useDispatch();
  const myRefOpen = useRef(null);
  const myRefBack = useRef(null);

  useEffect(() => {
    fetchDataImage();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDataImage = async () => {
    setIsLoading(true);
    try {
      let res = await axios.get(
        `${URL_API}/collection/one?id_collection=${id}`
      );
      let colImages = res.data.result.collectionImages.filter((item, index) => {
        return index % 2 !== 0;
      });
      console.log(res.data.result);
      setUser(res.data.result.user);
      setCollection(res.data.result);
      let date = res.data.result.date
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-');
      setDate(date);
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
    <div className="classic-wrapper">
      <div ref={myRefBack} className="classic-header">
        <div className="ch-background">
          <img src={collection.cover} alt="imageCover" />
        </div>
        <div className="ch-info">
          <div className="ch-logo-studioname">
            <div className="ch-logo">
              <img src={`${URL_API}${user.photo}`} alt="" />
            </div>
            <div className="ch-studioname">{user.businessName}</div>
          </div>
          <div className="ch-title-date">
            <div className="ch-title">{collection.title}</div>
            <div className="ch-date">{date}</div>
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
              <div className="cm-title">{collection.title}</div>
              <div className="cm-studioname">{user.businessName}</div>
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
          <div className="ch-desc">{collection.description}</div>
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
            Copyright © 2021 <span>{user.businessName}</span>
          </div>
          <div className="footer-text-bottom">
            powered by <span>portraiture</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TempClassic;
