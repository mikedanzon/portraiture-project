import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Dummy from '../assets/img/dummy-img/minimalist-background.png';
import { URL_API } from '../helper/url';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toastError, toastSuccess } from '../redux/actions/toastActions';
import { FaRegShareSquare } from 'react-icons/fa';
import { BsBoxArrowInDown, BsArrowUp } from 'react-icons/bs';
import { useHistory, useParams } from 'react-router';

function TempDarkmode() {
  // const auth = useSelector((state) => state.auth);
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const myRefOpen = useRef(null);
  const myRefBack = useRef(null);
  const [user, setUser] = useState({});
  const [collection, setCollection] = useState({});
  const [date, setDate] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchDataImage();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDataImage = async () => {
    setIsLoading(true);
    try {
      var res = await axios.get(
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

  const onClickDownload = () => {
    if (collection.downloadOption) {
      if (collection.password) {
        history.push(`/privacy/${id}`);
      } else {
        history.push(`/download/${id}`);
      }
    } else {
      dispatch(
        toastError('Sorry, you are not allowed to download this collections!')
      );
    }
  };

  const onClickShare = () => {
    navigator.clipboard.writeText(window.location.href);
    dispatch(
      toastSuccess('Link has been copied! Share it with your friend now!')
    );
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
          <img src={collection.cover} alt="" />
        </div>
        <div className="dmh-info">
          <div className="dmh-logo-studioname">
            <div className="dmh-logo">
              <img src={`${URL_API}${user.photo}`} alt="" />
            </div>
            <div className="dmh-studioname">{user.businessName}</div>
          </div>
          <div onClick={scrollOpen} className="dmh-background">
            <img src={collection.cover} alt="" />
          </div>
          <div className="dmh-titledate-desc">
            <div className="dmh-title-date">
              <div className="dmh-title">{collection.title}</div>
              <div className="dmh-date">{date}</div>
            </div>
            <div className="dmm-desc">{collection.description}</div>
          </div>
        </div>
      </div>
      <div className="darkmode-main">
        <div>
          <div ref={myRefOpen} className="dmm-title-studioname-info">
            <div className="dmm-info">
              <div className="cursor-pointer">
                <FaRegShareSquare style={{ marginBottom: '3px' }} />{' '}
                <span className="share" onClick={onClickShare}>
                  Share
                </span>
              </div>
              <div className="cursor-pointer">
                <BsBoxArrowInDown style={{ marginBottom: '3px' }} />{' '}
                <span onClick={onClickDownload}>Download</span>
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
            Copyright &#xA9; 2021 <span>{user.businessName}</span>
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
