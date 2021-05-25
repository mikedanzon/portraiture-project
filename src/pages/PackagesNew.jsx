import React, { useRef, useState } from 'react';
import { Fragment } from 'react';
import HeaderProps from '../components/HeaderProps';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { URL_API } from '../helper/url';
import { Toast } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

function PackagesNew() {
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [picture, setPicture] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [inputFields, setInputFields] = useState([
    {
      itemName: '',
      price: 0,
      // categories: null,
    },
  ]);

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
    console.log(inputFields);
    var itemFormData = new FormData();
    itemFormData.append('itemName', 'testing');
    itemFormData.append('price', 600000);
    axios({
      method: 'post',
      url: `${URL_API}/packageItem`,
      data: itemFormData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(() => {
        toast.info('Please wait connecting!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        var bodyFormData = new FormData();
        bodyFormData.append('name', name);
        bodyFormData.append('description', desc);
        bodyFormData.append('image', photo);
        axios({
          method: 'post',
          url: `${URL_API}/package`,
          data: bodyFormData,
          headers: { 'Content-Type': 'multipart/form-data' },
        })
          .then(() => {
            toast.success('Success created a new package!', {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location = '/packages';
            }, 2000);
          })
          .catch((err2) => {
            toast.error(`${err2.response.data.message}`, {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
          <div className="pnew-image-show">
            <img className="pnew-preview-image pt-3" src={picture && picture} />
          </div>
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
                          type="text"
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
                          <option value="photoSession">Photo Session</option>
                          <option value="print">Print</option>
                          <option value="digital">Digital</option>
                          <option value="other">Other</option>
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
