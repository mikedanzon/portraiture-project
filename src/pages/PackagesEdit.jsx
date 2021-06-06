import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { URL_API } from '../helper/url';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import {
  toastError,
  toastInfo,
  toastSuccess,
} from '../redux/actions/toastActions';
import HeaderProps from '../components/HeaderProps';

function PackagesEdit() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [picture, setPicture] = useState(null);
  const [packageItemId, setPackageItemId] = useState(0);
  const [inputFields, setInputFields] = useState([
    {
      itemName: '',
      price: 0,
      category: null,
    },
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    setIsLoading(true);
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(
        `${URL_API}/package/one?packageId=${id}`,
        config
      );
      setName(res.data.result.name);
      setDesc(res.data.result.description);
      setImage(res.data.result.image);
      setPackageItemId(res.data.result.id_package);
      var fields = res.data.result.packageItems;
      for (var i = 0; i < fields.length; i++) {
        if (fields[i].category.name === 'Photo Session') {
          fields[i].category = 1;
        } else if (fields[i].category.name === 'Videography') {
          fields[i].category = 2;
        } else if (fields[i].category.name === 'Print') {
          fields[i].category = 3;
        } else if (fields[i].category.name === 'Digital') {
          fields[i].category = 4;
        } else if (fields[i].category.name === 'Other') {
          fields[i].category = 5;
        }
      }
      setInputFields(fields);
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const onPhotoChange = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
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
    var itemFormData = new FormData();
    for (var i = 0; i < inputFields.length; i++) {
      itemFormData.append('itemName', inputFields[i].itemName);
      itemFormData.append('price', inputFields[i].price);
      itemFormData.append('id_category', inputFields[i].category);
    }
    itemFormData.append('packageId', id);
    itemFormData.append('packageItemId', packageItemId);
    axios({
      method: 'put',
      url: `${URL_API}/packageItem`,
      data: itemFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
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
    if (picture) {
      bodyFormData.append('image', image);
    }
    bodyFormData.append('packageId', id);
    axios({
      method: 'put',
      url: `${URL_API}/package`,
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(() => {
        dispatch(toastSuccess('Success edited the package!'));
        setTimeout(() => {
          window.location = '/packages';
        }, 2000);
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  if (isLoading) {
    return (
      <>
        <HeaderProps title="Edit Profile" link="/dashboard" />
        <div className="loader"></div>
      </>
    );
  }

  return (
    <>
      <HeaderProps title="Edit Package" link="/packages" />
      <div className="pedit-wrapper">
        <div className="pedit-text">Package Details</div>
        <div className="pedit-name">
          <div className="pedit-name-text">Name*</div>
          <div className="pedit-name-input">
            <input
              type="text"
              className="custom-form-port"
              placeholder={name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="pedit-desc">
          <div className="pedit-desc-text">Description</div>
          <div className="pedit-desc-input">
            <input
              type="text"
              className="custom-form-port"
              placeholder={desc}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>
        <div className="pedit-image">
          <div className="pedit-image-text">Images</div>
          <div className="pedit-image-input">
            <input id="previewImage" type="file" onChange={onPhotoChange} />
          </div>
          <div className="pedit-image-preview">
            {picture ? (
              <img
                className="pedit-preview-image pt-3"
                src={picture && picture}
                alt="imagePreview"
              />
            ) : (
              <img
                className="pedit-preview-image pt-3"
                src={image}
                alt="imagePreview"
              />
            )}
          </div>
        </div>
        <div className="pedit-items">
          <div className="pedit-items-text">Package Item</div>
          {inputFields.map((inputField, index) => (
            <div className="pedit-items-main">
              <form>
                <div className="pedit-form">
                  <Fragment key={`${inputField}~${index}`}>
                    <div className="pedit-form-close">
                      <span onClick={() => handleRemoveFields(index)}>
                        <AiOutlineClose />
                      </span>
                    </div>
                    <div className="pedit-form-text-1">
                      <div className="pedit-form-text-1-name">
                        <label htmlFor="itemName">Item Name*</label>
                      </div>
                      <div className="pedit-form-text-1-input">
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
                    <div className="pedit-form-text-2">
                      <div className="pedit-form-text-1-name">
                        <label htmlFor="price">Price*</label>
                      </div>
                      <div className="pedit-form-text-1-input">
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
                    <div className="pedit-form-text-3">
                      <div className="pedit-form-text-1-name">
                        <label htmlFor="category">Category*</label>
                      </div>
                      <div className="pedit-form-text-1-input">
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
          <div className="pedit-items-button">
            <button onClick={() => handleAddFields()}>+ Add Item</button>
          </div>
        </div>
        <div className="pedit-save">
          <button onClick={onSave}>Save</button>
        </div>
      </div>
    </>
  );
}

export default PackagesEdit;
