import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { URL_API } from '../helper/url';
import HeaderProps from '../components/HeaderProps';

function Profile() {
  const [businessName, setBusinessName] = useState();
  const [address, setAddress] = useState();
  const [photo, setPhoto] = useState();
  const [picture, setPicture] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(`${URL_API}/user/one`, config);
      getUserData(res);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getUserData = (res) => {
    setBusinessName(res.data.result.businessName);
    setAddress(res.data.result.address);
    setEmail(res.data.result.email);
    setName(res.data.result.name);
    setPhoto(res.data.result.photo);
  };

  const onPhotoChange = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
    setPhoto(e.target.files[0]);
  };

  const onSave = (e) => {
    e.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append('photo', photo);
    bodyFormData.append('name', name);
    bodyFormData.append('businessName', businessName);
    bodyFormData.append('address', address);
    bodyFormData.append('email', email);
    axios({
      method: 'put',
      url: `${URL_API}/user`,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        toast.success('Your profile has been updated!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location = '/dashboard';
        }, 2000);
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
      <HeaderProps title="Edit Profile" link="/dashboard" />
      <div className="profile-container">
        <Form onSubmit={onSave} className="profile-inner-container">
          <div className="profile-bd">Business Details</div>
          <Form.Group>
            <Form.Label className="profile-bn">Business Name*</Form.Label>
            <Form.Control
              autoFocus
              className="custom-form-port"
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder={businessName}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="profile-ad">Address</Form.Label>
            <Form.Control
              className="custom-form-port"
              as="textarea"
              rows={4}
              placeholder={address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <div className="profile-photo">
            <div className="profile-photo-text">Images</div>
            <div className="profile-photo-upload">
              <input id="previewImage" type="file" onChange={onPhotoChange} />
            </div>
            <div className="profile-photo-preview">
              {picture ? (
                <img src={picture} alt="logo" />
              ) : (
                <img src={`${URL_API}${photo}`} alt="logo" />
              )}
            </div>
          </div>
          <div className="profile-ac">Account Details</div>
          <Form.Group>
            <Form.Label className="profile-name">Name*</Form.Label>
            <Form.Control
              className="custom-form-port"
              type="text"
              placeholder={name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="profile-email">Email*</Form.Label>
            <Form.Control
              className="custom-form-port"
              type="text"
              placeholder={email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <div className="profile-button-container">
            <Button
              className="profile-button"
              variant="primary"
              onClick={onSave}
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Profile;
