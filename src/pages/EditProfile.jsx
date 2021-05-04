import React from 'react'
import Dummy2 from '../assets/img/dummy-img/dummy2.png'
import HeaderProfile from '../components/HeaderProfile'

function EditProfile() {
	return (
	<div>
	<HeaderProfile />
		<div className="profile-container">
			<div className="inner-container">
				<div className="inner-title">Business Details</div>
				<div className="inner-bn"><p>Business Name*</p></div>
				<div className="inner-bn-name">
					<p className="inner-bn-name-text"><input className="inner-bn-name-text-input" type="text" placeholder="Justin Studio"></input></p>
				</div>
				<div className="inner-address">Address</div>
				<div className="inner-address-name">
					<p className="inner-address-name-text">Jl Mekar Sari No 21 Kecamatan Gubeng Surabaya, Jawa Timur 60111</p>
				</div>
				<div className="inner-images">Images</div>
				<div>
					<img className="inner-images-photo" src={Dummy2} alt="" />
				</div>
				<div className="inner-title-ad">Account Details</div>	
				<div className="inner-ad">Name*</div>
				<div className="inner-ad-name">
					<p className="inner-ad-name-text">Justin Junaedi</p>
				</div>
				<div className="inner-ad-email">Email*</div>
				<div className="inner-ad-name-email">
					<p className="inner-ad-name-email-text" >studio@justin.com</p>
				</div>
				<div className="profile-inner-button"><button className="profile-inner-button-btn">Save</button></div>
			</div>
		</div>
	</div>
	)
}

export default EditProfile