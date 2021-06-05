import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import { URL_API } from '../helper/url';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import {
  toastError,
  toastInfo,
  toastSuccess,
} from '../redux/actions/toastActions';
import HeaderProps from '../components/HeaderProps';
import NoImage from '../assets/img/no_image.png';

function PackagesNew() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [picture, setPicture] = useState(null);
  const [photo, setPhoto] = useState(null);
  const history = useHistory();
  const [inputFields, setInputFields] = useState([
    {
      itemName: '',
      price: 0,
      category: null,
    },
  ]);
  const dispatch = useDispatch();

  const onPhotoChange = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
    setPhoto(e.target.files[0]);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === 'itemName') {
      values[index].itemName = event.target.value;
    } else if (event.target.name === 'price') {
      values[index].price = event.target.value;
    } else {
      values[index].category = event.target.value;
    }
    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ itemName: '', price: '', category: '' });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const onSave = (e) => {
    e.preventDefault();
    if (inputFields[0].itemName === '') {
      return postData();
    }
    var itemFormData = new FormData();
    for (var i = 0; i < inputFields.length; i++) {
      itemFormData.append('itemName', inputFields[i].itemName);
      itemFormData.append('price', inputFields[i].price);
      itemFormData.append('id_category', inputFields[i].category);
    }
    axios({
      method: 'post',
      url: `${URL_API}/packageItem`,
      data: itemFormData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(() => {
        dispatch(toastInfo('Please wait connecting!'));
        postData();
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  const postData = () => {
    var bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('description', desc);
    bodyFormData.append('image', photo);
    axios({
      method: 'post',
      url: `${URL_API}/package`,
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(() => {
        dispatch(toastSuccess('Success created a new package!'));
        history.push('/packages');
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  if (!localStorage.getItem('token')) {
    return (
      <div className="notfound">
        <div className="notfound-inside">
          <h1>You need to login to view this page!</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeaderProps title="Create Package" link="/packages" />
      <div className="pnew-wrapper">
        <div className="pnew-details">Package Details</div>
        <div className="pnew-name">
          <div className="pnew-name-1">Name*</div>
          <div className="pnew-name-2">
            <input
              type="text"
              className="custom-form-port"
              placeholder="e.g. Professional Photoshoot Session"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="pnew-desc">
          <div className="pnew-desc-1">Description</div>
          <div className="pnew-desc-2">
            <input
              type="text"
              className="custom-form-port"
              placeholder="Type collection description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>
        <div className="pnew-image">
          <div className="pnew-image-1">Images</div>
          <div className="pnew-image-2">
            <input id="previewImage" type="file" onChange={onPhotoChange} />
          </div>
          {picture ? (
            <div className="pnew-image-show">
              <img
                className="pnew-preview-image pt-3"
                src={picture && picture}
                alt="previewImage"
              />
            </div>
          ) : (
            <div className="pnew-image-show">
              <img
                className="pnew-preview-image pt-3"
                src={NoImage}
                alt="previewImage"
              />
            </div>
          )}
        </div>
        <div className="pnew-items">
          <div className="pnew-items-text">Package Item</div>
          {inputFields.map((inputField, index) => (
            <div className="pnew-items-main">
              <form>
                <div className="pnew-form">
                  <Fragment key={`${inputField}~${index}`}>
                    <div className="pnew-form-close">
                      <span onClick={() => handleRemoveFields(index)}>
                        <AiOutlineClose />
                      </span>
                    </div>
                    <div className="pnew-form-text-1">
                      <div className="pnew-form-text-1-name">
                        <label htmlFor="itemName">Item Name*</label>
                      </div>
                      <div className="pnew-form-text-1-input">
                        <input
                          className="custom-form-port"
                          type="text"
                          id="itemName"
                          name="itemName"
                          value={inputField.itemName}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                      </div>
                    </div>
                    <div className="pnew-form-text-2">
                      <div className="pnew-form-text-1-name">
                        <label htmlFor="price">Price*</label>
                      </div>
                      <div className="pnew-form-text-1-input">
                        <input
                          className="custom-form-port"
                          type="number"
                          id="price"
                          name="price"
                          value={inputField.price}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                      </div>
                    </div>
                    <div className="pnew-form-text-3">
                      <div className="pnew-form-text-1-name">
                        <label htmlFor="category">Category*</label>
                      </div>
                      <div className="pnew-form-text-1-input">
                        <select
                          className="custom-form-port"
                          value={inputField.category}
                          onChange={(event) => handleInputChange(index, event)}
                        >
                          <option hidden>Select Category</option>
                          <option value="1">Photo Session</option>
                          <option value="2">Videography</option>
                          <option value="3">Print</option>
                          <option value="4">Digital</option>
                          <option value="5">Other</option>
                        </select>
                      </div>
                    </div>
                  </Fragment>
                </div>
              </form>
            </div>
          ))}
          <div className="pnew-items-button">
            <button onClick={() => handleAddFields()}>+ Add Item</button>
          </div>
        </div>
        <div className="pnew-save">
          <button onClick={onSave}>Save</button>
        </div>
      </div>
    </>
  );
}

export default PackagesNew;
