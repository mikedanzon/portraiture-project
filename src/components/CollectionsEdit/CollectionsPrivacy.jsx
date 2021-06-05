import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiShow } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { URL_API } from '../../helper/url';
import { toastError, toastSuccess } from '../../redux/actions/toastActions';
import { Link } from 'react-router-dom';

function CollectionsPrivacy() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [desc, setDesc] = useState();
  const [password, setPassword] = useState('');
  const [showGallery, setShowGallery] = useState(true);
  const [collPass, setCollPass] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

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
      if (res.data.result.password) {
        setCollPass(true);
      }
      setShowGallery(res.data.result.showGallery);
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const onClickSave = (e) => {
    e.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append('title', title);
    bodyFormData.append('description', desc);
    bodyFormData.append('date', date);
    bodyFormData.append('showGallery', showGallery);
    if (collPass) {
      bodyFormData.append('password', password);
    }
    var config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    axios
      .put(`${URL_API}/collection?id_collection=${id}`, bodyFormData, config)
      .then((res) => {
        console.log(res.data.result);
        dispatch(toastSuccess('You have updated your collection!'));
        setTimeout(() => {
          history.push(`/collections`);
        }, 2000);
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  if (isLoading) {
    return (
      <>
        <div className="loader-project"></div>
      </>
    );
  }

  return (
    <div className="cedit-content">
      <div className="cedit-privacy">
        <div className="cedit-advance-1">
          <div className="cedit-advance-1-1">
            <div className="cedit-1-1">
              <label className="switch">
                <input
                  name="showGallery"
                  type="checkbox"
                  value={showGallery}
                  onChange={() => setShowGallery(!showGallery)}
                  defaultChecked={showGallery}
                />
                <span class="slider"></span>
              </label>
              {/* <Switch
                      name="showGallery"
                      value={showGallery}
                      onChange={() => setShowGallery(!showGallery)}
                      defaultChecked={showGallery}
                    /> */}
            </div>
            <div className="cedit-1-2">Show on Gallery</div>
          </div>
          <div className="cedit-advance-1-2">
            This collection available on your main page.{' '}
            <Link to="/">See page</Link>
          </div>
        </div>
        <div className="cedit-advance-2">
          <div className="cedit-advance-2-1">
            <div className="cedit-2-1">
              <label className="switch">
                <input
                  type="checkbox"
                  value={collPass}
                  onChange={() => setCollPass(!collPass)}
                  defaultChecked={collPass}
                />
                <span class="slider"></span>
              </label>
              {/* <Switch
                      name="collPass"
                      value={collPass}
                      onChange={() => setCollPass(!collPass)}
                      defaultChecked={collPass}
                    /> */}
            </div>
            <div className="cedit-2-2">Collection Password</div>
          </div>
          <div className="cedit-advance-2-2">
            Turn on to have a generated password for all guest in order to see
            your collection
          </div>
          <div
            className="cedit-advance-2-3"
            style={{ display: `${collPass ? 'block' : 'none'}` }}
          >
            <input
              type={`${hidePass ? 'password' : 'text'}`}
              placeholder="Set a password"
              className="custom-form-port mr-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <BiShow
              className="cedit-eye"
              onClick={() => setHidePass(!hidePass)}
            />
          </div>
        </div>
        <button onClick={onClickSave}>Save</button>
      </div>
    </div>
  );
}

export default CollectionsPrivacy;
