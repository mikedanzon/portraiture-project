import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BsBoxArrowInDown, BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { FaRegShareSquare } from 'react-icons/fa';
import { URL_API } from '../helper/url';
import { useDispatch } from 'react-redux';
import { toastError, toastSuccess } from '../redux/actions/toastActions';
import { useHistory, useParams } from 'react-router';
import { dateFormatter } from '../helper/dateformatter';

function TempMinimalism() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [collection, setCollection] = useState({});
  const [images, setImages] = useState([]);
  const myRefOpen = useRef(null);
  const myRefBack = useRef(null);
  const dispatch = useDispatch();
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
      setUser(res.data.result.user);
      setDate(res.data.result.date);
      setCollection(res.data.result);
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
    <div className="minimalist-wrapper">
      <div ref={myRefBack} className="minimalist-header">
        <div className="mh-background">
          <img src={collection.cover} alt="" />
        </div>
        <div className="mh-info">
          <div className="mh-logo-studioname">
            <div className="mh-logo">
              <img src={`${URL_API}${user.photo}`} alt="" />
            </div>
            <div className="mh-studioname">{user.businessName}</div>
          </div>
          <div className="mh-title-date">
            <div className="mh-title">{collection.title}</div>
            <div className="mh-date">{date && dateFormatter(date)}</div>
          </div>
          <div className="mh-desc">{collection.description}</div>
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
              <div className="mm-title">{collection.title}</div>
              <div className="mm-studioname">{user.businessName}</div>
            </div>
            <div className="mm-info">
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

export default TempMinimalism;
