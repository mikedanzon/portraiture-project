import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { AiFillEye } from 'react-icons/ai';
import { toastSuccess, toastError } from '../../redux/actions';
import { URL_API } from '../../helper/url';
import { useParams } from 'react-router';
import ThemeClass from '../../assets/img/collections/theme-classic.png';
import ThemeMin from '../../assets/img/collections/theme-minimalism.png';
import ThemeDark from '../../assets/img/collections/theme-dark.png';
import TempPreviewClassic from '../TemplatesPreview/TempPreviewClassic';
import TempPreviewMinimalism from '../TemplatesPreview/TempPreviewMinimalism';
import TempPreviewDarkmode from '../TemplatesPreview/TempPreviewDarkmode';

function CollectionsTheme() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [page, setPage] = useState(0);
  const [images, setImages] = useState([]);
  const [cover, setCover] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    setIsLoading(true);
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(
        `${URL_API}/collection/one?id_collection=${id}`,
        config
      );
      setTitle(res.data.result.title);
      setDate(res.data.result.date.slice(0, 10));
      setDesc(res.data.result.description);
      setTheme(res.data.result.theme);
      setImages(res.data.result.collectionImages);
      setCover(res.data.result.cover);
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const onSaveTheme = (e) => {
    e.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append('title', title);
    bodyFormData.append('description', desc);
    bodyFormData.append('date', date);
    bodyFormData.append('theme', theme);
    var config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    axios
      .put(`${URL_API}/collection?id_collection=${id}`, bodyFormData, config)
      .then((res) => {
        dispatch(toastSuccess('Your theme has been changed!'));
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  const previewTheme = () => {
    if (theme === 'Classic') {
      setPage('Classic');
    } else if (theme === 'Minimalism') {
      setPage('Minimalism');
    } else if (theme === 'Darkmode') {
      setPage('Darkmode');
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="loader-project"></div>
      </>
    );
  }

  return (
    <>
      {page === 'Classic' ? (
        <TempPreviewClassic imagePreview={images} imageCover={cover} />
      ) : page === 'Minimalism' ? (
        <TempPreviewMinimalism imagePreview={images} imageCover={cover} />
      ) : page === 'Darkmode' ? (
        <TempPreviewDarkmode imagePreview={images} imageCover={cover} />
      ) : (
        <div className="cedit-content">
          <div className="cedit-theme">
            <div className="cedit-theme-1">
              <span
                className="theme-pointer pb-2"
                onClick={() => setTheme('Classic')}
              >
                <img
                  className={
                    theme === 'Classic' ? 'cedit-theme-img-active' : null
                  }
                  src={ThemeClass}
                  alt="classTheme"
                />
                <div className="cedit-theme-text">Classic</div>
              </span>
            </div>
            <div className="cedit-theme-2 pb-2">
              <span
                className="theme-pointer"
                onClick={() => setTheme('Minimalism')}
              >
                <img
                  className={
                    theme === 'Minimalism' ? 'cedit-theme-img-active' : null
                  }
                  src={ThemeMin}
                  alt="classTheme"
                />
                <div className="cedit-theme-text">Minimalism</div>
              </span>
            </div>
            <div className="cedit-theme-3 pb-2">
              <span
                className="theme-pointer"
                onClick={() => setTheme('Darkmode')}
              >
                <img
                  className={
                    theme === 'Darkmode' ? 'cedit-theme-img-active' : null
                  }
                  src={ThemeDark}
                  alt="classTheme"
                />
                <div className="cedit-theme-text">Dark Mode</div>
              </span>
            </div>
          </div>
          {theme ? (
            <div className="cedit-theme-preview">
              <div className="theme-preview">
                <span className="theme-pointer" onClick={previewTheme}>
                  <div className="theme-preview-wrap">
                    <div className="theme-preview-text-1">
                      <AiFillEye />
                    </div>
                    <div className="theme-preview-text-2">Preview</div>
                  </div>
                </span>
              </div>
            </div>
          ) : null}
          <div className="cedit-theme-button">
            <Button variant="none" onClick={onSaveTheme} disabled={!theme}>
              Save
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default CollectionsTheme;
