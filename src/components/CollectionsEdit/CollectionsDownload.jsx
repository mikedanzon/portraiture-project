import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Switch from '../Fields/Switch';
import { URL_API } from '../../helper/url';
import { toastError, toastSuccess } from '../../redux/actions';

function CollectionsDownload() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [desc, setDesc] = useState();
  const [downloadOption, setDownloadOption] = useState(true);
  const [limitDownload, setLimitDownload] = useState(false);
  const [limit, setLimit] = useState(0);
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
      setDownloadOption(res.data.result.downloadOption);
      if (res.data.result.limit) {
        setLimit(res.data.result.limit);
        setLimitDownload(true);
      }
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
    bodyFormData.append('downloadOption', downloadOption);
    if (limitDownload) {
      bodyFormData.append('limit', limit);
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
      <div className="cedit-download">
        <div className="cedit-advance-1">
          <div className="cedit-advance-1-1">
            <div className="cedit-1-1">
              <Switch
                name="downloadOption"
                value={downloadOption}
                onChange={() => setDownloadOption(!downloadOption)}
                defaultChecked={downloadOption}
              />
            </div>
            <div className="cedit-1-2">Download Option</div>
          </div>
          <div className="cedit-advance-1-2">
            Turn on to allow your client to download photos from this collection
          </div>
        </div>
        <div className="cedit-advance-2">
          <div className="cedit-advance-2-1">
            <div className="cedit-2-1">
              <Switch
                name="limitDownload"
                value={limitDownload}
                onChange={() => setLimitDownload(!limitDownload)}
                defaultChecked={limitDownload}
              />
            </div>
            <div className="cedit-2-2">Limit Total Collection Download</div>
          </div>
          <div className="cedit-advance-2-2">
            Guess only able to download collection up to the download limit.
          </div>
          <div
            className="download-limit"
            style={{ display: `${limitDownload ? 'block' : 'none'}` }}
          >
            <input
              type="text"
              placeholder="e.g. 2"
              className="custom-form-port mr-3"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          </div>
        </div>
        <button onClick={onClickSave}>Save</button>
      </div>
    </div>
  );
}

export default CollectionsDownload;
