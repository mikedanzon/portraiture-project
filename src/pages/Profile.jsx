import React, { useEffect, useState } from 'react'
import HeaderProps from '../components/HeaderProps'
import { Form, Button } from 'react-bootstrap';
import Dummy2 from '../assets/img/dummy-img/dummy2.png'
import { useDispatch, useSelector } from 'react-redux';
import { URL_API } from '../helper/url';
import axios from 'axios';

function Profile() {
	const [businessName, setBusinessName] = useState();
	const [address, setAddress] = useState();
	const [photo, setPhoto] = useState();
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		fetchUsers()
	}, [])

	const fetchUsers = () => {
		console.log(auth.photo)
	}

  function handleEdit(event) {
    event.preventDefault();
    var data = {
      businessName: businessName,
      address: address,
      photo: photo,
      name: name,
      email: email
    };
    var configEdit = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };
    axios
    .put(`${URL_API}/user`, data, configEdit)
    .then(() => {
        dispatch({
          type: 'EDIT PROFILE',
          payload: {
            businessName: businessName,
            address: address,
            photo: photo,
            name: name,
            email: email
          },
        });
        localStorage.setItem('token', auth);
    })

  }

	return (
		<>
		<HeaderProps title="Edit Profile" link="/dashboard" />
		<div className="profile-container">
			<Form onSubmit={handleEdit} className="profile-inner-container">
				<div className="profile-bd">Business Details</div>
  				<Form.Group>
    				<Form.Label className="profile-bn">Business Name*</Form.Label>
    				<Form.Control 
            autoFocus 
            className="custom-form-port" 
            type="text"
            value={auth.businessName}
            onChange={(e) => setBusinessName(e.target.value)} 
            placeholder="Justin Studio" />
  				</Form.Group>
    			<Form.Group controlId="exampleForm.ControlTextarea1">
    				<Form.Label className="profile-ad">Address</Form.Label>
    				<Form.Control 
            className="custom-form-port" 
            as="textarea" rows={4} 
            placeholder="Jl Mekar Sari No 21 Kecamatan Gubeng, Surabaya Jawa Timur 60111"
            value={auth.address}
            onChange={(e) => setAddress(e.target.value)} />
  				</Form.Group>
  				<div>
  					<p className="profile-image">Images</p>
  					<img className="profile-image-logo" src={Dummy2} alt="logo" />
  				</div>
  				<div className="profile-ac">Account Details</div>
  				<Form.Group>
    				<Form.Label className="profile-name">Name*</Form.Label>
    				<Form.Control 
            className="custom-form-port" 
            type="text" 
            placeholder="Justin Junaedi" 
            value={auth.name}
            onChange={(e) => setName(e.target.value)} />
  				</Form.Group>
   				<Form.Group>
    				<Form.Label className="profile-email">Email*</Form.Label>
    				<Form.Control
            className="custom-form-port" 
            type="text" 
            placeholder="studio@justin.com" 
            value={auth.email}
            onChange={(e) => setEmail(e.target.value)} />
  				</Form.Group>
  				<div className="profile-button-container">
  					<Button className="profile-button" variant="primary">Save</Button>
  				</div>
			</Form>
		</div>
		</>
	)
}

export default Profile