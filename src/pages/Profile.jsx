import React from 'react'
import HeaderProps from '../components/HeaderProps'
import { Form, Button } from 'react-bootstrap';
import Dummy2 from '../assets/img/dummy-img/dummy2.png'

function Profile() {
	return (
		<>
		<HeaderProps title="Edit Profile" link="/dashboard" />
		<div className="profile-container">
			<Form className="profile-inner-container">
				<div className="profile-bd">Business Details</div>
  				<Form.Group>
    				<Form.Label className="profile-bn">Business Name*</Form.Label>
    				<Form.Control autoFocus className="custom-form-port" type="text" placeholder="Justin Studio" />
  				</Form.Group>
    			<Form.Group controlId="exampleForm.ControlTextarea1">
    				<Form.Label className="profile-ad">Address</Form.Label>
    				<Form.Control className="custom-form-port" as="textarea" rows={4} placeholder="Jl Mekar Sari No 21 Kecamatan Gubeng, Surabaya Jawa Timur 60111"/>
  				</Form.Group>
  				<div>
  					<p className="profile-image">Images</p>
  					<img className="profile-image-logo" src={Dummy2} alt="logo" />
  				</div>
  				<div className="profile-ac">Account Details</div>
  				<Form.Group>
    				<Form.Label className="profile-name">Name*</Form.Label>
    				<Form.Control className="custom-form-port" type="text" placeholder="Justin Junaedi" />
  				</Form.Group>
   				<Form.Group>
    				<Form.Label className="profile-email">Email*</Form.Label>
    				<Form.Control className="custom-form-port" type="text" placeholder="studio@justin.com" />
  				</Form.Group>
  				<div className="profile-button-container">
  					<Button className="profile-button" variant="primary" type="submit">Save</Button>
  				</div>
			</Form>
		</div>
		</>
	)
}

export default Profile